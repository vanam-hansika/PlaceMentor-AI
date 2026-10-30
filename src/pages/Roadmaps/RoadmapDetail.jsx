// ============================================
// PlaceMentor AI — Interactive Career Roadmap Detail Page
// 10 Progressive Milestone Stages, Timeline Stepper, XP Rewards & Firestore Sync
// ============================================

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft, ArrowRight, CheckCircle2, Circle, Clock, Check, ExternalLink,
  BookOpen, Sparkles, Award, Zap, Code2, Video, FileText,
  Briefcase, Compass, ChevronDown, ChevronUp, Share2, Layers,
  Layout, Server, Brain, Cpu, Cloud, ShieldCheck, CheckSquare,
  Activity, GraduationCap, Trophy, Terminal, Smartphone,
  BarChart3, Database, Repeat, Coffee, AlertCircle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { roadmapService } from '../../services/roadmap/roadmapService';
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

export default function RoadmapDetail() {
  const { roadmapId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showToast, setNekoEmotion } = useApp();

  const [roadmap, setRoadmap] = useState(null);
  const [progress, setProgress] = useState({
    completedStages: [],
    inProgressStage: 1,
    percentage: 0
  });
  const [loading, setLoading] = useState(true);
  const [togglingStage, setTogglingStage] = useState(null);
  const [expandedStages, setExpandedStages] = useState({});

  useEffect(() => {
    const r = roadmapService.getRoadmapById(roadmapId);
    if (!r) {
      navigate('/roadmaps', { replace: true });
      return;
    }
    setRoadmap(r);

    // Initial expand: all stages expanded by default for full readability
    const initialExpanded = {};
    r.stages.forEach(s => {
      initialExpanded[s.stageNumber] = true;
    });
    setExpandedStages(initialExpanded);

    // Load user's saved progress
    if (user?.uid) {
      roadmapService.getUserRoadmapProgress(user.uid, r.id).then(userProg => {
        if (userProg) setProgress(userProg);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [roadmapId, user?.uid, navigate]);

  const toggleExpand = (stageNum) => {
    setExpandedStages(prev => ({
      ...prev,
      [stageNum]: !prev[stageNum]
    }));
  };

  const handleToggleStage = async (stageNum) => {
    if (!user) {
      showToast('Please sign in to save your roadmap milestones!', 'warning');
      return;
    }

    setTogglingStage(stageNum);
    try {
      const res = await roadmapService.toggleStageCompletion(user, roadmap.id, stageNum);
      if (res) {
        setProgress(res.progress);
        if (res.isNowCompleted) {
          setNekoEmotion('celebrating');
          showToast(`Milestone Completed! +${res.xpGained} XP Awarded 🎉`, 'success');
          if (res.progress.percentage === 100) {
            showToast(`🏆 Congratulations! You have fully mastered the ${roadmap.title} Roadmap!`, 'success');
          }
        } else {
          showToast(`Stage marked as in-progress.`, 'info');
        }
      }
    } catch (err) {
      console.warn('Toggle stage notice:', err);
    } finally {
      setTogglingStage(null);
    }
  };

  if (!roadmap) return null;

  const IconComp = ICON_MAP[roadmap.icon] || Compass;
  const completedStages = progress.completedStages || [];
  const inProgressStage = progress.inProgressStage || 1;
  const percentage = progress.percentage || 0;

  return (
    <div className="page roadmap-detail-page animate-fadeIn">
      {/* Back Button Navigation */}
      <div className="flex items-center gap-3">
        <button
          className="btn btn-ghost btn-sm flex items-center gap-1 text-muted"
          onClick={() => navigate('/roadmaps')}
        >
          <ArrowLeft size={16} /> Back to All Career Roadmaps
        </button>
      </div>

      {/* Header Overview Card */}
      <div className="roadmap-detail-header card">
        <div className="flex justify-between items-start flex-wrap gap-4 mb-4">
          <div className="flex items-start gap-3">
            <div className="icon-box icon-box-primary icon-box-lg" style={{ width: 56, height: 56 }}>
              <IconComp size={28} />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className="badge badge-primary text-xs">{roadmap.category}</span>
                <span className="badge badge-teal text-xs">{roadmap.difficulty}</span>
                <span className="badge badge-accent text-xs">
                  <Clock size={11} className="inline mr-1" /> {roadmap.duration}
                </span>
              </div>
              <h1 className="text-2xl font-black mb-1" style={{ margin: 0 }}>
                {roadmap.title} Roadmap
              </h1>
              <p className="text-xs text-muted" style={{ margin: '4px 0 0' }}>
                Prerequisites: {roadmap.prerequisites}
              </p>
            </div>
          </div>

          {/* Student Progress Badge & Stats */}
          <div className="card p-3 text-center" style={{ minWidth: 200, background: 'var(--surface-2)' }}>
            <div className="flex justify-between items-center text-xs mb-1 font-bold">
              <span>Overall Completion</span>
              <span className="text-primary">{percentage}%</span>
            </div>
            <div className="card-progress-bar" style={{ height: 8 }}>
              <div className="card-progress-fill" style={{ width: `${percentage}%` }} />
            </div>
            <p className="text-xs text-muted mt-2" style={{ margin: '6px 0 0' }}>
              <strong>{completedStages.length}</strong> of 10 Stages Completed (+{completedStages.length * 30} XP)
            </p>
          </div>
        </div>

        <p className="text-xs text-secondary-color" style={{ lineHeight: 1.6, margin: '0 0 var(--space-4) 0' }}>
          {roadmap.overview}
        </p>

        {/* Technologies Pills */}
        <div className="flex items-center gap-2 flex-wrap pt-3 border-t">
          <span className="text-xs text-muted font-bold">Core Technologies:</span>
          {roadmap.technologies.map((t, idx) => (
            <span key={idx} className="chip active text-xs" style={{ padding: '2px 8px' }}>
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Connected Milestone Timeline Stepper */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Layers size={18} className="text-primary" />
            <h2 className="text-lg font-bold" style={{ margin: 0 }}>
              Curated 10-Stage Milestone Path
            </h2>
          </div>
          <span className="text-xs text-muted">
            Click checkboxes to mark milestones and earn +30 XP each
          </span>
        </div>

        <div className="roadmap-stepper">
          {roadmap.stages.map((stg) => {
            const isCompleted = completedStages.includes(stg.stageNumber);
            const isInProgress = !isCompleted && stg.stageNumber === inProgressStage;
            const isExpanded = expandedStages[stg.stageNumber] !== false;

            return (
              <div
                key={stg.id}
                className={`roadmap-step-item ${
                  isCompleted ? 'step-item--completed' : isInProgress ? 'step-item--inprogress' : ''
                }`}
              >
                {/* Node Circle */}
                <div
                  className="step-node"
                  title={`Stage ${stg.stageNumber}: ${isCompleted ? 'Completed' : isInProgress ? 'Currently In Progress' : 'Upcoming'}`}
                >
                  {isCompleted ? (
                    <Check size={20} strokeWidth={3} />
                  ) : (
                    <span>{stg.stageNumber}</span>
                  )}
                </div>

                {/* Step Card Content */}
                <div className="step-card">
                  <div className="step-header">
                    <div>
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="badge badge-outline text-xs">Stage {stg.stageNumber}</span>
                        <span className="text-xs text-muted flex items-center gap-1">
                          <Clock size={11} /> Est: {stg.estimatedTime}
                        </span>
                        {stg.prerequisites !== 'None' && (
                          <span className="text-xs text-muted">
                            • Prereq: {stg.prerequisites}
                          </span>
                        )}
                      </div>
                      <h3 className="text-base font-bold" style={{ margin: 0 }}>
                        {stg.title}
                      </h3>
                    </div>

                    {/* Completion Toggle Button */}
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        className={`step-check-btn ${isCompleted ? 'checked' : ''} ${togglingStage === stg.stageNumber ? 'btn-loading' : ''}`}
                        onClick={() => handleToggleStage(stg.stageNumber)}
                        disabled={togglingStage === stg.stageNumber}
                        aria-label={`Toggle stage ${stg.stageNumber} completion`}
                      >
                        {isCompleted ? (
                          <>
                            <CheckCircle2 size={15} /> Completed (+30 XP)
                          </>
                        ) : (
                          <>
                            <Circle size={15} /> Mark Completed
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        className="btn btn-ghost btn-xs text-muted"
                        onClick={() => toggleExpand(stg.stageNumber)}
                        aria-label="Toggle details view"
                      >
                        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-secondary-color mb-3" style={{ lineHeight: 1.5 }}>
                    {stg.summary}
                  </p>

                  {/* Expandable Body */}
                  {isExpanded && (
                    <div className="flex flex-col gap-3 pt-2 border-t">
                      {/* Topics Covered */}
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wide text-muted mb-2">
                          Key Topics & Subtopics:
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {stg.topics.map((top, idx) => (
                            <span key={idx} className="roadmap-tech-chip">
                              • {top}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Learning Objectives */}
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wide text-primary mb-2">
                          Learning Objectives:
                        </h4>
                        <ul className="text-xs text-secondary-color flex flex-col gap-1 pl-4" style={{ margin: 0 }}>
                          {stg.objectives.map((obj, idx) => (
                            <li key={idx} style={{ lineHeight: 1.4 }}>
                              {obj}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Practical Task / Project Callout */}
                      {stg.practicalTask && (
                        <div className="step-task-box">
                          <p className="text-xs font-bold text-primary flex items-center gap-1 mb-1">
                            <Sparkles size={13} /> Practical Milestone Task:
                          </p>
                          <p className="text-xs" style={{ margin: 0, lineHeight: 1.4 }}>
                            {stg.practicalTask}
                          </p>
                        </div>
                      )}

                      {/* Curated Resources & PlaceMentor Internal Quick Action */}
                      <div className="flex justify-between items-center flex-wrap gap-2 pt-2 border-t mt-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs text-muted font-bold">Curated Resources:</span>
                          {stg.resources && stg.resources.map((res, idx) => (
                            <a
                              key={idx}
                              href={res.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="step-resource-link"
                            >
                              <span>{res.title}</span>
                              {res.isFree && <span className="badge badge-teal" style={{ fontSize: 9, padding: '1px 4px' }}>Free</span>}
                              <ExternalLink size={10} />
                            </a>
                          ))}
                        </div>

                        {/* Direct Link to PlaceMentor AI practice module */}
                        {stg.platformLink && (
                          <Link to={stg.platformLink.path} className="step-platform-action">
                            <span>{stg.platformLink.label}</span>
                            <ArrowRight size={13} />
                          </Link>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Support Banner */}
      <div className="card p-5 text-center mt-4">
        <h3 className="text-base font-bold mb-1">Looking to Accelerate Your Placement Prep? 🚀</h3>
        <p className="text-xs text-muted mb-4 max-w-lg mx-auto">
          Combine this roadmap with daily coding practice, topic-wise aptitude drills, and AI face-to-face mock interviews on PlaceMentor AI.
        </p>
        <div className="flex justify-center gap-3 flex-wrap">
          <Link to="/coding" className="btn btn-outline btn-sm flex items-center gap-1">
            <Code2 size={14} /> Coding Practice
          </Link>
          <Link to="/interview" className="btn btn-outline btn-sm flex items-center gap-1">
            <Video size={14} /> AI Mock Interview
          </Link>
          <Link to="/resume" className="btn btn-outline btn-sm flex items-center gap-1">
            <FileText size={14} /> Resume Builder
          </Link>
          <Link to="/jobs" className="btn btn-primary btn-sm flex items-center gap-1">
            <Briefcase size={14} /> View Verified Jobs
          </Link>
        </div>
      </div>
    </div>
  );
}
