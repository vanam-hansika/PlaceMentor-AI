// ============================================
// PlaceMentor AI — Auth Context (Firebase)
// ============================================
import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
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

  // Listen to Firebase auth state
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        await fetchUserProfile(firebaseUser.uid);
      } else {
        setUser(null);
        setUserProfile(null);
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  // Fetch Firestore user profile
  async function fetchUserProfile(uid) {
    try {
      const docRef = doc(db, 'users', uid);
      const snap = await getDoc(docRef);
      if (snap.exists()) setUserProfile(snap.data());
    } catch (err) {
      console.error('Error fetching profile:', err);
    }
  }

  // Create Firestore profile document
  async function createUserProfile(uid, data) {
    const profileData = {
      uid,
      ...data,
      streak: 0,
      xp: 0,
      level: 1,
      codingScore: 0,
      aptitudeScore: 0,
      interviewScore: 0,
      placementReadiness: 0,
      badges: [],
      friends: [],
      createdAt: serverTimestamp(),
      lastActive: serverTimestamp(),
      nekoLevel: 1,
      nekoOutfits: [],
    };
    await setDoc(doc(db, 'users', uid), profileData);
    setUserProfile(profileData);
    return profileData;
  }

  // Email/Password signup
  async function signup(email, password, displayName) {
    setAuthError(null);
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(cred.user, { displayName });
    return cred.user;
  }

  // Email/Password login
  async function login(email, password) {
    setAuthError(null);
    return signInWithEmailAndPassword(auth, email, password);
  }

  // Google Sign-In
  async function loginWithGoogle() {
    setAuthError(null);
    const result = await signInWithPopup(auth, googleProvider);
    const isNew = result._tokenResponse?.isNewUser;
    if (isNew) {
      await createUserProfile(result.user.uid, {
        displayName: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL,
        profileComplete: false,
      });
    } else {
      await fetchUserProfile(result.user.uid);
    }
    return { user: result.user, isNew };
  }

  // Forgot password
  async function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  // Logout
  async function logout() {
    await signOut(auth);
  }

  // Update user profile in Firestore
  async function updateUserProfile(data) {
    if (!user) return;
    const ref = doc(db, 'users', user.uid);
    await setDoc(ref, { ...data, lastActive: serverTimestamp() }, { merge: true });
    setUserProfile(prev => ({ ...prev, ...data }));
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
