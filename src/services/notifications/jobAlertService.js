// ============================================
// PlaceMentor AI — Job Alert Dispatch Service
// Calls secure server-side Vercel API route (/api/notify-job)
// Protects secrets from client code and handles deduplication
// ============================================

import { auth } from '../../config/firebase';

export async function dispatchJobAlert(jobItem) {
  if (!jobItem) return { success: false, error: 'No opportunity data provided' };

  try {
    const user = auth.currentUser;
    const idToken = user ? await user.getIdToken().catch(() => null) : null;

    const headers = {
      'Content-Type': 'application/json'
    };
    if (idToken) {
      headers['Authorization'] = `Bearer ${idToken}`;
    }

    const response = await fetch('/api/notify-job', {
      method: 'POST',
      headers,
      body: JSON.stringify({ job: jobItem })
    });

    const data = await response.json().catch(() => ({}));
    return {
      success: response.ok && data.success,
      ...data
    };
  } catch (err) {
    console.warn('[Job Alert Dispatch Warning]', err.message);
    // Graceful return without breaking UI
    return {
      success: false,
      error: `Network warning: ${err.message}`
    };
  }
}
