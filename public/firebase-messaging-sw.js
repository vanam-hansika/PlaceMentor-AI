// ============================================
// PlaceMentor AI — Firebase Cloud Messaging Service Worker
// Background push notification listener & action dispatcher
// ============================================

/* eslint-disable no-undef */
importScripts('https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.14.1/firebase-messaging-compat.js');

// Initialize Firebase inside the Service Worker context
firebase.initializeApp({
  apiKey: "AIzaSyDoL7n4zoDqv09TQHhaIeHMJHKcRFFY9Ks",
  authDomain: "placementor-ai-e0460.firebaseapp.com",
  projectId: "placementor-ai-e0460",
  storageBucket: "placementor-ai-e0460.firebasestorage.app",
  messagingSenderId: "992671750483",
  appId: "1:992671750483:web:7afd8dde9e66fa2f9b69a6"
});

const messaging = firebase.messaging();

// Handle Background Push Messages
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background push message:', payload);

  const notificationTitle = payload.notification?.title || payload.data?.title || 'PlaceMentor AI Notification';
  const notificationOptions = {
    body: payload.notification?.body || payload.data?.body || 'You have a new update in PlaceMentor AI.',
    icon: payload.notification?.icon || payload.data?.icon || '/pwa-192x192.png',
    badge: '/favicon.svg',
    tag: payload.data?.tag || 'placementor-general',
    data: {
      url: payload.data?.url || payload.fcmOptions?.link || '/dashboard',
      timestamp: Date.now()
    },
    vibrate: [100, 50, 100],
    requireInteraction: false
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle Notification Click -> Open or Focus PlaceMentor AI Tab
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const targetUrl = event.notification.data?.url || '/dashboard';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
      // Check if PlaceMentor AI is already open in any browser tab
      for (let i = 0; i < windowClients.length; i++) {
        const client = windowClients[i];
        if (client.url.includes(self.location.origin) && 'focus' in client) {
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
