// ============================================
// PlaceMentor AI — Application Error Boundary
// Catches unexpected React rendering & lifecycle errors
// Prevents blank white screen and provides instant recovery
// ============================================

import React, { Component } from 'react';
import { AlertTriangle, RefreshCw, Home, ShieldAlert } from 'lucide-react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[PlaceMentor AI Error Boundary Caught Error]:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleRecover = () => {
    try {
      // Clear any bloated storage keys that could have caused quota or parse errors
      localStorage.removeItem('pm_notes_data');
      localStorage.removeItem('pm_pending_items');
    } catch {}
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  handleGoDashboard = () => {
    try {
      localStorage.removeItem('pm_notes_data');
    } catch {}
    window.location.href = '/dashboard';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center p-4" style={{ minHeight: '80vh' }}>
          <div className="card text-center p-8 animate-scaleIn" style={{ maxWidth: 520, width: '100%', boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)' }}>
            <div className="icon-box icon-box-primary mx-auto mb-4" style={{ width: 56, height: 56, margin: '0 auto 16px', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger, #ef4444)' }}>
              <ShieldAlert size={28} />
            </div>

            <h2 className="text-xl font-bold mb-1">PlaceMentor AI Recovered Gracefully</h2>
            <p className="text-xs text-secondary-color mb-4">
              An unexpected display issue occurred (likely caused by a heavy document upload exceeding browser local storage limits).
            </p>

            {this.state.error && (
              <div className="quiz-explanation-box mb-4 text-xs text-left" style={{ borderLeft: '3px solid var(--danger)', maxHeight: 120, overflowY: 'auto' }}>
                <span className="font-bold text-danger">Error:</span> {this.state.error.message || 'Unknown error'}
              </div>
            )}

            <div className="flex justify-center gap-3 mt-4">
              <button
                className="btn btn-primary btn-sm flex items-center gap-1"
                onClick={this.handleRecover}
              >
                <RefreshCw size={14} /> Clear Cache & Reload
              </button>
              <button
                className="btn btn-outline btn-sm flex items-center gap-1"
                onClick={this.handleGoDashboard}
              >
                <Home size={14} /> Go to Dashboard
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
