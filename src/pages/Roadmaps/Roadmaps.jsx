// ============================================
// PlaceMentor AI — Career Roadmaps Hub
// 19 Interactive Industry Roadmaps with Live Student Progress & Personalized Matching
// ============================================

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Compass, Search, Filter, Sparkles, CheckCircle2, ArrowRight,
  Clock, BookOpen, TrendingUp, Award, Flame, Zap, Layers,
  Layout, Server, Brain, Cpu, Cloud, ShieldCheck, CheckSquare,
  Activity, GraduationCap, Trophy, Briefcase, Terminal, Smartphone,
  BarChart3, Database, Repeat, Coffee
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { roadmapService } from '../../services/roadmap/roadmapService';
import { ROADMAP_CATEGORIES, DIFFICULTY_LEVELS } from '../../data/careerRoadmapsData';
import './Roadmaps.css';

// Icon mapping helper
const ICON_MAP = {
  Layout: Layout,
  Server: Server,
  Layers: Layers,
  Coffee: Coffee,
  Terminal: Terminal,
  Smartphone: Smartphone,
  BarChart3: BarChart3,
  Brain: Brain,
  Cpu: Cpu,
  Sparkles: Sparkles,
  Database: Database,
  Cloud: Cloud,
  Repeat: Repeat,
  ShieldCheck: ShieldCheck,
  CheckSquare: CheckSquare,
  Activity: Activity,
  GraduationCap: GraduationCap,
  Trophy: Trophy,
  Briefcase: Briefcase
};

export default function Roadmaps() {
  const { user, userProfile } = useAuth();
  const { showToast } = useApp();
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [userRoadmapMap, setUserRoadmapMap] = useState({});
  const [recommendations, setRecommendations] = useState([]);

  // Load roadmaps & student's active roadmap progress
  useEffect(() => {
    if (user?.uid) {
      roadmapService.getAllUserRoadmaps(user.uid).then(map => {
        setUserRoadmapMap(map || {});
      });
    }
    const recs = roadmapService.getPersonalizedRecommendations(userProfile);
    setRecommendations(recs);
  }, [user?.uid, userProfile]);

  const filteredRoadmaps = roadmapService.filterRoadmaps(
    selectedCategory,
    selectedDifficulty,
    search
  );

  const getDifficultyBadge = (diff) => {
    switch (diff) {
      case 'Beginner Friendly':
        return 'badge-teal';
      case 'Intermediate':
        return 'badge-primary';
      case 'Advanced':
        return 'badge-purple';
      default:
        return 'badge-outline';
    }
  };

  return (
    <div className="page roadmaps-page animate-fadeIn">
      {/* Hero Banner */}
      <div className="roadmaps-hero flex justify-between items-center flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="badge badge-primary text-xs font-bold">19 Curated Learning Paths</span>
            <span className="badge badge-teal text-xs font-bold">10 Progressive Milestones Each</span>
          </div>
          <h1 className="text-2xl font-black mb-1" style={{ margin: '0 0 6px 0' }}>
            Interactive Career Roadmaps 🗺️
          </h1>
          <p className="text-sm text-secondary-color" style={{ margin: 0, maxWidth: 640 }}>
            Structured, milestone-driven technical roadmaps tailored for college students, freshers, and 2026/2027/2028 placement aspirants. Track your progress, unlock XP, and master role-specific skills.
          </p>
        </div>

        <div className="flex gap-2 items-center">
          <button
            className="btn btn-outline btn-sm flex items-center gap-1"
            onClick={() => navigate('/career')}
            title="View AI Career Matching Analysis"
          >
            <Compass size={14} /> Career AI Matcher
          </button>
        </div>
      </div>

      {/* Personalized Recommendations Section */}
      {recommendations.length > 0 && !search && selectedCategory === 'All' && (
        <div className="animate-fadeInDown">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2">
              <Sparkles size={18} className="text-accent" />
              <h3 className="text-base font-bold" style={{ margin: 0 }}>Recommended for You</h3>
            </div>
            <span className="text-xs text-muted">Matched using your profile preferences & scores</span>
          </div>

          <div className="recommendations-grid">
            {recommendations.map(({ roadmap: r, matchScore, reason }) => {
              const IconComp = ICON_MAP[r.icon] || Compass;
              const progressObj = userRoadmapMap[r.id];
              const pct = progressObj?.percentage || 0;

              return (
                <div key={r.id} className="recommendation-card">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <div className="icon-box icon-box-primary icon-box-sm">
                        <IconComp size={18} />
                      </div>
                      <span className="badge badge-accent text-xs font-bold">
                        {matchScore}% Match
                      </span>
                    </div>

                    <h4 className="text-base font-bold mb-1">{r.title}</h4>
                    <p className="text-xs text-secondary-color mb-3" style={{ lineHeight: 1.5 }}>
                      {r.shortDescription}
                    </p>

                    <div className="quiz-explanation-box mb-3 p-2 text-xs" style={{ borderLeft: '3px solid var(--primary)' }}>
                      <strong>Why Recommended:</strong> {reason}
                    </div>
                  </div>

                  <div>
                    {pct > 0 && (
                      <div className="mb-2">
                        <div className="flex justify-between text-xs text-muted mb-1 font-medium">
                          <span>Your Progress</span>
                          <span className="text-primary font-bold">{pct}%</span>
                        </div>
                        <div className="card-progress-bar">
                          <div className="card-progress-fill" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    )}

                    <button
                      className="btn btn-primary btn-sm btn-full flex items-center justify-center gap-1"
                      onClick={() => navigate(`/roadmaps/${r.id}`)}
                    >
                      {pct > 0 ? 'Continue Roadmap' : 'Start Career Roadmap'} <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Filter & Search Bar */}
      <div className="card p-4 roadmaps-filter-bar">
        <div className="flex justify-between items-center flex-wrap gap-3">
          {/* Search Box */}
          <div className="input-with-icon flex-1" style={{ minWidth: 260 }}>
            <Search size={15} className="input-icon" />
            <input
              type="text"
              className="input text-xs"
              placeholder="Search by role, skill, or tech (e.g. React, Java, Docker, SQL, Python)..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          {/* Difficulty Dropdown / Filter */}
          <div className="flex items-center gap-1">
            <span className="text-xs text-muted">Difficulty:</span>
            <select
              className="input text-xs"
              value={selectedDifficulty}
              onChange={e => setSelectedDifficulty(e.target.value)}
              style={{ width: 'auto', padding: '6px 12px' }}
            >
              {DIFFICULTY_LEVELS.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Chips */}
        <div className="filter-chips-row pt-2 border-t">
          {ROADMAP_CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`chip text-xs ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Roadmaps Grid */}
      <div className="roadmaps-grid">
        {filteredRoadmaps.length > 0 ? (
          filteredRoadmaps.map(roadmap => {
            const IconComp = ICON_MAP[roadmap.icon] || Compass;
            const progressObj = userRoadmapMap[roadmap.id];
            const pct = progressObj?.percentage || 0;
            const completedCount = progressObj?.completedStages?.length || 0;

            return (
              <div key={roadmap.id} className="roadmap-card">
                <div>
                  {/* Card Top Header */}
                  <div className="flex justify-between items-start mb-3">
                    <div className="icon-box icon-box-primary">
                      <IconComp size={20} />
                    </div>
                    <div className="flex gap-1 items-center flex-wrap justify-end">
                      <span className={`badge ${getDifficultyBadge(roadmap.difficulty)} text-xs`}>
                        {roadmap.difficulty}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-base font-bold mb-1">{roadmap.title}</h3>
                  <span className="text-xs text-muted block mb-2">{roadmap.category}</span>

                  <p className="text-xs text-secondary-color mb-3" style={{ lineHeight: 1.5 }}>
                    {roadmap.shortDescription}
                  </p>

                  {/* Metadata Chips: Duration & Prerequisites */}
                  <div className="flex items-center gap-3 text-xs text-muted mb-2">
                    <span className="flex items-center gap-1">
                      <Clock size={12} /> {roadmap.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpen size={12} /> 10 Stages
                    </span>
                  </div>

                  {/* Technologies Tags */}
                  <div className="roadmap-tech-tags">
                    {roadmap.technologies.slice(0, 5).map((t, i) => (
                      <span key={i} className="roadmap-tech-chip">{t}</span>
                    ))}
                    {roadmap.technologies.length > 5 && (
                      <span className="roadmap-tech-chip text-primary font-bold">
                        +{roadmap.technologies.length - 5} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Footer: Progress & Action Button */}
                <div className="pt-3 border-t">
                  {pct > 0 ? (
                    <div className="mb-3">
                      <div className="flex justify-between text-xs mb-1 font-semibold">
                        <span className="text-success flex items-center gap-1">
                          <CheckCircle2 size={12} /> {completedCount} of 10 Stages Completed
                        </span>
                        <span className="text-primary font-bold">{pct}%</span>
                      </div>
                      <div className="card-progress-bar">
                        <div className="card-progress-fill" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  ) : (
                    <div className="text-xs text-muted mb-3 flex items-center gap-1">
                      <span>Prerequisites: {roadmap.prerequisites}</span>
                    </div>
                  )}

                  <button
                    className={`btn btn-sm btn-full flex items-center justify-center gap-1 ${pct > 0 ? 'btn-primary' : 'btn-outline'}`}
                    onClick={() => navigate(`/roadmaps/${roadmap.id}`)}
                  >
                    {pct > 0 ? 'Continue Roadmap' : 'Explore Full Roadmap'} <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="card text-center p-12 col-span-full">
            <Compass size={40} className="text-muted mx-auto mb-3" />
            <h3 className="text-base font-bold mb-1">No Roadmaps Match Your Filter</h3>
            <p className="text-xs text-muted mb-4">
              Try adjusting your search query, difficulty level, or category filter above.
            </p>
            <button
              className="btn btn-outline btn-sm mx-auto"
              onClick={() => {
                setSearch('');
                setSelectedCategory('All');
                setSelectedDifficulty('All');
              }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
