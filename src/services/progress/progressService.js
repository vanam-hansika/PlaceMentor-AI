// ============================================
// PlaceMentor AI — Dynamic Student Progress & Gamification Service
// Tracks daily streaks, duplicate-proof XP, skill growth, daily analytics & topic mastery
// Real-time synchronization with Cloud Firestore
// ============================================

import { db } from '../../config/firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { safeStorage } from '../../utils/safeStorage';

// Default recommended focus topics for early placement preparation
export const CORE_PLACEMENT_TOPICS = [
  { name: 'Arrays & Strings', domain: 'coding', defaultCategory: 'Coding' },
  { name: 'Quantitative Aptitude', domain: 'aptitude', defaultCategory: 'Aptitude' },
  { name: 'Time & Work', domain: 'aptitude', defaultCategory: 'Aptitude' },
  { name: 'Logical Reasoning', domain: 'aptitude', defaultCategory: 'Aptitude' },
  { name: 'Technical CS Fundamentals', domain: 'interview', defaultCategory: 'Interview' }
];

// Helper: Get Today's Date String in YYYY-MM-DD
export function getTodayDateStr() {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Helper: Calculate Streak based on calendar dates
export function calculateStreak(lastActiveDate, currentStreak = 0) {
  const todayStr = getTodayDateStr();

  if (!lastActiveDate) {
    return { streak: 1, lastActiveDate: todayStr, isNewDay: true, streakUpdated: true };
  }

  if (lastActiveDate === todayStr) {
    return { streak: Math.max(1, currentStreak), lastActiveDate: todayStr, isNewDay: false, streakUpdated: false };
  }

  // Calculate calendar day difference
  const [lastY, lastM, lastD] = lastActiveDate.split('-').map(Number);
  const [todayY, todayM, todayD] = todayStr.split('-').map(Number);
  const lastDate = new Date(lastY, lastM - 1, lastD);
  const todayDate = new Date(todayY, todayM - 1, todayD);

  const diffTime = todayDate.getTime() - lastDate.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) {
    // Practiced yesterday, practice today -> increment streak
    return { streak: (currentStreak || 0) + 1, lastActiveDate: todayStr, isNewDay: true, streakUpdated: true };
  } else {
    // Missed one or more days -> reset streak to 1
    return { streak: 1, lastActiveDate: todayStr, isNewDay: true, streakUpdated: true };
  }
}

export const progressService = {
  // ----------------------------------------------------
  // Record Coding Activity (Problem Executed / Solved)
  // ----------------------------------------------------
  async recordCodingActivity(user, problem, passed = true, stats = {}) {
    if (!user?.uid || !problem) return null;

    const problemId = problem.id || 'code-prob';
    const problemTitle = problem.title || 'Coding Practice';
    const category = problem.category || 'Algorithms';
    const difficulty = (problem.difficulty || 'Easy').toLowerCase();

    // Base XP according to difficulty
    const baseDifficultyXP = difficulty === 'hard' ? 80 : difficulty === 'medium' ? 60 : 40;

    return this._applyProgressUpdate(user, {
      type: 'coding',
      activityKey: `coding_${problemId}`,
      topicName: category,
      baseXP: baseDifficultyXP,
      score: passed ? 100 : 40,
      passed,
      label: `Solved "${problemTitle}" (${problem.difficulty})`,
      problemId,
      metadata: stats
    });
  },

  // ----------------------------------------------------
  // Record Aptitude Test Activity (Quiz Completed)
  // ----------------------------------------------------
  async recordAptitudeActivity(user, category, topic, scorePercentage = 0, totalQuestions = 0, correctCount = 0) {
    if (!user?.uid) return null;

    const topicId = topic?.id || 'aptitude-topic';
    const topicName = topic?.name || category?.name || 'Quantitative Aptitude';
    const dateStr = getTodayDateStr();

    // Duplicate-proof key: student can practice multiple topics, scored per topic per day
    const activityKey = `aptitude_${topicId}_${dateStr}`;

    // XP scaling based on score percentage
    const baseXP = Math.round(Math.max(15, (scorePercentage / 100) * 45));

    return this._applyProgressUpdate(user, {
      type: 'aptitude',
      activityKey,
      topicName,
      baseXP,
      score: scorePercentage,
      passed: scorePercentage >= 60,
      label: `Aptitude Quiz: ${topicName} (${scorePercentage}%)`,
      totalQuestions,
      correctCount
    });
  },

  // ----------------------------------------------------
  // Record Mock Interview Activity (Interview Session Finished)
  // ----------------------------------------------------
  async recordInterviewActivity(user, interviewType = 'Technical', overallScore = 80, integrityScore = 100) {
    if (!user?.uid) return null;

    const dateStr = getTodayDateStr();
    const activityKey = `interview_${interviewType.toLowerCase()}_${dateStr}_${Date.now()}`;
    const baseXP = 60 + (overallScore >= 80 ? 25 : 10);

    return this._applyProgressUpdate(user, {
      type: 'interview',
      activityKey,
      topicName: `${interviewType} Interview Prep`,
      baseXP,
      score: overallScore,
      passed: overallScore >= 60,
      label: `${interviewType} Mock Interview (${overallScore}%)`,
      integrityScore
    });
  },

  // ----------------------------------------------------
  // Core Progress Synchronization Engine
  // ----------------------------------------------------
  async _applyProgressUpdate(user, activity) {
    const uid = user.uid;
    const docRef = doc(db, 'users', uid);
    const todayStr = getTodayDateStr();

    let currentProfile = {};
    try {
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        currentProfile = snap.data();
      }
    } catch (err) {
      console.warn('[ProgressService Fetch Notice]', err.message);
    }

    // Fallback to local profile cache if Firestore read timed out
    if (!currentProfile.email && user.email) {
      const cachedList = safeStorage.getItem('pm_users_data', []);
      const match = cachedList.find(u => u.uid === uid || u.id === uid);
      if (match) currentProfile = { ...match };
    }

    // 1. Calculate Streak
    const streakResult = calculateStreak(currentProfile.lastActiveDate, currentProfile.streak || 0);

    // 2. Duplicate-Proof XP Reward
    const completedLedger = currentProfile.completedItemIds || [];
    const isAlreadyCompleted = completedLedger.includes(activity.activityKey);

    let xpToAdd = 0;
    let rewardMessage = '';

    if (!isAlreadyCompleted) {
      // First time completion: Full XP
      xpToAdd = activity.baseXP;
      completedLedger.push(activity.activityKey);
      rewardMessage = `+${xpToAdd} XP Earned! ⚡`;
    } else {
      // Repeat practice bonus: Modest revision XP to reward discipline without duplicate exploitation
      xpToAdd = 10;
      rewardMessage = `Practice Revision: +10 XP! 🔁`;
    }

    const newTotalXP = (currentProfile.xp || 0) + xpToAdd;
    const newLevel = Math.floor(newTotalXP / 200) + 1;

    // 3. Update Daily Activity History for Real Analytics Charts
    const dailyActivity = currentProfile.dailyActivity || {};
    const todayLog = dailyActivity[todayStr] || {
      xpEarned: 0,
      codingCount: 0,
      aptitudeCount: 0,
      interviewCount: 0,
      codingScore: currentProfile.codingScore || 0,
      aptitudeScore: currentProfile.aptitudeScore || 0,
      interviewScore: currentProfile.interviewScore || 0
    };

    todayLog.xpEarned = (todayLog.xpEarned || 0) + xpToAdd;

    if (activity.type === 'coding') {
      todayLog.codingCount = (todayLog.codingCount || 0) + 1;
    } else if (activity.type === 'aptitude') {
      todayLog.aptitudeCount = (todayLog.aptitudeCount || 0) + 1;
    } else if (activity.type === 'interview') {
      todayLog.interviewCount = (todayLog.interviewCount || 0) + 1;
    }

    // 4. Update Topic Mastery Stats (Real Performance Tracking)
    const topicStats = currentProfile.topicStats || {};
    const topicName = activity.topicName || 'General Practice';
    const currentTopicData = topicStats[topicName] || { attempts: 0, correct: 0, avgScore: 0, domain: activity.type };

    const newAttempts = currentTopicData.attempts + 1;
    const isSuccess = activity.passed || (activity.score >= 60);
    const newCorrect = currentTopicData.correct + (isSuccess ? 1 : 0);
    const newAvgScore = Math.round(((currentTopicData.avgScore * currentTopicData.attempts) + activity.score) / newAttempts);

    topicStats[topicName] = {
      attempts: newAttempts,
      correct: newCorrect,
      accuracy: Math.round((newCorrect / newAttempts) * 100),
      avgScore: newAvgScore,
      domain: activity.type,
      lastPracticed: todayStr
    };

    // 5. Update Overall Skill Scores
    let codingScore = currentProfile.codingScore || 0;
    let aptitudeScore = currentProfile.aptitudeScore || 0;
    let interviewScore = currentProfile.interviewScore || 0;

    if (activity.type === 'coding') {
      const codingTopics = Object.values(topicStats).filter(t => t.domain === 'coding');
      const avg = codingTopics.reduce((acc, t) => acc + (t.accuracy || 0), 0) / (codingTopics.length || 1);
      codingScore = Math.round(avg);
      todayLog.codingScore = codingScore;
    } else if (activity.type === 'aptitude') {
      const aptTopics = Object.values(topicStats).filter(t => t.domain === 'aptitude');
      const avg = aptTopics.reduce((acc, t) => acc + (t.avgScore || t.accuracy || 0), 0) / (aptTopics.length || 1);
      aptitudeScore = Math.round(avg);
      todayLog.aptitudeScore = aptitudeScore;
    } else if (activity.type === 'interview') {
      const intTopics = Object.values(topicStats).filter(t => t.domain === 'interview');
      const avg = intTopics.reduce((acc, t) => acc + (t.avgScore || 0), 0) / (intTopics.length || 1);
      interviewScore = Math.round(avg);
      todayLog.interviewScore = interviewScore;
    }

    dailyActivity[todayStr] = todayLog;

    // 6. Placement Readiness Score (Dynamic Composite)
    const placementReadiness = Math.min(100, Math.round(
      (codingScore * 0.4) + (aptitudeScore * 0.35) + (interviewScore * 0.25)
    ));

    // 7. Check Daily Goals Completion Bonus (+40 XP when all 3 daily goals hit)
    const todayGoalsBonusKey = `daily_goals_bonus_${todayStr}`;
    let goalsBonusAwarded = false;
    if (
      todayLog.codingCount >= 2 &&
      todayLog.aptitudeCount >= 1 &&
      todayLog.interviewCount >= 1 &&
      !completedLedger.includes(todayGoalsBonusKey)
    ) {
      completedLedger.push(todayGoalsBonusKey);
      goalsBonusAwarded = true;
    }

    // Consolidated Profile Payload
    const updatedProfile = {
      ...currentProfile,
      uid,
      streak: streakResult.streak,
      lastActiveDate: streakResult.lastActiveDate,
      lastActive: serverTimestamp(),
      xp: newTotalXP + (goalsBonusAwarded ? 40 : 0),
      level: newLevel,
      codingScore,
      aptitudeScore,
      interviewScore,
      placementReadiness,
      completedItemIds: completedLedger,
      dailyActivity,
      topicStats
    };

    // 8. Secure Save to Firestore
    try {
      await setDoc(docRef, {
        streak: streakResult.streak,
        lastActiveDate: streakResult.lastActiveDate,
        lastActive: serverTimestamp(),
        xp: newTotalXP + (goalsBonusAwarded ? 40 : 0),
        level: newLevel,
        codingScore,
        aptitudeScore,
        interviewScore,
        placementReadiness,
        completedItemIds: completedLedger.slice(-100), // Keep clean bounded ledger
        dailyActivity,
        topicStats
      }, { merge: true });
    } catch (saveErr) {
      console.warn('[ProgressService Firestore Save Notice]', saveErr.message);
    }

    // 9. Update Local Cache for Instant Response
    const userRegistry = safeStorage.getItem('pm_users_data', []);
    const idx = userRegistry.findIndex(u => u.uid === uid || u.id === uid);
    if (idx >= 0) {
      userRegistry[idx] = { ...userRegistry[idx], ...updatedProfile };
    } else {
      userRegistry.unshift({ id: uid, ...updatedProfile });
    }
    safeStorage.setItem('pm_users_data', userRegistry);

    return {
      success: true,
      xpEarned: xpToAdd,
      totalXp: newTotalXP,
      streak: streakResult.streak,
      streakUpdated: streakResult.streakUpdated,
      rewardMessage,
      goalsBonusAwarded,
      profile: updatedProfile
    };
  },

  // ----------------------------------------------------
  // Calculate Last 7 Days Analytics for Dynamic Charts
  // ----------------------------------------------------
  getWeeklyActivityAnalytics(dailyActivity = {}) {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const result = [];
    const today = new Date();

    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      const dayName = days[d.getDay()];
      const dayData = dailyActivity[dateStr] || {};

      result.push({
        date: dateStr,
        day: dayName,
        xp: dayData.xpEarned || 0,
        coding: dayData.codingScore || 0,
        aptitude: dayData.aptitudeScore || 0,
        interview: dayData.interviewScore || 0,
        activitiesCount: (dayData.codingCount || 0) + (dayData.aptitudeCount || 0) + (dayData.interviewCount || 0)
      });
    }

    return result;
  },

  // ----------------------------------------------------
  // Dynamic Strong and Weak Topics Categorization
  // ----------------------------------------------------
  getStrongAndWeakTopics(topicStats = {}) {
    const strong = [];
    const weak = [];
    const entries = Object.entries(topicStats);

    if (entries.length === 0) {
      return {
        strong: ['Arrays & Hashing (Quick Start)', 'Grammar & Vocabulary'],
        weak: ['Dynamic Programming', 'Probability & Statistics', 'System Design'],
        hasRealData: false
      };
    }

    entries.forEach(([name, data]) => {
      const accuracy = data.accuracy ?? data.avgScore ?? 0;
      if (data.attempts >= 1) {
        if (accuracy >= 70) {
          strong.push({ name, accuracy, attempts: data.attempts });
        } else {
          weak.push({ name, accuracy, attempts: data.attempts });
        }
      }
    });

    // Sort by performance
    strong.sort((a, b) => b.accuracy - a.accuracy);
    weak.sort((a, b) => a.accuracy - b.accuracy);

    // Fallback if not enough data yet
    if (strong.length === 0) {
      strong.push({ name: 'Practice your first topic to unlock Mastery!', accuracy: 0, attempts: 0 });
    }
    if (weak.length === 0) {
      weak.push({ name: 'Try challenging topics in Aptitude & Coding to identify focus areas.', accuracy: 0, attempts: 0 });
    }

    return {
      strong: strong.slice(0, 4),
      weak: weak.slice(0, 4),
      hasRealData: true
    };
  },

  // ----------------------------------------------------
  // Dynamic Today's Goals Status
  // ----------------------------------------------------
  getTodayGoalsStatus(userProfile) {
    const todayStr = getTodayDateStr();
    const todayLog = userProfile?.dailyActivity?.[todayStr] || {};

    const codingCount = todayLog.codingCount || 0;
    const aptitudeCount = todayLog.aptitudeCount || 0;
    const interviewCount = todayLog.interviewCount || 0;

    return [
      {
        id: 'coding-goal',
        label: `Solve 2 Coding Problems (${codingCount}/2)`,
        done: codingCount >= 2,
        current: codingCount,
        target: 2,
        path: '/coding',
        icon: '💻'
      },
      {
        id: 'aptitude-goal',
        label: `Practice Aptitude Questions (${aptitudeCount}/1)`,
        done: aptitudeCount >= 1,
        current: aptitudeCount,
        target: 1,
        path: '/aptitude',
        icon: '📊'
      },
      {
        id: 'interview-goal',
        label: `Complete a Mock Interview (${interviewCount}/1)`,
        done: interviewCount >= 1,
        current: interviewCount,
        target: 1,
        path: '/interview',
        icon: '🎤'
      }
    ];
  },

  // ----------------------------------------------------
  // Dynamic Continue Learning Status
  // ----------------------------------------------------
  getContinueLearningStatus(userProfile) {
    const topicStats = userProfile?.topicStats || {};
    const codingScore = userProfile?.codingScore || 0;
    const aptitudeScore = userProfile?.aptitudeScore || 0;
    const interviewScore = userProfile?.interviewScore || 0;

    return [
      {
        title: 'Algorithms & Coding',
        sub: `${Object.keys(topicStats).filter(k => topicStats[k].domain === 'coding').length} Topics Practiced`,
        path: '/coding',
        progress: codingScore || 20,
        color: 'primary',
        iconType: 'code'
      },
      {
        title: 'Quantitative & Logical Aptitude',
        sub: `${Object.keys(topicStats).filter(k => topicStats[k].domain === 'aptitude').length} Topics Mastered`,
        path: '/aptitude',
        progress: aptitudeScore || 25,
        color: 'secondary',
        iconType: 'book'
      },
      {
        title: 'AI Mock Interview',
        sub: interviewScore > 0 ? `Latest Performance: ${interviewScore}%` : 'Take your first interview',
        path: '/interview',
        progress: interviewScore || 15,
        color: 'purple',
        iconType: 'video'
      }
    ];
  }
};
