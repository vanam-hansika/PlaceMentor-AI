// ============================================
// PlaceMentor AI — Firebase SDK Initialization
// ============================================
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDoL7n4zoDqv09TQHhaIeHMJHKcRFFY9Ks",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "placementor-ai-e0460.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "placementor-ai-e0460",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "placementor-ai-e0460.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "992671750483",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:992671750483:web:7afd8dde9e66fa2f9b69a6",
  measurementId: "G-XDXZ93J7FR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Auth & Firestore exports
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);

export default app;
