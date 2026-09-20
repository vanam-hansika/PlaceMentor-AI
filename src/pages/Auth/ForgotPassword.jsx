// ============================================
// Forgot Password Page
// ============================================
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, Zap, CheckCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './Auth.css';

export default function ForgotPassword() {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) { setError('Please enter your email'); return; }
    setLoading(true);
    try {
      await resetPassword(email);
      setSent(true);
    } catch {
      setError('Failed to send reset email. Please check your email.');
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

      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 440 }}>
        <div className="auth-card">
          <Link to="/login" className="btn btn-ghost btn-sm" style={{ marginBottom: 'var(--space-4)', display: 'inline-flex' }}>
            <ArrowLeft size={16} /> Back to Login
          </Link>

          <div className="auth-card__header">
            <div style={{ fontSize: 48, marginBottom: 'var(--space-4)' }}>🔐</div>
            {!sent ? (
              <>
                <h2>Forgot Password?</h2>
                <p>Enter your email and we'll send you a reset link</p>
              </>
            ) : (
              <>
                <h2>Check your email</h2>
                <p>We've sent a password reset link to <strong>{email}</strong></p>
              </>
            )}
          </div>

          {sent ? (
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--secondary-alpha)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto var(--space-6)', animation: 'celebrationPop 0.5s ease' }}>
                <CheckCircle size={32} color="var(--secondary)" />
              </div>
              <p style={{ marginBottom: 'var(--space-6)', color: 'var(--text-secondary)' }}>
                Didn't receive the email? Check your spam folder or try again.
              </p>
              <button className="btn btn-outline btn-full" onClick={() => setSent(false)}>
                Try again
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="auth-form">
              {error && <div className="auth-error">{error}</div>}
              <div className="input-group">
                <label className="input-label">Email address</label>
                <div className="input-with-icon">
                  <Mail size={16} className="input-icon" />
                  <input type="email" className="input" placeholder="you@example.com"
                    value={email} onChange={e => { setEmail(e.target.value); setError(''); }} />
                </div>
              </div>
              <button type="submit" className={`btn btn-primary btn-full btn-lg ${loading ? 'btn-loading' : ''}`} disabled={loading}>
                {!loading && 'Send Reset Link'}
              </button>
            </form>
          )}

          <p className="auth-footer">
            Remembered your password? <Link to="/login" className="auth-link">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
