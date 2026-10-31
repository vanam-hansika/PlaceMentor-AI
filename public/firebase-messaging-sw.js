// ============================================
// PlaceMentor AI — Firebase Cloud Messaging Service Worker
// Background push notification listener & action dispatcher
// ============================================

/* eslint-disable no-undef */

// 1. Initialize Firebase Compat SDK for FCM Web
try {
  importScripts('https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js');
  importScripts('https://www.gstatic.com/firebasejs/10.14.1/firebase-messaging-compat.js');

  if (typeof firebase !== 'undefined' && (!firebase.apps || !firebase.apps.length)) {
    firebase.initializeApp({
      apiKey: "AIzaSyDoL7n4zoDqv09TQHhaIeHMJHKcRFFY9Ks",
      authDomain: "placementor-ai-e0460.firebaseapp.com",
      projectId: "placementor-ai-e0460",
      storageBucket: "placementor-ai-e0460.firebasestorage.app",
      messagingSenderId: "992671750483",
      appId: "1:992671750483:web:7afd8dde9e66fa2f9b69a6"
    });
  }
} catch (sdkErr) {
  console.warn('[FCM SW] Firebase Compat SDK script load warning:', sdkErr);
}

// Track recently displayed notification tags to prevent duplicates between FCM and native handlers
const recentlyDisplayed = new Map();

function shouldDisplayNotification(tag) {
  const now = Date.now();
  if (recentlyDisplayed.has(tag) && (now - recentlyDisplayed.get(tag)) < 3000) {
    return false;
  }
  recentlyDisplayed.set(tag, now);
  // Clean up old entries
  if (recentlyDisplayed.size > 50) {
    for (const [k, time] of recentlyDisplayed.entries()) {
      if (now - time > 10000) recentlyDisplayed.delete(k);
    }
  }
  return true;
}

// 2. Setup Firebase Messaging Background Listener (if compat initialized)
try {
  if (typeof firebase !== 'undefined' && firebase.messaging) {
    const messaging = firebase.messaging();

    messaging.onBackgroundMessage((payload) => {
      console.log('[FCM SW] Received background push via FCM onBackgroundMessage:', payload);

      const title = payload.notification?.title || payload.data?.title || 'PlaceMentor AI';
      const body = payload.notification?.body || payload.data?.body || 'New notification update.';
      const url = payload.data?.url || payload.data?.relativeUrl || payload.fcmOptions?.link || '/dashboard';
      const icon = payload.notification?.icon || payload.data?.icon || '/pwa-192x192.png';
      const badge = payload.notification?.badge || payload.data?.badge || '/pwa-192x192.png';
      const tag = payload.data?.tag || payload.notification?.tag || `pm-${payload.data?.category || 'general'}`;

      if (!shouldDisplayNotification(tag)) {
        return Promise.resolve();
      }

      const notificationOptions = {
        body,
        icon,
        badge,
        tag,
        data: {
          url,
          timestamp: Date.now()
        },
        vibrate: [150, 50, 150],
        renotify: true,
        requireInteraction: true
      };

      return self.registration.showNotification(title, notificationOptions);
    });
  }
} catch (bgErr) {
  console.warn('[FCM SW] onBackgroundMessage setup notice:', bgErr);
}

// 3. Native Service Worker Push Event Fallback
// Guarantees delivery on Android Chrome even if Firebase compat is slow or receives a mixed payload
self.addEventListener('push', (event) => {
  if (!event.data) return;

  let payload = {};
  try {
    payload = event.data.json();
  } catch {
    payload = { notification: { title: 'PlaceMentor AI', body: event.data.text() } };
  }

  const title = payload.notification?.title || payload.data?.title || 'PlaceMentor AI';
  const body = payload.notification?.body || payload.data?.body || 'You have a new update in PlaceMentor AI.';
  const url = payload.data?.url || payload.data?.relativeUrl || payload.fcmOptions?.link || '/dashboard';
  const icon = payload.notification?.icon || payload.data?.icon || '/pwa-192x192.png';
  const badge = payload.notification?.badge || payload.data?.badge || '/pwa-192x192.png';
  const tag = payload.data?.tag || payload.notification?.tag || `pm-${payload.data?.category || 'general'}`;

  if (!shouldDisplayNotification(tag)) {
    return;
  }

  const notificationOptions = {
    body,
    icon,
    badge,
    tag,
    data: {
      url,
      timestamp: Date.now()
    },
    vibrate: [150, 50, 150],
    renotify: true,
    requireInteraction: true
  };

  event.waitUntil(
    self.registration.showNotification(title, notificationOptions)
  );
});

// 4. Handle Notification Click -> Open or Focus PlaceMentor AI Tab
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const rawUrl = event.notification.data?.url || '/dashboard';
  const targetUrl = rawUrl.startsWith('http')
    ? rawUrl
    : new URL(rawUrl, self.location.origin).href;

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
      // Check if PlaceMentor AI is already open in any browser tab
      for (let i = 0; i < windowClients.length; i++) {
        const client = windowClients[i];
        if (client.url.startsWith(self.location.origin) && 'focus' in client) {
          if ('navigate' in client && targetUrl) {
            client.navigate(targetUrl);
          }
          return client.focus();
        }
      }
      // If no tab is open, open a new window
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});
