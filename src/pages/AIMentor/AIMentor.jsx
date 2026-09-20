// ============================================
// PlaceMentor AI — AI Placement Mentor Page
// Senior AI Placement Mentor (Dr. Elena Rostova — Professional Female Anime AI Mentor)
// ============================================
import React, { useState, useEffect, useRef } from 'react';
import {
  Brain, Sparkles, Target, BookOpen, Code2, Video, RefreshCw,
  CheckCircle2, AlertTriangle, ArrowRight, Lightbulb, Send,
  MessageSquare, User, Bot, Flame, ShieldAlert, Award
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { aiService } from '../../services/ai/aiService';
import ProfessionalFemaleAnimeMentor from '../../components/ProfessionalFemaleAnimeMentor';
import './AIMentor.css';

export default function AIMentor() {
  const { userProfile } = useAuth();
  const { setNekoEmotion, showToast } = useApp();
  
  const [activeTab, setActiveTab] = useState('roadmap'); // 'roadmap' | 'chat' | 'analysis'
  const [loadingPlan, setLoadingPlan] = useState(false);
  const [studyPlan, setStudyPlan] = useState(null);

  // Chat State
  const [messages, setMessages] = useState([
    {
      sender: 'mentor',
      text: `Hello ${userProfile?.displayName?.split(' ')[0] || 'Student'}! 👋 I'm Dr. Elena Rostova, your Senior Placement Mentor. I've reviewed your current target of ${userProfile?.targetCompany || 'Top Tech Companies'}. How can I assist your placement preparation today?`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputMsg, setInputMsg] = useState('');
  const [sendingMsg, setSendingMsg] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // ON-DEMAND API TRIGGER
  const generatePlan = async () => {
    setLoadingPlan(true);
    setNekoEmotion('thinking');
    try {
      const res = await aiService.generateStudyPlan({
        branch: userProfile?.branch || 'Computer Science',
        year: userProfile?.year || '4th Year',
        targetCompany: userProfile?.targetCompany || 'Google',
        preferredLanguage: userProfile?.preferredLanguage || 'Python',
        codingScore: userProfile?.codingScore || 65,
        aptitudeScore: userProfile?.aptitudeScore || 70,
        interviewScore: userProfile?.interviewScore || 50,
        placementReadiness: userProfile?.placementReadiness || 68
      });

      setStudyPlan(res || getFallbackPlan());
      setNekoEmotion('excited');
      showToast('Dr. Elena evaluated your progress! 🎯✨', 'success');
    } catch {
      setStudyPlan(getFallbackPlan());
      setNekoEmotion('happy');
    } finally {
      setLoadingPlan(false);
    }
  };

  useEffect(() => {
    setStudyPlan(getFallbackPlan());
  }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMsg.trim() || sendingMsg) return;

    const userText = inputMsg.trim();
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setMessages(prev => [...prev, { sender: 'user', text: userText, time: timeStr }]);
    setInputMsg('');
    setSendingMsg(true);
    setNekoEmotion('thinking');

    try {
      const aiReply = await aiService.getMentorChatResponse(userText, userProfile);
      setMessages(prev => [
        ...prev,
        {
          sender: 'mentor',
          text: aiReply || `Great question regarding ${userProfile?.targetCompany || 'placements'}! Focus on building strong fundamentals in data structures, practicing timed aptitude daily, and preparing structured STAR framework answers for behavioral rounds. You are making steady progress!`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setNekoEmotion('happy');
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          sender: 'mentor',
          text: `Focus on mastering core programming concepts and practicing previous company patterns for ${userProfile?.targetCompany || 'tech roles'}. Consistency is your key to success! 💪`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setSendingMsg(false);
    }
  };

  function getFallbackPlan() {
    return {
      readiness: userProfile?.placementReadiness || 72,
      recommendation: `Based on your target of joining ${userProfile?.targetCompany || 'Google'}, your primary focus for the next 7 days should be mastering Binary Tree traversals, Graph algorithms, and improving your quantitative aptitude speed.`,
      weakAreas: ['Dynamic Programming', 'System Design Fundamentals', 'Probability & Statistics'],
      strongAreas: ['Arrays & Hash Maps', 'Blood Relations', 'Grammar & Vocabulary'],
      dailyTasks: [
        { day: 'Day 1', task: 'Solve 2 Medium Array & Sliding Window problems', module: 'Coding Practice', icon: '💻' },
        { day: 'Day 2', task: 'Practice 15 Time & Work Quantitative Aptitude questions', module: 'Aptitude Practice', icon: '📊' },
        { day: 'Day 3', task: 'Conduct a 15-minute HR & Technical Mock Interview', module: 'AI Interview Simulation', icon: '🎤' },
        { day: 'Day 4', task: 'Review Data Structures: Binary Trees & BST', module: 'Study Resources', icon: '🌲' },
        { day: 'Day 5', task: 'Solve 2 Medium Graph/DFS coding problems', module: 'Coding Practice', icon: '💻' },
      ],
      suggestedProblems: ['Two Sum', 'Valid Palindrome', 'Reverse Linked List'],
      suggestedAptitude: ['Time & Work', 'Syllogisms & Logic', 'Reading Comprehension']
    };
  }

  return (
    <div className="page ai-mentor-page">
      {/* Mentor Header Banner */}
      <div className="ai-mentor-banner card animate-fadeInDown">
        <div className="flex items-center gap-4 flex-wrap">
          <ProfessionalFemaleAnimeMentor />
          <div className="flex-1">
            <h2>Dr. Elena Rostova — AI Placement Mentor</h2>
            <p className="text-secondary-color">
              Personalized performance analysis, tailored study roadmap, and 24/7 placement Q&A for <strong>{userProfile?.targetCompany || 'Top Tech Companies'}</strong>.
            </p>
          </div>
        </div>

        <div className="flex gap-2 flex-wrap mt-3">
          <button
            className={`btn ${activeTab === 'roadmap' ? 'btn-primary' : 'btn-outline'} btn-sm`}
            onClick={() => setActiveTab('roadmap')}
          >
            <Target size={15} /> Action Plan
          </button>
          <button
            className={`btn ${activeTab === 'chat' ? 'btn-primary' : 'btn-outline'} btn-sm`}
            onClick={() => setActiveTab('chat')}
          >
            <MessageSquare size={15} /> Ask Dr. Elena Q&A
          </button>
          <button
            className={`btn ${activeTab === 'analysis' ? 'btn-primary' : 'btn-outline'} btn-sm`}
            onClick={() => setActiveTab('analysis')}
          >
            <Brain size={15} /> Performance Analysis
          </button>
        </div>
      </div>

      {/* Tab 1: Roadmap & Recommendations */}
      {activeTab === 'roadmap' && (
        loadingPlan ? (
          <div className="card text-center p-12 animate-fadeInUp">
            <div className="animate-spin" style={{ width: 48, height: 48, border: '4px solid var(--border)', borderTopColor: 'var(--primary)', borderRadius: '50%', margin: '0 auto 20px' }} />
            <h3>Evaluating Performance & Building Strategy...</h3>
            <p className="text-muted text-sm">Dr. Elena Rostova is evaluating your coding, aptitude, and interview scores...</p>
          </div>
        ) : (
          <div className="ai-mentor-grid">
            {/* Left Column: Advice & 7-Day Plan */}
            <div className="ai-mentor-left">
              {/* Strategic Advice */}
              <div className="card ai-mentor-rec-box animate-fadeInLeft">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Sparkles size={20} className="text-accent" />
                    <h3 style={{ margin: 0, fontSize: 'var(--text-lg)' }}>Dr. Elena's Strategic Advice</h3>
                  </div>
                  <button className="btn btn-ghost btn-sm text-xs" onClick={generatePlan}>
                    <RefreshCw size={14} /> Re-analyze
                  </button>
                </div>
                <p className="text-sm text-secondary-color" style={{ lineHeight: 'var(--leading-relaxed)' }}>
                  {studyPlan?.recommendation}
                </p>
              </div>

              {/* Motivational Guidance */}
              <div className="card animate-fadeInLeft delay-100" style={{ borderLeft: '4px solid var(--teal)' }}>
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb size={20} className="text-teal" />
                  <h3 className="text-base font-bold" style={{ margin: 0 }}>Motivational Guidance</h3>
                </div>
                <p className="text-xs text-secondary-color">
                  "Success in placements is not about perfection; it is about consistent daily improvement. Keep your streak active, practice one problem at a time, and approach every interview with confidence!"
                </p>
              </div>

              {/* 7-Day Action Plan */}
              <div className="card animate-fadeInLeft delay-200">
                <h3 className="mb-4" style={{ fontSize: 'var(--text-lg)' }}>Recommended 7-Day Action Plan</h3>
                <div className="ai-mentor-tasks">
                  {studyPlan?.dailyTasks?.map((t, idx) => (
                    <div key={idx} className="ai-mentor-task-item">
                      <span className="badge badge-primary">{t.day}</span>
                      <span className="text-xl">{t.icon}</span>
                      <div className="flex-1">
                        <p className="text-sm font-semibold">{t.task}</p>
                        <span className="text-xs text-muted">{t.module}</span>
                      </div>
                      <CheckCircle2 size={18} className="text-muted" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Readiness & Targets */}
            <div className="ai-mentor-right">
              <div className="card text-center animate-fadeInRight">
                <h3 className="text-sm font-bold text-muted mb-2 uppercase">Placement Readiness</h3>
                <div className="stat-value text-primary-color" style={{ fontSize: 'var(--text-4xl)' }}>
                  {studyPlan?.readiness}%
                </div>
                <p className="text-xs text-muted mt-1">Targeting: {userProfile?.targetCompany || 'Top Product Companies'}</p>
              </div>

              {/* Target Coding Problems */}
              <div className="card animate-fadeInRight delay-100">
                <h3 className="text-sm font-bold mb-3 flex items-center gap-2">
                  <Code2 size={16} className="text-primary-color" /> What to Study Next: Coding
                </h3>
                <div className="flex flex-col gap-2">
                  {studyPlan?.suggestedProblems?.map((prob, i) => (
                    <div key={i} className="quiz-explanation-box flex justify-between items-center">
                      <span className="text-xs font-semibold">{prob}</span>
                      <span className="text-xs text-primary-color font-bold">Practice →</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Priority Aptitude */}
              <div className="card animate-fadeInRight delay-200">
                <h3 className="text-sm font-bold mb-3 flex items-center gap-2">
                  <BookOpen size={16} className="text-secondary-dark" /> What to Study Next: Aptitude
                </h3>
                <div className="flex flex-col gap-2">
                  {studyPlan?.suggestedAptitude?.map((apt, i) => (
                    <div key={i} className="quiz-explanation-box flex justify-between items-center">
                      <span className="text-xs font-semibold">{apt}</span>
                      <span className="text-xs text-secondary-dark font-bold">Solve →</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )
      )}

      {/* Tab 2: Interactive Q&A Chat with AI Mentor */}
      {activeTab === 'chat' && (
        <div className="card ai-mentor-chat-card animate-fadeInUp">
          <div className="ai-mentor-chat-header">
            <div className="flex items-center gap-3">
              <ProfessionalFemaleAnimeMentor />
              <div>
                <h3 className="text-base font-bold" style={{ margin: 0 }}>Ask Dr. Elena Rostova</h3>
                <p className="text-xs text-muted">Ask anything about company interviews, resume tips, coding advice, or salary negotiation.</p>
              </div>
            </div>
          </div>

          <div className="ai-mentor-chat-messages">
            {messages.map((m, idx) => (
              <div key={idx} className={`chat-message ${m.sender === 'user' ? 'user-msg' : 'mentor-msg'}`}>
                <div className="chat-avatar">
                  {m.sender === 'user' ? '👤' : '👩‍🏫'}
                </div>
                <div className="chat-bubble">
                  <p className="text-sm" style={{ margin: 0, whiteSpace: 'pre-line' }}>{m.text}</p>
                  <span className="text-xs text-muted chat-time">{m.time}</span>
                </div>
              </div>
            ))}
            {sendingMsg && (
              <div className="chat-message mentor-msg">
                <div className="chat-avatar">👩‍🏫</div>
                <div className="chat-bubble flex items-center gap-2">
                  <span className="text-xs text-muted">Dr. Elena is thinking...</span>
                  <div className="animate-spin" style={{ width: 14, height: 14, border: '2px solid var(--border)', borderTopColor: 'var(--primary)', borderRadius: '50%' }} />
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <form onSubmit={handleSendMessage} className="ai-mentor-chat-input flex gap-2 pt-3 border-t">
            <input
              className="input flex-1 text-sm"
              placeholder="e.g. How do I clear the Amazon SDE 1 coding round?"
              value={inputMsg}
              onChange={e => setInputMsg(e.target.value)}
              disabled={sendingMsg}
            />
            <button type="submit" className="btn btn-primary" disabled={sendingMsg || !inputMsg.trim()}>
              <Send size={16} /> Ask Mentor
            </button>
          </form>
        </div>
      )}

      {/* Tab 3: Detailed Strengths & Weaknesses Analysis */}
      {activeTab === 'analysis' && (
        <div className="animate-fadeInUp flex flex-col gap-5">
          <div className="grid-2">
            <div className="card" style={{ borderLeft: '4px solid var(--danger)' }}>
              <div className="flex items-center gap-2 mb-3 text-danger">
                <ShieldAlert size={20} />
                <h3 className="text-base font-bold" style={{ margin: 0 }}>Identified Weak Areas</h3>
              </div>
              <p className="text-xs text-muted mb-3">Topics where your accuracy or time spent needs improvement:</p>
              <div className="flex flex-col gap-2">
                {studyPlan?.weakAreas?.map((w, i) => (
                  <div key={i} className="quiz-explanation-box flex justify-between items-center">
                    <span className="text-xs font-semibold">{w}</span>
                    <span className="badge badge-danger text-xs">High Priority</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="card" style={{ borderLeft: '4px solid var(--secondary)' }}>
              <div className="flex items-center gap-2 mb-3 text-success">
                <Award size={20} />
                <h3 className="text-base font-bold" style={{ margin: 0 }}>Verified Strengths</h3>
              </div>
              <p className="text-xs text-muted mb-3">Topics where you have demonstrated high consistency:</p>
              <div className="flex flex-col gap-2">
                {studyPlan?.strongAreas?.map((s, i) => (
                  <div key={i} className="quiz-explanation-box flex justify-between items-center">
                    <span className="text-xs font-semibold">{s}</span>
                    <span className="badge badge-secondary text-xs">Mastered</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="text-base font-bold mb-3">Performance Overview & Target Alignment</h3>
            <div className="grid-3 text-center">
              <div className="quiz-explanation-box">
                <span className="text-xs text-muted">Coding Score</span>
                <div className="stat-value text-primary-color mt-1">{userProfile?.codingScore || 65}%</div>
              </div>
              <div className="quiz-explanation-box">
                <span className="text-xs text-muted">Aptitude Score</span>
                <div className="stat-value text-secondary-dark mt-1">{userProfile?.aptitudeScore || 70}%</div>
              </div>
              <div className="quiz-explanation-box">
                <span className="text-xs text-muted">Interview Score</span>
                <div className="stat-value text-purple mt-1">{userProfile?.interviewScore || 50}%</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
