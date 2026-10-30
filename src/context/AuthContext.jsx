// ============================================
// PlaceMentor AI — Auth Context (Firebase)
// Resilient Profile Synchronization & Safe Merging
// ============================================
import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db, googleProvider } from '../config/firebase';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  // Synchronize registered user in local cache for admin portal reliability
  const cacheUserInRegistry = (userData) => {
    try {
      const existing = JSON.parse(localStorage.getItem('pm_users_data') || '[]');
      const index = existing.findIndex(u => u.uid === userData.uid || u.id === userData.uid);
      if (index >= 0) {
        existing[index] = { ...existing[index], ...userData };
      } else {
        existing.unshift(userData);
      }
      localStorage.setItem('pm_users_data', JSON.stringify(existing));
    } catch {
      // Ignore cache storage errors
    }
  };

  // Safe, Idempotent Profile Synchronization
  // Ensures users/{uid} always exists using the Firebase User's UID as document ID
  // Preserves existing scores, XP, streaks, and badges using safe merge
  async function syncUserProfile(firebaseUser, additionalData = {}) {
    if (!firebaseUser?.uid) return null;

    const uid = firebaseUser.uid;
    const docRef = doc(db, 'users', uid);

    try {
      const snap = await getDoc(docRef);

      if (snap.exists()) {
        // Document exists: Preserve existing stats and perform safe merge
        const existingData = snap.data();
        const updatedFields = {
          email: firebaseUser.email || existingData.email || '',
          displayName: additionalData.displayName || existingData.displayName || firebaseUser.displayName || 'Student',
          photoURL: firebaseUser.photoURL || existingData.photoURL || null,
          lastActive: serverTimestamp(),
          ...additionalData,
        };

        await setDoc(docRef, updatedFields, { merge: true });
        const mergedProfile = { ...existingData, ...updatedFields, uid };
        setUserProfile(mergedProfile);
        cacheUserInRegistry(mergedProfile);
        return mergedProfile;
      } else {
        // Document does not exist: Initialize new candidate profile
        const newProfile = {
          uid,
          email: firebaseUser.email || '',
          displayName: additionalData.displayName || firebaseUser.displayName || 'Student',
          photoURL: firebaseUser.photoURL || null,
          role: firebaseUser.email?.includes('admin') ? 'admin' : 'student',
          targetCompany: additionalData.targetCompany || 'Google',
          branch: additionalData.branch || 'Computer Science',
          preferredLanguage: additionalData.preferredLanguage || 'Python',
          streak: 0,
          xp: 0,
          level: 1,
          codingScore: 0,
          aptitudeScore: 0,
          interviewScore: 0,
          placementReadiness: 0,
          badges: [],
          friends: [],
          profileComplete: false,
          nekoLevel: 1,
          nekoOutfits: [],
          createdAt: serverTimestamp(),
          lastActive: serverTimestamp(),
          ...additionalData,
        };

        await setDoc(docRef, newProfile, { merge: true });
        setUserProfile(newProfile);
        cacheUserInRegistry(newProfile);
        return newProfile;
      }
    } catch (err) {
      console.warn('[Firestore Profile Sync Notice]', err);
      // Fallback: If Firestore write was blocked by rules, construct local profile
      const localProfile = {
        uid,
        email: firebaseUser.email || '',
        displayName: additionalData.displayName || firebaseUser.displayName || 'Student',
        photoURL: firebaseUser.photoURL || null,
        role: firebaseUser.email?.includes('admin') ? 'admin' : 'student',
        targetCompany: 'Google',
        branch: 'Computer Science',
        preferredLanguage: 'Python',
        streak: 0,
        xp: 0,
        level: 1,
        codingScore: 0,
        aptitudeScore: 0,
        interviewScore: 0,
        placementReadiness: 0,
        badges: [],
        friends: [],
        profileComplete: false,
        createdAt: new Date().toISOString(),
        lastActive: new Date().toISOString(),
        ...additionalData
      };
      setUserProfile(prev => prev || localProfile);
      cacheUserInRegistry(localProfile);
      return localProfile;
    }
  }

  // Listen to Firebase auth state and automatically synchronize profile
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        await syncUserProfile(firebaseUser);
      } else {
        setUser(null);
        setUserProfile(null);
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  // Handle redirect sign-in outcome (for mobile PWA / standalone environments)
  useEffect(() => {
    getRedirectResult(auth)
      .then(async (result) => {
        if (result?.user) {
          const isNew = result._tokenResponse?.isNewUser;
          await syncUserProfile(result.user, {
            displayName: result.user.displayName,
            email: result.user.email,
            photoURL: result.user.photoURL,
          });
          setUser(result.user);
        }
      })
      .catch((err) => {
        console.warn('[Redirect Auth Handler Notice]', err.code, err.message);
      });
  }, []);

  // Fetch Firestore user profile
  async function fetchUserProfile(uid) {
    if (!uid) return;
    try {
      const docRef = doc(db, 'users', uid);
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        const data = snap.data();
        setUserProfile(data);
        cacheUserInRegistry({ id: uid, uid, ...data });
      }
    } catch (err) {
      console.warn('Error fetching profile:', err);
    }
  }

  // Create or Merge Firestore profile document
  async function createUserProfile(uid, data) {
    const profileData = {
      uid,
      ...data,
      streak: data.streak ?? 0,
      xp: data.xp ?? 0,
      level: data.level ?? 1,
      codingScore: data.codingScore ?? 0,
      aptitudeScore: data.aptitudeScore ?? 0,
      interviewScore: data.interviewScore ?? 0,
      placementReadiness: data.placementReadiness ?? 0,
      badges: data.badges ?? [],
      friends: data.friends ?? [],
      lastActive: serverTimestamp(),
      nekoLevel: data.nekoLevel ?? 1,
    };

    try {
      await setDoc(doc(db, 'users', uid), profileData, { merge: true });
    } catch (err) {
      console.warn('[createUserProfile Firestore Notice]', err);
    }

    setUserProfile(prev => ({ ...prev, ...profileData }));
    cacheUserInRegistry({ id: uid, ...profileData });
    return profileData;
  }

  // Email/Password signup
  async function signup(email, password, displayName) {
    setAuthError(null);
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    if (displayName) {
      await updateProfile(cred.user, { displayName }).catch(() => {});
    }
    // Immediately ensure profile document exists in Firestore
    await syncUserProfile(cred.user, { displayName, email });
    return cred.user;
  }

  // Email/Password login
  async function login(email, password) {
    setAuthError(null);
    const cred = await signInWithEmailAndPassword(auth, email, password);
    // Ensure profile document exists and updates lastActive
    await syncUserProfile(cred.user);
    return cred.user;
  }

  // Google Sign-In with popup + mobile redirect fallback
  async function loginWithGoogle({ forceRedirect = false } = {}) {
    setAuthError(null);
    const isMobile = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);

    if (forceRedirect) {
      await signInWithRedirect(auth, googleProvider);
      return { isRedirecting: true };
    }

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const isNew = result._tokenResponse?.isNewUser;
      const profile = await syncUserProfile(result.user, {
        displayName: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL,
      });
      return { user: result.user, isNew, profile };
    } catch (popupErr) {
      console.warn('[Google Auth Notice]', popupErr.code, popupErr.message);
      // If running on mobile/PWA and popup was blocked or dismissed, fall back to redirect
      if (isMobile && (popupErr.code === 'auth/popup-blocked' || popupErr.code === 'auth/popup-closed-by-user')) {
        console.info('[Google Auth] Falling back to signInWithRedirect for mobile...');
        await signInWithRedirect(auth, googleProvider);
        return { isRedirecting: true };
      }
      throw popupErr;
    }
  }

  // Forgot password
  async function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  // Logout
  async function logout() {
    await signOut(auth);
    sessionStorage.removeItem('pm_admin_session_auth');
  }

  // Update user profile in Firestore (safe merge)
  async function updateUserProfile(data) {
    if (!user) return;
    const ref = doc(db, 'users', user.uid);
    try {
      await setDoc(ref, { ...data, lastActive: serverTimestamp() }, { merge: true });
    } catch (err) {
      console.warn('[updateUserProfile Firestore Notice]', err);
    }
    const updated = { ...userProfile, ...data };
    setUserProfile(updated);
    cacheUserInRegistry({ id: user.uid, uid: user.uid, ...updated });
  }

  const value = {
    user,
    userProfile,
    loading,
    authError,
    setAuthError,
    signup,
    login,
    loginWithGoogle,
    resetPassword,
    logout,
    createUserProfile,
    updateUserProfile,
    fetchUserProfile,
    syncUserProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
