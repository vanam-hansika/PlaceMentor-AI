// ============================================
// PlaceMentor AI — Scalable Target Companies & Roadmaps Dataset
// Complete coverage for Product, Service, Consulting, Automotive, and FinTech Firms
// Includes complete Aliases array & dynamic on-demand kit generator
// ============================================

export const companyKits = [
  // 1. Google
  {
    id: 'google',
    name: 'Google',
    aliases: ['google', 'alphabet', 'goog'],
    logo: '🌐',
    category: 'Product Based',
    difficulty: 'Hard',
    salary: '25 - 45 LPA',
    requiredSkills: ['Data Structures & Algorithms', 'C++ / Python / Java', 'System Design (LLD/HLD)', 'Operating Systems & Networking'],
    programmingTopics: ['Trees & Graphs', 'Dynamic Programming', 'Tries & Segment Trees', 'Recursion & Backtracking'],
    aptitudeTopics: ['Combinatorics', 'Probability', 'Puzzles & Logic'],
    technicalSubjects: ['Operating Systems (Threads/Locks)', 'Computer Networks (TCP/IP)', 'System Design', 'DBMS'],
    codingPrep: 'Focus on LeetCode Medium/Hard DP, Graph Traversals (BFS/DFS), and String Algorithms.',
    techInterviewPrep: 'Expect dry runs on whiteboard/coderpad, time/space complexity analysis, and edge cases.',
    hrPrep: 'Googley & Leadership Principles: Demonstrate teamwork, handling failure, and ambiguity.',
    recommendedResources: ['Google Tech Dev Guide', 'System Design Primer', 'NeetCode 150'],
    roadmapStages: [
      { stage: 'Stage 1: Core DSA Mastery', topics: 'Arrays, Strings, Hash Tables, Two Pointers', completed: true },
      { stage: 'Stage 2: Advanced Graph & DP', topics: 'Dijkstra, Topological Sort, DP on Trees', completed: false },
      { stage: 'Stage 3: System Design & CS Basics', topics: 'Concurrency, Distributed Cache, DB Indexing', completed: false },
      { stage: 'Stage 4: Googley Behavioral Prep', topics: 'Leadership, Conflict Resolution, STAR Method', completed: false },
    ],
    previousQuestions: [
      { id: 'g1', type: 'Coding', text: 'Find Median from Data Stream using Min/Max Heap', difficulty: 'Hard', topic: 'Heaps & Priority Queue', source: 'Verified Public Source' },
      { id: 'g2', type: 'Coding', text: 'Word Ladder II - Shortest Transformation Sequence', difficulty: 'Hard', topic: 'Graphs (BFS + DFS)', source: 'Verified Public Source' },
      { id: 'g3', type: 'Technical', text: 'Explain how TCP 3-Way Handshake works and why 2-way is insufficient', difficulty: 'Medium', topic: 'Computer Networks', source: 'Admin Uploaded' },
      { id: 'g4', type: 'Technical', text: 'Design an in-memory Key-Value store with TTL expiration', difficulty: 'Hard', topic: 'System Design & LLD', source: 'Verified Public Source' },
      { id: 'g5', type: 'HR', text: 'Tell me about a time you disagreed with your tech lead. How did you handle it?', difficulty: 'Medium', topic: 'Googley Leadership', source: 'Admin Uploaded' }
    ]
  },

  // 2. Microsoft
  {
    id: 'microsoft',
    name: 'Microsoft',
    aliases: ['microsoft', 'msft', 'micro'],
    logo: '🪟',
    category: 'Product Based',
    difficulty: 'Hard',
    salary: '22 - 42 LPA',
    requiredSkills: ['Data Structures & Algorithms', 'C# / C++ / Java', 'System Design (LLD/HLD)', 'Azure & Cloud Systems'],
    programmingTopics: ['Binary Trees & BSTs', 'Linked Lists & Stacks', 'Dynamic Programming', 'Bit Manipulation'],
    aptitudeTopics: ['Logical Reasoning', 'Puzzles', 'Quantitative Math'],
    technicalSubjects: ['Operating Systems (Memory Management)', 'DBMS & SQL', 'Object-Oriented Design', 'Computer Networks'],
    codingPrep: 'Practice Microsoft Top Questions on LeetCode, focusing on Binary Trees, Linked Lists, and System LLD.',
    techInterviewPrep: 'Clean code writing with Modular OOD principles, handling edge cases, and runtime efficiency.',
    hrPrep: 'Growth Mindset: Emphasize continuous learning, resilience under failure, and customer empathy.',
    recommendedResources: ['Microsoft Learn Portal', 'LeetCode Microsoft Card', 'Grokking System Design'],
    roadmapStages: [
      { stage: 'Stage 1: Linear Data Structures', topics: 'Arrays, Strings, Linked Lists, Stacks & Queues', completed: true },
      { stage: 'Stage 2: Trees, Graphs & DP', topics: 'Lowest Common Ancestor, Graph BFS/DFS, 1D/2D DP', completed: true },
      { stage: 'Stage 3: Low-Level System Design', topics: 'Design Elevator System, Parking Lot, Parking LLD', completed: false },
      { stage: 'Stage 4: Growth Mindset HR', topics: 'STAR Method, Handling Rejection, Team Alignment', completed: false },
    ],
    previousQuestions: [
      { id: 'm1', type: 'Coding', text: 'Serialize and Deserialize a Binary Tree', difficulty: 'Hard', topic: 'Trees & Serialization', source: 'Verified Public Source' },
      { id: 'm2', type: 'Coding', text: 'Reverse Nodes in k-Group in Linked List', difficulty: 'Hard', topic: 'Linked Lists', source: 'Verified Public Source' }
    ]
  },

  // 3. Amazon
  {
    id: 'amazon',
    name: 'Amazon',
    aliases: ['amazon', 'aws', 'amzn'],
    logo: '📦',
    category: 'Product Based',
    difficulty: 'Hard',
    salary: '18 - 32 LPA',
    requiredSkills: ['Object-Oriented Programming (OOPs)', 'Data Structures (Trees/Maps)', 'Amazon 16 Leadership Principles', 'REST APIs'],
    programmingTopics: ['Arrays & HashMaps', 'Trees & Binary Search Trees', 'Sliding Window', 'LRU Cache Design'],
    aptitudeTopics: ['Time & Work', 'Speed & Distance', 'Data Interpretation'],
    technicalSubjects: ['Object-Oriented Design', 'DBMS & SQL Indexes', 'Operating Systems', 'Cloud Basics (AWS)'],
    codingPrep: 'Solve Top Amazon Interview Questions on LeetCode. Practice writing clean code with OOP principles.',
    techInterviewPrep: 'Deep dive into your project architecture and OOP modular design decisions.',
    hrPrep: 'Amazon Leadership Principles: Customer Obsession, Ownership, Bias for Action, Invent and Simplify.',
    recommendedResources: ['Amazon LP Question Bank', 'Grokking the Coding Interview', 'OOP Design Patterns'],
    roadmapStages: [
      { stage: 'Stage 1: Arrays & HashMaps', topics: 'Two Sum, Group Anagrams, Subarray Sum', completed: true },
      { stage: 'Stage 2: Trees & LLD', topics: 'Tree Traversal, LRU Cache, Design Tic-Tac-Toe', completed: true },
      { stage: 'Stage 3: Amazon LP Stories', topics: 'Prepare 2 STAR stories per Leadership Principle', completed: false },
      { stage: 'Stage 4: Bar Raiser Prep', topics: 'Mock Interviews under stress & deep tech grilling', completed: false },
    ],
    previousQuestions: [
      { id: 'a1', type: 'Coding', text: 'Top K Frequent Words using Hash Map and Min-Heap', difficulty: 'Medium', topic: 'Hashing & Heaps', source: 'Verified Public Source' },
      { id: 'a2', type: 'Coding', text: 'Design LRU Cache with O(1) get and put operations', difficulty: 'Medium', topic: 'Doubly Linked List & HashMap', source: 'Verified Public Source' }
    ]
  },

  // 4. Tata Group (General / Conglomerate)
  {
    id: 'tata',
    name: 'Tata Group',
    aliases: ['tata', 'tata group', 'tata company'],
    logo: '🏛️',
    category: 'Conglomerate & Tech',
    difficulty: 'Medium',
    salary: '6.0 - 18 LPA',
    requiredSkills: ['Core Engineering Fundamentals', 'Python / C++ / Java', 'Database & SQL Queries', 'Corporate Leadership & Values'],
    programmingTopics: ['Arrays & Sorting', 'String Manipulation', 'Basic Data Structures', 'SQL Queries'],
    aptitudeTopics: ['Quantitative Ability', 'Analytical Reasoning', 'Verbal English', 'Business Case Analysis'],
    technicalSubjects: ['Software Engineering', 'DBMS & SQL', 'Operating Systems', 'Ethics & Corporate Governance'],
    codingPrep: 'Focus on core programming fundamentals, array manipulation, and SQL data queries.',
    techInterviewPrep: 'Be ready to discuss engineering projects, Tata Code of Conduct, and business domain knowledge.',
    hrPrep: 'Tata Values: Integrity, Excellence, Responsibility, Pioneering, Unity.',
    recommendedResources: ['Tata Code of Conduct Guide', 'Tata Graduate Trainee Prep', 'SQL & Aptitude Master Kit'],
    roadmapStages: [
      { stage: 'Stage 1: Tata Cognitive & Aptitude Test', topics: 'Numerical Reasoning, Logic, English Comprehension', completed: true },
      { stage: 'Stage 2: Technical Domain Assessment', topics: 'Data Structures, C/Java Syntax, SQL Joins', completed: true },
      { stage: 'Stage 3: Domain Technical Interview', topics: 'Project Walkthrough, DBMS, Software Engineering', completed: false },
      { stage: 'Stage 4: HR & Leadership Values Round', topics: 'Tata Values, Adaptability, Career Vision', completed: false },
    ],
    previousQuestions: [
      { id: 'tata1', type: 'Technical', text: 'What are Tata Group values and how do you align with corporate social responsibility?', difficulty: 'Easy', topic: 'Tata Leadership', source: 'Verified Public Source' },
      { id: 'tata2', type: 'Coding', text: 'Find the largest contiguous sum in an array (Kadane Algorithm)', difficulty: 'Medium', topic: 'Arrays', source: 'Verified Public Source' }
    ]
  },

  // 5. TCS (Tata Consultancy Services)
  {
    id: 'tcs',
    name: 'Tata Consultancy Services (TCS)',
    aliases: ['tcs', 'tata consultancy services', 'tata consultancy', 'tata cs', 'tata'],
    logo: '💼',
    category: 'Service & IT Products',
    difficulty: 'Easy - Medium',
    salary: '3.6 - 7.5 LPA',
    requiredSkills: ['Quantitative & Logical Aptitude', 'C / C++ / Python Fundamentals', 'SQL Queries & Joins', 'Software Engineering Basics'],
    programmingTopics: ['Basic String Manipulation', 'Array Searching & Sorting', 'Matrix Operations', 'Pattern Printing'],
    aptitudeTopics: ['Percentages & Profit Loss', 'Ratios', 'Blood Relations', 'Syllogisms'],
    technicalSubjects: ['SQL Joins & Group By', 'C Programming Pointers', 'Data Structures (Stack, Queue)', 'SDLC Phases'],
    codingPrep: 'Practice TCS NQT past coding questions and basic string/array algorithms.',
    techInterviewPrep: 'Revise final year project, basic C/C++/Java syntax, and fundamental SQL queries.',
    hrPrep: 'Standard HR questions: Relocation, night shifts, bond agreements, strengths/weaknesses.',
    recommendedResources: ['TCS NQT Aptitude Guide', 'PrepInsta TCS NQT Pack', 'SQL Cheat Sheet'],
    roadmapStages: [
      { stage: 'Stage 1: NQT Aptitude Speed', topics: 'Percentages, Ratios, Speed-Distance, Logic', completed: true },
      { stage: 'Stage 2: C / Python Coding', topics: 'Prime Series, Palindrome, Matrix Transpose', completed: true },
      { stage: 'Stage 3: SQL & Project Prep', topics: 'INNER/LEFT JOIN, Group By, Project Explanation', completed: false },
      { stage: 'Stage 4: HR & Behavioral', topics: 'Self-Introduction, Shift Flexibility, Career Plan', completed: false },
    ],
    previousQuestions: [
      { id: 'tcs1', type: 'Coding', text: 'Find all Prime Numbers in a given range [L, R]', difficulty: 'Easy', topic: 'Basic Math & Loops', source: 'Verified Public Source' },
      { id: 'tcs2', type: 'Coding', text: 'Check if two strings are Anagrams of each other', difficulty: 'Easy', topic: 'Strings & Frequency Array', source: 'Verified Public Source' },
      { id: 'tcs3', type: 'Technical', text: 'Write a SQL query to find the 2nd highest salary from Employee table', difficulty: 'Medium', topic: 'SQL Queries', source: 'Admin Uploaded' }
    ]
  },

  // 6. Tata Motors
  {
    id: 'tata-motors',
    name: 'Tata Motors',
    logo: '🚗',
    category: 'Automotive & Tech',
    difficulty: 'Medium',
    salary: '6.5 - 14 LPA',
    requiredSkills: ['Embedded Systems / C++', 'Python for Automation & Analytics', 'CAD / Control Systems Basics', 'SQL & Data Analysis'],
    programmingTopics: ['Embedded C Logic', 'Data Structures (Arrays, Buffers)', 'Sensor Data Processing', 'Basic Math Algorithms'],
    aptitudeTopics: ['Mechanical & Spatial Reasoning', 'Quantitative Aptitude', 'Data Interpretation'],
    technicalSubjects: ['Automotive Control Systems', 'Embedded C / Real-time Systems', 'DBMS', 'CAN Bus Basics'],
    codingPrep: 'Practice basic C/C++ memory pointers, bitwise shifts, and sensor logic algorithms.',
    techInterviewPrep: 'Be ready to discuss EV architecture, embedded microcontrollers, and final year projects.',
    hrPrep: 'Discuss passion for automotive innovation, sustainability, and EV technology.',
    recommendedResources: ['Tata Motors GET Preparation Guide', 'Embedded Systems Basics', 'Quant & Mechanical Puzzles'],
    roadmapStages: [
      { stage: 'Stage 1: GET Written Assessment', topics: 'Aptitude, Spatial Logic, Engineering Domain', completed: true },
      { stage: 'Stage 2: Domain Technical Test', topics: 'Embedded C, Control Systems, Data Analysis', completed: true },
      { stage: 'Stage 3: Technical Interview', topics: 'Project Walkthrough, Microcontrollers, CAN Bus', completed: false },
      { stage: 'Stage 4: HR & Leadership Round', topics: 'Tata Values, Location Preference, Vision', completed: false },
    ],
    previousQuestions: [
      { id: 'tmot1', type: 'Technical', text: 'Explain CAN (Controller Area Network) Bus protocol used in vehicle ECUs', difficulty: 'Medium', topic: 'Automotive Embedded', source: 'Verified Public Source' },
      { id: 'tmot2', type: 'Coding', text: 'Filter noisy sensor data stream using Moving Average Buffer in C++', difficulty: 'Medium', topic: 'Buffers & Arrays', source: 'Verified Public Source' }
    ]
  },

  // 7. Tata Steel
  {
    id: 'tata-steel',
    name: 'Tata Steel',
    logo: '🏗️',
    category: 'Industrial & Tech',
    difficulty: 'Medium',
    salary: '6.0 - 12 LPA',
    requiredSkills: ['Industrial Automation & IoT', 'Python / C++ Programming', 'Data Analytics & SQL', 'Engineering Domain Math'],
    programmingTopics: ['Data Processing Scripts', 'Array Algorithms', 'Statistical Calculations', 'Logic Gates'],
    aptitudeTopics: ['Engineering Mathematics', 'Quantitative Aptitude', 'Logical Reasoning'],
    technicalSubjects: ['Process Control Systems', 'SQL Databases', 'Data Analytics Basics', 'Industrial Safety'],
    codingPrep: 'Focus on basic Python data processing, SQL aggregations, and engineering math.',
    techInterviewPrep: 'Revise core engineering fundamentals, automation projects, and safety standards.',
    hrPrep: 'Tata Steel Core Culture: Employee welfare, safety commitment, and operational excellence.',
    recommendedResources: ['Tata Steel MindOverMatter Guide', 'Engineering Domain Prep', 'SQL Cheat Sheet'],
    roadmapStages: [
      { stage: 'Stage 1: MindOverMatter Aptitude', topics: 'Engineering Quant, Logic, Data Interpretation', completed: true },
      { stage: 'Stage 2: Technical Case Study', topics: 'Automation Logic, Data Processing, SQL', completed: true },
      { stage: 'Stage 3: Technical Interview', topics: 'Core Domain Project, Process Control, Safety', completed: false },
      { stage: 'Stage 4: HR Final Interview', topics: 'Tata Steel Ethics, Relocation, Career Goals', completed: false },
    ],
    previousQuestions: [
      { id: 'tstl1', type: 'Technical', text: 'How is IoT sensor monitoring integrated into blast furnace process automation?', difficulty: 'Medium', topic: 'Industrial IoT', source: 'Verified Public Source' },
      { id: 'tstl2', type: 'Coding', text: 'Write a program to calculate rolling average temperature of steel coils', difficulty: 'Easy', topic: 'Arrays & Math', source: 'Verified Public Source' }
    ]
  },

  // 8. Wipro
  {
    id: 'wipro',
    name: 'Wipro',
    aliases: ['wipro', 'wip', 'wipro elite', 'wipro nlth'],
    logo: '🌐',
    category: 'Service Based',
    difficulty: 'Easy - Medium',
    salary: '3.5 - 7.0 LPA',
    requiredSkills: ['C / Java / Python Programming', 'Data Structures (Arrays, Strings)', 'SQL Queries & Joins', 'Quantitative Aptitude'],
    programmingTopics: ['Basic String Operations', 'Array Searching & Sorting', 'Matrix Transposition', 'Number Theory Puzzles'],
    aptitudeTopics: ['Percentages', 'Profit & Loss', 'Time & Work', 'Blood Relations'],
    technicalSubjects: ['C Syntax & Memory Pointers', 'SQL INNER/OUTER JOINs', 'Software Development Life Cycle', 'DBMS Normalization'],
    codingPrep: 'Practice Wipro NLTH / Elite past papers, string manipulations, and array algorithms.',
    techInterviewPrep: 'Revise C/Java basics, OOPs concepts, final year project walkthrough, and SQL queries.',
    hrPrep: 'Demonstrate willingness to work in night shifts, learn new technical stacks, and relocate.',
    recommendedResources: ['Wipro NLTH Preparation Guide', 'PrepInsta Wipro Elite Pack', 'Java OOP Cheat Sheet'],
    roadmapStages: [
      { stage: 'Stage 1: Quantitative & Verbal Aptitude', topics: 'Speed-Distance, Percentages, Syllogisms, Grammar', completed: true },
      { stage: 'Stage 2: Programming Fundamentals', topics: 'C / Java Control Flow, Pointers, Arrays, Strings', completed: true },
      { stage: 'Stage 3: Core CS & Project Review', topics: 'DBMS Joins, OOPs Principles, Final Year Project', completed: false },
      { stage: 'Stage 4: Technical & HR Round', topics: 'Self-Introduction, Shift Flexibility, Career Goals', completed: false },
    ],
    previousQuestions: [
      { id: 'w1', type: 'Coding', text: 'Find the second largest element in an array without sorting', difficulty: 'Easy', topic: 'Arrays', source: 'Verified Public Source' },
      { id: 'w2', type: 'Coding', text: 'Check whether a string is a Palindrome ignoring spaces and case', difficulty: 'Easy', topic: 'Strings', source: 'Verified Public Source' }
    ]
  },

  // 9. Accenture
  {
    id: 'accenture',
    name: 'Accenture',
    aliases: ['accenture', 'acc', 'accenture tech'],
    logo: '⚡',
    category: 'Service & Consulting',
    difficulty: 'Easy - Medium',
    salary: '4.5 - 9.5 LPA',
    requiredSkills: ['Cognitive Ability & Critical Reasoning', 'Pseudo Code & Algorithm Logic', 'Fundamental Coding (Python/Java/C++)', 'Cloud Fundamentals'],
    programmingTopics: ['Bit Manipulation Logic', 'Array Subsequences', 'String Encoding/Decoding', 'Recursion'],
    aptitudeTopics: ['Analytical Reasoning', 'Visual Logic', 'Reading Comprehension', 'Data Interpretation'],
    technicalSubjects: ['Pseudo Code Interpretation', 'Cloud & Security Basics', 'DBMS & SQL', 'Web Basics'],
    codingPrep: 'Solve Accenture Pseudo-code and Coding questions. Focus on Bitwise XOR operations and string logic.',
    techInterviewPrep: 'Explain pseudocode line-by-line, demonstrate logical thinking, and review your project.',
    hrPrep: 'Discuss adaptability, teamwork in cross-functional projects, and career aspirations.',
    recommendedResources: ['Accenture Placement Papers', 'GeeksforGeeks Accenture Drive', 'Pseudo Code Practice'],
    roadmapStages: [
      { stage: 'Stage 1: Cognitive Assessment', topics: 'Critical Reasoning, Abstract Logic, Verbal Ability', completed: true },
      { stage: 'Stage 2: Technical & Pseudocode', topics: 'Bitwise Operators, Loop Tracing, Array Subsets', completed: true },
      { stage: 'Stage 3: Coding Assessment', topics: 'String Transmutation, Array Transformation', completed: false },
      { stage: 'Stage 4: Communication & HR Interview', topics: 'Spoken English Assessment, Project Walkthrough', completed: false },
    ],
    previousQuestions: [
      { id: 'ac1', type: 'Coding', text: 'Calculate the total count of elements divisible by both 3 and 5 in an array', difficulty: 'Easy', topic: 'Loops & Math', source: 'Verified Public Source' },
      { id: 'ac2', type: 'Technical', text: 'Evaluate the output of Bitwise XOR operations in given pseudocode snippet', difficulty: 'Easy', topic: 'Pseudocode Logic', source: 'Verified Public Source' }
    ]
  },

  // 10. Infosys
  {
    id: 'infosys',
    name: 'Infosys',
    aliases: ['infosys', 'infy', 'infytq', 'infosys sp', 'infosys dse'],
    logo: '🏢',
    category: 'Service Based',
    difficulty: 'Medium',
    salary: '3.6 - 9.5 LPA',
    requiredSkills: ['Python / Java OOPs', 'SQL Database Normalization', 'Reasoning & Aptitude', 'Data Structures (Arrays, Trees)'],
    programmingTopics: ['Dynamic Programming (1D/2D)', 'Recursion & Backtracking', 'String Partitioning', 'Subarray Problems'],
    aptitudeTopics: ['Cryptarithmetic', 'Data Sufficiency', 'Visual Reasoning', 'Permutations & Combinations'],
    technicalSubjects: ['DBMS Normalization (1NF to 3NF)', 'Python Functions & Lambda', 'Operating System Basics'],
    codingPrep: 'Practice Hackerrank/InfyTQ practice papers. Focus on 1D Dynamic Programming.',
    techInterviewPrep: 'Be ready to write pseudocode on paper and explain your final year college project.',
    hrPrep: 'Explain why Infosys, willingness to learn new tech stacks, and team collaboration examples.',
    recommendedResources: ['InfyTQ Official Portal', 'GeeksforGeeks Infosys Prep', 'Aptitude Practice Set'],
    roadmapStages: [
      { stage: 'Stage 1: InfyTQ Foundation', topics: 'Python/Java OOPs, DBMS Concepts, SQL', completed: true },
      { stage: 'Stage 2: Medium DP & Arrays', topics: 'Unique Paths, Subarray Sum Equals K', completed: false },
      { stage: 'Stage 3: Technical Round', topics: 'Project Walkthrough, Pseudocode Explanation', completed: false },
      { stage: 'Stage 4: HR Final Round', topics: 'Cultural Alignment, Learning Agility', completed: false },
    ],
    previousQuestions: [
      { id: 'i1', type: 'Coding', text: 'Unique Paths in Grid with Obstacles', difficulty: 'Medium', topic: 'Dynamic Programming', source: 'Verified Public Source' },
      { id: 'i2', type: 'Coding', text: 'Find Subarray with Given Sum K', difficulty: 'Medium', topic: 'Arrays & Prefix Sum', source: 'Verified Public Source' }
    ]
  },

  // 11. Cognizant
  {
    id: 'cognizant',
    name: 'Cognizant (CTS)',
    aliases: ['cognizant', 'cts', 'genc', 'genc elevate', 'cog'],
    logo: '💡',
    category: 'Service Based',
    difficulty: 'Easy - Medium',
    salary: '4.0 - 6.7 LPA',
    requiredSkills: ['C / Java Fundamentals', 'SQL Queries & Joins', 'Quantitative Reasoning', 'Communication Skills'],
    programmingTopics: ['Array Rotations', 'String Reversal & Filters', 'Sorting Algorithms', 'Basic Recursion'],
    aptitudeTopics: ['Data Interpretation', 'Number Series', 'Coding-Decoding', 'Statement & Conclusions'],
    technicalSubjects: ['C Memory Management', 'OOP Principles', 'DBMS Relationships', 'Software Quality Assurance'],
    codingPrep: 'Solve Cognizant GenC / GenC Elevate coding challenges.',
    techInterviewPrep: 'Be fluent in C/Java basics, OOPs concepts, and SQL queries.',
    hrPrep: 'Demonstrate adaptability, willingness to work in shifts, and continuous learning.',
    recommendedResources: ['Cognizant GenC Prep', 'Face Prep CTS Portal', 'SQL Master Notes'],
    roadmapStages: [
      { stage: 'Stage 1: Aptitude & Skill Assessment', topics: 'Quant, Logic, Verbal, Automata Fix', completed: true },
      { stage: 'Stage 2: GenC Coding & Technical', topics: 'C/Java Syntax, Arrays, String Algorithms', completed: true },
      { stage: 'Stage 3: Technical Interview', topics: 'Project Explanation, DBMS & OOPs', completed: false },
      { stage: 'Stage 4: HR Interview', topics: 'Self-Introduction, Corporate Values', completed: false },
    ],
    previousQuestions: [
      { id: 'c1', type: 'Coding', text: 'Rotate an Array by K positions to the right', difficulty: 'Easy', topic: 'Arrays', source: 'Verified Public Source' }
    ]
  },

  // 12. HCLTech
  {
    id: 'hcltech',
    name: 'HCLTech',
    aliases: ['hcl', 'hcltech', 'hcl technologies'],
    logo: '⚡',
    category: 'Service Based',
    difficulty: 'Easy - Medium',
    salary: '3.6 - 7.2 LPA',
    requiredSkills: ['C / C++ / Java / Python', 'SQL Joins & Queries', 'Networking & Cloud Basics', 'Quantitative Aptitude'],
    programmingTopics: ['Array Search & Filter', 'String Manipulation', 'Basic Recursion', 'Sorting'],
    aptitudeTopics: ['Numerical Ability', 'Logical Reasoning', 'Verbal Reasoning'],
    technicalSubjects: ['C Programming', 'DBMS & SQL', 'Operating System Basics', 'Networking'],
    codingPrep: 'Solve HCL First Careers placement papers.',
    techInterviewPrep: 'Focus on C/Java fundamentals, final year project, and SQL queries.',
    hrPrep: 'Demonstrate enthusiasm, willingness to learn new technologies, and corporate etiquette.',
    recommendedResources: ['HCL Placement Prep', 'PrepInsta HCL Pack', 'SQL Cheat Sheet'],
    roadmapStages: [
      { stage: 'Stage 1: Aptitude & Technical Test', topics: 'Quant, Verbal, Logic, C/Java Concepts', completed: true },
      { stage: 'Stage 2: Coding Test', topics: 'Array Search, String Processing, Logic', completed: true },
      { stage: 'Stage 3: Technical & HR Round', topics: 'Project Walkthrough, DBMS, Relocation', completed: false },
    ],
    previousQuestions: [
      { id: 'hcl1', type: 'Coding', text: 'Count occurrences of vowels in a given string', difficulty: 'Easy', topic: 'Strings', source: 'Verified Public Source' }
    ]
  },

  // 13. LTIMindtree
  {
    id: 'ltimindtree',
    name: 'LTIMindtree',
    aliases: ['lti', 'mindtree', 'ltimindtree', 'lti mindtree'],
    logo: '🌲',
    category: 'Service & Consulting',
    difficulty: 'Medium',
    salary: '4.5 - 8.5 LPA',
    requiredSkills: ['Java / Python / C++', 'Object-Oriented Programming (OOPs)', 'SQL Database Design', 'Aptitude & Logic'],
    programmingTopics: ['Array Manipulation', 'String Formatting', 'Sorting & Searching', 'Recursion'],
    aptitudeTopics: ['Quantitative Ability', 'Logical Puzzles', 'Verbal English'],
    technicalSubjects: ['OOP Principles', 'DBMS & SQL Joins', 'Software Engineering', 'Operating Systems'],
    codingPrep: 'Practice LTIMindtree past placement coding questions.',
    techInterviewPrep: 'Be ready for live pseudocode explanation, OOP design questions, and SQL joins.',
    hrPrep: 'Focus on teamwork, client service mindset, and continuous learning.',
    recommendedResources: ['LTIMindtree Prep Kit', 'PrepInsta LTI Pack', 'Java OOP Notes'],
    roadmapStages: [
      { stage: 'Stage 1: Psychometric & Aptitude', topics: 'Quant, Logic, Verbal, Behavioral', completed: true },
      { stage: 'Stage 2: Coding & Technical Test', topics: 'Arrays, Strings, SQL Queries', completed: true },
      { stage: 'Stage 3: Technical & HR Round', topics: 'Project Review, OOPs, Corporate Alignment', completed: false },
    ],
    previousQuestions: [
      { id: 'lti1', type: 'Coding', text: 'Find the first non-repeating character in a string', difficulty: 'Easy', topic: 'Strings & Hash Table', source: 'Verified Public Source' }
    ]
  },

  // 14. Reliance / Jio
  {
    id: 'reliance-jio',
    name: 'Reliance Jio Platforms',
    aliases: ['reliance', 'jio', 'reliance jio', 'jio platforms'],
    logo: '📶',
    category: 'Telecom & Tech Product',
    difficulty: 'Medium',
    salary: '6.0 - 16 LPA',
    requiredSkills: ['Java / Python / C++', 'Computer Networks & Telecom Tech', 'SQL & Distributed Databases', 'Data Structures'],
    programmingTopics: ['Array Algorithms', 'String Logic', 'Sorting & Searching', 'Hash Maps'],
    aptitudeTopics: ['Quantitative Math', 'Logical Deduction', 'Data Interpretation'],
    technicalSubjects: ['Computer Networks (TCP/IP, 5G)', 'DBMS & SQL', 'Operating Systems', 'System Architecture'],
    codingPrep: 'Solve Jio placement coding challenges on HackerEarth.',
    techInterviewPrep: 'Focus on networking protocols, cloud/distributed systems, and project walkthrough.',
    hrPrep: 'Demonstrate alignment with Reliance values: Growth, Speed, Ownership.',
    recommendedResources: ['Jio Graduate Trainee Prep', 'Networking Master Class', 'SQL & DSA Pack'],
    roadmapStages: [
      { stage: 'Stage 1: Online Aptitude & Coding', topics: 'Quant, Networks, Array & String Coding', completed: true },
      { stage: 'Stage 2: Technical Interview', topics: 'Networking Protocols, OS, Project Walkthrough', completed: false },
      { stage: 'Stage 3: HR & Management Round', topics: 'Ownership, Relocation, Reliance Growth Vision', completed: false },
    ],
    previousQuestions: [
      { id: 'jio1', type: 'Technical', text: 'Explain how 5G Network Slicing works and its underlying software architecture', difficulty: 'Medium', topic: 'Computer Networks', source: 'Verified Public Source' }
    ]
  },

  // 15. Freshworks
  {
    id: 'freshworks',
    name: 'Freshworks',
    aliases: ['freshworks', 'freshworks saas'],
    logo: '🌱',
    category: 'Product & SaaS',
    difficulty: 'Medium - Hard',
    salary: '12 - 24 LPA',
    requiredSkills: ['Ruby / Python / Java / JavaScript', 'Data Structures & Algorithms', 'Web Development & REST APIs', 'Database Systems'],
    programmingTopics: ['Arrays & Hash Maps', 'Trees & BSTs', 'Dynamic Programming', 'REST API Architecture'],
    aptitudeTopics: ['Logical Reasoning', 'Puzzles', 'Quant'],
    technicalSubjects: ['Web Architecture (HTTP, REST)', 'DBMS & Indexing', 'OOP Design Patterns', 'OS Basics'],
    codingPrep: 'Practice HackerRank Freshworks coding challenges.',
    techInterviewPrep: 'Be ready for live problem solving, REST API architecture questions, and project review.',
    hrPrep: 'Freshworks Values: Happy work environment, customer love, speed.',
    recommendedResources: ['Freshworks Tech Blog', 'HackerRank Freshworks Prep', 'System LLD Guide'],
    roadmapStages: [
      { stage: 'Stage 1: HackerRank Coding Test', topics: 'Arrays, Strings, Hash Maps, Recursion', completed: true },
      { stage: 'Stage 2: Live Problem Solving (LLD)', topics: 'Design Web Crawler, URL Shortener', completed: false },
      { stage: 'Stage 3: Tech & Culture Round', topics: 'Web Architecture, Values Fit', completed: false },
    ],
    previousQuestions: [
      { id: 'fw1', type: 'Coding', text: 'Design a URL Shortener with hashing and collision resolution', difficulty: 'Medium', topic: 'System Design & LLD', source: 'Verified Public Source' }
    ]
  },

  // 16. Swiggy
  {
    id: 'swiggy',
    name: 'Swiggy',
    aliases: ['swiggy', 'swiggy tech'],
    logo: '🛵',
    category: 'Product & FoodTech',
    difficulty: 'Hard',
    salary: '18 - 36 LPA',
    requiredSkills: ['Java / Go / Python / Node.js', 'Data Structures & Algorithms', 'Machine Coding & Low-Level Design', 'System Architecture'],
    programmingTopics: ['Graphs & Shortest Path (Dijkstra)', 'Trees & BSTs', 'Dynamic Programming', 'Object-Oriented Design'],
    aptitudeTopics: ['Logical Puzzles', 'Probability', 'Combinatorics'],
    technicalSubjects: ['Microservices', 'Distributed Caching (Redis)', 'DBMS & Indexing', 'Kafka Event Streaming'],
    codingPrep: 'Practice Machine Coding round (Design Food Delivery App, Delivery Partner Allocation).',
    techInterviewPrep: 'Focus on clean, extensible OOP code during 90-min machine coding round.',
    hrPrep: 'Demonstrate customer focus, speed of execution, and problem ownership.',
    recommendedResources: ['Swiggy Engineering Blog', 'Machine Coding Guide', 'LeetCode Medium/Hard'],
    roadmapStages: [
      { stage: 'Stage 1: Machine Coding Round', topics: 'Design Delivery Assignment System, Food App LLD', completed: true },
      { stage: 'Stage 2: Advanced DSA Round', topics: 'Graphs, Shortest Path, DP, Priority Queue', completed: false },
      { stage: 'Stage 3: System Design & Culture', topics: 'Kafka, Redis, Scalability, Team Alignment', completed: false },
    ],
    previousQuestions: [
      { id: 'sw1', type: 'Coding', text: 'Machine Coding: Design an Order Fulfillment & Delivery Partner Assignment Engine', difficulty: 'Hard', topic: 'Low-Level Design', source: 'Verified Public Source' }
    ]
  },

  // 17. Zomato
  {
    id: 'zomato',
    name: 'Zomato',
    logo: '🔴',
    aliases: ['zomato', 'blinkit', 'zomato tech'],
    category: 'Product & FoodTech',
    difficulty: 'Hard',
    salary: '16 - 32 LPA',
    requiredSkills: ['Python / Node.js / Go / Java', 'Data Structures & Algorithms', 'System Architecture', 'Database Systems'],
    programmingTopics: ['Arrays & Hash Maps', 'Graphs & Trees', 'Dynamic Programming', 'System Design'],
    aptitudeTopics: ['Puzzles', 'Combinatorics', 'Logic'],
    technicalSubjects: ['Microservices', 'DBMS Indexing & Sharding', 'Redis Caching', 'Operating Systems'],
    codingPrep: 'Solve LeetCode Medium/Hard questions and study microservices caching patterns.',
    techInterviewPrep: 'Be ready to discuss live production incidents, high throughput architectures, and project design.',
    hrPrep: 'High energy, ownership mindset, and passion for product scale.',
    recommendedResources: ['Zomato Tech Blog', 'System Design Primer', 'LeetCode Hard'],
    roadmapStages: [
      { stage: 'Stage 1: Online Coding Test', topics: 'Arrays, Strings, Hash Maps, Graphs', completed: true },
      { stage: 'Stage 2: Technical Interview 1 (DSA)', topics: 'Trees, Graphs, Shortest Path', completed: false },
      { stage: 'Stage 3: Technical Interview 2 (System Design)', topics: 'Design High Throughput Notification Engine', completed: false },
      { stage: 'Stage 4: Culture & Leadership', topics: 'Ownership, Speed, Product Mindset', completed: false },
    ],
    previousQuestions: [
      { id: 'zom1', type: 'Coding', text: 'Design a Distributed Notification Service with Retry Queue', difficulty: 'Hard', topic: 'System Design', source: 'Verified Public Source' }
    ]
  },

  // 18. PhonePe
  {
    id: 'phonepe',
    name: 'PhonePe',
    aliases: ['phonepe', 'phone pe', 'fintech'],
    logo: '🟣',
    category: 'FinTech & Product',
    difficulty: 'Hard',
    salary: '22 - 40 LPA',
    requiredSkills: ['Java / Go / Python', 'Data Structures & Algorithms', 'High Concurrency & Transactional Consistency', 'Low-Level Design'],
    programmingTopics: ['Machine Coding Round', 'Graphs & Trees', 'Dynamic Programming', 'Concurrency & Threads'],
    aptitudeTopics: ['Probability', 'Puzzles', 'Quantitative Math'],
    technicalSubjects: ['ACID Properties', 'Distributed Transactions (Saga Pattern)', 'DBMS & Indexing', 'Kafka Streaming'],
    codingPrep: 'Practice Machine Coding round (Design Digital Wallet System, Payment Gateway Router).',
    techInterviewPrep: 'Focus on thread safety, atomic operations, and transaction integrity.',
    hrPrep: 'PhonePe culture: Trust, zero tolerance for payment failures, technical depth.',
    recommendedResources: ['PhonePe Tech Blog', 'Grokking LLD', 'Concurrency in Java'],
    roadmapStages: [
      { stage: 'Stage 1: Machine Coding Round', topics: 'Design Payment Wallet System with Thread Safety', completed: true },
      { stage: 'Stage 2: DSA & Problem Solving', topics: 'Trees, Graphs, DP, Heaps', completed: false },
      { stage: 'Stage 3: System Design & Concurrency', topics: 'Distributed Lock, Saga Pattern, Kafka', completed: false },
      { stage: 'Stage 4: HR & Cultural Fit', topics: 'FinTech Trust, High Stakes Responsibility', completed: false },
    ],
    previousQuestions: [
      { id: 'pp1', type: 'Coding', text: 'Machine Coding: Design a Digital Wallet Service with Atomic Fund Transfers', difficulty: 'Hard', topic: 'Low-Level Design & Concurrency', source: 'Verified Public Source' }
    ]
  },

  // 19. Razorpay
  {
    id: 'razorpay',
    name: 'Razorpay',
    aliases: ['razorpay', 'razor pay'],
    logo: '💳',
    category: 'FinTech & SaaS',
    difficulty: 'Hard',
    salary: '20 - 38 LPA',
    requiredSkills: ['Go / PHP / Python / Java', 'Data Structures & Algorithms', 'System Architecture & Security', 'Object-Oriented Design'],
    programmingTopics: ['Machine Coding Round', 'Graphs & Trees', 'Dynamic Programming', 'System Design'],
    aptitudeTopics: ['Logical Reasoning', 'Puzzles', 'Combinatorics'],
    technicalSubjects: ['Payment Security (PCI-DSS)', 'Idempotency', 'DBMS & SQL', 'API Rate Limiting'],
    codingPrep: 'Practice Machine Coding (Design Payment Router, Subscriptions Engine).',
    techInterviewPrep: 'Discuss API idempotency, webhooks reliability, and transaction safety.',
    hrPrep: 'Razorpay values: Customer empathy, ownership, transparency, bias for action.',
    recommendedResources: ['Razorpay Tech Blog', 'Machine Coding Guide', 'LeetCode DSA'],
    roadmapStages: [
      { stage: 'Stage 1: Machine Coding Round', topics: 'Design Subscription Engine with Webhooks', completed: true },
      { stage: 'Stage 2: DSA Round', topics: 'Graphs, Trees, DP, Array Logic', completed: false },
      { stage: 'Stage 3: System Design Round', topics: 'API Rate Limiting, Idempotency Keys', completed: false },
      { stage: 'Stage 4: Cultural Round', topics: 'Values Fit, Customer Focus', completed: false },
    ],
    previousQuestions: [
      { id: 'rp1', type: 'Coding', text: 'Design an Idempotent API Request Processing Pipeline', difficulty: 'Hard', topic: 'System Design & LLD', source: 'Verified Public Source' }
    ]
  },

  // 20. Zoho (Product)
  {
    id: 'zoho',
    name: 'Zoho',
    aliases: ['zoho', 'zoho corp', 'zoho product'],
    logo: '🚩',
    category: 'Product Based',
    difficulty: 'Medium - Hard',
    salary: '6.0 - 15 LPA',
    requiredSkills: ['C / C++ / Java Programming', 'Basic-to-Advanced Problem Solving', 'Object-Oriented Design (No Libraries Allowed)', 'Puzzles'],
    programmingTopics: ['Pattern Printing', 'String Manipulation without built-in functions', 'Matrix Manipulation', 'Recursion & Backtracking'],
    aptitudeTopics: ['Puzzles', 'Speed Math', 'Logical Deductions'],
    technicalSubjects: ['C Pointers & Memory', 'OOPs from Scratch', 'Data Structures from Scratch'],
    codingPrep: 'Solve Zoho past programming rounds. Practice writing algorithms without using built-in utility functions.',
    techInterviewPrep: 'Be ready for live coding on paper/whiteboard across multiple elimination rounds.',
    hrPrep: 'Show passion for coding, self-learning, and long-term commitment.',
    recommendedResources: ['Zoho Coding Round Practice Set', 'GeeksforGeeks Zoho Drive', 'C Programming Deep Dive'],
    roadmapStages: [
      { stage: 'Stage 1: Basic Programming & Patterns', topics: 'String Manipulation without built-in methods, Matrix Puzzles', completed: true },
      { stage: 'Stage 2: Advanced Coding Round', topics: 'Evaluate Expression, Substring Matching, Recursion', completed: true },
      { stage: 'Stage 3: Application Design (LLD)', topics: 'Design Railway Reservation System, Dungeon Game', completed: false },
      { stage: 'Stage 4: Tech & HR Interview', topics: 'Live Whiteboard Coding, Project Discussion', completed: false },
    ],
    previousQuestions: [
      { id: 'z1', type: 'Coding', text: 'Print matrix in Spiral Form without using external libraries', difficulty: 'Medium', topic: 'Matrix Operations', source: 'Verified Public Source' },
      { id: 'z2', type: 'Coding', text: 'Design a Railway Reservation System with Booking, Cancellation, and Waiting List', difficulty: 'Hard', topic: 'Low-Level Application Design', source: 'Verified Public Source' }
    ]
  }
];

// Enhanced Search Engine: Matches Name, Category, ID, or any entry in the Aliases Array!
export function searchCompanies(query) {
  if (!query || !query.trim()) return companyKits;

  const term = query.trim().toLowerCase();

  return companyKits.filter(company => {
    const matchName = company.name.toLowerCase().includes(term);
    const matchCategory = company.category.toLowerCase().includes(term);
    const matchId = company.id.toLowerCase().includes(term);
    const matchAlias = company.aliases && company.aliases.some(alias => alias.toLowerCase().includes(term));

    return matchName || matchCategory || matchId || matchAlias;
  });
}

// Helper: Case-insensitive search & dynamic kit fallback guarantee
export function getCompanyKit(companyNameOrId) {
  if (!companyNameOrId) return companyKits[0];

  const searchKey = String(companyNameOrId).trim().toLowerCase();

  // 1. Direct ID / Exact Name Match
  let found = companyKits.find(
    c => c.id.toLowerCase() === searchKey || c.name.toLowerCase() === searchKey
  );

  // 2. Check Aliases Match
  if (!found) {
    found = companyKits.find(
      c => c.aliases && c.aliases.some(alias => alias.toLowerCase() === searchKey)
    );
  }

  // 3. Partial Name / Category / Alias Match
  if (!found) {
    found = companyKits.find(
      c => c.name.toLowerCase().includes(searchKey) ||
           c.id.toLowerCase().includes(searchKey) ||
           (c.aliases && c.aliases.some(alias => alias.toLowerCase().includes(searchKey)))
    );
  }

  // 4. Dynamic Fallback Kit (Guarantees NO BLANK PAGE for custom/unknown companies)
  if (!found) {
    const formattedName = companyNameOrId.charAt(0).toUpperCase() + companyNameOrId.slice(1);
    return {
      id: searchKey.replace(/\s+/g, '-'),
      name: formattedName,
      aliases: [searchKey],
      logo: '🏢',
      category: 'Target Company',
      difficulty: 'Medium',
      salary: '6.0 - 18 LPA',
      requiredSkills: [
        'Data Structures & Algorithms',
        'Programming (Java / Python / C++)',
        'Object-Oriented Programming (OOPs)',
        'Database & SQL Queries',
        'Problem Solving & Logic'
      ],
      programmingTopics: ['Arrays & Hash Maps', 'Strings & Parsing', 'Sorting & Searching', 'Recursion'],
      aptitudeTopics: ['Quantitative Aptitude', 'Logical Reasoning', 'Verbal Ability'],
      technicalSubjects: ['Database Management Systems (DBMS)', 'Operating Systems', 'Computer Networks', 'Object-Oriented Design'],
      codingPrep: `Practice core algorithmic problems in Python, Java, or C++. Focus on array manipulation, hash maps, and string logic for ${formattedName}.`,
      techInterviewPrep: `Prepare to explain your final year project, basic data structures, OOP principles, and SQL queries expected in ${formattedName} technical rounds.`,
      hrPrep: `Research ${formattedName}'s core business model, values, and recent news. Prepare structured STAR framework answers.`,
      recommendedResources: [`${formattedName} Preparation Guide`, 'NeetCode 150', 'SQL Cheat Sheet', 'PrepInsta Placement Kit'],
      roadmapStages: [
        { stage: 'Stage 1: Core Aptitude & Programming', topics: 'Quant Math, Logic, C/Java/Python Syntax', completed: true },
        { stage: 'Stage 2: Data Structures Mastery', topics: 'Arrays, Strings, Hash Maps, Linked Lists', completed: false },
        { stage: 'Stage 3: Core CS & Database Prep', topics: 'DBMS Joins, SQL Queries, OOPs, OS Basics', completed: false },
        { stage: 'Stage 4: Technical & HR Mock Round', topics: 'Project Walkthrough, STAR Behavioral Answers', completed: false },
      ],
      previousQuestions: [
        { id: 'custom1', type: 'Coding', text: 'Reverse a String / Check for Palindrome', difficulty: 'Easy', topic: 'Strings', source: 'Public Source' },
        { id: 'custom2', type: 'Coding', text: 'Find Two Numbers in an Array that sum up to Target', difficulty: 'Medium', topic: 'Arrays & Hash Maps', source: 'Public Source' },
        { id: 'custom3', type: 'Technical', text: 'Explain the 4 Pillars of Object-Oriented Programming (OOPs)', difficulty: 'Easy', topic: 'OOP Concepts', source: 'Public Source' },
        { id: 'custom4', type: 'Technical', text: 'Write a SQL Query to find duplicate records in a table', difficulty: 'Medium', topic: 'DBMS & SQL', source: 'Public Source' },
        { id: 'custom5', type: 'HR', text: `Why are you interested in joining ${formattedName}?`, difficulty: 'Easy', topic: 'HR Behavioral', source: 'Public Source' }
      ]
    };
  }

  return found;
}
