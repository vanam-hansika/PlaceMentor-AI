// ============================================
// PlaceMentor AI — Progress Analytics Dashboard
// ============================================
import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar } from 'recharts';
import { BarChart3, TrendingUp, CheckCircle, Flame, Target, Award, Brain } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './Progress.css';

const weeklyData = [
  { day: 'Mon', coding: 40, aptitude: 55, interview: 30 },
  { day: 'Tue', coding: 60, aptitude: 65, interview: 45 },
  { day: 'Wed', coding: 75, aptitude: 70, interview: 50 },
  { day: 'Thu', coding: 70, aptitude: 80, interview: 60 },
  { day: 'Fri', coding: 85, aptitude: 75, interview: 70 },
  { day: 'Sat', coding: 90, aptitude: 85, interview: 80 },
  { day: 'Sun', coding: 95, aptitude: 90, interview: 85 },
];

export default function Progress() {
  const { userProfile } = useAuth();

  const weakTopics = ['Dynamic Programming', 'Probability & Statistics', 'System Design Basics'];
  const strongTopics = ['Arrays & Hashing', 'Blood Relations', 'Grammar & Vocabulary'];

  return (
    <div className="page progress-page">
      <div className="section-heading mb-6">
        <div>
          <h2>Placement Progress Analytics 📈</h2>
          <p className="text-secondary-color">Track performance metrics across coding, aptitude, and interview rounds.</p>
        </div>
      </div>

      {/* Main Charts */}
      <div className="grid-2 mb-6">
        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <h3 style={{ fontSize: 'var(--text-base)', margin: 0 }}>Skill Growth Trend</h3>
            <span className="badge badge-primary">Weekly</span>
          </div>
          <div style={{ width: '100%', height: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="day" stroke="var(--text-muted)" fontSize={12} />
                <YAxis stroke="var(--text-muted)" fontSize={12} />
                <Tooltip contentStyle={{ background: 'var(--surface)', borderColor: 'var(--border)', borderRadius: 'var(--radius-md)' }} />
                <Line type="monotone" dataKey="coding" stroke="var(--primary)" strokeWidth={3} name="Coding" />
                <Line type="monotone" dataKey="aptitude" stroke="var(--secondary)" strokeWidth={3} name="Aptitude" />
                <Line type="monotone" dataKey="interview" stroke="var(--purple)" strokeWidth={3} name="Interview" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <h3 style={{ fontSize: 'var(--text-base)', margin: 0 }}>Daily Activity Points</h3>
            <span className="badge badge-accent">XP Points</span>
          </div>
          <div style={{ width: '100%', height: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="day" stroke="var(--text-muted)" fontSize={12} />
                <YAxis stroke="var(--text-muted)" fontSize={12} />
                <Tooltip contentStyle={{ background: 'var(--surface)', borderColor: 'var(--border)', borderRadius: 'var(--radius-md)' }} />
                <Bar dataKey="coding" fill="var(--primary)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Weak vs Strong Topics */}
      <div className="grid-2">
        <div className="card" style={{ borderLeft: '4px solid var(--danger)' }}>
          <h3 className="text-base font-bold mb-3 flex items-center gap-2 text-danger">
            ⚠️ Topics Needing Focus
          </h3>
          <ul className="text-sm text-secondary-color" style={{ paddingLeft: 16 }}>
            {weakTopics.map((t, i) => <li key={i} className="mb-2">{t}</li>)}
          </ul>
        </div>

        <div className="card" style={{ borderLeft: '4px solid var(--secondary)' }}>
          <h3 className="text-base font-bold mb-3 flex items-center gap-2 text-success">
            🌟 Strong Mastery Topics
          </h3>
          <ul className="text-sm text-secondary-color" style={{ paddingLeft: 16 }}>
            {strongTopics.map((t, i) => <li key={i} className="mb-2">{t}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
}
