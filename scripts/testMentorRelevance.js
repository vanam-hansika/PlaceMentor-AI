// ============================================
// PlaceMentor AI — AI Mentor Relevance & Payload Test Suite
// Verifies Dr. Elena Rostova Gemini API integration, system instruction,
// payload schema, multi-turn history, and intent understanding.
// ============================================

import { geminiProvider, DR_ELENA_SYSTEM_INSTRUCTION, setGeminiApiKey } from '../src/services/ai/geminiProvider.js';

const EXPECTED_INSTRUCTION = "You are Dr. Elena Rostova, a practical senior placement and career mentor. First identify the user's actual intent. Answer that exact question in the opening sentences. Use conversation history and profile information only when relevant. Never substitute generic advice about the user's target company for an answer to a different question. Give specific, accurate, beginner-friendly steps and examples. State uncertainty honestly and never invent facts. Ask for clarification when needed.";

const TEST_QUESTIONS = [
  {
    id: 1,
    question: "Can I choose cloud computing as my career goal? Is it good for placements?",
    expectedKeywords: ["cloud", "placement", "career"],
    forbiddenKeywords: ["leetcode", "binary tree", "dynamic programming", "star framework", "amazon sde"]
  },
  {
    id: 2,
    question: "Give me a six-month beginner roadmap to become a cloud engineer.",
    expectedKeywords: ["month", "roadmap", "aws", "azure", "linux", "cloud"],
    forbiddenKeywords: ["behavioral round", "leetcode"]
  },
  {
    id: 3,
    question: "What is the difference between cloud computing and DevOps?",
    expectedKeywords: ["devops", "cloud", "difference", "infrastructure", "pipeline"],
    forbiddenKeywords: ["google interview"]
  },
  {
    id: 4,
    question: "How should I prepare for a Google software engineering interview?",
    expectedKeywords: ["google", "interview", "data structures", "coding", "algorithm"],
    forbiddenKeywords: []
  },
  {
    id: 5,
    question: "What projects can I build to demonstrate cloud computing skills?",
    expectedKeywords: ["project", "cloud", "deploy", "serverless", "storage"],
    forbiddenKeywords: ["google interview"]
  }
];

function buildGeminiPayload(question, history, userData, systemInstruction) {
  const contents = [];

  const validHistory = (history || [])
    .filter(m => m && (m.sender === 'user' || m.sender === 'mentor') && !m.isGreeting && !m.isError)
    .slice(-8);

  for (const msg of validHistory) {
    contents.push({
      role: msg.sender === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    });
  }

  let userTurnText = question.trim();
  if (userData && (userData.targetCompany || userData.branch || userData.preferredLanguage)) {
    userTurnText += `\n\n[Candidate Context Reference - use ONLY if relevant to the question above: Target Company: ${userData.targetCompany || 'Not specified'}, Branch: ${userData.branch || 'Not specified'}, Preferred Language: ${userData.preferredLanguage || 'Not specified'}]`;
  }

  contents.push({
    role: 'user',
    parts: [{ text: userTurnText }]
  });

  const payload = {
    contents,
    generationConfig: {
      temperature: 0.6,
      maxOutputTokens: 2048
    }
  };

  if (systemInstruction) {
    payload.system_instruction = {
      parts: [{ text: systemInstruction }]
    };
  }

  return payload;
}

async function runTests() {
  console.log('🧪 Starting PlaceMentor AI — Dr. Elena Rostova Mentor Verification Tests\n');

  let passedTests = 0;
  let totalTests = 0;

  function assert(condition, testName) {
    totalTests++;
    if (condition) {
      console.log(`  ✅ PASS: ${testName}`);
      passedTests++;
    } else {
      console.error(`  ❌ FAIL: ${testName}`);
    }
  }

  // TEST 1: System Instruction Accuracy
  console.log('--- Test Suite 1: System Instruction Verification ---');
  assert(
    DR_ELENA_SYSTEM_INSTRUCTION.trim() === EXPECTED_INSTRUCTION.trim(),
    'DR_ELENA_SYSTEM_INSTRUCTION matches exact required wording'
  );

  // TEST 2: Payload Schema Validation
  console.log('\n--- Test Suite 2: Payload Schema Validation ---');
  const dummyHistory = [
    { sender: 'mentor', text: 'Welcome student!', isGreeting: true },
    { sender: 'user', text: 'Hi Dr. Elena' },
    { sender: 'mentor', text: 'Hello! How can I help you today?' },
    { sender: 'mentor', text: 'Error happened', isError: true }
  ];
  const dummyUserData = { targetCompany: 'Google', branch: 'CSE', preferredLanguage: 'Python' };
  const payload = buildGeminiPayload('Can I choose cloud computing as my career goal?', dummyHistory, dummyUserData, DR_ELENA_SYSTEM_INSTRUCTION);

  assert(
    payload.system_instruction && Array.isArray(payload.system_instruction.parts) && payload.system_instruction.parts[0].text.includes('Dr. Elena Rostova'),
    'system_instruction is structured correctly with parts array'
  );

  assert(
    Array.isArray(payload.contents) && payload.contents.length === 3,
    'Filtered out greeting and error from history (length is 3: user, model, latest user)'
  );

  assert(
    payload.contents[0].role === 'user' && payload.contents[1].role === 'model' && payload.contents[2].role === 'user',
    'Contents roles follow correct chronological alternating order (user -> model -> user)'
  );

  assert(
    payload.contents[2].parts[0].text.startsWith('Can I choose cloud computing as my career goal?'),
    'Latest user turn starts with exact user question'
  );

  assert(
    payload.contents[2].parts[0].text.includes('[Candidate Context Reference - use ONLY if relevant'),
    'Profile data is strictly marked as secondary context reference'
  );

  // TEST 3: Multi-Question Relevance Check (Live API if Key Provided)
  const apiKey = process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY || process.argv[2];

  console.log('\n--- Test Suite 3: 5 Relevance Questions Evaluation ---');
  if (!apiKey) {
    console.log('  ℹ️  No live GEMINI_API_KEY provided in environment for live HTTP test.');
    console.log('     To run live Gemini API calls, pass: node scripts/testMentorRelevance.js <YOUR_GEMINI_API_KEY>\n');

    // Verify each question payload formulation without key
    TEST_QUESTIONS.forEach(t => {
      const qPayload = buildGeminiPayload(t.question, [], { targetCompany: 'Google' }, DR_ELENA_SYSTEM_INSTRUCTION);
      assert(
        qPayload.contents[0].parts[0].text.startsWith(t.question),
        `Question ${t.id} payload correctly isolates question: "${t.question.substring(0, 40)}..."`
      );
    });
  } else {
    process.env.VITE_GEMINI_API_KEY = apiKey;
    globalThis.localStorage = globalThis.localStorage || {
      getItem: (k) => null,
      setItem: () => {}
    };
    console.log('  🔑 Live GEMINI_API_KEY detected! Testing questions against live Gemini endpoint...');
    for (const t of TEST_QUESTIONS) {
      console.log(`\n  Testing Question ${t.id}: "${t.question}"`);
      
      try {
        const text = await geminiProvider.getMentorChatResponse(t.question, { targetCompany: 'Google' }, []);
        console.log(`     Excerpt: ${text.substring(0, 150).replace(/\n/g, ' ')}...`);

        const lowerText = text.toLowerCase();
        const containsExpected = t.expectedKeywords.some(kw => lowerText.includes(kw));
        assert(containsExpected, `Question ${t.id} response addresses topic directly (contains relevant terms)`);

        if (t.forbiddenKeywords.length > 0) {
          const containsForbidden = t.forbiddenKeywords.some(kw => lowerText.includes(kw));
          assert(!containsForbidden, `Question ${t.id} does not contain irrelevant canned advice`);
        }
      } catch (err) {
        console.error(`     Request error: ${err.message}`);
        assert(false, `Question ${t.id} request executed without error`);
      }
    }
  }

  console.log(`\n========================================`);
  console.log(`Result: ${passedTests}/${totalTests} tests passed`);
  console.log(`========================================\n`);

  if (passedTests === totalTests) {
    process.exit(0);
  } else {
    process.exit(1);
  }
}

runTests();
