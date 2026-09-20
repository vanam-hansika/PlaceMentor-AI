// ============================================
// PlaceMentor AI — Aptitude Page
// ============================================
import React, { useState } from 'react';
import { aptitudeCategories, sampleQuestions } from '../../data/aptitudeQuestions';
import { BookOpen, CheckCircle, HelpCircle, Clock, ArrowRight, Award, RotateCcw, Brain } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { aiService } from '../../services/ai/aiService';
import './Aptitude.css';

export default function Aptitude() {
  const { showToast, completeActivity } = useApp();
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [quizActive, setQuizActive] = useState(false);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [aiExplanation, setAiExplanation] = useState({});
  const [loadingAi, setLoadingAi] = useState(false);

  const questions = sampleQuestions[selectedTopic?.id] || sampleQuestions['time-work'];

  const handleStartQuiz = (topic) => {
    setSelectedTopic(topic);
    setQuizActive(true);
    setCurrentQIndex(0);
    setSelectedAnswers({});
    setShowResults(false);
    setAiExplanation({});
  };

  const handleOptionSelect = (qId, optionIdx) => {
    if (showResults) return;
    setSelectedAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  };

  const handleFinishQuiz = () => {
    setShowResults(true);
    completeActivity('aptitude');
    showToast('Quiz Completed! Aptitude score updated 🎉', 'success');
  };

  const handleAskAIExplanation = async (qIndex) => {
    const q = questions[qIndex];
    const userChoice = q.options[selectedAnswers[q.id]] || 'Not answered';
    setLoadingAi(qIndex);
    try {
      // Call swappable AI service (n8n Gemini)
      const res = await aiService.explainAptitude(q, userChoice);
      setAiExplanation(prev => ({ ...prev, [qIndex]: res?.explanation || q.explanation }));
    } catch {
      setAiExplanation(prev => ({ ...prev, [qIndex]: q.explanation }));
    } finally {
      setLoadingAi(null);
    }
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctAnswer) score++;
    });
    return Math.round((score / questions.length) * 100);
  };

  return (
    <div className="page aptitude-page">
      {!quizActive ? (
        <>
          <div className="aptitude-header animate-fadeInDown">
            <div>
              <h2>Aptitude Mastery 📊</h2>
              <p className="text-secondary-color">Topic-wise practice, timed quizzes, and instant AI step-by-step explanations.</p>
            </div>
          </div>

          <div className="aptitude-categories">
            {aptitudeCategories.map(cat => (
              <div key={cat.id} className="card aptitude-cat-card animate-fadeInUp">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{cat.icon}</span>
                  <div>
                    <h3 style={{ fontSize: 'var(--text-lg)', margin: 0 }}>{cat.name}</h3>
                    <p className="text-xs text-muted">{cat.description}</p>
                  </div>
                </div>

                <div className="aptitude-topic-list">
                  {cat.topics.map(t => (
                    <div key={t.id} className="aptitude-topic-item">
                      <div>
                        <p className="text-sm font-semibold">{t.name}</p>
                        <span className="text-xs text-muted">{t.questionsCount} Questions • {t.difficulty}</span>
                      </div>
                      <button className="btn btn-primary btn-sm" onClick={() => handleStartQuiz(t)}>
                        Practice <ArrowRight size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="quiz-container card animate-fadeInUp">
          <div className="flex justify-between items-center mb-6 pb-4 border-b">
            <div>
              <span className="badge badge-primary">{selectedTopic?.name || 'Time & Work'}</span>
              <p className="text-xs text-muted mt-1">Question {currentQIndex + 1} of {questions.length}</p>
            </div>
            <button className="btn btn-ghost btn-sm" onClick={() => setQuizActive(false)}>
              Exit Quiz
            </button>
          </div>

          {!showResults ? (
            <div className="quiz-question-box">
              <h3 className="mb-6" style={{ fontSize: 'var(--text-lg)', lineHeight: 1.5 }}>
                {currentQIndex + 1}. {questions[currentQIndex].question}
              </h3>

              <div className="quiz-options">
                {questions[currentQIndex].options.map((opt, idx) => {
                  const isSelected = selectedAnswers[questions[currentQIndex].id] === idx;
                  return (
                    <button
                      key={idx}
                      className={`quiz-option-btn ${isSelected ? 'selected' : ''}`}
                      onClick={() => handleOptionSelect(questions[currentQIndex].id, idx)}
                    >
                      <span className="quiz-option-letter">{String.fromCharCode(65 + idx)}</span>
                      <span className="text-sm font-medium">{opt}</span>
                    </button>
                  );
                })}
              </div>

              <div className="flex justify-between items-center mt-8 pt-4 border-t">
                <button
                  className="btn btn-ghost"
                  disabled={currentQIndex === 0}
                  onClick={() => setCurrentQIndex(i => i - 1)}
                >
                  Previous
                </button>
                {currentQIndex < questions.length - 1 ? (
                  <button className="btn btn-primary" onClick={() => setCurrentQIndex(i => i + 1)}>
                    Next Question
                  </button>
                ) : (
                  <button className="btn btn-secondary" onClick={handleFinishQuiz}>
                    Submit Quiz
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="quiz-results-box text-center">
              <div className="icon-box icon-box-accent icon-box-lg" style={{ margin: '0 auto var(--space-4)' }}>
                <Award size={32} />
              </div>
              <h2>Quiz Score: {calculateScore()}%</h2>
              <p className="text-secondary-color mb-6">Great effort! Review the detailed solution steps below.</p>

              <div className="quiz-review-list text-left">
                {questions.map((q, qIdx) => {
                  const isCorrect = selectedAnswers[q.id] === q.correctAnswer;
                  return (
                    <div key={q.id} className={`quiz-review-card ${isCorrect ? 'correct' : 'incorrect'}`}>
                      <p className="font-semibold text-sm mb-2">{qIdx + 1}. {q.question}</p>
                      <div className="flex gap-4 text-xs mb-3">
                        <span className={isCorrect ? 'text-success font-bold' : 'text-danger font-bold'}>
                          Your Answer: {q.options[selectedAnswers[q.id]] || 'None'}
                        </span>
                        <span className="text-success font-bold">Correct: {q.options[q.correctAnswer]}</span>
                      </div>

                      <div className="quiz-explanation-box">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs font-bold text-primary flex items-center gap-1">
                            <Brain size={14} /> Explanation
                          </span>
                          <button
                            className="btn btn-ghost btn-sm text-xs"
                            onClick={() => handleAskAIExplanation(qIdx)}
                            disabled={loadingAi === qIdx}
                          >
                            {loadingAi === qIdx ? 'AI Thinking...' : '✨ Deep AI Explain'}
                          </button>
                        </div>
                        <p className="text-xs text-secondary-color" style={{ whiteSpace: 'pre-line' }}>
                          {aiExplanation[qIdx] || q.explanation}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <button className="btn btn-primary mt-6" onClick={() => setQuizActive(false)}>
                Back to Topics
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
