// ============================================
// PlaceMentor AI — TopBar Component
// ============================================
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Bell, Search, Moon, Sun, User, Settings, LogOut, ChevronDown } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import './TopBar.css';

const pageLabels = {
  '/dashboard': 'Dashboard',
  '/mentor': 'AI Placement Mentor',
  '/aptitude': 'Aptitude Practice',
  '/coding': 'Coding Practice & Monaco Editor',
  '/interview': 'AI Face-to-Face Interview',
  '/companies': 'Target Company Roadmap',
  '/jobs': 'Jobs & Internships',
  '/career': 'AI Career Recommendation',
  '/resume': 'AI Resume Builder',
  '/resources': 'Study Resources',
  '/progress': 'Progress Analytics',
  '/achievements': 'Achievements & Medals',
  '/friends': 'Friends & Leaderboard',
  '/settings': 'Settings',
  '/profile': 'Profile Settings',
};

export default function TopBar() {
  const { theme, toggleTheme, notifications } = useApp();
  const { user, userProfile, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const menuRef = useRef(null);

  const pageTitle = pageLabels[location.pathname] || 'PlaceMentor AI';
  const unreadCount = notifications.filter(n => !n.read).length;

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowUserMenu(false);
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header className="topbar">
      {/* Page title */}
      <div className="topbar__left">
        <h1 className="topbar__title">{pageTitle}</h1>
      </div>

      {/* Actions */}
      <div className="topbar__right" ref={menuRef}>
        {/* Theme toggle */}
        <button
          className="topbar__action-btn"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Notifications */}
        <div className="topbar__dropdown-wrapper">
          <button
            className="topbar__action-btn topbar__notif-btn"
            onClick={() => { setShowNotifications(!showNotifications); setShowUserMenu(false); }}
            aria-label="Notifications"
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="topbar__badge">{unreadCount > 9 ? '9+' : unreadCount}</span>
            )}
          </button>

          {showNotifications && (
            <div className="topbar__dropdown topbar__notif-panel">
              <div className="topbar__dropdown-header">
                <span>Notifications</span>
                <span className="text-xs text-muted">{unreadCount} new</span>
              </div>
              {notifications.length === 0 ? (
                <div className="topbar__empty-notif">
                  <Bell size={24} />
                  <p>No notifications yet</p>
                </div>
              ) : (
                notifications.slice(0, 5).map((n, i) => (
                  <div
                    key={i}
                    className={`topbar__notif-item ${!n.read ? 'unread' : ''}`}
                    onClick={() => {
                      if (n.url) navigate(n.url);
                      setShowNotifications(false);
                    }}
                    style={{ cursor: n.url ? 'pointer' : 'default' }}
                  >
                    <span className="topbar__notif-dot" />
                    <div>
                      <p className="topbar__notif-title">{n.title}</p>
                      <p className="text-xs text-muted">{n.time}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* User menu */}
        <div className="topbar__dropdown-wrapper">
          <button
            className="topbar__user-btn"
            onClick={() => { setShowUserMenu(!showUserMenu); setShowNotifications(false); }}
          >
            {user?.photoURL
              ? <img src={user.photoURL} alt="" className="avatar avatar-sm" />
              : <div className="topbar__avatar-placeholder">{user?.displayName?.[0] || 'U'}</div>
            }
            <span className="topbar__username hide-mobile">{user?.displayName?.split(' ')[0] || 'User'}</span>
            <ChevronDown size={14} className="hide-mobile" />
          </button>

          {showUserMenu && (
            <div className="topbar__dropdown topbar__user-menu">
              <div className="topbar__dropdown-header">
                <strong>{user?.displayName}</strong>
                <span className="text-xs text-muted">{user?.email}</span>
              </div>
              <button className="topbar__menu-item" onClick={() => { navigate('/profile'); setShowUserMenu(false); }}>
                <User size={15} /> Profile
              </button>
              <button className="topbar__menu-item" onClick={() => { navigate('/settings'); setShowUserMenu(false); }}>
                <Settings size={15} /> Settings
              </button>
              <div className="topbar__menu-divider" />
              <button className="topbar__menu-item topbar__menu-item--danger" onClick={handleLogout}>
                <LogOut size={15} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
