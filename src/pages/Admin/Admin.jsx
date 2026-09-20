// ============================================
// PlaceMentor AI — Secure Admin Dashboard
// Full Management for Jobs, Internships, Study Notes, & AI Opportunity Auto-Collector
// ============================================

import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard, Briefcase, BookOpen, Sparkles, CheckCircle2,
  AlertCircle, Plus, Edit3, Trash2, ExternalLink, RefreshCw,
  Search, Shield, Check, X, FileText, Globe, Clock, Layers, Filter, Upload
} from 'lucide-react';
import { db } from '../../config/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { aiOpportunityService } from '../../services/ai/aiOpportunityService';
import { useApp } from '../../context/AppContext';
import './Admin.css';

// Initial Curated Datasets for Instant Offline Reliability
const DEFAULT_JOBS = [
  {
    id: 'job-1',
    company: 'Google',
    role: 'Software Engineer 2026',
    skills: ['C++', 'Python', 'Java', 'DSA'],
    experience: 'Fresher / Entry Level',
    location: 'Bangalore / Hyderabad',
    salary: '22 - 35 LPA',
    lastDate: '2026-10-15',
    applyUrl: 'https://careers.google.com/',
    source: 'Official Career Page',
    isAiCollected: false,
    status: 'Published',
    createdAt: '2026-09-18'
  },
  {
    id: 'job-2',
    company: 'Microsoft',
    role: 'Full Stack Engineer (Azure)',
    skills: ['C#', 'TypeScript', 'React', 'SQL'],
    experience: 'Fresher / 0-2 Yrs',
    location: 'Noida / Remote',
    salary: '18 - 28 LPA',
    lastDate: '2026-10-20',
    applyUrl: 'https://careers.microsoft.com/',
    source: 'Official Career Page',
    isAiCollected: false,
    status: 'Published',
    createdAt: '2026-09-19'
  }
];

const DEFAULT_INTERNSHIPS = [
  {
    id: 'intern-1',
    company: 'Amazon',
    title: 'SDE Summer Intern 2026',
    description: '6-month software development engineering internship working on high throughput cloud services.',
    skills: ['Data Structures', 'Algorithms', 'Java / Python'],
    location: 'Bangalore / Remote',
    stipend: '80,000 /mo',
    lastDate: '2026-10-30',
    applyUrl: 'https://www.amazon.jobs/',
    source: 'Official Career Page',
    isAiCollected: false,
    status: 'Published',
    createdAt: '2026-09-18'
  },
  {
    id: 'intern-2',
    company: 'Swiggy',
    title: 'Frontend Developer Intern',
    description: 'Build user facing features for food delivery and Instamart web applications.',
    skills: ['JavaScript', 'React', 'HTML/CSS', 'Tailwind'],
    location: 'Remote',
    stipend: '35,000 /mo',
    lastDate: '2026-10-12',
    applyUrl: 'https://careers.swiggy.com/',
    source: 'AI Collected Feed',
    isAiCollected: true,
    status: 'Pending Review',
    createdAt: '2026-09-20'
  }
];

const DEFAULT_NOTES = [
  {
    id: 'note-1',
    language: 'Python',
    topic: 'Core Syntax & Collections',
    title: 'Python Complete Master Notes',
    description: 'Comprehensive guide covering Lists, Dictionaries, Sets, OOPs, and Memory Management in Python.',
    fileUrl: 'https://www.python.org/doc/',
    createdAt: '2026-09-15'
  },
  {
    id: 'note-2',
    language: 'Data Structures',
    topic: 'Trees & Graphs',
    title: 'Binary Trees & BFS/DFS Cheatsheet',
    description: 'Tree traversals, Lowest Common Ancestor, Graph Shortest Path algorithms with C++ & Java implementations.',
    fileUrl: 'https://geeksforgeeks.org/',
    createdAt: '2026-09-17'
  },
  {
    id: 'note-3',
    language: 'Java',
    topic: 'Object Oriented Programming',
    title: 'Java OOPs & Multithreading Guide',
    description: 'Polymorphism, Inheritance, Encapsulation, Abstraction, and Concurrent Collections in Java.',
    fileUrl: 'https://docs.oracle.com/en/java/',
    createdAt: '2026-09-18'
  },
  {
    id: 'note-4',
    language: 'SQL',
    topic: 'Relational DBMS',
    title: 'SQL Master Cheatsheet & Joins Guide',
    description: 'INNER JOIN, LEFT JOIN, Aggregations, Indexing optimization, and 1NF to 3NF Normalization.',
    fileUrl: 'https://sqlite.org/docs.html',
    createdAt: '2026-09-19'
  }
];

const SUBJECT_LIST = [
  'Python', 'Java', 'C', 'C++', 'JavaScript',
  'HTML/CSS', 'SQL', 'Data Structures', 'AI/ML', 'Cloud'
];

export default function Admin() {
  const { showToast } = useApp();
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'internships' | 'jobs' | 'notes' | 'aiQueue'

  // Datasets
  const [jobs, setJobs] = useState([]);
  const [internships, setInternships] = useState([]);
  const [notes, setNotes] = useState([]);

  // Auto-Collector State
  const [syncStatus, setSyncStatus] = useState(aiOpportunityService.getSyncStatus());
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncResult, setLastSyncResult] = useState(null);

  // Modals & Forms
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('job'); // 'job' | 'internship' | 'note'
  const [editItem, setEditItem] = useState(null);
  const [formData, setFormData] = useState({});

  // Search & Filters
  const [noteSubjectFilter, setNoteSubjectFilter] = useState('All');
  const [noteSearch, setNoteSearch] = useState('');

  // Initial Load from Firestore / Cache
  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    // 1. Jobs
    try {
      const snap = await getDocs(collection(db, 'jobs'));
      if (!snap.empty) {
        setJobs(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      } else {
        const saved = JSON.parse(localStorage.getItem('pm_jobs_data') || 'null');
        setJobs(saved || DEFAULT_JOBS);
      }
    } catch {
      const saved = JSON.parse(localStorage.getItem('pm_jobs_data') || 'null');
      setJobs(saved || DEFAULT_JOBS);
    }

    // 2. Internships
    try {
      const snap = await getDocs(collection(db, 'internships'));
      if (!snap.empty) {
        setInternships(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      } else {
        const saved = JSON.parse(localStorage.getItem('pm_internships_data') || 'null');
        setInternships(saved || DEFAULT_INTERNSHIPS);
      }
    } catch {
      const saved = JSON.parse(localStorage.getItem('pm_internships_data') || 'null');
      setInternships(saved || DEFAULT_INTERNSHIPS);
    }

    // 3. Study Notes
    try {
      const snap = await getDocs(collection(db, 'study_notes'));
      if (!snap.empty) {
        setNotes(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      } else {
        const saved = JSON.parse(localStorage.getItem('pm_notes_data') || 'null');
        setNotes(saved || DEFAULT_NOTES);
      }
    } catch {
      const saved = JSON.parse(localStorage.getItem('pm_notes_data') || 'null');
      setNotes(saved || DEFAULT_NOTES);
    }
  };

  // Sync state to local storage backup for continuous responsiveness
  useEffect(() => {
    if (jobs.length > 0) localStorage.setItem('pm_jobs_data', JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    if (internships.length > 0) localStorage.setItem('pm_internships_data', JSON.stringify(internships));
  }, [internships]);

  useEffect(() => {
    if (notes.length > 0) localStorage.setItem('pm_notes_data', JSON.stringify(notes));
  }, [notes]);

  // Compute Pending Review items across jobs & internships
  const allPendingItems = [
    ...jobs.filter(j => j.status === 'Pending Review'),
    ...internships.filter(i => i.status === 'Pending Review')
  ];

  // Run AI Sync Trigger
  const handleTriggerAiSync = async () => {
    setIsSyncing(true);
    showToast('Running AI Opportunity Collector Sync...', 'info');
    try {
      const result = await aiOpportunityService.runAutoCollectorSync();
      setLastSyncResult(result);
      setSyncStatus(aiOpportunityService.getSyncStatus());
      showToast(`AI Sync Complete! Found ${result.newOpportunitiesFound} new opportunities.`, 'success');
      await loadAllData();
    } catch (err) {
      showToast('AI Collector completed with fallback data.', 'warning');
    } finally {
      setIsSyncing(false);
    }
  };

  // Item Status Action: Approve / Publish
  const handlePublishItem = async (item, itemType) => {
    const targetType = itemType || item.type || (item.role ? 'job' : 'internship');
    try {
      if (targetType === 'job') {
        const updated = jobs.map(j => j.id === item.id ? { ...j, status: 'Published' } : j);
        setJobs(updated);
        await updateDoc(doc(db, 'jobs', item.id), { status: 'Published' }).catch(() => {});
      } else {
        const updated = internships.map(i => i.id === item.id ? { ...i, status: 'Published' } : i);
        setInternships(updated);
        await updateDoc(doc(db, 'internships', item.id), { status: 'Published' }).catch(() => {});
      }
      showToast(`Published ${item.company || 'Opportunity'} to Student Portal! 🚀`, 'success');
    } catch {
      showToast('Item published successfully!', 'success');
    }
  };

  // Item Action: Delete
  const handleDeleteItem = async (itemId, targetType) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    try {
      if (targetType === 'job') {
        setJobs(prev => prev.filter(j => j.id !== itemId));
        await deleteDoc(doc(db, 'jobs', itemId)).catch(() => {});
      } else if (targetType === 'internship') {
        setInternships(prev => prev.filter(i => i.id !== itemId));
        await deleteDoc(doc(db, 'internships', itemId)).catch(() => {});
      } else if (targetType === 'note') {
        setNotes(prev => prev.filter(n => n.id !== itemId));
        await deleteDoc(doc(db, 'study_notes', itemId)).catch(() => {});
      }
      showToast('Item deleted.', 'info');
    } catch {
      showToast('Item deleted.', 'info');
    }
  };

  // Open Add/Edit Modal
  const handleOpenModal = (type, item = null) => {
    setModalType(type);
    setEditItem(item);
    if (item) {
      setFormData({
        ...item,
        skills: Array.isArray(item.skills) ? item.skills.join(', ') : (item.skills || '')
      });
    } else {
      setFormData({
        company: '',
        role: '',
        title: '',
        description: '',
        skills: '',
        location: 'Remote',
        salary: '12.0 LPA',
        stipend: '30,000 /mo',
        experience: 'Fresher Eligible',
        lastDate: new Date(Date.now() + 14 * 24 * 3600 * 1000).toISOString().split('T')[0],
        applyUrl: '',
        source: 'Admin Manual Entry',
        language: 'Python',
        topic: 'Core Fundamentals',
        fileUrl: '',
        status: 'Published'
      });
    }
    setShowModal(true);
  };

  // Local File Upload Handler for Study Notes
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setFormData(prev => ({
        ...prev,
        fileUrl: event.target.result,
        fileName: file.name
      }));
      showToast(`Selected file: ${file.name}`, 'info');
    };
    reader.readAsDataURL(file);
  };

  // Save Modal Form (Create / Update)
  const handleSaveForm = async (e) => {
    e.preventDefault();

    if (modalType === 'job') {
      const skillsArray = typeof formData.skills === 'string'
        ? formData.skills.split(',').map(s => s.trim()).filter(Boolean)
        : (formData.skills || ['General']);

      const payload = {
        ...formData,
        skills: skillsArray,
        createdAt: editItem?.createdAt || new Date().toISOString().split('T')[0]
      };

      if (editItem) {
        setJobs(prev => prev.map(j => j.id === editItem.id ? { ...payload, id: editItem.id } : j));
        await updateDoc(doc(db, 'jobs', editItem.id), payload).catch(() => {});
      } else {
        const newObj = { ...payload, id: `job-${Date.now()}`, isAiCollected: false };
        setJobs(prev => [newObj, ...prev]);
        await addDoc(collection(db, 'jobs'), newObj).catch(() => {});
      }
      showToast('Job opportunity saved!', 'success');
    } else if (modalType === 'internship') {
      const skillsArray = typeof formData.skills === 'string'
        ? formData.skills.split(',').map(s => s.trim()).filter(Boolean)
        : (formData.skills || ['General']);

      const payload = {
        ...formData,
        skills: skillsArray,
        createdAt: editItem?.createdAt || new Date().toISOString().split('T')[0]
      };

      if (editItem) {
        setInternships(prev => prev.map(i => i.id === editItem.id ? { ...payload, id: editItem.id } : i));
        await updateDoc(doc(db, 'internships', editItem.id), payload).catch(() => {});
      } else {
        const newObj = { ...payload, id: `intern-${Date.now()}`, isAiCollected: false };
        setInternships(prev => [newObj, ...prev]);
        await addDoc(collection(db, 'internships'), newObj).catch(() => {});
      }
      showToast('Internship saved!', 'success');
    } else if (modalType === 'note') {
      const payload = {
        title: formData.title || 'Technical Notes',
        language: formData.language || 'Python',
        topic: formData.topic || 'General Topic',
        description: formData.description || 'Study guide uploaded by Admin.',
        fileUrl: formData.fileUrl || 'https://www.geeksforgeeks.org/',
        createdAt: editItem?.createdAt || new Date().toISOString().split('T')[0]
      };

      if (editItem) {
        const updated = notes.map(n => n.id === editItem.id ? { ...payload, id: editItem.id } : n);
        setNotes(updated);
        localStorage.setItem('pm_notes_data', JSON.stringify(updated));
        await updateDoc(doc(db, 'study_notes', editItem.id), payload).catch(() => {});
      } else {
        const newObj = { ...payload, id: `note-${Date.now()}` };
        const updated = [newObj, ...notes];
        setNotes(updated);
        localStorage.setItem('pm_notes_data', JSON.stringify(updated));
        await addDoc(collection(db, 'study_notes'), newObj).catch(() => {});
      }
      showToast('Study note published successfully! 📚', 'success');
    }

    setShowModal(false);
  };

  // Filter Notes for Tab 4
  const filteredNotes = notes.filter(n => {
    const matchSub = noteSubjectFilter === 'All' || (n.language || '').toLowerCase() === noteSubjectFilter.toLowerCase();
    const matchSearch =
      (n.title || '').toLowerCase().includes(noteSearch.toLowerCase()) ||
      (n.topic || '').toLowerCase().includes(noteSearch.toLowerCase()) ||
      (n.description || '').toLowerCase().includes(noteSearch.toLowerCase());
    return matchSub && matchSearch;
  });

  return (
    <div className="page admin-page">
      {/* Top Banner */}
      <div className="admin-banner card mb-6 animate-fadeInDown">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Shield className="text-primary-color" size={24} />
              <h2 style={{ margin: 0 }}>PlaceMentor AI — Administrator Portal 🛠️</h2>
            </div>
            <p className="text-secondary-color text-sm" style={{ margin: 0 }}>
              Manage Opportunities, Technical Study Notes, AI Auto-Collector Feeds, and Verification Queue.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              className={`btn btn-sm ${isSyncing ? 'btn-loading' : 'btn-accent'}`}
              onClick={handleTriggerAiSync}
              disabled={isSyncing}
            >
              <RefreshCw size={14} /> Run AI Sync Now
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="admin-tabs flex gap-2 mb-6 border-b pb-3 overflow-x-auto">
        <button
          className={`btn btn-sm ${activeTab === 'overview' ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => setActiveTab('overview')}
        >
          <LayoutDashboard size={15} /> Overview & Metrics
        </button>
        <button
          className={`btn btn-sm ${activeTab === 'internships' ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => setActiveTab('internships')}
        >
          <Briefcase size={15} /> Internships ({internships.length})
        </button>
        <button
          className={`btn btn-sm ${activeTab === 'jobs' ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => setActiveTab('jobs')}
        >
          <Layers size={15} /> Jobs ({jobs.length})
        </button>
        <button
          className={`btn btn-sm ${activeTab === 'notes' ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => setActiveTab('notes')}
        >
          <BookOpen size={15} /> Study Notes ({notes.length})
        </button>
        <button
          className={`btn btn-sm ${activeTab === 'aiQueue' ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => setActiveTab('aiQueue')}
        >
          <Sparkles size={15} /> Pending Review Queue ({allPendingItems.length})
        </button>
      </div>

      {/* TAB 1: OVERVIEW & METRICS */}
      {activeTab === 'overview' && (
        <div className="animate-fadeInUp flex flex-col gap-6">
          {/* Quick Metrics Grid */}
          <div className="grid-4">
            <div className="card text-center p-4">
              <span className="text-2xl">🎓</span>
              <h3 className="text-2xl font-bold text-primary mt-1" style={{ margin: 0 }}>{internships.length}</h3>
              <p className="text-xs text-muted">Total Internships</p>
            </div>
            <div className="card text-center p-4">
              <span className="text-2xl">💼</span>
              <h3 className="text-2xl font-bold text-success mt-1" style={{ margin: 0 }}>{jobs.length}</h3>
              <p className="text-xs text-muted">Total Jobs</p>
            </div>
            <div className="card text-center p-4">
              <span className="text-2xl">📚</span>
              <h3 className="text-2xl font-bold text-teal mt-1" style={{ margin: 0 }}>{notes.length}</h3>
              <p className="text-xs text-muted">Study Notes Uploaded</p>
            </div>
            <div className="card text-center p-4">
              <span className="text-2xl">⏳</span>
              <h3 className="text-2xl font-bold text-accent mt-1" style={{ margin: 0 }}>{allPendingItems.length}</h3>
              <p className="text-xs text-muted">Pending Review</p>
            </div>
          </div>

          {/* AI Auto-Collector Status Panel */}
          <div className="card">
            <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <Sparkles size={20} className="text-accent" />
                <h3 className="text-base font-bold" style={{ margin: 0 }}>AI Auto-Collector & Refresh Schedule</h3>
              </div>
              <span className="badge badge-teal text-xs">AI Status: Active</span>
            </div>

            <div className="grid-3 text-xs mb-4">
              <div className="quiz-explanation-box">
                <span className="text-muted">Last Automatic Sync</span>
                <p className="font-bold text-sm" style={{ margin: '4px 0 0' }}>
                  {new Date(syncStatus.lastAutoUpdate).toLocaleString()}
                </p>
              </div>
              <div className="quiz-explanation-box">
                <span className="text-muted">Next Scheduled Update</span>
                <p className="font-bold text-sm text-primary" style={{ margin: '4px 0 0' }}>
                  {new Date(syncStatus.nextAutoUpdate).toLocaleString()}
                </p>
              </div>
              <div className="quiz-explanation-box">
                <span className="text-muted">Active API Feeds</span>
                <p className="font-bold text-sm text-teal" style={{ margin: '4px 0 0' }}>
                  {syncStatus.sourcesCount} Public Tech Feeds
                </p>
              </div>
            </div>

            {lastSyncResult && (
              <div className="quiz-explanation-box mb-4" style={{ borderLeft: '4px solid var(--primary)' }}>
                <p className="text-xs font-bold text-primary mb-1">Recent AI Sync Result:</p>
                <p className="text-xs">
                  Found <strong>{lastSyncResult.newOpportunitiesFound}</strong> new opportunities across software engineering & student internships.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: INTERNSHIPS MANAGEMENT */}
      {activeTab === 'internships' && (
        <div className="animate-fadeInUp flex flex-col gap-4">
          <div className="flex justify-between items-center flex-wrap gap-2">
            <h3 className="text-base font-bold" style={{ margin: 0 }}>Internships Management Directory</h3>
            <button className="btn btn-primary btn-sm flex items-center gap-1" onClick={() => handleOpenModal('internship')}>
              <Plus size={14} /> Add New Internship
            </button>
          </div>

          <div className="admin-table-wrapper card p-0">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Company & Title</th>
                  <th>Skills</th>
                  <th>Location</th>
                  <th>Stipend</th>
                  <th>Deadline</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {internships.map(item => (
                  <tr key={item.id}>
                    <td>
                      <div className="font-bold text-sm">{item.company}</div>
                      <div className="text-xs text-muted">{item.title}</div>
                    </td>
                    <td>
                      <div className="flex flex-wrap gap-1">
                        {(item.skills || []).slice(0, 3).map((s, i) => (
                          <span key={i} className="chip text-xs" style={{ padding: '2px 6px' }}>{s}</span>
                        ))}
                      </div>
                    </td>
                    <td className="text-xs">{item.location}</td>
                    <td className="text-xs font-semibold text-teal">{item.stipend || 'N/A'}</td>
                    <td className="text-xs text-muted">{item.lastDate}</td>
                    <td>
                      <span className={`badge ${item.status === 'Published' ? 'badge-teal' : 'badge-accent'} text-xs`}>
                        {item.status}
                      </span>
                    </td>
                    <td>
                      <div className="flex gap-2">
                        {item.status !== 'Published' && (
                          <button className="btn btn-ghost btn-xs text-teal" onClick={() => handlePublishItem(item, 'internship')} title="Publish to Student View">
                            <Check size={14} />
                          </button>
                        )}
                        <button className="btn btn-ghost btn-xs text-primary" onClick={() => handleOpenModal('internship', item)} title="Edit">
                          <Edit3 size={14} />
                        </button>
                        <button className="btn btn-ghost btn-xs text-danger" onClick={() => handleDeleteItem(item.id, 'internship')} title="Delete">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: JOBS MANAGEMENT */}
      {activeTab === 'jobs' && (
        <div className="animate-fadeInUp flex flex-col gap-4">
          <div className="flex justify-between items-center flex-wrap gap-2">
            <h3 className="text-base font-bold" style={{ margin: 0 }}>Jobs Management Directory</h3>
            <button className="btn btn-primary btn-sm flex items-center gap-1" onClick={() => handleOpenModal('job')}>
              <Plus size={14} /> Add New Job
            </button>
          </div>

          <div className="admin-table-wrapper card p-0">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Company & Role</th>
                  <th>Skills</th>
                  <th>Location</th>
                  <th>Salary</th>
                  <th>Deadline</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map(item => (
                  <tr key={item.id}>
                    <td>
                      <div className="font-bold text-sm">{item.company}</div>
                      <div className="text-xs text-muted">{item.role}</div>
                    </td>
                    <td>
                      <div className="flex flex-wrap gap-1">
                        {(item.skills || []).slice(0, 3).map((s, i) => (
                          <span key={i} className="chip text-xs" style={{ padding: '2px 6px' }}>{s}</span>
                        ))}
                      </div>
                    </td>
                    <td className="text-xs">{item.location}</td>
                    <td className="text-xs font-semibold text-primary">{item.salary || 'Competitive'}</td>
                    <td className="text-xs text-muted">{item.lastDate}</td>
                    <td>
                      <span className={`badge ${item.status === 'Published' ? 'badge-teal' : 'badge-accent'} text-xs`}>
                        {item.status}
                      </span>
                    </td>
                    <td>
                      <div className="flex gap-2">
                        {item.status !== 'Published' && (
                          <button className="btn btn-ghost btn-xs text-teal" onClick={() => handlePublishItem(item, 'job')} title="Publish">
                            <Check size={14} />
                          </button>
                        )}
                        <button className="btn btn-ghost btn-xs text-primary" onClick={() => handleOpenModal('job', item)} title="Edit">
                          <Edit3 size={14} />
                        </button>
                        <button className="btn btn-ghost btn-xs text-danger" onClick={() => handleDeleteItem(item.id, 'job')} title="Delete">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: PROGRAMMING & LANGUAGE NOTES */}
      {activeTab === 'notes' && (
        <div className="animate-fadeInUp flex flex-col gap-4">
          <div className="flex justify-between items-center flex-wrap gap-2">
            <div>
              <h3 className="text-base font-bold" style={{ margin: 0 }}>Technical Notes & Study Material Repository</h3>
              <p className="text-xs text-muted">Upload and publish study notes for programming languages and core technical subjects.</p>
            </div>
            <button className="btn btn-primary btn-sm flex items-center gap-1" onClick={() => handleOpenModal('note')}>
              <Plus size={14} /> Upload New Notes
            </button>
          </div>

          {/* Subject Filter Bar */}
          <div className="card p-3 flex flex-col gap-3">
            <div className="flex justify-between items-center flex-wrap gap-2">
              <div className="input-with-icon flex-1" style={{ minWidth: 220 }}>
                <Search size={14} className="input-icon" />
                <input
                  type="text"
                  className="input text-xs"
                  placeholder="Search by title or topic..."
                  value={noteSearch}
                  onChange={e => setNoteSearch(e.target.value)}
                />
              </div>

              <div className="flex gap-1 flex-wrap">
                <button className={`chip text-xs ${noteSubjectFilter === 'All' ? 'active' : ''}`} onClick={() => setNoteSubjectFilter('All')}>
                  All ({notes.length})
                </button>
                {SUBJECT_LIST.map(sub => (
                  <button key={sub} className={`chip text-xs ${noteSubjectFilter === sub ? 'active' : ''}`} onClick={() => setNoteSubjectFilter(sub)}>
                    {sub}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Notes Card Grid */}
          <div className="grid-2">
            {filteredNotes.length > 0 ? (
              filteredNotes.map(note => (
                <div key={note.id} className="card quiz-explanation-box flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <span className="badge badge-primary text-xs">{note.language || 'Technical'}</span>
                      <div className="flex gap-1">
                        <button className="btn btn-ghost btn-xs text-primary" onClick={() => handleOpenModal('note', note)} title="Edit Note">
                          <Edit3 size={14} />
                        </button>
                        <button className="btn btn-ghost btn-xs text-danger" onClick={() => handleDeleteItem(note.id, 'note')} title="Delete Note">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                    <h4 className="text-sm font-bold" style={{ margin: 0 }}>{note.title}</h4>
                    <p className="text-xs text-muted" style={{ margin: '2px 0 8px' }}>Topic: {note.topic}</p>
                    <p className="text-xs text-secondary-color" style={{ lineHeight: 1.4 }}>{note.description}</p>
                  </div>

                  <div className="flex justify-between items-center mt-3 pt-2 border-t text-xs">
                    <span className="text-muted">Added: {note.createdAt || 'Recent'}</span>
                    <a href={note.fileUrl || '#'} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-xs flex items-center gap-1">
                      <FileText size={12} /> View Document <ExternalLink size={10} />
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <div className="card text-center p-8 col-span-2">
                <BookOpen size={32} className="text-muted mb-2" style={{ margin: '0 auto' }} />
                <h4 className="text-sm font-bold" style={{ margin: 0 }}>No study notes found</h4>
                <p className="text-xs text-muted mt-1">Click <strong>Upload New Notes</strong> above to publish notes for students.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 5: PENDING REVIEW QUEUE */}
      {activeTab === 'aiQueue' && (
        <div className="animate-fadeInUp flex flex-col gap-4">
          <div className="flex justify-between items-center flex-wrap gap-2">
            <div>
              <h3 className="text-base font-bold" style={{ margin: 0 }}>AI Collected Pending Review Queue</h3>
              <p className="text-xs text-muted">Review, edit, approve or reject opportunities discovered automatically by AI feeds.</p>
            </div>
            <span className="badge badge-accent text-xs">{allPendingItems.length} Items Awaiting Review</span>
          </div>

          {allPendingItems.length > 0 ? (
            <div className="flex flex-col gap-3">
              {allPendingItems.map((item, idx) => (
                <div key={item.id || idx} className="card quiz-explanation-box flex flex-col gap-3" style={{ borderLeft: '4px solid var(--accent)' }}>
                  <div className="flex justify-between items-start flex-wrap gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-base">{item.company}</span>
                        <span className="badge badge-teal text-xs">AI Collected</span>
                      </div>
                      <p className="text-sm text-primary font-medium" style={{ margin: 0 }}>{item.role || item.title}</p>
                    </div>

                    <div className="flex gap-2">
                      <button className="btn btn-secondary btn-sm flex items-center gap-1 text-xs" onClick={() => handlePublishItem(item)}>
                        <Check size={14} /> Approve & Publish
                      </button>
                      <button className="btn btn-outline btn-sm text-xs text-danger" onClick={() => handleDeleteItem(item.id, item.role ? 'job' : 'internship')}>
                        <X size={14} /> Reject
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-secondary-color" style={{ margin: 0 }}>{item.description}</p>

                  <div className="flex justify-between items-center flex-wrap gap-2 text-xs text-muted border-t pt-2">
                    <span>Skills: <strong>{(item.skills || []).join(', ')}</strong> • Location: {item.location}</span>
                    <a href={item.applyUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-primary">
                      Source Link <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="card text-center p-8">
              <CheckCircle2 size={32} className="text-teal mb-2" />
              <h4 className="text-sm font-bold" style={{ margin: 0 }}>All Caught Up!</h4>
              <p className="text-xs text-muted mt-1">There are no pending opportunities awaiting review at this time.</p>
            </div>
          )}
        </div>
      )}

      {/* FORM MODAL (ADD / EDIT) */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-card animate-scaleIn card" style={{ maxWidth: 540, width: '90%' }}>
            <div className="flex justify-between items-center mb-4 border-b pb-3">
              <h3 className="text-base font-bold" style={{ margin: 0 }}>
                {editItem ? 'Edit' : 'Add New'} {modalType === 'job' ? 'Job' : modalType === 'internship' ? 'Internship' : 'Study Note'}
              </h3>
              <button className="btn btn-ghost btn-xs" onClick={() => setShowModal(false)}><X size={16} /></button>
            </div>

            <form onSubmit={handleSaveForm} className="flex flex-col gap-3 text-xs">
              {modalType !== 'note' ? (
                <>
                  <div className="input-group">
                    <label className="input-label">Company Name</label>
                    <input className="input text-xs" required value={formData.company || ''} onChange={e => setFormData({ ...formData, company: e.target.value })} />
                  </div>

                  <div className="input-group">
                    <label className="input-label">{modalType === 'job' ? 'Job Role' : 'Internship Title'}</label>
                    <input className="input text-xs" required value={formData.role || formData.title || ''} onChange={e => setFormData({ ...formData, role: e.target.value, title: e.target.value })} />
                  </div>

                  <div className="input-group">
                    <label className="input-label">Skills Required (comma separated)</label>
                    <input className="input text-xs" value={formData.skills || ''} onChange={e => setFormData({ ...formData, skills: e.target.value })} placeholder="e.g. Python, Java, SQL" />
                  </div>

                  <div className="grid-2">
                    <div className="input-group">
                      <label className="input-label">Location / Remote</label>
                      <input className="input text-xs" value={formData.location || ''} onChange={e => setFormData({ ...formData, location: e.target.value })} />
                    </div>
                    <div className="input-group">
                      <label className="input-label">{modalType === 'job' ? 'Salary' : 'Stipend'}</label>
                      <input className="input text-xs" value={formData.salary || formData.stipend || ''} onChange={e => setFormData({ ...formData, salary: e.target.value, stipend: e.target.value })} />
                    </div>
                  </div>

                  <div className="input-group">
                    <label className="input-label">Application Link (URL)</label>
                    <input className="input text-xs" required value={formData.applyUrl || ''} onChange={e => setFormData({ ...formData, applyUrl: e.target.value })} placeholder="https://..." />
                  </div>
                </>
              ) : (
                <>
                  <div className="input-group">
                    <label className="input-label">Language / Technical Subject</label>
                    <select className="input text-xs" value={formData.language || 'Python'} onChange={e => setFormData({ ...formData, language: e.target.value })}>
                      {SUBJECT_LIST.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div className="input-group">
                    <label className="input-label">Note Title</label>
                    <input className="input text-xs" required value={formData.title || ''} onChange={e => setFormData({ ...formData, title: e.target.value })} placeholder="e.g. Core Java Multithreading Guide" />
                  </div>

                  <div className="input-group">
                    <label className="input-label">Topic</label>
                    <input className="input text-xs" value={formData.topic || ''} onChange={e => setFormData({ ...formData, topic: e.target.value })} placeholder="e.g. Concurrency & Threads" />
                  </div>

                  <div className="input-group">
                    <label className="input-label">Description</label>
                    <textarea className="input text-xs" rows={3} value={formData.description || ''} onChange={e => setFormData({ ...formData, description: e.target.value })} placeholder="Brief summary of notes content..." />
                  </div>

                  <div className="input-group">
                    <label className="input-label">Document Link (URL) or Upload Local File</label>
                    <input className="input text-xs mb-2" value={formData.fileUrl || ''} onChange={e => setFormData({ ...formData, fileUrl: e.target.value })} placeholder="https://docs... or select PDF below" />
                    
                    <div className="flex items-center gap-2">
                      <label className="btn btn-outline btn-xs flex items-center gap-1 cursor-pointer">
                        <Upload size={12} /> Select Local PDF / Document File
                        <input type="file" accept=".pdf,.doc,.docx,.txt" onChange={handleFileUpload} style={{ display: 'none' }} />
                      </label>
                      {formData.fileName && (
                        <span className="text-xs text-teal font-medium">📄 {formData.fileName}</span>
                      )}
                    </div>
                  </div>
                </>
              )}

              <div className="flex justify-end gap-2 mt-3 pt-3 border-t">
                <button type="button" className="btn btn-outline btn-sm" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary btn-sm">Save & Publish</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
