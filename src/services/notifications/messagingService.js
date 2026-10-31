// ============================================
// PlaceMentor AI — FCM Web Push & Notification Service
// Token lifecycle, permission management, preferences & foreground listener
// ============================================

import { getToken, onMessage, deleteToken } from 'firebase/messaging';
import { doc, setDoc, updateDoc, deleteDoc, arrayUnion, arrayRemove, serverTimestamp } from 'firebase/firestore';
import { db, getFirebaseMessaging } from '../../config/firebase';

const VAPID_KEY = import.meta.env.VITE_FIREBASE_VAPID_KEY || '';

export const messagingService = {
  // Check if browser environment supports Web Push Notifications
  isPushSupported() {
    return (
      typeof window !== 'undefined' &&
      'Notification' in window &&
      'serviceWorker' in navigator &&
      'PushManager' in window
    );
  },

  // Get current browser permission state ('granted', 'denied', or 'default')
  getPermissionState() {
    if (!this.isPushSupported()) return 'unsupported';
    return Notification.permission;
  },

  // Request browser notification permission (ONLY triggered on user interaction)
  async requestNotificationPermission() {
    if (!this.isPushSupported()) {
      return {
        success: false,
        state: 'unsupported',
        error: 'Push notifications are not supported in this browser or private browsing mode.'
      };
    }

    try {
      const permission = await Notification.requestPermission();
      return {
        success: permission === 'granted',
        state: permission,
        error: permission === 'denied'
          ? 'Notification permission was blocked in your browser settings.'
          : permission === 'default'
          ? 'Notification permission prompt was dismissed.'
          : null
      };
    } catch (err) {
      return {
        success: false,
        state: 'error',
        error: err.message || 'Failed to request notification permission.'
      };
    }
  },

  // Register dedicated FCM Service Worker and retrieve/sync device token
  async registerDeviceToken(user) {
    if (!user?.uid) {
      return { success: false, error: 'User must be authenticated to register notification token.' };
    }

    if (!this.isPushSupported()) {
      return { success: false, error: 'Push notifications are not supported in this browser.' };
    }

    if (Notification.permission !== 'granted') {
      return { success: false, error: 'Notification permission has not been granted by the user.' };
    }

    try {
      // 1. Register or get existing /firebase-messaging-sw.js registration
      let swRegistration;
      try {
        swRegistration = await navigator.serviceWorker.register('/firebase-messaging-sw.js', {
          scope: '/'
        });
        await navigator.serviceWorker.ready;
      } catch (swErr) {
        console.error('[FCM SW Error]', swErr);
        return {
          success: false,
          error: `Service Worker registration failed: ${swErr.message}. Ensure /firebase-messaging-sw.js exists.`
        };
      }

      // 2. Obtain Firebase Messaging instance
      const messaging = await getFirebaseMessaging();
      if (!messaging) {
        return {
          success: false,
          error: 'Firebase Messaging is not supported or failed to initialize.'
        };
      }

      // 3. Retrieve FCM Web Push Token
      const tokenOptions = { serviceWorkerRegistration: swRegistration };
      if (VAPID_KEY && VAPID_KEY.trim().length > 0) {
        tokenOptions.vapidKey = VAPID_KEY.trim();
      }

      let token;
      try {
        token = await getToken(messaging, tokenOptions);
      } catch (tokenErr) {
        console.error('[FCM Token Error]', tokenErr);
        // Catch common VAPID missing error
        if (tokenErr.message?.includes('vapidKey') || !VAPID_KEY) {
          return {
            success: false,
            error: 'Missing or invalid Web Push VAPID key. Please add VITE_FIREBASE_VAPID_KEY to your .env from Firebase Console > Project Settings > Cloud Messaging.'
          };
        }
        return {
          success: false,
          error: `Failed to generate push token: ${tokenErr.message}`
        };
      }

      if (!token) {
        return {
          success: false,
          error: 'No registration token available. Check if notification permissions or VAPID keys are correct.'
        };
      }

      // 4. Save device token in Firestore under user document & subcollection
      const tokenDocId = btoa(token.slice(-32)).replace(/[/+=]/g, '_'); // sanitized key
      const tokenData = {
        token,
        userId: user.uid,
        userEmail: user.email || 'anonymous',
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        createdAt: serverTimestamp(),
        lastActive: serverTimestamp()
      };

      // Store in subcollection users/{uid}/fcm_tokens/{tokenId}
      await setDoc(doc(db, 'users', user.uid, 'fcm_tokens', tokenDocId), tokenData, { merge: true });

      // Also track in array on user profile
      await updateDoc(doc(db, 'users', user.uid), {
        fcmTokens: arrayUnion(token),
        notificationsEnabled: true
      }).catch(() => {});

      // Cache locally
      localStorage.setItem('pm_fcm_token', token);
      localStorage.setItem('pm_fcm_doc_id', tokenDocId);

      return { success: true, token };
    } catch (err) {
      console.error('[FCM Register Error]', err);
      return { success: false, error: err.message || 'Unknown error occurred while registering token.' };
    }
  },

  // Unregister / Revoke token from device & Firestore
  async removeDeviceToken(user) {
    if (!user?.uid) return { success: true };

    const token = localStorage.getItem('pm_fcm_token');
    const tokenDocId = localStorage.getItem('pm_fcm_doc_id');

    try {
      const messaging = await getFirebaseMessaging();
      if (messaging) {
        await deleteToken(messaging).catch(() => {});
      }

      if (tokenDocId) {
        await deleteDoc(doc(db, 'users', user.uid, 'fcm_tokens', tokenDocId)).catch(() => {});
      }

      if (token) {
        await updateDoc(doc(db, 'users', user.uid), {
          fcmTokens: arrayRemove(token),
          notificationsEnabled: false
        }).catch(() => {});
      }

      localStorage.removeItem('pm_fcm_token');
      localStorage.removeItem('pm_fcm_doc_id');

      return { success: true };
    } catch (err) {
      console.warn('[FCM Remove Token Warning]', err);
      localStorage.removeItem('pm_fcm_token');
      localStorage.removeItem('pm_fcm_doc_id');
      return { success: false, error: err.message };
    }
  },

  // Save student notification category preferences
  async saveNotificationPreferences(uid, preferences) {
    if (!uid) return;
    try {
      const ref = doc(db, 'users', uid);
      await setDoc(ref, {
        notificationPreferences: {
          dailyMotivation: preferences.dailyMotivation ?? true,
          studyReminders: preferences.studyReminders ?? true,
          jobAlerts: preferences.jobAlerts ?? true,
          updatedAt: serverTimestamp()
        }
      }, { merge: true });
      return { success: true };
    } catch (err) {
      console.error('[FCM Preferences Error]', err);
      return { success: false, error: err.message };
    }
  },

  // Listen to foreground notifications when tab is open and focused
  async setupForegroundListener(onNotificationReceived) {
    const messaging = await getFirebaseMessaging();
    if (!messaging) return () => {};

    return onMessage(messaging, (payload) => {
      console.log('[FCM] Foreground notification received:', payload);
      if (onNotificationReceived) {
        onNotificationReceived(payload);
      }
    });
  },

  // Trigger end-to-end push test via the secure server backend (tests real FCM delivery)
  async triggerBackendTestPush(user) {
    if (!this.isPushSupported()) {
      return { success: false, error: 'Web push is unsupported in this browser.' };
    }
    if (Notification.permission !== 'granted') {
      return { success: false, error: 'Notification permission is not granted. Click "Enable Notifications" first.' };
    }
    if (!user) {
      return { success: false, error: 'You must be signed in to perform an end-to-end push test.' };
    }

    try {
      const idToken = await user.getIdToken();
      const response = await fetch('/api/send-push', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`
        },
        body: JSON.stringify({
          title: '🎉 PlaceMentor AI End-to-End Test',
          body: 'Push delivery confirmed via FCM Server! Your device is ready to receive reminders.',
          url: '/settings',
          category: 'testNotification'
        })
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok || !data.success) {
        return {
          success: false,
          error: data.error || `Server responded with status ${response.status}.`
        };
      }

      if (data.sentCount === 0) {
        return {
          success: false,
          error: data.message || 'No registered device tokens found on server. Try disabling and re-enabling notifications.'
        };
      }

      return {
        success: true,
        sentCount: data.sentCount,
        message: `FCM push confirmed! Dispatched to ${data.sentCount} active device(s).`
      };
    } catch (err) {
      console.warn('[FCM Backend Test Warning]', err);
      return {
        success: false,
        error: `Could not reach push server: ${err.message}`
      };
    }
  },

  // Trigger test notification locally via the active Service Worker
  async triggerLocalTestPush() {
    if (!this.isPushSupported()) {
      return { success: false, error: 'Web push is unsupported in this browser.' };
    }
    if (Notification.permission !== 'granted') {
      return { success: false, error: 'Notification permission is not granted. Click "Enable Notifications" first.' };
    }

    try {
      const swReg = await navigator.serviceWorker.getRegistration('/firebase-messaging-sw.js') ||
                    await navigator.serviceWorker.ready;

      if (!swReg) {
        return { success: false, error: 'No active Service Worker found to display notification.' };
      }

      await swReg.showNotification('🎉 PlaceMentor AI Notification Test', {
        body: 'Push notifications are working! You will receive daily motivation, study reminders, and job alerts.',
        icon: '/pwa-192x192.png',
        badge: '/favicon.svg',
        tag: 'test-notification',
        data: {
          url: '/settings',
          timestamp: Date.now()
        }
      });

      return { success: true };
    } catch (err) {
      return { success: false, error: `Failed to show test notification: ${err.message}` };
    }
  }
};
