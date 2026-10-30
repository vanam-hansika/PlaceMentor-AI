// ============================================
// PlaceMentor AI — Login Page
// ============================================
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import './Auth.css';

export default function Login() {
  const { login, loginWithGoogle, authError, setAuthError } = useAuth();
  const { showToast } = useApp();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!form.email) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Invalid email address';
    if (!form.password) errs.password = 'Password is required';
    else if (form.password.length < 6) errs.password = 'Minimum 6 characters';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAuthError(null);
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    try {
      await login(form.email, form.password);
      showToast('Welcome back! 🎉', 'success');
      navigate('/dashboard');
    } catch (err) {
      const msg = err.code === 'auth/invalid-credential'
        ? 'Invalid email or password'
        : 'Login failed. Please try again.';
      setErrors({ general: msg });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setGoogleLoading(true);
    setErrors(prev => ({ ...prev, general: '' }));
    try {
      const result = await loginWithGoogle();
      if (result?.isRedirecting) {
        return; // Mobile redirect in progress
      }
      if (result?.isNew) navigate('/profile-setup');
      else navigate('/dashboard');
    } catch (err) {
      console.error('[Google Sign-In Error]', err);
      let errorMsg = 'Google sign-in failed. Please try again.';

      if (err.code === 'auth/unauthorized-domain') {
        const host = window.location.hostname;
        errorMsg = `Domain "${host}" is not authorized in Firebase. Please add "${host}" to Firebase Console → Authentication → Settings → Authorized domains.`;
      } else if (err.code === 'auth/popup-blocked') {
        errorMsg = 'Sign-in popup was blocked by your browser. Please allow popups or retry.';
      } else if (err.code === 'auth/popup-closed-by-user') {
        errorMsg = 'Google sign-in window was closed before completion.';
      } else if (err.code === 'auth/cancelled-popup-request') {
        errorMsg = 'A sign-in window is already open.';
      } else if (err.code === 'auth/network-request-failed') {
        errorMsg = 'Network error. Please check your internet connection.';
      } else if (err.code === 'auth/operation-not-allowed') {
        errorMsg = 'Google provider is not enabled in Firebase Console → Authentication → Sign-in method.';
      }

      setErrors(prev => ({ ...prev, general: errorMsg }));
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleChange = (field) => (e) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  return (
    <div className="auth-page">
      {/* Decorative background */}
      <div className="auth-bg">
        <div className="auth-blob auth-blob-1" />
        <div className="auth-blob auth-blob-2" />
        <div className="auth-blob auth-blob-3" />
      </div>

      <div className="auth-container">
        {/* Left panel - branding */}
        <div className="auth-brand">
          <div className="auth-brand__logo">
            <img src="/logo.png" alt="PlaceMentor AI Logo" className="auth-brand__logo-img" />
            <h1>PlaceMentor AI</h1>
          </div>
          <h2 className="auth-brand__headline">
            Your AI-powered<br />placement companion 🚀
          </h2>
          <p className="auth-brand__sub">
            Ace coding interviews, crack aptitude tests, and land your dream job with personalized AI guidance.
          </p>
          <div className="auth-brand__features">
            {['🤖 AI Placement Mentor', '💻 Real Coding Practice', '🎤 Live Interview Simulation', '🏆 Company-Specific Prep'].map(f => (
              <div key={f} className="auth-brand__feature">{f}</div>
            ))}
          </div>
        </div>

        {/* Right panel - form */}
        <div className="auth-card">
          <div className="auth-card__header">
            <h2>Welcome back</h2>
            <p>Sign in to continue your placement journey</p>
          </div>

          {errors.general && (
            <div className="auth-error">{errors.general}</div>
          )}

          {/* Google Sign-In */}
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
            {googleLoading ? 'Signing in...' : 'Continue with Google'}
          </button>

          <div className="divider">or sign in with email</div>

          <form onSubmit={handleSubmit} className="auth-form">
            {/* Email */}
            <div className="input-group">
              <label className="input-label" htmlFor="email">Email address</label>
              <div className="input-with-icon">
                <Mail size={16} className="input-icon" />
                <input
                  id="email"
                  type="email"
                  className={`input ${errors.email ? 'input-error' : ''}`}
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange('email')}
                  autoComplete="email"
                />
              </div>
              {errors.email && <span className="auth-field-error">{errors.email}</span>}
            </div>

            {/* Password */}
            <div className="input-group">
              <div className="auth-label-row">
                <label className="input-label" htmlFor="password">Password</label>
                <Link to="/forgot-password" className="auth-forgot">Forgot password?</Link>
              </div>
              <div className="input-with-icon">
                <Lock size={16} className="input-icon" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  className={`input ${errors.password ? 'input-error' : ''}`}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange('password')}
                  autoComplete="current-password"
                  style={{ paddingRight: '42px' }}
                />
                <button
                  type="button"
                  className="auth-eye-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <span className="auth-field-error">{errors.password}</span>}
            </div>

            <button
              type="submit"
              className={`btn btn-primary btn-full btn-lg ${loading ? 'btn-loading' : ''}`}
              disabled={loading}
            >
              {!loading && <><span>Sign In</span><ArrowRight size={18} /></>}
            </button>
          </form>

          <p className="auth-footer">
            Don't have an account?{' '}
            <Link to="/signup" className="auth-link">Create account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
