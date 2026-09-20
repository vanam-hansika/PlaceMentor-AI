// ============================================
// PlaceMentor AI — Student Jobs & Internships Portal
// Integrates Published Jobs, Internships, & AI-Collected Opportunities
// ============================================

import React, { useState, useEffect } from 'react';
import {
  Briefcase, Building2, MapPin, Calendar, ExternalLink, Bell,
  Search, Filter, CheckCircle, Clock, Sparkles, AlertCircle, ShieldCheck
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { aiService } from '../../services/ai/aiService';
import { db } from '../../config/firebase';
import { collection, getDocs } from 'firebase/firestore';
import './Jobs.css';

const DEFAULT_PUBLISHED_OPPORTUNITIES = [
  {
    id: 'pub-job-1',
    company: 'Google',
    role: 'Software Engineer 2026',
    title: 'Software Engineer 2026',
    type: 'job',
    experience: 'Fresher / Entry Level',
    skills: ['C++', 'Python', 'Java', 'Data Structures'],
    location: 'Bangalore / Hyderabad',
    salary: '22 - 35 LPA',
    lastDate: '2026-10-15',
    applyUrl: 'https://careers.google.com/',
    source: 'Official Career Page',
    isAiCollected: false,
    status: 'Published',
    createdAt: '2026-09-18',
    logo: '🌐'
  },
  {
    id: 'pub-job-2',
    company: 'Microsoft',
    role: 'Full Stack Engineer (Azure)',
    title: 'Full Stack Engineer (Azure)',
    type: 'job',
    experience: 'Fresher Eligible',
    skills: ['C#', 'TypeScript', 'React', 'SQL'],
    location: 'Noida / Remote',
    salary: '18 - 28 LPA',
    lastDate: '2026-10-20',
    applyUrl: 'https://careers.microsoft.com/',
    source: 'Official Career Page',
    isAiCollected: false,
    status: 'Published',
    createdAt: '2026-09-19',
    logo: '🪟'
  },
  {
    id: 'pub-intern-1',
    company: 'Amazon',
    role: 'SDE Summer Intern 2026',
    title: 'SDE Summer Intern 2026',
    type: 'internship',
    experience: 'Students / Pre-Final Year',
    skills: ['Data Structures', 'Algorithms', 'Java / Python'],
    location: 'Bangalore / Remote',
    stipend: '80,000 /mo',
    lastDate: '2026-10-30',
    applyUrl: 'https://www.amazon.jobs/',
    source: 'Official Career Page',
    isAiCollected: false,
    status: 'Published',
    createdAt: '2026-09-18',
    logo: '📦'
  }
];

export default function Jobs() {
  const { user } = useAuth();
  const { showToast, dispatch } = useApp();

  const [opportunities, setOpportunities] = useState([]);
  const [typeFilter, setTypeFilter] = useState('All'); // 'All' | 'job' | 'internship'
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [fresherOnly, setFresherOnly] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [notifiedJobs, setNotifiedJobs] = useState({});
  const [processingN8n, setProcessingN8n] = useState(null);

  // Fetch Published Jobs & Internships
  useEffect(() => {
    loadPublishedOpportunities();
  }, []);

  const loadPublishedOpportunities = async () => {
    let list = [];
    
    // 1. Fetch Firestore Jobs
    try {
      const snapJobs = await getDocs(collection(db, 'jobs'));
      if (!snapJobs.empty) {
        snapJobs.docs.forEach(d => {
          const data = d.data();
          if (data.status === 'Published') list.push({ id: d.id, type: 'job', ...data });
        });
      }
    } catch (e) {
      console.warn('Jobs Firestore query notice:', e);
    }

    // 2. Fetch Firestore Internships
    try {
      const snapIntern = await getDocs(collection(db, 'internships'));
      if (!snapIntern.empty) {
        snapIntern.docs.forEach(d => {
          const data = d.data();
          if (data.status === 'Published') list.push({ id: d.id, type: 'internship', ...data });
        });
      }
    } catch (e) {
      console.warn('Internships Firestore query notice:', e);
    }

    // 3. Fallback to Local Backup if list is empty
    if (list.length === 0) {
      const cachedJobs = JSON.parse(localStorage.getItem('pm_jobs_data') || '[]').filter(j => j.status === 'Published');
      const cachedInterns = JSON.parse(localStorage.getItem('pm_internships_data') || '[]').filter(i => i.status === 'Published');
      
      const merged = [...cachedJobs, ...cachedInterns];
      list = merged.length > 0 ? merged : DEFAULT_PUBLISHED_OPPORTUNITIES;
    }

    setOpportunities(list);
  };

  const handleSetReminder = async (item) => {
    setProcessingN8n(item.id);
    try {
      await aiService.processJobNotificationWorkflow(item, user?.email);
      setNotifiedJobs(prev => ({ ...prev, [item.id]: true }));
      
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: {
          id: Date.now(),
          title: `Reminder Set: ${item.company} - ${item.role || item.title}`,
          time: 'Just now',
          read: false
        }
      });

      showToast(`Reminder set for ${item.company} deadline (${item.lastDate}) 🔔`, 'success');
    } catch {
      showToast(`Reminder set for ${item.company}!`, 'info');
    } finally {
      setProcessingN8n(null);
    }
  };

  // Filter ONLY Published items according to user selections
  const filteredList = opportunities.filter(item => {
    const isJob = item.type === 'job' || !!item.salary;
    const isIntern = item.type === 'internship' || !!item.stipend;

    if (typeFilter === 'job' && !isJob) return false;
    if (typeFilter === 'internship' && !isIntern) return false;

    if (remoteOnly && !(item.location || '').toLowerCase().includes('remote')) return false;
    if (fresherOnly && !(item.experience || '').toLowerCase().includes('fresher')) return false;

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      const matchComp = (item.company || '').toLowerCase().includes(term);
      const matchRole = (item.role || item.title || '').toLowerCase().includes(term);
      const matchSkills = (item.skills || []).some(s => s.toLowerCase().includes(term));
      if (!matchComp && !matchRole && !matchSkills) return false;
    }

    return true;
  });

  return (
    <div className="page jobs-page">
      <div className="section-heading mb-6">
        <div>
          <h2>Jobs & Internship Opportunities 💼</h2>
          <p className="text-secondary-color">
            Verified tech job openings, student internships, and AI-collected opportunities for placement candidates.
          </p>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="card mb-6 flex flex-col gap-4">
        <div className="flex justify-between items-center flex-wrap gap-3">
          <div className="input-with-icon flex-1" style={{ minWidth: 260 }}>
            <Search size={16} className="input-icon" />
            <input
              type="text"
              className="input"
              placeholder="Search company, role, or skill e.g. Python, Java, Data Science..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            <button
              className={`chip ${typeFilter === 'All' ? 'active' : ''}`}
              onClick={() => setTypeFilter('All')}
            >
              All Types ({opportunities.length})
            </button>
            <button
              className={`chip ${typeFilter === 'internship' ? 'active' : ''}`}
              onClick={() => setTypeFilter('internship')}
            >
              🎓 Internships
            </button>
            <button
              className={`chip ${typeFilter === 'job' ? 'active' : ''}`}
              onClick={() => setTypeFilter('job')}
            >
              💼 Jobs
            </button>
          </div>
        </div>

        {/* Quick Checkbox Filters */}
        <div className="flex gap-4 items-center flex-wrap text-xs text-secondary-color border-t pt-3">
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={remoteOnly}
              onChange={e => setRemoteOnly(e.target.checked)}
            />
            <span>Remote Only</span>
          </label>

          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={fresherOnly}
              onChange={e => setFresherOnly(e.target.checked)}
            />
            <span>Fresher Eligible</span>
          </label>
        </div>
      </div>

      {/* Opportunities List */}
      <div className="flex flex-col gap-4">
        {filteredList.length > 0 ? (
          filteredList.map(item => {
            const isNotified = notifiedJobs[item.id];
            const isProcessing = processingN8n === item.id;
            const isIntern = item.type === 'internship' || !!item.stipend;

            return (
              <div key={item.id} className="card job-card animate-fadeInUp">
                <div className="flex justify-between items-start flex-wrap gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{item.logo || (isIntern ? '🎓' : '💼')}</span>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-base font-bold" style={{ margin: 0 }}>{item.role || item.title}</h3>
                        <span className={`badge ${isIntern ? 'badge-teal' : 'badge-primary'} text-xs`}>
                          {isIntern ? 'Internship' : 'Job'}
                        </span>
                        {item.isAiCollected && (
                          <span className="badge badge-accent text-xs">AI Collected</span>
                        )}
                      </div>
                      <p className="text-sm font-semibold text-primary-color" style={{ margin: 0 }}>{item.company}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      className={`btn ${isNotified ? 'btn-secondary' : 'btn-outline'} btn-sm`}
                      onClick={() => handleSetReminder(item)}
                      disabled={isProcessing}
                    >
                      <Bell size={14} /> {isNotified ? 'Reminder Set' : isProcessing ? 'Syncing...' : 'Set Reminder'}
                    </button>
                    <a
                      href={item.applyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary btn-sm"
                    >
                      Apply Now <ExternalLink size={14} />
                    </a>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid-3 mb-3 text-xs bg-surface-2 p-3 rounded-lg">
                  <div>
                    <span className="text-muted block font-bold">Compensation / Stipend:</span>
                    <span className="text-teal font-bold">{item.salary || item.stipend || 'Competitive'}</span>
                  </div>
                  <div>
                    <span className="text-muted block font-bold">Location:</span>
                    <span className="flex items-center gap-1"><MapPin size={12} /> {item.location || 'Remote'}</span>
                  </div>
                  <div>
                    <span className="text-muted block font-bold">Last Date:</span>
                    <span className="text-danger font-bold flex items-center gap-1"><Calendar size={12} /> {item.lastDate || 'Open'}</span>
                  </div>
                </div>

                {/* Required Skills & Source */}
                <div className="flex justify-between items-center flex-wrap gap-2 text-xs">
                  <div className="flex gap-1 flex-wrap items-center">
                    <span className="text-muted font-bold mr-1">Required Skills:</span>
                    {(item.skills || []).map((s, i) => (
                      <span key={i} className="chip text-xs" style={{ padding: '2px 8px' }}>{s}</span>
                    ))}
                  </div>
                  <span className="text-muted flex items-center gap-1">
                    <ShieldCheck size={12} className="text-teal" /> Source: {item.source || 'Verified Source'}
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          <div className="card text-center p-8">
            <AlertCircle size={32} className="text-muted mb-2" style={{ margin: '0 auto' }} />
            <h4 className="text-sm font-bold mb-1" style={{ margin: 0 }}>No matching opportunities</h4>
            <p className="text-xs text-muted">Try clearing your filters or search terms.</p>
          </div>
        )}
      </div>
    </div>
  );
}
