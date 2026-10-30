// ============================================
// PlaceMentor AI — Dynamic Interview Question Bank
// Curated questions with expected concepts, technical keywords,
// rubrics, and ideal answers for authentic evaluation
// ============================================

export const interviewQuestionsData = {
  technical: [
    {
      id: 'tech_os_01',
      category: 'technical',
      topic: 'Operating Systems',
      difficulty: 'Medium',
      question: 'Explain the difference between a process and a thread in operating systems, and how they manage memory.',
      expectedKeywords: [
        'address space', 'memory', 'overhead', 'context switch', 'lightweight',
        'stack', 'heap', 'shared memory', 'pcb', 'tcb', 'isolation', 'ipc', 'process', 'thread'
      ],
      coreConcepts: [
        'Process is an executing program with isolated address space and PCB',
        'Threads share the parent process heap and memory, but have independent stacks',
        'Context switching between threads is faster with less overhead than processes',
        'Processes require IPC for communication, threads communicate via shared memory'
      ],
      antiKeywords: ['processes share memory', 'threads have separate address space', 'threads do not share heap'],
      minimumWords: 15
    },
    {
      id: 'tech_os_02',
      category: 'technical',
      topic: 'Operating Systems',
      difficulty: 'Hard',
      question: 'What are the four necessary conditions for a deadlock to occur, and how can deadlocks be prevented or avoided?',
      expectedKeywords: [
        'mutual exclusion', 'hold and wait', 'no preemption', 'circular wait',
        'banker', 'resource allocation graph', 'prevention', 'avoidance', 'deadlock', 'safe state'
      ],
      coreConcepts: [
        'Mutual exclusion: resources cannot be shared simultaneously',
        'Hold and wait: process holding one resource requests another',
        'No preemption: resources cannot be forcibly seized',
        'Circular wait: closed chain of processes waiting for each other',
        'Deadlock avoidance uses Banker algorithm to ensure safe states'
      ],
      antiKeywords: ['deadlocks only happen in databases', 'kill all processes'],
      minimumWords: 15
    },
    {
      id: 'tech_os_03',
      category: 'technical',
      topic: 'Operating Systems',
      difficulty: 'Medium',
      question: 'How does virtual memory work, and what is the role of the TLB (Translation Lookaside Buffer) and page tables?',
      expectedKeywords: [
        'virtual memory', 'page table', 'paging', 'tlb', 'translation lookaside buffer',
        'page fault', 'mmu', 'physical address', 'cache', 'frame', 'ram', 'thrashing'
      ],
      coreConcepts: [
        'Virtual memory creates an illusion of large continuous memory using disk storage',
        'MMU maps virtual addresses to physical frames using page tables',
        'TLB is a fast hardware cache that accelerates virtual-to-physical address translation',
        'A page fault occurs when a requested page is not currently resident in physical RAM'
      ],
      antiKeywords: ['tlb is hard drive', 'paging deletes memory'],
      minimumWords: 15
    },
    {
      id: 'tech_os_04',
      category: 'technical',
      topic: 'Operating Systems',
      difficulty: 'Medium',
      question: 'What is the difference between a Mutex and a Semaphore in multi-threaded programming?',
      expectedKeywords: [
        'mutex', 'semaphore', 'binary semaphore', 'counting semaphore', 'lock',
        'synchronization', 'critical section', 'ownership', 'race condition', 'signaling'
      ],
      coreConcepts: [
        'Mutex is a locking mechanism with ownership (only the lock owner can unlock)',
        'Semaphore is a signaling mechanism (can be incremented/decremented by different threads)',
        'Counting semaphores allow access to multiple units of a resource',
        'Both prevent race conditions in critical sections'
      ],
      antiKeywords: ['mutex and semaphore are identical', 'semaphore only locks one thread'],
      minimumWords: 12
    },
    {
      id: 'tech_db_01',
      category: 'technical',
      topic: 'DBMS',
      difficulty: 'Medium',
      question: 'Explain the ACID properties of a database transaction and why each property is critical.',
      expectedKeywords: [
        'acid', 'atomicity', 'consistency', 'isolation', 'durability',
        'transaction', 'rollback', 'commit', 'wal', 'write ahead log', 'concurrency'
      ],
      coreConcepts: [
        'Atomicity: all operations succeed or entire transaction rolls back (all-or-nothing)',
        'Consistency: database transitions only between valid states satisfying constraints',
        'Isolation: concurrent transactions execute independently without dirty reads',
        'Durability: committed transactions survive system failures via logs/storage'
      ],
      antiKeywords: ['acid means chemistry', 'atomicity means splitting into pieces'],
      minimumWords: 15
    },
    {
      id: 'tech_db_02',
      category: 'technical',
      topic: 'DBMS',
      difficulty: 'Medium',
      question: 'What is the difference between Clustered and Non-Clustered indexes, and how does a B+ Tree index speed up queries?',
      expectedKeywords: [
        'clustered index', 'non-clustered index', 'b+ tree', 'b tree', 'leaf node',
        'table scan', 'pointer', 'binary search', 'primary key', 'lookup', 'seek'
      ],
      coreConcepts: [
        'Clustered index defines the physical order of data on disk (only one per table)',
        'Non-clustered index creates a separate structure storing keys and row pointers',
        'B+ Trees store actual data pointers in leaf nodes linked sequentially for fast range queries',
        'Indexes reduce disk I/O from full table scans O(N) to tree searches O(log N)'
      ],
      antiKeywords: ['you can have multiple clustered indexes', 'indexes make writes faster'],
      minimumWords: 15
    },
    {
      id: 'tech_db_03',
      category: 'technical',
      topic: 'DBMS',
      difficulty: 'Medium',
      question: 'Explain database normalization from 1NF to 3NF. Why do we normalize databases?',
      expectedKeywords: [
        'normalization', '1nf', '2nf', '3nf', 'atomic', 'composite key',
        'partial dependency', 'transitive dependency', 'redundancy', 'anomaly', 'foreign key'
      ],
      coreConcepts: [
        '1NF requires atomic values and no repeating groups in columns',
        '2NF removes partial functional dependencies on composite primary keys',
        '3NF removes transitive dependencies (non-key attribute depending on another non-key)',
        'Normalization eliminates insertion, update, and deletion anomalies while reducing redundancy'
      ],
      antiKeywords: ['normalization denormalizes tables', '1nf allows lists in cells'],
      minimumWords: 15
    },
    {
      id: 'tech_db_04',
      category: 'technical',
      topic: 'DBMS',
      difficulty: 'Medium',
      question: 'When would you choose a NoSQL database (like MongoDB or Cassandra) over a Relational SQL database (like PostgreSQL)?',
      expectedKeywords: [
        'sql', 'nosql', 'relational', 'schema', 'schema-less', 'acid', 'base',
        'cap theorem', 'horizontal scaling', 'sharding', 'mongodb', 'postgresql', 'structured'
      ],
      coreConcepts: [
        'SQL is ideal for structured data, complex relational JOINs, and strict ACID requirements',
        'NoSQL shines with unstructured/dynamic schemas, high write volume, and horizontal sharding',
        'Relational databases scale vertically while NoSQL distributes across clusters naturally',
        'Trade-offs involve consistency vs partition tolerance under the CAP theorem'
      ],
      antiKeywords: ['sql is obsolete', 'nosql has no queries'],
      minimumWords: 15
    },
    {
      id: 'tech_net_01',
      category: 'technical',
      topic: 'Computer Networks',
      difficulty: 'Medium',
      question: 'Describe what happens during the TCP three-way handshake and compare TCP with UDP.',
      expectedKeywords: [
        'tcp', 'udp', 'handshake', 'syn', 'syn-ack', 'ack', 'connection-oriented',
        'connectionless', 'reliable', 'packet loss', 'retransmission', 'streaming', 'latency'
      ],
      coreConcepts: [
        'TCP 3-way handshake: Client sends SYN, Server replies SYN-ACK, Client sends ACK',
        'TCP is connection-oriented, guarantees packet ordering and delivery via retransmissions',
        'UDP is connectionless and lightweight with lower latency, ideal for video streaming or gaming',
        'TCP has flow and congestion control overhead compared to UDP'
      ],
      antiKeywords: ['udp has 3-way handshake', 'tcp does not guarantee delivery'],
      minimumWords: 15
    },
    {
      id: 'tech_net_02',
      category: 'technical',
      topic: 'Computer Networks',
      difficulty: 'Medium',
      question: 'What happens behind the scenes from the moment you type a URL into a browser until the webpage renders?',
      expectedKeywords: [
        'dns', 'ip address', 'tcp handshake', 'tls', 'ssl', 'http', 'https',
        'server', 'html', 'css', 'dom', 'rendering', 'cache', 'browser'
      ],
      coreConcepts: [
        'Browser checks cache and initiates DNS query to resolve domain to server IP',
        'Client establishes TCP connection via 3-way handshake and performs TLS negotiation for HTTPS',
        'Browser issues HTTP GET request and web server sends back HTML response payload',
        'Browser engine parses HTML into DOM tree, CSS into CSSOM, executes scripts, and renders'
      ],
      antiKeywords: ['magic', 'browser immediately displays code without network'],
      minimumWords: 15
    },
    {
      id: 'tech_net_03',
      category: 'technical',
      topic: 'Computer Networks',
      difficulty: 'Easy',
      question: 'What is the difference between HTTP and HTTPS, and how does SSL/TLS encryption protect data?',
      expectedKeywords: [
        'http', 'https', 'ssl', 'tls', 'port 80', 'port 443', 'encryption',
        'symmetric', 'asymmetric', 'public key', 'private key', 'certificate', 'man in the middle'
      ],
      coreConcepts: [
        'HTTP transmits plaintext over port 80; HTTPS encrypts traffic over port 443 using SSL/TLS',
        'Asymmetric encryption authenticates certificates and exchanges session keys during handshake',
        'Symmetric encryption (AES) encrypts bulk payload efficiently once connection is established',
        'Protects against eavesdropping, tampering, and Man-In-The-Middle (MITM) attacks'
      ],
      antiKeywords: ['http is encrypted', 'https does not need certificates'],
      minimumWords: 15
    },
    {
      id: 'tech_oop_01',
      category: 'technical',
      topic: 'OOP Concepts',
      difficulty: 'Easy',
      question: 'Explain the four core principles of Object-Oriented Programming with brief real-world examples.',
      expectedKeywords: [
        'encapsulation', 'abstraction', 'inheritance', 'polymorphism',
        'class', 'object', 'private', 'methods', 'override', 'overload', 'interface'
      ],
      coreConcepts: [
        'Encapsulation: bundling data and methods while restricting direct access via access modifiers',
        'Abstraction: hiding internal implementation details and exposing only essential interfaces',
        'Inheritance: child classes inherit attributes and behaviors from parent classes',
        'Polymorphism: ability of entities to take multiple forms (method overriding & overloading)'
      ],
      antiKeywords: ['oop has no classes', 'encapsulation makes variables public'],
      minimumWords: 15
    },
    {
      id: 'tech_oop_02',
      category: 'technical',
      topic: 'OOP Concepts',
      difficulty: 'Medium',
      question: 'What is the difference between an Abstract Class and an Interface? When would you use one over the other?',
      expectedKeywords: [
        'abstract class', 'interface', 'multiple inheritance', 'default method',
        'constructor', 'contract', 'implementation', 'extends', 'implements', 'polymorphism'
      ],
      coreConcepts: [
        'Interface defines a contract of capabilities; classes can implement multiple interfaces',
        'Abstract class provides partial common implementation and state with constructors',
        'Use abstract classes for closely related classes sharing core code (is-a relationship)',
        'Use interfaces to define common functionality across unrelated classes (can-do relationship)'
      ],
      antiKeywords: ['abstract classes cannot have methods', 'interfaces have state variables'],
      minimumWords: 15
    },
    {
      id: 'tech_arch_01',
      category: 'technical',
      topic: 'System Design',
      difficulty: 'Medium',
      question: 'How do you design a scalable web application? Explain horizontal vs vertical scaling and the role of load balancers.',
      expectedKeywords: [
        'horizontal scaling', 'vertical scaling', 'scale up', 'scale out', 'load balancer',
        'stateless', 'caching', 'redis', 'cdn', 'database sharding', 'round robin', 'latency'
      ],
      coreConcepts: [
        'Vertical scaling increases CPU/RAM on single machine; has physical limits and downtime',
        'Horizontal scaling adds more instances behind a load balancer for elasticity and high availability',
        'Load balancers distribute incoming traffic (Round Robin, Least Connections) across server pools',
        'Stateless application servers and distributed caches (Redis) enable seamless scaling'
      ],
      antiKeywords: ['vertical scaling is infinite', 'load balancers store data'],
      minimumWords: 15
    },
    {
      id: 'tech_arch_02',
      category: 'technical',
      topic: 'System Design',
      difficulty: 'Medium',
      question: 'What is caching, and how do Cache-Aside and Write-Through caching patterns work?',
      expectedKeywords: [
        'caching', 'redis', 'memcached', 'cache-aside', 'write-through',
        'cache hit', 'cache miss', 'ttl', 'eviction', 'lru', 'invalidation', 'latency'
      ],
      coreConcepts: [
        'Caching stores frequently accessed data in fast in-memory storage to reduce DB latency',
        'Cache-Aside: app queries cache; on miss, queries DB, writes to cache, and returns data',
        'Write-Through: app writes data to cache and DB simultaneously, ensuring consistency',
        'Eviction policies like LRU (Least Recently Used) and TTL maintain storage boundaries'
      ],
      antiKeywords: ['caching replaces database permanently', 'cache is slower than disk'],
      minimumWords: 15
    }
  ],

  coding: [
    {
      id: 'code_dsa_01',
      category: 'coding',
      topic: 'Data Structures',
      difficulty: 'Medium',
      question: 'How would you approach finding the starting node of a loop in a singly linked list with O(1) auxiliary space?',
      expectedKeywords: [
        'floyd', 'tortoise', 'hare', 'two pointers', 'slow pointer', 'fast pointer',
        'cycle detection', 'o(1) space', 'collision', 'head', 'starting node', 'linked list'
      ],
      coreConcepts: [
        'Use Floyd Cycle Detection algorithm with slow (1 step) and fast (2 steps) pointers',
        'If slow and fast pointers meet, a cycle exists',
        'Reset one pointer to head while keeping other at collision point; move both 1 step each',
        'The node where they meet again is mathematically the starting node of the cycle'
      ],
      antiKeywords: ['use hash set for o(1) space', 'not possible'],
      minimumWords: 15
    },
    {
      id: 'code_dsa_02',
      category: 'coding',
      topic: 'Algorithms',
      difficulty: 'Easy',
      question: 'Walk through how you would solve the Two Sum problem. Compare the brute force approach with the optimal hash map approach in terms of time and space complexity.',
      expectedKeywords: [
        'two sum', 'hash map', 'hash table', 'complement', 'target',
        'o(n)', 'o(n^2)', 'brute force', 'space complexity', 'lookup', 'index'
      ],
      coreConcepts: [
        'Brute force checks every pair using nested loops: O(N^2) time and O(1) space',
        'Optimal approach iterates once, computing complement = target - current element',
        'Checks if complement exists in hash map; if so, returns indices in O(1) average lookup',
        'Optimal approach achieves O(N) time complexity with O(N) space complexity'
      ],
      antiKeywords: ['hash map is o(n^2)', 'nested loops are optimal'],
      minimumWords: 15
    },
    {
      id: 'code_dsa_03',
      category: 'coding',
      topic: 'Algorithms',
      difficulty: 'Medium',
      question: 'How does Binary Search work? What are the essential edge conditions to avoid infinite loops or integer overflow?',
      expectedKeywords: [
        'binary search', 'sorted array', 'log n', 'o(log n)', 'mid',
        'overflow', 'left + (right - left) / 2', 'boundary', 'low <= high', 'divide and conquer'
      ],
      coreConcepts: [
        'Requires sorted input; repeatedly divides search interval in half by comparing target to mid',
        'Achieves logarithmic O(log N) time complexity',
        'Mid calculation using low + (high - low) / 2 avoids integer overflow encountered in (low + high) / 2',
        'Proper loop condition low <= high and updating low = mid + 1 or high = mid - 1 avoids infinite loops'
      ],
      antiKeywords: ['binary search works on unsorted lists', 'o(n) time'],
      minimumWords: 15
    },
    {
      id: 'code_dsa_04',
      category: 'coding',
      topic: 'Trees & Graphs',
      difficulty: 'Medium',
      question: 'Compare Breadth-First Search (BFS) and Depth-First Search (DFS) for tree and graph traversal. What data structures do they use?',
      expectedKeywords: [
        'bfs', 'dfs', 'queue', 'stack', 'recursion', 'traversal',
        'level order', 'shortest path', 'visited set', 'cycle', 'tree', 'graph'
      ],
      coreConcepts: [
        'BFS explores neighbors level by level using a Queue (FIFO) data structure',
        'BFS finds the shortest path in unweighted graphs',
        'DFS explores as deep as possible along each branch using a Stack (LIFO) or recursion',
        'Graphs require a visited set to avoid infinite cycles, unlike trees'
      ],
      antiKeywords: ['bfs uses stack', 'dfs uses queue', 'trees have cycles'],
      minimumWords: 15
    },
    {
      id: 'code_dsa_05',
      category: 'coding',
      topic: 'Algorithms',
      difficulty: 'Medium',
      question: 'What is Dynamic Programming? How does Memoization (Top-Down) differ from Tabulation (Bottom-Up)?',
      expectedKeywords: [
        'dynamic programming', 'memoization', 'tabulation', 'top-down', 'bottom-up',
        'overlapping subproblems', 'optimal substructure', 'recursion', 'cache', 'array'
      ],
      coreConcepts: [
        'DP optimizes problems exhibiting overlapping subproblems and optimal substructure',
        'Memoization is top-down recursion caching results of subproblems to avoid redundant calls',
        'Tabulation is bottom-up iterative approach filling a table from base cases up to target',
        'Tabulation avoids call stack overhead and recursion depth limits'
      ],
      antiKeywords: ['dp is greedy', 'memoization recalculates everything'],
      minimumWords: 15
    },
    {
      id: 'code_dsa_06',
      category: 'coding',
      topic: 'Algorithms',
      difficulty: 'Medium',
      question: 'Compare QuickSort and MergeSort. Which one would you choose for sorting a linked list versus an array, and why?',
      expectedKeywords: [
        'quicksort', 'mergesort', 'time complexity', 'space complexity', 'o(n log n)',
        'in-place', 'stable', 'pivot', 'worst case o(n^2)', 'linked list', 'cache locality'
      ],
      coreConcepts: [
        'MergeSort has guaranteed O(N log N) worst-case time and is stable, but requires O(N) extra space',
        'QuickSort has O(N log N) average time, O(1) space, excellent cache locality, but O(N^2) worst case',
        'MergeSort is ideal for linked lists because nodes can be merged without extra array allocation',
        'QuickSort is preferred for contiguous arrays due to better cache locality and in-place partitioning'
      ],
      antiKeywords: ['mergesort is in-place for arrays', 'quicksort is always o(n)'],
      minimumWords: 15
    }
  ],

  hr: [
    {
      id: 'hr_beh_01',
      category: 'hr',
      topic: 'Background & Introduction',
      difficulty: 'Easy',
      question: 'Tell me about yourself, your educational background, and what motivated you to pursue a career in technology?',
      expectedKeywords: [
        'engineering', 'computer science', 'projects', 'passion', 'developer',
        'skills', 'problem solving', 'technologies', 'learning', 'career', 'motivation'
      ],
      coreConcepts: [
        'Concise summary of academic background and technical specialization',
        'Key practical projects built and primary programming languages/frameworks mastered',
        'Clear statement of genuine passion for software engineering and problem-solving',
        'Forward-looking career ambition matching the target industry'
      ],
      antiKeywords: ['i need money only', 'my parents forced me'],
      minimumWords: 20
    },
    {
      id: 'hr_beh_02',
      category: 'hr',
      topic: 'Project Experience & STAR',
      difficulty: 'Medium',
      question: 'Describe a challenging technical project you worked on. What obstacles did you encounter, and how did you resolve them?',
      expectedKeywords: [
        'project', 'challenge', 'obstacle', 'solved', 'debugged', 'solution',
        'architecture', 'result', 'learned', 'team', 'technologies', 'implemented'
      ],
      coreConcepts: [
        'Context of the project and core technical stack used (Situation & Task)',
        'Specific technical roadblock or bug faced (e.g., performance bottleneck, API error)',
        'Action taken: methodical debugging, refactoring, research, or architecture change',
        'Concrete measurable result and lesson learned from the resolution'
      ],
      antiKeywords: ['i gave up', 'someone else did everything'],
      minimumWords: 20
    },
    {
      id: 'hr_beh_03',
      category: 'hr',
      topic: 'Teamwork & Conflict',
      difficulty: 'Medium',
      question: 'Tell me about a time you had a technical disagreement with a team member or project partner. How did you handle it?',
      expectedKeywords: [
        'disagreement', 'conflict', 'communication', 'perspective', 'listen',
        'data', 'compromise', 'objective', 'consensus', 'team goal', 'respect'
      ],
      coreConcepts: [
        'Focus on technical rationale rather than personal emotions',
        'Active listening to understand the other person viewpoint and assumptions',
        'Using objective criteria (e.g., performance benchmarks, maintainability, requirements)',
        'Arriving at a professional consensus that prioritized the project success'
      ],
      antiKeywords: ['i argued until they surrendered', 'i ignored them'],
      minimumWords: 20
    },
    {
      id: 'hr_beh_04',
      category: 'hr',
      topic: 'Failure & Resilience',
      difficulty: 'Medium',
      question: 'Can you share an instance where a project or plan did not go as expected? What did you learn from the experience?',
      expectedKeywords: [
        'failure', 'mistake', 'unexpected', 'learned', 'retrospective',
        'improved', 'responsibility', 'accountability', 'resilience', 'next time'
      ],
      coreConcepts: [
        'Honest ownership of the setback without shifting blame to teammates or tools',
        'Root cause analysis of what went wrong (e.g., inadequate testing, missed edge case)',
        'Specific corrective actions taken to mitigate the impact',
        'Long-term process improvement or personal growth that resulted'
      ],
      antiKeywords: ['i never make mistakes', 'it was entirely my teammate fault'],
      minimumWords: 20
    },
    {
      id: 'hr_beh_05',
      category: 'hr',
      topic: 'Work Ethic & Prioritization',
      difficulty: 'Easy',
      question: 'How do you handle high pressure, tight deadlines, or conflicting priorities across multiple deliverables?',
      expectedKeywords: [
        'prioritize', 'deadline', 'pressure', 'organization', 'break down',
        'communication', 'timeline', 'focus', 'urgency', 'time management'
      ],
      coreConcepts: [
        'Framework for prioritizing tasks based on impact and urgency (e.g., Eisenhower matrix)',
        'Breaking complex objectives into smaller, manageable milestones with milestones',
        'Proactive communication with mentors, stakeholders, or team leads if risks arise',
        'Maintaining composure and focus on high-leverage outcomes under deadlines'
      ],
      antiKeywords: ['i panic', 'i skip sleep completely and rush'],
      minimumWords: 20
    },
    {
      id: 'hr_beh_06',
      category: 'hr',
      topic: 'Future Goals & Vision',
      difficulty: 'Easy',
      question: 'Where do you see yourself in 3 to 5 years professionally, and what skills or domains are you actively aiming to master?',
      expectedKeywords: [
        'career', 'growth', 'senior developer', 'mentor', 'mastery',
        'architecture', 'system design', 'continuous learning', 'leadership', 'impact'
      ],
      coreConcepts: [
        'Commitment to continuous technical excellence and deep mastery of software systems',
        'Progression towards taking end-to-end ownership of features and complex architectures',
        'Aspiration to mentor junior engineers and contribute to technical decision-making',
        'Alignment between personal development goals and company long-term roadmap'
      ],
      antiKeywords: ['i want to quit coding soon', 'i have no plans'],
      minimumWords: 15
    }
  ],

  company: [
    {
      id: 'comp_top_01',
      category: 'company',
      topic: 'Company Fit & Culture',
      difficulty: 'Medium',
      question: 'Why do you specifically want to join our organization over other technology companies, and what value will you bring?',
      expectedKeywords: [
        'company', 'culture', 'products', 'values', 'innovation',
        'contribution', 'alignment', 'impact', 'technologies', 'growth', 'customers'
      ],
      coreConcepts: [
        'Specific knowledge of the company products, engineering mission, and market footprint',
        'Alignment with company engineering values and culture (e.g., scale, user focus)',
        'Concrete ways the candidate technical skills will deliver immediate team value',
        'Long-term enthusiasm to contribute to the company core products'
      ],
      antiKeywords: ['i just need any job', 'you pay higher than others'],
      minimumWords: 20
    },
    {
      id: 'comp_top_02',
      category: 'company',
      topic: 'Amazon Leadership / Product Principles',
      difficulty: 'Medium',
      question: 'Give an example of a situation where you showed "Customer Obsession" or prioritized user experience over technical convenience.',
      expectedKeywords: [
        'user experience', 'customer', 'feedback', 'usability', 'accessibility',
        'metric', 'satisfaction', 'convenience', 'iteration', 'value'
      ],
      coreConcepts: [
        'Starting from the user problem and working backwards to technical implementation',
        'Choosing an approach that created superior user experience even if more complex to build',
        'Gathering user feedback or analytics to validate the feature effectiveness',
        'Quantifying the positive user outcome achieved'
      ],
      antiKeywords: ['users do not matter', 'developers know better than customers'],
      minimumWords: 20
    },
    {
      id: 'comp_top_03',
      category: 'company',
      topic: 'Engineering Standards',
      difficulty: 'Medium',
      question: 'In a fast-moving enterprise environment, how do you maintain code quality, documentation, and reliable unit test coverage without slowing down feature delivery?',
      expectedKeywords: [
        'unit tests', 'code review', 'ci/cd', 'documentation', 'clean code',
        'refactoring', 'automation', 'test coverage', 'maintainability', 'agile'
      ],
      coreConcepts: [
        'Writing modular, self-documenting code with comprehensive unit and integration tests',
        'Leveraging CI/CD automated test pipelines to catch regressions before deployment',
        'Conducting constructive peer code reviews to maintain architecture consistency',
        'Balancing pragmatic velocity with technical debt management'
      ],
      antiKeywords: ['skip tests to ship faster', 'testing is waste of time'],
      minimumWords: 18
    },
    {
      id: 'comp_top_04',
      category: 'company',
      topic: 'SDLC & Agile Workflow',
      difficulty: 'Easy',
      question: 'Describe your familiarity with Agile/Scrum methodology, Git branching strategies, and how you collaborate in team codebases.',
      expectedKeywords: [
        'agile', 'scrum', 'sprint', 'git', 'pull request', 'merge',
        'branching', 'code review', 'standup', 'jira', 'version control'
      ],
      coreConcepts: [
        'Participation in sprint ceremonies: daily standups, sprint planning, and retrospectives',
        'Feature branching model (e.g., GitFlow or GitHub Flow) with descriptive commits',
        'Creating clean Pull Requests with context, testing notes, and prompt review turnaround',
        'Resolving merge conflicts methodically and maintaining mainline stability'
      ],
      antiKeywords: ['commit directly to main without review', 'git is unnecessary'],
      minimumWords: 15
    }
  ]
};

/**
 * Returns a randomized, deduplicated sequence of questions for an interview session
 */
export function getSessionQuestions(categoryId, count = 5) {
  const pool = interviewQuestionsData[categoryId] || interviewQuestionsData.technical;
  // Shuffled copy
  const shuffled = [...pool].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, shuffled.length));
}
