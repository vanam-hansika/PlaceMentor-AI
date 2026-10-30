// ============================================
// PlaceMentor AI — App Router
// Code-split & Lazy-loaded routes for instant initial application loading
// ============================================
import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import ErrorBoundary from './components/ErrorBoundary';

// Layout
import Layout from './components/layout/Layout';

// Auth Pages (Loaded immediately for auth flow)
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import ForgotPassword from './pages/Auth/ForgotPassword';
import ProfileSetup from './pages/Auth/ProfileSetup';

// Core Dashboard (Fast initial dashboard load)
import Dashboard from './pages/Dashboard/Dashboard';

// Lazy Loaded Heavy Modules (Loaded on-demand when navigated to)
const AIMentor = lazy(() => import('./pages/AIMentor/AIMentor'));
const Aptitude = lazy(() => import('./pages/Aptitude/Aptitude'));
const Coding = lazy(() => import('./pages/Coding/Coding'));
const Interview = lazy(() => import('./pages/Interview/Interview'));
const Progress = lazy(() => import('./pages/Progress/Progress'));
const Companies = lazy(() => import('./pages/Companies/Companies'));
const Resources = lazy(() => import('./pages/Resources/Resources'));
const Achievements = lazy(() => import('./pages/Achievements/Achievements'));
const Friends = lazy(() => import('./pages/Friends/Friends'));
const Settings = lazy(() => import('./pages/Settings/Settings'));

// Feature Modules
const Jobs = lazy(() => import('./pages/Jobs/Jobs'));
const Career = lazy(() => import('./pages/Career/Career'));
const Roadmaps = lazy(() => import('./pages/Roadmaps/Roadmaps'));
const RoadmapDetail = lazy(() => import('./pages/Roadmaps/RoadmapDetail'));
const Resume = lazy(() => import('./pages/Resume/Resume'));
const Admin = lazy(() => import('./pages/Admin/Admin'));

// Modular Fallback Loader
function ModuleFallback({ message = 'Loading module...' }) {
  return (
    <div className="card text-center p-12 animate-fadeIn" style={{ maxWidth: 450, margin: '40px auto' }}>
      <div className="animate-spin" style={{ width: 36, height: 36, border: '3px solid var(--border)', borderTopColor: 'var(--primary)', borderRadius: '50%', margin: '0 auto 16px' }} />
      <h4 className="text-base font-bold text-primary" style={{ margin: 0 }}>{message}</h4>
      <p className="text-xs text-muted mt-1">Preparing your workspace...</p>
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AuthProvider>
          <AppProvider>
            <Routes>
            {/* Public Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/profile-setup" element={<ProfileSetup />} />

            {/* Protected App Routes */}
            <Route element={<ProtectedRoute />}>
              <Route element={<Layout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                
                {/* Lazy-Loaded Route Boundaries */}
                <Route path="/mentor" element={
                  <Suspense fallback={<ModuleFallback message="Loading your AI Mentor..." />}>
                    <AIMentor />
                  </Suspense>
                } />

                <Route path="/aptitude" element={
                  <Suspense fallback={<ModuleFallback message="Loading Aptitude Practice..." />}>
                    <Aptitude />
                  </Suspense>
                } />

                <Route path="/coding" element={
                  <Suspense fallback={<ModuleFallback message="Loading Coding Environment..." />}>
                    <Coding />
                  </Suspense>
                } />

                <Route path="/interview" element={
                  <Suspense fallback={<ModuleFallback message="Preparing your AI Interviewer..." />}>
                    <Interview />
                  </Suspense>
                } />

                <Route path="/progress" element={
                  <Suspense fallback={<ModuleFallback message="Loading Analytics Dashboard..." />}>
                    <Progress />
                  </Suspense>
                } />

                <Route path="/companies" element={
                  <Suspense fallback={<ModuleFallback message="Loading Company Roadmaps..." />}>
                    <Companies />
                  </Suspense>
                } />

                <Route path="/resources" element={
                  <Suspense fallback={<ModuleFallback message="Loading Study Resources..." />}>
                    <Resources />
                  </Suspense>
                } />

                <Route path="/achievements" element={
                  <Suspense fallback={<ModuleFallback message="Loading Achievements & Medals..." />}>
                    <Achievements />
                  </Suspense>
                } />

                <Route path="/friends" element={
                  <Suspense fallback={<ModuleFallback message="Loading Friends & Leaderboard..." />}>
                    <Friends />
                  </Suspense>
                } />

                <Route path="/jobs" element={
                  <Suspense fallback={<ModuleFallback message="Loading Jobs & Internships..." />}>
                    <Jobs />
                  </Suspense>
                } />

                <Route path="/career" element={
                  <Suspense fallback={<ModuleFallback message="Loading AI Career Recommendations..." />}>
                    <Career />
                  </Suspense>
                } />

                <Route path="/roadmaps" element={
                  <Suspense fallback={<ModuleFallback message="Loading Career Roadmaps..." />}>
                    <Roadmaps />
                  </Suspense>
                } />

                <Route path="/roadmaps/:roadmapId" element={
                  <Suspense fallback={<ModuleFallback message="Loading Career Roadmap Path..." />}>
                    <RoadmapDetail />
                  </Suspense>
                } />

                <Route path="/resume" element={
                  <Suspense fallback={<ModuleFallback message="Loading Resume Builder..." />}>
                    <Resume />
                  </Suspense>
                } />

                {/* Admin Dashboard Protected Route */}
                <Route element={<AdminRoute />}>
                  <Route path="/admin" element={
                    <Suspense fallback={<ModuleFallback message="Loading Administrator Portal..." />}>
                      <Admin />
                    </Suspense>
                  } />
                </Route>

                <Route path="/profile" element={
                  <Suspense fallback={<ModuleFallback message="Loading Profile..." />}>
                    <Settings />
                  </Suspense>
                } />

                <Route path="/settings" element={
                  <Suspense fallback={<ModuleFallback message="Loading Settings..." />}>
                    <Settings />
                  </Suspense>
                } />
              </Route>
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  </ErrorBoundary>
  );
}
