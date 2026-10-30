// ============================================
// PlaceMentor AI — App Context (Global State)
// ============================================
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { messagingService } from '../services/notifications/messagingService';

const AppContext = createContext(null);

const initialState = {
  theme: localStorage.getItem('pm-theme') || 'light',
  sidebarCollapsed: false,
  notifications: [],
  toasts: [],
  nekoEmotion: 'happy',
  nekoVisible: true,
  currentStreak: 0,
  todayActivities: { coding: false, aptitude: false, interview: false },
};

function appReducer(state, action) {
  switch (action.type) {
    case 'SET_THEME':
      localStorage.setItem('pm-theme', action.payload);
      document.documentElement.setAttribute('data-theme', action.payload);
      return { ...state, theme: action.payload };

    case 'TOGGLE_SIDEBAR':
      return { ...state, sidebarCollapsed: !state.sidebarCollapsed };

    case 'SET_SIDEBAR':
      return { ...state, sidebarCollapsed: action.payload };

    case 'ADD_TOAST':
      const toast = { id: Date.now(), ...action.payload };
      setTimeout(() => {
        // Auto-remove toast after duration
      }, action.payload.duration || 3000);
      return { ...state, toasts: [...state.toasts, toast] };

    case 'REMOVE_TOAST':
      return { ...state, toasts: state.toasts.filter(t => t.id !== action.payload) };

    case 'SET_NEKO_EMOTION':
      return { ...state, nekoEmotion: action.payload };

    case 'TOGGLE_NEKO':
      return { ...state, nekoVisible: !state.nekoVisible };

    case 'SET_STREAK':
      return { ...state, currentStreak: action.payload };

    case 'COMPLETE_ACTIVITY':
      return {
        ...state,
        todayActivities: { ...state.todayActivities, [action.payload]: true },
      };

    case 'ADD_NOTIFICATION':
      return { ...state, notifications: [action.payload, ...state.notifications] };

    case 'MARK_NOTIFICATION_READ':
      return {
        ...state,
        notifications: state.notifications.map(n =>
          n.id === action.payload ? { ...n, read: true } : n
        ),
      };

    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Apply theme on mount
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', state.theme);
  }, []);

  // Foreground FCM Push Notification Listener
  useEffect(() => {
    let unsubscribe = () => {};
    messagingService.setupForegroundListener((payload) => {
      const title = payload.notification?.title || payload.data?.title || 'PlaceMentor AI';
      const body = payload.notification?.body || payload.data?.body || 'New notification received.';
      const url = payload.data?.url || '/dashboard';

      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: {
          id: Date.now(),
          title: `${title}: ${body}`,
          time: 'Just now',
          read: false,
          url
        }
      });

      showToast(`🔔 ${title}: ${body}`, 'info', 4500);
    }).then(unsub => {
      if (typeof unsub === 'function') unsubscribe = unsub;
    }).catch(err => {
      console.warn('[Foreground Notification Listener Notice]', err);
    });

    return () => unsubscribe();
  }, []);

  // Helpers
  const setTheme = (theme) => dispatch({ type: 'SET_THEME', payload: theme });
  const toggleTheme = () => setTheme(state.theme === 'dark' ? 'light' : 'dark');
  const toggleSidebar = () => dispatch({ type: 'TOGGLE_SIDEBAR' });

  const showToast = (message, type = 'info', duration = 3000) => {
    const id = Date.now();
    dispatch({ type: 'ADD_TOAST', payload: { id, message, type, duration } });
    setTimeout(() => dispatch({ type: 'REMOVE_TOAST', payload: id }), duration);
  };

  const setNekoEmotion = (emotion) => dispatch({ type: 'SET_NEKO_EMOTION', payload: emotion });

  const completeActivity = (activity) => {
    dispatch({ type: 'COMPLETE_ACTIVITY', payload: activity });
    // Trigger neko excitement
    setNekoEmotion('excited');
    setTimeout(() => setNekoEmotion('happy'), 3000);
  };

  return (
    <AppContext.Provider value={{
      ...state,
      dispatch,
      setTheme,
      toggleTheme,
      toggleSidebar,
      showToast,
      setNekoEmotion,
      completeActivity,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
