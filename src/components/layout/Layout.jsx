// ============================================
// PlaceMentor AI — Layout Component
// Responsive: Sidebar (desktop) + Bottom Nav (mobile)
// ============================================
import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';
import TopBar from './TopBar';
import MobileNavDrawer from './MobileNavDrawer';
import NekoCat from '../NekoCat';
import ToastContainer from '../ui/ToastContainer';
import { useApp } from '../../context/AppContext';
import './Layout.css';

export default function Layout() {
  const { sidebarCollapsed } = useApp();
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <div className={`layout ${sidebarCollapsed ? 'layout--collapsed' : ''}`}>
      {/* Desktop/Tablet Sidebar */}
      <Sidebar />

      {/* Mobile Navigation Drawer (All Features Access) */}
      <MobileNavDrawer />

      {/* Main content area */}
      <div className="layout__main">
        <TopBar />
        <main className="layout__content">
          <Outlet />
        </main>
      </div>

      {/* Mobile Bottom Nav */}
      <BottomNav />

      {/* Neko Cat - always visible */}
      <NekoCat />

      {/* Toast notifications */}
      <ToastContainer />
    </div>
  );
}
