// ============================================
// PlaceMentor AI — Bottom Navigation (Mobile)
// ============================================
import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Code2, Brain, Video, Trophy } from 'lucide-react';
import './BottomNav.css';

const navItems = [
  { icon: LayoutDashboard, label: 'Home', path: '/dashboard' },
  { icon: Code2, label: 'Coding', path: '/coding' },
  { icon: Brain, label: 'Mentor', path: '/mentor' },
  { icon: Video, label: 'Interview', path: '/interview' },
  { icon: Trophy, label: 'Progress', path: '/achievements' },
];

export default function BottomNav() {
  return (
    <nav className="bottom-nav" aria-label="Mobile navigation">
      {navItems.map(({ icon: Icon, label, path }) => (
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
    </nav>
  );
}
