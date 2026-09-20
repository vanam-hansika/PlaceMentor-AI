// ============================================
// Profile Setup Page (Post-Signup)
// ============================================
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, GraduationCap, Target, Code2, Building2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import './Auth.css';
import './ProfileSetup.css';

const steps = [
  { id: 'academic', title: 'Academic Info', icon: GraduationCap },
  { id: 'goal', title: 'Your Goal', icon: Target },
  { id: 'coding', title: 'Coding Skills', icon: Code2 },
];

const branches = ['Computer Science', 'Information Technology', 'Electronics', 'Electrical', 'Mechanical', 'Civil', 'Other'];
const years = ['1st Year', '2nd Year', '3rd Year', '4th Year', 'Graduated'];
const companies = ['Google', 'Microsoft', 'Amazon', 'Infosys', 'TCS', 'Wipro', 'Accenture', 'Cognizant', 'Capgemini', 'IBM', 'Deloitte', 'Other'];
const languages = ['Python', 'Java', 'C++', 'C', 'JavaScript'];
const levels = ['Beginner', 'Intermediate', 'Advanced'];

export default function ProfileSetup() {
  const { user, createUserProfile, updateUserProfile } = useAuth();
  const { showToast } = useApp();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    branch: '', year: '', targetCompany: '', preferredLanguage: '', codingLevel: '',
  });

  const set = (field, val) => setProfile(p => ({ ...p, [field]: val }));

  const canNext = () => {
    if (step === 0) return profile.branch && profile.year;
    if (step === 1) return profile.targetCompany;
    if (step === 2) return profile.preferredLanguage && profile.codingLevel;
    return true;
  };

  const handleFinish = async () => {
    setLoading(true);
    try {
      await updateUserProfile({ ...profile, profileComplete: true });
      showToast('Profile set up! Let\'s ace your placement 🚀', 'success');
      navigate('/dashboard');
    } catch {
      showToast('Failed to save profile. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-bg">
        <div className="auth-blob auth-blob-1" />
        <div className="auth-blob auth-blob-2" />
      </div>

      <div className="profile-setup-wrapper">
        {/* Steps indicator */}
        <div className="profile-setup__steps">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={s.id} className={`profile-setup__step ${i === step ? 'active' : ''} ${i < step ? 'done' : ''}`}>
                <div className="profile-setup__step-icon"><Icon size={16} /></div>
                <span className="profile-setup__step-label hide-mobile">{s.title}</span>
                {i < steps.length - 1 && <div className="profile-setup__step-line" />}
              </div>
            );
          })}
        </div>

        <div className="auth-card profile-setup-card">
          {/* Step 0: Academic */}
          {step === 0 && (
            <div className="animate-fadeInUp">
              <div className="auth-card__header">
                <div className="profile-setup__emoji">🎓</div>
                <h2>Academic Details</h2>
                <p>Tell us about your academic background</p>
              </div>
              <div className="profile-setup__grid">
                <div className="input-group">
                  <label className="input-label">Branch / Department</label>
                  <div className="profile-setup__options">
                    {branches.map(b => (
                      <button key={b} type="button"
                        className={`chip ${profile.branch === b ? 'active' : ''}`}
                        onClick={() => set('branch', b)}>
                        {b}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="input-group">
                  <label className="input-label">Year of Study</label>
                  <div className="profile-setup__options">
                    {years.map(y => (
                      <button key={y} type="button"
                        className={`chip ${profile.year === y ? 'active' : ''}`}
                        onClick={() => set('year', y)}>
                        {y}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 1: Goal */}
          {step === 1 && (
            <div className="animate-fadeInUp">
              <div className="auth-card__header">
                <div className="profile-setup__emoji">🎯</div>
                <h2>Your Target Company</h2>
                <p>Which company are you aiming for?</p>
              </div>
              <div className="profile-setup__options" style={{ justifyContent: 'center' }}>
                {companies.map(c => (
                  <button key={c} type="button"
                    className={`chip ${profile.targetCompany === c ? 'active' : ''}`}
                    onClick={() => set('targetCompany', c)}>
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Coding */}
          {step === 2 && (
            <div className="animate-fadeInUp">
              <div className="auth-card__header">
                <div className="profile-setup__emoji">💻</div>
                <h2>Coding Background</h2>
                <p>Help us personalize your practice</p>
              </div>
              <div className="input-group mb-6">
                <label className="input-label">Preferred Programming Language</label>
                <div className="profile-setup__options">
                  {languages.map(l => (
                    <button key={l} type="button"
                      className={`chip ${profile.preferredLanguage === l ? 'active' : ''}`}
                      onClick={() => set('preferredLanguage', l)}>
                      {l}
                    </button>
                  ))}
                </div>
              </div>
              <div className="input-group">
                <label className="input-label">Coding Level</label>
                <div className="profile-setup__options">
                  {levels.map(l => (
                    <button key={l} type="button"
                      className={`chip ${profile.codingLevel === l ? 'active' : ''}`}
                      onClick={() => set('codingLevel', l)}>
                      {l}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="profile-setup__nav">
            {step > 0 && (
              <button className="btn btn-ghost" onClick={() => setStep(s => s - 1)}>
                <ArrowLeft size={16} /> Back
              </button>
            )}
            <div style={{ flex: 1 }} />
            {step < steps.length - 1 ? (
              <button className="btn btn-primary" onClick={() => setStep(s => s + 1)} disabled={!canNext()}>
                Next <ArrowRight size={16} />
              </button>
            ) : (
              <button className={`btn btn-primary ${loading ? 'btn-loading' : ''}`}
                onClick={handleFinish} disabled={!canNext() || loading}>
                {!loading && <><span>Let's Go! 🚀</span></>}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
