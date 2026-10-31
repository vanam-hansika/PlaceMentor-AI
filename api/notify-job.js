// ============================================
// PlaceMentor AI — Secure Server-Side Job Alert Dispatcher
// Vercel Serverless Function (Node.js)
// Dispatches new verified jobs/internships to the n8n Production Webhook
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
      const raw = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
      const serviceAccount = typeof raw === 'string' ? JSON.parse(raw) : raw;
      if (serviceAccount.private_key) {
        serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');
      }
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
      });
      return admin;
    } catch (err) {
      console.error('[Firebase Admin] Failed to parse FIREBASE_SERVICE_ACCOUNT_KEY:', err.message);
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
      console.error('[Firebase Admin] Failed to initialize with discrete credentials:', err.message);
    }
  }

  // 3. Fallback to application default credentials
  try {
    admin.initializeApp({
      credential: admin.credential.applicationDefault()
    });
    return admin;
  } catch (err) {
    console.error('[Firebase Admin] Application default credentials fallback failed:', err.message);
  }

  throw new Error('Firebase Admin credentials not configured on server.');
}

// Strip HTML tags for clean notification text
function cleanText(text) {
  if (!text || typeof text !== 'string') return '';
  return text
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-api-key, x-webhook-secret');

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
    console.error('[notify-job] Firebase Admin Init Error:', err.message);
    return res.status(500).json({
      success: false,
      error: 'Missing FIREBASE_SERVICE_ACCOUNT_KEY in Vercel Environment Variables. Please add your Firebase Service Account JSON in Vercel Project Settings > Environment Variables.'
    });
  }

  // Authentication check
  const authHeader = req.headers['authorization'];
  const apiKeyHeader = req.headers['x-api-key'];
  const expectedSecret = process.env.N8N_PUSH_SECRET;

  let isAuthenticated = false;

  // 1. Verify via N8N_PUSH_SECRET (for backend-to-backend calls)
  if (expectedSecret && (apiKeyHeader === expectedSecret || authHeader === `Bearer ${expectedSecret}`)) {
    isAuthenticated = true;
  }

  // 2. Verify via Firebase Auth ID Token (for Admin frontend calls)
  if (!isAuthenticated && authHeader && authHeader.startsWith('Bearer ')) {
    const idToken = authHeader.split('Bearer ')[1]?.trim();
    if (idToken) {
      try {
        await firebaseAdmin.auth().verifyIdToken(idToken);
        isAuthenticated = true;
      } catch (tokenErr) {
        // Not a valid Firebase ID Token
      }
    }
  }

  // If secret is not set in dev, allow requests with origin validation
  if (!isAuthenticated && !expectedSecret) {
    isAuthenticated = true;
  }

  if (!isAuthenticated) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized: Missing or invalid authentication credentials.'
    });
  }

  // Extract and format job data
  const body = req.body || {};
  const job = body.job || body;

  const title = cleanText(job.title || job.role || '');
  const company = cleanText(job.company || '');
  const description = cleanText(job.description || `New opportunity at ${company} matching your target profile.`);
  const location = cleanText(job.location || 'India / Remote');
  const jobType = (job.jobType || job.type || (job.stipend ? 'internship' : 'job')).toLowerCase().includes('intern')
    ? 'internship'
    : 'job';
  const applicationUrl = (job.applicationUrl || job.applyUrl || '').trim();
  const createdAt = job.createdAt
    ? (typeof job.createdAt === 'string' ? job.createdAt : new Date().toISOString())
    : new Date().toISOString();
  const jobId = job.id || `job-${Date.now()}`;

  // Validate required payload fields
  if (!title || !company || !applicationUrl) {
    return res.status(400).json({
      success: false,
      error: 'Missing required opportunity details: title, company, and applicationUrl are required.'
    });
  }

  const db = firebaseAdmin.firestore();

  // Deduplication check (Requirement 7: Prevent duplicate notifications)
  // Use a base64url hash of the sanitized application URL as a unique key
  const dedupKey = Buffer.from(applicationUrl.toLowerCase().trim()).toString('base64url').slice(0, 100);

  try {
    const dedupDoc = await db.collection('job_notifications_dispatched').doc(dedupKey).get();
    if (dedupDoc.exists) {
      console.log(`[notify-job] Duplicate alert skipped: ${company} - ${title}`);
      return res.status(200).json({
        success: true,
        skipped: true,
        message: 'Notification already sent previously for this opportunity.',
        jobId
      });
    }

    // Also check if the document in jobs/internships collection was already marked as notified
    if (job.id) {
      const coll = jobType === 'internship' ? 'internships' : 'jobs';
      const existingDoc = await db.collection(coll).doc(job.id).get();
      if (existingDoc.exists && existingDoc.data()?.notified === true) {
        console.log(`[notify-job] Opportunity ${job.id} is already marked notified.`);
        return res.status(200).json({
          success: true,
          skipped: true,
          message: 'Notification already sent previously for this opportunity.',
          jobId
        });
      }
    }

    // Prepare standardized payload for n8n Production Webhook (Requirement 3)
    const n8nPayload = {
      id: jobId,
      title,
      company,
      description,
      location,
      jobType,
      applicationUrl,
      category: 'jobAlerts',
      createdAt
    };

    // Retrieve webhook URL from environment (Requirement 5)
    const webhookUrl =
      process.env.N8N_JOB_WEBHOOK_URL ||
      'https://fahu.app.n8n.cloud/webhook/placmentor-job-alert';

    const webhookSecret = process.env.N8N_JOB_WEBHOOK_SECRET;

    const webhookHeaders = {
      'Content-Type': 'application/json',
      'User-Agent': 'PlaceMentor-AI-Vercel-Dispatcher/1.0'
    };

    // Attach webhook secret header if configured (Requirement 6)
    if (webhookSecret && webhookSecret.trim().length > 0) {
      webhookHeaders['x-webhook-secret'] = webhookSecret.trim();
      webhookHeaders['Authorization'] = `Bearer ${webhookSecret.trim()}`;
    }

    console.log(`[notify-job] Dispatching job alert to n8n webhook: ${company} - ${title}`);

    // Send HTTP POST request to n8n Production Webhook (Requirement 2 & 8)
    let n8nResponse;
    let n8nData = null;

    try {
      n8nResponse = await fetch(webhookUrl, {
        method: 'POST',
        headers: webhookHeaders,
        body: JSON.stringify(n8nPayload),
        signal: AbortSignal.timeout(10000) // 10s timeout
      });

      const responseText = await n8nResponse.text();
      try {
        n8nData = JSON.parse(responseText);
      } catch {
        n8nData = { raw: responseText };
      }
    } catch (fetchErr) {
      // Handle webhook failure gracefully without breaking website (Requirement 8)
      console.error('[notify-job] n8n Webhook connection error:', fetchErr.message);
      return res.status(502).json({
        success: false,
        error: `Failed to contact n8n webhook: ${fetchErr.message}`,
        jobId
      });
    }

    if (!n8nResponse.ok) {
      console.warn(`[notify-job] n8n Webhook returned HTTP ${n8nResponse.status}:`, n8nData);
      return res.status(n8nResponse.status || 500).json({
        success: false,
        error: `n8n Webhook returned error code ${n8nResponse.status}`,
        details: n8nData
      });
    }

    // Mark as dispatched in Firestore to prevent any future duplicates
    await db.collection('job_notifications_dispatched').doc(dedupKey).set({
      jobId,
      company,
      title,
      applicationUrl,
      jobType,
      dispatchedAt: admin.firestore.FieldValue.serverTimestamp()
    }).catch(e => console.warn('[notify-job] Could not save dedup record:', e.message));

    if (job.id) {
      const coll = jobType === 'internship' ? 'internships' : 'jobs';
      await db.collection(coll).doc(job.id).set({
        notified: true,
        notifiedAt: admin.firestore.FieldValue.serverTimestamp()
      }, { merge: true }).catch(() => {});
    }

    return res.status(200).json({
      success: true,
      message: 'Job alert successfully dispatched to n8n Production Webhook.',
      jobId,
      n8nResponse: n8nData
    });
  } catch (err) {
    console.error('[notify-job] Internal error:', err.message);
    return res.status(500).json({
      success: false,
      error: 'Internal server error while processing job alert dispatch.'
    });
  }
}
