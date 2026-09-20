// ============================================
// PlaceMentor AI — Professional Female Anime AI Interviewer Avatar Component
// Ms. Sarah Vance: Clean high-quality 2.5D Anime Corporate Virtual Interviewer
// ============================================
import React from 'react';
import './ProfessionalFemaleAnimeInterviewer.css';

export default function ProfessionalFemaleAnimeInterviewer({ state = 'waiting' }) {
  // state: 'speaking' | 'listening' | 'thinking' | 'waiting' | 'encouraging' | 'happy'

  const stateConfig = {
    speaking: { badge: '🗣️ Ms. Sarah Vance Speaking...', color: '#4F46E5', glow: 'rgba(79, 70, 229, 0.4)' },
    listening: { badge: '🎧 Listening to your response...', color: '#10B981', glow: 'rgba(16, 185, 129, 0.4)' },
    thinking: { badge: '🧠 Evaluating & generating follow-up...', color: '#A855F7', glow: 'rgba(168, 85, 247, 0.4)' },
    waiting: { badge: '⏳ Ready - Awaiting your verbal response', color: '#F59E0B', glow: 'rgba(245, 158, 11, 0.4)' },
    encouraging: { badge: '🌟 Excellent point! Next question coming up', color: '#14B8A6', glow: 'rgba(20, 184, 166, 0.4)' },
    happy: { badge: '😊 Positive feedback noted', color: '#3B82F6', glow: 'rgba(59, 130, 246, 0.4)' }
  };

  const current = stateConfig[state] || stateConfig.waiting;

  return (
    <div className="anime-interviewer-wrapper">
      <div className="anime-interviewer-card" style={{ borderColor: current.color, boxShadow: `0 0 25px ${current.glow}` }}>
        {/* Status Pill Badge */}
        <div className="anime-status-badge" style={{ background: current.color }}>
          {current.badge}
        </div>

        {/* Live Audio Waves for Speaking & Listening */}
        {(state === 'speaking' || state === 'listening') && (
          <div className="anime-sound-wave">
            <span className="wave-bar" />
            <span className="wave-bar" />
            <span className="wave-bar" />
            <span className="wave-bar" />
            <span className="wave-bar" />
          </div>
        )}

        {/* High Quality Professional Female Anime Vector Graphic */}
        <div className="anime-avatar-graphic">
          <svg width="250" height="250" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="hairGradSarah" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1E1B4B" />
                <stop offset="50%" stopColor="#312E81" />
                <stop offset="100%" stopColor="#4338CA" />
              </linearGradient>
              <linearGradient id="skinGradSarah" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFF7ED" />
                <stop offset="100%" stopColor="#FFEDD5" />
              </linearGradient>
              <linearGradient id="blazerGradSarah" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1E293B" />
                <stop offset="100%" stopColor="#0F172A" />
              </linearGradient>
              <linearGradient id="eyeGradSarah" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0284C7" />
                <stop offset="100%" stopColor="#0369A1" />
              </linearGradient>
            </defs>

            {/* Ambient Background Aura */}
            <circle cx="100" cy="95" r="85" fill="#4338CA" opacity="0.1" />

            {/* Back Hair */}
            <path d="M45 80 C40 140, 155 140, 155 80 C155 40, 45 40, 45 80 Z" fill="url(#hairGradSarah)" />

            {/* Suit & Corporate Blazer */}
            <path d="M35 190 C35 140, 165 140, 165 190 Z" fill="url(#blazerGradSarah)" />
            <path d="M80 140 L100 175 L120 140 Z" fill="#FFFFFF" />
            <path d="M68 140 L100 190 L132 140 Z" fill="#4F46E5" opacity="0.3" />

            {/* Neck */}
            <rect x="88" y="120" width="24" height="25" fill="url(#skinGradSarah)" rx="4" />

            {/* Anime Face Shape */}
            <path d="M65 75 Q65 125 100 135 Q135 125 135 75 Q135 45 100 45 Q65 45 65 75 Z" fill="url(#skinGradSarah)" />

            {/* Expressive Anime Eyes */}
            <g className="anime-eye-group">
              {/* Left Eye */}
              <ellipse cx="84" cy="80" rx="9" ry="13" fill="url(#eyeGradSarah)" />
              <ellipse cx="84" cy="80" rx="8" ry="12" stroke="#0F172A" strokeWidth="1.5" />
              <circle cx="81.5" cy="75.5" r="3.5" fill="#FFFFFF" />
              <circle cx="86.5" cy="84.5" r="1.5" fill="#FFFFFF" />
              
              {/* Right Eye */}
              <ellipse cx="116" cy="80" rx="9" ry="13" fill="url(#eyeGradSarah)" />
              <ellipse cx="116" cy="80" rx="8" ry="12" stroke="#0F172A" strokeWidth="1.5" />
              <circle cx="113.5" cy="75.5" r="3.5" fill="#FFFFFF" />
              <circle cx="118.5" cy="84.5" r="1.5" fill="#FFFFFF" />
            </g>

            {/* Anime Eyelashes & Brows */}
            <path d="M72 68 Q84 63 94 67" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" fill="none" />
            <path d="M106 67 Q116 63 128 68" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" fill="none" />
            <path d="M74 61 Q84 57 92 60" stroke="#312E81" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M108 60 Q116 57 126 61" stroke="#312E81" strokeWidth="2.5" strokeLinecap="round" fill="none" />

            {/* Cute Anime Nose */}
            <circle cx="100" cy="92" r="1.5" fill="#C2410C" opacity="0.6" />

            {/* Mouth States */}
            {state === 'speaking' ? (
              <ellipse cx="100" cy="106" rx="6" ry="5" fill="#BE185D" />
            ) : state === 'encouraging' || state === 'happy' ? (
              <path d="M92 103 Q100 110 108 103" stroke="#BE185D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            ) : (
              <path d="M94 104 Q100 107 106 104" stroke="#BE185D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            )}

            {/* Anime Hair Bangs */}
            <path d="M60 65 C70 42, 130 42, 140 65 C125 50, 110 52, 100 62 C90 52, 75 50, 60 65 Z" fill="url(#hairGradSarah)" />
            <path d="M92 50 Q100 70 108 50" fill="url(#hairGradSarah)" />

            {/* Executive Headset with Mic */}
            <path d="M60 78 C60 42, 140 42, 140 78" stroke="#38BDF8" strokeWidth="3.5" fill="none" strokeLinecap="round" />
            <rect x="56" y="72" width="8" height="16" fill="#38BDF8" rx="3" />
            <rect x="136" y="72" width="8" height="16" fill="#38BDF8" rx="3" />
            <path d="M60 82 Q72 108 92 108" stroke="#38BDF8" strokeWidth="2" fill="none" strokeLinecap="round" />
            <circle cx="93" cy="108" r="3" fill="#0284C7" />
          </svg>
        </div>

        {/* Corporate Overlay Tag */}
        <div className="anime-overlay-tag">
          <p className="anime-name">Ms. Sarah Vance</p>
          <p className="anime-title">Lead Anime AI Technical & HR Interviewer</p>
        </div>
      </div>
    </div>
  );
}
