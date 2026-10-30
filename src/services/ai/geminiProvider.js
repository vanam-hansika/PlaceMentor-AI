// ============================================
// PlaceMentor AI — Google Gemini AI Provider
// Direct Google Gemini API + intelligent fallback
// ============================================

export function getGeminiApiKey() {
  let envKey = '';
  try {
    if (typeof import.meta !== 'undefined' && import.meta.env?.VITE_GEMINI_API_KEY) {
      envKey = import.meta.env.VITE_GEMINI_API_KEY;
    }
  } catch {}
  if (!envKey && typeof process !== 'undefined' && process.env?.VITE_GEMINI_API_KEY) {
    envKey = process.env.VITE_GEMINI_API_KEY;
  }
  if (envKey && envKey.trim()) return envKey.trim();
  try {
    const localKey = (localStorage.getItem('pm_gemini_api_key') || localStorage.getItem('gemini_api_key') || '').trim();
    if (localKey) return localKey;
  } catch {}
  return '';
}

export function setGeminiApiKey(key) {
  try {
    if (key && typeof key === 'string' && key.trim()) {
      localStorage.setItem('pm_gemini_api_key', key.trim());
    } else {
      localStorage.removeItem('pm_gemini_api_key');
    }
  } catch {}
}

let workingModelCache = null;
try {
  workingModelCache = localStorage.getItem('pm_gemini_working_model') || null;
} catch {}

const FALLBACK_MODELS = [
  'gemini-3-flash-preview',
  'gemini-flash-lite-latest',
  'gemini-3.6-flash',
  'gemini-3.5-flash',
  'gemini-2.0-flash',
  'gemini-1.5-flash-latest',
  'gemini-1.5-flash',
  'gemini-1.5-pro'
];

async function discoverSupportedModel(apiKey) {
  if (workingModelCache) return workingModelCache;
  try {
    const listRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${encodeURIComponent(apiKey)}`);
    if (listRes.ok) {
      const data = await listRes.json();
      const models = (data.models || []).filter(m => m.supportedGenerationMethods?.includes('generateContent'));
      
      const priorityOrder = [
        'gemini-3-flash-preview',
        'gemini-flash-lite-latest',
        'gemini-3.6-flash',
        'gemini-3.5-flash',
        'gemini-2.0-flash',
        'gemini-1.5-flash-latest',
        'gemini-1.5-flash',
        'gemini-2.5-flash',
        'gemini-1.5-pro'
      ];

      for (const p of priorityOrder) {
        const found = models.find(m => m.name === `models/${p}` || m.name.endsWith(`/${p}`));
        if (found) {
          const resolved = found.name.replace(/^models\//, '');
          workingModelCache = resolved;
          try { localStorage.setItem('pm_gemini_working_model', resolved); } catch {}
          return resolved;
        }
      }

      if (models.length > 0) {
        const resolved = models[0].name.replace(/^models\//, '');
        workingModelCache = resolved;
        try { localStorage.setItem('pm_gemini_working_model', resolved); } catch {}
        return resolved;
      }
    }
  } catch (err) {
    console.warn('[Gemini model discovery info]', err);
  }
  return null;
}

export const DR_ELENA_SYSTEM_INSTRUCTION = `You are Dr. Elena Rostova, a practical senior placement and career mentor. First identify the user's actual intent. Answer that exact question in the opening sentences. Use conversation history and profile information only when relevant. Never substitute generic advice about the user's target company for an answer to a different question. Give specific, accurate, beginner-friendly steps and examples. State uncertainty honestly and never invent facts. Ask for clarification when needed.`;

export async function callGeminiAPI(optionsOrPrompt, legacySystemInstruction = '') {
  let contents;
  let systemInstruction = '';
  let temperature = 0.7;
  let maxOutputTokens = 2048;
  let apiKeyOverride = null;

  if (typeof optionsOrPrompt === 'string') {
    // Legacy invocation: callGeminiAPI(prompt, systemInstruction)
    contents = [
      {
        role: 'user',
        parts: [{ text: optionsOrPrompt }]
      }
    ];
    systemInstruction = legacySystemInstruction || '';
  } else if (optionsOrPrompt && typeof optionsOrPrompt === 'object') {
    contents = optionsOrPrompt.contents || [];
    systemInstruction = optionsOrPrompt.systemInstruction || '';
    temperature = optionsOrPrompt.temperature ?? 0.7;
    maxOutputTokens = optionsOrPrompt.maxOutputTokens ?? 2048;
    apiKeyOverride = optionsOrPrompt.apiKeyOverride || null;
  } else {
    throw new Error('Invalid arguments provided to callGeminiAPI');
  }

  const apiKey = (apiKeyOverride || getGeminiApiKey()).trim();
  if (!apiKey) {
    throw new Error('MISSING_API_KEY: Gemini API key is not configured. Please add VITE_GEMINI_API_KEY to your .env file or enter it in Settings.');
  }

  const payload = {
    contents,
    generationConfig: {
      temperature,
      maxOutputTokens,
    }
  };

  if (systemInstruction) {
    payload.system_instruction = {
      parts: [{ text: systemInstruction }]
    };
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 35000);

  // 1. Determine candidate models to try
  let initialModel = workingModelCache;
  if (!initialModel) {
    initialModel = await discoverSupportedModel(apiKey);
  }
  if (!initialModel) {
    initialModel = 'gemini-2.0-flash';
  }

  const modelsToTry = [initialModel, ...FALLBACK_MODELS.filter(m => m !== initialModel)];

  let lastError = null;
  let response = null;

  for (const modelName of modelsToTry) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${encodeURIComponent(apiKey)}`;
    
    // Create copy of payload to adjust if model doesn't support system_instruction (like legacy gemini-pro)
    const curPayload = { ...payload };
    if (modelName === 'gemini-pro' && curPayload.system_instruction) {
      const sys = curPayload.system_instruction?.parts?.[0]?.text || '';
      delete curPayload.system_instruction;
      if (sys && curPayload.contents?.[0]?.parts?.[0]) {
        curPayload.contents[0].parts[0].text = `${sys}\n\n${curPayload.contents[0].parts[0].text}`;
      }
    }

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(curPayload),
        signal: controller.signal
      });

      if (res.ok) {
        response = res;
        workingModelCache = modelName;
        try { localStorage.setItem('pm_gemini_working_model', modelName); } catch {}
        break;
      }

      const errJson = await res.json().catch(() => null);
      let errorDetail = errJson?.error?.message || `HTTP ${res.status} ${res.statusText}`;
      errorDetail = errorDetail.replace(/key=[a-zA-Z0-9_\-]+/gi, 'key=***');

      // If model not found, busy (503/high demand), or rate-limited on free tier, try next candidate
      if (
        res.status === 404 ||
        res.status === 503 ||
        res.status === 429 ||
        errorDetail.includes('not found') ||
        errorDetail.includes('is not supported for generateContent') ||
        errorDetail.includes('high demand') ||
        errorDetail.includes('quota') ||
        errorDetail.includes('temporarily') ||
        errorDetail.includes('unavailable')
      ) {
        console.info(`[Gemini Model Fallback] Model ${modelName} unavailable (${errorDetail}). Trying next candidate...`);
        lastError = new Error(`Gemini API Error: ${errorDetail}`);
        continue;
      }

      // If authentication/permission error or bad request, don't keep trying models
      throw new Error(`Gemini API Error: ${errorDetail}`);
    } catch (err) {
      if (err.name === 'AbortError') {
        throw new Error('Gemini API request timed out after 35 seconds. Please check your internet connection and try again.');
      }
      if (err.message && !err.message.includes('not found') && !err.message.includes('404')) {
        throw err;
      }
      lastError = err;
    }
  }

  clearTimeout(timeoutId);

  if (!response) {
    throw lastError || new Error('No compatible Gemini model was found for this API key.');
  }

  const data = await response.json();
  const candidate = data.candidates?.[0];

  if (!candidate) {
    if (data.promptFeedback?.blockReason) {
      throw new Error(`Response blocked by Gemini safety policy (${data.promptFeedback.blockReason}).`);
    }
    throw new Error('No candidate response returned by Gemini API.');
  }

  if (candidate.finishReason === 'SAFETY') {
    throw new Error('Response blocked by Gemini content safety filters.');
  }

  const text = candidate.content?.parts?.map(p => p.text || '').join('').trim();
  if (!text) {
    throw new Error('Empty response received from Gemini API.');
  }

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

  getMentorChatResponse: async (arg1, arg2, arg3) => {
    let question = '';
    let userData = {};
    let history = [];

    if (arg1 && typeof arg1 === 'object' && arg1.question !== undefined) {
      question = arg1.question || '';
      userData = arg1.userData || {};
      history = arg1.history || [];
    } else {
      question = arg1 || '';
      userData = arg2 || {};
      history = arg3 || [];
    }

    if (!question || !question.trim()) {
      throw new Error('Question cannot be empty.');
    }

    // 1. Build multi-turn contents preserving chronological conversation history
    const contents = [];

    // Filter relevant turns (exclude initial greetings, error alerts, and limit to recent 8 turns)
    const validHistory = (history || [])
      .filter(m => m && (m.sender === 'user' || m.sender === 'mentor') && !m.isGreeting && !m.isError)
      .slice(-8);

    for (const msg of validHistory) {
      contents.push({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      });
    }

    // 2. Format latest user turn:
    // User question is the primary intent. Include candidate profile strictly as secondary reference.
    let userTurnText = question.trim();
    if (userData && (userData.targetCompany || userData.branch || userData.preferredLanguage)) {
      userTurnText += `\n\n[Candidate Context Reference - use ONLY if relevant to the question above: Target Company: ${userData.targetCompany || 'Not specified'}, Branch: ${userData.branch || 'Not specified'}, Preferred Language: ${userData.preferredLanguage || 'Not specified'}]`;
    }

    contents.push({
      role: 'user',
      parts: [{ text: userTurnText }]
    });

    return await callGeminiAPI({
      contents,
      systemInstruction: DR_ELENA_SYSTEM_INSTRUCTION,
      temperature: 0.6,
      maxOutputTokens: 2048,
    });
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
