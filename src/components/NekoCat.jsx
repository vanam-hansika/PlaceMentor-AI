// ============================================
// PlaceMentor AI — Neko Cat (Interactive 3D Anime Companion) 🐱
// True 3D Vector Canvas with continuous tail wagging, ear twitches, eye blinks,
// transparent background (no box frame), and smart performance reaction system
// ============================================
import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import './NekoCat.css';

const LEVELS = ['Kitten 🐾', 'Student Cat 📚', 'Graduate Cat 🎓', 'Interview Master 🎤', 'Placement Champion 🏆'];

export default function NekoCat() {
  const { nekoEmotion, nekoVisible } = useApp();
  const { userProfile } = useAuth();
  
  const [showBubble, setShowBubble] = useState(false);
  const [message, setMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [blinking, setBlinking] = useState(false);

  // Live Performance Data
  const readiness = userProfile?.placementReadiness || 0;
  const streak = userProfile?.streak || 0;
  const xp = userProfile?.xp || 0;
  const codingScore = userProfile?.codingScore || 0;

  // Eye Blinking Animation Engine
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlinking(true);
      setTimeout(() => setBlinking(false), 180);
    }, Math.random() * 3500 + 2500);
    return () => clearInterval(blinkInterval);
  }, []);

  // Smart Performance Reaction System
  const getSmartPerformanceState = () => {
    // 1. Streak / Medal / XP Achievement
    if (nekoEmotion === 'celebrating' || streak >= 7) {
      return {
        key: 'streak',
        mood: '🔥',
        title: 'Streak & Medal Celebration!',
        badge: 'Streak Master',
        glowColor: 'rgba(245, 158, 11, 0.6)',
        borderColor: '#F59E0B',
        messages: [
          'Streak Master! Keep it growing! 🔥',
          'CONGRATULATIONS!! You unlocked a Placement Medal! 🏆',
          'XP level up! You are unstoppable today! 🌟'
        ]
      };
    }

    // 2. Coding Success / Interview Improvement
    if (nekoEmotion === 'proud' || codingScore >= 80) {
      return {
        key: 'coding',
        mood: '💻',
        title: 'Coding Mastery!',
        badge: 'Coding Pro',
        glowColor: 'rgba(59, 130, 246, 0.6)',
        borderColor: '#3B82F6',
        messages: [
          'Great solution! Your coding skills are getting stronger! 💻',
          'Look at that consistency! Recruiter standard code! 😎',
          'Mastering hard topics like a true pro!'
        ]
      };
    }

    // 3. Excellent Performance (Readiness >= 80)
    if (readiness >= 80) {
      return {
        key: 'excellent',
        mood: '🤩',
        title: 'Super Excited!',
        badge: 'Top Candidate',
        glowColor: 'rgba(16, 185, 129, 0.6)',
        borderColor: '#10B981',
        messages: [
          'Amazing! 🔥',
          'You\'re doing great!',
          'Keep going! Placement offer is near!'
        ]
      };
    }

    // 4. Good Performance (Readiness >= 65)
    if (readiness >= 65 || streak >= 3) {
      return {
        key: 'good',
        mood: '⭐',
        title: 'Great Progress!',
        badge: 'Good Work',
        glowColor: 'rgba(6, 182, 212, 0.6)',
        borderColor: '#06B6D4',
        messages: [
          'Good job!',
          'You\'re improving!',
          'Daily practice is paying off!'
        ]
      };
    }

    // 5. Average Performance (Readiness >= 50)
    if (readiness >= 50) {
      return {
        key: 'average',
        mood: '💪',
        title: 'Encouraging Neko',
        badge: 'On Track',
        glowColor: 'rgba(236, 72, 153, 0.5)',
        borderColor: '#EC4899',
        messages: [
          'Keep practicing!',
          'You can improve this!',
          'Let\'s target one module at a time!'
        ]
      };
    }

    // 6. Poor Performance / Supportive Recovery (Readiness < 50)
    return {
      key: 'supportive',
      mood: '💙',
      title: 'Supportive Companion',
      badge: 'Here For You',
      glowColor: 'rgba(56, 189, 248, 0.5)',
      borderColor: '#38BDF8',
      messages: [
        'Don\'t worry!',
        'Let\'s try again!',
        'You can do it! I\'m right here with you!'
      ]
    };
  };

  const currentCatState = getSmartPerformanceState();
  const nekoLevel = Math.min(Math.floor(xp / 500), 4);
  const levelName = LEVELS[nekoLevel];

  // Auto Trigger Speech Bubble on performance updates
  useEffect(() => {
    const msgs = currentCatState.messages;
    const selectedMsg = msgs[Math.floor(Math.random() * msgs.length)];
    setMessage(selectedMsg);
    setShowBubble(true);
    const timer = setTimeout(() => setShowBubble(false), 4500);

    return () => clearTimeout(timer);
  }, [readiness, streak, codingScore, nekoEmotion]);

  const handleAvatarClick = () => {
    if (!isOpen) {
      const msgs = currentCatState.messages;
      setMessage(msgs[Math.floor(Math.random() * msgs.length)]);
      setShowBubble(true);
      setIsOpen(true);
    } else {
      setIsOpen(false);
      setShowBubble(false);
    }
  };

  if (!nekoVisible) return null;

  return (
    <div className="neko" id="neko-companion">
      {/* Dynamic Performance Speech Bubble */}
      {showBubble && (
        <div className="neko__bubble animate-fadeInDown" style={{ borderColor: currentCatState.borderColor }}>
          <div className="flex items-center gap-1 mb-1">
            <span className="text-xs">{currentCatState.mood}</span>
            <span className="text-xs font-bold text-primary">{currentCatState.badge}</span>
          </div>
          <p>{message}</p>
          <div className="neko__bubble-tail" />
        </div>
      )}

      {/* Expanded Gamification Stats Panel */}
      {isOpen && (
        <div className="neko__panel animate-scaleIn">
          <div className="neko__panel-header">
            <span className="neko__panel-name">Neko 3D Companion</span>
            <span className="neko__panel-level badge badge-accent">{levelName}</span>
          </div>
          
          <div className="neko__panel-face-img text-center my-2">
            <svg width="90" height="90" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="100" cy="180" rx="55" ry="10" fill="#0F172A" opacity="0.3" />
              <path d="M145 140 C175 140, 185 90, 160 85 C145 80, 150 115, 135 130" stroke="#0284C7" strokeWidth="10" strokeLinecap="round" fill="none" className="tail-wag-3d" />
              <ellipse cx="100" cy="140" rx="42" ry="38" fill="url(#panelBody3D)" />
              <path d="M48 70 C48 20, 152 20, 152 70" stroke="#0284C7" strokeWidth="6" fill="none" strokeLinecap="round" />
              <g className="ear-twitch-3d">
                <path d="M50 65 L28 22 L72 45 Z" fill="#E2E8F0" />
                <path d="M48 60 L35 30 L64 47 Z" fill="#F472B6" />
                <path d="M150 65 L172 22 L128 45 Z" fill="#E2E8F0" />
                <path d="M152 60 L165 30 L136 47 Z" fill="#F472B6" />
              </g>
              <circle cx="100" cy="80" r="46" fill="#F8FAFC" />
              <rect x="36" y="60" width="16" height="32" fill="#0284C7" rx="8" />
              <rect x="148" y="60" width="16" height="32" fill="#0284C7" rx="8" />
              <ellipse cx="80" cy="78" rx="10" ry="14" fill="#0284C7" />
              <circle cx="77" cy="73" r="4" fill="#FFFFFF" />
              <ellipse cx="120" cy="78" rx="10" ry="14" fill="#0284C7" />
              <circle cx="117" cy="73" r="4" fill="#FFFFFF" />
              <polygon points="100,90 97,87 103,87" fill="#F472B6" />
              <path d="M93 94 Q100 102 107 94" stroke="#BE185D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <path d="M62 118 Q100 135 138 118 L124 148 L100 156 L76 148 Z" fill="#2563EB" />
            </svg>
          </div>
          
          <p className="neko__panel-emotion">{currentCatState.mood} {currentCatState.title}</p>

          <div className="neko__panel-tips">
            <p className="neko__panel-tip">{message}</p>
          </div>

          <div className="neko__panel-xp">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-muted">XP to Next Level</span>
              <span className="font-semibold">{xp % 500}/500</span>
            </div>
            <div className="progress-bar-wrapper">
              <div className="progress-bar-fill" style={{ width: `${(xp % 500) / 5}%` }} />
            </div>
          </div>

          <button className="btn btn-ghost btn-sm btn-full" onClick={() => {
            const msgs = currentCatState.messages;
            setMessage(msgs[Math.floor(Math.random() * msgs.length)]);
            setShowBubble(true);
          }} style={{ marginTop: 'var(--space-2)' }}>
            Get Encouragement 💬
          </button>
        </div>
      )}

      {/* Interactive 3D Animated Anime Cat Character Canvas (No Dark Box Frame) */}
      <div
        className="neko-3d-floating-avatar"
        onClick={handleAvatarClick}
        title="Click to interact with 3D Neko Cat"
      >
        {/* Soft 3D Glow Aura */}
        <div className="neko-3d-floating-aura" style={{ background: currentCatState.glowColor }} />

        {/* 3D Animated Vector SVG Canvas with Tail Wagging, Ear Twitching & Eye Blinking */}
        <div className="neko-3d-floating-canvas">
          <svg width="95" height="95" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="catBody3D" cx="35%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="70%" stopColor="#F1F5F9" />
                <stop offset="100%" stopColor="#CBD5E1" />
              </radialGradient>
              <radialGradient id="catEarInner" cx="30%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#F472B6" />
                <stop offset="100%" stopColor="#DB2777" />
              </radialGradient>
              <radialGradient id="headsetCup3D" cx="30%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#38BDF8" />
                <stop offset="60%" stopColor="#0284C7" />
                <stop offset="100%" stopColor="#0369A1" />
              </radialGradient>
              <linearGradient id="eyeGradient3D" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#38BDF8" />
                <stop offset="50%" stopColor="#0284C7" />
                <stop offset="100%" stopColor="#1E3A8A" />
              </linearGradient>
              <filter id="shadow3D" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="6" stdDeviation="5" floodColor="#0F172A" floodOpacity="0.4" />
              </filter>
            </defs>

            {/* 3D Soft Ground Drop Shadow */}
            <ellipse cx="100" cy="186" rx="50" ry="9" fill="#0F172A" opacity="0.3" />

            {/* Continuous 3D Wagging Tail */}
            <path d="M145 140 C175 140, 185 90, 160 85 C145 80, 150 115, 135 130" stroke="#0284C7" strokeWidth="10" strokeLinecap="round" fill="none" className="tail-wag-3d" />

            {/* 3D Cat Body */}
            <ellipse cx="100" cy="140" rx="42" ry="38" fill="url(#catBody3D)" filter="url(#shadow3D)" />

            {/* Headset Band */}
            <path d="M48 70 C48 20, 152 20, 152 70" stroke="#1E293B" strokeWidth="8" fill="none" strokeLinecap="round" />
            <path d="M52 70 C52 25, 148 25, 148 70" stroke="#0284C7" strokeWidth="4" fill="none" strokeLinecap="round" />

            {/* 3D Ears with Twitching Animation */}
            <g className="ear-twitch-3d">
              <path d="M50 65 L28 22 L72 45 Z" fill="url(#catBody3D)" filter="url(#shadow3D)" />
              <path d="M48 60 L35 30 L64 47 Z" fill="url(#catEarInner)" />
              <path d="M150 65 L172 22 L128 45 Z" fill="url(#catBody3D)" filter="url(#shadow3D)" />
              <path d="M152 60 L165 30 L136 47 Z" fill="url(#catEarInner)" />
            </g>

            {/* 3D Spherical Head */}
            <circle cx="100" cy="80" r="46" fill="url(#catBody3D)" filter="url(#shadow3D)" />

            {/* Metallic Headset Cups with "A" Emblem */}
            <rect x="36" y="60" width="16" height="32" fill="url(#headsetCup3D)" rx="8" />
            <rect x="148" y="60" width="16" height="32" fill="url(#headsetCup3D)" rx="8" />
            <text x="41" y="80" fill="#FFFFFF" fontSize="11" fontWeight="bold">A</text>
            <text x="153" y="80" fill="#FFFFFF" fontSize="11" fontWeight="bold">A</text>

            {/* Headset Mic */}
            <path d="M48 85 Q70 108 92 98" stroke="#0284C7" strokeWidth="3.5" fill="none" strokeLinecap="round" />
            <circle cx="94" cy="98" r="4.5" fill="#38BDF8" />

            {/* Expressive 3D Eyes with Blinking */}
            <g className="eyes-group-3d">
              {blinking ? (
                <>
                  <path d="M72 80 Q80 88 88 80" stroke="#0F172A" strokeWidth="3.5" strokeLinecap="round" fill="none" />
                  <path d="M112 80 Q120 88 128 80" stroke="#0F172A" strokeWidth="3.5" strokeLinecap="round" fill="none" />
                </>
              ) : currentCatState.key === 'excellent' ? (
                <>
                  <path d="M72 82 Q80 74 88 82" stroke="#0F172A" strokeWidth="4" strokeLinecap="round" fill="none" />
                  <ellipse cx="120" cy="78" rx="10" ry="14" fill="url(#eyeGradient3D)" />
                  <circle cx="117" cy="73" r="4" fill="#FFFFFF" />
                  <circle cx="122" cy="83" r="2" fill="#FFFFFF" />
                </>
              ) : (
                <>
                  <ellipse cx="80" cy="78" rx="10" ry="14" fill="url(#eyeGradient3D)" />
                  <ellipse cx="80" cy="78" rx="9" ry="13" stroke="#0F172A" strokeWidth="1.5" />
                  <circle cx="77" cy="73" r="4" fill="#FFFFFF" />
                  <circle cx="82" cy="83" r="2" fill="#FFFFFF" />

                  <ellipse cx="120" cy="78" rx="10" ry="14" fill="url(#eyeGradient3D)" />
                  <ellipse cx="120" cy="78" rx="9" ry="13" stroke="#0F172A" strokeWidth="1.5" />
                  <circle cx="117" cy="73" r="4" fill="#FFFFFF" />
                  <circle cx="122" cy="83" r="2" fill="#FFFFFF" />
                </>
              )}
            </g>

            {/* Nose & Mouth */}
            <polygon points="100,90 97,87 103,87" fill="#F472B6" />
            <path d="M93 94 Q100 102 107 94" stroke="#BE185D" strokeWidth="2.5" strokeLinecap="round" fill="none" />

            {/* Blue Scarf with "A" Emblem */}
            <path d="M62 118 Q100 135 138 118 L124 148 L100 156 L76 148 Z" fill="#2563EB" stroke="#1D4ED8" strokeWidth="1" filter="url(#shadow3D)" />
            <polygon points="100,126 93,142 107,142" fill="#38BDF8" />
            <text x="96" y="139" fill="#FFFFFF" fontSize="10" fontWeight="bold">A</text>

            {/* Waving Paw Animation */}
            <circle cx="152" cy="120" r="11" fill="url(#catBody3D)" filter="url(#shadow3D)" className="paw-wave-3d" />
            <circle cx="152" cy="120" r="5" fill="#F472B6" opacity="0.8" />
          </svg>
        </div>

        {/* Dynamic Performance Mood Tag */}
        <div className="neko-3d-floating-pill" style={{ background: currentCatState.borderColor }}>
          <span>{currentCatState.mood}</span>
          <span>{currentCatState.badge}</span>
        </div>
      </div>
    </div>
  );
}
