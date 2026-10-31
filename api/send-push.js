// ============================================
// PlaceMentor AI — Secure Push Notification API
// Vercel Serverless Function (Node.js)
// Accepts authenticated dispatches from n8n and client test requests
// ============================================

import admin from 'firebase-admin';

// Initialize Firebase Admin singleton
function getFirebaseAdmin() {
  if (admin.apps.length > 0) {
    return admin;
  }

  // 1. Full service account JSON in single environment variable
  if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    try {
      let raw = process.env.FIREBASE_SERVICE_ACCOUNT_KEY.trim();
      if ((raw.startsWith("'") && raw.endsWith("'")) || (raw.startsWith('"') && raw.endsWith('"'))) {
        raw = raw.slice(1, -1).trim();
      }
      if (!raw.startsWith('{') && raw.length > 50) {
        try {
          const decoded = Buffer.from(raw, 'base64').toString('utf8');
          if (decoded.startsWith('{')) {
            raw = decoded;
          }
        } catch {}
      }

      const serviceAccount = typeof raw === 'string' ? JSON.parse(raw) : raw;
      if (serviceAccount.private_key) {
        serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');
      }
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
      });
      return admin;
    } catch (err) {
      console.error('[FCM Admin] Failed to parse FIREBASE_SERVICE_ACCOUNT_KEY:', err.message);
      throw new Error(`FIREBASE_SERVICE_ACCOUNT_KEY failed: ${err.message}`);
    }
  }

  // 2. Discrete environment variables
  if (
    process.env.FIREBASE_PROJECT_ID &&
    process.env.FIREBASE_CLIENT_EMAIL &&
    process.env.FIREBASE_PRIVATE_KEY
  ) {
    try {
      const privateKey = process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n');
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey
        })
      });
      return admin;
    } catch (err) {
      console.error('[FCM Admin] Failed to initialize with discrete credentials:', err.message);
    }
  }

  // 3. Fallback to application default credentials (e.g. GOOGLE_APPLICATION_CREDENTIALS)
  try {
    admin.initializeApp({
      credential: admin.credential.applicationDefault()
    });
    return admin;
  } catch (err) {
    console.error('[FCM Admin] Application default credentials failed:', err.message);
  }

  throw new Error('Firebase Admin credentials not configured on server.');
}

const ALLOWED_CATEGORIES = ['dailyMotivation', 'studyReminders', 'jobAlerts', 'testNotification'];

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-api-key');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed. Use POST.' });
  }

  let firebaseAdmin;
  try {
    firebaseAdmin = getFirebaseAdmin();
  } catch (err) {
    console.error('[FCM Admin] Initialization error:', err.message);
    return res.status(500).json({
      success: false,
      error: `Server initialization error: ${err.message}`
    });
  }

  const authHeader = req.headers['authorization'];
  const apiKeyHeader = req.headers['x-api-key'];
  const expectedSecret = process.env.N8N_PUSH_SECRET;

  let authContext = null;

  // 1. Validate n8n shared secret (via x-api-key or Bearer secret)
  if (expectedSecret && expectedSecret.trim().length > 0) {
    if (apiKeyHeader && apiKeyHeader === expectedSecret) {
      authContext = { type: 'n8n', isServiceAdmin: true };
    } else if (authHeader && authHeader === `Bearer ${expectedSecret}`) {
      authContext = { type: 'n8n', isServiceAdmin: true };
    }
  }

  // 2. Validate Firebase User ID Token (for frontend test button)
  if (!authContext && authHeader && authHeader.startsWith('Bearer ')) {
    const idToken = authHeader.split('Bearer ')[1]?.trim();
    if (idToken) {
      try {
        const decoded = await firebaseAdmin.auth().verifyIdToken(idToken);
        authContext = {
          type: 'user',
          uid: decoded.uid,
          email: decoded.email,
          isServiceAdmin: false
        };
      } catch (tokenErr) {
        return res.status(401).json({
          success: false,
          error: 'Invalid or expired Firebase authentication token.'
        });
      }
    }
  }

  if (!authContext) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized: Missing or invalid authentication credentials.'
    });
  }

  // Parse and validate payload
  const body = req.body || {};
  const title = typeof body.title === 'string' ? body.title.trim().slice(0, 120) : '';
  const messageBody = typeof body.body === 'string' ? body.body.trim().slice(0, 300) : '';
  const url = typeof body.url === 'string' && body.url.trim().length > 0 ? body.url.trim() : '/dashboard';
  const category = body.category && ALLOWED_CATEGORIES.includes(body.category)
    ? body.category
    : 'dailyMotivation';

  if (!title || !messageBody) {
    return res.status(400).json({
      success: false,
      error: 'Missing required payload fields: title and body are required.'
    });
  }

  // Target selection
  let targetUserId = body.userId;
  const isBroadcast = Boolean(body.broadcast);

  // If request is from an authenticated user (frontend test button), enforce user isolation
  if (authContext.type === 'user') {
    targetUserId = authContext.uid;
    if (isBroadcast) {
      return res.status(403).json({
        success: false,
        error: 'Forbidden: Broadcast notifications can only be triggered by automated services.'
      });
    }
  }

  const db = firebaseAdmin.firestore();
  const messaging = firebaseAdmin.messaging();

  try {
    const tokensToTarget = []; // array of { token, docId, userId }

    if (isBroadcast && authContext.isServiceAdmin) {
      // Query all eligible users
      const usersSnap = await db.collection('users').get();
      for (const userDoc of usersSnap.docs) {
        const userData = userDoc.data();
        if (userData.notificationsEnabled === false) continue;
        if (category !== 'testNotification' && userData.notificationPreferences?.[category] === false) {
          continue;
        }

        const tokensSnap = await userDoc.ref.collection('fcm_tokens').get();
        tokensSnap.forEach((tDoc) => {
          const t = tDoc.data()?.token;
          if (t && !tokensToTarget.some((x) => x.token === t)) {
            tokensToTarget.push({ token: t, docId: tDoc.id, userId: userDoc.id });
          }
        });
      }
    } else {
      if (!targetUserId) {
        return res.status(400).json({
          success: false,
          error: 'A target userId must be specified, or broadcast must be enabled by an authorized service.'
        });
      }

      const userDocRef = db.collection('users').doc(targetUserId);
      const userDoc = await userDocRef.get();

      if (!userDoc.exists) {
        return res.status(404).json({
          success: false,
          error: 'Specified user does not exist.'
        });
      }

      const userData = userDoc.data() || {};

      // Check user preferences
      if (userData.notificationsEnabled === false) {
        return res.status(200).json({
          success: true,
          message: 'Notification skipped: User has disabled notifications in their settings.',
          sentCount: 0,
          failureCount: 0
        });
      }

      if (category !== 'testNotification' && userData.notificationPreferences?.[category] === false) {
        return res.status(200).json({
          success: true,
          message: `Notification skipped: User has muted category "${category}".`,
          sentCount: 0,
          failureCount: 0
        });
      }

      // Read device tokens
      const tokensSnap = await userDocRef.collection('fcm_tokens').get();
      tokensSnap.forEach((tDoc) => {
        const t = tDoc.data()?.token;
        if (t && !tokensToTarget.some((x) => x.token === t)) {
          tokensToTarget.push({ token: t, docId: tDoc.id, userId: targetUserId });
        }
      });

      // Check fallback array on root user doc
      if (tokensToTarget.length === 0 && Array.isArray(userData.fcmTokens)) {
        userData.fcmTokens.forEach((t) => {
          if (t && typeof t === 'string' && !tokensToTarget.some((x) => x.token === t)) {
            tokensToTarget.push({ token: t, docId: null, userId: targetUserId });
          }
        });
      }
    }

    if (tokensToTarget.length === 0) {
      return res.status(200).json({
        success: true,
        message: 'No active device tokens found for the requested target.',
        sentCount: 0,
        failureCount: 0
      });
    }

    // Chunk into batches of up to 500 (FCM sendEachForMulticast limit)
    const tokenStrings = tokensToTarget.map((item) => item.token);
    let totalSuccess = 0;
    let totalFailure = 0;
    const staleTokens = [];

    const BATCH_SIZE = 500;
    for (let i = 0; i < tokenStrings.length; i += BATCH_SIZE) {
      const batchTokens = tokenStrings.slice(i, i + BATCH_SIZE);
      const batchItems = tokensToTarget.slice(i, i + BATCH_SIZE);

      const fcmResponse = await messaging.sendEachForMulticast({
        tokens: batchTokens,
        notification: {
          title,
          body: messageBody
        },
        data: {
          url,
          category,
          timestamp: String(Date.now())
        },
        webpush: {
          notification: {
            icon: '/pwa-192x192.png',
            badge: '/favicon.svg'
          },
          fcmOptions: {
            link: url
          }
        }
      });

      totalSuccess += fcmResponse.successCount;
      totalFailure += fcmResponse.failureCount;

      // Identify expired/invalid tokens for automatic pruning
      if (fcmResponse.failureCount > 0) {
        fcmResponse.responses.forEach((resp, idx) => {
          if (!resp.success) {
            const errCode = resp.error?.code;
            if (
              errCode === 'messaging/registration-token-not-registered' ||
              errCode === 'messaging/invalid-registration-token'
            ) {
              staleTokens.push(batchItems[idx]);
            }
          }
        });
      }
    }

    // Prune stale tokens asynchronously in the background
    if (staleTokens.length > 0) {
      for (const stale of staleTokens) {
        try {
          if (stale.docId && stale.userId) {
            await db
              .collection('users')
              .doc(stale.userId)
              .collection('fcm_tokens')
              .doc(stale.docId)
              .delete();
          }
          if (stale.userId && stale.token) {
            await db
              .collection('users')
              .doc(stale.userId)
              .update({
                fcmTokens: admin.firestore.FieldValue.arrayRemove(stale.token)
              });
          }
        } catch (cleanupErr) {
          console.warn('[FCM Prune Warning] Could not delete stale token:', cleanupErr.message);
        }
      }
    }

    return res.status(200).json({
      success: true,
      message: `Push notification dispatched.`,
      sentCount: totalSuccess,
      failureCount: totalFailure
    });
  } catch (err) {
    console.error('[FCM Dispatch Error]', err.message);
    return res.status(500).json({
      success: false,
      error: 'An internal error occurred while dispatching the push notification.'
    });
  }
}
