// ============================================
// PlaceMentor AI — Sidebar Component with Official Logo & Admin Portal Link
// ============================================
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Brain, BookOpen, Code2, Video,
  Building2, FileText, BarChart3, Trophy, Users,
  Settings, LogOut, ChevronLeft, ChevronRight,
  Flame, Zap, Briefcase, Compass, FileCheck, Shield
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import './Sidebar.css';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Brain, label: 'AI Mentor', path: '/mentor' },
  { icon: Code2, label: 'Coding Practice', path: '/coding' },
  { icon: Video, label: 'AI Interview', path: '/interview' },
  { icon: BookOpen, label: 'Aptitude', path: '/aptitude' },
  { icon: Building2, label: 'Target Companies', path: '/companies' },
  { icon: Briefcase, label: 'Jobs & Internships', path: '/jobs' },
  { icon: Compass, label: 'Career AI', path: '/career' },
  { icon: FileCheck, label: 'AI Resume Builder', path: '/resume' },
  { icon: BarChart3, label: 'Progress', path: '/progress' },
  { icon: Trophy, label: 'Achievements', path: '/achievements' },
  { icon: Users, label: 'Friends & Leaderboard', path: '/friends' },
  { icon: FileText, label: 'Resources', path: '/resources' },
  { icon: Shield, label: 'Admin Portal 🛠️', path: '/admin' },
];

export default function Sidebar() {
  const { sidebarCollapsed, toggleSidebar } = useApp();
  const { user, userProfile, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <aside className={`sidebar ${sidebarCollapsed ? 'sidebar--collapsed' : ''}`}>
      {/* Logo */}
      <div className="sidebar__logo">
        <img src="/logo.png" alt="PlaceMentor AI Logo" className="sidebar__brand-logo" />
        {!sidebarCollapsed && (
          <span className="sidebar__logo-text">PlaceMentor AI</span>
        )}
        <button className="sidebar__toggle" onClick={toggleSidebar} aria-label="Toggle sidebar">
          {sidebarCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* User mini profile */}
      {!sidebarCollapsed && (
        <div className="sidebar__user">
          <div className="sidebar__user-avatar">
            {user?.photoURL
              ? <img src={user.photoURL} alt={user.displayName} className="avatar avatar-md" />
              : <div className="avatar-placeholder">{user?.displayName?.[0] || 'U'}</div>
            }
          </div>
          <div className="sidebar__user-info">
            <p className="sidebar__user-name">{user?.displayName || 'Student'}</p>
            <p className="sidebar__user-role">{userProfile?.targetCompany || 'Placement Aspirant'}</p>
          </div>
        </div>
      )}

      {/* Streak badge */}
      {!sidebarCollapsed && (
        <div className="sidebar__streak">
          <div className="streak-badge">
            <span className="streak-flame">🔥</span>
            <span className="streak-count">{userProfile?.streak || 0} day streak</span>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="sidebar__nav">
        {navItems.map(({ icon: Icon, label, path }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `sidebar__nav-item ${isActive ? 'sidebar__nav-item--active' : ''}`
            }
          >
            <div className="sidebar__nav-icon">
              <Icon size={18} />
            </div>
            {!sidebarCollapsed && (
              <span className="sidebar__nav-label">{label}</span>
            )}
            {sidebarCollapsed && (
              <span className="sidebar__tooltip">{label}</span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom actions */}
      <div className="sidebar__bottom">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `sidebar__nav-item ${isActive ? 'sidebar__nav-item--active' : ''}`
          }
        >
          <div className="sidebar__nav-icon"><Settings size={18} /></div>
          {!sidebarCollapsed && <span className="sidebar__nav-label">Settings</span>}
          {sidebarCollapsed && <span className="sidebar__tooltip">Settings</span>}
        </NavLink>

        <button className="sidebar__nav-item sidebar__logout" onClick={handleLogout}>
          <div className="sidebar__nav-icon"><LogOut size={18} /></div>
          {!sidebarCollapsed && <span className="sidebar__nav-label">Logout</span>}
          {sidebarCollapsed && <span className="sidebar__tooltip">Logout</span>}
        </button>
      </div>
    </aside>
  );
}
