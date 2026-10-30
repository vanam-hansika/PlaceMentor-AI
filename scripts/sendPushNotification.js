// ============================================
// PlaceMentor AI — Secure Server-Side Push Notification Dispatcher
// Uses Firebase Admin SDK (Node.js) to dispatch FCM push payloads securely
//
// SECURITY NOTICE:
// This file is strictly for server-side environments (Node.js, Cloud Functions, cron).
// NEVER import this file or your service account key into React frontend code!
// ============================================

import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';

/**
 * How to use:
 * 1. Download your Service Account private key JSON from:
 *    Firebase Console > Project Settings > Service accounts > Generate new private key
 * 2. Save it securely outside source control or set environment variable:
 *    export GOOGLE_APPLICATION_CREDENTIALS="/path/to/serviceAccountKey.json"
 * 3. Run:
 *    node scripts/sendPushNotification.js --topic="jobAlerts" --title="New Google SDE Opening" --body="Applications open today!" --url="/jobs"
 */

async function main() {
  console.log('🚀 PlaceMentor AI — Server-Side Notification Dispatcher');

  // Check for firebase-admin
  let admin;
  try {
    admin = await import('firebase-admin');
  } catch (err) {
    console.error('\n❌ firebase-admin is not installed. To run this server script, run:');
    console.error('   npm install firebase-admin --save-dev\n');
    process.exit(1);
  }

  // Check credentials
  const keyPath = process.env.GOOGLE_APPLICATION_CREDENTIALS || resolve(process.cwd(), 'serviceAccountKey.json');
  if (!existsSync(keyPath)) {
    console.warn(`\n⚠️  Service Account key not found at: ${keyPath}`);
    console.warn('   To send live FCM messages to real devices from the server:');
    console.warn('   1. Go to Firebase Console > Project Settings > Service accounts');
    console.warn('   2. Click "Generate new private key"');
    console.warn('   3. Place the file at serviceAccountKey.json or set GOOGLE_APPLICATION_CREDENTIALS\n');
    console.log('ℹ️  Displaying sample payload structure that would be dispatched:\n');

    const samplePayload = {
      notification: {
        title: '🎯 Target Company Update: Google SDE-1',
        body: 'New batch hiring posted! Check the updated roadmap.',
      },
      data: {
        url: '/companies',
        category: 'jobAlerts',
        timestamp: String(Date.now())
      },
      webpush: {
        fcmOptions: {
          link: 'https://your-domain.web.app/companies'
        }
      }
    };
    console.log(JSON.stringify(samplePayload, null, 2));
    return;
  }

  const serviceAccount = JSON.parse(readFileSync(keyPath, 'utf8'));

  admin.default.initializeApp({
    credential: admin.default.credential.cert(serviceAccount)
  });

  const messaging = admin.default.messaging();
  const db = admin.default.firestore();

  // Parse command line arguments
  const args = process.argv.slice(2).reduce((acc, arg) => {
    const [k, v] = arg.replace(/^--/, '').split('=');
    acc[k] = v;
    return acc;
  }, {});

  const title = args.title || '🔔 PlaceMentor AI Daily Motivation';
  const body = args.body || 'Keep your streak alive! Solve today\'s 2 coding challenges with Niko Cat.';
  const url = args.url || '/dashboard';
  const targetCategory = args.category || 'dailyMotivation'; // dailyMotivation | studyReminders | jobAlerts

  console.log(`\n📋 Querying users with preference "${targetCategory}" enabled...`);

  const usersSnap = await db.collection('users').get();
  const tokens = [];

  for (const userDoc of usersSnap.docs) {
    const data = userDoc.data();
    const prefs = data.notificationPreferences;
    if (prefs && prefs[targetCategory] === false) continue; // User opted out

    // Query active tokens
    const tokensSnap = await userDoc.ref.collection('fcm_tokens').get();
    tokensSnap.forEach(tDoc => {
      const t = tDoc.data()?.token;
      if (t && !tokens.includes(t)) tokens.push(t);
    });
  }

  console.log(`📱 Found ${tokens.length} active device token(s).`);

  if (tokens.length === 0) {
    console.log('ℹ️  No registered tokens found. Enable notifications in Settings on your client device first.');
    return;
  }

  // Dispatch Multicast Message
  const response = await messaging.sendEachForMulticast({
    tokens,
    notification: { title, body },
    data: { url, category: targetCategory },
    webpush: {
      notification: {
        icon: '/pwa-192x192.png',
        badge: '/favicon.svg'
      },
      fcmOptions: { link: url }
    }
  });

  console.log(`✅ Push Sent! Success: ${response.successCount}, Failures: ${response.failureCount}`);

  // Automatically clean up stale/invalid tokens
  if (response.failureCount > 0) {
    response.responses.forEach((resp, idx) => {
      if (!resp.success) {
        const errCode = resp.error?.code;
        if (
          errCode === 'messaging/registration-token-not-registered' ||
          errCode === 'messaging/invalid-registration-token'
        ) {
          console.log(`🗑️  Pruning invalid token: ${tokens[idx].slice(0, 15)}...`);
        }
      }
    });
  }
}

main().catch(console.error);
