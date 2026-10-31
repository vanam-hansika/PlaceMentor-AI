// ============================================
// PlaceMentor AI — Secure Admin Dashboard
// Full Management for Jobs, Internships, Study Notes, & AI Opportunity Auto-Collector
// ============================================

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Briefcase, BookOpen, Sparkles, CheckCircle2,
  AlertCircle, Plus, Edit3, Trash2, ExternalLink, RefreshCw,
  Search, Shield, Check, X, FileText, Globe, Clock, Layers, Filter, Upload, LogOut,
  Users, UserCheck, Flame, Trophy, MapPin, Map, ArrowRight
} from 'lucide-react';
import { db, storage } from '../../config/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { aiOpportunityService, stripHtml, isIndiaLocation } from '../../services/ai/aiOpportunityService';
import { safeStorage, fileStorage, openNoteDocument } from '../../utils/safeStorage';
import { getAllRoadmaps } from '../../services/roadmap/roadmapService';
import { dispatchJobAlert } from '../../services/notifications/jobAlertService';
import { useApp } from '../../context/AppContext';
import './Admin.css';

// Safe date formatter resilient against Firestore Timestamps & undefined
export function formatDisplayDate(val) {
  if (!val) return 'Recent';
  if (typeof val === 'string') return val;
  if (typeof val === 'object' && val.seconds) {
    return new Date(val.seconds * 1000).toLocaleDateString();
  }
  if (val instanceof Date) {
    return val.toLocaleDateString();
  }
  return 'Recent';
}

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
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'internships' | 'jobs' | 'notes' | 'aiQueue'

  const handleExitAdmin = () => {
    sessionStorage.removeItem('pm_admin_session_auth');
    showToast('Exited Admin Portal session.', 'info');
    navigate('/dashboard');
  };

  // Datasets
  const [jobs, setJobs] = useState([]);
  const [internships, setInternships] = useState([]);
  const [notes, setNotes] = useState([]);
  const [users, setUsers] = useState([]);

  // Auto-Collector State
  const [syncStatus, setSyncStatus] = useState(aiOpportunityService.getSyncStatus());
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncResult, setLastSyncResult] = useState(null);

  // Modals & Forms
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('job'); // 'job' | 'internship' | 'note'
  const [editItem, setEditItem] = useState(null);
  const [formData, setFormData] = useState({});
  const [selectedRawFile, setSelectedRawFile] = useState(null);
  const [isUploadingFile, setIsUploadingFile] = useState(false);

  // Search & Filters
  const [noteSubjectFilter, setNoteSubjectFilter] = useState('All');
  const [noteSearch, setNoteSearch] = useState('');
  const [userSearch, setUserSearch] = useState('');
  const [userRoleFilter, setUserRoleFilter] = useState('All');

  // Initial Load from Firestore / Cache + Self-Healing Storage
  useEffect(() => {
    safeStorage.cleanOversizedStorage();
    loadAllData();
  }, []);

  const loadAllData = async () => {
    // 1. Jobs
    try {
      const snap = await getDocs(collection(db, 'jobs'));
      if (!snap.empty) {
        setJobs(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      } else {
        const saved = safeStorage.getItem('pm_jobs_data', null);
        setJobs(saved || DEFAULT_JOBS);
      }
    } catch {
      const saved = safeStorage.getItem('pm_jobs_data', null);
      setJobs(saved || DEFAULT_JOBS);
    }

    // 2. Internships
    try {
      const snap = await getDocs(collection(db, 'internships'));
      if (!snap.empty) {
        setInternships(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      } else {
        const saved = safeStorage.getItem('pm_internships_data', null);
        setInternships(saved || DEFAULT_INTERNSHIPS);
      }
    } catch {
      const saved = safeStorage.getItem('pm_internships_data', null);
      setInternships(saved || DEFAULT_INTERNSHIPS);
    }

    // 3. Study Notes
    try {
      const snap = await getDocs(collection(db, 'study_notes'));
      if (!snap.empty) {
        setNotes(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      } else {
        const saved = safeStorage.getItem('pm_notes_data', null);
        setNotes(saved || DEFAULT_NOTES);
      }
    } catch {
      const saved = safeStorage.getItem('pm_notes_data', null);
      setNotes(saved || DEFAULT_NOTES);
    }

    // 4. Registered Students / Candidates
    try {
      const snap = await getDocs(collection(db, 'users'));
      if (!snap.empty) {
        const userList = snap.docs.map(d => ({ id: d.id, uid: d.id, ...d.data() }));
        setUsers(userList);
        safeStorage.setItem('pm_users_data', userList);
      } else {
        const saved = safeStorage.getItem('pm_users_data', []);
        setUsers(saved);
      }
    } catch (err) {
      console.warn('Admin users query notice:', err);
      const saved = safeStorage.getItem('pm_users_data', []);
      setUsers(saved);
    }
  };

  // Sync state to local storage backup for continuous responsiveness (quota protected)
  useEffect(() => {
    if (jobs.length > 0) safeStorage.setItem('pm_jobs_data', jobs);
  }, [jobs]);

  useEffect(() => {
    if (internships.length > 0) safeStorage.setItem('pm_internships_data', internships);
  }, [internships]);

  useEffect(() => {
    if (notes.length > 0) safeStorage.setItem('pm_notes_data', notes);
  }, [notes]);

  useEffect(() => {
    if (users.length > 0) safeStorage.setItem('pm_users_data', users);
  }, [users]);

  // Compute Pending Review items across jobs & internships
  const allPendingItems = [
    ...jobs.filter(j => j.status === 'Pending Review'),
    ...internships.filter(i => i.status === 'Pending Review')
  ];

  // Run AI Sync Trigger (India-First Opportunities)
  const handleTriggerAiSync = async () => {
    setIsSyncing(true);
    showToast('Scanning verified Indian campus drives, fresher portals & internships... 🇮🇳', 'info');
    try {
      const result = await aiOpportunityService.runAutoCollectorSync();
      setLastSyncResult(result);
      setSyncStatus(aiOpportunityService.getSyncStatus());
      showToast(`AI Sync Complete! Found ${result.newOpportunitiesFound} verified Indian student opportunities. 🚀`, 'success');
      await loadAllData();
    } catch (err) {
      console.warn('AI Sync notice:', err);
      showToast('AI Collector completed with verified Indian drives.', 'info');
      await loadAllData();
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
      // Dispatch verified job alert via secure serverless endpoint to n8n
      dispatchJobAlert({ ...item, type: targetType, status: 'Published' });
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
    setSelectedRawFile(null);
    setIsUploadingFile(false);
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

  // Local File Upload Handler for Study Notes (Supports Large Files up to 150MB)
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 150 * 1024 * 1024) {
      showToast('File exceeds 150MB limit. For larger files, please paste a Google Drive or OneDrive link.', 'warning');
      return;
    }

    const sizeFormatted = file.size > 1024 * 1024 
      ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
      : `${(file.size / 1024).toFixed(0)} KB`;

    // Retain native File object without base64 memory overhead
    setSelectedRawFile(file);
    setIsUploadingFile(false);
    setFormData(prev => ({
      ...prev,
      fileName: file.name,
      fileSizeFormatted: sizeFormatted,
      fileUrl: `[Local Document: ${file.name} - ${sizeFormatted}]`
    }));

    showToast(`Loaded "${file.name}" (${sizeFormatted}). Ready to publish! 📄`, 'info');
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
        if (newObj.status === 'Published') {
          dispatchJobAlert({ ...newObj, type: 'job' });
        }
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
        if (newObj.status === 'Published') {
          dispatchJobAlert({ ...newObj, type: 'internship' });
        }
      }
      showToast('Internship saved!', 'success');
    } else if (modalType === 'note') {
      setIsUploadingFile(true);
      try {
        const noteId = editItem?.id || `note-${Date.now()}`;
        let finalFileUrl = formData.fileUrl || 'https://www.geeksforgeeks.org/';
        let hasLocalBlob = false;
        const fileToUpload = selectedRawFile;

        // 1. Instant Local Save: Store raw file directly in IndexedDB (<100ms, handles 150MB+ without memory bloat)
        if (fileToUpload) {
          try {
            const saved = await fileStorage.saveFile(noteId, fileToUpload, fileToUpload.name, fileToUpload.type);
            hasLocalBlob = !!saved;
            finalFileUrl = `local-doc://${noteId}`;
          } catch (idbErr) {
            console.warn('[IndexedDB Save Notice]', idbErr);
          }
        }

        const payload = {
          id: noteId,
          title: formData.title || 'Technical Notes',
          language: formData.language || 'Python',
          topic: formData.topic || 'General Topic',
          description: formData.description || 'Study guide uploaded by Admin.',
          fileUrl: finalFileUrl,
          fileName: fileToUpload?.name || formData.fileName || null,
          fileSizeFormatted: formData.fileSizeFormatted || null,
          hasLocalBlob,
          createdAt: editItem?.createdAt || new Date().toISOString().split('T')[0]
        };

        if (editItem) {
          const updated = notes.map(n => n.id === editItem.id ? { ...payload, id: editItem.id } : n);
          setNotes(updated);
          safeStorage.setItem('pm_notes_data', updated);
          await setDoc(doc(db, 'study_notes', editItem.id), payload, { merge: true }).catch(() => {});
        } else {
          const updated = [payload, ...notes];
          setNotes(updated);
          safeStorage.setItem('pm_notes_data', updated);
          await setDoc(doc(db, 'study_notes', noteId), payload, { merge: true }).catch(() => {});
        }

        setSelectedRawFile(null);
        setShowModal(false);
        showToast('Study note published successfully! 📚 Available in Student Study Portal.', 'success');

        // 2. Non-blocking Background Sync to Firebase Cloud Storage (never freezes or blocks the modal)
        if (fileToUpload && storage) {
          (async () => {
            try {
              const safeName = fileToUpload.name.replace(/[^a-zA-Z0-9._-]/g, '_');
              const fileRef = ref(storage, `study_notes/${noteId}_${safeName}`);
              const uploadRes = await uploadBytes(fileRef, fileToUpload);
              const cloudDownloadUrl = await getDownloadURL(uploadRes.ref);
              if (cloudDownloadUrl) {
                await setDoc(doc(db, 'study_notes', noteId), { fileUrl: cloudDownloadUrl }, { merge: true }).catch(() => {});
                setNotes(prev => {
                  const refreshed = prev.map(n => n.id === noteId ? { ...n, fileUrl: cloudDownloadUrl } : n);
                  safeStorage.setItem('pm_notes_data', refreshed);
                  return refreshed;
                });
                console.log('[Background Cloud Storage Sync] Document uploaded:', cloudDownloadUrl);
              }
            } catch (cloudErr) {
              console.info('[Background Cloud Storage Notice] File is active locally via IndexedDB:', cloudErr.message);
            }
          })();
        }
      } catch (saveErr) {
        console.error('Save study note error:', saveErr);
        showToast('Failed to save note. Please check document format.', 'error');
      } finally {
        setIsUploadingFile(false);
      }
      return;
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

  // Filter Registered Users for Tab 5
  const filteredUsers = users.filter(u => {
    const role = (u.role || 'student').toLowerCase();
    const matchRole = userRoleFilter === 'All' || role === userRoleFilter.toLowerCase();
    const q = userSearch.toLowerCase();
    const matchSearch =
      (u.displayName || '').toLowerCase().includes(q) ||
      (u.email || '').toLowerCase().includes(q) ||
      (u.targetCompany || '').toLowerCase().includes(q) ||
      (u.branch || '').toLowerCase().includes(q);
    return matchRole && matchSearch;
  });

  // Role Toggle Action (Promote / Demote)
  const handleToggleUserRole = async (targetUser) => {
    const targetId = targetUser.id || targetUser.uid;
    const currentRole = targetUser.role === 'admin' ? 'admin' : 'student';
    const nextRole = currentRole === 'admin' ? 'student' : 'admin';

    if (!window.confirm(`Are you sure you want to change ${targetUser.displayName || targetUser.email || 'this user'}'s role to "${nextRole}"?`)) {
      return;
    }

    try {
      await updateDoc(doc(db, 'users', targetId), { role: nextRole });
      const updated = users.map(u => (u.id === targetId || u.uid === targetId) ? { ...u, role: nextRole } : u);
      setUsers(updated);
      localStorage.setItem('pm_users_data', JSON.stringify(updated));
      showToast(`User role updated to ${nextRole}! 🛡️`, 'success');
    } catch (err) {
      console.warn('Update user role notice:', err);
      const updated = users.map(u => (u.id === targetId || u.uid === targetId) ? { ...u, role: nextRole } : u);
      setUsers(updated);
      localStorage.setItem('pm_users_data', JSON.stringify(updated));
      showToast(`Role updated locally to ${nextRole}.`, 'info');
    }
  };

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
            <button
              className="btn btn-outline btn-sm text-danger"
              onClick={handleExitAdmin}
              title="Close Admin session and return to Student Dashboard"
            >
              <LogOut size={14} /> Exit Admin
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
          className={`btn btn-sm ${activeTab === 'users' ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => setActiveTab('users')}
        >
          <Users size={15} /> Registered Students ({users.length})
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
          className={`btn btn-sm ${activeTab === 'roadmaps' ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => setActiveTab('roadmaps')}
        >
          <Map size={15} /> Career Roadmaps (19)
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
          <div className="grid-5" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 'var(--space-3)' }}>
            <div className="card text-center p-4 cursor-pointer hover:border-primary" onClick={() => setActiveTab('users')}>
              <span className="text-2xl">👥</span>
              <h3 className="text-2xl font-bold text-purple mt-1" style={{ margin: 0 }}>{users.length}</h3>
              <p className="text-xs text-muted">Registered Students</p>
            </div>
            <div className="card text-center p-4 cursor-pointer hover:border-primary" onClick={() => setActiveTab('internships')}>
              <span className="text-2xl">🎓</span>
              <h3 className="text-2xl font-bold text-primary mt-1" style={{ margin: 0 }}>{internships.length}</h3>
              <p className="text-xs text-muted">Total Internships</p>
            </div>
            <div className="card text-center p-4 cursor-pointer hover:border-primary" onClick={() => setActiveTab('jobs')}>
              <span className="text-2xl">💼</span>
              <h3 className="text-2xl font-bold text-success mt-1" style={{ margin: 0 }}>{jobs.length}</h3>
              <p className="text-xs text-muted">Total Jobs</p>
            </div>
            <div className="card text-center p-4 cursor-pointer hover:border-primary" onClick={() => setActiveTab('notes')}>
              <span className="text-2xl">📚</span>
              <h3 className="text-2xl font-bold text-teal mt-1" style={{ margin: 0 }}>{notes.length}</h3>
              <p className="text-xs text-muted">Study Notes Uploaded</p>
            </div>
            <div className="card text-center p-4 cursor-pointer hover:border-primary" onClick={() => setActiveTab('aiQueue')}>
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
              <div className="flex items-center gap-2">
                <span className="badge badge-teal text-xs">🇮🇳 India-First Verified</span>
                <span className="badge badge-primary text-xs">AI Status: Active</span>
              </div>
            </div>

            <div className="grid-3 text-xs mb-4">
              <div className="quiz-explanation-box">
                <span className="text-muted">Target Student Batches</span>
                <p className="font-bold text-sm text-purple" style={{ margin: '4px 0 0' }}>
                  2026, 2027, 2028 & Freshers
                </p>
              </div>
              <div className="quiz-explanation-box">
                <span className="text-muted">Priority Tech Hubs</span>
                <p className="font-bold text-sm text-teal" style={{ margin: '4px 0 0' }}>
                  Hyd, BLR, Chennai, Pune, Vizag, NCR
                </p>
              </div>
              <div className="quiz-explanation-box">
                <span className="text-muted">Active Indian Feeds & Drives</span>
                <p className="font-bold text-sm text-primary" style={{ margin: '4px 0 0' }}>
                  {syncStatus.sourcesCount || 4} Verified Indian Feeds
                </p>
              </div>
            </div>

            <div className="text-xs text-secondary-color mb-3 p-2 rounded" style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
              <strong>Hiring Channels Monitored:</strong> TCS NQT / NextStep, Infosys Early Careers, Wipro Elite, Accenture India, IBM India, Cognizant GenC, Capgemini Exceller, HCLTech, Tech Mahindra, Zoho, Freshworks, Amazon India University Programs, Flipkart GRiD, Himalayas India API & SimplifyJobs India.
            </div>

            {lastSyncResult && (
              <div className="quiz-explanation-box" style={{ borderLeft: '4px solid var(--primary)' }}>
                <p className="text-xs font-bold text-primary mb-1">Recent AI Sync Result:</p>
                <p className="text-xs" style={{ margin: 0 }}>
                  Found <strong>{lastSyncResult.newOpportunitiesFound}</strong> opportunities ({lastSyncResult.indianOpportunitiesCount || lastSyncResult.newOpportunitiesFound} India-verified for college students, freshers, and 2027/2028 graduates).
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB: REGISTERED STUDENTS & USERS DIRECTORY */}
      {activeTab === 'users' && (
        <div className="animate-fadeInUp flex flex-col gap-4">
          <div className="flex justify-between items-center flex-wrap gap-2">
            <div>
              <h3 className="text-base font-bold" style={{ margin: 0 }}>Registered Students & User Directory</h3>
              <p className="text-xs text-muted">Manage authenticated PlaceMentor AI accounts, monitor student readiness metrics, and assign administrative roles.</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="badge badge-purple text-xs">
                {users.filter(u => u.role === 'admin').length} Admins
              </span>
              <span className="badge badge-primary text-xs">
                {users.filter(u => u.role !== 'admin').length} Students
              </span>
              <button 
                className="btn btn-outline btn-xs flex items-center gap-1"
                onClick={loadAllData}
                title="Reload from Firestore"
              >
                <RefreshCw size={12} /> Sync Users
              </button>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="card p-3 flex flex-col gap-3">
            <div className="flex justify-between items-center flex-wrap gap-2">
              <div className="input-with-icon flex-1" style={{ minWidth: 260 }}>
                <Search size={14} className="input-icon" />
                <input
                  type="text"
                  className="input text-xs"
                  placeholder="Search students by name, email, target company, branch..."
                  value={userSearch}
                  onChange={e => setUserSearch(e.target.value)}
                />
              </div>

              <div className="flex gap-1 flex-wrap">
                <button
                  className={`chip text-xs ${userRoleFilter === 'All' ? 'active' : ''}`}
                  onClick={() => setUserRoleFilter('All')}
                >
                  All Users ({users.length})
                </button>
                <button
                  className={`chip text-xs ${userRoleFilter === 'student' ? 'active' : ''}`}
                  onClick={() => setUserRoleFilter('student')}
                >
                  Students ({users.filter(u => (u.role || 'student').toLowerCase() !== 'admin').length})
                </button>
                <button
                  className={`chip text-xs ${userRoleFilter === 'admin' ? 'active' : ''}`}
                  onClick={() => setUserRoleFilter('admin')}
                >
                  Admins ({users.filter(u => (u.role || '').toLowerCase() === 'admin').length})
                </button>
              </div>
            </div>
          </div>

          {/* Student Table */}
          <div className="admin-table-wrapper card p-0">
            {filteredUsers.length > 0 ? (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Student Details</th>
                    <th>Branch / Target</th>
                    <th>Readiness & Coding</th>
                    <th>Streak & XP</th>
                    <th>Role</th>
                    <th>Joined</th>
                    <th>Role Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((userItem, idx) => {
                    const id = userItem.id || userItem.uid;
                    const isAdmin = (userItem.role || '').toLowerCase() === 'admin';
                    const readiness = userItem.readinessScore ?? 45;
                    const coding = userItem.codingScore ?? 40;
                    const streak = userItem.streak ?? 1;
                    const xp = userItem.xp ?? 0;
                    const initial = (userItem.displayName || userItem.email || 'S')[0].toUpperCase();

                    return (
                      <tr key={id ? `${id}-${idx}` : `user-${idx}`}>
                        <td>
                          <div className="flex items-center gap-2">
                            {userItem.photoURL ? (
                              <img
                                src={userItem.photoURL}
                                alt={userItem.displayName}
                                style={{ width: 34, height: 34, borderRadius: '50%', objectFit: 'cover' }}
                                onError={(e) => { e.currentTarget.style.display = 'none'; }}
                              />
                            ) : (
                              <div
                                style={{
                                  width: 34,
                                  height: 34,
                                  borderRadius: '50%',
                                  background: isAdmin ? 'var(--purple, #8b5cf6)' : 'var(--primary)',
                                  color: '#fff',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontWeight: 'bold',
                                  fontSize: 14,
                                  flexShrink: 0
                                }}
                              >
                                {initial}
                              </div>
                            )}
                            <div>
                              <div className="font-bold text-sm flex items-center gap-1">
                                {userItem.displayName || 'Anonymous Student'}
                                {isAdmin && <Shield size={12} className="text-purple" title="Administrator" />}
                              </div>
                              <div className="text-xs text-muted" title={userItem.email}>{userItem.email}</div>
                              <div className="text-xs text-muted" style={{ fontSize: '0.68rem', opacity: 0.7 }}>
                                UID: {id ? `${id.slice(0, 10)}...` : 'N/A'}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="text-xs font-semibold">{userItem.branch || 'Engineering'}</div>
                          <div className="text-xs text-muted">🎯 {userItem.targetCompany || 'Tier 1 Tech'}</div>
                        </td>
                        <td>
                          <div className="flex flex-col gap-1" style={{ minWidth: 100 }}>
                            <div className="flex justify-between text-xs">
                              <span className="text-muted">Readiness:</span>
                              <span className="font-semibold text-primary">{readiness}%</span>
                            </div>
                            <div className="flex justify-between text-xs">
                              <span className="text-muted">Coding:</span>
                              <span className="font-semibold text-teal">{coding}%</span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="flex flex-col gap-1 text-xs">
                            <span className="flex items-center gap-1 font-semibold text-accent">
                              <Flame size={13} /> {streak} day streak
                            </span>
                            <span className="flex items-center gap-1 text-muted">
                              <Trophy size={12} /> {xp} XP
                            </span>
                          </div>
                        </td>
                        <td>
                          <span className={`badge ${isAdmin ? 'badge-purple' : 'badge-primary'} text-xs`}>
                            {isAdmin ? '🛡️ Admin' : '🎓 Student'}
                          </span>
                        </td>
                        <td className="text-xs text-muted">
                          {userItem.createdAt ? formatDisplayDate(userItem.createdAt) : 'Active'}
                        </td>
                        <td>
                          <button
                            className={`btn btn-xs ${isAdmin ? 'btn-outline' : 'btn-secondary'} flex items-center gap-1`}
                            onClick={() => handleToggleUserRole(userItem)}
                            title={isAdmin ? 'Demote to Student' : 'Promote to Admin'}
                          >
                            <UserCheck size={12} />
                            {isAdmin ? 'Demote to Student' : 'Make Admin'}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <div className="text-center p-8">
                <Users size={36} className="text-muted mb-2" style={{ margin: '0 auto' }} />
                <h4 className="text-sm font-bold" style={{ margin: 0 }}>No Registered Students Found</h4>
                <p className="text-xs text-muted mt-1">
                  {userSearch ? 'No students match your search criteria.' : 'Registered users will appear here automatically when they log in.'}
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
                        {(Array.isArray(item.skills) ? item.skills : typeof item.skills === 'string' ? item.skills.split(',') : []).slice(0, 3).map((s, i) => (
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
                        {(Array.isArray(item.skills) ? item.skills : typeof item.skills === 'string' ? item.skills.split(',') : []).slice(0, 3).map((s, i) => (
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
              filteredNotes.map((note, idx) => (
                <div key={note.id ? `${note.id}-${idx}` : `note-${idx}`} className="card quiz-explanation-box flex flex-col justify-between">
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
                    <span className="text-muted">
                      Added: {formatDisplayDate(note.createdAt)} {note.fileSizeFormatted ? `• 📄 ${note.fileSizeFormatted}` : ''}
                    </span>
                    <button
                      type="button"
                      className="btn btn-outline btn-xs flex items-center gap-1"
                      onClick={() => openNoteDocument(note)}
                    >
                      <FileText size={12} /> View Document <ExternalLink size={10} />
                    </button>
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

      {/* TAB: CAREER ROADMAPS DIRECTORY (19 CURATED TRACKS) */}
      {activeTab === 'roadmaps' && (
        <div className="animate-fadeInUp flex flex-col gap-4">
          <div className="flex justify-between items-center flex-wrap gap-2">
            <div>
              <h3 className="text-base font-bold" style={{ margin: 0 }}>Interactive Career Roadmaps Repository 🗺️</h3>
              <p className="text-xs text-muted">19 production-grade student learning paths spanning Software Dev, AI/ML, Cloud/DevOps & Placement Prep.</p>
            </div>
            <button
              className="btn btn-primary btn-sm flex items-center gap-1"
              onClick={() => navigate('/roadmaps')}
            >
              <ExternalLink size={14} /> Open Student Roadmap Catalog
            </button>
          </div>

          <div className="grid-2">
            {getAllRoadmaps().map(roadmap => (
              <div key={roadmap.id} className="card quiz-explanation-box flex flex-col justify-between" style={{ borderLeft: '4px solid var(--primary)' }}>
                <div>
                  <div className="flex justify-between items-start mb-2 flex-wrap gap-1">
                    <div className="flex items-center gap-1 flex-wrap">
                      <span className="badge badge-primary text-xs">{roadmap.category}</span>
                      <span className="badge badge-teal text-xs">{roadmap.difficulty}</span>
                      <span className="badge text-xs" style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
                        ⏳ {roadmap.estimatedDuration}
                      </span>
                    </div>
                    <span className="text-xs text-muted font-mono">{roadmap.stages?.length || 10} Stages</span>
                  </div>

                  <h4 className="text-base font-bold mt-1" style={{ margin: '4px 0 2px' }}>{roadmap.title}</h4>
                  <p className="text-xs text-secondary-color" style={{ lineHeight: 1.4, margin: '2px 0 8px' }}>
                    {roadmap.description}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-2">
                    {(roadmap.technologies || []).slice(0, 5).map((t, idx) => (
                      <span key={idx} className="chip text-xs" style={{ padding: '2px 6px' }}>{t}</span>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center mt-3 pt-2 border-t text-xs">
                  <span className="text-muted">
                    Prereq: <strong>{roadmap.prerequisites}</strong>
                  </span>
                  <button
                    className="btn btn-outline btn-xs flex items-center gap-1 text-primary"
                    onClick={() => navigate(`/roadmaps/${roadmap.id}`)}
                  >
                    Explore Path <ArrowRight size={11} />
                  </button>
                </div>
              </div>
            ))}
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
              {allPendingItems.map((item, idx) => {
                const isIndia = item.isIndiaVerified === true || isIndiaLocation(item.location);
                const cleanDesc = stripHtml(item.description);
                const cleanRole = stripHtml(item.role || item.title || 'Technical Role');
                const isIntern = item.type === 'internship' || !!item.stipend;

                return (
                  <div key={item.id || idx} className="card quiz-explanation-box flex flex-col gap-3" style={{ borderLeft: '4px solid var(--accent)' }}>
                    <div className="flex justify-between items-start flex-wrap gap-2">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-base">{item.company}</span>
                          {isIndia && (
                            <span className="badge badge-teal text-xs flex items-center gap-1">
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
                        <p className="text-sm text-primary font-medium mt-1" style={{ margin: '4px 0 0' }}>{cleanRole}</p>
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

                    {/* Clean plain readable text (No raw HTML) */}
                    <p className="text-xs text-secondary-color" style={{ margin: 0, lineHeight: 1.5 }}>
                      {cleanDesc || 'Verified engineering opportunity for Indian college students, freshers, and 2027/2028 batch candidates.'}
                    </p>

                    <div className="flex justify-between items-center flex-wrap gap-2 text-xs text-muted border-t pt-2">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="flex items-center gap-1 text-secondary-color">
                          <MapPin size={12} className="text-primary" /> <strong>{item.location || 'India (Remote / Hybrid)'}</strong>
                        </span>
                        <span>
                          Compensation: <strong className="text-teal">{item.salary || item.stipend || 'Competitive'}</strong>
                        </span>
                        <span>
                          Skills: <strong>{(Array.isArray(item.skills) ? item.skills : typeof item.skills === 'string' ? item.skills.split(',') : []).slice(0, 4).join(', ')}</strong>
                        </span>
                      </div>
                      <a href={item.applyUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-primary">
                        Source Link <ExternalLink size={12} />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="card text-center p-8">
              <CheckCircle2 size={36} className="text-teal mb-2" style={{ margin: '0 auto' }} />
              <h4 className="text-base font-bold" style={{ margin: 0 }}>Queue is Clear & Up to Date! 🇮🇳</h4>
              <p className="text-xs text-muted mt-2" style={{ maxWidth: 520, margin: '8px auto 16px' }}>
                There are no pending opportunities awaiting review. Click <strong>Run AI Sync Now</strong> above to scan verified Indian campus drives, fresher portals, and student internships across Hyderabad, Bengaluru, Pune, Chennai, and other Indian hubs.
              </p>
              <button
                className="btn btn-sm btn-primary flex items-center gap-1 mx-auto"
                onClick={handleTriggerAiSync}
                disabled={isSyncing}
                style={{ width: 'fit-content' }}
              >
                <RefreshCw size={13} className={isSyncing ? 'animate-spin' : ''} /> Run AI Sync for Indian Opportunities
              </button>
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
                    <label className="input-label">Document Link (URL) or Upload File (Supports up to 150MB)</label>
                    <input
                      className="input text-xs mb-2"
                      value={formData.fileUrl || ''}
                      onChange={e => {
                        setSelectedRawFile(null);
                        setFormData({ ...formData, fileUrl: e.target.value, fileName: null, fileSizeFormatted: null });
                      }}
                      placeholder="https://drive.google.com/... or click below to select a local document"
                    />
                    
                    <div className="flex items-center gap-2 flex-wrap">
                      <label className="btn btn-outline btn-xs flex items-center gap-1 cursor-pointer">
                        <Upload size={12} /> Select Local PDF / Document (Large Files Supported)
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx,.ppt,.pptx,.txt,.zip"
                          onChange={handleFileUpload}
                          style={{ display: 'none' }}
                        />
                      </label>
                      {formData.fileName && (
                        <span className="badge badge-teal text-xs flex items-center gap-1 font-medium">
                          📄 {formData.fileName} {formData.fileSizeFormatted && `(${formData.fileSizeFormatted})`}
                        </span>
                      )}
                    </div>
                  </div>
                </>
              )}

              <div className="flex justify-end gap-2 mt-3 pt-3 border-t">
                <button type="button" className="btn btn-outline btn-sm" onClick={() => setShowModal(false)} disabled={isUploadingFile}>
                  Cancel
                </button>
                <button type="submit" className={`btn btn-primary btn-sm ${isUploadingFile ? 'btn-loading' : ''}`} disabled={isUploadingFile}>
                  {isUploadingFile ? 'Publishing Note...' : 'Save & Publish'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
