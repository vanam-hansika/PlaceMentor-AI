// ============================================
// PlaceMentor AI — Settings & Notification Preferences
// PWA Installability & Push Notification Control Center
// ============================================
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import {
  User, Settings as SettingsIcon, Moon, Sun, Bell, Shield, LogOut,
  BellRing, BellOff, Sparkles, BookOpen, Briefcase, Download, CheckCircle2,
  AlertCircle, Send, RefreshCw, Smartphone, Key, Check
} from 'lucide-react';
import { messagingService } from '../../services/notifications/messagingService';
import { getGeminiApiKey, setGeminiApiKey } from '../../services/ai/geminiProvider';
import './Settings.css';

export default function Settings() {
  const { user, userProfile, updateUserProfile, logout } = useAuth();
  const { theme, toggleTheme, showToast } = useApp();

  const [form, setForm] = useState({
    displayName: userProfile?.displayName || '',
    targetCompany: userProfile?.targetCompany || 'Google',
    preferredLanguage: userProfile?.preferredLanguage || 'Python',
    branch: userProfile?.branch || 'Computer Science',
  });

  // Gemini API Key State
  const [geminiKeyInput, setGeminiKeyInput] = useState(getGeminiApiKey());
  const [isSavedKey, setIsSavedKey] = useState(Boolean(getGeminiApiKey()));

  // Notification State
  const [permissionState, setPermissionState] = useState(messagingService.getPermissionState());
  const [isProcessingNotif, setIsProcessingNotif] = useState(false);
  const [notifPreferences, setNotifPreferences] = useState({
    dailyMotivation: userProfile?.notificationPreferences?.dailyMotivation ?? true,
    studyReminders: userProfile?.notificationPreferences?.studyReminders ?? true,
    jobAlerts: userProfile?.notificationPreferences?.jobAlerts ?? true,
  });

  // PWA Install Prompt State
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if app is already running in standalone PWA mode
    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true) {
      setIsInstalled(true);
    }

    const handleBeforeInstall = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  // Update permission state on focus
  useEffect(() => {
    setPermissionState(messagingService.getPermissionState());
  }, []);

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    try {
      await updateUserProfile(form);
      showToast('Settings saved successfully! ⚙️', 'success');
    } catch {
      showToast('Failed to update settings.', 'error');
    }
  };

  const handleSaveGeminiKey = (e) => {
    e.preventDefault();
    if (!geminiKeyInput.trim()) {
      setGeminiApiKey('');
      setIsSavedKey(false);
      showToast('Gemini API key cleared', 'info');
      return;
    }
    setGeminiApiKey(geminiKeyInput.trim());
    setIsSavedKey(true);
    showToast('Gemini API key saved successfully! ✨', 'success');
  };

  // 1. Enable Push Notifications (explicit user opt-in)
  const handleEnableNotifications = async () => {
    setIsProcessingNotif(true);
    try {
      // Step A: Request native browser permission
      const permResult = await messagingService.requestNotificationPermission();
      setPermissionState(permResult.state);

      if (!permResult.success) {
        showToast(permResult.error || 'Notification permission was not granted.', 'warning');
        setIsProcessingNotif(false);
        return;
      }

      // Step B: Register Service Worker and retrieve FCM device token
      const regResult = await messagingService.registerDeviceToken(user);
      if (regResult.success) {
        // Step C: Save preferences to Firestore
        await messagingService.saveNotificationPreferences(user?.uid, notifPreferences);
        showToast('Push Notifications enabled! Device successfully registered. 🔔', 'success');
      } else {
        showToast(regResult.error || 'Failed to complete push token registration.', 'error');
      }
    } catch (err) {
      showToast(err.message || 'Error configuring notifications.', 'error');
    } finally {
      setIsProcessingNotif(false);
    }
  };

  // 2. Disable Notifications
  const handleDisableNotifications = async () => {
    setIsProcessingNotif(true);
    try {
      await messagingService.removeDeviceToken(user);
      showToast('Push notifications disabled for this device.', 'info');
      setPermissionState('disabled');
    } catch (err) {
      showToast('Failed to revoke device token.', 'error');
    } finally {
      setIsProcessingNotif(false);
    }
  };

  // 3. Toggle specific category preference
  const handleTogglePreference = async (key) => {
    const updated = { ...notifPreferences, [key]: !notifPreferences[key] };
    setNotifPreferences(updated);
    if (user?.uid) {
      await messagingService.saveNotificationPreferences(user.uid, updated);
      showToast('Notification preferences updated.', 'success');
    }
  };

  // 4. Send Test Notification
  const handleTestNotification = async () => {
    setIsProcessingNotif(true);
    try {
      const res = await messagingService.triggerLocalTestPush();
      if (res.success) {
        showToast('Test notification sent to your device! 🎉', 'success');
      } else {
        showToast(res.error || 'Failed to trigger test notification.', 'error');
      }
    } catch (err) {
      showToast(err.message || 'Notification test failed.', 'error');
    } finally {
      setIsProcessingNotif(false);
    }
  };

  // 5. Install PWA App
  const handleInstallPWA = async () => {
    if (!deferredPrompt) {
      showToast('PWA install prompt is not available. You can install via your browser address bar menu.', 'info');
      return;
    }
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      showToast('PlaceMentor AI installed to your home screen! 🚀', 'success');
      setIsInstalled(true);
    }
    setDeferredPrompt(null);
  };

  return (
    <div className="page settings-page">
      <div className="section-heading mb-6">
        <div>
          <h2>Settings & Notification Preferences ⚙️</h2>
          <p className="text-secondary-color">
            Configure your placement profile, study reminders, push alerts, and PWA install preferences.
          </p>
        </div>
      </div>

      {/* PWA Install Banner */}
      {!isInstalled && deferredPrompt && (
        <div className="install-pwa-banner animate-fadeInDown">
          <div className="flex items-center gap-3">
            <div className="icon-box icon-box-primary">
              <Smartphone size={22} />
            </div>
            <div>
              <h4 className="text-sm font-bold" style={{ margin: 0 }}>Install PlaceMentor AI App</h4>
              <p className="text-xs text-secondary-color" style={{ margin: '2px 0 0' }}>
                Add PlaceMentor AI to your home screen or desktop for offline access and instant notifications.
              </p>
            </div>
          </div>
          <button className="btn btn-primary btn-sm flex items-center gap-1" onClick={handleInstallPWA}>
            <Download size={14} /> Install PWA
          </button>
        </div>
      )}

      <div className="grid-2">
        {/* Profile Information Card */}
        <div className="card">
          <h3 className="text-base font-bold mb-4 flex items-center gap-2">
            <User size={18} className="text-primary" /> Placement Profile
          </h3>
          <form onSubmit={handleSaveProfile} className="flex flex-col gap-4 text-xs">
            <div className="input-group">
              <label className="input-label">Full Name</label>
              <input
                className="input text-xs"
                value={form.displayName}
                onChange={e => setForm(p => ({ ...p, displayName: e.target.value }))}
                required
              />
            </div>
            <div className="input-group">
              <label className="input-label">Target Company</label>
              <input
                className="input text-xs"
                value={form.targetCompany}
                onChange={e => setForm(p => ({ ...p, targetCompany: e.target.value }))}
                required
              />
            </div>
            <div className="input-group">
              <label className="input-label">Preferred Programming Language</label>
              <input
                className="input text-xs"
                value={form.preferredLanguage}
                onChange={e => setForm(p => ({ ...p, preferredLanguage: e.target.value }))}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary btn-sm mt-2">
              Save Profile Changes
            </button>
          </form>
        </div>

        {/* Gemini AI Integration Card */}
        <div className="card">
          <h3 className="text-base font-bold mb-3 flex items-center gap-2">
            <Key size={18} className="text-primary" /> Google Gemini AI Integration
          </h3>
          <p className="text-xs text-secondary-color mb-3" style={{ lineHeight: 1.5 }}>
            Powers <strong>Dr. Elena Rostova AI Mentor</strong>. Get your free API key at <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', color: 'var(--primary)', fontWeight: 'bold' }}>Google AI Studio</a>.
          </p>
          <form onSubmit={handleSaveGeminiKey} className="flex flex-col gap-3 text-xs">
            <div className="input-group">
              <label className="input-label">Gemini API Key</label>
              <input
                type="password"
                className="input text-xs"
                placeholder="AIzaSy... (or set VITE_GEMINI_API_KEY in .env)"
                value={geminiKeyInput}
                onChange={e => setGeminiKeyInput(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <button type="submit" className="btn btn-primary btn-sm">
                {isSavedKey ? 'Update API Key' : 'Save API Key'}
              </button>
              {isSavedKey && (
                <button
                  type="button"
                  className="btn btn-outline btn-sm text-danger"
                  onClick={() => {
                    setGeminiApiKey('');
                    setGeminiKeyInput('');
                    setIsSavedKey(false);
                    showToast('Gemini API key cleared', 'info');
                  }}
                >
                  Clear Key
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Push Notifications & Reminders Control Center */}
        <div className="card settings-notif-card flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-base font-bold flex items-center gap-2" style={{ margin: 0 }}>
                <Bell size={18} className="text-primary" /> Push Notifications & Alerts
              </h3>
              <span className={`badge ${
                permissionState === 'granted'
                  ? 'badge-teal'
                  : permissionState === 'denied'
                  ? 'badge-danger'
                  : 'badge-accent'
              } text-xs`}>
                {permissionState === 'granted'
                  ? 'Notifications Active'
                  : permissionState === 'denied'
                  ? 'Blocked in Browser'
                  : 'Not Configured'}
              </span>
            </div>

            {/* Pre-Permission Explanatory Information */}
            <div className="notif-preview-box text-xs">
              <span className="font-bold text-primary block mb-2">What updates will you receive?</span>
              <div className="notif-preview-item">
                <Sparkles size={16} className="text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <strong>Daily Motivational Boosts:</strong> Inspiring daily placement tips from Niko Cat & Mentor.
                </div>
              </div>
              <div className="notif-preview-item">
                <BookOpen size={16} className="text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <strong>Study & Streak Reminders:</strong> Alerts to protect your streak and solve daily coding goals.
                </div>
              </div>
              <div className="notif-preview-item">
                <Briefcase size={16} className="text-teal flex-shrink-0 mt-0.5" />
                <div>
                  <strong>Job & Internship Alerts:</strong> Fast alerts for new verified opportunities matching your skills.
                </div>
              </div>
            </div>

            {/* Granular Preferences Toggles */}
            <div className="flex flex-col gap-1 mb-4 text-xs">
              <div className="notif-toggle-row">
                <span>Daily Motivation & Tips</span>
                <input
                  type="checkbox"
                  checked={notifPreferences.dailyMotivation}
                  onChange={() => handleTogglePreference('dailyMotivation')}
                  className="cursor-pointer"
                />
              </div>
              <div className="notif-toggle-row">
                <span>Practice & Streak Reminders</span>
                <input
                  type="checkbox"
                  checked={notifPreferences.studyReminders}
                  onChange={() => handleTogglePreference('studyReminders')}
                  className="cursor-pointer"
                />
              </div>
              <div className="notif-toggle-row">
                <span>Placement & Internship Openings</span>
                <input
                  type="checkbox"
                  checked={notifPreferences.jobAlerts}
                  onChange={() => handleTogglePreference('jobAlerts')}
                  className="cursor-pointer"
                />
              </div>
            </div>

            {/* Permission Denied Notice */}
            {permissionState === 'denied' && (
              <div className="quiz-explanation-box mb-4 text-xs text-danger flex items-start gap-2" style={{ borderLeft: '3px solid var(--danger)' }}>
                <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                <div>
                  <strong>Notifications are blocked:</strong> To receive reminders, click the lock or settings icon next to the URL in your browser address bar and change Notifications to <strong>Allow</strong>.
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2 pt-3 border-t">
            {permissionState !== 'granted' ? (
              <button
                className={`btn btn-primary btn-sm btn-full flex items-center justify-center gap-2 ${
                  isProcessingNotif ? 'btn-loading' : ''
                }`}
                onClick={handleEnableNotifications}
                disabled={isProcessingNotif}
              >
                <BellRing size={15} /> Enable Push Notifications
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  className={`btn btn-outline btn-sm flex-1 flex items-center justify-center gap-1 ${
                    isProcessingNotif ? 'btn-loading' : ''
                  }`}
                  onClick={handleTestNotification}
                  disabled={isProcessingNotif}
                >
                  <Send size={13} /> Send Test Push
                </button>
                <button
                  className="btn btn-ghost btn-sm text-danger"
                  onClick={handleDisableNotifications}
                  disabled={isProcessingNotif}
                  title="Disable notifications on this device"
                >
                  <BellOff size={15} /> Disable
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Theme & Session Card */}
      <div className="card mt-4 flex justify-between items-center flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold flex items-center gap-2">
            {theme === 'dark' ? <Moon size={16} className="text-primary" /> : <Sun size={16} className="text-accent" />}
            Interface Theme: <strong>{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</strong>
          </span>
          <button className="btn btn-outline btn-xs" onClick={toggleTheme}>
            Switch to {theme === 'dark' ? 'Light' : 'Dark'}
          </button>
        </div>

        <button className="btn btn-danger btn-sm flex items-center gap-1" onClick={logout}>
          <LogOut size={14} /> Log Out of Account
        </button>
      </div>
    </div>
  );
}
