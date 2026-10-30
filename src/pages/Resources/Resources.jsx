// ============================================
// PlaceMentor AI — Study Resources & Notes Module
// Integrates Admin Published Notes by Technical Subject & Programming Language
// ============================================

import React, { useState, useEffect } from 'react';
import { FileText, Download, BookOpen, ExternalLink, Search, Filter, Sparkles, FileCheck } from 'lucide-react';
import { db } from '../../config/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { safeStorage, openNoteDocument } from '../../utils/safeStorage';
import './Resources.css';

const DEFAULT_NOTES = [
  {
    id: 'res-note-1',
    language: 'Python',
    topic: 'Core Syntax & Collections',
    title: 'Python Complete Master Notes',
    description: 'Comprehensive guide covering Lists, Dictionaries, Sets, OOPs, and Memory Management in Python.',
    fileUrl: 'https://www.python.org/doc/',
    createdAt: '2026-09-15'
  },
  {
    id: 'res-note-2',
    language: 'Data Structures',
    topic: 'Trees & Graphs',
    title: 'Binary Trees & BFS/DFS Cheatsheet',
    description: 'Tree traversals, Lowest Common Ancestor, Graph Shortest Path algorithms with C++ & Java implementations.',
    fileUrl: 'https://geeksforgeeks.org/',
    createdAt: '2026-09-17'
  },
  {
    id: 'res-note-3',
    language: 'Java',
    topic: 'Object Oriented Programming',
    title: 'Java OOPs & Multithreading Guide',
    description: 'Polymorphism, Inheritance, Encapsulation, Abstraction, and Concurrent Collections in Java.',
    fileUrl: 'https://docs.oracle.com/en/java/',
    createdAt: '2026-09-18'
  },
  {
    id: 'res-note-4',
    language: 'SQL',
    topic: 'Relational DBMS',
    title: 'SQL Master Cheatsheet & Joins Guide',
    description: 'INNER JOIN, LEFT JOIN, Aggregations, Indexing optimization, and 1NF to 3NF Normalization.',
    fileUrl: 'https://sqlite.org/docs.html',
    createdAt: '2026-09-19'
  }
];

const SUBJECT_CATEGORIES = [
  'All', 'Python', 'Java', 'C', 'C++', 'JavaScript',
  'HTML/CSS', 'SQL', 'Data Structures', 'AI/ML', 'Cloud'
];

function formatDisplayDate(val) {
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

export default function Resources() {
  const [notes, setNotes] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    let list = [];
    try {
      const snap = await getDocs(collection(db, 'study_notes'));
      if (!snap.empty) {
        list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      }
    } catch (e) {
      console.warn('Study notes Firestore query notice:', e);
    }

    if (list.length === 0) {
      const cached = safeStorage.getItem('pm_notes_data', []);
      list = cached.length > 0 ? cached : DEFAULT_NOTES;
    }

    setNotes(list);
  };

  const filteredNotes = notes.filter(n => {
    const matchSubject = selectedSubject === 'All' || (n.language || '').toLowerCase() === selectedSubject.toLowerCase();
    const matchSearch =
      (n.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (n.topic || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (n.description || '').toLowerCase().includes(searchTerm.toLowerCase());
    return matchSubject && matchSearch;
  });

  return (
    <div className="page resources-page">
      <div className="section-heading mb-6">
        <div>
          <h2>Technical Study Notes & Resources 📚</h2>
          <p className="text-secondary-color">
            Admin-verified programming notes, technical subject guides, and language cheatsheets for placement preparation.
          </p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="card mb-6 flex flex-col gap-4">
        <div className="input-with-icon">
          <Search size={16} className="input-icon" />
          <input
            type="text"
            className="input"
            placeholder="Search by note title, topic, or language (e.g. Python, Trees, SQL)..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Subject Chips */}
        <div className="flex gap-2 flex-wrap border-t pt-3">
          {SUBJECT_CATEGORIES.map(sub => (
            <button
              key={sub}
              className={`chip ${selectedSubject === sub ? 'active' : ''}`}
              onClick={() => setSelectedSubject(sub)}
              style={{ padding: '4px 10px', fontSize: 'var(--text-xs)' }}
            >
              {sub}
            </button>
          ))}
        </div>
      </div>

      {/* Notes Grid */}
      <div className="grid-2">
        {filteredNotes.length > 0 ? (
          filteredNotes.map(note => (
            <div key={note.id} className="card flex flex-col justify-between animate-fadeInUp">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="badge badge-primary">{note.language || 'Technical'}</span>
                  <span className="text-xs text-muted">Topic: <strong>{note.topic}</strong></span>
                </div>
                <h3 className="text-base font-bold mb-2">{note.title}</h3>
                <p className="text-xs text-secondary-color mb-4" style={{ lineHeight: 1.5 }}>
                  {note.description}
                </p>
              </div>

              <div className="flex justify-between items-center border-t pt-3 mt-2 text-xs">
                <span className="text-muted">
                  Added: {formatDisplayDate(note.createdAt)} {note.fileSizeFormatted ? `• 📄 ${note.fileSizeFormatted}` : ''}
                </span>
                <button
                  type="button"
                  className="btn btn-outline btn-sm flex items-center gap-1"
                  onClick={() => openNoteDocument(note)}
                >
                  <FileText size={14} /> View Document <ExternalLink size={12} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="card text-center p-8 col-span-2">
            <BookOpen size={32} className="text-muted mb-2" style={{ margin: '0 auto' }} />
            <h4 className="text-sm font-bold" style={{ margin: 0 }}>No study notes match your search</h4>
            <p className="text-xs text-muted mt-1">Try selecting another language subject chip above.</p>
          </div>
        )}
      </div>
    </div>
  );
}
