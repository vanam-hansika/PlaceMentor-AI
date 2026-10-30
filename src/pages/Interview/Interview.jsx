// ============================================
// PlaceMentor AI — AI Face-to-Face Video Interview Module
// Features: Clean Studio Background, Large Spoken Question Hero Panel, Ms. Sarah Vance AI Interviewer,
// Live Student Webcam PIP (Bottom-Left) with Resilient Fallback & Retry, Web Speech API,
// Dynamic Multi-Category Question Bank & Rigorous Multi-Factor Answer Evaluation
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
import { progressService } from '../../services/progress/progressService';
import { getSessionQuestions } from '../../data/interviewQuestionsData';
import { interviewEvaluator } from '../../services/interview/interviewEvaluator';
import ProfessionalFemaleAnimeInterviewer from '../../components/ProfessionalFemaleAnimeInterviewer';
import './Interview.css';

const interviewTypes = [
  { id: 'hr', name: 'HR Interview', icon: '💼', desc: 'Behavioral, background, leadership, and cultural fit questions.' },
  { id: 'technical', name: 'Technical Round', icon: '⚙️', desc: 'Data structures, algorithms, DBMS, OS, and System Design.' },
  { id: 'coding', name: 'Coding Walkthrough', icon: '💻', desc: 'Algorithmic problem solving and live code architecture walkthrough.' },
  { id: 'company', name: 'Target Company Special', icon: '🏢', desc: 'Tailored questions specifically for your target recruiter.' },
];

export default function Interview() {
  const { userProfile, user } = useAuth();
  const { showToast, completeActivity, setNekoEmotion } = useApp();

  // Stage: 'selection' | 'instructions' | 'room' | 'report'
  const [stage, setStage] = useState('selection');
  const [selectedType, setSelectedType] = useState(interviewTypes[0]);
  const [agreedInstructions, setAgreedInstructions] = useState(false);

  // Dynamic Session Questions
  const [sessionQuestions, setSessionQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [questionCount, setQuestionCount] = useState(1);
  const [maxQuestions] = useState(5);

  // Audio & Voice State
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [aiThinking, setAiThinking] = useState(false);
  const [qAnswers, setQAnswers] = useState([]);
  const [timerSeconds, setTimerSeconds] = useState(150);
  const [isMuted, setIsMuted] = useState(false);
  const [showEndModal, setShowEndModal] = useState(false);
  const [interviewerState, setInterviewerState] = useState('waiting');

  // Webcam State: 'idle' | 'requesting' | 'active' | 'denied' | 'error' | 'off'
  const [cameraStatus, setCameraStatus] = useState('idle');
  const [cameraError, setCameraError] = useState('');
  const [webcamStream, setWebcamStream] = useState(null);

  // Web Speech & Webcam refs
  const recognitionRef = useRef(null);
  const userVideoRef = useRef(null);
  const streamRef = useRef(null);

  // Tab-Switch & Focus Monitoring Hook
  const { violations, violationLogs, warningShown, integrityScore, totalPenalty, dismissWarning } = useAntiCheat(
    stage === 'room',
    (count) => {
      showToast(`⚠️ Tab-Switch / Focus Warning #${count}: -15 Points Penalty`, 'error');
    }
  );

  // ----------------------------------------------------
  // RESILIENT CAMERA INITIALIZATION & CLEANUP (WITH TIMEOUT & LOCK GUARD)
  // ----------------------------------------------------
  const isInitializingRef = useRef(false);

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => {
        try { track.stop(); } catch {}
      });
      streamRef.current = null;
    }
    setWebcamStream(null);
    if (userVideoRef.current) {
      userVideoRef.current.srcObject = null;
    }
  };

  const initCamera = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setCameraStatus('error');
      setCameraError('Camera API is not supported in this browser.');
      return;
    }

    // Prevent concurrent overlapping requests
    if (isInitializingRef.current) return;
    isInitializingRef.current = true;

    setCameraStatus('requesting');
    setCameraError('');

    // If an existing stream already has live video tracks, reuse it without tearing down hardware
    if (streamRef.current && streamRef.current.getVideoTracks().some(t => t.readyState === 'live')) {
      streamRef.current.getVideoTracks().forEach(t => { t.enabled = true; });
      setWebcamStream(streamRef.current);
      setCameraStatus('active');
      isInitializingRef.current = false;
      return;
    }

    // Stop stale tracks
    stopCamera();

    // Small delay to allow Windows Media Foundation driver to release device
    await new Promise(res => setTimeout(res, 180));

    // Helper: getUserMedia with strict 3.5-second timeout to avoid permanent "Connecting..." hang
    const fetchStreamWithTimeout = (constraints, ms = 3500) => {
      let timeoutId;
      const timeoutPromise = new Promise((_, reject) => {
        timeoutId = setTimeout(() => reject(new Error('TimeoutError')), ms);
      });
      const mediaPromise = navigator.mediaDevices.getUserMedia(constraints)
        .then(res => {
          clearTimeout(timeoutId);
          return res;
        })
        .catch(err => {
          clearTimeout(timeoutId);
          throw err;
        });
      return Promise.race([mediaPromise, timeoutPromise]);
    };

    let stream = null;
    try {
      // 1. Try standard video without facingMode constraint (broadest Windows compatibility)
      stream = await fetchStreamWithTimeout({
        video: { width: { ideal: 640 }, height: { ideal: 480 } },
        audio: false
      }, 3500);
    } catch (err1) {
      console.info('[Camera] Standard constraints failed or timed out, trying basic boolean video...', err1?.name || err1?.message);
      try {
        // 2. Fallback to basic boolean video: true with 3s timeout
        stream = await fetchStreamWithTimeout({
          video: true,
          audio: false
        }, 3000);
      } catch (err2) {
        console.warn('[Camera] All camera access attempts failed or timed out:', err2);
        const name = err2?.name || err1?.name || err2?.message || '';
        if (name === 'NotAllowedError' || name === 'PermissionDeniedError') {
          setCameraStatus('denied');
          setCameraError('Camera permission was blocked. Click the camera icon in your browser address bar to allow access.');
        } else if (name === 'TimeoutError' || name === 'AbortError' || name === 'OverconstrainedError') {
          setCameraStatus('error');
          setCameraError('Camera connection timed out (Device may be busy or another app is using it).');
        } else if (name === 'NotFoundError' || name === 'DevicesNotFoundError') {
          setCameraStatus('error');
          setCameraError('No webcam hardware detected. You can proceed with Voice & Avatar.');
        } else {
          setCameraStatus('error');
          setCameraError('Could not start video stream. You can retry or continue with Voice & Avatar.');
        }
        isInitializingRef.current = false;
        return;
      }
    }

    if (stream) {
      streamRef.current = stream;
      setWebcamStream(stream);
      setCameraStatus('active');
    }
    isInitializingRef.current = false;
  };

  // Attach live stream to video element whenever stream changes or room enters
  useEffect(() => {
    if (userVideoRef.current && webcamStream && cameraStatus === 'active') {
      if (userVideoRef.current.srcObject !== webcamStream) {
        userVideoRef.current.srcObject = webcamStream;
      }
      userVideoRef.current.onloadedmetadata = () => {
        userVideoRef.current?.play().catch(e => {
          console.warn('[Camera Autoplay Notice]', e);
        });
      };
      userVideoRef.current?.play().catch(() => {});
    }
  }, [webcamStream, cameraStatus, stage]);

  // Lifecycle when entering / exiting interview room
  useEffect(() => {
    if (stage === 'room') {
      if (!webcamStream || !streamRef.current) {
        initCamera();
      }
    }
    return () => {
      if (stage !== 'room') {
        stopCamera();
      }
    };
  }, [stage]);

  // Handle manual Camera On/Off Toggle
  const handleToggleCamera = () => {
    if (cameraStatus === 'active') {
      if (streamRef.current) {
        streamRef.current.getVideoTracks().forEach(t => { t.enabled = false; });
      }
      setCameraStatus('off');
    } else if (cameraStatus === 'off') {
      if (streamRef.current && streamRef.current.getVideoTracks().length > 0) {
        streamRef.current.getVideoTracks().forEach(t => { t.enabled = true; });
        setCameraStatus('active');
      } else {
        initCamera();
      }
    } else {
      initCamera();
    }
  };

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
        console.warn('Speech Recognition Error:', err);
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
    utterance.onerror = () => {
      setInterviewerState('waiting');
    };
    window.speechSynthesis.speak(utterance);
  };

  const toggleMic = () => {
    if (!recognitionRef.current) {
      showToast('Speech Recognition is not supported in this browser. You can type your answer in the box.', 'info');
      return;
    }

    if (isListening) {
      try { recognitionRef.current.stop(); } catch {}
      setIsListening(false);
      setInterviewerState('waiting');
    } else {
      window.speechSynthesis?.cancel();
      setTranscript('');
      try {
        recognitionRef.current.start();
        setIsListening(true);
        setInterviewerState('listening');
      } catch (err) {
        console.warn('Microphone start error:', err);
      }
    }
  };

  // ----------------------------------------------------
  // DYNAMIC SESSION START: RANDOMIZE QUESTIONS PER ROUND
  // ----------------------------------------------------
  const handleStartInterview = () => {
    // Pick 5 randomized, deduplicated questions from the selected round pool
    const dynamicQuestions = getSessionQuestions(selectedType.id, maxQuestions);
    setSessionQuestions(dynamicQuestions);

    const firstQ = dynamicQuestions[0]?.question || 'Explain your background, key technical skills, and core engineering interests.';
    setStage('room');
    setCurrentQuestion(firstQ);
    setQuestionCount(1);
    setQAnswers([]);
    setTranscript('');
    setNekoEmotion('thinking');
    setTimeout(() => speakQuestion(firstQ), 400);
  };

  const saveInterviewProgress = async (evalList) => {
    if (!user) return;
    try {
      const records = evalList || qAnswers;
      let total = 0;
      records.forEach(r => {
        total += (r.evaluation?.score ?? 0);
      });
      const avgScore = records.length > 0 ? Math.round(total / records.length) : 0;
      const typeLabel = typeof selectedType === 'object' ? selectedType?.name : (selectedType || 'Technical Round');
      const res = await progressService.recordInterviewActivity(
        user,
        typeLabel,
        avgScore,
        integrityScore
      );
      if (res) {
        showToast(`AI Mock Interview Saved! +${res.xpGained} XP • ${avgScore}% Score • Streak: ${res.streak} 🔥`, 'success');
        if (res.completedGoal) {
          showToast('🎯 Daily Mock Interview Target Completed! +40 Bonus XP Awarded!', 'success');
        }
      }
    } catch (err) {
      console.warn('[Interview Progress Sync Notice]', err);
    }
  };

  // ----------------------------------------------------
  // ANSWER EVALUATION: RIGOROUS EVALUATION ENGINE
  // ----------------------------------------------------
  const handleNextQuestion = async () => {
    if (isListening && recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch {}
      setIsListening(false);
    }

    const userAnswer = transcript.trim();
    setAiThinking(true);
    setInterviewerState('thinking');
    setNekoEmotion('thinking');

    try {
      // 1. Evaluate answer via AI Service (Gemini with intelligent NLP rubrics fallback)
      const evalData = await aiService.evaluateAnswer(
        currentQuestion,
        userAnswer,
        selectedType.id,
        userProfile?.targetCompany
      );

      const record = {
        question: currentQuestion,
        answer: userAnswer || '(No verbal or written answer recorded)',
        evaluation: evalData
      };

      const updated = [...qAnswers, record];
      setQAnswers(updated);

      if (questionCount < maxQuestions) {
        // Pick next question from dynamic session pool or generated follow-up
        const nextPoolQ = sessionQuestions[questionCount]?.question;
        const nextQ = (evalData.followUpQuestion && evalData.score >= 50)
          ? evalData.followUpQuestion
          : (nextPoolQ || 'In your projects, how did you verify system reliability and manage edge cases?');

        setQuestionCount(c => c + 1);
        setCurrentQuestion(nextQ);
        setTranscript('');
        setTimeout(() => speakQuestion(nextQ), 700);
      } else {
        window.speechSynthesis?.cancel();
        stopCamera();
        setStage('report');
        completeActivity('interview');
        setNekoEmotion(evalData.score >= 60 ? 'celebrating' : 'supportive');
        await saveInterviewProgress(updated);
      }
    } catch (err) {
      console.warn('[Interview Evaluation Fallback]', err);
      // Fallback with authentic local evaluator
      const localEval = interviewEvaluator.evaluateAnswer(currentQuestion, userAnswer, selectedType.id);
      const fallbackRecord = {
        question: currentQuestion,
        answer: userAnswer || '(No verbal or written answer recorded)',
        evaluation: localEval
      };
      const updated = [...qAnswers, fallbackRecord];
      setQAnswers(updated);

      if (questionCount < maxQuestions) {
        const nextPoolQ = sessionQuestions[questionCount]?.question || 'Let us move to the next topic. How do you approach debugging complex software issues?';
        setQuestionCount(c => c + 1);
        setCurrentQuestion(nextPoolQ);
        setTranscript('');
        setTimeout(() => speakQuestion(nextPoolQ), 700);
      } else {
        window.speechSynthesis?.cancel();
        stopCamera();
        setStage('report');
        completeActivity('interview');
        await saveInterviewProgress(updated);
      }
    } finally {
      setAiThinking(false);
    }
  };

  const handleSkipQuestion = () => {
    // Record skipped question with 0% score and honest status
    const skippedRecord = {
      question: currentQuestion,
      answer: '(Question skipped by candidate)',
      evaluation: {
        score: 0,
        technicalDepth: 0,
        communicationScore: 10,
        confidenceScore: 10,
        feedback: 'Question was skipped without an answer. Review this topic to build confidence for actual placement rounds.',
        status: 'Skipped'
      }
    };
    const updated = [...qAnswers, skippedRecord];
    setQAnswers(updated);

    if (questionCount < maxQuestions) {
      const nextQ = sessionQuestions[questionCount]?.question || 'How do you ensure code maintainability and test coverage in your applications?';
      setQuestionCount(c => c + 1);
      setCurrentQuestion(nextQ);
      setTranscript('');
      speakQuestion(nextQ);
      showToast('Question skipped (0 points recorded)', 'info');
    } else {
      window.speechSynthesis?.cancel();
      stopCamera();
      setStage('report');
      completeActivity('interview');
      saveInterviewProgress(updated);
    }
  };

  const handleConfirmEndInterview = () => {
    setShowEndModal(false);
    window.speechSynthesis?.cancel();
    stopCamera();
    setStage('report');
    completeActivity('interview');
    saveInterviewProgress();
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
                Immersive video interview with Ms. Sarah Vance (AI Interviewer), live student webcam feed, Web Speech API voice input, dynamic question banks, and authentic technical answer analysis.
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
          <p className="text-sm text-muted mb-4">Please verify your camera setup and review the interview guidelines before entering the session.</p>

          {/* Camera & Mic Pre-Check Box */}
          <div className="card mb-5 p-4" style={{ background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <h4 className="text-sm font-bold mb-2 flex items-center gap-2">
              <Camera size={16} className="text-accent" /> Camera & Audio Device Pre-Check
            </h4>
            <div className="flex items-center justify-between flex-wrap gap-2 text-xs">
              <div className="flex items-center gap-2">
                <span
                  className={`pip-live-dot ${cameraStatus === 'active' ? '' : 'bg-muted'}`}
                  style={cameraStatus === 'active' ? {} : { background: '#94A3B8', boxShadow: 'none' }}
                />
                <span>
                  Camera Status: <strong>{cameraStatus === 'active' ? 'Active & Ready' : cameraStatus === 'denied' ? 'Permission Denied' : 'Standby / Ready to Initialize'}</strong>
                </span>
              </div>
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={initCamera}
                style={{ fontSize: 11, padding: '4px 10px' }}
              >
                <RefreshCw size={12} className={cameraStatus === 'requesting' ? 'animate-spin' : ''} />
                {cameraStatus === 'active' ? 'Re-Test Camera' : 'Test Camera Now'}
              </button>
            </div>
            {cameraError && (
              <p className="text-xs text-danger mt-2 mb-0">⚠️ {cameraError}</p>
            )}
          </div>

          <div className="quiz-explanation-box mb-6 text-sm flex flex-col gap-3">
            <div className="flex items-start gap-2">
              <span className="text-primary-color font-bold">✓</span>
              <p style={{ margin: 0 }}><strong>Keep your microphone & camera enabled:</strong> Your webcam will be displayed in the bottom left corner and spoken answers transcribed via Web Speech API.</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-primary-color font-bold">✓</span>
              <p style={{ margin: 0 }}><strong>Answer with depth & clarity:</strong> Responses are analyzed against technical rubrics, core concepts, and keyword coverage. Empty or "I don't know" answers receive low scores.</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-primary-color font-bold">✓</span>
              <p style={{ margin: 0 }}><strong>Dynamic Question Sequencing:</strong> Every interview round dynamically selects fresh, non-repeating questions across core computer science and behavioral domains.</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-primary-color font-bold">✓</span>
              <p style={{ margin: 0 }}><strong>Do not switch browser tabs:</strong> Tab switching is strictly monitored and triggers penalty warnings (-15 pts per violation).</p>
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
            <button className="btn btn-ghost" onClick={() => { stopCamera(); setStage('selection'); }}>Back</button>
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

            {/* BOTTOM LEFT CORNER: LIVE USER WEBCAM PIP FEED WITH RESILIENT FALLBACK */}
            <div className="user-webcam-pip animate-fadeInUp">
              {cameraStatus === 'active' && webcamStream ? (
                <>
                  <video
                    ref={(el) => {
                      userVideoRef.current = el;
                      if (el && webcamStream && el.srcObject !== webcamStream) {
                        el.srcObject = webcamStream;
                        el.onloadedmetadata = () => {
                          el.play().catch(e => console.warn('Autoplay error', e));
                        };
                        el.play().catch(() => {});
                      }
                    }}
                    autoPlay
                    playsInline
                    muted
                    className="webcam-video-element"
                  />
                  <div className="webcam-live-indicator">
                    <span className="pip-live-dot" /> LIVE
                  </div>
                </>
              ) : cameraStatus === 'requesting' ? (
                <div className="webcam-placeholder-card">
                  <RefreshCw size={22} className="animate-spin text-accent mb-1" />
                  <span className="text-xs text-muted">Connecting Camera...</span>
                  <button
                    type="button"
                    className="pip-retry-btn mt-2"
                    style={{ fontSize: 9, opacity: 0.9 }}
                    onClick={() => {
                      stopCamera();
                      setCameraStatus('off');
                    }}
                    title="Switch to Avatar mode"
                  >
                    Skip to Avatar
                  </button>
                </div>
              ) : cameraStatus === 'off' ? (
                <div className="webcam-placeholder-card">
                  <div className="pip-avatar-circle">
                    <CameraOff size={18} />
                  </div>
                  <span className="text-xs text-muted">Camera Paused</span>
                  <button className="pip-retry-btn mt-1" onClick={handleToggleCamera}>
                    Turn On
                  </button>
                </div>
              ) : (
                <div className="webcam-placeholder-card">
                  <div className="pip-avatar-circle">
                    {userProfile?.displayName ? userProfile.displayName.charAt(0).toUpperCase() : <User size={18} />}
                  </div>
                  <span className="pip-status-warn">
                    {cameraStatus === 'denied' ? 'Camera Denied' : 'Camera Unavailable'}
                  </span>
                  <div className="flex gap-1 mt-1">
                    <button className="pip-retry-btn" onClick={initCamera} title="Retry Camera Connection">
                      <RefreshCw size={10} /> Retry
                    </button>
                    <button className="pip-retry-btn" onClick={() => setCameraStatus('off')} title="Continue with Avatar">
                      Avatar
                    </button>
                  </div>
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

            {/* Camera On / Off / Retry */}
            <button
              className={`control-circle-btn ${cameraStatus !== 'active' ? 'inactive' : ''}`}
              onClick={handleToggleCamera}
              title={cameraStatus === 'active' ? 'Turn Camera Off' : 'Turn Camera On / Retry'}
            >
              {cameraStatus === 'active' ? <Camera size={20} /> : <CameraOff size={20} />}
              <span className="control-label">{cameraStatus === 'active' ? 'Camera' : 'Cam Off'}</span>
            </button>

            {/* PROMINENT CENTRAL BLUE GLOWING TAP TO SPEAK / SUBMIT BUTTON */}
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
                {aiThinking ? 'Evaluating...' : transcript.trim().length > 0 ? 'Submit Answer' : 'Tap to Speak'}
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
              <span className="control-label">End Call</span>
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
            <p className="text-sm text-muted">Authentic multi-factor evaluation of technical depth, conceptual accuracy, communication, and tab-switch monitoring.</p>
          </div>

          {/* Real Dynamic Calculated Metrics */}
          {(() => {
            const total = qAnswers.reduce((acc, q) => acc + (q.evaluation?.score ?? 0), 0);
            const count = qAnswers.length || 1;
            const avgScore = Math.round(total / count);
            const totalComm = qAnswers.reduce((acc, q) => acc + (q.evaluation?.communicationScore ?? 20), 0);
            const avgComm = Math.round(totalComm / count);
            const totalTech = qAnswers.reduce((acc, q) => acc + (q.evaluation?.technicalDepth ?? 10), 0);
            const avgTech = Math.round(totalTech / count);

            return (
              <>
                <div className="grid-4 mb-6 text-center">
                  <div className="quiz-explanation-box">
                    <span className="text-xs text-muted font-bold">Overall Score</span>
                    <div className={`stat-value mt-1 ${avgScore >= 75 ? 'text-success' : avgScore >= 45 ? 'text-accent' : 'text-danger'}`}>
                      {avgScore}%
                    </div>
                    <span className="text-xs font-semibold mt-1">
                      {avgScore >= 80 ? '🌟 Excellent' : avgScore >= 60 ? '👍 Strong' : avgScore >= 40 ? '⚠️ Average' : '❌ Needs Work'}
                    </span>
                  </div>
                  <div className="quiz-explanation-box">
                    <span className="text-xs text-muted font-bold">Communication</span>
                    <div className={`stat-value mt-1 ${avgComm >= 70 ? 'text-success' : avgComm >= 45 ? 'text-accent' : 'text-danger'}`}>
                      {avgComm}%
                    </div>
                    <span className="text-xs text-muted">{avgComm >= 70 ? 'Clear & structured' : 'Needs more articulation'}</span>
                  </div>
                  <div className="quiz-explanation-box">
                    <span className="text-xs text-muted font-bold">Technical Depth</span>
                    <div className={`stat-value mt-1 ${avgTech >= 70 ? 'text-success' : avgTech >= 45 ? 'text-accent' : 'text-danger'}`}>
                      {avgTech}%
                    </div>
                    <span className="text-xs text-muted">{avgTech >= 70 ? 'Sound concepts' : 'Review fundamentals'}</span>
                  </div>
                  <div className="quiz-explanation-box">
                    <span className="text-xs text-muted font-bold">Tab-Switch Integrity</span>
                    <div className={`stat-value mt-1 ${integrityScore >= 80 ? 'text-teal' : 'text-danger'}`}>
                      {integrityScore}%
                    </div>
                    <span className="text-xs text-muted">{violations > 0 ? `${violations} switch incidents` : 'Zero violations'}</span>
                  </div>
                </div>

                {/* Question Breakdown with accurate status badges */}
                <h3 className="text-base font-bold mb-3">Q&A Performance & Evaluation Breakdown</h3>
                <div className="flex flex-col gap-3 mb-6">
                  {qAnswers.map((item, idx) => {
                    const score = item.evaluation?.score ?? 0;
                    const isHigh = score >= 75;
                    const isMedium = score >= 45 && score < 75;
                    return (
                      <div
                        key={idx}
                        className="quiz-explanation-box"
                        style={{ borderLeft: `4px solid ${isHigh ? 'var(--success)' : isMedium ? 'var(--accent)' : 'var(--danger)'}` }}
                      >
                        <div className="flex justify-between items-start mb-1 gap-2">
                          <p className="font-semibold text-sm mb-0">
                            {idx + 1}. {item.question}
                          </p>
                          <span className={`badge ${isHigh ? 'badge-success' : isMedium ? 'badge-purple' : 'badge-danger'} text-xs font-bold whitespace-nowrap`}>
                            {score}% Score
                          </span>
                        </div>
                        <p className="text-xs text-muted mb-2">
                          <strong>Your Answer:</strong> {item.answer}
                        </p>
                        <div className={`flex items-start gap-2 text-xs ${isHigh ? 'text-success' : isMedium ? 'text-accent' : 'text-danger'} font-medium`}>
                          {isHigh ? <CheckCircle size={14} className="mt-0.5" /> : isMedium ? <AlertTriangle size={14} className="mt-0.5" /> : <ShieldAlert size={14} className="mt-0.5" />}
                          <span>{item.evaluation?.feedback || 'Answer evaluated.'}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            );
          })()}

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
