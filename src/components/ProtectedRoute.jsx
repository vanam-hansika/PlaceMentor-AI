// ============================================
// PlaceMentor AI — Protected Route Component
// ============================================
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute() {
  const { user, userProfile, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)' }}>
        <div style={{ textAlign: 'center' }}>
          <div className="animate-spin" style={{ width: 40, height: 40, border: '4px solid var(--border)', borderTopColor: 'var(--primary)', borderRadius: '50%', margin: '0 auto 16px' }} />
          <p className="text-muted text-sm">Loading PlaceMentor AI...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Redirect to profile setup if not completed
  if (userProfile && !userProfile.profileComplete && window.location.pathname !== '/profile-setup') {
    return <Navigate to="/profile-setup" replace />;
  }

  return <Outlet />;
}
