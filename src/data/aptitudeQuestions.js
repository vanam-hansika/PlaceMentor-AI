// ============================================
// PlaceMentor AI — Aptitude Dataset
// ============================================

export const aptitudeCategories = [
  {
    id: 'quantitative',
    name: 'Quantitative Aptitude',
    icon: '🔢',
    description: 'Master math concepts, numerical ability, and data interpretation.',
    topics: [
      { id: 'time-work', name: 'Time & Work', questionsCount: 15, difficulty: 'Medium' },
      { id: 'speed-distance', name: 'Speed, Distance & Time', questionsCount: 12, difficulty: 'Medium' },
      { id: 'percentages', name: 'Percentages & Profit Loss', questionsCount: 15, difficulty: 'Easy' },
      { id: 'ratios', name: 'Ratios & Proportions', questionsCount: 10, difficulty: 'Easy' },
      { id: 'probability', name: 'Probability & Permutations', questionsCount: 10, difficulty: 'Hard' },
    ]
  },
  {
    id: 'logical',
    name: 'Logical Reasoning',
    icon: '🧩',
    description: 'Sharpen your analytical thinking, patterns, and logical deductions.',
    topics: [
      { id: 'blood-relations', name: 'Blood Relations', questionsCount: 12, difficulty: 'Easy' },
      { id: 'syllogisms', name: 'Syllogisms & Statements', questionsCount: 15, difficulty: 'Medium' },
      { id: 'coding-decoding', name: 'Coding-Decoding', questionsCount: 15, difficulty: 'Easy' },
      { id: 'seating-arrangement', name: 'Seating Arrangements', questionsCount: 10, difficulty: 'Hard' },
      { id: 'series', name: 'Number & Letter Series', questionsCount: 15, difficulty: 'Medium' },
    ]
  },
  {
    id: 'verbal',
    name: 'Verbal Ability',
    icon: '📝',
    description: 'Improve English grammar, vocabulary, and reading comprehension.',
    topics: [
      { id: 'reading-comp', name: 'Reading Comprehension', questionsCount: 10, difficulty: 'Medium' },
      { id: 'synonyms-antonyms', name: 'Synonyms & Antonyms', questionsCount: 20, difficulty: 'Easy' },
      { id: 'error-spotting', name: 'Error Spotting & Grammar', questionsCount: 15, difficulty: 'Medium' },
      { id: 'sentence-completion', name: 'Sentence Completion', questionsCount: 15, difficulty: 'Easy' },
      { id: 'para-jumbles', name: 'Para Jumbles', questionsCount: 10, difficulty: 'Hard' },
    ]
  }
];

export const sampleQuestions = {
  'time-work': [
    {
      id: 'q1',
      question: 'A can complete a piece of work in 10 days, and B can complete the same work in 15 days. How many days will they take to complete the work together?',
      options: ['5 days', '6 days', '7.5 days', '8 days'],
      correctAnswer: 1, // index 1 = '6 days'
      explanation: 'A\'s 1 day work = 1/10\nB\'s 1 day work = 1/15\n(A + B)\'s 1 day work = 1/10 + 1/15 = (3 + 2)/30 = 5/30 = 1/6.\nTherefore, together they will complete the work in 6 days.',
      difficulty: 'Easy'
    },
    {
      id: 'q2',
      question: 'A and B together can do a job in 12 days. B alone can do it in 30 days. In how many days can A alone complete the job?',
      options: ['18 days', '20 days', '22 days', '25 days'],
      correctAnswer: 1, // 20 days
      explanation: '(A + B)\'s 1 day work = 1/12\nB\'s 1 day work = 1/30\nA\'s 1 day work = 1/12 - 1/30 = (5 - 2)/60 = 3/60 = 1/20.\nSo A alone takes 20 days.',
      difficulty: 'Medium'
    }
  ],
  'blood-relations': [
    {
      id: 'q3',
      question: 'Pointing to a photograph, a man said, "I have no brother or sister but that man\'s father is my father\'s son." Whose photograph was it?',
      options: ['His own', 'His son\'s', 'His father\'s', 'His nephew\'s'],
      correctAnswer: 1, // His son's
      explanation: 'Since the narrator has no brothers or sisters, "my father\'s son" is the narrator himself.\nSo, "that man\'s father is myself".\nTherefore, the photograph is of his son.',
      difficulty: 'Easy'
    }
  ],
  'reading-comp': [
    {
      id: 'q4',
      question: 'Choose the word most nearly OPPOSITE in meaning to the word: PRAGMATIC',
      options: ['Practical', 'Idealistic', 'Sensible', 'Rational'],
      correctAnswer: 1, // Idealistic
      explanation: 'Pragmatic means dealing with things sensibly and realistically. The opposite is Idealistic.',
      difficulty: 'Easy'
    }
  ]
};
