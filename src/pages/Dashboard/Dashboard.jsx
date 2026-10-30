// ============================================
// PlaceMentor AI — Dashboard Page
// Distinct Separation: Professional 3D Female Anime Mentor in AI Mentor Card
// & Floating Cute Neko Anime Cat Companion across app
// ============================================
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Brain, Code2, BookOpen, Video, ArrowRight,
  Flame, Trophy, Zap, Target, Calendar, TrendingUp,
  Clock, Star, ChevronRight, Play, CheckCircle2
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../config/firebase';
import CircularProgress from '../../components/ui/CircularProgress';
import ProfessionalFemaleAnimeMentor from '../../components/ProfessionalFemaleAnimeMentor';
import { progressService, getTodayDateStr } from '../../services/progress/progressService';
import './Dashboard.css';

export default function Dashboard() {
  const { user, userProfile } = useAuth();
  const { setNekoEmotion, completeActivity } = useApp();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(userProfile);
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const h = new Date().getHours();
    if (h < 12) setGreeting('Good morning');
    else if (h < 17) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  // Live Firestore updates
  useEffect(() => {
    if (!user?.uid) return;
    const unsub = onSnapshot(
      doc(db, 'users', user.uid),
      snap => {
        if (snap.exists()) setProfile(snap.data());
      },
      err => {
        console.warn('[Dashboard Profile Snapshot Notice]', err);
      }
    );
    return unsub;
  }, [user?.uid]);

  const firstName = profile?.displayName?.split(' ')[0] || user?.displayName?.split(' ')[0] || 'Student';
  const readiness = profile?.placementReadiness || 0;
  const streak = profile?.streak || 0;
  const codingScore = profile?.codingScore || 0;
  const aptitudeScore = profile?.aptitudeScore || 0;

  // Dynamic Today's Goals & Real Learning Progress from Student Activity
  const todayGoals = progressService.getTodayGoalsStatus(profile);
  const continueItems = progressService.getContinueLearningStatus(profile);

  // Compute 7-day streak activity for current week (Mon - Sun)
  const getStreakDayActive = (dayIndex) => {
    const today = new Date();
    const currentDayOfWeek = (today.getDay() + 6) % 7; // Monday = 0
    if (dayIndex > currentDayOfWeek) return false;
    const diff = currentDayOfWeek - dayIndex;
    const targetDate = new Date();
    targetDate.setDate(today.getDate() - diff);
    const dateStr = `${targetDate.getFullYear()}-${String(targetDate.getMonth() + 1).padStart(2, '0')}-${String(targetDate.getDate()).padStart(2, '0')}`;
    return Boolean(profile?.dailyActivity?.[dateStr] || (diff === 0 && streak > 0));
  };

  const quickStats = [
    { label: 'Day Streak', value: streak, icon: '🔥', color: 'accent', suffix: '' },
    { label: 'Coding Score', value: `${codingScore}%`, icon: '💻', color: 'primary', suffix: '' },
    { label: 'Aptitude Score', value: `${aptitudeScore}%`, icon: '📊', color: 'secondary', suffix: '' },
    { label: 'XP Points', value: profile?.xp || 0, icon: '⚡', color: 'purple', suffix: '' },
  ];

  return (
    <div className="page dashboard">
      {/* Header Greeting */}
      <div className="dashboard__header animate-fadeInDown">
        <div>
          <p className="dashboard__greeting">{greeting},</p>
          <h1 className="dashboard__name">{firstName} 👋</h1>
          <p className="dashboard__sub">Ready to crack your placement today?</p>
        </div>
        <div className="dashboard__readiness-circle">
          <CircularProgress value={readiness} size={100} strokeWidth={10} />
          <span className="dashboard__readiness-label">Placement<br/>Readiness</span>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="dashboard__stats animate-fadeInUp">
        {quickStats.map((stat, i) => (
          <div key={stat.label} className={`dashboard__stat-card animate-fadeInUp delay-${(i+1)*100}`}>
            <span className="dashboard__stat-emoji">{stat.icon}</span>
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="dashboard__grid">
        {/* Left Column */}
        <div className="dashboard__left">
          {/* Today's Goals */}
          <div className="card dashboard__goals-card animate-fadeInLeft">
            <div className="section-heading">
              <div className="flex items-center gap-2">
                <div className="icon-box icon-box-primary"><Target size={18} /></div>
                <div>
                  <h3 style={{ fontSize: 'var(--text-base)', margin: 0 }}>Today's Goals</h3>
                  <p className="text-xs text-muted">{new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
                </div>
              </div>
            </div>
            <div className="dashboard__goals-list">
              {todayGoals.map((goal, i) => (
                <button
                  key={goal.id || i}
                  className={`dashboard__goal-item ${goal.done ? 'dashboard__goal-item--done' : ''}`}
                  onClick={() => navigate(goal.path)}
                >
                  <span className="dashboard__goal-emoji">{goal.icon}</span>
                  <div className="flex-1 text-left">
                    <span className={`dashboard__goal-label ${goal.done ? 'line-through text-muted' : ''}`} style={{ fontSize: 'var(--text-xs)' }}>
                      {goal.label}
                    </span>
                  </div>
                  {goal.done ? (
                    <span className="badge badge-teal text-xs flex items-center gap-1 font-semibold">
                      <CheckCircle2 size={13} /> Done
                    </span>
                  ) : (
                    <ChevronRight size={16} className="text-muted" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Continue Learning */}
          <div className="card dashboard__continue-card animate-fadeInLeft delay-100">
            <div className="section-heading">
              <div className="flex items-center gap-2">
                <div className="icon-box icon-box-secondary"><Play size={18} /></div>
                <h3 style={{ fontSize: 'var(--text-base)', margin: 0 }}>Continue Learning</h3>
              </div>
            </div>
            <div className="dashboard__continue-list">
              {continueItems.map((item, i) => {
                const Icon = item.iconType === 'code' ? Code2 : item.iconType === 'book' ? BookOpen : Video;
                return (
                  <button key={i} className="dashboard__continue-item" onClick={() => navigate(item.path)}>
                    <div className={`icon-box icon-box-${item.color} icon-box-sm`}><Icon size={14} /></div>
                    <div className="flex-1 text-left">
                      <p className="text-sm font-medium">{item.title}</p>
                      <p className="text-xs text-muted">{item.sub}</p>
                      <div className="progress-bar-wrapper" style={{ marginTop: 'var(--space-1)', height: 4 }}>
                        <div className={`progress-bar-fill ${item.color === 'secondary' ? 'green' : ''}`}
                          style={{ width: `${item.progress}%`, height: 4 }} />
                      </div>
                    </div>
                    <span className="text-xs font-medium" style={{ color: `var(--${item.color})` }}>{item.progress}%</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="dashboard__right">
          {/* AI Mentor Card with Professional Female Anime AI Mentor (Dr. Elena Rostova) */}
          <div className="card dashboard__mentor-card animate-fadeInRight flex flex-col items-center text-center p-5">
            <div className="dashboard__mentor-bg" />
            <div className="my-2 flex justify-center">
              <ProfessionalFemaleAnimeMentor />
            </div>
            <div className="mb-4">
              <h3 className="dashboard__mentor-title" style={{ fontSize: 'var(--text-lg)' }}>Dr. Elena Rostova</h3>
              <p className="dashboard__mentor-sub" style={{ fontSize: 'var(--text-xs)' }}>Professional AI Placement Mentor</p>
            </div>
            <button className="btn btn-primary btn-sm btn-full" onClick={() => navigate('/mentor')}>
              Talk to Mentor <ArrowRight size={14} />
            </button>
          </div>

          {/* Streak Card */}
          <div className="card dashboard__streak-card animate-fadeInRight delay-100">
            <div className="dashboard__streak-header">
              <div className="icon-box icon-box-accent">
                <Flame size={18} />
              </div>
              <div>
                <h3 style={{ fontSize: 'var(--text-base)', margin: 0 }}>Daily Streak</h3>
                <p className="text-xs text-muted">Keep it going!</p>
              </div>
              <div className="dashboard__streak-flame">
                🔥
              </div>
            </div>
            <div className="dashboard__streak-count">{streak}</div>
            <div className="dashboard__streak-label">Day Streak</div>
            <div className="dashboard__streak-days">
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((dayLetter, i) => (
                <div key={i} className={`dashboard__streak-day ${getStreakDayActive(i) ? 'active' : ''}`} title={`Week Day ${i+1}`}>
                  {dayLetter}
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Interview */}
          <div className="card dashboard__interview-card animate-fadeInRight delay-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="icon-box icon-box-purple"><Video size={18} /></div>
              <div>
                <h3 style={{ fontSize: 'var(--text-base)', margin: 0 }}>Mock Interview</h3>
                <p className="text-xs text-muted">Practice makes perfect</p>
              </div>
            </div>
            <div className="dashboard__interview-types">
              {[
                { label: 'HR Interview', icon: '💼', color: 'primary' },
                { label: 'Technical', icon: '⚙️', color: 'teal' },
                { label: 'Coding Round', icon: '💻', color: 'secondary' },
              ].map(type => (
                <button key={type.label} className="dashboard__interview-type"
                  onClick={() => navigate('/interview')}>
                  <span>{type.icon}</span>
                  <span className="text-xs font-medium">{type.label}</span>
                </button>
              ))}
            </div>
            <button className="btn btn-outline btn-sm btn-full" style={{ marginTop: 'var(--space-3)' }}
              onClick={() => navigate('/interview')}>
              Start Interview <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Progress Summary */}
      <div className="card dashboard__progress animate-fadeInUp delay-300">
        <div className="section-heading">
          <div className="flex items-center gap-2">
            <div className="icon-box icon-box-primary"><TrendingUp size={18} /></div>
            <h3 style={{ margin: 0, fontSize: 'var(--text-base)' }}>Weekly Progress</h3>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={() => navigate('/progress')}>
            View All <ArrowRight size={14} />
          </button>
        </div>
        <div className="dashboard__progress-bars">
          {[
            { label: 'Coding Practice', value: codingScore, color: '', icon: '💻' },
            { label: 'Aptitude', value: aptitudeScore, color: 'green', icon: '📊' },
            { label: 'Interview Skills', value: profile?.interviewScore || 0, color: 'gold', icon: '🎤' },
          ].map(bar => (
            <div key={bar.label} className="dashboard__progress-item">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">{bar.icon} {bar.label}</span>
                <span className="text-sm font-bold" style={{ color: 'var(--primary)' }}>{bar.value}%</span>
              </div>
              <div className="progress-bar-wrapper">
                <div className={`progress-bar-fill ${bar.color}`} style={{ width: `${bar.value}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
