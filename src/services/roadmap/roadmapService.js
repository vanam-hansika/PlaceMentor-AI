// ============================================
// PlaceMentor AI — Career Roadmap Service
// Curated Roadmaps, Personalized Matching & Firestore Progress Tracking
// ============================================

import { CAREER_ROADMAPS, ROADMAP_CATEGORIES, DIFFICULTY_LEVELS } from '../../data/careerRoadmapsData';
import { db } from '../../config/firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { safeStorage } from '../../utils/safeStorage';
import { progressService } from '../progress/progressService';

export const roadmapService = {
  // 1. Get All Roadmaps
  getAllRoadmaps() {
    return CAREER_ROADMAPS;
  },

  // 2. Get Roadmap by ID
  getRoadmapById(id) {
    if (!id) return null;
    return CAREER_ROADMAPS.find(r => r.id === id) || null;
  },

  // 3. Filter Roadmaps
  filterRoadmaps(category = 'All', difficulty = 'All', search = '') {
    return CAREER_ROADMAPS.filter(r => {
      const matchCat = category === 'All' || r.category.toLowerCase() === category.toLowerCase();
      const matchDiff = difficulty === 'All' || r.difficulty.toLowerCase() === difficulty.toLowerCase();
      const q = search.toLowerCase().trim();
      const matchSearch =
        !q ||
        r.title.toLowerCase().includes(q) ||
        r.shortDescription.toLowerCase().includes(q) ||
        r.technologies.some(t => t.toLowerCase().includes(q));
      return matchCat && matchDiff && matchSearch;
    });
  },

  // 4. Personalized Recommendations based on Student Profile
  getPersonalizedRecommendations(userProfile) {
    if (!userProfile) {
      return [
        {
          roadmap: this.getRoadmapById('full-stack-developer'),
          matchScore: 92,
          reason: 'High industry demand across product and service engineering teams.'
        },
        {
          roadmap: this.getRoadmapById('product-based-company-prep'),
          matchScore: 88,
          reason: 'Essential algorithmic and system design mastery for top placements.'
        },
        {
          roadmap: this.getRoadmapById('data-analyst'),
          matchScore: 84,
          reason: 'Fastest-growing entry point for analytics, SQL, and data visualization.'
        }
      ].filter(r => r.roadmap);
    }

    const lang = (userProfile.preferredLanguage || '').toLowerCase();
    const targetComp = (userProfile.targetCompany || '').toLowerCase();
    const branch = (userProfile.branch || '').toLowerCase();
    const codingScore = userProfile.codingScore || 0;
    const aptitudeScore = userProfile.aptitudeScore || 0;

    const scored = [];

    CAREER_ROADMAPS.forEach(r => {
      let score = 50; // base score
      let reasons = [];

      // Match Language
      if (lang === 'java' && (r.id === 'java-developer' || r.id === 'backend-developer')) {
        score += 35;
        reasons.push('Matches your selected preferred language: Java');
      } else if (lang === 'python' && (r.id === 'python-developer' || r.id === 'ai-engineer' || r.id === 'data-analyst' || r.id === 'machine-learning-engineer')) {
        score += 35;
        reasons.push('Directly leverages your Python programming focus');
      } else if ((lang === 'javascript' || lang === 'typescript') && (r.id === 'frontend-developer' || r.id === 'full-stack-developer' || r.id === 'mobile-app-developer')) {
        score += 35;
        reasons.push('Builds on your JavaScript / Web Development interests');
      } else if ((lang === 'c++' || lang === 'c') && (r.id === 'product-based-company-prep' || r.id === 'backend-developer')) {
        score += 35;
        reasons.push('Leverages high-speed C/C++ for core algorithmic rounds');
      }

      // Match Target Company
      if (r.id === 'service-based-company-prep' && (targetComp.includes('tcs') || targetComp.includes('infosys') || targetComp.includes('wipro') || targetComp.includes('accenture') || targetComp.includes('cognizant') || targetComp.includes('capgemini'))) {
        score += 30;
        reasons.push(`Tailored specifically for your target recruiter: ${userProfile.targetCompany}`);
      } else if (r.id === 'product-based-company-prep' && (targetComp.includes('google') || targetComp.includes('amazon') || targetComp.includes('microsoft') || targetComp.includes('flipkart') || targetComp.includes('uber') || targetComp.includes('zoho'))) {
        score += 30;
        reasons.push(`Curated specifically for tier-1 standards at ${userProfile.targetCompany}`);
      }

      // Match Coding / Aptitude Profile
      if (codingScore >= 70 && (r.id === 'product-based-company-prep' || r.id === 'full-stack-developer')) {
        score += 15;
        reasons.push(`High coding aptitude (${codingScore}%) positions you well for advanced technical paths`);
      }
      if (aptitudeScore >= 75 && (r.id === 'data-analyst' || r.id === 'service-based-company-prep')) {
        score += 15;
        reasons.push(`Strong quantitative reasoning (${aptitudeScore}%) fits analytical evaluation benchmarks`);
      }

      // College student year
      if (userProfile.year?.includes('2nd') || userProfile.year?.includes('3rd') || r.difficulty === 'Beginner Friendly') {
        if (r.id === 'internship-preparation') {
          score += 25;
          reasons.push('Designed for college students aiming for off-campus & on-campus summer internships');
        }
      }

      if (reasons.length > 0) {
        scored.push({
          roadmap: r,
          matchScore: Math.min(98, score),
          reason: reasons[0]
        });
      }
    });

    scored.sort((a, b) => b.matchScore - a.matchScore);
    return scored.slice(0, 3);
  },

  // 5. Get Student's Saved Progress for a Roadmap (Isolated per user UID)
  async getUserRoadmapProgress(userId, roadmapId) {
    if (!userId || !roadmapId) {
      return { completedStages: [], inProgressStage: 1, percentage: 0, lastUpdated: null };
    }

    const cacheKey = `pm_roadmap_${userId}_${roadmapId}`;
    const cached = safeStorage.getItem(cacheKey, null);

    try {
      const userDoc = await getDoc(doc(db, 'users', userId));
      if (userDoc.exists()) {
        const data = userDoc.data();
        const progressObj = data?.roadmapProgress?.[roadmapId];
        if (progressObj) {
          safeStorage.setItem(cacheKey, progressObj);
          return progressObj;
        }
      }
    } catch (e) {
      console.warn('[Roadmap Progress Fetch Notice]', e.message);
    }

    return cached || { completedStages: [], inProgressStage: 1, percentage: 0, lastUpdated: null };
  },

  // 6. Get All Started Roadmaps for Student
  async getAllUserRoadmaps(userId) {
    if (!userId) return {};
    const cacheKey = `pm_all_roadmaps_${userId}`;
    const cached = safeStorage.getItem(cacheKey, {});

    try {
      const userDoc = await getDoc(doc(db, 'users', userId));
      if (userDoc.exists()) {
        const data = userDoc.data();
        const map = data?.roadmapProgress || {};
        safeStorage.setItem(cacheKey, map);
        return map;
      }
    } catch {
      // Fallback to cache
    }
    return cached;
  },

  // 7. Save Progress & Toggle Stage Completion (with +30 XP Reward)
  async toggleStageCompletion(user, roadmapId, stageNumber) {
    if (!user?.uid || !roadmapId || !stageNumber) return null;

    const userId = user.uid;
    const currentProgress = await this.getUserRoadmapProgress(userId, roadmapId);
    let completed = [...(currentProgress.completedStages || [])];
    const isNowCompleted = !completed.includes(stageNumber);

    if (isNowCompleted) {
      completed.push(stageNumber);
      completed.sort((a, b) => a - b);
    } else {
      completed = completed.filter(s => s !== stageNumber);
    }

    // Determine in-progress stage (first uncompleted stage)
    let inProgress = 1;
    for (let i = 1; i <= 10; i++) {
      if (!completed.includes(i)) {
        inProgress = i;
        break;
      }
    }
    if (completed.length === 10) inProgress = 10;

    const percentage = Math.round((completed.length / 10) * 100);
    const updatedProgress = {
      completedStages: completed,
      inProgressStage: inProgress,
      percentage,
      lastUpdated: new Date().toISOString()
    };

    // 1. Instant Local Cache
    const cacheKey = `pm_roadmap_${userId}_${roadmapId}`;
    safeStorage.setItem(cacheKey, updatedProgress);

    const allCacheKey = `pm_all_roadmaps_${userId}`;
    const existingAll = safeStorage.getItem(allCacheKey, {});
    existingAll[roadmapId] = updatedProgress;
    safeStorage.setItem(allCacheKey, existingAll);

    // 2. Cloud Firestore Merge (Users collection, strict user isolation)
    try {
      await setDoc(
        doc(db, 'users', userId),
        {
          roadmapProgress: {
            [roadmapId]: updatedProgress
          },
          lastActive: serverTimestamp()
        },
        { merge: true }
      );
    } catch (e) {
      console.warn('[Roadmap Progress Firestore Notice]', e.message);
    }

    // 3. Award +30 XP if stage was newly completed (duplicate-proof)
    let xpResult = null;
    if (isNowCompleted) {
      try {
        const roadmapObj = this.getRoadmapById(roadmapId);
        const stageObj = roadmapObj?.stages?.find(s => s.stageNumber === stageNumber);
        const activityKey = `roadmap_${roadmapId}_stage_${stageNumber}`;

        xpResult = await progressService._applyProgressUpdate(user, {
          type: 'roadmap',
          activityKey,
          topicName: roadmapObj?.title || 'Career Roadmap',
          baseXP: 30,
          score: 100,
          passed: true,
          label: `Completed Stage ${stageNumber}: ${stageObj?.title || 'Roadmap Milestone'}`
        });
      } catch (err) {
        console.warn('[Roadmap XP Award Notice]', err);
      }
    }

    return {
      progress: updatedProgress,
      isNowCompleted,
      xpGained: isNowCompleted ? 30 : 0,
      xpResult
    };
  }
};

export const getAllRoadmaps = () => CAREER_ROADMAPS;
export const getRoadmapById = (id) => roadmapService.getRoadmapById(id);
export default roadmapService;
