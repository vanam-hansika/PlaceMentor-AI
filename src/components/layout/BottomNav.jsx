// ============================================
// PlaceMentor AI — Bottom Navigation (Mobile)
// High-priority quick access + "More" menu drawer trigger
// ============================================
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, Code2, Brain, Video, Menu } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import './BottomNav.css';

const primaryTabs = [
  { icon: LayoutDashboard, label: 'Home', path: '/dashboard' },
  { icon: Code2, label: 'Coding', path: '/coding' },
  { icon: Brain, label: 'Mentor', path: '/mentor' },
  { icon: Video, label: 'Interview', path: '/interview' },
];

export default function BottomNav() {
  const { mobileNavOpen, toggleMobileNav } = useApp();
  const location = useLocation();

  // If the user is on any secondary route, the "More" item is highlighted
  const primaryPaths = ['/dashboard', '/coding', '/mentor', '/interview'];
  const isMoreActive = mobileNavOpen || !primaryPaths.includes(location.pathname);

  return (
    <nav className="bottom-nav" aria-label="Mobile navigation">
      {primaryTabs.map(({ icon: Icon, label, path }) => (
        <NavLink
          key={path}
          to={path}
          className={({ isActive }) =>
            `bottom-nav__item ${isActive ? 'bottom-nav__item--active' : ''}`
          }
        >
          {({ isActive }) => (
            <>
              <div className={`bottom-nav__icon ${isActive ? 'bottom-nav__icon--active' : ''}`}>
                <Icon size={22} />
              </div>
              <span className="bottom-nav__label">{label}</span>
              {isActive && <div className="bottom-nav__indicator" />}
            </>
          )}
        </NavLink>
      ))}

      {/* 5th item: More Menu Drawer Trigger */}
      <button
        type="button"
        className={`bottom-nav__item bottom-nav__item--btn ${isMoreActive ? 'bottom-nav__item--active' : ''}`}
        onClick={toggleMobileNav}
        aria-label="More navigation items"
        aria-expanded={mobileNavOpen}
      >
        <div className={`bottom-nav__icon ${isMoreActive ? 'bottom-nav__icon--active' : ''}`}>
          <Menu size={22} />
        </div>
        <span className="bottom-nav__label">More</span>
        {isMoreActive && <div className="bottom-nav__indicator" />}
      </button>
    </nav>
  );
}
