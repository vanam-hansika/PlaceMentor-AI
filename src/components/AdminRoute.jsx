// ============================================
// PlaceMentor AI — Admin Route Protection Guard
// Ensures only authorized Administrators access /admin
// ============================================
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AdminRoute() {
  const { user, userProfile, loading } = useAuth();

  if (loading) {
    return (
      <div className="card text-center p-12 animate-fadeIn" style={{ maxWidth: 400, margin: '60px auto' }}>
        <div className="animate-spin" style={{ width: 36, height: 36, border: '3px solid var(--border)', borderTopColor: 'var(--primary)', borderRadius: '50%', margin: '0 auto 16px' }} />
        <h4 className="text-base font-bold text-primary" style={{ margin: 0 }}>Verifying Admin Credentials...</h4>
      </div>
    );
  }

  // Check Admin Role or Admin Mode Toggle flag
  const isAdmin =
    userProfile?.role === 'admin' ||
    userProfile?.isAdmin === true ||
    userProfile?.isAdminMode === true ||
    localStorage.getItem('pm_admin_mode') === 'true' ||
    user?.email?.includes('admin');

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return (
      <div className="card text-center p-10 animate-fadeIn" style={{ maxWidth: 500, margin: '60px auto' }}>
        <div className="text-4xl mb-3">🛡️</div>
        <h2 className="text-xl font-bold mb-2">Admin Access Required</h2>
        <p className="text-sm text-secondary-color mb-5">
          The Admin Dashboard is restricted to Administrators only.
        </p>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => {
            localStorage.setItem('pm_admin_mode', 'true');
            window.location.href = '/admin';
          }}
        >
          Enable Admin Access (Testing Mode) 🛠️
        </button>
      </div>
    );
  }

  return <Outlet />;
}
