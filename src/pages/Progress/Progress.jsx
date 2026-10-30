// ============================================
// PlaceMentor AI — Progress Analytics Dashboard
// Real-time synchronization with student practice, tests, and mock interviews
// ============================================
import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar, Legend } from 'recharts';
import { BarChart3, TrendingUp, CheckCircle, Flame, Target, Award, Brain, Zap, AlertTriangle, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { progressService } from '../../services/progress/progressService';
import './Progress.css';

export default function Progress() {
  const { userProfile } = useAuth();

  // Dynamic 7-day rolling analytics from student's dailyActivity
  const weeklyData = progressService.getWeeklyActivityAnalytics(userProfile?.dailyActivity);

  // Dynamic performance analysis across all attempted topics
  const { strong: strongTopics, weak: weakTopics, hasRealData } = progressService.getStrongAndWeakTopics(userProfile?.topicStats);

  const totalXP = userProfile?.xp || 0;
  const streak = userProfile?.streak || 0;
  const codingScore = userProfile?.codingScore || 0;
  const aptitudeScore = userProfile?.aptitudeScore || 0;
  const interviewScore = userProfile?.interviewScore || 0;
  const readiness = userProfile?.placementReadiness || 0;

  return (
    <div className="page progress-page">
      <div className="section-heading mb-6">
        <div>
          <h2>Placement Progress Analytics 📈</h2>
          <p className="text-secondary-color">Track real performance metrics dynamically computed from your coding practice, aptitude quizzes, and mock interviews.</p>
        </div>
      </div>

      {/* Top Real Stats Summary */}
      <div className="grid-4 mb-6">
        <div className="card text-center p-4">
          <div className="icon-box icon-box-accent mx-auto mb-2" style={{ width: 42, height: 42, margin: '0 auto 8px' }}>
            <Flame size={20} />
          </div>
          <h3 className="text-2xl font-bold text-accent" style={{ margin: 0 }}>{streak}</h3>
          <p className="text-xs text-muted mt-1">Day Streak</p>
        </div>

        <div className="card text-center p-4">
          <div className="icon-box icon-box-purple mx-auto mb-2" style={{ width: 42, height: 42, margin: '0 auto 8px' }}>
            <Zap size={20} />
          </div>
          <h3 className="text-2xl font-bold text-purple" style={{ margin: 0 }}>{totalXP}</h3>
          <p className="text-xs text-muted mt-1">Total XP Points</p>
        </div>

        <div className="card text-center p-4">
          <div className="icon-box icon-box-primary mx-auto mb-2" style={{ width: 42, height: 42, margin: '0 auto 8px' }}>
            <Target size={20} />
          </div>
          <h3 className="text-2xl font-bold text-primary" style={{ margin: 0 }}>{readiness}%</h3>
          <p className="text-xs text-muted mt-1">Placement Readiness</p>
        </div>

        <div className="card text-center p-4">
          <div className="icon-box icon-box-teal mx-auto mb-2" style={{ width: 42, height: 42, margin: '0 auto 8px' }}>
            <Award size={20} />
          </div>
          <h3 className="text-2xl font-bold text-teal" style={{ margin: 0 }}>
            {userProfile?.completedItemIds?.length || 0}
          </h3>
          <p className="text-xs text-muted mt-1">Milestones Completed</p>
        </div>
      </div>

      {/* Main Charts */}
      <div className="grid-2 mb-6">
        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 style={{ fontSize: 'var(--text-base)', margin: 0 }}>Skill Growth Trend</h3>
              <p className="text-xs text-muted" style={{ margin: 0 }}>Live performance across rounds (0-100%)</p>
            </div>
            <span className="badge badge-primary">Rolling 7 Days</span>
          </div>
          <div style={{ width: '100%', height: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="day" stroke="var(--text-muted)" fontSize={12} />
                <YAxis stroke="var(--text-muted)" fontSize={12} domain={[0, 100]} />
                <Tooltip contentStyle={{ background: 'var(--surface)', borderColor: 'var(--border)', borderRadius: 'var(--radius-md)' }} />
                <Legend />
                <Line type="monotone" dataKey="coding" stroke="var(--primary)" strokeWidth={3} name="Coding Score" dot={{ r: 4 }} />
                <Line type="monotone" dataKey="aptitude" stroke="var(--secondary)" strokeWidth={3} name="Aptitude Score" dot={{ r: 4 }} />
                <Line type="monotone" dataKey="interview" stroke="var(--purple)" strokeWidth={3} name="Interview Score" dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 style={{ fontSize: 'var(--text-base)', margin: 0 }}>Daily Activity XP Points</h3>
              <p className="text-xs text-muted" style={{ margin: 0 }}>XP earned per day from practice & tests</p>
            </div>
            <span className="badge badge-accent">XP Points</span>
          </div>
          <div style={{ width: '100%', height: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="day" stroke="var(--text-muted)" fontSize={12} />
                <YAxis stroke="var(--text-muted)" fontSize={12} />
                <Tooltip contentStyle={{ background: 'var(--surface)', borderColor: 'var(--border)', borderRadius: 'var(--radius-md)' }} />
                <Bar dataKey="xp" fill="var(--accent, #f59e0b)" radius={[6, 6, 0, 0]} name="XP Earned" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Weak vs Strong Topics Dynamically Evaluated */}
      <div className="grid-2">
        <div className="card" style={{ borderLeft: '4px solid var(--danger)' }}>
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-base font-bold flex items-center gap-2 text-danger" style={{ margin: 0 }}>
              <AlertTriangle size={18} /> Topics Needing Focus (&lt;60% Accuracy)
            </h3>
            {hasRealData && <span className="badge badge-danger text-xs">{weakTopics.length} Areas</span>}
          </div>
          <div className="flex flex-col gap-2">
            {weakTopics.map((t, i) => (
              <div key={i} className="flex justify-between items-center p-2 rounded" style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
                <span className="text-xs font-medium">{t.name || t}</span>
                {t.accuracy !== undefined && (
                  <span className="text-xs font-bold text-danger">{t.accuracy}% Accuracy</span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="card" style={{ borderLeft: '4px solid var(--success, #10b981)' }}>
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-base font-bold flex items-center gap-2 text-success" style={{ margin: 0 }}>
              <ShieldCheck size={18} /> Strong Mastery Topics (≥70% Accuracy)
            </h3>
            {hasRealData && <span className="badge badge-teal text-xs">{strongTopics.length} Mastered</span>}
          </div>
          <div className="flex flex-col gap-2">
            {strongTopics.map((t, i) => (
              <div key={i} className="flex justify-between items-center p-2 rounded" style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
                <span className="text-xs font-medium">{t.name || t}</span>
                {t.accuracy !== undefined && (
                  <span className="text-xs font-bold text-success">{t.accuracy}% Accuracy</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
