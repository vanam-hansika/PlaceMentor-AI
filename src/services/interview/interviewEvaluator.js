// ============================================
// PlaceMentor AI — Intelligent Interview Evaluation Engine
// Evaluates answers rigorously based on technical keyword coverage,
// conceptual accuracy, articulation, low-effort/dismissal detection,
// and realistic scoring (no false 84% scores for wrong/empty answers)
// ============================================

import { interviewQuestionsData } from '../../data/interviewQuestionsData';

// Common dismissal / low-effort phrases
const DISMISSAL_REGEX = /\b(i don('?t| not) know|no idea|skip|pass|sorry|not sure|dont know|cannot answer|cant answer|idk|i have no clue|no clue|dunno|leave it|next question|blank)\b/i;

// Gibberish / repeated character patterns
const GIBBERISH_REGEX = /^(asdf|qwerty|xyz|test|blah|aaa+|bbb+|zzz+|1234|abc|none)$/i;

/**
 * Normalizes text for keyword & concept matching
 */
function cleanText(text = '') {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Counts genuine words
 */
function getWordCount(text = '') {
  const words = text.trim().split(/\s+/).filter(w => w.length > 0);
  return words.length;
}

/**
 * Find matching question metadata from question bank
 */
function findQuestionMeta(questionText = '', interviewType = 'technical') {
  const normQ = cleanText(questionText);
  const pool = interviewQuestionsData[interviewType] || interviewQuestionsData.technical;
  
  // Direct match or partial match
  let matched = pool.find(item => normQ.includes(cleanText(item.question.slice(0, 30))));
  if (!matched) {
    // Search all pools
    for (const key of Object.keys(interviewQuestionsData)) {
      matched = interviewQuestionsData[key].find(item => normQ.includes(cleanText(item.question.slice(0, 30))));
      if (matched) break;
    }
  }
  return matched;
}

export const interviewEvaluator = {
  /**
   * Evaluates an interview answer rigorously and returns authentic score & feedback
   * @param {string} question - The interview question asked
   * @param {string} answer - The student's verbal/typed response
   * @param {string} interviewType - 'technical' | 'coding' | 'hr' | 'company'
   * @param {string} targetCompany - Optional target company
   * @returns {Object} { score, technicalDepth, communicationScore, confidenceScore, feedback, followUpQuestion }
   */
  evaluateAnswer: (question, answer = '', interviewType = 'technical', targetCompany = '') => {
    const rawAnswer = (answer || '').trim();
    const cleaned = cleanText(rawAnswer);
    const wordCount = getWordCount(rawAnswer);
    const questionMeta = findQuestionMeta(question, interviewType);

    // ----------------------------------------------------
    // CASE 1: Empty or Pure Whitespace Answer -> 0%
    // ----------------------------------------------------
    if (!rawAnswer || wordCount === 0 || rawAnswer === 'Answer communicated verbally.') {
      return {
        score: 0,
        technicalDepth: 0,
        communicationScore: 5,
        confidenceScore: 5,
        feedback: 'No answer provided. In an actual technical interview, communicate your initial thoughts, definitions, or ask clarifying questions.',
        status: 'Unanswered'
      };
    }

    // ----------------------------------------------------
    // CASE 2: Dismissal / "I Don't Know" / "Pass" -> 10%
    // ----------------------------------------------------
    if (DISMISSAL_REGEX.test(cleaned)) {
      return {
        score: 12,
        technicalDepth: 5,
        communicationScore: 25,
        confidenceScore: 15,
        feedback: 'You indicated that you do not know the answer. While honesty is good, explain adjacent foundational concepts or how you would investigate the solution.',
        status: 'Dismissed'
      };
    }

    // ----------------------------------------------------
    // CASE 3: Gibberish or Meaningless Test String -> 5%
    // ----------------------------------------------------
    if (GIBBERISH_REGEX.test(cleaned) || (wordCount < 4 && !/[a-zA-Z]{4,}/.test(rawAnswer))) {
      return {
        score: 5,
        technicalDepth: 0,
        communicationScore: 10,
        confidenceScore: 5,
        feedback: 'The response does not contain a coherent or meaningful technical explanation.',
        status: 'Incoherent'
      };
    }

    // ----------------------------------------------------
    // CASE 4: Extremely Brief Answer (< 6 words) -> 20 - 30%
    // ----------------------------------------------------
    if (wordCount < 6) {
      return {
        score: 24,
        technicalDepth: 20,
        communicationScore: 25,
        confidenceScore: 20,
        feedback: 'Answer is too brief and lacks technical substance. Flesh out your explanation with definitions, mechanisms, and real-world trade-offs.',
        status: 'Incomplete'
      };
    }

    // ----------------------------------------------------
    // CASE 5: Rigorous Analysis based on Rubrics & Keywords
    // ----------------------------------------------------
    const expectedKeywords = questionMeta?.expectedKeywords || [
      'process', 'thread', 'memory', 'performance', 'complexity', 'trade-off', 'architecture'
    ];
    const coreConcepts = questionMeta?.coreConcepts || [];
    const antiKeywords = questionMeta?.antiKeywords || [];
    const minimumWords = questionMeta?.minimumWords || 15;

    // 1. Keyword Hit Rate
    let matchedKeywords = [];
    let missingKeywords = [];
    expectedKeywords.forEach(kw => {
      const cleanKw = cleanText(kw);
      if (cleaned.includes(cleanKw)) {
        matchedKeywords.push(kw);
      } else {
        missingKeywords.push(kw);
      }
    });

    const keywordHitRatio = matchedKeywords.length / Math.max(expectedKeywords.length, 1);

    // 2. Anti-Keyword / Misconception Check (e.g. saying threads have isolated memory)
    let misconceptionFound = false;
    let antiKeywordMatched = '';
    for (const anti of antiKeywords) {
      if (cleaned.includes(cleanText(anti))) {
        misconceptionFound = true;
        antiKeywordMatched = anti;
        break;
      }
    }

    // 3. Technical Depth Score (0 - 100)
    let technicalDepth = 0;
    if (keywordHitRatio >= 0.6) {
      technicalDepth = Math.round(75 + (keywordHitRatio - 0.6) * 50); // 75 - 95
    } else if (keywordHitRatio >= 0.35) {
      technicalDepth = Math.round(55 + (keywordHitRatio - 0.35) * 80); // 55 - 75
    } else if (keywordHitRatio >= 0.15) {
      technicalDepth = Math.round(35 + (keywordHitRatio - 0.15) * 100); // 35 - 55
    } else {
      technicalDepth = Math.round(15 + keywordHitRatio * 100); // 15 - 30
    }

    // Cap technical depth if word count is lower than minimum
    if (wordCount < minimumWords) {
      technicalDepth = Math.min(technicalDepth, 48);
    }

    // Severe deduction for false technical claims
    if (misconceptionFound) {
      technicalDepth = Math.max(10, technicalDepth - 25);
    }

    // 4. Communication Score (0 - 100)
    let communicationScore = 50;
    // Length adequacy
    if (wordCount >= 25 && wordCount <= 120) {
      communicationScore += 25; // sweet spot
    } else if (wordCount > 120) {
      communicationScore += 18; // slightly verbose
    } else if (wordCount >= 12) {
      communicationScore += 12;
    }

    // Articulation indicators (structured reasoning words)
    const articulationMarkers = [
      'for example', 'in contrast', 'whereas', 'because', 'firstly', 'secondly',
      'furthermore', 'trade-off', 'therefore', 'in this case', 'specifically', 'advantage'
    ];
    let markerHits = 0;
    articulationMarkers.forEach(marker => {
      if (cleaned.includes(marker)) markerHits++;
    });
    communicationScore += Math.min(markerHits * 6, 20);

    // Check sentence structure (has punctuation and capital letters)
    if (/[.?!]/.test(rawAnswer)) communicationScore += 5;
    communicationScore = Math.min(Math.max(communicationScore, 20), 96);

    // 5. Confidence Score (0 - 100)
    let confidenceScore = 60;
    // Penalty for excessive fillers
    const fillers = (cleaned.match(/\b(um|uh|maybe|kinda|sort of|i guess|probably)\b/g) || []).length;
    confidenceScore -= Math.min(fillers * 7, 25);
    if (wordCount >= 20) confidenceScore += 15;
    confidenceScore = Math.min(Math.max(confidenceScore, 20), 95);

    // 6. Overall Weighted Score
    let overallScore = Math.round(
      technicalDepth * 0.55 + communicationScore * 0.35 + confidenceScore * 0.10
    );

    // Cap score if major concepts were completely missed
    if (keywordHitRatio < 0.15 && overallScore > 40) {
      overallScore = 38;
    }

    overallScore = Math.min(Math.max(overallScore, 5), 98);

    // 7. Dynamic Feedback Synthesis
    let feedback = '';
    if (misconceptionFound) {
      feedback = `Identified a technical misconception regarding "${antiKeywordMatched}". Re-examine the precise memory model and system architecture.`;
    } else if (overallScore >= 80) {
      const topMatches = matchedKeywords.slice(0, 3).join(', ');
      feedback = `Strong response! Clearly articulated core principles with accurate coverage of ${topMatches ? topMatches : 'the required mechanisms'}.`;
    } else if (overallScore >= 55) {
      const missingHint = missingKeywords.slice(0, 2).join(' and ');
      feedback = `Good foundational attempt. You touched on key points, but could deepen your technical rigor by discussing ${missingHint || 'trade-offs and concrete performance implications'}.`;
    } else if (overallScore >= 35) {
      const missingHint = missingKeywords.slice(0, 3).join(', ');
      feedback = `Shallow explanation. The answer lacked critical core concepts such as ${missingHint || 'architectural trade-offs and memory boundaries'}.`;
    } else {
      feedback = 'The explanation was largely inaccurate or incomplete. Review the fundamental concepts and definitions for this topic.';
    }

    return {
      score: overallScore,
      technicalDepth: Math.min(Math.max(technicalDepth, 5), 98),
      communicationScore,
      confidenceScore,
      feedback,
      matchedKeywords,
      missingKeywords: missingKeywords.slice(0, 4),
      status: overallScore >= 75 ? 'Strong' : overallScore >= 50 ? 'Average' : 'Needs Work'
    };
  }
};
