// ============================================
// PlaceMentor AI — Settings & Profile Management Page
// ============================================
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { User, Settings as SettingsIcon, Moon, Sun, Bell, Shield, LogOut } from 'lucide-react';
import './Settings.css';

export default function Settings() {
  const { userProfile, updateUserProfile, logout } = useAuth();
  const { theme, toggleTheme, showToast } = useApp();

  const [form, setForm] = useState({
    displayName: userProfile?.displayName || '',
    targetCompany: userProfile?.targetCompany || 'Google',
    preferredLanguage: userProfile?.preferredLanguage || 'Python',
    branch: userProfile?.branch || 'Computer Science',
  });

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await updateUserProfile(form);
      showToast('Settings saved successfully! ⚙️', 'success');
    } catch {
      showToast('Failed to update settings.', 'error');
    }
  };

  return (
    <div className="page settings-page">
      <div className="section-heading mb-6">
        <div>
          <h2>Settings & Profile ⚙️</h2>
          <p className="text-secondary-color">Manage account settings, themes, and target preferences.</p>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <h3 className="text-lg font-bold mb-4">Profile Information</h3>
          <form onSubmit={handleSave} className="flex flex-col gap-4">
            <div className="input-group">
              <label className="input-label">Full Name</label>
              <input
                className="input"
                value={form.displayName}
                onChange={e => setForm(p => ({ ...p, displayName: e.target.value }))}
              />
            </div>
            <div className="input-group">
              <label className="input-label">Target Company</label>
              <input
                className="input"
                value={form.targetCompany}
                onChange={e => setForm(p => ({ ...p, targetCompany: e.target.value }))}
              />
            </div>
            <div className="input-group">
              <label className="input-label">Preferred Programming Language</label>
              <input
                className="input"
                value={form.preferredLanguage}
                onChange={e => setForm(p => ({ ...p, preferredLanguage: e.target.value }))}
              />
            </div>
            <button type="submit" className="btn btn-primary mt-2">
              Save Profile Changes
            </button>
          </form>
        </div>

        <div className="card flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold mb-4">Preferences</h3>
            <div className="flex justify-between items-center p-3 bg-surface-2 rounded-lg mb-3">
              <span className="text-sm font-semibold flex items-center gap-2">
                {theme === 'dark' ? <Moon size={16} /> : <Sun size={16} />} Dark Theme
              </span>
              <button className="btn btn-outline btn-sm" onClick={toggleTheme}>
                {theme === 'dark' ? 'Switch to Light' : 'Switch to Dark'}
              </button>
            </div>
          </div>

          <button className="btn btn-danger btn-full mt-6" onClick={logout}>
            <LogOut size={16} /> Log Out
          </button>
        </div>
      </div>
    </div>
  );
}
