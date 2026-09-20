// ============================================
// PlaceMentor AI — Professional Female Anime AI Mentor Component
// Dr. Elena Rostova: Senior Anime Placement Mentor with distinct persona & progress reactions
// ============================================
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import './ProfessionalFemaleAnimeMentor.css';

const MENTOR_STATES = {
  happy: {
    mood: '😊',
    title: 'Happy Mentor',
    badge: 'Steady Progress',
    color: '#10B981',
    msg: [
      'You are making steady progress! Keep up your daily practice!',
      'Consistency is key. Every problem solved brings you closer to your goal!',
      'Stay focused on your target company roadmap!'
    ]
  },
  excited: {
    mood: '🤩',
    title: 'Super Excited!',
    badge: 'Streak Active',
    color: '#F59E0B',
    msg: [
      'Great job! Keep your streak going! 🔥',
      'You are building incredible momentum! Keep it up!',
      'Awesome dedication today! Placement recruiters love this consistency!'
    ]
  },
  proud: {
    mood: '😎',
    title: 'Proud of You!',
    badge: 'High Performance',
    color: '#4F46E5',
    msg: [
      'Excellent coding progress! You solved that algorithm cleanly!',
      'Top-tier problem solving! Your logic is sharp and clean.',
      'Your technical depth is improving noticeably!'
    ]
  },
  motivational: {
    mood: '🎤',
    title: 'Motivational Mentor',
    badge: 'Interview Feedback',
    color: '#06B6D4',
    msg: [
      'Well done on completing your interview! Let\'s work on your weak areas next.',
      'Mock interviews build confidence. Review your transcript feedback carefully!',
      'Great effort! Refine your answers using the STAR framework.'
    ]
  },
  encouraging: {
    mood: '💙',
    title: 'Supportive Mentor',
    badge: 'Get Back on Track',
    color: '#EC4899',
    msg: [
      'Don\'t worry. Let\'s get back on track today.',
      'One missed day is just a small step back. Today is a fresh start!',
      'I\'m right here to support your preparation. Take it one question at a time!'
    ]
  },
  celebrating: {
    mood: '🎉',
    title: 'Celebrating Medal!',
    badge: 'Medal Unlocked',
    color: '#8B5CF6',
    msg: [
      'Congratulations! You earned a Gold medal! 🥇',
      'Placement Champion milestone achieved! I am so proud of your dedication!',
      '🎉 Outstanding achievement! Keep striving for excellence!'
    ]
  }
};

export default function ProfessionalFemaleAnimeMentor({ stateOverride = null, customMessage = null }) {
  const { userProfile } = useAuth();
  const { nekoEmotion } = useApp();
  const [showBubble, setShowBubble] = useState(false);
  const [currentMsg, setCurrentMsg] = useState('');

  // Determine state based on streak/medals or context override
  const streak = userProfile?.streak || 0;
  const codingScore = userProfile?.codingScore || 65;

  let activeStateKey = stateOverride || nekoEmotion;
  if (!MENTOR_STATES[activeStateKey]) {
    if (streak >= 7) activeStateKey = 'celebrating';
    else if (streak >= 3) activeStateKey = 'excited';
    else if (codingScore >= 80) activeStateKey = 'proud';
    else activeStateKey = 'happy';
  }

  const mentorState = MENTOR_STATES[activeStateKey] || MENTOR_STATES.happy;

  const handleBubbleToggle = () => {
    if (!showBubble) {
      const msgs = mentorState.msg;
      setCurrentMsg(customMessage || msgs[Math.floor(Math.random() * msgs.length)]);
      setShowBubble(true);
      setTimeout(() => setShowBubble(false), 5000);
    } else {
      setShowBubble(false);
    }
  };

  return (
    <div className="anime-mentor-container">
      {/* Speech Bubble */}
      {showBubble && (
        <div className="anime-mentor-bubble">
          <p>{currentMsg || mentorState.msg[0]}</p>
          <div className="anime-mentor-bubble-tail" />
        </div>
      )}

      {/* Anime Mentor Graphic Avatar Button */}
      <button
        className="anime-mentor-avatar-btn"
        onClick={handleBubbleToggle}
        aria-label="Dr. Elena Rostova AI Mentor"
      >
        <div className="anime-mentor-card-mini" style={{ borderColor: mentorState.color }}>
          <svg width="120" height="120" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="hairGradElena" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#881337" />
                <stop offset="50%" stopColor="#BE123C" />
                <stop offset="100%" stopColor="#E11D48" />
              </linearGradient>
              <linearGradient id="skinGradElena" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFF7ED" />
                <stop offset="100%" stopColor="#FFEDD5" />
              </linearGradient>
              <linearGradient id="blazerGradElena" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0F766E" />
                <stop offset="100%" stopColor="#115E59" />
              </linearGradient>
              <linearGradient id="eyeGradElena" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#059669" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
            </defs>

            {/* Back Hair */}
            <path d="M40 75 C35 145, 165 145, 165 75 C165 35, 40 35, 40 75 Z" fill="url(#hairGradElena)" />

            {/* Executive Teal Blazer */}
            <path d="M35 190 C35 140, 165 140, 165 190 Z" fill="url(#blazerGradElena)" />
            <path d="M80 140 L100 175 L120 140 Z" fill="#FFFFFF" />

            {/* Neck */}
            <rect x="88" y="120" width="24" height="25" fill="url(#skinGradElena)" rx="4" />

            {/* Anime Face Shape */}
            <path d="M65 75 Q65 125 100 135 Q135 125 135 75 Q135 45 100 45 Q65 45 65 75 Z" fill="url(#skinGradElena)" />

            {/* Emerald Anime Eyes */}
            <g className="anime-eye-group">
              <ellipse cx="84" cy="80" rx="9" ry="13" fill="url(#eyeGradElena)" />
              <ellipse cx="84" cy="80" rx="8" ry="12" stroke="#064E3B" strokeWidth="1.5" />
              <circle cx="81.5" cy="75.5" r="3.5" fill="#FFFFFF" />
              <circle cx="86.5" cy="84.5" r="1.5" fill="#FFFFFF" />

              <ellipse cx="116" cy="80" rx="9" ry="13" fill="url(#eyeGradElena)" />
              <ellipse cx="116" cy="80" rx="8" ry="12" stroke="#064E3B" strokeWidth="1.5" />
              <circle cx="113.5" cy="75.5" r="3.5" fill="#FFFFFF" />
              <circle cx="118.5" cy="84.5" r="1.5" fill="#FFFFFF" />
            </g>

            {/* Stylish Executive Glasses */}
            <rect x="74" y="70" width="22" height="18" fill="none" stroke="#D97706" strokeWidth="2.5" rx="3" />
            <rect x="104" y="70" width="22" height="18" fill="none" stroke="#D97706" strokeWidth="2.5" rx="3" />
            <line x1="96" y1="78" x2="104" y2="78" stroke="#D97706" strokeWidth="2.5" />

            {/* Smile & Nose */}
            <circle cx="100" cy="93" r="1.5" fill="#9F1239" opacity="0.6" />
            <path d="M92 104 Q100 110 108 104" stroke="#9F1239" strokeWidth="2.5" strokeLinecap="round" fill="none" />

            {/* Elegant Hair Cut */}
            <path d="M58 65 C70 40, 130 40, 142 65 C125 48, 110 50, 100 60 C90 50, 75 48, 58 65 Z" fill="url(#hairGradElena)" />
          </svg>
          <div className="anime-mentor-badge-label" style={{ background: mentorState.color }}>
            {mentorState.mood} Dr. Elena
          </div>
        </div>
      </button>
    </div>
  );
}
