// ============================================
// PlaceMentor AI — Secure Server-Side Job Alert Dispatcher
// Vercel Serverless Function (Node.js ESM)
// ============================================

import { initializeApp, getApps, getApp, cert } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';

const FIREBASE_WEB_API_KEY = process.env.VITE_FIREBASE_API_KEY || 'AIzaSyDoL7n4zoDqv09TQHhaIeHMJHKcRFFY9Ks';

function getFirebaseAdminApp() {
  if (getApps().length > 0) {
    return getApp();
  }

  if (!process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    throw new Error('Missing FIREBASE_SERVICE_ACCOUNT_KEY in Vercel Environment Variables.');
  }

  let raw = process.env.FIREBASE_SERVICE_ACCOUNT_KEY.trim();
  if ((raw.startsWith("'") && raw.endsWith("'")) || (raw.startsWith('"') && raw.endsWith('"'))) {
    raw = raw.slice(1, -1).trim();
  }
  if (!raw.startsWith('{') && raw.length > 50) {
    try {
      const decoded = Buffer.from(raw, 'base64').toString('utf8');
      if (decoded.startsWith('{')) raw = decoded;
    } catch {}
  }

  let serviceAccount;
  try {
    serviceAccount = typeof raw === 'string' ? JSON.parse(raw) : raw;
  } catch (parseErr) {
    throw new Error(`Failed to parse FIREBASE_SERVICE_ACCOUNT_KEY JSON: ${parseErr.message}`);
  }

  if (serviceAccount.private_key) {
    serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');
  }

  return initializeApp({
    credential: cert(serviceAccount)
  });
}

async function verifyFirebaseIdToken(idToken) {
  if (!idToken) return null;
  try {
    const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${FIREBASE_WEB_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken })
    });
    const data = await res.json();
    if (res.ok && data.users?.[0]?.localId) {
      return {
        uid: data.users[0].localId,
        email: data.users[0].email
      };
    }
  } catch (err) {
    console.warn('[Google Auth Verify Warning]', err.message);
  }
  return null;
}

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

  let app;
  try {
    app = getFirebaseAdminApp();
  } catch (err) {
    console.error('[notify-job] Init Error:', err.message);
    return res.status(500).json({
      success: false,
      error: `Server initialization error: ${err.message}`
    });
  }

  const db = getFirestore(app);

  const authHeader = req.headers['authorization'];
  const apiKeyHeader = req.headers['x-api-key'];
  const expectedSecret = process.env.N8N_PUSH_SECRET;

  let isAuthenticated = false;

  if (expectedSecret && (apiKeyHeader === expectedSecret || authHeader === `Bearer ${expectedSecret}`)) {
    isAuthenticated = true;
  }

  if (!isAuthenticated && authHeader && authHeader.startsWith('Bearer ')) {
    const idToken = authHeader.split('Bearer ')[1]?.trim();
    if (idToken) {
      const decodedUser = await verifyFirebaseIdToken(idToken);
      if (decodedUser) {
        isAuthenticated = true;
      }
    }
  }

  if (!isAuthenticated && !expectedSecret) {
    isAuthenticated = true;
  }

  if (!isAuthenticated) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized: Missing or invalid authentication credentials.'
    });
  }

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

  if (!title || !company || !applicationUrl) {
    return res.status(400).json({
      success: false,
      error: 'Missing required opportunity details: title, company, and applicationUrl are required.'
    });
  }

  const dedupKey = Buffer.from(applicationUrl.toLowerCase().trim()).toString('base64url').slice(0, 100);

  const dedupDoc = await db.collection('job_notifications_dispatched').doc(dedupKey).get();
  if (dedupDoc.exists) {
    return res.status(200).json({
      success: true,
      skipped: true,
      message: 'Notification already sent previously for this opportunity.',
      jobId
    });
  }

  if (job.id) {
    const coll = jobType === 'internship' ? 'internships' : 'jobs';
    const existingDoc = await db.collection(coll).doc(job.id).get();
    if (existingDoc.exists && existingDoc.data()?.notified === true) {
      return res.status(200).json({
        success: true,
        skipped: true,
        message: 'Notification already sent previously for this opportunity.',
        jobId
      });
    }
  }

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

  const webhookUrl =
    process.env.N8N_JOB_WEBHOOK_URL ||
    'https://fahu.app.n8n.cloud/webhook/placmentor-job-alert';

  const webhookSecret = process.env.N8N_JOB_WEBHOOK_SECRET;

  const webhookHeaders = {
    'Content-Type': 'application/json',
    'User-Agent': 'PlaceMentor-AI-Vercel-Dispatcher/1.0'
  };

  if (webhookSecret && webhookSecret.trim().length > 0) {
    webhookHeaders['x-webhook-secret'] = webhookSecret.trim();
    webhookHeaders['Authorization'] = `Bearer ${webhookSecret.trim()}`;
  }

  let n8nResponse;
  let n8nData = null;

  try {
    n8nResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: webhookHeaders,
      body: JSON.stringify(n8nPayload),
      signal: AbortSignal.timeout(10000)
    });

    const responseText = await n8nResponse.text();
    try {
      n8nData = JSON.parse(responseText);
    } catch {
      n8nData = { raw: responseText };
    }
  } catch (fetchErr) {
    return res.status(502).json({
      success: false,
      error: `Failed to contact n8n webhook: ${fetchErr.message}`,
      jobId
    });
  }

  if (!n8nResponse.ok) {
    return res.status(n8nResponse.status || 500).json({
      success: false,
      error: `n8n Webhook returned error code ${n8nResponse.status}`,
      details: n8nData
    });
  }

  await db.collection('job_notifications_dispatched').doc(dedupKey).set({
    jobId,
    company,
    title,
    applicationUrl,
    jobType,
    dispatchedAt: FieldValue.serverTimestamp()
  }).catch(() => {});

  if (job.id) {
    const coll = jobType === 'internship' ? 'internships' : 'jobs';
    await db.collection(coll).doc(job.id).set({
      notified: true,
      notifiedAt: FieldValue.serverTimestamp()
    }, { merge: true }).catch(() => {});
  }

  return res.status(200).json({
    success: true,
    message: 'Job alert successfully dispatched to n8n Production Webhook.',
    jobId,
    n8nResponse: n8nData
  });
}
