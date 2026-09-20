// ============================================
// PlaceMentor AI — Professional Female AI Interviewer Avatar Component
// Corporate virtual interviewer avatar with active state indicators (Speaking, Listening, Thinking, Waiting)
// ============================================
import React from 'react';
import { Mic, Volume2, Sparkles, Brain, CheckCircle, Clock } from 'lucide-react';
import './ProfessionalAIInterviewer.css';

export default function ProfessionalAIInterviewer({ state = 'waiting', questionText = '' }) {
  // state: 'speaking' | 'listening' | 'thinking' | 'waiting' | 'encouraging'

  const stateConfig = {
    speaking: { badge: '🗣️ AI Interviewer Speaking...', color: 'var(--primary)', glow: 'rgba(79, 70, 229, 0.4)' },
    listening: { badge: '🎧 Listening to your response...', color: 'var(--secondary)', glow: 'rgba(34, 197, 94, 0.4)' },
    thinking: { badge: '🧠 Processing answer & preparing follow-up...', color: 'var(--purple)', glow: 'rgba(168, 85, 247, 0.4)' },
    waiting: { badge: '⏳ Ready - Awaiting your response', color: 'var(--accent)', glow: 'rgba(245, 158, 11, 0.4)' },
    encouraging: { badge: '🌟 Great response! Next question coming up', color: 'var(--teal)', glow: 'rgba(20, 184, 166, 0.4)' }
  };

  const current = stateConfig[state] || stateConfig.waiting;

  return (
    <div className="pro-ai-interviewer">
      {/* Video Feed Frame */}
      <div className="pro-ai-video-frame" style={{ borderColor: current.color, boxShadow: `0 0 30px ${current.glow}` }}>
        {/* Status Badge */}
        <div className="pro-ai-status-badge" style={{ background: current.color }}>
          {current.badge}
        </div>

        {/* Live Audio Waveform (Active when speaking or listening) */}
        {(state === 'speaking' || state === 'listening') && (
          <div className="pro-ai-waveform">
            <span className="wave-bar" />
            <span className="wave-bar" />
            <span className="wave-bar" />
            <span className="wave-bar" />
            <span className="wave-bar" />
          </div>
        )}

        {/* Corporate Female AI Avatar Illustration */}
        <div className="pro-ai-avatar-graphic">
          <svg width="240" height="240" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="hairGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1E293B" />
                <stop offset="100%" stopColor="#334155" />
              </linearGradient>
              <linearGradient id="skinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FED7AA" />
                <stop offset="100%" stopColor="#FDBA74" />
              </linearGradient>
              <linearGradient id="suitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4F46E5" />
                <stop offset="100%" stopColor="#3730A3" />
              </linearGradient>
              <linearGradient id="headsetGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06B6D4" />
                <stop offset="100%" stopColor="#3B82F6" />
              </linearGradient>
            </defs>

            {/* Background Halo */}
            <circle cx="100" cy="100" r="90" fill="url(#suitGrad)" opacity="0.12" />

            {/* Suit & Collar (Corporate Blazer) */}
            <path d="M40 190 C40 145, 160 145, 160 190 Z" fill="url(#suitGrad)" />
            <path d="M85 145 L100 170 L115 145 Z" fill="#FFFFFF" />
            <path d="M70 145 L100 190 L130 145 Z" fill="#312E81" opacity="0.3" />

            {/* Neck */}
            <rect x="90" y="125" width="20" height="25" fill="url(#skinGrad)" rx="4" />

            {/* Hair Back */}
            <path d="M55 75 C55 35, 145 35, 145 75 C145 125, 55 125, 55 75 Z" fill="url(#hairGrad)" />

            {/* Face Oval */}
            <ellipse cx="100" cy="85" rx="34" ry="42" fill="url(#skinGrad)" />

            {/* Eyes */}
            <ellipse cx="88" cy="82" rx="4.5" ry="5.5" fill="#0F172A" />
            <ellipse cx="112" cy="82" rx="4.5" ry="5.5" fill="#0F172A" />
            <circle cx="89.5" cy="80.5" r="1.5" fill="#FFFFFF" />
            <circle cx="113.5" cy="80.5" r="1.5" fill="#FFFFFF" />

            {/* Eyebrows */}
            <path d="M82 73 Q88 70 94 73" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M106 73 Q112 70 118 73" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" fill="none" />

            {/* Nose */}
            <path d="M100 84 L98 93 L102 93" stroke="#EA580C" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6" />

            {/* Mouth / Smile */}
            {state === 'speaking' ? (
              <ellipse cx="100" cy="104" rx="7" ry="4" fill="#991B1B" />
            ) : (
              <path d="M92 102 Q100 108 108 102" stroke="#991B1B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            )}

            {/* Professional Hair Front / Bangs */}
            <path d="M66 65 Q100 45 134 65 Q115 50 100 50 Q85 50 66 65 Z" fill="url(#hairGrad)" />

            {/* Virtual Executive Headset */}
            <path d="M64 80 C64 50, 136 50, 136 80" stroke="url(#headsetGrad)" strokeWidth="4" fill="none" strokeLinecap="round" />
            <rect x="60" y="74" width="8" height="16" fill="url(#headsetGrad)" rx="3" />
            <rect x="132" y="74" width="8" height="16" fill="url(#headsetGrad)" rx="3" />
            <path d="M64 85 Q75 105 92 105" stroke="url(#headsetGrad)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <circle cx="93" cy="105" r="3.5" fill="#06B6D4" />
          </svg>
        </div>

        {/* Corporate Title overlay */}
        <div className="pro-ai-info-overlay">
          <p className="pro-ai-name">Ms. Sarah Vance</p>
          <p className="pro-ai-role">Senior AI Technical & HR Interviewer</p>
        </div>
      </div>
    </div>
  );
}
