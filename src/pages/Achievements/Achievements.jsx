// ============================================
// PlaceMentor AI — Achievements, Medals & Daily Streaks Page
// ============================================
import React from 'react';
import { achievementsList } from '../../data/achievements';
import { Trophy, Award, Lock, CheckCircle, Flame, Calendar, Star, Zap } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import './Achievements.css';

export default function Achievements() {
  const { userProfile } = useAuth();
  const { currentStreak, todayActivities } = useApp();

  const streak = userProfile?.streak || currentStreak || 0;
  const xp = userProfile?.xp || 0;

  // Medals classification
  const medals = [
    {
      id: 'bronze',
      tier: 'Bronze',
      icon: '🥉',
      title: 'Bronze Preparation Medal',
      req: 'Complete 1 practice session in Coding or Aptitude',
      unlocked: true,
      color: 'var(--accent)'
    },
    {
      id: 'silver',
      tier: 'Silver',
      icon: '🥈',
      title: 'Silver Consistency Medal',
      req: 'Maintain a 3-day continuous learning streak',
      unlocked: streak >= 3,
      color: 'var(--teal)'
    },
    {
      id: 'gold',
      tier: 'Gold',
      icon: '🥇',
      title: 'Gold Placement Champion Medal',
      req: 'Maintain a 7-day streak and achieve >80% interview score',
      unlocked: streak >= 7 || (userProfile?.interviewScore || 0) >= 80,
      color: 'var(--gold)'
    }
  ];

  return (
    <div className="page achievements-page">
      <div className="section-heading mb-6">
        <div>
          <h2>Achievements, Medals & Daily Streaks 🏆</h2>
          <p className="text-secondary-color">Track milestone medals, active streaks, and continuous learning streaks.</p>
        </div>
      </div>

      {/* Streak & Medal Stats Bar */}
      <div className="grid-3 mb-6">
        <div className="card flex items-center gap-4">
          <span className="text-4xl">🔥</span>
          <div>
            <span className="text-xs text-muted font-bold uppercase">Current Streak</span>
            <div className="stat-value text-accent">{streak} Days</div>
            <span className="text-xs text-muted">Longest: {Math.max(streak, 7)} Days</span>
          </div>
        </div>

        <div className="card flex items-center gap-4">
          <span className="text-4xl">🥇</span>
          <div>
            <span className="text-xs text-muted font-bold uppercase">Earned Medals</span>
            <div className="stat-value text-primary-color">
              {medals.filter(m => m.unlocked).length} / {medals.length}
            </div>
            <span className="text-xs text-muted">Bronze, Silver & Gold</span>
          </div>
        </div>

        <div className="card flex items-center gap-4">
          <span className="text-4xl">⚡</span>
          <div>
            <span className="text-xs text-muted font-bold uppercase">Total XP</span>
            <div className="stat-value text-purple">{xp} XP</div>
            <span className="text-xs text-muted">Level {Math.floor(xp / 500) + 1} Aspirant</span>
          </div>
        </div>
      </div>

      {/* 1. Medals Section */}
      <div className="card mb-6">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Award size={20} className="text-accent" /> Placement Medals
        </h3>
        <div className="grid-3">
          {medals.map(m => (
            <div key={m.id} className={`medal-card ${!m.unlocked ? 'locked' : ''} card`}>
              <div className="flex justify-between items-start mb-3">
                <span className="text-5xl">{m.icon}</span>
                <span className={`badge badge-${m.id === 'gold' ? 'accent' : m.id === 'silver' ? 'teal' : 'primary'}`}>
                  {m.tier}
                </span>
              </div>
              <h4 className="text-base font-bold mb-1">{m.title}</h4>
              <p className="text-xs text-muted mb-4">{m.req}</p>
              <div className="flex justify-between items-center text-xs font-semibold">
                {m.unlocked ? (
                  <span className="text-success flex items-center gap-1"><CheckCircle size={14} /> Unlocked</span>
                ) : (
                  <span className="text-muted flex items-center gap-1"><Lock size={14} /> Locked</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Streak Calendar & Weekly Activity */}
      <div className="card mb-6">
        <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
          <Calendar size={20} className="text-primary-color" /> Weekly Activity & Streak Calendar
        </h3>
        <div className="grid-7 mb-4">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => (
            <div key={day} className="text-center p-3 bg-surface-2 rounded-lg">
              <span className="text-xs font-bold text-muted block mb-1">{day}</span>
              <span className="text-xl">{idx < (streak % 7 || 3) ? '🔥' : '⚪'}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Badges Grid */}
      <div className="card">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Trophy size={20} className="text-primary-color" /> Milestone Badges
        </h3>
        <div className="grid-auto">
          {achievementsList.map(item => (
            <div key={item.id} className={`card achievement-card ${!item.unlocked ? 'locked' : ''}`}>
              <div className="flex justify-between items-start mb-3">
                <span className="achievement-icon text-4xl">{item.icon}</span>
                <span className={`badge badge-${item.tier === 'Gold' ? 'accent' : item.tier === 'Silver' ? 'teal' : 'primary'}`}>
                  {item.tier}
                </span>
              </div>
              <h4 className="text-base font-bold mb-1">{item.title}</h4>
              <p className="text-xs text-muted mb-4">{item.description}</p>
              <div className="flex justify-between items-center text-xs font-semibold">
                {item.unlocked ? (
                  <span className="text-success flex items-center gap-1"><CheckCircle size={14} /> Unlocked</span>
                ) : (
                  <span className="text-muted flex items-center gap-1"><Lock size={14} /> Locked</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
