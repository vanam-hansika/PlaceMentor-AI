// ============================================
// PlaceMentor AI — Target Company Roadmap & Preparation Page
// Scalable Aliases Search Engine, Dynamic Company Kit Generation & Zero-Crash Fallbacks
// ============================================
import React, { useState, useEffect } from 'react';
import { companyKits, searchCompanies, getCompanyKit } from '../../data/companies';
import {
  Building2, Search, ArrowRight, CheckCircle2, Award, BookOpen,
  Briefcase, Code2, Layers, CheckSquare, ShieldCheck, Sparkles, HelpCircle, FileText,
  RotateCcw, AlertCircle, PlusCircle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import './Companies.css';

export default function Companies() {
  const { userProfile, updateUserProfile } = useAuth();
  const { showToast } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCompany, setSelectedCompany] = useState(() => {
    const initialName = userProfile?.targetCompany || 'Google';
    return getCompanyKit(initialName);
  });

  const [activeTab, setActiveTab] = useState('roadmap'); // 'roadmap' | 'previousQuestions'
  const [questionCategory, setQuestionCategory] = useState('All'); // 'All' | 'Coding' | 'Technical' | 'HR' | 'Aptitude'
  const [completedStages, setCompletedStages] = useState({});

  // Search using alias-aware searchCompanies engine
  const filteredCompanies = searchCompanies(searchTerm);

  // Sync selected company if userProfile targetCompany updates
  useEffect(() => {
    if (userProfile?.targetCompany) {
      const kit = getCompanyKit(userProfile.targetCompany);
      if (kit && kit.name.toLowerCase() !== selectedCompany?.name?.toLowerCase()) {
        setSelectedCompany(kit);
      }
    }
  }, [userProfile?.targetCompany]);

  const toggleStage = (stageName) => {
    setCompletedStages(prev => {
      const updated = { ...prev, [stageName]: !prev[stageName] };
      showToast(updated[stageName] ? 'Stage marked as completed! 🎯' : 'Stage unchecked', 'info');
      return updated;
    });
  };

  const handleSelectTarget = async (compOrName) => {
    const kit = typeof compOrName === 'string' ? getCompanyKit(compOrName) : getCompanyKit(compOrName.name || compOrName.id);
    setSelectedCompany(kit);
    try {
      await updateUserProfile({ targetCompany: kit.name });
      showToast(`Set ${kit.name} as your Target Company! 🎯`, 'success');
    } catch (err) {
      console.warn('Profile target update notice:', err);
    }
  };

  const handleGenerateCustomRoadmap = (customName) => {
    const kit = getCompanyKit(customName);
    setSelectedCompany(kit);
    showToast(`Generated preparation roadmap for ${kit.name}! 🚀`, 'success');
  };

  // Safe question filtering
  const questionsList = selectedCompany?.previousQuestions || [];
  const filteredQuestions = questionCategory === 'All'
    ? questionsList
    : questionsList.filter(q => (q.type || '').toLowerCase() === questionCategory.toLowerCase());

  return (
    <div className="page companies-page">
      {/* Page Header */}
      <div className="section-heading mb-6">
        <div>
          <h2>Target Company Roadmap & Preparation 🏢</h2>
          <p className="text-secondary-color">
            Visual preparation roadmaps, required skills, technical topics, and previous interview questions for top placement firms.
          </p>
        </div>
      </div>

      <div className="companies-layout">
        {/* Left Column: Company Search & Selector Sidebar */}
        <div className="companies-list card">
          <div className="input-with-icon mb-4">
            <Search size={16} className="input-icon" />
            <input
              type="text"
              className="input"
              placeholder="Search e.g. Tata, Wipro, Microsoft, TCS..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="company-items">
            {filteredCompanies.length > 0 ? (
              filteredCompanies.map(comp => {
                const isSelected = selectedCompany?.id === comp.id || selectedCompany?.name?.toLowerCase() === comp.name.toLowerCase();
                const isTarget = userProfile?.targetCompany?.toLowerCase() === comp.name.toLowerCase();
                return (
                  <button
                    key={comp.id}
                    className={`company-item ${isSelected ? 'active' : ''}`}
                    onClick={() => handleSelectTarget(comp)}
                  >
                    <span className="text-3xl">{comp.logo || '🏢'}</span>
                    <div className="flex-1 text-left">
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-sm" style={{ margin: 0 }}>{comp.name}</p>
                        {isTarget && <span className="badge badge-accent text-xs">Target</span>}
                      </div>
                      <p className="text-xs text-muted" style={{ margin: 0 }}>
                        {comp.category} • {comp.salary || 'Best in Market'}
                      </p>
                    </div>
                    <span className={`tag tag-${(comp.difficulty || 'Medium').toLowerCase() === 'hard' ? 'hard' : 'medium'}`}>
                      {comp.difficulty || 'Medium'}
                    </span>
                  </button>
                );
              })
            ) : (
              <div className="text-center p-5 flex flex-col items-center gap-2">
                <AlertCircle size={26} className="text-accent mb-1" />
                <p className="text-sm font-bold text-primary" style={{ margin: 0 }}>Company Not In Directory</p>
                <p className="text-xs text-muted">Generate dynamic roadmap for "{searchTerm}"</p>
                <button
                  className="btn btn-primary btn-xs mt-1 flex items-center gap-1"
                  onClick={() => handleGenerateCustomRoadmap(searchTerm)}
                >
                  <PlusCircle size={13} /> Load {searchTerm} Kit
                </button>
                <button
                  className="btn btn-ghost btn-xs text-xs mt-1"
                  onClick={() => setSearchTerm('')}
                >
                  <RotateCcw size={12} /> Reset Search
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Roadmap & Previous Questions Panel */}
        <div className="company-details card">
          {/* Company Header Banner */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <span className="text-4xl">{selectedCompany?.logo || '🏢'}</span>
              <div>
                <h2 style={{ margin: 0, fontSize: 'var(--text-2xl)' }}>{selectedCompany?.name || 'Target'} Target Kit</h2>
                <p className="text-sm text-muted" style={{ margin: 0 }}>
                  {selectedCompany?.category || 'Tech Company'} • Package: <strong className="text-primary-color">{selectedCompany?.salary || 'Competitive'}</strong>
                </p>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex gap-2">
              <button
                className={`btn ${activeTab === 'roadmap' ? 'btn-primary' : 'btn-outline'} btn-sm`}
                onClick={() => setActiveTab('roadmap')}
              >
                <Layers size={14} /> Roadmap
              </button>
              <button
                className={`btn ${activeTab === 'previousQuestions' ? 'btn-primary' : 'btn-outline'} btn-sm`}
                onClick={() => setActiveTab('previousQuestions')}
              >
                <HelpCircle size={14} /> Previous Questions
              </button>
            </div>
          </div>

          {/* TAB 1: Visual Target Company Preparation Roadmap */}
          {activeTab === 'roadmap' && (
            <div className="animate-fadeInUp flex flex-col gap-6">
              {/* Preparation Stages Checklist */}
              <div>
                <h3 className="text-base font-bold mb-3 flex items-center gap-2">
                  <Sparkles size={18} className="text-accent" /> Personalized Preparation Stages
                </h3>
                <div className="roadmap-stages-list flex flex-col gap-3">
                  {(selectedCompany?.roadmapStages || []).map((stg, idx) => {
                    const isDone = completedStages[stg.stage] || stg.completed;
                    return (
                      <div key={idx} className={`quiz-explanation-box flex items-center justify-between ${isDone ? 'done-stage' : ''}`}>
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={isDone}
                            onChange={() => toggleStage(stg.stage)}
                            style={{ width: 18, height: 18, cursor: 'pointer' }}
                          />
                          <div>
                            <p className="text-sm font-bold" style={{ margin: 0 }}>{stg.stage}</p>
                            <p className="text-xs text-muted" style={{ margin: 0 }}>{stg.topics}</p>
                          </div>
                        </div>
                        <span className={`badge ${isDone ? 'badge-secondary' : 'badge-primary'} text-xs`}>
                          {isDone ? 'Completed' : `Stage ${idx + 1}`}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Required Skills & Technical Subjects */}
              <div className="grid-2">
                <div className="quiz-explanation-box">
                  <h4 className="text-xs font-bold text-primary mb-2 uppercase tracking-wide flex items-center gap-1">
                    <Code2 size={14} /> Required Skills
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {(selectedCompany?.requiredSkills || []).map((sk, i) => (
                      <span key={i} className="chip active text-xs">{sk}</span>
                    ))}
                  </div>
                </div>

                <div className="quiz-explanation-box">
                  <h4 className="text-xs font-bold text-teal mb-2 uppercase tracking-wide flex items-center gap-1">
                    <BookOpen size={14} /> Technical Subjects
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {(selectedCompany?.technicalSubjects || []).map((sub, i) => (
                      <span key={i} className="chip text-xs">{sub}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Programming Topics & Aptitude Topics */}
              <div className="grid-2">
                <div className="quiz-explanation-box">
                  <h4 className="text-xs font-bold text-accent mb-2 uppercase tracking-wide">Programming Topics</h4>
                  <div className="flex flex-wrap gap-2">
                    {(selectedCompany?.programmingTopics || []).map((top, i) => (
                      <span key={i} className="badge badge-accent text-xs">{top}</span>
                    ))}
                  </div>
                </div>

                <div className="quiz-explanation-box">
                  <h4 className="text-xs font-bold text-purple mb-2 uppercase tracking-wide">Aptitude Topics</h4>
                  <div className="flex flex-wrap gap-2">
                    {(selectedCompany?.aptitudeTopics || []).map((apt, i) => (
                      <span key={i} className="badge badge-teal text-xs">{apt}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Detailed Round Guidelines */}
              <div className="quiz-explanation-box" style={{ borderLeft: '4px solid var(--primary)' }}>
                <h4 className="text-sm font-bold text-primary mb-3">Round-by-Round Preparation Strategy</h4>
                <div className="flex flex-col gap-2 text-xs">
                  <p><strong>Coding Preparation:</strong> {selectedCompany?.codingPrep || 'Focus on fundamental data structures and algorithmic problem solving.'}</p>
                  <p><strong>Technical Interview Prep:</strong> {selectedCompany?.techInterviewPrep || 'Review core CS subjects, OOP principles, and project architecture.'}</p>
                  <p><strong>HR & Behavioral Prep:</strong> {selectedCompany?.hrPrep || 'Prepare STAR framework responses and research company values.'}</p>
                </div>
              </div>

              {/* Recommended Resources */}
              <div>
                <h4 className="text-xs font-bold text-muted mb-2 uppercase tracking-wide flex items-center gap-1">
                  <FileText size={14} /> Recommended Resources
                </h4>
                <div className="flex gap-2 flex-wrap">
                  {(selectedCompany?.recommendedResources || []).map((res, i) => (
                    <span key={i} className="badge badge-primary text-xs">{res}</span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Categorized & Badged Previous Company Questions */}
          {activeTab === 'previousQuestions' && (
            <div className="animate-fadeInUp flex flex-col gap-4">
              <div className="flex justify-between items-center flex-wrap gap-2 border-b pb-3">
                <h3 className="text-base font-bold flex items-center gap-2" style={{ margin: 0 }}>
                  <HelpCircle size={18} className="text-primary-color" /> Previous Questions Repository
                </h3>

                {/* Filter Chips */}
                <div className="flex gap-1 flex-wrap">
                  {['All', 'Coding', 'Technical', 'HR', 'Aptitude'].map(cat => (
                    <button
                      key={cat}
                      className={`chip ${questionCategory === cat ? 'active' : ''}`}
                      onClick={() => setQuestionCategory(cat)}
                      style={{ padding: '4px 10px', fontSize: 'var(--text-xs)' }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Questions List */}
              <div className="flex flex-col gap-3">
                {filteredQuestions.length > 0 ? (
                  filteredQuestions.map((q, idx) => (
                    <div key={q.id || idx} className="quiz-explanation-box flex flex-col gap-2">
                      <div className="flex justify-between items-start">
                        <span className="font-bold text-sm">{idx + 1}. {q.text}</span>
                        <span className={`tag tag-${(q.difficulty || 'Medium').toLowerCase()}`}>{q.difficulty || 'Medium'}</span>
                      </div>

                      <div className="flex justify-between items-center flex-wrap gap-2 text-xs">
                        <span className="text-muted">Topic: <strong>{q.topic}</strong> • Round: {q.type}</span>
                        <span className={`badge ${q.source === 'Verified Public Source' ? 'badge-teal' : 'badge-accent'} text-xs`}>
                          <ShieldCheck size={12} style={{ display: 'inline', marginRight: 4 }} />
                          {q.source || 'Public Source'}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-muted p-4 text-center">No questions found in this category.</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
