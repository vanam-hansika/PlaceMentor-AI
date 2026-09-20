// ============================================
// PlaceMentor AI — Signup Page
// ============================================
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import './Auth.css';

export default function Signup() {
  const { signup, loginWithGoogle, createUserProfile } = useAuth();
  const { showToast } = useApp();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Invalid email';
    if (!form.password) errs.password = 'Password is required';
    else if (form.password.length < 6) errs.password = 'Minimum 6 characters';
    if (form.password !== form.confirm) errs.confirm = 'Passwords do not match';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    try {
      const user = await signup(form.email, form.password, form.name);
      await createUserProfile(user.uid, {
        displayName: form.name,
        email: form.email,
        photoURL: null,
        profileComplete: false,
      });
      showToast('Account created! Let\'s set up your profile 🎉', 'success');
      navigate('/profile-setup');
    } catch (err) {
      const msg = err.code === 'auth/email-already-in-use'
        ? 'This email is already registered'
        : 'Signup failed. Please try again.';
      setErrors({ general: msg });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setGoogleLoading(true);
    try {
      const { isNew } = await loginWithGoogle();
      navigate(isNew ? '/profile-setup' : '/dashboard');
    } catch {
      setErrors({ general: 'Google sign-in failed.' });
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleChange = (field) => (e) => {
    setForm(p => ({ ...p, [field]: e.target.value }));
    if (errors[field]) setErrors(p => ({ ...p, [field]: '' }));
  };

  return (
    <div className="auth-page">
      <div className="auth-bg">
        <div className="auth-blob auth-blob-1" />
        <div className="auth-blob auth-blob-2" />
      </div>

      <div className="auth-container">
        <div className="auth-brand">
          <div className="auth-brand__logo">
            <img src="/logo.png" alt="PlaceMentor AI Logo" className="auth-brand__logo-img" />
            <h1>PlaceMentor AI</h1>
          </div>
          <h2 className="auth-brand__headline">Start your placement journey today 🎯</h2>
          <p className="auth-brand__sub">
            Join thousands of students who cracked placements at top companies with PlaceMentor AI.
          </p>
          <div className="auth-brand__features">
            {['📊 Track your placement readiness', '🤖 Get AI-powered study plans', '🎤 Practice with mock interviews', '🏆 Earn badges and achievements'].map(f => (
              <div key={f} className="auth-brand__feature">{f}</div>
            ))}
          </div>
        </div>

        <div className="auth-card">
          <div className="auth-card__header">
            <h2>Create account</h2>
            <p>Join PlaceMentor AI for free</p>
          </div>

          {errors.general && <div className="auth-error">{errors.general}</div>}

          <button
            className={`btn btn-full auth-google-btn ${googleLoading ? 'btn-loading' : ''}`}
            onClick={handleGoogle}
            disabled={googleLoading}
          >
            {!googleLoading && (
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            )}
            {googleLoading ? 'Creating account...' : 'Continue with Google'}
          </button>

          <div className="divider">or sign up with email</div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="input-group">
              <label className="input-label">Full Name</label>
              <div className="input-with-icon">
                <User size={16} className="input-icon" />
                <input className={`input ${errors.name ? 'input-error' : ''}`}
                  placeholder="Your full name" value={form.name}
                  onChange={handleChange('name')} />
              </div>
              {errors.name && <span className="auth-field-error">{errors.name}</span>}
            </div>

            <div className="input-group">
              <label className="input-label">Email address</label>
              <div className="input-with-icon">
                <Mail size={16} className="input-icon" />
                <input type="email" className={`input ${errors.email ? 'input-error' : ''}`}
                  placeholder="you@example.com" value={form.email}
                  onChange={handleChange('email')} />
              </div>
              {errors.email && <span className="auth-field-error">{errors.email}</span>}
            </div>

            <div className="input-group">
              <label className="input-label">Password</label>
              <div className="input-with-icon">
                <Lock size={16} className="input-icon" />
                <input type={showPass ? 'text' : 'password'}
                  className={`input ${errors.password ? 'input-error' : ''}`}
                  placeholder="Min. 6 characters" value={form.password}
                  onChange={handleChange('password')} style={{ paddingRight: '42px' }} />
                <button type="button" className="auth-eye-btn" onClick={() => setShowPass(!showPass)} tabIndex={-1}>
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <span className="auth-field-error">{errors.password}</span>}
            </div>

            <div className="input-group">
              <label className="input-label">Confirm Password</label>
              <div className="input-with-icon">
                <Lock size={16} className="input-icon" />
                <input type={showPass ? 'text' : 'password'}
                  className={`input ${errors.confirm ? 'input-error' : ''}`}
                  placeholder="Repeat password" value={form.confirm}
                  onChange={handleChange('confirm')} />
              </div>
              {errors.confirm && <span className="auth-field-error">{errors.confirm}</span>}
            </div>

            <button type="submit" className={`btn btn-primary btn-full btn-lg ${loading ? 'btn-loading' : ''}`} disabled={loading}>
              {!loading && <><span>Create Account</span><ArrowRight size={18} /></>}
            </button>
          </form>

          <p className="auth-footer">
            Already have an account? <Link to="/login" className="auth-link">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
