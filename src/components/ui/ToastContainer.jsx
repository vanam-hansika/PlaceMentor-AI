// ============================================
// PlaceMentor AI — Toast Container Component
// ============================================
import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

export default function ToastContainer() {
  const { toasts, dispatch } = useApp();

  if (!toasts.length) return null;

  return (
    <div className="toast-container">
      {toasts.map(toast => {
        let Icon = Info;
        let iconColor = 'var(--primary)';
        if (toast.type === 'success') { Icon = CheckCircle; iconColor = 'var(--secondary)'; }
        if (toast.type === 'error') { Icon = AlertCircle; iconColor = 'var(--danger)'; }

        return (
          <div key={toast.id} className="toast">
            <Icon size={18} color={iconColor} />
            <span className="text-sm font-medium flex-1">{toast.message}</span>
            <button
              className="btn-ghost btn-icon-sm"
              onClick={() => dispatch({ type: 'REMOVE_TOAST', payload: toast.id })}
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
