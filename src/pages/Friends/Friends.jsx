// ============================================
// PlaceMentor AI — Friends Streak & Leaderboard Feature
// Add/Search friends, compare streaks, privacy-aware public profiles
// ============================================
import React, { useState } from 'react';
import { Users, Trophy, Flame, Search, UserPlus, Award, CheckCircle, ArrowRight, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import './Friends.css';

const initialLeaderboard = [
  { id: '1', rank: 1, name: 'Aarav Sharma', email: 'aarav@college.edu', college: 'IIT Bombay', streak: 14, longestStreak: 21, score: 94, avatar: '👨‍💻', isFriend: true },
  { id: '2', rank: 2, name: 'Hansika Vanam', email: 'hansika@college.edu', college: 'JNTU Hyderabad', streak: 12, longestStreak: 15, score: 91, avatar: '👩‍💻', isFriend: true },
  { id: '3', rank: 3, name: 'Rohan Mehta', email: 'rohan@college.edu', college: 'BITS Pilani', streak: 10, longestStreak: 18, score: 88, avatar: '👨‍🎓', isFriend: false },
  { id: '4', rank: 4, name: 'Priya Patel', email: 'priya@college.edu', college: 'VIT Vellore', streak: 8, longestStreak: 12, score: 85, avatar: '👩‍🔬', isFriend: false },
  { id: '5', rank: 5, name: 'Ananya Reddy', email: 'ananya@college.edu', college: 'SRM Institute', streak: 7, longestStreak: 10, score: 82, avatar: '👩‍💻', isFriend: true },
  { id: '6', rank: 6, name: 'Vikram Singh', email: 'vikram@college.edu', college: 'NIT Trichy', streak: 5, longestStreak: 9, score: 79, avatar: '👨‍💻', isFriend: false }
];

export default function Friends() {
  const { userProfile } = useAuth();
  const { currentStreak, showToast } = useApp();
  
  const [tab, setTab] = useState('leaderboard'); // 'leaderboard' | 'friends' | 'compare'
  const [searchTerm, setSearchTerm] = useState('');
  const [friendsList, setFriendsList] = useState(initialLeaderboard.filter(u => u.isFriend));
  const [selectedFriend, setSelectedFriend] = useState(initialLeaderboard[0]);
  const [newFriendInput, setNewFriendInput] = useState('');

  const userStreak = userProfile?.streak || currentStreak || 5;

  const handleAddFriend = (e) => {
    e.preventDefault();
    if (!newFriendInput.trim()) return;

    const match = initialLeaderboard.find(u =>
      u.name.toLowerCase().includes(newFriendInput.toLowerCase()) ||
      u.email.toLowerCase().includes(newFriendInput.toLowerCase())
    );

    if (match) {
      if (!friendsList.some(f => f.id === match.id)) {
        setFriendsList(prev => [...prev, { ...match, isFriend: true }]);
        showToast(`Added ${match.name} to your friends list! 🤝`, 'success');
      } else {
        showToast(`${match.name} is already your friend!`, 'info');
      }
    } else {
      // Mock add custom friend name
      const customFriend = {
        id: Date.now().toString(),
        rank: friendsList.length + 5,
        name: newFriendInput.trim(),
        email: `${newFriendInput.toLowerCase().replace(/\s+/g, '')}@college.edu`,
        college: 'Engineering College',
        streak: 3,
        longestStreak: 6,
        score: 75,
        avatar: '🎓',
        isFriend: true
      };
      setFriendsList(prev => [...prev, customFriend]);
      showToast(`Friend request sent to ${newFriendInput}! 🎉`, 'success');
    }
    setNewFriendInput('');
  };

  const filteredLeaderboard = initialLeaderboard.filter(u =>
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.college.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page friends-page">
      <div className="section-heading mb-6">
        <div>
          <h2>Friends & Leaderboard 👥</h2>
          <p className="text-secondary-color">Search & add friends, compare active streaks, and track rankings with privacy-aware public profiles.</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="card mb-6">
        <div className="flex gap-3 border-b pb-3 mb-4 flex-wrap">
          <button className={`chip ${tab === 'leaderboard' ? 'active' : ''}`} onClick={() => setTab('leaderboard')}>
            🏆 Global Leaderboard
          </button>
          <button className={`chip ${tab === 'friends' ? 'active' : ''}`} onClick={() => setTab('friends')}>
            👥 My Friends ({friendsList.length})
          </button>
          <button className={`chip ${tab === 'compare' ? 'active' : ''}`} onClick={() => setTab('compare')}>
            ⚡ Compare Streaks
          </button>
        </div>

        {/* Tab 1: Global Leaderboard */}
        {tab === 'leaderboard' && (
          <div>
            <div className="input-with-icon mb-4">
              <Search size={16} className="input-icon" />
              <input
                type="text"
                className="input"
                placeholder="Search students or college..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="friends-leaderboard-list">
              {filteredLeaderboard.map(item => (
                <div key={item.id} className="friends-leaderboard-item">
                  <div className="rank-badge font-extrabold text-sm" style={{ width: 28 }}>
                    {item.rank === 1 ? '🥇' : item.rank === 2 ? '🥈' : item.rank === 3 ? '🥉' : `#${item.rank}`}
                  </div>
                  <span className="text-2xl">{item.avatar}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-sm" style={{ margin: 0 }}>{item.name}</p>
                      {item.isFriend && <span className="badge badge-teal text-xs">Friend</span>}
                    </div>
                    <p className="text-xs text-muted" style={{ margin: 0 }}>{item.college}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <span className="text-xs font-semibold text-accent flex items-center justify-end gap-1">
                        🔥 {item.streak}d (Max: {item.longestStreak}d)
                      </span>
                      <span className="text-xs text-muted">Public Readiness: {item.score}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Friends List & Add Friend Form */}
        {tab === 'friends' && (
          <div>
            <form onSubmit={handleAddFriend} className="flex gap-2 mb-6">
              <input
                className="input flex-1 text-sm"
                placeholder="Enter friend's name or college email to add..."
                value={newFriendInput}
                onChange={e => setNewFriendInput(e.target.value)}
              />
              <button type="submit" className="btn btn-primary">
                <UserPlus size={16} /> Add Friend
              </button>
            </form>

            <div className="friends-leaderboard-list">
              {friendsList.map(friend => (
                <div key={friend.id} className="friends-leaderboard-item">
                  <span className="text-3xl">{friend.avatar}</span>
                  <div className="flex-1">
                    <p className="font-bold text-sm" style={{ margin: 0 }}>{friend.name}</p>
                    <p className="text-xs text-muted" style={{ margin: 0 }}>{friend.college}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="badge badge-accent">🔥 {friend.streak} Days</span>
                    <button
                      className="btn btn-outline btn-sm"
                      onClick={() => { setSelectedFriend(friend); setTab('compare'); }}
                    >
                      Compare →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Side-by-Side Streak Comparison */}
        {tab === 'compare' && (
          <div className="animate-fadeInUp">
            <h3 className="text-base font-bold mb-4">Streak & Progress Comparison</h3>
            <div className="grid-2 mb-6">
              {/* You */}
              <div className="card text-center" style={{ borderTop: '4px solid var(--primary)' }}>
                <span className="text-4xl mb-2 block">👤</span>
                <h4 className="text-lg font-bold" style={{ margin: 0 }}>{userProfile?.displayName || 'You'}</h4>
                <p className="text-xs text-muted mb-4">{userProfile?.targetCompany || 'Placement Aspirant'}</p>

                <div className="quiz-explanation-box flex justify-between mb-2">
                  <span className="text-xs text-muted font-bold">Current Streak:</span>
                  <span className="text-xs font-bold text-accent">🔥 {userStreak} Days</span>
                </div>
                <div className="quiz-explanation-box flex justify-between mb-2">
                  <span className="text-xs text-muted font-bold">Longest Streak:</span>
                  <span className="text-xs font-bold">⭐ {Math.max(userStreak, 10)} Days</span>
                </div>
                <div className="quiz-explanation-box flex justify-between">
                  <span className="text-xs text-muted font-bold">Readiness Score:</span>
                  <span className="text-xs font-bold text-primary-color">{userProfile?.placementReadiness || 72}%</span>
                </div>
              </div>

              {/* Friend */}
              <div className="card text-center" style={{ borderTop: '4px solid var(--secondary)' }}>
                <span className="text-4xl mb-2 block">{selectedFriend.avatar}</span>
                <h4 className="text-lg font-bold" style={{ margin: 0 }}>{selectedFriend.name}</h4>
                <p className="text-xs text-muted mb-4">{selectedFriend.college}</p>

                <div className="quiz-explanation-box flex justify-between mb-2">
                  <span className="text-xs text-muted font-bold">Current Streak:</span>
                  <span className="text-xs font-bold text-accent">🔥 {selectedFriend.streak} Days</span>
                </div>
                <div className="quiz-explanation-box flex justify-between mb-2">
                  <span className="text-xs text-muted font-bold">Longest Streak:</span>
                  <span className="text-xs font-bold">⭐ {selectedFriend.longestStreak} Days</span>
                </div>
                <div className="quiz-explanation-box flex justify-between">
                  <span className="text-xs text-muted font-bold">Readiness Score:</span>
                  <span className="text-xs font-bold text-secondary-dark">{selectedFriend.score}%</span>
                </div>
              </div>
            </div>

            <div className="quiz-explanation-box flex items-center gap-2 text-xs text-muted">
              <Shield size={14} /> Privacy Notice: Only public profile information, streaks, and readiness badges are displayed to friends.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
