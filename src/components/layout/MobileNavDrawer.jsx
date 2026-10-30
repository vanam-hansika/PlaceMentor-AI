// ============================================
// PlaceMentor AI — Mobile Navigation Drawer
// Full-featured mobile navigation drawer ensuring 100% of app features
// are accessible on Android, PWA, and mobile viewports (< 768px).
// ============================================
import React, { useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Brain, BookOpen, Code2, Video,
  Building2, FileText, BarChart3, Trophy, Users,
  Settings, LogOut, Moon, Sun, X, Shield,
  Briefcase, Compass, FileCheck, Map, ChevronRight, Sparkles, Flame
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import './MobileNavDrawer.css';

// Grouped routes matching App.jsx
const navSections = [
  {
    title: 'Core Practice',
    items: [
      { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
      { icon: Brain, label: 'AI Mentor', path: '/mentor', badge: 'AI' },
      { icon: Code2, label: 'Coding Practice', path: '/coding' },
      { icon: Video, label: 'AI Interview', path: '/interview', badge: 'Live' },
      { icon: BookOpen, label: 'Aptitude Practice', path: '/aptitude' },
    ]
  },
  {
    title: 'Career & Placements',
    items: [
      { icon: Building2, label: 'Target Companies', path: '/companies' },
      { icon: Briefcase, label: 'Jobs & Internships', path: '/jobs', badge: 'Hot' },
      { icon: Map, label: 'Career Roadmaps 🗺️', path: '/roadmaps' },
      { icon: Compass, label: 'Career AI Advisor', path: '/career' },
      { icon: FileCheck, label: 'AI Resume Builder', path: '/resume' },
      { icon: FileText, label: 'Study Resources', path: '/resources' },
    ]
  },
  {
    title: 'Analytics & Social',
    items: [
      { icon: BarChart3, label: 'Progress Analytics', path: '/progress' },
      { icon: Trophy, label: 'Achievements & Medals', path: '/achievements' },
      { icon: Users, label: 'Friends & Leaderboard', path: '/friends' },
    ]
  },
  {
    title: 'Account & System',
    items: [
      { icon: Settings, label: 'Settings & Profile', path: '/settings' },
    ]
  }
];

export default function MobileNavDrawer() {
  const { mobileNavOpen, closeMobileNav, theme, toggleTheme } = useApp();
  const { user, userProfile, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Role guard: Only verified administrators can access the Admin Portal
  const isAdmin =
    userProfile?.role === 'admin' ||
    userProfile?.isAdmin === true ||
    sessionStorage.getItem('pm_admin_session_auth') === 'verified';

  // Close drawer on ESC key and freeze background scrolling when open
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileNavOpen) {
        closeMobileNav();
      }
    };

    if (mobileNavOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileNavOpen, closeMobileNav]);

  // Close drawer automatically when route changes
  useEffect(() => {
    if (mobileNavOpen) {
      closeMobileNav();
    }
  }, [location.pathname]);

  const handleLogout = async () => {
    closeMobileNav();
    await logout();
    navigate('/login');
  };

  const handleItemClick = () => {
    closeMobileNav();
  };

  if (!mobileNavOpen) return null;

  return (
    <div className="mobile-drawer-wrapper" role="dialog" aria-modal="true" aria-label="Mobile Navigation Menu">
      {/* Backdrop overlay */}
      <div
        className="mobile-drawer__backdrop animate-fadeIn"
        onClick={closeMobileNav}
        aria-hidden="true"
      />

      {/* Slide-out Drawer Panel */}
      <aside className="mobile-drawer__panel animate-slideInLeft">
        {/* Header */}
        <div className="mobile-drawer__header">
          <div className="mobile-drawer__brand">
            <img src="/logo.png" alt="PlaceMentor AI" className="mobile-drawer__logo-img" />
            <div className="mobile-drawer__brand-info">
              <span className="mobile-drawer__brand-title">PlaceMentor AI</span>
              <span className="mobile-drawer__brand-tag">PWA Mobile v2.0</span>
            </div>
          </div>
          <button
            className="mobile-drawer__close-btn"
            onClick={closeMobileNav}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* User profile summary */}
        <div className="mobile-drawer__user-card">
          <div className="mobile-drawer__user-avatar">
            {user?.photoURL ? (
              <img src={user.photoURL} alt={user.displayName || 'User'} className="avatar avatar-md" />
            ) : (
              <div className="avatar-placeholder">{user?.displayName?.[0] || 'U'}</div>
            )}
          </div>
          <div className="mobile-drawer__user-details">
            <p className="mobile-drawer__user-name">{user?.displayName || 'Student'}</p>
            <p className="mobile-drawer__user-role">{userProfile?.targetCompany ? `Target: ${userProfile.targetCompany}` : 'Placement Aspirant'}</p>
            <div className="mobile-drawer__user-badges">
              <span className="badge badge-accent streak-pill">
                <Flame size={12} className="text-warning" />
                <span>{userProfile?.streak || 0}d streak</span>
              </span>
              <span className="badge badge-primary readiness-pill">
                <Sparkles size={11} />
                <span>{userProfile?.placementReadiness || 0}% Ready</span>
              </span>
            </div>
          </div>
        </div>

        {/* Grouped Navigation Links */}
        <div className="mobile-drawer__nav-scroll">
          {navSections.map((section) => (
            <div key={section.title} className="mobile-drawer__section">
              <span className="mobile-drawer__section-title">{section.title}</span>
              <div className="mobile-drawer__section-items">
                {section.items.map(({ icon: Icon, label, path, badge }) => (
                  <NavLink
                    key={path}
                    to={path}
                    onClick={handleItemClick}
                    className={({ isActive }) =>
                      `mobile-drawer__link ${isActive ? 'mobile-drawer__link--active' : ''}`
                    }
                  >
                    <div className="mobile-drawer__link-left">
                      <div className="mobile-drawer__link-icon">
                        <Icon size={18} />
                      </div>
                      <span className="mobile-drawer__link-label">{label}</span>
                    </div>
                    <div className="mobile-drawer__link-right">
                      {badge && (
                        <span className={`badge ${badge === 'Hot' ? 'badge-danger' : badge === 'Live' ? 'badge-accent' : 'badge-primary'}`}>
                          {badge}
                        </span>
                      )}
                      <ChevronRight size={14} className="mobile-drawer__chevron" />
                    </div>
                  </NavLink>
                ))}
              </div>
            </div>
          ))}

          {/* Admin Portal (Authorized only) */}
          {isAdmin && (
            <div className="mobile-drawer__section">
              <span className="mobile-drawer__section-title">Administration</span>
              <div className="mobile-drawer__section-items">
                <NavLink
                  to="/admin"
                  onClick={handleItemClick}
                  className={({ isActive }) =>
                    `mobile-drawer__link mobile-drawer__link--admin ${isActive ? 'mobile-drawer__link--active' : ''}`
                  }
                >
                  <div className="mobile-drawer__link-left">
                    <div className="mobile-drawer__link-icon admin-icon">
                      <Shield size={18} />
                    </div>
                    <span className="mobile-drawer__link-label font-bold">Admin Portal 🛠️</span>
                  </div>
                  <div className="mobile-drawer__link-right">
                    <span className="badge badge-danger">Admin</span>
                    <ChevronRight size={14} className="mobile-drawer__chevron" />
                  </div>
                </NavLink>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Actions Footer */}
        <div className="mobile-drawer__footer">
          <button
            type="button"
            className="mobile-drawer__footer-btn"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
            <span>{theme === 'dark' ? 'Light Theme' : 'Dark Theme'}</span>
          </button>

          <button
            type="button"
            className="mobile-drawer__footer-btn mobile-drawer__footer-btn--logout"
            onClick={handleLogout}
            aria-label="Logout"
          >
            <LogOut size={17} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </div>
  );
}
