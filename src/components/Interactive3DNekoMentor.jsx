// ============================================
// PlaceMentor AI — Interactive 3D Anime AI Mentor Component
// Polished 3D game-like anime cat companion with performance-based emotional reactions
// ============================================
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import './Interactive3DNekoMentor.css';

export default function Interactive3DNekoMentor({ compact = false, showBubbleOnInit = false }) {
  const { userProfile } = useAuth();
  const { nekoEmotion } = useApp();
  
  const [showBubble, setShowBubble] = useState(showBubbleOnInit);
  const [showPanel, setShowPanel] = useState(false);
  const [blinking, setBlinking] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');

  // Performance metrics from actual user profile state
  const readiness = userProfile?.placementReadiness || 0;
  const codingScore = userProfile?.codingScore || 0;
  const streak = userProfile?.streak || 0;
  const interviewScore = userProfile?.interviewScore || 0;

  // Determine 3D Mentor Emotional State based on real performance data
  const getPerformanceState = () => {
    if (nekoEmotion === 'celebrating' || streak >= 7) {
      return {
        stateKey: 'streak',
        mood: '🔥',
        badge: 'Streak Master',
        title: 'Streak Celebration!',
        color: '#F59E0B',
        glow: 'rgba(245, 158, 11, 0.5)',
        msg: 'Your streak is growing! Keep it alive! 🔥'
      };
    }
    if (nekoEmotion === 'interview' || interviewScore >= 75) {
      return {
        stateKey: 'interview',
        mood: '🎤',
        badge: 'Interview Ready',
        title: 'Interview Confidence',
        color: '#8B5CF6',
        glow: 'rgba(139, 92, 246, 0.5)',
        msg: 'Your interview confidence is improving! 🎤'
      };
    }
    if (nekoEmotion === 'proud' || codingScore >= 80) {
      return {
        stateKey: 'coding',
        mood: '💻',
        badge: 'Coding Pro',
        title: 'Coding Mastery',
        color: '#3B82F6',
        glow: 'rgba(59, 130, 246, 0.5)',
        msg: 'Great solution! Your coding skills are getting stronger! 💻'
      };
    }
    if (readiness >= 80) {
      return {
        stateKey: 'excellent',
        mood: '🤩',
        badge: 'Top Performer',
        title: 'Excellent Performance!',
        color: '#10B981',
        glow: 'rgba(16, 185, 129, 0.5)',
        msg: 'Amazing! Keep going! 🔥'
      };
    }
    if (readiness >= 65 || streak >= 3) {
      return {
        stateKey: 'good',
        mood: '⭐',
        badge: 'Good Progress',
        title: 'Steady Improvement',
        color: '#06B6D4',
        glow: 'rgba(6, 182, 212, 0.5)',
        msg: "Great work! You're improving! ⭐"
      };
    }
    if (readiness >= 50) {
      return {
        stateKey: 'average',
        mood: '💪',
        badge: 'On Track',
        title: 'Building Momentum',
        color: '#EC4899',
        glow: 'rgba(236, 72, 153, 0.5)',
        msg: "You're doing well. Let's improve a little more! 💪"
      };
    }
    // Struggling / Initial State (Supportive, caring persona)
    return {
      stateKey: 'supportive',
      mood: '💙',
      badge: 'Supportive Mentor',
      title: 'Always Here for You',
      color: '#38BDF8',
      glow: 'rgba(56, 189, 248, 0.5)',
      msg: "Don't worry. Let's practice this topic together! 📚"
    };
  };

  const mentorState = getPerformanceState();

  // Natural 3D Eye Blinking Effect
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlinking(true);
      setTimeout(() => setBlinking(false), 180);
    }, Math.random() * 3500 + 2500);
    return () => clearInterval(blinkInterval);
  }, []);

  const handleAvatarClick = () => {
    setCurrentMessage(mentorState.msg);
    setShowBubble(prev => !prev);
    setShowPanel(prev => !prev);
  };

  return (
    <div className={`neko-3d-wrapper ${compact ? 'compact-mode' : ''}`}>
      {/* Dynamic Performance Speech Bubble */}
      {(showBubble || showBubbleOnInit) && (
        <div className="neko-3d-bubble animate-fadeInDown" style={{ borderColor: mentorState.color }}>
          <div className="flex items-center gap-1 mb-1">
            <span className="text-sm">{mentorState.mood}</span>
            <span className="text-xs font-bold text-primary">{mentorState.badge}</span>
          </div>
          <p className="bubble-text-3d">{currentMessage || mentorState.msg}</p>
          <div className="neko-3d-bubble-tail" />
        </div>
      )}

      {/* Interactive 3D Mentor Render Canvas */}
      <div
        className="neko-3d-character-container"
        onClick={handleAvatarClick}
        title="Click to interact with 3D Neko Mentor"
      >
        {/* Floating 3D Sparkle Aura */}
        <div className="neko-3d-aura" style={{ background: mentorState.glow }} />

        {/* High Quality 3D Anime Vector Canvas */}
        <div className="neko-3d-canvas">
          <svg width={compact ? "80" : "130"} height={compact ? "80" : "130"} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              {/* 3D Lighting Gradients */}
              <radialGradient id="body3DGlob" cx="30%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="60%" stopColor="#E2E8F0" />
                <stop offset="100%" stopColor="#94A3B8" />
              </radialGradient>
              <radialGradient id="headset3D" cx="30%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#38BDF8" />
                <stop offset="50%" stopColor="#0284C7" />
                <stop offset="100%" stopColor="#0369A1" />
              </radialGradient>
              <radialGradient id="scarf3D" cx="20%" cy="20%" r="80%">
                <stop offset="0%" stopColor="#2563EB" />
                <stop offset="100%" stopColor="#1E3A8A" />
              </radialGradient>
              <linearGradient id="eye3D" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0284C7" />
                <stop offset="100%" stopColor="#0369A1" />
              </linearGradient>
              <filter id="softShadow3D" x="-10%" y="-10%" width="120%" height="120%">
                <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#0F172A" floodOpacity="0.4" />
              </filter>
            </defs>

            {/* Ground 3D Soft Shadow */}
            <ellipse cx="100" cy="185" rx="55" ry="10" fill="#0F172A" opacity="0.35" />

            {/* 3D Animated Tail */}
            <path d="M145 140 C175 140, 185 90, 160 85 C145 80, 150 115, 135 130" stroke="#0284C7" strokeWidth="10" strokeLinecap="round" fill="none" className="tail-wag-3d" />

            {/* 3D Cat Body Spherical Mesh */}
            <ellipse cx="100" cy="140" rx="42" ry="38" fill="url(#body3DGlob)" filter="url(#softShadow3D)" />

            {/* 3D Headset Band */}
            <path d="M48 70 C48 20, 152 20, 152 70" stroke="#1E293B" strokeWidth="8" fill="none" strokeLinecap="round" />
            <path d="M52 70 C52 25, 148 25, 148 70" stroke="#0284C7" strokeWidth="4" fill="none" strokeLinecap="round" />

            {/* 3D Ears with Inner Pink Glow */}
            <g className="ear-twitch-3d">
              <path d="M50 65 L28 22 L72 45 Z" fill="url(#body3DGlob)" filter="url(#softShadow3D)" />
              <path d="M48 60 L35 30 L64 47 Z" fill="#F472B6" opacity="0.75" />
              <path d="M150 65 L172 22 L128 45 Z" fill="url(#body3DGlob)" filter="url(#softShadow3D)" />
              <path d="M152 60 L165 30 L136 47 Z" fill="#F472B6" opacity="0.75" />
            </g>

            {/* 3D Spherical Head */}
            <circle cx="100" cy="80" r="46" fill="url(#body3DGlob)" filter="url(#softShadow3D)" />

            {/* 3D Metallic Headset Ear Cups with Glowing Emblem */}
            <rect x="36" y="60" width="16" height="32" fill="url(#headset3D)" rx="8" />
            <rect x="148" y="60" width="16" height="32" fill="url(#headset3D)" rx="8" />
            <text x="41" y="80" fill="#FFFFFF" fontSize="11" fontWeight="bold">A</text>
            <text x="153" y="80" fill="#FFFFFF" fontSize="11" fontWeight="bold">A</text>

            {/* Headset Mic Boom */}
            <path d="M48 85 Q70 108 92 98" stroke="#0284C7" strokeWidth="3.5" fill="none" strokeLinecap="round" />
            <circle cx="94" cy="98" r="4.5" fill="#38BDF8" />

            {/* 3D Expressive Eyes */}
            <g className="eyes-group-3d">
              {blinking ? (
                <>
                  <path d="M72 80 Q80 88 88 80" stroke="#0F172A" strokeWidth="3.5" strokeLinecap="round" fill="none" />
                  <path d="M112 80 Q120 88 128 80" stroke="#0F172A" strokeWidth="3.5" strokeLinecap="round" fill="none" />
                </>
              ) : mentorState.stateKey === 'excellent' ? (
                <>
                  {/* Winking / Sparkling Eyes */}
                  <path d="M72 82 Q80 74 88 82" stroke="#0F172A" strokeWidth="4" strokeLinecap="round" fill="none" />
                  <ellipse cx="120" cy="78" rx="10" ry="14" fill="url(#eye3D)" />
                  <circle cx="117" cy="73" r="4" fill="#FFFFFF" />
                  <circle cx="122" cy="83" r="2" fill="#FFFFFF" />
                </>
              ) : (
                <>
                  {/* Both 3D Expressive Anime Eyes */}
                  <ellipse cx="80" cy="78" rx="10" ry="14" fill="url(#eye3D)" />
                  <ellipse cx="80" cy="78" rx="9" ry="13" stroke="#0F172A" strokeWidth="1.5" />
                  <circle cx="77" cy="73" r="4" fill="#FFFFFF" />
                  <circle cx="82" cy="83" r="2" fill="#FFFFFF" />

                  <ellipse cx="120" cy="78" rx="10" ry="14" fill="url(#eye3D)" />
                  <ellipse cx="120" cy="78" rx="9" ry="13" stroke="#0F172A" strokeWidth="1.5" />
                  <circle cx="117" cy="73" r="4" fill="#FFFFFF" />
                  <circle cx="122" cy="83" r="2" fill="#FFFFFF" />
                </>
              )}
            </g>

            {/* Cute Anime Nose & Mouth */}
            <polygon points="100,90 97,87 103,87" fill="#F472B6" />
            <path d="M93 94 Q100 102 107 94" stroke="#BE185D" strokeWidth="2.5" strokeLinecap="round" fill="none" />

            {/* 3D Scarf with Glowing "A" Emblem */}
            <path d="M62 118 Q100 135 138 118 L124 148 L100 156 L76 148 Z" fill="url(#scarf3D)" filter="url(#softShadow3D)" />
            <polygon points="100,126 93,142 107,142" fill="#38BDF8" />
            <text x="96" y="139" fill="#FFFFFF" fontSize="10" fontWeight="bold">A</text>

            {/* Waving Paw */}
            <circle cx="152" cy="120" r="11" fill="url(#body3DGlob)" filter="url(#softShadow3D)" className="paw-wave-3d" />
            <circle cx="152" cy="120" r="5" fill="#F472B6" opacity="0.8" />
          </svg>
        </div>

        {/* Floating Performance Mood Tag */}
        <div className="neko-3d-badge-pill" style={{ background: mentorState.color }}>
          <span>{mentorState.mood}</span>
          <span>{mentorState.badge}</span>
        </div>
      </div>
    </div>
  );
}
