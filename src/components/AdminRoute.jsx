// ============================================
// PlaceMentor AI — Admin Route Protection Guard
// Ensures ONLY authorized Administrators access /admin
// Authenticates via Firestore role (role === 'admin') or Master Admin Security Passcode
// ============================================
import React, { useState } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { Shield, Lock, ArrowLeft, KeyRound, AlertTriangle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

// Master Admin Security Passcode (can be set via environment variable or default secure key)
const MASTER_ADMIN_PASSCODE = import.meta.env.VITE_ADMIN_PASSCODE || 'admin@placementor2026';

export default function AdminRoute() {
  const { user, userProfile, loading } = useAuth();
  const navigate = useNavigate();
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');
  const [sessionAuth, setSessionAuth] = useState(
    sessionStorage.getItem('pm_admin_session_auth') === 'verified'
  );

  // Clean up legacy insecure bypass key if present
  if (localStorage.getItem('pm_admin_mode')) {
    localStorage.removeItem('pm_admin_mode');
  }

  if (loading) {
    return (
      <div className="card text-center p-12 animate-fadeIn" style={{ maxWidth: 400, margin: '60px auto' }}>
        <div className="animate-spin" style={{ width: 36, height: 36, border: '3px solid var(--border)', borderTopColor: 'var(--primary)', borderRadius: '50%', margin: '0 auto 16px' }} />
        <h4 className="text-base font-bold text-primary" style={{ margin: 0 }}>Verifying Administrator Credentials...</h4>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Check if authenticated as admin via Firestore role or current session passcode
  const isFirestoreAdmin = userProfile?.role === 'admin' || userProfile?.isAdmin === true;
  const isAuthorized = isFirestoreAdmin || sessionAuth;

  const handleVerifyPasscode = (e) => {
    e.preventDefault();
    if (passcode.trim() === MASTER_ADMIN_PASSCODE) {
      sessionStorage.setItem('pm_admin_session_auth', 'verified');
      setSessionAuth(true);
      setError('');
    } else {
      setError('Invalid Admin Security Passcode. Access denied.');
      setPasscode('');
    }
  };

  // If not authorized, show strict Admin Authentication Screen
  if (!isAuthorized) {
    return (
      <div className="flex items-center justify-center p-4" style={{ minHeight: '75vh' }}>
        <div className="card text-center p-8 animate-scaleIn" style={{ maxWidth: 460, width: '100%', boxShadow: '0 20px 40px rgba(0, 0, 0, 0.25)' }}>
          <div className="icon-box icon-box-primary mx-auto mb-4" style={{ width: 56, height: 56, margin: '0 auto 16px' }}>
            <Lock size={26} className="text-primary" />
          </div>

          <h2 className="text-xl font-bold mb-1">Administrator Authentication</h2>
          <p className="text-xs text-secondary-color mb-5">
            This portal is restricted to authorized PlaceMentor AI administrators. Unauthorized access is strictly prohibited.
          </p>

          {error && (
            <div className="quiz-explanation-box mb-4 text-xs text-danger flex items-center gap-2 justify-center" style={{ borderLeft: '3px solid var(--danger)' }}>
              <AlertTriangle size={15} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleVerifyPasscode} className="flex flex-col gap-3 text-left">
            <div className="input-group">
              <label className="input-label flex items-center gap-1">
                <KeyRound size={13} /> Admin Security Passcode
              </label>
              <input
                type="password"
                className="input text-xs"
                placeholder="Enter administrator passcode..."
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                autoFocus
                required
              />
            </div>

            <button type="submit" className="btn btn-primary btn-sm btn-full mt-2">
              <Shield size={14} /> Verify & Enter Admin Portal
            </button>
          </form>

          <div className="mt-4 pt-3 border-t">
            <button
              className="btn btn-ghost btn-xs text-muted flex items-center justify-center gap-1 mx-auto"
              onClick={() => navigate('/dashboard')}
            >
              <ArrowLeft size={13} /> Return to Student Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <Outlet />;
}
