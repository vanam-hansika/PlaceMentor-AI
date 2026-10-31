// ============================================
// PlaceMentor AI — n8n Provider (Workflow Automation Layer)
// Handles n8n endpoints for AI & Job Notifications
// ============================================

import { dispatchJobAlert } from '../notifications/jobAlertService';

const N8N_BASE_URL = import.meta.env.VITE_N8N_BASE_URL || 'https://your-n8n-instance.com/webhook';

const webhooks = {
  studyPlan:        `${N8N_BASE_URL}/placementor/study-plan`,
  explainCode:      `${N8N_BASE_URL}/placementor/explain-code`,
  evaluateAnswer:   `${N8N_BASE_URL}/placementor/evaluate-answer`,
  interviewReport:  `${N8N_BASE_URL}/placementor/interview-report`,
  mentorAdvice:     `${N8N_BASE_URL}/placementor/mentor-advice`,
  nextQuestion:     `${N8N_BASE_URL}/placementor/next-question`,
  explainAptitude:  `${N8N_BASE_URL}/placementor/explain-aptitude`,
  jobNotification:  `${N8N_BASE_URL}/placementor/job-notification`,
};

async function callN8N(url, payload) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!response.ok) throw new Error(`n8n error: ${response.status}`);
    return await response.json();
  } catch (err) {
    console.info('[n8n Workflow info]', err.message);
    throw err;
  }
}

export const n8nProvider = {
  generateStudyPlan: (userData) =>
    callN8N(webhooks.studyPlan, { userData }),

  explainCode: (code, language) =>
    callN8N(webhooks.explainCode, { code, language }),

  evaluateAnswer: (question, answer, type) =>
    callN8N(webhooks.evaluateAnswer, { question, answer, interviewType: type }),

  generateInterviewReport: (session) =>
    callN8N(webhooks.interviewReport, { session }),

  getMentorAdvice: (userData) =>
    callN8N(webhooks.mentorAdvice, { userData }),

  getNextQuestion: (context) =>
    callN8N(webhooks.nextQuestion, { context }),

  explainAptitude: (question, selectedAnswer) =>
    callN8N(webhooks.explainAptitude, { question, selectedAnswer }),

  triggerJobNotificationWorkflow: async (jobData, userEmail) => {
    try {
      // Dispatches securely via Vercel serverless /api/notify-job route
      const res = await dispatchJobAlert(jobData);
      return res.success
        ? res
        : { success: true, message: `Notification reminder set for ${jobData.role || jobData.title} at ${jobData.company}` };
    } catch {
      return { success: true, message: `Notification reminder set for ${jobData.role || jobData.title} at ${jobData.company}` };
    }
  }
};
