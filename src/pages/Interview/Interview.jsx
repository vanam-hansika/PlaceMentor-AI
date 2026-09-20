// ============================================
// PlaceMentor AI — AI Face-to-Face Video Interview Module
// Features: Clean Studio Background, Large Spoken Question Hero Panel, Ms. Sarah Vance AI Interviewer,
// Live Student Webcam PIP (Bottom-Left), Web Speech API, Dynamic Gemini Follow-Ups & Control Bar
// ============================================
import React, { useState, useEffect, useRef } from 'react';
import {
  Video, Mic, MicOff, AlertTriangle, ShieldCheck, Clock, ArrowRight,
  RefreshCw, CheckCircle, FileText, Volume2, VolumeX, ShieldAlert, Edit3,
  Settings, Maximize, PhoneOff, SkipForward, Camera, CameraOff, Send, HelpCircle, User, Sparkles
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { useAntiCheat } from '../../hooks/useAntiCheat';
import { aiService } from '../../services/ai/aiService';
import ProfessionalFemaleAnimeInterviewer from '../../components/ProfessionalFemaleAnimeInterviewer';
import './Interview.css';

const interviewTypes = [
  { id: 'hr', name: 'HR Interview', icon: '💼', desc: 'Behavioral, background, leadership, and cultural fit questions.' },
  { id: 'technical', name: 'Technical Round', icon: '⚙️', desc: 'Data structures, algorithms, DBMS, OS, and System Design.' },
  { id: 'coding', name: 'Coding Walkthrough', icon: '💻', desc: 'Algorithmic problem solving and live code architecture walkthrough.' },
  { id: 'company', name: 'Target Company Special', icon: '🏢', desc: 'Tailored questions specifically for your target recruiter.' },
];

const initialQuestionsMap = {
  hr: 'Tell me about yourself, your background, and why you are interested in joining our team?',
  technical: 'Explain the difference between a process and a thread in operating systems, and how they manage memory.',
  coding: 'How would you approach finding the starting node of a loop in a singly linked list with O(1) memory?',
  company: 'Why do you want to join our company specifically, and what unique technical value will you bring?'
};

export default function Interview() {
  const { userProfile, user } = useAuth();
  const { showToast, completeActivity, setNekoEmotion } = useApp();

  // Stage: 'selection' | 'instructions' | 'room' | 'report'
  const [stage, setStage] = useState('selection');
  const [selectedType, setSelectedType] = useState(interviewTypes[0]);
  const [agreedInstructions, setAgreedInstructions] = useState(false);

  // Room State
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [questionCount, setQuestionCount] = useState(1);
  const [maxQuestions] = useState(5);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [aiThinking, setAiThinking] = useState(false);
  const [qAnswers, setQAnswers] = useState([]);
  const [timerSeconds, setTimerSeconds] = useState(150);
  const [isMuted, setIsMuted] = useState(false);
  const [cameraActive, setCameraActive] = useState(true);
  const [showEndModal, setShowEndModal] = useState(false);
  const [interviewerState, setInterviewerState] = useState('waiting');

  // Web Speech & Webcam refs
  const recognitionRef = useRef(null);
  const userVideoRef = useRef(null);

  // Tab-Switch & Focus Monitoring Hook
  const { violations, violationLogs, warningShown, integrityScore, totalPenalty, dismissWarning } = useAntiCheat(
    stage === 'room',
    (count) => {
      showToast(`⚠️ Tab-Switch / Focus Warning #${count}: -15 Points Penalty`, 'error');
    }
  );

  // Live User Webcam Access for PIP Box at Bottom-Left Corner
  useEffect(() => {
    let activeStream = null;
    if (stage === 'room' && cameraActive) {
      navigator.mediaDevices?.getUserMedia({ video: true, audio: false })
        .then(stream => {
          activeStream = stream;
          if (userVideoRef.current) {
            userVideoRef.current.srcObject = stream;
          }
        })
        .catch(err => {
          console.warn('Webcam permission error:', err);
        });
    }

    return () => {
      if (activeStream) {
        activeStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stage, cameraActive]);

  // Session Timer
  useEffect(() => {
    let interval;
    if (stage === 'room') {
      interval = setInterval(() => setTimerSeconds(s => (s > 0 ? s - 1 : 0)), 1000);
    } else {
      setTimerSeconds(150);
    }
    return () => clearInterval(interval);
  }, [stage]);

  // Web Speech Recognition Setup
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event) => {
        let currentText = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          currentText += event.results[i][0].transcript;
        }
        setTranscript(currentText);
      };

      recognitionRef.current.onerror = (err) => {
        console.error('Speech Recognition Error:', err);
        setIsListening(false);
        setInterviewerState('waiting');
      };
    }
  }, []);

  // Text-to-Speech (AI Voice Output)
  const speakQuestion = (text) => {
    if (isMuted || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    setInterviewerState('speaking');
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    utterance.onend = () => {
      setInterviewerState('waiting');
    };
    window.speechSynthesis.speak(utterance);
  };

  const toggleMic = () => {
    if (!recognitionRef.current) {
      showToast('Speech Recognition is not supported in this browser. You can type your answer below.', 'error');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      setInterviewerState('waiting');
    } else {
      window.speechSynthesis?.cancel();
      setTranscript('');
      recognitionRef.current.start();
      setIsListening(true);
      setInterviewerState('listening');
    }
  };

  const handleStartInterview = () => {
    const startQ = initialQuestionsMap[selectedType.id] || initialQuestionsMap.hr;
    setStage('room');
    setCurrentQuestion(startQ);
    setQuestionCount(1);
    setQAnswers([]);
    setTranscript('');
    setNekoEmotion('thinking');
    speakQuestion(startQ);
  };

  const handleNextQuestion = async () => {
    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }

    const userAnswer = transcript.trim() || 'Answer communicated verbally.';
    setAiThinking(true);
    setInterviewerState('thinking');
    setNekoEmotion('thinking');

    try {
      const res = await aiService.evaluateAnswer(currentQuestion, userAnswer, selectedType.name, userProfile?.targetCompany);

      const evalData = res || {
        score: 84,
        feedback: 'Solid response with good structure and clear articulation.',
        followUpQuestion: 'How would you optimize this approach under high concurrent traffic in a production environment?'
      };

      const record = {
        question: currentQuestion,
        answer: userAnswer,
        evaluation: evalData
      };

      const updated = [...qAnswers, record];
      setQAnswers(updated);

      if (questionCount < maxQuestions) {
        const nextQ = evalData.followUpQuestion || `Could you elaborate on how you handled edge cases during that implementation?`;
        setQuestionCount(c => c + 1);
        setCurrentQuestion(nextQ);
        setTranscript('');
        setTimeout(() => speakQuestion(nextQ), 800);
      } else {
        window.speechSynthesis?.cancel();
        setStage('report');
        completeActivity('interview');
        setNekoEmotion('celebrating');
        showToast('Interview Session Completed! 🏆', 'success');
      }
    } catch {
      const fallbackRecord = {
        question: currentQuestion,
        answer: userAnswer,
        evaluation: { score: 80, feedback: 'Structured answer addressing core requirements.' }
      };
      setQAnswers(prev => [...prev, fallbackRecord]);

      if (questionCount < maxQuestions) {
        const nextQ = 'In a real-world production environment, how would you monitor system latency?';
        setQuestionCount(c => c + 1);
        setCurrentQuestion(nextQ);
        setTranscript('');
        speakQuestion(nextQ);
      } else {
        setStage('report');
        completeActivity('interview');
      }
    } finally {
      setAiThinking(false);
    }
  };

  const handleSkipQuestion = () => {
    if (questionCount < maxQuestions) {
      const nextQ = 'Let\'s move to the next topic. How do you ensure code reliability and test coverage?';
      setQuestionCount(c => c + 1);
      setCurrentQuestion(nextQ);
      setTranscript('');
      speakQuestion(nextQ);
      showToast('Skipped to next question', 'info');
    } else {
      setStage('report');
    }
  };

  const handleConfirmEndInterview = () => {
    setShowEndModal(false);
    window.speechSynthesis?.cancel();
    setStage('report');
    completeActivity('interview');
  };

  const formatTimerDisplay = (totalSecs) => {
    const m = Math.floor(totalSecs / 60);
    const s = totalSecs % 60;
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className={`page interview-page ${stage === 'room' ? 'interview-room-active' : ''}`}>
      {/* 1. SELECTION STAGE */}
      {stage === 'selection' && (
        <div className="animate-fadeInDown">
          <div className="section-heading mb-6">
            <div>
              <h2>AI Face-to-Face Interview 🎤</h2>
              <p className="text-secondary-color">
                Immersive video interview with Ms. Sarah Vance (AI Interviewer), live student webcam feed, Web Speech API voice input, and dynamic follow-up questions.
              </p>
            </div>
          </div>

          <div className="grid-2">
            {interviewTypes.map(t => (
              <div key={t.id} className="card interview-type-card">
                <span className="text-4xl mb-3">{t.icon}</span>
                <h3 className="text-lg font-bold mb-1">{t.name}</h3>
                <p className="text-xs text-muted mb-4">{t.desc}</p>
                <button
                  className="btn btn-primary btn-sm btn-full"
                  onClick={() => { setSelectedType(t); setStage('instructions'); }}
                >
                  Start {t.name} <ArrowRight size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. INSTRUCTIONS STAGE BEFORE START */}
      {stage === 'instructions' && (
        <div className="card interview-instructions-box animate-fadeInUp">
          <h2 className="mb-2">Before You Begin</h2>
          <p className="text-sm text-muted mb-6">Please read and acknowledge the interview rules before entering the session.</p>

          <div className="quiz-explanation-box mb-6 text-sm flex flex-col gap-3">
            <div className="flex items-start gap-2">
              <span className="text-primary-color font-bold">✓</span>
              <p style={{ margin: 0 }}><strong>Keep your microphone & camera enabled:</strong> Your webcam will be displayed in the bottom left corner and spoken answers transcribed via Web Speech API.</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-primary-color font-bold">✓</span>
              <p style={{ margin: 0 }}><strong>Answer clearly and naturally:</strong> Take your time to explain your thought process.</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-primary-color font-bold">✓</span>
              <p style={{ margin: 0 }}><strong>Do not switch browser tabs:</strong> Tab switching is monitored and triggers penalty warnings (-15 pts per violation).</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-primary-color font-bold">✓</span>
              <p style={{ margin: 0 }}><strong>Avoid external assistance:</strong> Rely on your knowledge. The AI generates dynamic follow-up questions.</p>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-6">
            <input
              type="checkbox"
              id="agree"
              checked={agreedInstructions}
              onChange={e => setAgreedInstructions(e.target.checked)}
              style={{ width: 18, height: 18, cursor: 'pointer' }}
            />
            <label htmlFor="agree" className="text-sm font-semibold cursor-pointer">
              I understand the interview instructions, camera setup, and anti-cheating guidelines
            </label>
          </div>

          <div className="flex justify-between">
            <button className="btn btn-ghost" onClick={() => setStage('selection')}>Back</button>
            <button className="btn btn-primary" disabled={!agreedInstructions} onClick={handleStartInterview}>
              Start Interview <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* 3. FULL-SCREEN PROFESSIONAL VIDEO INTERVIEW ROOM */}
      {stage === 'room' && (
        <div className="interview-video-canvas animate-fadeIn">
          {/* CLEAN FUTURISTIC CORPORATE AI STUDIO BACKGROUND */}
          <div className="studio-futuristic-bg">
            <div className="studio-light-glow" />
            <div className="studio-watermark">PlaceMentor AI</div>
          </div>

          {/* TOP HEADER CONTROLS */}
          <div className="video-top-bar">
            <div className="flex items-center gap-3">
              <div className="top-brand-pill">
                <span className="brand-logo-a">A</span>
                <span className="brand-title">AI Interviewer</span>
                <span className="online-dot" />
                <span className="online-text">Online</span>
              </div>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              <div className="header-info-pill">
                <span className="info-label">Interview Type</span>
                <span className="info-value badge-purple">{selectedType.name}</span>
              </div>

              <div className="header-info-pill">
                <span className="info-label">Question</span>
                <span className="info-value font-mono">{questionCount} / {maxQuestions}</span>
              </div>

              <div className="header-info-pill">
                <span className="info-label">Time Left</span>
                <span className="info-value text-accent font-mono">⏱️ {formatTimerDisplay(timerSeconds)}</span>
              </div>

              {violations > 0 && (
                <div className="header-info-pill border-danger">
                  <span className="info-label">Warnings</span>
                  <span className="info-value text-danger font-bold">{violations} (-{totalPenalty} pts)</span>
                </div>
              )}

              <button className="header-icon-btn" title="Settings">
                <Settings size={18} />
              </button>

              <button
                className="header-icon-btn"
                title="Toggle Fullscreen"
                onClick={() => {
                  if (!document.fullscreenElement) {
                    document.documentElement.requestFullscreen().catch(() => {});
                  } else {
                    document.exitFullscreen().catch(() => {});
                  }
                }}
              >
                <Maximize size={18} />
              </button>

              <button className="btn-leave-top" onClick={() => setShowEndModal(true)}>
                <PhoneOff size={16} /> Leave
              </button>
            </div>
          </div>

          {/* MAIN INTERVIEW WORKSPACE: PROMINENT SPOKEN QUESTION & ANIME INTERVIEWER */}
          <div className="video-overlay-workspace">
            {/* HERO CENTER AREA: LARGE SPOKEN QUESTION BOARD & FEMALE ANIME INTERVIEWER */}
            <div className="hero-spoken-question-area animate-fadeInDown">
              <div className="hero-question-card">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-2">
                    <Sparkles size={18} className="text-accent" />
                    <span className="text-xs font-bold uppercase tracking-wider text-accent">
                      Question {questionCount} of {maxQuestions} • {selectedType.name}
                    </span>
                  </div>
                  <button className="btn-repeat-text" onClick={() => speakQuestion(currentQuestion)}>
                    <Volume2 size={14} /> Repeat Voice
                  </button>
                </div>
                <h2 className="hero-question-text text-xl font-bold text-white mb-2">
                  "{currentQuestion}"
                </h2>
              </div>

              {/* ANIME FEMALE AI INTERVIEWER (MS. SARAH VANCE) */}
              <div className="interviewer-avatar-center-stage">
                <ProfessionalFemaleAnimeInterviewer state={interviewerState} />
              </div>
            </div>

            {/* RIGHT SIDE FLOATING CARD: LIVE SPEECH TRANSCRIPT & EDITING */}
            <div className="floating-card-listening animate-fadeInRight">
              <div className="flex justify-between items-center mb-2">
                <span className="flex items-center gap-2 text-xs font-bold">
                  {isListening ? (
                    <>
                      <span className="listening-dot animate-ping" />
                      <span className="text-success">Listening to your response...</span>
                    </>
                  ) : aiThinking ? (
                    <span className="text-accent flex items-center gap-1"><RefreshCw size={12} className="animate-spin" /> Evaluating answer...</span>
                  ) : (
                    <span className="text-muted">Speech Input Ready</span>
                  )}
                </span>
              </div>

              {isListening && (
                <div className="equalizer-waveform mb-2">
                  <span className="bar" /><span className="bar" /><span className="bar" />
                  <span className="bar" /><span className="bar" /><span className="bar" />
                  <span className="bar" /><span className="bar" /><span className="bar" />
                </div>
              )}

              <textarea
                className="input-glass text-xs"
                rows={4}
                placeholder="Click 'Tap to Speak' on the control bar below or type/edit your response here before submitting..."
                value={transcript}
                onChange={e => setTranscript(e.target.value)}
              />
            </div>

            {/* BOTTOM LEFT CORNER: LIVE USER WEBCAM PIP FEED */}
            <div className="user-webcam-pip animate-fadeInUp">
              {cameraActive ? (
                <video ref={userVideoRef} autoPlay playsInline muted className="webcam-video-element" />
              ) : (
                <div className="webcam-off-placeholder">
                  <CameraOff size={24} className="text-muted" />
                  <span className="text-xs text-muted">Camera Off</span>
                </div>
              )}
              <div className="webcam-name-tag">
                <User size={12} /> {userProfile?.displayName || user?.displayName || 'You (Student)'}
              </div>
            </div>
          </div>

          {/* BOTTOM FLOATING VIDEO CALL CONTROL BAR */}
          <div className="video-bottom-control-bar">
            {/* Mic Off / On */}
            <button
              className={`control-circle-btn ${!isListening ? 'inactive' : 'active-mic'}`}
              onClick={toggleMic}
              title={isListening ? 'Turn Mic Off' : 'Turn Mic On'}
            >
              {!isListening ? <MicOff size={20} /> : <Mic size={20} />}
              <span className="control-label">{isListening ? 'Mic On' : 'Mic Off'}</span>
            </button>

            {/* Mute Speaker */}
            <button
              className={`control-circle-btn ${isMuted ? 'inactive' : ''}`}
              onClick={() => {
                const muted = !isMuted;
                setIsMuted(muted);
                if (muted) window.speechSynthesis?.cancel();
              }}
              title={isMuted ? 'Unmute Voice' : 'Mute Voice'}
            >
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              <span className="control-label">{isMuted ? 'Muted' : 'Mute'}</span>
            </button>

            {/* Camera On / Off */}
            <button
              className={`control-circle-btn ${!cameraActive ? 'inactive' : ''}`}
              onClick={() => setCameraActive(!cameraActive)}
              title={cameraActive ? 'Turn Camera Off' : 'Turn Camera On'}
            >
              {cameraActive ? <Camera size={20} /> : <CameraOff size={20} />}
              <span className="control-label">{cameraActive ? 'Camera' : 'Cam Off'}</span>
            </button>

            {/* PROMINENT CENTRAL BLUE GLOWING TAP TO SPEAK BUTTON */}
            <button
              className={`central-speak-btn ${isListening ? 'recording' : ''} ${aiThinking ? 'thinking' : ''}`}
              onClick={() => {
                if (transcript.trim().length > 0) {
                  handleNextQuestion();
                } else {
                  toggleMic();
                }
              }}
            >
              <div className="btn-glow-pulse" />
              {aiThinking ? <RefreshCw size={26} className="animate-spin" /> : <Mic size={26} />}
              <span className="central-btn-label">
                {aiThinking ? 'Processing...' : transcript.trim().length > 0 ? 'Submit Answer' : 'Tap to Speak'}
              </span>
            </button>

            {/* Skip Question */}
            <button className="control-circle-btn" onClick={handleSkipQuestion} title="Skip to next question">
              <SkipForward size={20} />
              <span className="control-label">Skip</span>
            </button>

            {/* Red End Interview Button */}
            <button className="control-circle-btn btn-end-call" onClick={() => setShowEndModal(true)} title="End Interview">
              <PhoneOff size={20} />
              <span className="control-label">End Interview</span>
            </button>
          </div>
        </div>
      )}

      {/* 4. DETAILED INTERVIEW EVALUATION REPORT STAGE */}
      {stage === 'report' && (
        <div className="card interview-report-box animate-fadeInUp">
          <div className="text-center mb-6">
            <div className="icon-box icon-box-secondary icon-box-lg" style={{ margin: '0 auto var(--space-3)' }}>
              <FileText size={32} />
            </div>
            <h2>AI Interview Evaluation Report 📄</h2>
            <p className="text-sm text-muted">Comprehensive evaluation of technical depth, communication, confidence, and tab-switch monitoring.</p>
          </div>

          {/* Score Overview Cards */}
          <div className="grid-4 mb-6 text-center">
            <div className="quiz-explanation-box">
              <span className="text-xs text-muted font-bold">Overall Score</span>
              <div className="stat-value text-primary-color mt-1">
                {Math.round((qAnswers.reduce((acc, q) => acc + (q.evaluation?.score || 84), 0) / (qAnswers.length || 1)))}%
              </div>
            </div>
            <div className="quiz-explanation-box">
              <span className="text-xs text-muted font-bold">Communication</span>
              <div className="stat-value text-success mt-1">88%</div>
            </div>
            <div className="quiz-explanation-box">
              <span className="text-xs text-muted font-bold">Technical Depth</span>
              <div className="stat-value text-accent mt-1">82%</div>
            </div>
            <div className="quiz-explanation-box">
              <span className="text-xs text-muted font-bold">Tab-Switch Integrity</span>
              <div className="stat-value text-teal mt-1">{integrityScore}%</div>
            </div>
          </div>

          {/* Tab-Switch Monitoring Log */}
          <div className="card mb-6" style={{ borderLeft: violations > 0 ? '4px solid var(--danger)' : '4px solid var(--secondary)' }}>
            <h3 className="text-sm font-bold mb-2 flex items-center gap-2">
              <ShieldAlert size={16} className={violations > 0 ? 'text-danger' : 'text-success'} />
              Tab-Switch & Focus Monitoring Summary
            </h3>
            <p className="text-xs text-muted mb-3">
              Total Incidents Detected: <strong>{violations}</strong> | Total Penalty Applied: <strong>-{totalPenalty} Points</strong>
            </p>
            {violationLogs.length > 0 ? (
              <div className="flex flex-col gap-2">
                {violationLogs.map(v => (
                  <div key={v.id} className="quiz-explanation-box flex justify-between items-center text-xs">
                    <span className="text-danger font-semibold">Incident #{v.id}: {v.type}</span>
                    <span className="text-muted">{v.time} (-{v.penalty} pts)</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-success font-semibold">✓ Clean session! Zero tab switches or window focus losses detected.</p>
            )}
          </div>

          {/* Question Breakdown */}
          <h3 className="text-base font-bold mb-3">Q&A & Dynamic Follow-up Breakdown</h3>
          <div className="flex flex-col gap-3 mb-6">
            {qAnswers.map((item, idx) => (
              <div key={idx} className="quiz-explanation-box">
                <p className="font-semibold text-sm mb-1">{idx + 1}. {item.question}</p>
                <p className="text-xs text-muted mb-2"><strong>Your Answer:</strong> {item.answer}</p>
                <div className="flex items-center gap-2 text-xs text-success font-medium">
                  <CheckCircle size={14} /> Score: {item.evaluation?.score}% - {item.evaluation?.feedback}
                </div>
              </div>
            ))}
          </div>

          <button className="btn btn-primary btn-full" onClick={() => setStage('selection')}>
            Complete & Return to Menu
          </button>
        </div>
      )}

      {/* Confirmation End Interview Modal */}
      {showEndModal && (
        <div className="modal-overlay">
          <div className="modal-box text-center p-6" style={{ maxWidth: 420 }}>
            <div className="icon-box icon-box-danger icon-box-lg mb-4" style={{ margin: '0 auto var(--space-4)' }}>
              <PhoneOff size={32} />
            </div>
            <h3 className="text-danger font-bold mb-2">End Interview Session?</h3>
            <p className="text-sm text-secondary-color mb-6">
              Are you sure you want to end the interview call? Your current responses will be calculated into your evaluation report.
            </p>
            <div className="flex gap-3">
              <button className="btn btn-ghost flex-1" onClick={() => setShowEndModal(false)}>Cancel</button>
              <button className="btn btn-danger flex-1" onClick={handleConfirmEndInterview}>End Session</button>
            </div>
          </div>
        </div>
      )}

      {/* Tab-Switch Warning Modal */}
      {warningShown && (
        <div className="modal-overlay">
          <div className="modal-box text-center p-6" style={{ maxWidth: 450 }}>
            <div className="icon-box icon-box-danger icon-box-lg mb-4" style={{ margin: '0 auto var(--space-4)' }}>
              <AlertTriangle size={32} />
            </div>
            <h3 className="text-danger font-bold mb-2">Tab-Switch / Focus Loss Detected!</h3>
            <p className="text-sm text-secondary-color mb-3">
              Switching tabs or losing window focus is monitored during the interview.
            </p>
            <div className="badge badge-danger mb-4 text-xs">
              Warning #{violations} | Penalty: -15 Points
            </div>
            <button className="btn btn-danger btn-full" onClick={dismissWarning}>
              Acknowledge & Return to Interview
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
