// ============================================
// PlaceMentor AI — AI Resume Builder Enhancement Module
// ATS-friendly professional resume generator with auto-profile imports and inline editing
// ============================================
import React, { useState } from 'react';
import {
  FileText, Sparkles, Download, Edit3, CheckCircle, RefreshCw,
  Globe, Briefcase, GraduationCap, Award, Printer, User, Code2, Link as LinkIcon
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { aiService } from '../../services/ai/aiService';
import './Resume.css';

export default function Resume() {
  const { user, userProfile } = useAuth();
  const { showToast, setNekoEmotion } = useApp();

  const [activeTab, setActiveTab] = useState('form'); // 'form' | 'preview'
  const [generating, setGenerating] = useState(false);

  // Questionnaire Form State
  const [formData, setForm] = useState({
    fullName: userProfile?.displayName || user?.displayName || 'Hansika Vanam',
    email: userProfile?.email || user?.email || 'student@college.edu',
    phone: '+91 98765 43210',
    location: 'Hyderabad, India',
    github: 'https://github.com/hansika-vanam',
    linkedin: 'https://linkedin.com/in/hansika-vanam',
    targetRole: 'Software Development Engineer / Full Stack Developer',
    summary: 'Enthusiastic Computer Science undergraduate with strong problem-solving skills in Data Structures, Algorithms, and Full-Stack Web Development. Proven track record in building web applications and competitive coding.',
    languages: userProfile?.preferredLanguage ? `${userProfile.preferredLanguage}, Python, JavaScript, C++, SQL` : 'Python, JavaScript, C++, Java, SQL',
    skills: 'React.js, Node.js, Express, MongoDB, Firebase, Git, REST APIs, HTML5/CSS3, Data Structures & Algorithms',
    projects: '1. PlaceMentor AI: Responsive AI-powered placement prep app built with React 18, Vite, Firebase, & Gemini AI.\n2. E-Commerce Platform: Scalable MERN stack web store with Stripe payment gateway & JWT auth.',
    internships: 'Software Engineering Intern at Tech Solutions Inc. (June 2025 - August 2025): Developed responsive React components and optimized API query latency by 30%.',
    education: 'B.Tech in Computer Science & Engineering (2022 - 2026) | CGPA: 8.8 / 10.0',
    certifications: 'AWS Certified Cloud Practitioner, Meta Front-End Developer Specialization',
    achievements: `Gold Placement Medalist on PlaceMentor AI (${userProfile?.streak || 7}-Day Active Streak), 1st Place in College Hackathon`
  });

  const handleChange = (field, val) => setForm(p => ({ ...p, [field]: val }));

  const handleImportProfileAchievements = () => {
    const profileMedals = `PlaceMentor AI Profile: ${userProfile?.streak || 5}-Day Learning Streak, ${userProfile?.xp || 500} XP Points, Verified Placement Readiness (${userProfile?.placementReadiness || 75}%)`;
    setForm(p => ({
      ...p,
      achievements: p.achievements ? `${p.achievements}\n${profileMedals}` : profileMedals
    }));
    showToast('Imported PlaceMentor AI medals and streak achievements! 🏆', 'success');
  };

  const handleGenerateResume = async () => {
    setGenerating(true);
    setNekoEmotion('thinking');
    try {
      const aiContent = await aiService.generateResumeContent(formData);
      if (aiContent?.professionalSummary) {
        setForm(p => ({
          ...p,
          summary: aiContent.professionalSummary
        }));
      }
      setNekoEmotion('celebrating');
      showToast('ATS Resume content generated successfully! 📄✨', 'success');
      setActiveTab('preview');
    } catch {
      setActiveTab('preview');
      setNekoEmotion('happy');
    } finally {
      setGenerating(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="page resume-page">
      <div className="section-heading mb-6 hide-print">
        <div>
          <h2>AI Professional Resume Builder 📄</h2>
          <p className="text-secondary-color">Build an ATS-friendly, professional resume pre-populated with your PlaceMentor AI achievements and Gemini enhancements.</p>
        </div>
      </div>

      {/* Top Header Tabs */}
      <div className="card mb-6 flex justify-between items-center flex-wrap gap-3 hide-print">
        <div className="flex gap-2">
          <button
            className={`chip ${activeTab === 'form' ? 'active' : ''}`}
            onClick={() => setActiveTab('form')}
          >
            <Edit3 size={14} /> Resume Details Questionnaire
          </button>
          <button
            className={`chip ${activeTab === 'preview' ? 'active' : ''}`}
            onClick={() => setActiveTab('preview')}
          >
            <FileText size={14} /> ATS Resume Preview
          </button>
        </div>

        <div className="flex gap-2">
          <button className="btn btn-outline btn-sm" onClick={handleImportProfileAchievements}>
            <Award size={14} /> Auto-Import Medals & Streaks
          </button>
          {activeTab === 'preview' && (
            <button className="btn btn-primary btn-sm" onClick={handlePrint}>
              <Printer size={14} /> Print / Save PDF
            </button>
          )}
        </div>
      </div>

      {/* TAB 1: Questionnaire Input Form */}
      {activeTab === 'form' && (
        <div className="card animate-fadeInUp">
          <h3 className="text-lg font-bold mb-4 border-b pb-2">Step 1: Fill Your Professional Details</h3>
          <div className="flex flex-col gap-4 text-sm">
            {/* Personal Details */}
            <div className="grid-2">
              <div className="input-group">
                <label className="input-label">Full Name</label>
                <input className="input" value={formData.fullName} onChange={e => handleChange('fullName', e.target.value)} />
              </div>
              <div className="input-group">
                <label className="input-label">Target Role Objective</label>
                <input className="input" value={formData.targetRole} onChange={e => handleChange('targetRole', e.target.value)} />
              </div>
            </div>

            <div className="grid-3">
              <div className="input-group">
                <label className="input-label">Email</label>
                <input className="input" value={formData.email} onChange={e => handleChange('email', e.target.value)} />
              </div>
              <div className="input-group">
                <label className="input-label">Phone Number</label>
                <input className="input" value={formData.phone} onChange={e => handleChange('phone', e.target.value)} />
              </div>
              <div className="input-group">
                <label className="input-label">Location</label>
                <input className="input" value={formData.location} onChange={e => handleChange('location', e.target.value)} />
              </div>
            </div>

            <div className="grid-2">
              <div className="input-group">
                <label className="input-label">GitHub URL</label>
                <input className="input" value={formData.github} onChange={e => handleChange('github', e.target.value)} />
              </div>
              <div className="input-group">
                <label className="input-label">LinkedIn URL</label>
                <input className="input" value={formData.linkedin} onChange={e => handleChange('linkedin', e.target.value)} />
              </div>
            </div>

            {/* Career Objective */}
            <div className="input-group">
              <label className="input-label">Professional Summary / Career Objective</label>
              <textarea className="input text-xs" rows={3} value={formData.summary} onChange={e => handleChange('summary', e.target.value)} />
            </div>

            {/* Technical Skills & Languages */}
            <div className="grid-2">
              <div className="input-group">
                <label className="input-label">Programming Languages</label>
                <input className="input text-xs" value={formData.languages} onChange={e => handleChange('languages', e.target.value)} />
              </div>
              <div className="input-group">
                <label className="input-label">Technical Skills & Frameworks</label>
                <input className="input text-xs" value={formData.skills} onChange={e => handleChange('skills', e.target.value)} />
              </div>
            </div>

            {/* Projects & Work Experience */}
            <div className="input-group">
              <label className="input-label">Key Projects (Title, Tech Stack, & Description)</label>
              <textarea className="input text-xs" rows={3} value={formData.projects} onChange={e => handleChange('projects', e.target.value)} />
            </div>

            <div className="input-group">
              <label className="input-label">Internships & Work Experience</label>
              <textarea className="input text-xs" rows={3} value={formData.internships} onChange={e => handleChange('internships', e.target.value)} />
            </div>

            {/* Education, Certifications, Achievements */}
            <div className="grid-2">
              <div className="input-group">
                <label className="input-label">Education</label>
                <input className="input text-xs" value={formData.education} onChange={e => handleChange('education', e.target.value)} />
              </div>
              <div className="input-group">
                <label className="input-label">Certifications</label>
                <input className="input text-xs" value={formData.certifications} onChange={e => handleChange('certifications', e.target.value)} />
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">Achievements & Medals</label>
              <textarea className="input text-xs" rows={2} value={formData.achievements} onChange={e => handleChange('achievements', e.target.value)} />
            </div>

            {/* Submit Action */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              <button
                className={`btn btn-primary btn-lg ${generating ? 'btn-loading' : ''}`}
                onClick={handleGenerateResume}
                disabled={generating}
              >
                {!generating && <><Sparkles size={16} /> Generate ATS Resume Preview</>}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ATS-Friendly Resume Preview */}
      {activeTab === 'preview' && (
        <div className="ats-resume-container card animate-fadeInUp">
          <div className="ats-resume-paper">
            {/* Header */}
            <div className="ats-header text-center border-b pb-4 mb-4">
              <h1 className="ats-name text-2xl font-bold uppercase" style={{ margin: 0 }}>{formData.fullName}</h1>
              <p className="ats-title text-sm font-semibold text-primary-color" style={{ margin: '4px 0' }}>{formData.targetRole}</p>
              <p className="ats-contact text-xs text-muted" style={{ margin: 0 }}>
                {formData.email} | {formData.phone} | {formData.location}
              </p>
              <p className="ats-links text-xs text-muted" style={{ margin: '2px 0 0' }}>
                GitHub: {formData.github} | LinkedIn: {formData.linkedin}
              </p>
            </div>

            {/* Professional Summary */}
            <div className="ats-section mb-4">
              <h2 className="ats-section-title text-xs font-bold uppercase tracking-wider border-b pb-1 mb-2">Professional Summary</h2>
              <p className="text-xs text-secondary-color" style={{ margin: 0, lineHeight: 1.6 }}>{formData.summary}</p>
            </div>

            {/* Technical Skills */}
            <div className="ats-section mb-4">
              <h2 className="ats-section-title text-xs font-bold uppercase tracking-wider border-b pb-1 mb-2">Technical Skills</h2>
              <div className="text-xs flex flex-col gap-1">
                <p style={{ margin: 0 }}><strong>Languages:</strong> {formData.languages}</p>
                <p style={{ margin: 0 }}><strong>Technologies & Tools:</strong> {formData.skills}</p>
              </div>
            </div>

            {/* Projects */}
            <div className="ats-section mb-4">
              <h2 className="ats-section-title text-xs font-bold uppercase tracking-wider border-b pb-1 mb-2">Projects</h2>
              <div className="text-xs flex flex-col gap-2" style={{ whiteSpace: 'pre-line' }}>
                {formData.projects}
              </div>
            </div>

            {/* Work Experience / Internships */}
            {formData.internships && (
              <div className="ats-section mb-4">
                <h2 className="ats-section-title text-xs font-bold uppercase tracking-wider border-b pb-1 mb-2">Experience & Internships</h2>
                <div className="text-xs" style={{ whiteSpace: 'pre-line' }}>
                  {formData.internships}
                </div>
              </div>
            )}

            {/* Education */}
            <div className="ats-section mb-4">
              <h2 className="ats-section-title text-xs font-bold uppercase tracking-wider border-b pb-1 mb-2">Education</h2>
              <p className="text-xs" style={{ margin: 0 }}>{formData.education}</p>
            </div>

            {/* Certifications & Achievements */}
            <div className="ats-section">
              <h2 className="ats-section-title text-xs font-bold uppercase tracking-wider border-b pb-1 mb-2">Certifications & Achievements</h2>
              <div className="text-xs flex flex-col gap-1">
                {formData.certifications && <p style={{ margin: 0 }}><strong>Certifications:</strong> {formData.certifications}</p>}
                {formData.achievements && <p style={{ margin: 0, whiteSpace: 'pre-line' }}><strong>Achievements:</strong> {formData.achievements}</p>}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
