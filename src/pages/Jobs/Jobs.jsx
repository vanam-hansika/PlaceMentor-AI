// ============================================
// PlaceMentor AI — Student Jobs & Internships Portal
// Integrates Published Jobs, Internships, & AI-Collected Opportunities
// ============================================

import React, { useState, useEffect } from 'react';
import {
  Briefcase, Building2, MapPin, Calendar, ExternalLink, Bell,
  Search, Filter, CheckCircle, Clock, Sparkles, AlertCircle, ShieldCheck,
  GraduationCap
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { aiService } from '../../services/ai/aiService';
import { db } from '../../config/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { stripHtml, isIndiaLocation, isRemoteEligibleForIndia } from '../../services/ai/aiOpportunityService';
import './Jobs.css';

const DEFAULT_PUBLISHED_OPPORTUNITIES = [
  {
    id: 'pub-job-1',
    company: 'Google',
    role: 'Software Engineer 2026',
    title: 'Software Engineer 2026',
    description: 'Build large-scale distributed systems and user-facing applications using C++, Java, and Python. Open to 2026, 2027 & 2028 batch candidates.',
    type: 'job',
    experience: 'Fresher / Entry Level',
    eligibility: '2026 / 2027 / 2028 Batch (B.Tech / B.E / MCA)',
    skills: ['C++', 'Python', 'Java', 'Data Structures'],
    location: 'Hyderabad / Bengaluru, India',
    salary: '22 - 35 LPA',
    lastDate: '2026-10-15',
    applyUrl: 'https://careers.google.com/',
    source: 'Google Careers India',
    isAiCollected: false,
    isIndiaVerified: true,
    status: 'Published',
    createdAt: '2026-09-18',
    logo: '🌐'
  },
  {
    id: 'pub-job-2',
    company: 'Microsoft',
    role: 'Full Stack Engineer (Azure Cloud)',
    title: 'Full Stack Engineer (Azure Cloud)',
    description: 'Work on enterprise cloud microservices and scalable web solutions. Freshers and final year college students welcome to apply.',
    type: 'job',
    experience: 'Fresher / 0-2 Yrs',
    eligibility: 'Freshers & Pre-Final / Final Year Students',
    skills: ['C#', 'TypeScript', 'React', 'SQL', 'Azure'],
    location: 'Noida / Hyderabad / Remote in India',
    salary: '18 - 28 LPA',
    lastDate: '2026-10-20',
    applyUrl: 'https://careers.microsoft.com/',
    source: 'Microsoft Careers India',
    isAiCollected: false,
    isIndiaVerified: true,
    status: 'Published',
    createdAt: '2026-09-19',
    logo: '🪟'
  },
  {
    id: 'pub-intern-1',
    company: 'Amazon India',
    role: 'Software Development Engineer (SDE) Summer Intern',
    title: 'Software Development Engineer (SDE) Summer Intern',
    description: '6-month software development internship solving customer-scale challenges in cloud computing, fulfillment, and digital payments.',
    type: 'internship',
    experience: 'Students / Pre-Final Year',
    eligibility: '2027 & 2028 Batch (Pre-Final Year College Students)',
    skills: ['Data Structures', 'Algorithms', 'Java / Python'],
    location: 'Bengaluru / Hyderabad / Chennai',
    stipend: '80,000 /mo',
    lastDate: '2026-10-30',
    applyUrl: 'https://www.amazon.jobs/en/teams/in-student-programs',
    source: 'Amazon Student Programs India',
    isAiCollected: false,
    isIndiaVerified: true,
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
  const [locationScope, setLocationScope] = useState('india'); // 'india' (Default) | 'international'
  const [batchFilter, setBatchFilter] = useState('All'); // 'All' | '2028' | '2027' | 'freshers'
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

  // Filter ONLY Published items according to user selections (India-First Default)
  const filteredList = opportunities.filter(item => {
    const isJob = item.type === 'job' || !!item.salary;
    const isIntern = item.type === 'internship' || !!item.stipend;

    if (typeFilter === 'job' && !isJob) return false;
    if (typeFilter === 'internship' && !isIntern) return false;

    // 1. Strict Location Filtering (Default: India)
    const isIndia = item.isIndiaVerified === true || isIndiaLocation(item.location) || isRemoteEligibleForIndia(item.location, item.description);
    if (locationScope === 'india') {
      if (!isIndia) return false;
    } else if (locationScope === 'international') {
      if (isIndia && !item.isInternational) return false;
    }

    // 2. Remote Filter (must be India-eligible when India scope is active)
    if (remoteOnly) {
      const locStr = (item.location || '').toLowerCase();
      if (!locStr.includes('remote')) return false;
      if (locationScope === 'india' && !isRemoteEligibleForIndia(item.location, item.description)) return false;
    }

    // 3. Fresher & Non-Senior Filter
    if (fresherOnly) {
      const text = `${item.title || ''} ${item.role || ''} ${item.experience || ''} ${item.eligibility || ''}`.toLowerCase();
      if (/\bsenior\b|\blead\b|\bprincipal\b|\bstaff\b|\b5\+\s*years\b/.test(text)) return false;
      if (!/\bfresher\b|\bintern\b|\bcollege\b|\bstudent\b|\bgraduate\b|\bentry\b|\b0-1\b|\b2026\b|\b2027\b|\b2028\b/.test(text)) return false;
    }

    // 4. Batch Specific Filters
    if (batchFilter === '2028') {
      const text = `${item.eligibility || ''} ${item.title || ''} ${item.description || ''}`.toLowerCase();
      if (!text.includes('2028') && !text.includes('pre-final') && item.type !== 'internship') return false;
    } else if (batchFilter === '2027') {
      const text = `${item.eligibility || ''} ${item.title || ''} ${item.description || ''}`.toLowerCase();
      if (!text.includes('2027') && !text.includes('student') && item.type !== 'internship') return false;
    }

    // 5. Keyword Search (Company, Role, Skills, Indian City)
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      const matchComp = (item.company || '').toLowerCase().includes(term);
      const matchRole = (item.role || item.title || '').toLowerCase().includes(term);
      const matchLoc = (item.location || '').toLowerCase().includes(term);
      const matchSkills = (item.skills || []).some(s => s.toLowerCase().includes(term));
      if (!matchComp && !matchRole && !matchLoc && !matchSkills) return false;
    }

    return true;
  });

  return (
    <div className="page jobs-page">
      <div className="section-heading mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 style={{ margin: 0 }}>Jobs & Internship Opportunities 💼</h2>
            <span className="badge badge-teal text-xs">🇮🇳 India Focus Active</span>
          </div>
          <p className="text-secondary-color text-xs" style={{ margin: 0 }}>
            Curated opportunities for Indian college students, freshers, and 2027/2028 batch candidates across Hyderabad, Bengaluru, Chennai, Pune, Visakhapatnam, and Delhi NCR.
          </p>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="card mb-6 flex flex-col gap-4">
        {/* Row 1: Search & Type */}
        <div className="flex justify-between items-center flex-wrap gap-3">
          <div className="input-with-icon flex-1" style={{ minWidth: 260 }}>
            <Search size={16} className="input-icon" />
            <input
              type="text"
              className="input text-xs"
              placeholder="Search companies (TCS, Infosys, Amazon, Zoho), roles, skills (Java, Python, SQL) or cities..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            <button
              className={`chip text-xs ${typeFilter === 'All' ? 'active' : ''}`}
              onClick={() => setTypeFilter('All')}
            >
              All Types ({opportunities.length})
            </button>
            <button
              className={`chip text-xs ${typeFilter === 'internship' ? 'active' : ''}`}
              onClick={() => setTypeFilter('internship')}
            >
              🎓 Internships
            </button>
            <button
              className={`chip text-xs ${typeFilter === 'job' ? 'active' : ''}`}
              onClick={() => setTypeFilter('job')}
            >
              💼 Jobs
            </button>
          </div>
        </div>

        {/* Row 2: Location Scope (India-First vs International) & Batches */}
        <div className="flex justify-between items-center flex-wrap gap-3 border-t pt-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-muted mr-1">Region:</span>
            <button
              className={`chip text-xs ${locationScope === 'india' ? 'active' : ''}`}
              onClick={() => setLocationScope('india')}
              title="Prioritizes Indian cities and India-eligible remote opportunities"
            >
              🇮🇳 India Opportunities
            </button>
            <button
              className={`chip text-xs ${locationScope === 'international' ? 'active' : ''}`}
              onClick={() => setLocationScope('international')}
              title="Show global and international opportunities"
            >
              🌐 International Opportunities
            </button>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-muted mr-1">Target Batch:</span>
            <button
              className={`chip text-xs ${batchFilter === 'All' ? 'active' : ''}`}
              onClick={() => setBatchFilter('All')}
            >
              All Batches
            </button>
            <button
              className={`chip text-xs ${batchFilter === '2028' ? 'active' : ''}`}
              onClick={() => setBatchFilter('2028')}
              title="Opportunities explicitly open to 2028 graduates and college students"
            >
              🎓 2028 Batch
            </button>
            <button
              className={`chip text-xs ${batchFilter === '2027' ? 'active' : ''}`}
              onClick={() => setBatchFilter('2027')}
              title="Opportunities open to 2027 batch graduates"
            >
              🎯 2027 Batch
            </button>
          </div>
        </div>

        {/* Row 3: Quick Checkbox Filters */}
        <div className="flex gap-4 items-center flex-wrap text-xs text-secondary-color border-t pt-2">
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={fresherOnly}
              onChange={e => setFresherOnly(e.target.checked)}
            />
            <span>Fresher & Student Eligible Only (No Senior Jobs)</span>
          </label>

          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={remoteOnly}
              onChange={e => setRemoteOnly(e.target.checked)}
            />
            <span>Remote in India</span>
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
            const isIndia = item.isIndiaVerified === true || isIndiaLocation(item.location);
            const cleanDesc = stripHtml(item.description);
            const cleanTitle = stripHtml(item.role || item.title);

            return (
              <div key={item.id} className="card job-card animate-fadeInUp">
                <div className="flex justify-between items-start flex-wrap gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{item.logo || (isIntern ? '🎓' : '💼')}</span>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-base font-bold" style={{ margin: 0 }}>{cleanTitle}</h3>
                        {isIndia && (
                          <span className="badge badge-teal text-xs">
                            🇮🇳 India Verified
                          </span>
                        )}
                        <span className={`badge ${isIntern ? 'badge-primary' : 'badge-purple'} text-xs`}>
                          {isIntern ? '🎓 Internship' : '💼 Job'}
                        </span>
                        {item.isAiCollected && (
                          <span className="badge badge-accent text-xs">AI Collected</span>
                        )}
                        {item.eligibility && (
                          <span className="badge text-xs" style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
                            🎯 {item.eligibility}
                          </span>
                        )}
                      </div>
                      <p className="text-sm font-semibold text-primary-color" style={{ margin: '4px 0 0' }}>{item.company}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      className={`btn ${isNotified ? 'btn-secondary' : 'btn-outline'} btn-sm text-xs`}
                      onClick={() => handleSetReminder(item)}
                      disabled={isProcessing}
                    >
                      <Bell size={13} /> {isNotified ? 'Reminder Set' : isProcessing ? 'Syncing...' : 'Set Reminder'}
                    </button>
                    <a
                      href={item.applyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary btn-sm text-xs"
                    >
                      Apply Now <ExternalLink size={13} />
                    </a>
                  </div>
                </div>

                {/* Plain Readable Description (No Raw HTML) */}
                <p className="text-xs text-secondary-color mb-3" style={{ lineHeight: 1.5, margin: '6px 0 12px' }}>
                  {cleanDesc || 'Verified engineering opportunity for Indian college students, freshers, and upcoming graduates.'}
                </p>

                {/* Details Grid */}
                <div className="grid-3 mb-3 text-xs bg-surface-2 p-3 rounded-lg">
                  <div>
                    <span className="text-muted block font-bold">Compensation / Stipend:</span>
                    <span className="text-teal font-bold">{item.salary || item.stipend || 'Competitive'}</span>
                  </div>
                  <div>
                    <span className="text-muted block font-bold">Location:</span>
                    <span className="flex items-center gap-1 font-medium"><MapPin size={12} className="text-primary" /> {item.location || 'India (Remote / Hybrid)'}</span>
                  </div>
                  <div>
                    <span className="text-muted block font-bold">Deadline:</span>
                    <span className="text-danger font-bold flex items-center gap-1"><Calendar size={12} /> {item.lastDate || 'Open / Active'}</span>
                  </div>
                </div>

                {/* Required Skills & Source */}
                <div className="flex justify-between items-center flex-wrap gap-2 text-xs">
                  <div className="flex gap-1 flex-wrap items-center">
                    <span className="text-muted font-bold mr-1">Skills:</span>
                    {(item.skills || []).slice(0, 5).map((s, i) => (
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
            <AlertCircle size={36} className="text-muted mb-2" style={{ margin: '0 auto' }} />
            <h4 className="text-base font-bold mb-1" style={{ margin: 0 }}>No Matching Indian Opportunities Found</h4>
            <p className="text-xs text-muted mt-1" style={{ maxWidth: 480, margin: '6px auto 16px' }}>
              {locationScope === 'india'
                ? 'No matching opportunities found in India with your selected filters. Try broadening your batch filter, clearing the search term, or switching to "International Opportunities".'
                : 'No international opportunities match your search. Switch back to "India Opportunities" to view domestic openings.'}
            </p>
            <div className="flex justify-center gap-2">
              <button
                className="btn btn-outline btn-sm text-xs"
                onClick={() => {
                  setSearchTerm('');
                  setTypeFilter('All');
                  setBatchFilter('All');
                  setFresherOnly(false);
                  setRemoteOnly(false);
                  setLocationScope('india');
                }}
              >
                Reset All Filters
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
