// ============================================
// PlaceMentor AI — Google Gemini AI Provider
// Direct Google Gemini API + intelligent fallback
// ============================================

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';
const GEMINI_MODEL = 'gemini-1.5-flash';
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

async function callGeminiAPI(prompt, systemInstruction = '') {
  if (!GEMINI_API_KEY) {
    throw new Error('No GEMINI_API_KEY provided');
  }

  const payload = {
    contents: [
      {
        parts: [
          { text: systemInstruction ? `${systemInstruction}\n\n${prompt}` : prompt }
        ]
      }
    ],
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 2048,
    }
  };

  const response = await fetch(`${GEMINI_URL}?key=${GEMINI_API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error(`Gemini API error: ${response.statusText}`);
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error('Empty response from Gemini API');
  return text;
}

export const geminiProvider = {
  // 1. AI Placement Mentor Plan & Chat
  generateStudyPlan: async (userData) => {
    try {
      const prompt = `Analyze this student profile for placement preparation:
Target Company: ${userData.targetCompany || 'Top Tech Company'}
Branch: ${userData.branch || 'Computer Science'}
Year: ${userData.year || '4th Year'}
Preferred Language: ${userData.preferredLanguage || 'Python'}
Coding Score: ${userData.codingScore || 65}%
Aptitude Score: ${userData.aptitudeScore || 70}%
Interview Score: ${userData.interviewScore || 50}%

Return ONLY a valid JSON object with the following fields:
{
  "readiness": <number 0-100>,
  "recommendation": "<strategic advice paragraph>",
  "weakAreas": ["<weak topic 1>", "<weak topic 2>"],
  "strongAreas": ["<strong topic 1>", "<strong topic 2>"],
  "dailyTasks": [
    {"day": "Day 1", "task": "<description>", "module": "<Coding/Aptitude/Interview>", "icon": "💻"},
    {"day": "Day 2", "task": "<description>", "module": "<Coding/Aptitude/Interview>", "icon": "📊"},
    {"day": "Day 3", "task": "<description>", "module": "<Coding/Aptitude/Interview>", "icon": "🎤"},
    {"day": "Day 4", "task": "<description>", "module": "<Coding/Aptitude/Interview>", "icon": "🌲"},
    {"day": "Day 5", "task": "<description>", "module": "<Coding/Aptitude/Interview>", "icon": "💻"}
  ],
  "suggestedProblems": ["<problem 1>", "<problem 2>", "<problem 3>"],
  "suggestedAptitude": ["<topic 1>", "<topic 2>", "<topic 3>"]
}`;
      const jsonText = await callGeminiAPI(prompt, 'You are an expert AI Placement Mentor. Respond ONLY in valid JSON format without markdown ticks.');
      const cleanJson = jsonText.replace(/```json/g, '').replace(/```/g, '').trim();
      return JSON.parse(cleanJson);
    } catch (err) {
      console.warn('[Gemini fallback for StudyPlan]', err);
      return null; // caller falls back to structured local response
    }
  },

  getMentorChatResponse: async (question, userData) => {
    try {
      const prompt = `Student Profile: Target=${userData?.targetCompany || 'Top Tech'}, Language=${userData?.preferredLanguage || 'Python'}, Readiness=${userData?.placementReadiness || 65}%.
Student Question: "${question}"

Provide a friendly, highly encouraging, structured, actionable response as a senior Placement Mentor. Keep it concise, motivational, and practical.`;
      return await callGeminiAPI(prompt, 'You are an encouraging, expert AI Placement Mentor assisting a college student with placement prep.');
    } catch (err) {
      console.warn('[Gemini fallback for MentorChat]', err);
      return null;
    }
  },

  // 2. Line-by-Line Code Explanation
  explainCode: async (code, language) => {
    try {
      const prompt = `Analyze this ${language} code for a student:
\`\`\`${language}
${code}
\`\`\`

Return ONLY a valid JSON object with the following fields:
{
  "summary": "<simple overall explanation of the code>",
  "lineByLine": ["Line 1: ...", "Line 2: ..."],
  "variables": [{"name": "<var>", "purpose": "<purpose>"}],
  "dryRun": "<step-by-step execution flow with sample data>",
  "expectedOutput": "<sample expected output>",
  "timeComplexity": "O(...)",
  "spaceComplexity": "O(...)",
  "commonMistakes": ["<pitfall 1>", "<pitfall 2>"],
  "analogy": "<real world analogy>"
}`;
      const jsonText = await callGeminiAPI(prompt, 'You are a senior Software Engineer and CS Educator. Respond ONLY in valid JSON format.');
      const cleanJson = jsonText.replace(/```json/g, '').replace(/```/g, '').trim();
      return JSON.parse(cleanJson);
    } catch (err) {
      console.warn('[Gemini fallback for explainCode]', err);
      return null;
    }
  },

  // 3. Dynamic Interview Question & Evaluation
  evaluateAnswerAndFollowUp: async (question, answer, interviewType, targetCompany) => {
    try {
      const prompt = `Interview Round: ${interviewType} (Target Company: ${targetCompany || 'General Tech'})
Question: "${question}"
Student's Answer: "${answer}"

Evaluate the answer and provide the next follow-up interview question.
Return ONLY a valid JSON object:
{
  "score": <number 0-100>,
  "feedback": "<constructive feedback on tone, technical depth, and structure>",
  "followUpQuestion": "<next relevant follow-up question or new scenario question>"
}`;
      const jsonText = await callGeminiAPI(prompt, 'You are an expert Technical/HR Interviewer at a top tech company. Respond ONLY in valid JSON format.');
      const cleanJson = jsonText.replace(/```json/g, '').replace(/```/g, '').trim();
      return JSON.parse(cleanJson);
    } catch (err) {
      console.warn('[Gemini fallback for evaluateAnswer]', err);
      return null;
    }
  },

  // 11. AI Career Recommendation
  getCareerRecommendations: async (userData) => {
    try {
      const prompt = `Student Profile:
Branch: ${userData?.branch || 'Computer Science'}
Year: ${userData?.year || '4th Year'}
Preferred Language: ${userData?.preferredLanguage || 'Python'}
Coding Score: ${userData?.codingScore || 70}%
Aptitude Score: ${userData?.aptitudeScore || 75}%
Interview Score: ${userData?.interviewScore || 65}%
Target Company: ${userData?.targetCompany || 'Product Company'}

Recommend top 4 suitable tech career paths from: Software Developer, Full Stack Developer, AI/ML Engineer, Data Scientist, Cloud Engineer, DevOps Engineer, Cybersecurity, Data Analyst, QA/Test Engineer.

Return ONLY a valid JSON array of objects:
[
  {
    "role": "<Role Name>",
    "matchPercentage": <number 70-98>,
    "whySuitable": "<explanation why this fits their profile>",
    "strengths": ["<strength 1>", "<strength 2>"],
    "improvements": ["<skill to build 1>", "<skill to build 2>"],
    "learningDirection": "<3-step next steps>"
  }
]`;
      const jsonText = await callGeminiAPI(prompt, 'You are a Senior Tech Career Counselor. Respond ONLY in valid JSON array format.');
      const cleanJson = jsonText.replace(/```json/g, '').replace(/```/g, '').trim();
      return JSON.parse(cleanJson);
    } catch (err) {
      console.warn('[Gemini fallback for Career Recommendations]', err);
      return null;
    }
  },

  // 12. AI Resume Enhancement
  generateResumeContent: async (formData) => {
    try {
      const prompt = `Student Resume Inputs:
Name: ${formData.fullName}
Role Goal: ${formData.targetRole || 'Software Engineer'}
Skills: ${formData.skills}
Languages: ${formData.languages}
Projects: ${formData.projects}
Work/Internships: ${formData.internships}
Certifications: ${formData.certifications}
Achievements/Medals: ${formData.achievements}

Generate an ATS-optimized professional resume summary and bullet points.
Return ONLY a valid JSON object:
{
  "professionalSummary": "<concise 3-line ATS summary>",
  "projectBullets": ["<impact bullet for project 1>", "<impact bullet for project 2>"],
  "experienceBullets": ["<bullet for experience 1>", "<bullet for experience 2>"],
  "highlightedSkills": ["<skill 1>", "<skill 2>", "<skill 3>"]
}`;
      const jsonText = await callGeminiAPI(prompt, 'You are a professional Resume Writer and ATS Specialist. Respond ONLY in valid JSON.');
      const cleanJson = jsonText.replace(/```json/g, '').replace(/```/g, '').trim();
      return JSON.parse(cleanJson);
    } catch (err) {
      console.warn('[Gemini fallback for Resume Content]', err);
      return null;
    }
  }
};
