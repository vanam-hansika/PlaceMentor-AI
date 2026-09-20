// ============================================
// PlaceMentor AI — AI Service Layer
// Decoupled provider architecture (Gemini & n8n)
// ============================================

import { geminiProvider } from './geminiProvider';
import { n8nProvider } from './n8nProvider';

export const aiService = {
  /**
   * Generate personalized study plan
   */
  generateStudyPlan: async (userData) => {
    try {
      const plan = await geminiProvider.generateStudyPlan(userData);
      if (plan) return plan;
    } catch {
      // Fallback to n8n if configured
    }
    return n8nProvider.generateStudyPlan(userData);
  },

  /**
   * Get interactive AI Placement Mentor chat answer
   */
  getMentorChatResponse: async (question, userData) => {
    try {
      const ans = await geminiProvider.getMentorChatResponse(question, userData);
      if (ans) return ans;
    } catch {}
    return n8nProvider.getMentorAdvice({ question, userData });
  },

  /**
   * Explain program in detail (line-by-line, execution flow, complexity, output, common mistakes)
   */
  explainCode: async (code, language) => {
    try {
      const exp = await geminiProvider.explainCode(code, language);
      if (exp) return exp;
    } catch {}
    return n8nProvider.explainCode(code, language);
  },

  /**
   * Evaluate interview response and generate dynamic follow-up question
   */
  evaluateAnswer: async (question, answer, type, company) => {
    try {
      const res = await geminiProvider.evaluateAnswerAndFollowUp(question, answer, type, company);
      if (res) return res;
    } catch {}
    return n8nProvider.evaluateAnswer(question, answer, type);
  },

  /**
   * Get aptitude problem step-by-step solution
   */
  explainAptitude: (question, selectedAnswer) =>
    n8nProvider.explainAptitude(question, selectedAnswer),

  /**
   * Get AI Career Recommendations
   */
  getCareerRecommendations: async (userData) => {
    try {
      const res = await geminiProvider.getCareerRecommendations(userData);
      if (res) return res;
    } catch {}
    return null;
  },

  /**
   * Generate ATS-friendly AI Resume content
   */
  generateResumeContent: async (formData) => {
    try {
      const res = await geminiProvider.generateResumeContent(formData);
      if (res) return res;
    } catch {}
    return null;
  },

  /**
   * Process job notifications via n8n workflow
   */
  processJobNotificationWorkflow: (jobData, userEmail) =>
    n8nProvider.triggerJobNotificationWorkflow(jobData, userEmail)
};
