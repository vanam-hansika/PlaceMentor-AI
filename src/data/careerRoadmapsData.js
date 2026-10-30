// ============================================
// PlaceMentor AI — Curated Career Roadmaps Dataset
// 19 Complete Industry Career Roadmaps with 10 Stages Each
// Interactive Milestone Timelines, Trustworthy Resources & Placement Connections
// ============================================

export const ROADMAP_CATEGORIES = [
  'All',
  'Software Development',
  'AI & Data',
  'Cloud, Security & Testing',
  'Placement Preparation'
];

export const DIFFICULTY_LEVELS = [
  'All',
  'Beginner Friendly',
  'Intermediate',
  'Advanced'
];

export const CAREER_ROADMAPS = [
  {
    "id": "frontend-developer",
    "title": "Frontend Developer",
    "category": "Software Development",
    "difficulty": "Beginner Friendly",
    "duration": "5-6 Months",
    "icon": "Layout",
    "color": "primary",
    "prerequisites": "Basic Computer Literacy, Creative Problem-Solving",
    "technologies": [
      "HTML5",
      "CSS3",
      "JavaScript (ES6+)",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Next.js",
      "Git",
      "Vite"
    ],
    "shortDescription": "Master modern user interfaces, responsive design, component architecture, and high-performance client web applications.",
    "overview": "Frontend Developers bridge design and technology to craft dynamic, accessible, and fast web applications used by millions. This roadmap guides you from core markup and modern JavaScript through React component architecture, state management, API integration, and production deployment.",
    "stages": [
      {
        "stageNumber": 1,
        "id": "fe-stage-1",
        "title": "Prerequisites & Computer Science Fundamentals",
        "summary": "Understand how the Internet works, client-server models, HTTP/HTTPS protocols, DNS resolution, and browser rendering engines.",
        "topics": [
          "How the Web Works: DNS, IP, Hosting, and Browsers",
          "HTTP Request/Response Cycle, Headers, and Status Codes",
          "Browser Rendering Pipeline: DOM, CSSOM, Render Tree, and Painting",
          "Semantic HTML5 Tags and Document Structure",
          "Web Accessibility (a11y) and WCAG Standards"
        ],
        "objectives": [
          "Explain what happens when a user types a URL into a browser address bar",
          "Structure web pages using semantic HTML tags (<main>, <nav>, <section>, <article>)",
          "Apply ARIA roles and keyboard accessibility attributes for universal usability"
        ],
        "practiceActivities": [
          "Inspect real-world websites using Chrome DevTools Network and Elements tabs",
          "Build an accessible multi-page semantic document with zero styling"
        ],
        "practicalTask": "Build a compliant, semantic, and accessible documentation web page with header, sidebar navigation, article content, and footer.",
        "prerequisites": "None",
        "estimatedTime": "2 Weeks",
        "resources": [
          {
            "title": "MDN: How the Web Works",
            "url": "https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Web_mechanics/How_does_the_Internet_work",
            "provider": "MDN Web Docs",
            "isFree": true
          },
          {
            "title": "MDN: HTML Semantic Elements",
            "url": "https://developer.mozilla.org/en-US/docs/Glossary/Semantics#semantics_in_html",
            "provider": "MDN Web Docs",
            "isFree": true
          }
        ],
        "platformLink": null
      },
      {
        "stageNumber": 2,
        "id": "fe-stage-2",
        "title": "Modern CSS & Responsive Web Design",
        "summary": "Learn CSS fundamentals, Box Model, Flexbox, CSS Grid, media queries, CSS variables, and modern styling utilities.",
        "topics": [
          "CSS Box Model: Margin, Border, Padding, and Content Box",
          "CSS Flexbox Layout: Direction, Justify-Content, Align-Items, and Flex-Wrap",
          "CSS Grid: Template Columns, Rows, Grid Areas, and Auto-Fit/Minmax",
          "Responsive Design & Media Queries (Mobile-First Philosophy)",
          "CSS Custom Properties (Variables) and Theming (Dark/Light Mode)",
          "Modern CSS Frameworks: Tailwind CSS Utility Classes"
        ],
        "objectives": [
          "Create responsive layouts without breaking across mobile, tablet, and desktop",
          "Master modern Flexbox and Grid alignments for complex web layouts",
          "Configure a fluid typography and color token system using CSS variables"
        ],
        "practiceActivities": [
          "Recreate a popular landing page navbar and pricing grid with Flexbox & Grid",
          "Convert a fixed-width layout into a 100% fluid mobile-first responsive design"
        ],
        "practicalTask": "Develop a responsive product landing page with a hero section, feature cards grid, testimonial carousel, and responsive navigation drawer.",
        "prerequisites": "Stage 1 (Semantic HTML)",
        "estimatedTime": "3 Weeks",
        "resources": [
          {
            "title": "MDN: CSS Layout",
            "url": "https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout",
            "provider": "MDN Web Docs",
            "isFree": true
          },
          {
            "title": "Tailwind CSS Official Documentation",
            "url": "https://tailwindcss.com/docs",
            "provider": "Tailwind Labs",
            "isFree": true
          }
        ],
        "platformLink": null
      },
      {
        "stageNumber": 3,
        "id": "fe-stage-3",
        "title": "JavaScript Core & ES6+ Mastery",
        "summary": "Develop deep programming capability with modern ECMAScript: data types, closures, promises, async/await, and DOM manipulation.",
        "topics": [
          "JavaScript Execution Context, Call Stack, and Hoisting",
          "Data Types, Scope, Closures, and Lexical Environment",
          "ES6+ Features: Destructuring, Spread/Rest, Arrow Functions, Template Literals",
          "Asynchronous JavaScript: Event Loop, Callback Queue, Promises, Async/Await",
          "DOM Manipulation, Event Listeners, and Event Bubbling/Delegation",
          "Fetch API, RESTful JSON Handling, and Error Boundaries"
        ],
        "objectives": [
          "Confidently write modern asynchronous JavaScript code using async/await and try/catch",
          "Manipulate DOM nodes dynamically and handle user input with event delegation",
          "Interact with external third-party REST APIs and render dynamic data"
        ],
        "practiceActivities": [
          "Implement a custom Debounce and Throttle function from scratch",
          "Fetch and display paginated user data from a public REST API"
        ],
        "practicalTask": "Build an interactive Weather & Air Quality Dashboard consuming Open-Meteo or WeatherAPI with live search, autocomplete, and local storage caching.",
        "prerequisites": "Stage 2 (CSS & HTML)",
        "estimatedTime": "4 Weeks",
        "resources": [
          {
            "title": "JavaScript.info: Modern JavaScript Tutorial",
            "url": "https://javascript.info/",
            "provider": "JavaScript.info",
            "isFree": true
          },
          {
            "title": "MDN: JavaScript First Steps",
            "url": "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps",
            "provider": "MDN Web Docs",
            "isFree": true
          }
        ],
        "platformLink": {
          "label": "Practice JavaScript DSA on PlaceMentor",
          "path": "/coding"
        }
      },
      {
        "stageNumber": 4,
        "id": "fe-stage-4",
        "title": "Data Structures & Algorithms for Frontend",
        "summary": "Essential data structures and algorithmic patterns required for frontend technical interviews and performance optimization.",
        "topics": [
          "Arrays, Strings, Hash Maps, and Sets in JavaScript",
          "Recursion and DOM Tree Traversal (Depth-First & Breadth-First)",
          "Two Pointers & Sliding Window Patterns",
          "Sorting Algorithms (Quicksort, Mergesort) & Binary Search",
          "Time and Space Complexity Analysis (Big-O Notation)"
        ],
        "objectives": [
          "Solve frontend-heavy algorithmic problems involving string parsing, frequency maps, and array manipulation",
          "Evaluate time and memory tradeoffs in client-side computations"
        ],
        "practiceActivities": [
          "Solve 30 LeetCode Easy & Medium problems focusing on Arrays, Strings, and Hash Maps",
          "Implement a DOM Tree flattening utility similar to document.querySelectorAll"
        ],
        "practicalTask": "Write an optimized in-memory search and multi-criteria filtering engine for an e-commerce catalog with 10,000 items.",
        "prerequisites": "Stage 3 (JavaScript Fundamentals)",
        "estimatedTime": "3 Weeks",
        "resources": [
          {
            "title": "NeetCode: Core Algorithms & Data Structures",
            "url": "https://neetcode.io/",
            "provider": "NeetCode",
            "isFree": true
          },
          {
            "title": "GeeksforGeeks: DSA in JavaScript",
            "url": "https://www.geeksforgeeks.org/javascript-data-structures-and-algorithms/",
            "provider": "GeeksforGeeks",
            "isFree": true
          }
        ],
        "platformLink": {
          "label": "Solve Placement Coding Problems",
          "path": "/coding"
        }
      },
      {
        "stageNumber": 5,
        "id": "fe-stage-5",
        "title": "Version Control, Build Tools & Modern Workflow",
        "summary": "Learn professional development workflows with Git, GitHub, NPM, Vite, TypeScript, and modern linting.",
        "topics": [
          "Git Basics: Commit, Branch, Merge, Rebase, and Conflict Resolution",
          "GitHub Collaboration: Pull Requests, Code Reviews, and Issues",
          "NPM / PNPM Package Managers and package.json Scripts",
          "Vite & Rolldown / Rollup Bundling Concepts",
          "TypeScript Basics: Interfaces, Types, Generics, and Type Safety in Frontend"
        ],
        "objectives": [
          "Manage source code with feature branching and commit best practices",
          "Set up and configure a Vite TypeScript project from scratch",
          "Enforce code quality with ESLint and Prettier"
        ],
        "practiceActivities": [
          "Initialize a GitHub repository, create branches, and resolve a merge conflict manually",
          "Convert a plain JavaScript utility module into typed TypeScript with strict type definitions"
        ],
        "practicalTask": "Create an open-source reusable UI component library repository on GitHub with clean documentation and Vite build configurations.",
        "prerequisites": "Stage 3 & 4",
        "estimatedTime": "2 Weeks",
        "resources": [
          {
            "title": "Git Official Documentation & Book",
            "url": "https://git-scm.com/doc",
            "provider": "Git-SCM",
            "isFree": true
          },
          {
            "title": "TypeScript Official Handbook",
            "url": "https://www.typescriptlang.org/docs/handbook/intro.html",
            "provider": "Microsoft",
            "isFree": true
          }
        ],
        "platformLink": null
      },
      {
        "stageNumber": 6,
        "id": "fe-stage-6",
        "title": "React 19 & Component Architecture",
        "summary": "Master the world’s most popular UI library: JSX, Hooks, Component Lifecycle, Props, Context API, and Virtual DOM.",
        "topics": [
          "JSX Syntax, Component Hierarchy, and Rendering Lifecycle",
          "Core React Hooks: useState, useEffect, useRef, useMemo, useCallback",
          "Lifting State Up and Unidirectional Data Flow",
          "React Context API for Global State Management",
          "Client-Side Routing with React Router v7",
          "Optimizing Re-renders and Profiling React Applications"
        ],
        "objectives": [
          "Architect modular, reusable component systems with clean separation of concerns",
          "Handle complex side-effects without infinite re-render loops or memory leaks",
          "Manage single-page routing with dynamic route parameters and route guards"
        ],
        "practiceActivities": [
          "Build an interactive Kanban Board with drag-and-drop state updates using React Context",
          "Create custom React hooks for window resize, debounced search, and local storage persistence"
        ],
        "practicalTask": "Develop a Complete Task & Milestone Management Dashboard featuring dark/light mode, filters, modal forms, and local persistence.",
        "prerequisites": "Stage 3 (JavaScript ES6+) & Stage 5 (Vite & TypeScript)",
        "estimatedTime": "4 Weeks",
        "resources": [
          {
            "title": "React Official Documentation (react.dev)",
            "url": "https://react.dev/learn",
            "provider": "React Team",
            "isFree": true
          },
          {
            "title": "React Router v7 Official Docs",
            "url": "https://reactrouter.com/",
            "provider": "Remix / Shopify",
            "isFree": true
          }
        ],
        "platformLink": {
          "label": "Practice React Concepts in Coding Sandbox",
          "path": "/coding"
        }
      },
      {
        "stageNumber": 7,
        "id": "fe-stage-7",
        "title": "Beginner Project: Interactive E-Commerce Catalog",
        "summary": "Put your fundamentals to work by engineering a multi-page e-commerce storefront with cart state, filtering, and checkout flow.",
        "topics": [
          "API Data Fetching & Skeleton Loaders",
          "Global Cart State Management (Zustand or Context API)",
          "Product Search, Multi-Facet Filters (Price, Category, Rating)",
          "Responsive Drawer Cart with Item Quantity Controls",
          "Mock Payment / Order Confirmation View"
        ],
        "objectives": [
          "Combine HTML, CSS, React, and REST API integration into an end-to-end user experience",
          "Deploy the production build to Netlify, Vercel, or GitHub Pages"
        ],
        "practiceActivities": [
          "Connect the app to the FakeStoreAPI or DummyJSON API",
          "Implement optimistic UI updates when adding/removing items from the cart"
        ],
        "practicalTask": "Publish your complete E-Commerce Storefront on GitHub with a live demo URL, responsive mobile navigation, and unit tests.",
        "prerequisites": "Stage 6 (React Mastery)",
        "estimatedTime": "2-3 Weeks",
        "resources": [
          {
            "title": "DummyJSON Free Products API",
            "url": "https://dummyjson.com/docs/products",
            "provider": "DummyJSON",
            "isFree": true
          },
          {
            "title": "Vercel Deployment Guide for Vite React",
            "url": "https://vercel.com/docs",
            "provider": "Vercel",
            "isFree": true
          }
        ],
        "platformLink": null
      },
      {
        "stageNumber": 8,
        "id": "fe-stage-8",
        "title": "Intermediate Portfolio Project: SaaS Analytics Dashboard",
        "summary": "Build a production-grade SaaS web application with authentication, interactive charts, data caching, and dark mode.",
        "topics": [
          "Firebase or Supabase Authentication (Email/Password & Google OAuth)",
          "Data Visualizations with Recharts or Chart.js",
          "Optimistic UI and Server State Caching with TanStack Query",
          "Form Validation with React Hook Form and Zod",
          "Lighthouse Performance Auditing (90+ Performance & Accessibility)"
        ],
        "objectives": [
          "Deliver an enterprise-grade UI application ready for prospective recruiter review",
          "Optimize Core Web Vitals (LCP, FID/INP, CLS)"
        ],
        "practiceActivities": [
          "Profile bundle size using rollup-plugin-visualizer and eliminate bloated dependencies",
          "Add automated end-to-end tests using Playwright"
        ],
        "practicalTask": "Build and deploy a full-featured Crypto/Fintech or Academic Analytics Platform with live charts, authenticated user settings, and PDF export.",
        "prerequisites": "Stage 7 (Beginner Project)",
        "estimatedTime": "3-4 Weeks",
        "resources": [
          {
            "title": "Recharts Charting Library Docs",
            "url": "https://recharts.org/",
            "provider": "Recharts",
            "isFree": true
          },
          {
            "title": "Google Web Vitals Guide",
            "url": "https://web.dev/vitals/",
            "provider": "Google Chrome Team",
            "isFree": true
          }
        ],
        "platformLink": null
      },
      {
        "stageNumber": 9,
        "id": "fe-stage-9",
        "title": "Resume, GitHub Portfolio & Professional Profile",
        "summary": "Showcase your engineering accomplishments with an ATS-friendly resume, professional GitHub READMEs, and LinkedIn presence.",
        "topics": [
          "Structuring an Engineering Resume: Impact-driven bullet points (Action + Tech + Result)",
          "Creating a Clean Developer Portfolio Site with Live Demo Links",
          "Polishing GitHub Profile: Pinned Repositories, Clean READMEs, Architecture Diagrams",
          "Showcasing Live Deployments on Vercel/Netlify with Source Code Links",
          "LinkedIn Optimization for Technical Recruiters"
        ],
        "objectives": [
          "Generate a high-scoring ATS-friendly Frontend Developer resume",
          "Ensure all pinned projects have working preview URLs and clear setup instructions"
        ],
        "practiceActivities": [
          "Run your resume through PlaceMentor AI’s Resume Builder & ATS Scorer",
          "Draft a 30-second elevator pitch explaining your strongest portfolio project"
        ],
        "practicalTask": "Finalize your 1-page Frontend Engineer Resume and deploy your personal portfolio website.",
        "prerequisites": "Stage 7 & 8 (Completed Projects)",
        "estimatedTime": "1-2 Weeks",
        "resources": [
          {
            "title": "GitHub Docs: Managing Your Profile README",
            "url": "https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/customizing-your-profile/managing-your-profile-readme",
            "provider": "GitHub",
            "isFree": true
          }
        ],
        "platformLink": {
          "label": "Build Resume with AI Resume Builder",
          "path": "/resume"
        }
      },
      {
        "stageNumber": 10,
        "id": "fe-stage-10",
        "title": "Frontend Technical Interview & Job Applications",
        "summary": "Prepare for live coding challenges, JavaScript deep dives, system design for frontend, and behavioral rounds.",
        "topics": [
          "Common Frontend Interview Questions: Closures, Event Loop, Virtual DOM vs Real DOM",
          "Machine Coding Rounds: Building a Typeahead/Autocomplete, Infinite Scroll, or Accordion in 45 Mins",
          "Frontend System Design: Caching, Pagination, Asset Optimization, Micro-Frontends",
          "Behavioral Interviews: STAR Method for Explaining Conflict, Deadlines, and Technical Tradeoffs",
          "Applying to Verified Indian & Global Roles across Campus Drives & Off-Campus Portals"
        ],
        "objectives": [
          "Pass 45-minute live technical screening and machine coding interviews",
          "Confidently articulate technical decisions to Senior Engineers and Engineering Managers"
        ],
        "practiceActivities": [
          "Conduct at least 3 AI Mock Technical Interviews on PlaceMentor AI",
          "Apply to 15+ verified fresher and student frontend roles on the Jobs portal"
        ],
        "practicalTask": "Complete a live timed machine coding challenge: build a fully accessible debounce search bar with keyboard arrow navigation in 40 minutes.",
        "prerequisites": "Stages 1 through 9",
        "estimatedTime": "3-4 Weeks",
        "resources": [
          {
            "title": "GreatFrontEnd: Free Frontend Interview Handbook",
            "url": "https://www.greatfrontend.com/",
            "provider": "GreatFrontEnd",
            "isFree": true
          },
          {
            "title": "BFE.dev: Practice Frontend Coding Questions",
            "url": "https://bigfrontend.dev/",
            "provider": "BFE",
            "isFree": true
          }
        ],
        "platformLink": {
          "label": "Launch AI Mock Technical Interview",
          "path": "/interview"
        }
      }
    ]
  },
  {
    "id": "backend-developer",
    "title": "Backend Developer",
    "category": "Software Development",
    "difficulty": "Intermediate",
    "duration": "6-7 Months",
    "icon": "Server",
    "color": "secondary",
    "prerequisites": "Foundational Programming, Operating Systems & Networks basics",
    "technologies": [
      "Node.js",
      "Express",
      "Python / FastAPI",
      "PostgreSQL",
      "Redis",
      "Docker",
      "REST & GraphQL",
      "Kafka",
      "Linux"
    ],
    "shortDescription": "Architect scalable server-side systems, RESTful microservices, database schemas, and robust API backbones.",
    "overview": "Backend Developers construct the resilient logic, database pipelines, and scalable APIs that power modern software. This roadmap covers server architecture, relational and NoSQL databases, caching, authentication, microservices, system design, and production cloud operations.",
    "stages": [
      {
        "stageNumber": 1,
        "id": "be-stage-1",
        "title": "Computer Science & Operating Systems Core",
        "summary": "Master essential OS internals, process memory, threads, concurrency, file systems, and networking protocols.",
        "topics": [
          "Process vs Thread, Concurrency and Race Conditions",
          "Memory Management: Stack, Heap, and Virtual Memory",
          "TCP/IP vs UDP, DNS, Sockets, and WebSockets",
          "HTTP/1.1 vs HTTP/2 vs HTTP/3 (QUIC)",
          "Linux Shell Commands, Permissions, and System Daemons"
        ],
        "objectives": [
          "Diagnose network connections and inspect packet transfers",
          "Write clean bash automation scripts for server operations",
          "Understand thread pools and non-blocking I/O concepts"
        ],
        "practiceActivities": [
          "Write Linux commands to monitor memory and active processes (htop, ps, netstat, lsof)",
          "Trace an HTTP packet using cURL and Wireshark"
        ],
        "practicalTask": "Configure a headless Linux virtual machine environment with automated shell startup scripts and secure SSH keys.",
        "prerequisites": "Basic Computer Fundamentals",
        "estimatedTime": "2 Weeks",
        "resources": [
          {
            "title": "Linux Journey: Free Operating System Guide",
            "url": "https://linuxjourney.com/",
            "provider": "Linux Journey",
            "isFree": true
          },
          {
            "title": "MDN: HTTP Protocol Overview",
            "url": "https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview",
            "provider": "MDN Web Docs",
            "isFree": true
          }
        ],
        "platformLink": null
      },
      {
        "stageNumber": 2,
        "id": "be-stage-2",
        "title": "Backend Programming Language & Runtimes",
        "summary": "Choose Node.js (JavaScript/TypeScript) or Python (FastAPI) and master asynchronous runtime operations.",
        "topics": [
          "Node.js Architecture: V8 Engine, libuv, and Event Loop",
          "Streams, Buffers, and EventEmitters in Node.js",
          "Modular Code Organization, NPM Scripts, and Environment Variables",
          "Error Handling Patterns and Custom Exception Middleware",
          "Asynchronous Concurrency Models & Worker Threads"
        ],
        "objectives": [
          "Build non-blocking server applications capable of handling concurrent requests",
          "Handle file system streams without memory leaks"
        ],
        "practiceActivities": [
          "Write a CLI script that parses a 1GB log file using streaming chunks",
          "Implement an EventEmitter-based event pub/sub in Node.js"
        ],
        "practicalTask": "Build an asynchronous file processor server that validates and compresses uploaded files with detailed progress events.",
        "prerequisites": "Stage 1",
        "estimatedTime": "3 Weeks",
        "resources": [
          {
            "title": "Node.js Official Documentation",
            "url": "https://nodejs.org/en/docs",
            "provider": "OpenJS Foundation",
            "isFree": true
          },
          {
            "title": "Node.js Event Loop Guide",
            "url": "https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick",
            "provider": "Node.js Org",
            "isFree": true
          }
        ],
        "platformLink": {
          "label": "Practice Backend Algorithms",
          "path": "/coding"
        }
      },
      {
        "stageNumber": 3,
        "id": "be-stage-3",
        "title": "RESTful API Design & Middleware Architecture",
        "summary": "Master API design principles, CRUD operations, route parameters, request validation, and middleware pipelines.",
        "topics": [
          "REST Architectural Constraints & Resource Naming Best Practices",
          "Express.js / FastAPI Routing, Request, and Response Objects",
          "Input Validation using Joi, Zod, or Pydantic",
          "CORS Configuration, Helmet Security Headers, and Rate Limiting",
          "API Documentation with OpenAPI / Swagger"
        ],
        "objectives": [
          "Design clean, predictable, and versioned RESTful endpoints",
          "Protect endpoints against common injection and payload tampering attacks"
        ],
        "practiceActivities": [
          "Implement custom rate limiting middleware using in-memory token bucket algorithm",
          "Generate automated Swagger documentation for 10 endpoints"
        ],
        "practicalTask": "Build a RESTful API for an online Course Management Platform with nested resources (Courses, Modules, Lessons, Enrollments).",
        "prerequisites": "Stage 2",
        "estimatedTime": "3 Weeks",
        "resources": [
          {
            "title": "Express.js Official Guide",
            "url": "https://expressjs.com/en/guide/routing.html",
            "provider": "Express",
            "isFree": true
          },
          {
            "title": "Swagger OpenAPI Specification",
            "url": "https://swagger.io/specification/",
            "provider": "SmartBear",
            "isFree": true
          }
        ],
        "platformLink": null
      },
      {
        "stageNumber": 4,
        "id": "be-stage-4",
        "title": "Relational Databases & SQL Mastery",
        "summary": "Design normalized relational databases, execute complex analytical queries, and manage transactions.",
        "topics": [
          "Relational Data Modeling: Entities, Relationships, and Cardinality (1:1, 1:N, M:N)",
          "SQL Fundamentals: SELECT, JOINs (INNER, LEFT, RIGHT, FULL), Subqueries, Aggregations",
          "Database Normalization (1NF through 3NF/BCNF)",
          "Indexes: B-Trees, Hash Indexes, Compound Indexes, and EXPLAIN ANALYZE",
          "ACID Properties, Transactions, and Isolation Levels in PostgreSQL"
        ],
        "objectives": [
          "Write performant SQL queries using indexing strategies to minimize sequential table scans",
          "Design production-ready database schemas with foreign key constraints"
        ],
        "practiceActivities": [
          "Optimize an unindexed slow SQL query with 500,000 records using EXPLAIN ANALYZE",
          "Execute atomic multi-table updates using SQL BEGIN...COMMIT transactions"
        ],
        "practicalTask": "Design and implement a PostgreSQL schema for an Uber-like Ride Booking platform with driver-rider assignment and billing logs.",
        "prerequisites": "Stage 3",
        "estimatedTime": "4 Weeks",
        "resources": [
          {
            "title": "PostgreSQL Official Documentation",
            "url": "https://www.postgresql.org/docs/",
            "provider": "PostgreSQL Global Development Group",
            "isFree": true
          },
          {
            "title": "Use The Index, Luke: SQL Indexing Guide",
            "url": "https://use-the-index-luke.com/",
            "provider": "Markus Winand",
            "isFree": true
          }
        ],
        "platformLink": {
          "label": "Test Database Concepts in Aptitude",
          "path": "/aptitude"
        }
      },
      {
        "stageNumber": 5,
        "id": "be-stage-5",
        "title": "Authentication, Authorization & Security",
        "summary": "Implement secure user authentication, token-based sessions, role-based access control, and password hashing.",
        "topics": [
          "Password Hashing with Bcrypt and Argon2 (Salting & Work Factors)",
          "JSON Web Tokens (JWT): Access Tokens, Refresh Tokens, and Expiration Strategy",
          "OAuth 2.0 & OpenID Connect: Social Sign-In Protocols",
          "Role-Based Access Control (RBAC) and Permission Matrices",
          "OWASP Top 10 API Security Risks: SQL Injection, Broken Object Level Auth (BOLA)"
        ],
        "objectives": [
          "Safely store user credentials and issue cryptographic tokens",
          "Enforce strict endpoint permission guards based on user role"
        ],
        "practiceActivities": [
          "Create a token renewal rotation mechanism with blacklisting of revoked refresh tokens",
          "Audit an API for BOLA vulnerabilities using Postman"
        ],
        "practicalTask": "Build a full-featured Authentication & Session Management microservice with email verification, password reset, and 2FA TOTP support.",
        "prerequisites": "Stage 3 & 4",
        "estimatedTime": "3 Weeks",
        "resources": [
          {
            "title": "OWASP API Security Top 10",
            "url": "https://owasp.org/www-project-api-security/",
            "provider": "OWASP",
            "isFree": true
          },
          {
            "title": "JWT.io: Introduction to JSON Web Tokens",
            "url": "https://jwt.io/introduction",
            "provider": "Auth0",
            "isFree": true
          }
        ],
        "platformLink": null
      },
      {
        "stageNumber": 6,
        "id": "be-stage-6",
        "title": "Caching, Performance & NoSQL Databases",
        "summary": "Accelerate response times using Redis caching, session storage, and understand document databases with MongoDB.",
        "topics": [
          "Caching Strategies: Cache-Aside, Write-Through, Write-Behind, and TTL Expiry",
          "Redis Data Structures: Strings, Hashes, Lists, Sets, Sorted Sets",
          "Redis as an In-Memory Cache and Distributed Lock",
          "Document Database Modeling with MongoDB / Mongoose",
          "Message Queues & Background Workers: BullMQ, Celery, or RabbitMQ"
        ],
        "objectives": [
          "Reduce database read load by 80% using Redis Cache-Aside pattern",
          "Offload heavy background tasks (email dispatch, report generation) to job queues"
        ],
        "practiceActivities": [
          "Benchmark an API endpoint before and after Redis caching with Apache Bench",
          "Build an email dispatch queue with automated retries and dead-letter queue"
        ],
        "practicalTask": "Implement a high-throughput Leaderboard & Activity Feed engine using Redis Sorted Sets and background queue processors.",
        "prerequisites": "Stage 4 & 5",
        "estimatedTime": "3 Weeks",
        "resources": [
          {
            "title": "Redis Official University & Documentation",
            "url": "https://redis.io/docs/",
            "provider": "Redis Labs",
            "isFree": true
          },
          {
            "title": "MongoDB University",
            "url": "https://www.mongodb.com/docs/",
            "provider": "MongoDB",
            "isFree": true
          }
        ],
        "platformLink": null
      },
      {
        "stageNumber": 7,
        "id": "be-stage-7",
        "title": "Beginner Project: Secure Multi-Tenant Task API",
        "summary": "Construct a complete production-ready REST API with PostgreSQL, Prisma/TypeORM, JWT authentication, and pagination.",
        "topics": [
          "Schema Migration workflows using Prisma or Liquibase",
          "Offset and Cursor-Based Pagination for Large Collections",
          "Role-Based Permissions (Admin, Manager, Member)",
          "Integration Testing with Supertest and Jest",
          "Automated API Documentation"
        ],
        "objectives": [
          "Deliver an end-to-end backend service following repository/service design patterns",
          "Write automated tests with 80%+ code coverage"
        ],
        "practiceActivities": [
          "Run comprehensive test suites verifying permission boundaries",
          "Dockerize the API and PostgreSQL database using Docker Compose"
        ],
        "practicalTask": "Develop and test a collaborative Workspace Task Management API with team spaces, role enforcement, and activity logs.",
        "prerequisites": "Stage 1 through 6",
        "estimatedTime": "2-3 Weeks",
        "resources": [
          {
            "title": "Prisma ORM Documentation",
            "url": "https://www.prisma.io/docs",
            "provider": "Prisma",
            "isFree": true
          }
        ],
        "platformLink": null
      },
      {
        "stageNumber": 8,
        "id": "be-stage-8",
        "title": "Intermediate Project: Scalable E-Commerce Microservices",
        "summary": "Architect a distributed microservices backend with asynchronous event messaging, payment gateway integration, and Docker.",
        "topics": [
          "Microservices Decomposition: Auth Service, Catalog Service, Order Service, Payment Service",
          "Inter-Service Communication: Asynchronous Event Bus with RabbitMQ / Kafka",
          "Stripe / Razorpay Payment Webhook Integration with Idempotency Keys",
          "Dockerizing Services and Multi-Container Docker Compose Setup",
          "Distributed Tracing and Centralized Logging"
        ],
        "objectives": [
          "Design decoupled services communicating via publish/subscribe message queues",
          "Handle webhook callbacks safely with replay prevention and idempotency keys"
        ],
        "practiceActivities": [
          "Simulate network failures and verify message queue dead-letter routing",
          "Deploy the microservices architecture to AWS ECS or Railway"
        ],
        "practicalTask": "Build an E-Commerce Order Processing Engine capable of reserving inventory, processing mock Razorpay transactions, and dispatching invoices asynchronously.",
        "prerequisites": "Stage 7",
        "estimatedTime": "4 Weeks",
        "resources": [
          {
            "title": "Docker Official Documentation",
            "url": "https://docs.docker.com/",
            "provider": "Docker Inc.",
            "isFree": true
          },
          {
            "title": "Stripe Webhook Developer Guide",
            "url": "https://stripe.com/docs/webhooks",
            "provider": "Stripe",
            "isFree": true
          }
        ],
        "platformLink": null
      },
      {
        "stageNumber": 9,
        "id": "be-stage-9",
        "title": "System Design Fundamentals & High-Level Architecture",
        "summary": "Learn system design principles: Load Balancing, Horizontal Scaling, Database Sharding, Caching, and CAP Theorem.",
        "topics": [
          "Horizontal vs Vertical Scaling and Stateless Server Architecture",
          "Load Balancers: Round Robin, Least Connections, and Consistent Hashing",
          "Database Scaling: Read Replicas, Connection Pooling, Partitioning, and Sharding",
          "CAP Theorem, PACELC, and Eventual Consistency",
          "High-Level Design Patterns: URL Shortener, Rate Limiter, Notification System"
        ],
        "objectives": [
          "Diagram scalable distributed architectures and justify technical tradeoffs",
          "Calculate throughput (QPS), bandwidth, and storage requirements for scale"
        ],
        "practiceActivities": [
          "Draft an HLD architecture diagram for a URL Shortener like Bitly handling 100M URLs/month",
          "Design an distributed rate limiter using Redis Token Bucket"
        ],
        "practicalTask": "Create a complete System Architecture Blueprint for a real-time Chat Messaging platform with WebSockets and message persistence.",
        "prerequisites": "Stage 8",
        "estimatedTime": "3 Weeks",
        "resources": [
          {
            "title": "System Design Primer by Donne Martin",
            "url": "https://github.com/donnemartin/system-design-primer",
            "provider": "Open Source GitHub",
            "isFree": true
          }
        ],
        "platformLink": {
          "label": "Explore Target Company Architecture",
          "path": "/companies"
        }
      },
      {
        "stageNumber": 10,
        "id": "be-stage-10",
        "title": "Backend Interview Preparation & Live System Defense",
        "summary": "Master backend data structures, concurrency rounds, database tuning questions, and mock technical interviews.",
        "topics": [
          "Deep Dive: SQL Query Optimization, Indexes, and Transaction Locks",
          "Backend Concurrency: Deadlocks, Race Conditions, Thread Safety",
          "Live Coding: Designing LRU Cache, Rate Limiter, and File System Parsers",
          "Architectural Defense: Defending your design choices against Senior Staff Engineers",
          "Applying for Junior/Fresher Backend & SDE roles"
        ],
        "objectives": [
          "Solve standard backend live coding problems within 45 minutes",
          "Ace the technical system design and behavioral interview rounds"
        ],
        "practiceActivities": [
          "Conduct 3 Backend Mock Technical Interviews on PlaceMentor AI",
          "Apply to 15+ verified Backend Developer positions on the Jobs portal"
        ],
        "practicalTask": "Complete a live 45-minute technical challenge: Implement an in-memory thread-safe LRU Cache with O(1) Get and Put operations.",
        "prerequisites": "Stages 1 through 9",
        "estimatedTime": "3 Weeks",
        "resources": [
          {
            "title": "LeetCode: LRU Cache Problem",
            "url": "https://leetcode.com/problems/lru-cache/",
            "provider": "LeetCode",
            "isFree": true
          }
        ],
        "platformLink": {
          "label": "Practice Technical Mock Interview",
          "path": "/interview"
        }
      }
    ]
  },
  {
    "id": "full-stack-developer",
    "title": "Full-Stack Developer",
    "category": "Software Development",
    "difficulty": "Intermediate",
    "duration": "7-9 Months",
    "icon": "Layers",
    "color": "purple",
    "prerequisites": "Core Programming Concepts, Web Basics",
    "technologies": [
      "React",
      "TypeScript",
      "Node.js",
      "Express / NestJS",
      "PostgreSQL",
      "MongoDB",
      "Prisma ORM",
      "Docker",
      "AWS / Vercel"
    ],
    "shortDescription": "Build end-to-end web applications, connecting high-performance frontend interfaces with robust backend architectures.",
    "overview": "Full-Stack Developers command both client-side and server-side technologies, delivering complete products from user interface to database storage and cloud infrastructure.",
    "stages": [
      {
        "stageNumber": 1,
        "id": "full-stage-1",
        "title": "Prerequisites & CS Fundamentals for Full-Stack Developer",
        "summary": "Core theoretical and structural computer science prerequisites required to excel in Full-Stack Developer.",
        "topics": [
          "Operating Systems & Memory Hierarchy",
          "Networking Fundamentals & Protocol Layers",
          "Boolean Logic & Discrete Mathematics",
          "Version Control with Git & GitHub",
          "Command Line Interface (CLI) Mastery"
        ],
        "objectives": [
          "Establish clear understanding of computational concepts essential for Full-Stack Developer",
          "Configure professional development terminal environments",
          "Understand system architecture basics"
        ],
        "practiceActivities": [
          "Complete 10 Linux terminal navigation exercises",
          "Diagram a client-server transaction flow"
        ],
        "practicalTask": "Initialize a development workspace with Git, secure environment configuration, and project scaffolding for Full-Stack Developer.",
        "prerequisites": "None",
        "estimatedTime": "2 Weeks",
        "resources": [
          {
            "title": "Roadmap.sh Developer Roadmaps",
            "url": "https://roadmap.sh/",
            "provider": "Roadmap.sh",
            "isFree": true
          },
          {
            "title": "GeeksforGeeks Engineering Hub",
            "url": "https://www.geeksforgeeks.org/",
            "provider": "GeeksforGeeks",
            "isFree": true
          }
        ],
        "platformLink": null
      },
      {
        "stageNumber": 2,
        "id": "full-stage-2",
        "title": "Core Languages & Foundations (React, TypeScript, Node.js, Express / NestJS)",
        "summary": "Develop deep syntactic and operational mastery of primary programming tools used in Full-Stack Developer.",
        "topics": [
          "Syntax, Control Flow, and Data Types",
          "Object-Oriented Programming (OOP) vs Functional Paradigms",
          "Error Handling, Exceptions, and Defensive Coding",
          "Memory Management and Garbage Collection",
          "Modular Code Structure & Package Management"
        ],
        "objectives": [
          "Write production-standard code in core languages utilized by Full-Stack Developer",
          "Handle exceptions and edge cases with clean architecture"
        ],
        "practiceActivities": [
          "Write 15 standalone algorithmic functions with unit tests",
          "Implement custom class hierarchies demonstrating inheritance & polymorphism"
        ],
        "practicalTask": "Develop a robust CLI automation utility or foundational service utilizing React, TypeScript, Node.js, Express / NestJS.",
        "prerequisites": "Stage 1",
        "estimatedTime": "3 Weeks",
        "resources": [
          {
            "title": "Roadmap.sh Developer Roadmaps",
            "url": "https://roadmap.sh/",
            "provider": "Roadmap.sh",
            "isFree": true
          },
          {
            "title": "GeeksforGeeks Engineering Hub",
            "url": "https://www.geeksforgeeks.org/",
            "provider": "GeeksforGeeks",
            "isFree": true
          }
        ],
        "platformLink": {
          "label": "Practice React Coding",
          "path": "/coding"
        }
      },
      {
        "stageNumber": 3,
        "id": "full-stage-3",
        "title": "Role-Specific Technical Skills & Core Frameworks",
        "summary": "Master specialized domain frameworks, libraries, protocols, and standard patterns for Full-Stack Developer.",
        "topics": [
          "Primary Full-Stack Developer Frameworks & Libraries",
          "Data Validation & Pipeline Architecture",
          "API Integration & Protocol Handlers",
          "Configuration Management & Environment Parity",
          "Security Best Practices & Threat Mitigation"
        ],
        "objectives": [
          "Build end-to-end features adhering to modern Full-Stack Developer industry standards",
          "Apply design patterns tailored to the role"
        ],
        "practiceActivities": [
          "Build a working proof-of-concept module utilizing standard industry frameworks",
          "Audit a code repository for performance bottlenecks"
        ],
        "practicalTask": "Construct a fully functional core service module demonstrating Full-Stack Developer competencies.",
        "prerequisites": "Stage 2",
        "estimatedTime": "3-4 Weeks",
        "resources": [
          {
            "title": "Roadmap.sh Developer Roadmaps",
            "url": "https://roadmap.sh/",
            "provider": "Roadmap.sh",
            "isFree": true
          },
          {
            "title": "GeeksforGeeks Engineering Hub",
            "url": "https://www.geeksforgeeks.org/",
            "provider": "GeeksforGeeks",
            "isFree": true
          }
        ],
        "platformLink": null
      },
      {
        "stageNumber": 4,
        "id": "full-stage-4",
        "title": "Data Structures, Algorithms & Problem Solving",
        "summary": "Targeted algorithmic problem solving, computational complexity, and data structures relevant to Full-Stack Developer.",
        "topics": [
          "Arrays, Hash Maps, Linked Lists, and Stacks/Queues",
          "Trees, Graphs, and Breadth-First / Depth-First Traversal",
          "Searching, Sorting, and Binary Search",
          "Greedy Algorithms and Dynamic Programming Patterns",
          "Time & Space Complexity Tradeoff Analysis"
        ],
        "objectives": [
          "Confidently solve technical coding screening assessments",
          "Evaluate algorithm performance using Big-O notation"
        ],
        "practiceActivities": [
          "Solve 40 LeetCode Easy & Medium problems in your primary language",
          "Analyze space and time complexity for critical routines"
        ],
        "practicalTask": "Implement an optimized search, sort, and cache routine for domain-specific data structures.",
        "prerequisites": "Stage 2 & 3",
        "estimatedTime": "3 Weeks",
        "resources": [
          {
            "title": "Roadmap.sh Developer Roadmaps",
            "url": "https://roadmap.sh/",
            "provider": "Roadmap.sh",
            "isFree": true
          },
          {
            "title": "GeeksforGeeks Engineering Hub",
            "url": "https://www.geeksforgeeks.org/",
            "provider": "GeeksforGeeks",
            "isFree": true
          }
        ],
        "platformLink": {
          "label": "Solve Coding Problems",
          "path": "/coding"
        }
      },
      {
        "stageNumber": 5,
        "id": "full-stage-5",
        "title": "Tools, Platforms & Development Workflow",
        "summary": "Professional tooling, containerization, automated testing, and CI/CD pipelines for Full-Stack Developer.",
        "topics": [
          "Docker Containerization & Multi-Stage Builds",
          "Automated Testing (Unit, Integration, End-to-End)",
          "CI/CD Pipeline Automation (GitHub Actions)",
          "Cloud Infrastructure & Deployment Services",
          "Observability, Logging, and Monitoring"
        ],
        "objectives": [
          "Automate build, test, and release cycles",
          "Containerize applications for reproducible environments"
        ],
        "practiceActivities": [
          "Write a Dockerfile and docker-compose.yml configuration",
          "Create a GitHub Actions workflow to run automated tests on every push"
        ],
        "practicalTask": "Configure a continuous deployment pipeline with automated testing for a Full-Stack Developer project.",
        "prerequisites": "Stage 3",
        "estimatedTime": "2 Weeks",
        "resources": [
          {
            "title": "Roadmap.sh Developer Roadmaps",
            "url": "https://roadmap.sh/",
            "provider": "Roadmap.sh",
            "isFree": true
          },
          {
            "title": "GeeksforGeeks Engineering Hub",
            "url": "https://www.geeksforgeeks.org/",
            "provider": "GeeksforGeeks",
            "isFree": true
          }
        ],
        "platformLink": null
      },
      {
        "stageNumber": 6,
        "id": "full-stage-6",
        "title": "Guided Practice & Applied Exercises",
        "summary": "Solve realistic industry exercises, build architectural prototypes, and practice technical challenges.",
        "topics": [
          "Real-world Architectural Case Studies",
          "Debugging Complex Multi-Component Failures",
          "Performance Profiling & Bottleneck Resolution",
          "Data Consistency & Fault Tolerance",
          "Clean Code & Refactoring Patterns"
        ],
        "objectives": [
          "Handle unexpected system degradation and identify root causes",
          "Refactor legacy codebase into clean, testable architecture"
        ],
        "practiceActivities": [
          "Debug and resolve 5 intentionally broken code repositories",
          "Conduct benchmark performance profiling"
        ],
        "practicalTask": "Complete a 3-hour simulated take-home engineering assessment.",
        "prerequisites": "Stage 4 & 5",
        "estimatedTime": "2-3 Weeks",
        "resources": [
          {
            "title": "Roadmap.sh Developer Roadmaps",
            "url": "https://roadmap.sh/",
            "provider": "Roadmap.sh",
            "isFree": true
          },
          {
            "title": "GeeksforGeeks Engineering Hub",
            "url": "https://www.geeksforgeeks.org/",
            "provider": "GeeksforGeeks",
            "isFree": true
          }
        ],
        "platformLink": {
          "label": "Run Aptitude & Practice Tests",
          "path": "/aptitude"
        }
      },
      {
        "stageNumber": 7,
        "id": "full-stage-7",
        "title": "Beginner Capstone Project",
        "summary": "Synthesize your learning into a functional, standalone, production-ready beginner project.",
        "topics": [
          "Project Scaffolding & Architecture",
          "Implementing Core Business Logic",
          "Data Persistence & State Management",
          "Automated Test Coverage",
          "Public Deployment & Documentation"
        ],
        "objectives": [
          "Deliver a working, deployed application from scratch",
          "Document setup instructions and architectural decisions in README"
        ],
        "practiceActivities": [
          "Set up automated GitHub Actions deployment",
          "Write comprehensive unit tests for all business logic"
        ],
        "practicalTask": "Build and deploy a complete functional starter project for Full-Stack Developer with live documentation and public repository.",
        "prerequisites": "Stage 3 & 5",
        "estimatedTime": "2-3 Weeks",
        "resources": [
          {
            "title": "Roadmap.sh Developer Roadmaps",
            "url": "https://roadmap.sh/",
            "provider": "Roadmap.sh",
            "isFree": true
          },
          {
            "title": "GeeksforGeeks Engineering Hub",
            "url": "https://www.geeksforgeeks.org/",
            "provider": "GeeksforGeeks",
            "isFree": true
          }
        ],
        "platformLink": null
      },
      {
        "stageNumber": 8,
        "id": "full-stage-8",
        "title": "Intermediate / Portfolio Flagship Project",
        "summary": "Engineer a high-impact, feature-rich portfolio flagship project that stands out to hiring managers.",
        "topics": [
          "Complex Architecture & Multi-Service Integration",
          "Scalability, Caching, and Fault Tolerance",
          "Security Hardening & Role Authorization",
          "Comprehensive Test Coverage (Unit + E2E)",
          "Professional Documentation & Video Walkthrough"
        ],
        "objectives": [
          "Demonstrate professional-level software engineering capability",
          "Present clean system design and quantitative performance results"
        ],
        "practiceActivities": [
          "Conduct stress testing and load testing with benchmark tools",
          "Record a 3-minute technical walkthrough video of your project"
        ],
        "practicalTask": "Publish a flagship Full-Stack Developer portfolio project with production deployment, live database, and architecture documentation.",
        "prerequisites": "Stage 7",
        "estimatedTime": "3-4 Weeks",
        "resources": [
          {
            "title": "Roadmap.sh Developer Roadmaps",
            "url": "https://roadmap.sh/",
            "provider": "Roadmap.sh",
            "isFree": true
          },
          {
            "title": "GeeksforGeeks Engineering Hub",
            "url": "https://www.geeksforgeeks.org/",
            "provider": "GeeksforGeeks",
            "isFree": true
          }
        ],
        "platformLink": null
      },
      {
        "stageNumber": 9,
        "id": "full-stage-9",
        "title": "Resume, GitHub Portfolio & Professional Presence",
        "summary": "Craft an ATS-optimized technical resume, polish your GitHub repositories, and optimize LinkedIn presence.",
        "topics": [
          "Impact-Driven Resume Bullet Points (Action + Context + Quantified Result)",
          "GitHub Profile Readme & Pinned Projects Showcase",
          "Technical Blog Writing & Project Case Studies",
          "LinkedIn Profile Optimization for Technical Recruiters",
          "Elevator Pitch & Portfolio Website"
        ],
        "objectives": [
          "Pass technical screening ATS filters with a 90+ score",
          "Present repositories with clean documentation and demo URLs"
        ],
        "practiceActivities": [
          "Score your resume on PlaceMentor AI’s Resume Builder",
          "Draft technical case studies explaining your design tradeoffs"
        ],
        "practicalTask": "Finalize your tailored Full-Stack Developer resume and publish an open-source GitHub portfolio.",
        "prerequisites": "Stage 7 & 8",
        "estimatedTime": "1-2 Weeks",
        "resources": [
          {
            "title": "Roadmap.sh Developer Roadmaps",
            "url": "https://roadmap.sh/",
            "provider": "Roadmap.sh",
            "isFree": true
          },
          {
            "title": "GeeksforGeeks Engineering Hub",
            "url": "https://www.geeksforgeeks.org/",
            "provider": "GeeksforGeeks",
            "isFree": true
          }
        ],
        "platformLink": {
          "label": "Build ATS Resume",
          "path": "/resume"
        }
      },
      {
        "stageNumber": 10,
        "id": "full-stage-10",
        "title": "Interview Preparation, System Design & Applications",
        "summary": "Ace live technical screening rounds, domain-specific problem solving, system design, and behavioral interviews.",
        "topics": [
          "Top Technical Interview Questions for Full-Stack Developer",
          "System Design & Architectural Tradeoffs",
          "Live Whiteboard / Screen-Share Coding Best Practices",
          "Behavioral Leadership Rounds (STAR Method)",
          "Strategic Job Applications across Campus & Off-Campus Drives"
        ],
        "objectives": [
          "Pass 45-60 minute technical interviews with confidence",
          "Effectively communicate technical tradeoffs to Engineering Managers"
        ],
        "practiceActivities": [
          "Conduct at least 3 AI Mock Technical Interviews on PlaceMentor AI",
          "Apply to 20+ verified opportunities on the Jobs Portal"
        ],
        "practicalTask": "Complete a full mock technical interview panel for Full-Stack Developer and apply to verified companies hiring in India.",
        "prerequisites": "Stages 1 through 9",
        "estimatedTime": "3-4 Weeks",
        "resources": [
          {
            "title": "Roadmap.sh Developer Roadmaps",
            "url": "https://roadmap.sh/",
            "provider": "Roadmap.sh",
            "isFree": true
          },
          {
            "title": "GeeksforGeeks Engineering Hub",
            "url": "https://www.geeksforgeeks.org/",
            "provider": "GeeksforGeeks",
            "isFree": true
          }
        ],
        "platformLink": {
          "label": "Take AI Mock Interview for Full-Stack Developer",
          "path": "/interview"
        }
      }
    ]
  },
  {
    "id": "java-developer",
    "title": "Java Developer",
    "category": "Software Development",
    "difficulty": "Intermediate",
    "duration": "6-8 Months",
    "icon": "Coffee",
    "color": "accent",
    "prerequisites": "Basic C or Programming logic, OOPs familiarity",
    "technologies": [
      "Java 21",
      "Spring Boot 3",
      "Spring Data JPA",
      "Hibernate",
      "PostgreSQL",
      "Maven / Gradle",
      "JUnit & Mockito",
      "Docker",
      "Microservices"
    ],
    "shortDescription": "Master enterprise Java software engineering, Spring Boot microservices, multithreading, and large-scale enterprise backends.",
    "overview": "Java powers tier-1 banks, e-commerce giants, and enterprise backends worldwide. This roadmap covers Java OOPs, JVM internals, Collections, Multithreading, Spring Boot, JPA/Hibernate, and enterprise microservices.",
    "stages": [
      {
        "stageNumber": 1,
        "id": "java-stage-1",
        "title": "Prerequisites & CS Fundamentals for Java Developer",
        "summary": "Core theoretical and structural computer science prerequisites required to excel in Java Developer.",
        "topics": [
          "Operating Systems & Memory Hierarchy",
          "Networking Fundamentals & Protocol Layers",
          "Boolean Logic & Discrete Mathematics",
          "Version Control with Git & GitHub",
          "Command Line Interface (CLI) Mastery"
        ],
        "objectives": [
          "Establish clear understanding of computational concepts essential for Java Developer",
          "Configure professional development terminal environments",
          "Understand system architecture basics"
        ],
        "practiceActivities": [
          "Complete 10 Linux terminal navigation exercises",
          "Diagram a client-server transaction flow"
        ],
        "practicalTask": "Initialize a development workspace with Git, secure environment configuration, and project scaffolding for Java Developer.",
        "prerequisites": "None",
        "estimatedTime": "2 Weeks",
        "resources": [
          {
            "title": "Roadmap.sh Developer Roadmaps",
            "url": "https://roadmap.sh/",
            "provider": "Roadmap.sh",
            "isFree": true
          },
          {
            "title": "GeeksforGeeks Engineering Hub",
            "url": "https://www.geeksforgeeks.org/",
            "provider": "GeeksforGeeks",
            "isFree": true
          }
        ],
        "platformLink": null
      },
      {
        "stageNumber": 2,
        "id": "java-stage-2",
        "title": "Core Languages & Foundations (Java 21, Spring Boot 3, Spring Data JPA, Hibernate)",
        "summary": "Develop deep syntactic and operational mastery of primary programming tools used in Java Developer.",
        "topics": [
          "Syntax, Control Flow, and Data Types",
          "Object-Oriented Programming (OOP) vs Functional Paradigms",
          "Error Handling, Exceptions, and Defensive Coding",
          "Memory Management and Garbage Collection",
          "Modular Code Structure & Package Management"
        ],
        "objectives": [
          "Write production-standard code in core languages utilized by Java Developer",
          "Handle exceptions and edge cases with clean architecture"
        ],
        "practiceActivities": [
          "Write 15 standalone algorithmic functions with unit tests",
          "Implement custom class hierarchies demonstrating inheritance & polymorphism"
        ],
        "practicalTask": "Develop a robust CLI automation utility or foundational service utilizing Java 21, Spring Boot 3, Spring Data JPA, Hibernate.",
        "prerequisites": "Stage 1",
        "estimatedTime": "3 Weeks",
        "resources": [
          {
            "title": "Roadmap.sh Developer Roadmaps",
            "url": "https://roadmap.sh/",
            "provider": "Roadmap.sh",
            "isFree": true
          },
          {
            "title": "GeeksforGeeks Engineering Hub",
            "url": "https://www.geeksforgeeks.org/",
            "provider": "GeeksforGeeks",
            "isFree": true
          }
        ],
        "platformLink": {
          "label": "Practice Java 21 Coding",
          "path": "/coding"
        }
      },
      {
        "stageNumber": 3,
        "id": "java-stage-3",
        "title": "Role-Specific Technical Skills & Core Frameworks",
        "summary": "Master specialized domain frameworks, libraries, protocols, and standard patterns for Java Developer.",
        "topics": [
          "Primary Java Developer Frameworks & Libraries",
          "Data Validation & Pipeline Architecture",
          "API Integration & Protocol Handlers",
          "Configuration Management & Environment Parity",
          "Security Best Practices & Threat Mitigation"
        ],
        "objectives": [
          "Build end-to-end features adhering to modern Java Developer industry standards",
          "Apply design patterns tailored to the role"
        ],
        "practiceActivities": [
          "Build a working proof-of-concept module utilizing standard industry frameworks",
          "Audit a code repository for performance bottlenecks"
        ],
        "practicalTask": "Construct a fully functional core service module demonstrating Java Developer competencies.",
        "prerequisites": "Stage 2",
        "estimatedTime": "3-4 Weeks",
        "resources": [
          {
            "title": "Roadmap.sh Developer Roadmaps",
            "url": "https://roadmap.sh/",
            "provider": "Roadmap.sh",
            "isFree": true
          },
          {
            "title": "GeeksforGeeks Engineering Hub",
            "url": "https://www.geeksforgeeks.org/",
            "provider": "GeeksforGeeks",
            "isFree": true
          }
        ],
        "platformLink": null
      },
      {
        "stageNumber": 4,
        "id": "java-stage-4",
        "title": "Data Structures, Algorithms & Problem Solving",
        "summary": "Targeted algorithmic problem solving, computational complexity, and data structures relevant to Java Developer.",
        "topics": [
          "Arrays, Hash Maps, Linked Lists, and Stacks/Queues",
          "Trees, Graphs, and Breadth-First / Depth-First Traversal",
          "Searching, Sorting, and Binary Search",
          "Greedy Algorithms and Dynamic Programming Patterns",
          "Time & Space Complexity Tradeoff Analysis"
        ],
        "objectives": [
          "Confidently solve technical coding screening assessments",
          "Evaluate algorithm performance using Big-O notation"
        ],
        "practiceActivities": [
          "Solve 40 LeetCode Easy & Medium problems in your primary language",
          "Analyze space and time complexity for critical routines"
        ],
        "practicalTask": "Implement an optimized search, sort, and cache routine for domain-specific data structures.",
        "prerequisites": "Stage 2 & 3",
        "estimatedTime": "3 Weeks",
        "resources": [
          {
            "title": "Roadmap.sh Developer Roadmaps",
            "url": "https://roadmap.sh/",
            "provider": "Roadmap.sh",
            "isFree": true
          },
          {
            "title": "GeeksforGeeks Engineering Hub",
            "url": "https://www.geeksforgeeks.org/",
            "provider": "GeeksforGeeks",
            "isFree": true
          }
        ],
        "platformLink": {
          "label": "Solve Coding Problems",
          "path": "/coding"
        }
      },
      {
        "stageNumber": 5,
        "id": "java-stage-5",
        "title": "Tools, Platforms & Development Workflow",
        "summary": "Professional tooling, containerization, automated testing, and CI/CD pipelines for Java Developer.",
        "topics": [
          "Docker Containerization & Multi-Stage Builds",
          "Automated Testing (Unit, Integration, End-to-End)",
          "CI/CD Pipeline Automation (GitHub Actions)",
          "Cloud Infrastructure & Deployment Services",
          "Observability, Logging, and Monitoring"
        ],
        "objectives": [
          "Automate build, test, and release cycles",
          "Containerize applications for reproducible environments"
        ],
        "practiceActivities": [
          "Write a Dockerfile and docker-compose.yml configuration",
          "Create a GitHub Actions workflow to run automated tests on every push"
        ],
        "practicalTask": "Configure a continuous deployment pipeline with automated testing for a Java Developer project.",
        "prerequisites": "Stage 3",
        "estimatedTime": "2 Weeks",
        "resources": [
          {
            "title": "Roadmap.sh Developer Roadmaps",
            "url": "https://roadmap.sh/",
            "provider": "Roadmap.sh",
            "isFree": true
          },
          {
            "title": "GeeksforGeeks Engineering Hub",
            "url": "https://www.geeksforgeeks.org/",
            "provider": "GeeksforGeeks",
            "isFree": true
          }
        ],
        "platformLink": null
      },
      {
        "stageNumber": 6,
        "id": "java-stage-6",
        "title": "Guided Practice & Applied Exercises",
        "summary": "Solve realistic industry exercises, build architectural prototypes, and practice technical challenges.",
        "topics": [
          "Real-world Architectural Case Studies",
          "Debugging Complex Multi-Component Failures",
          "Performance Profiling & Bottleneck Resolution",
          "Data Consistency & Fault Tolerance",
          "Clean Code & Refactoring Patterns"
        ],
        "objectives": [
          "Handle unexpected system degradation and identify root causes",
          "Refactor legacy codebase into clean, testable architecture"
        ],
        "practiceActivities": [
          "Debug and resolve 5 intentionally broken code repositories",
          "Conduct benchmark performance profiling"
        ],
        "practicalTask": "Complete a 3-hour simulated take-home engineering assessment.",
        "prerequisites": "Stage 4 & 5",
        "estimatedTime": "2-3 Weeks",
        "resources": [
          {
            "title": "Roadmap.sh Developer Roadmaps",
            "url": "https://roadmap.sh/",
            "provider": "Roadmap.sh",
            "isFree": true
          },
          {
            "title": "GeeksforGeeks Engineering Hub",
            "url": "https://www.geeksforgeeks.org/",
            "provider": "GeeksforGeeks",
            "isFree": true
          }
        ],
        "platformLink": {
          "label": "Run Aptitude & Practice Tests",
          "path": "/aptitude"
        }
      },
      {
        "stageNumber": 7,
        "id": "java-stage-7",
        "title": "Beginner Capstone Project",
        "summary": "Synthesize your learning into a functional, standalone, production-ready beginner project.",
        "topics": [
          "Project Scaffolding & Architecture",
          "Implementing Core Business Logic",
          "Data Persistence & State Management",
          "Automated Test Coverage",
          "Public Deployment & Documentation"
        ],
        "objectives": [
          "Deliver a working, deployed application from scratch",
          "Document setup instructions and architectural decisions in README"
        ],
        "practiceActivities": [
          "Set up automated GitHub Actions deployment",
          "Write comprehensive unit tests for all business logic"
        ],
        "practicalTask": "Build and deploy a complete functional starter project for Java Developer with live documentation and public repository.",
        "prerequisites": "Stage 3 & 5",
        "estimatedTime": "2-3 Weeks",
        "resources": [
          {
            "title": "Roadmap.sh Developer Roadmaps",
            "url": "https://roadmap.sh/",
            "provider": "Roadmap.sh",
            "isFree": true
          },
          {
            "title": "GeeksforGeeks Engineering Hub",
            "url": "https://www.geeksforgeeks.org/",
            "provider": "GeeksforGeeks",
            "isFree": true
          }
        ],
        "platformLink": null
      },
      {
        "stageNumber": 8,
        "id": "java-stage-8",
        "title": "Intermediate / Portfolio Flagship Project",
        "summary": "Engineer a high-impact, feature-rich portfolio flagship project that stands out to hiring managers.",
        "topics": [
          "Complex Architecture & Multi-Service Integration",
          "Scalability, Caching, and Fault Tolerance",
          "Security Hardening & Role Authorization",
          "Comprehensive Test Coverage (Unit + E2E)",
          "Professional Documentation & Video Walkthrough"
        ],
        "objectives": [
          "Demonstrate professional-level software engineering capability",
          "Present clean system design and quantitative performance results"
        ],
        "practiceActivities": [
          "Conduct stress testing and load testing with benchmark tools",
          "Record a 3-minute technical walkthrough video of your project"
        ],
        "practicalTask": "Publish a flagship Java Developer portfolio project with production deployment, live database, and architecture documentation.",
        "prerequisites": "Stage 7",
        "estimatedTime": "3-4 Weeks",
        "resources": [
          {
            "title": "Roadmap.sh Developer Roadmaps",
            "url": "https://roadmap.sh/",
            "provider": "Roadmap.sh",
            "isFree": true
          },
          {
            "title": "GeeksforGeeks Engineering Hub",
            "url": "https://www.geeksforgeeks.org/",
            "provider": "GeeksforGeeks",
            "isFree": true
          }
        ],
        "platformLink": null
      },
      {
        "stageNumber": 9,
        "id": "java-stage-9",
        "title": "Resume, GitHub Portfolio & Professional Presence",
        "summary": "Craft an ATS-optimized technical resume, polish your GitHub repositories, and optimize LinkedIn presence.",
        "topics": [
          "Impact-Driven Resume Bullet Points (Action + Context + Quantified Result)",
          "GitHub Profile Readme & Pinned Projects Showcase",
          "Technical Blog Writing & Project Case Studies",
          "LinkedIn Profile Optimization for Technical Recruiters",
          "Elevator Pitch & Portfolio Website"
        ],
        "objectives": [
          "Pass technical screening ATS filters with a 90+ score",
          "Present repositories with clean documentation and demo URLs"
        ],
        "practiceActivities": [
          "Score your resume on PlaceMentor AI’s Resume Builder",
          "Draft technical case studies explaining your design tradeoffs"
        ],
        "practicalTask": "Finalize your tailored Java Developer resume and publish an open-source GitHub portfolio.",
        "prerequisites": "Stage 7 & 8",
        "estimatedTime": "1-2 Weeks",
        "resources": [
          {
            "title": "Roadmap.sh Developer Roadmaps",
            "url": "https://roadmap.sh/",
            "provider": "Roadmap.sh",
            "isFree": true
          },
          {
            "title": "GeeksforGeeks Engineering Hub",
            "url": "https://www.geeksforgeeks.org/",
            "provider": "GeeksforGeeks",
            "isFree": true
          }
        ],
        "platformLink": {
          "label": "Build ATS Resume",
          "path": "/resume"
        }
      },
      {
        "stageNumber": 10,
        "id": "java-stage-10",
        "title": "Interview Preparation, System Design & Applications",
        "summary": "Ace live technical screening rounds, domain-specific problem solving, system design, and behavioral interviews.",
        "topics": [
          "Top Technical Interview Questions for Java Developer",
          "System Design & Architectural Tradeoffs",
          "Live Whiteboard / Screen-Share Coding Best Practices",
          "Behavioral Leadership Rounds (STAR Method)",
          "Strategic Job Applications across Campus & Off-Campus Drives"
        ],
        "objectives": [
          "Pass 45-60 minute technical interviews with confidence",
          "Effectively communicate technical tradeoffs to Engineering Managers"
        ],
        "practiceActivities": [
          "Conduct at least 3 AI Mock Technical Interviews on PlaceMentor AI",
          "Apply to 20+ verified opportunities on the Jobs Portal"
        ],
        "practicalTask": "Complete a full mock technical interview panel for Java Developer and apply to verified companies hiring in India.",
        "prerequisites": "Stages 1 through 9",
        "estimatedTime": "3-4 Weeks",
        "resources": [
          {
            "title": "Roadmap.sh Developer Roadmaps",
            "url": "https://roadmap.sh/",
            "provider": "Roadmap.sh",
            "isFree": true
          },
          {
            "title": "GeeksforGeeks Engineering Hub",
            "url": "https://www.geeksforgeeks.org/",
            "provider": "GeeksforGeeks",
            "isFree": true
          }
        ],
        "platformLink": {
          "label": "Take AI Mock Interview for Java Developer",
          "path": "/interview"
        }
      }
    ]
  },
  {
    "id": "python-developer",
    "title": "Python Developer",
    "category": "Software Development",
    "difficulty": "Beginner Friendly",
    "duration": "5-6 Months",
    "icon": "Terminal",
    "color": "teal",
    "prerequisites": "Curiosity for scripting, Logical Reasoning",
    "technologies": [
      "Python 3.12",
      "FastAPI",
      "Django",
      "PostgreSQL",
      "SQLAlchemy",
      "PyTest",
      "Celery",
      "Redis",
      "Docker"
    ],
    "shortDescription": "Build scalable backends, asynchronous APIs, automation engines, and data services with modern Python.",
    "overview": "Python is among the world's most versatile programming languages. This roadmap takes you through Python syntax, OOPs, asynchronous programming with FastAPI, relational databases, background task queues, and testing.",
    "stages": [
      {
        "stageNumber": 1,
        "id": "pyth-stage-1",
        "title": "Prerequisites & CS Fundamentals for Python Developer",
        "summary": "Core theoretical and structural computer science prerequisites required to excel in Python Developer.",
        "topics": [
          "Operating Systems & Memory Hierarchy",
          "Networking Fundamentals & Protocol Layers",
          "Boolean Logic & Discrete Mathematics",
          "Version Control with Git & GitHub",
          "Command Line Interface (CLI) Mastery"
        ],
        "objectives": [
          "Establish clear understanding of computational concepts essential for Python Developer",
          "Configure professional development terminal environments",
          "Understand system architecture basics"
        ],
        "practiceActivities": [
          "Complete 10 Linux terminal navigation exercises",
          "Diagram a client-server transaction flow"
        ],
        "practicalTask": "Initialize a development workspace with Git, secure environment configuration, and project scaffolding for Python Developer.",
        "prerequisites": "None",
        "estimatedTime": "2 Weeks",
        "resources": [
          {
            "title": "Roadmap.sh Developer Roadmaps",
            "url": "https://roadmap.sh/",
            "provider": "Roadmap.sh",
            "isFree": true
          },
          {
            "title": "GeeksforGeeks Engineering Hub",
            "url": "https://www.geeksforgeeks.org/",
            "provider": "GeeksforGeeks",
            "isFree": true
          }
        ],
        "platformLink": null
      },
      {
        "stageNumber": 2,
        "id": "pyth-stage-2",
        "title": "Core Languages & Foundations (Python 3.12, FastAPI, Django, PostgreSQL)",
        "summary": "Develop deep syntactic and operational mastery of primary programming tools used in Python Developer.",
        "topics": [
          "Syntax, Control Flow, and Data Types",
          "Object-Oriented Programming (OOP) vs Functional Paradigms",
          "Error Handling, Exceptions, and Defensive Coding",
          "Memory Management and Garbage Collection",
          "Modular Code Structure & Package Management"
        ],
        "objectives": [
          "Write production-standard code in core languages utilized by Python Developer",
          "Handle exceptions and edge cases with clean architecture"
        ],
        "practiceActivities": [
          "Write 15 standalone algorithmic functions with unit tests",
          "Implement custom class hierarchies demonstrating inheritance & polymorphism"
        ],
        "practicalTask": "Develop a robust CLI automation utility or foundational service utilizing Python 3.12, FastAPI, Django, PostgreSQL.",
        "prerequisites": "Stage 1",
        "estimatedTime": "3 Weeks",
        "resources": [
          {
            "title": "Roadmap.sh Developer Roadmaps",
            "url": "https://roadmap.sh/",
            "provider": "Roadmap.sh",
            "isFree": true
          },
          {
            "title": "GeeksforGeeks Engineering Hub",
            "url": "https://www.geeksforgeeks.org/",
            "provider": "GeeksforGeeks",
            "isFree": true
          }
        ],
        "platformLink": {
          "label": "Practice Python 3.12 Coding",
          "path": "/coding"
        }
      },
      {
        "stageNumber": 3,
        "id": "pyth-stage-3",
        "title": "Role-Specific Technical Skills & Core Frameworks",
        "summary": "Master specialized domain frameworks, libraries, protocols, and standard patterns for Python Developer.",
        "topics": [
          "Primary Python Developer Frameworks & Libraries",
          "Data Validation & Pipeline Architecture",
          "API Integration & Protocol Handlers",
          "Configuration Management & Environment Parity",
          "Security Best Practices & Threat Mitigation"
        ],
        "objectives": [
          "Build end-to-end features adhering to modern Python Developer industry standards",
          "Apply design patterns tailored to the role"
        ],
        "practiceActivities": [
          "Build a working proof-of-concept module utilizing standard industry frameworks",
          "Audit a code repository for performance bottlenecks"
        ],
        "practicalTask": "Construct a fully functional core service module demonstrating Python Developer competencies.",
        "prerequisites": "Stage 2",
        "estimatedTime": "3-4 Weeks",
        "resources": [
          {
            "title": "Roadmap.sh Developer Roadmaps",
            "url": "https://roadmap.sh/",
            "provider": "Roadmap.sh",
            "isFree": true
          },
          {
            "title": "GeeksforGeeks Engineering Hub",
            "url": "https://www.geeksforgeeks.org/",
            "provider": "GeeksforGeeks",
            "isFree": true
          }
        ],
        "platformLink": null
      },
      {
        "stageNumber": 4,
        "id": "pyth-stage-4",
        "title": "Data Structures, Algorithms & Problem Solving",
        "summary": "Targeted algorithmic problem solving, computational complexity, and data structures relevant to Python Developer.",
        "topics": [
          "Arrays, Hash Maps, Linked Lists, and Stacks/Queues",
          "Trees, Graphs, and Breadth-First / Depth-First Traversal",
          "Searching, Sorting, and Binary Search",
          "Greedy Algorithms and Dynamic Programming Patterns",
          "Time & Space Complexity Tradeoff Analysis"
        ],
        "objectives": [
          "Confidently solve technical coding screening assessments",
          "Evaluate algorithm performance using Big-O notation"
        ],
        "practiceActivities": [
          "Solve 40 LeetCode Easy & Medium problems in your primary language",
          "Analyze space and time complexity for critical routines"
        ],
        "practicalTask": "Implement an optimized search, sort, and cache routine for domain-specific data structures.",
        "prerequisites": "Stage 2 & 3",
        "estimatedTime": "3 Weeks",
        "resources": [
          {
            "title": "Roadmap.sh Developer Roadmaps",
            "url": "https://roadmap.sh/",
            "provider": "Roadmap.sh",
            "isFree": true
          },
          {
            "title": "GeeksforGeeks Engineering Hub",
            "url": "https://www.geeksforgeeks.org/",
            "provider": "GeeksforGeeks",
            "isFree": true
          }
        ],
        "platformLink": {
          "label": "Solve Coding Problems",
          "path": "/coding"
        }
      },
      {
        "stageNumber": 5,
        "id": "pyth-stage-5",
        "title": "Tools, Platforms & Development Workflow",
        "summary": "Professional tooling, containerization, automated testing, and CI/CD pipelines for Python Developer.",
        "topics": [
          "Docker Containerization & Multi-Stage Builds",
          "Automated Testing (Unit, Integration, End-to-End)",
          "CI/CD Pipeline Automation (GitHub Actions)",
          "Cloud Infrastructure & Deployment Services",
          "Observability, Logging, and Monitoring"
        ],
        "objectives": [
          "Automate build, test, and release cycles",
          "Containerize applications for reproducible environments"
        ],
        "practiceActivities": [
          "Write a Dockerfile and docker-compose.yml configuration",
          "Create a GitHub Actions workflow to run automated tests on every push"
        ],
        "practicalTask": "Configure a continuous deployment pipeline with automated testing for a Python Developer project.",
        "prerequisites": "Stage 3",
        "estimatedTime": "2 Weeks",
        "resources": [
          {
            "title": "Roadmap.sh Developer Roadmaps",
            "url": "https://roadmap.sh/",
            "provider": "Roadmap.sh",
            "isFree": true
          },
          {
            "title": "GeeksforGeeks Engineering Hub",
            "url": "https://www.geeksforgeeks.org/",
            "provider": "GeeksforGeeks",
            "isFree": true
          }
        ],
        "platformLink": null
      },
      {
        "stageNumber": 6,
        "id": "pyth-stage-6",
        "title": "Guided Practice & Applied Exercises",
        "summary": "Solve realistic industry exercises, build architectural prototypes, and practice technical challenges.",
        "topics": [
          "Real-world Architectural Case Studies",
          "Debugging Complex Multi-Component Failures",
          "Performance Profiling & Bottleneck Resolution",
          "Data Consistency & Fault Tolerance",
          "Clean Code & Refactoring Patterns"
        ],
        "objectives": [
          "Handle unexpected system degradation and identify root causes",
          "Refactor legacy codebase into clean, testable architecture"
        ],
        "practiceActivities": [
          "Debug and resolve 5 intentionally broken code repositories",
          "Conduct benchmark performance profiling"
        ],
        "practicalTask": "Complete a 3-hour simulated take-home engineering assessment.",
        "prerequisites": "Stage 4 & 5",
        "estimatedTime": "2-3 Weeks",
        "resources": [
          {
            "title": "Roadmap.sh Developer Roadmaps",
            "url": "https://roadmap.sh/",
            "provider": "Roadmap.sh",
            "isFree": true
          },
          {
            "title": "GeeksforGeeks Engineering Hub",
            "url": "https://www.geeksforgeeks.org/",
            "provider": "GeeksforGeeks",
            "isFree": true
          }
        ],
        "platformLink": {
          "label": "Run Aptitude & Practice Tests",
          "path": "/aptitude"
        }
      },
      {
        "stageNumber": 7,
        "id": "pyth-stage-7",
        "title": "Beginner Capstone Project",
        "summary": "Synthesize your learning into a functional, standalone, production-ready beginner project.",
        "topics": [
          "Project Scaffolding & Architecture",
          "Implementing Core Business Logic",
          "Data Persistence & State Management",
          "Automated Test Coverage",
          "Public Deployment & Documentation"
        ],
        "objectives": [
          "Deliver a working, deployed application from scratch",
          "Document setup instructions and architectural decisions in README"
        ],
        "practiceActivities": [
          "Set up automated GitHub Actions deployment",
          "Write comprehensive unit tests for all business logic"
        ],
        "practicalTask": "Build and deploy a complete functional starter project for Python Developer with live documentation and public repository.",
        "prerequisites": "Stage 3 & 5",
        "estimatedTime": "2-3 Weeks",
        "resources": [
          {
            "title": "Roadmap.sh Developer Roadmaps",
            "url": "https://roadmap.sh/",
            "provider": "Roadmap.sh",
            "isFree": true
          },
          {
            "title": "GeeksforGeeks Engineering Hub",
            "url": "https://www.geeksforgeeks.org/",
            "provider": "GeeksforGeeks",
            "isFree": true
          }
        ],
        "platformLink": null
      },
      {
        "stageNumber": 8,
        "id": "pyth-stage-8",
        "title": "Intermediate / Portfolio Flagship Project",
        "summary": "Engineer a high-impact, feature-rich portfolio flagship project that stands out to hiring managers.",
        "topics": [
          "Complex Architecture & Multi-Service Integration",
          "Scalability, Caching, and Fault Tolerance",
          "Security Hardening & Role Authorization",
          "Comprehensive Test Coverage (Unit + E2E)",
          "Professional Documentation & Video Walkthrough"
        ],
        "objectives": [
          "Demonstrate professional-level software engineering capability",
          "Present clean system design and quantitative performance results"
        ],
        "practiceActivities": [
          "Conduct stress testing and load testing with benchmark tools",
          "Record a 3-minute technical walkthrough video of your project"
        ],
        "practicalTask": "Publish a flagship Python Developer portfolio project with production deployment, live database, and architecture documentation.",
        "prerequisites": "Stage 7",
        "estimatedTime": "3-4 Weeks",
        "resources": [
          {
            "title": "Roadmap.sh Developer Roadmaps",
            "url": "https://roadmap.sh/",
            "provider": "Roadmap.sh",
            "isFree": true
          },
          {
            "title": "GeeksforGeeks Engineering Hub",
            "url": "https://www.geeksforgeeks.org/",
            "provider": "GeeksforGeeks",
            "isFree": true
          }
        ],
        "platformLink": null
      },
      {
        "stageNumber": 9,
        "id": "pyth-stage-9",
        "title": "Resume, GitHub Portfolio & Professional Presence",
        "summary": "Craft an ATS-optimized technical resume, polish your GitHub repositories, and optimize LinkedIn presence.",
        "topics": [
          "Impact-Driven Resume Bullet Points (Action + Context + Quantified Result)",
          "GitHub Profile Readme & Pinned Projects Showcase",
          "Technical Blog Writing & Project Case Studies",
          "LinkedIn Profile Optimization for Technical Recruiters",
          "Elevator Pitch & Portfolio Website"
        ],
        "objectives": [
          "Pass technical screening ATS filters with a 90+ score",
          "Present repositories with clean documentation and demo URLs"
        ],
        "practiceActivities": [
          "Score your resume on PlaceMentor AI’s Resume Builder",
          "Draft technical case studies explaining your design tradeoffs"
        ],
        "practicalTask": "Finalize your tailored Python Developer resume and publish an open-source GitHub portfolio.",
        "prerequisites": "Stage 7 & 8",
        "estimatedTime": "1-2 Weeks",
        "resources": [
          {
            "title": "Roadmap.sh Developer Roadmaps",
            "url": "https://roadmap.sh/",
            "provider": "Roadmap.sh",
            "isFree": true
          },
          {
            "title": "GeeksforGeeks Engineering Hub",
            "url": "https://www.geeksforgeeks.org/",
            "provider": "GeeksforGeeks",
            "isFree": true
          }
        ],
        "platformLink": {
          "label": "Build ATS Resume",
          "path": "/resume"
        }
      },
      {
        "stageNumber": 10,
        "id": "pyth-stage-10",
        "title": "Interview Preparation, System Design & Applications",
        "summary": "Ace live technical screening rounds, domain-specific problem solving, system design, and behavioral interviews.",
        "topics": [
          "Top Technical Interview Questions for Python Developer",
          "System Design & Architectural Tradeoffs",
          "Live Whiteboard / Screen-Share Coding Best Practices",
          "Behavioral Leadership Rounds (STAR Method)",
          "Strategic Job Applications across Campus & Off-Campus Drives"
        ],
        "objectives": [
          "Pass 45-60 minute technical interviews with confidence",
          "Effectively communicate technical tradeoffs to Engineering Managers"
        ],
        "practiceActivities": [
          "Conduct at least 3 AI Mock Technical Interviews on PlaceMentor AI",
          "Apply to 20+ verified opportunities on the Jobs Portal"
        ],
        "practicalTask": "Complete a full mock technical interview panel for Python Developer and apply to verified companies hiring in India.",
        "prerequisites": "Stages 1 through 9",
        "estimatedTime": "3-4 Weeks",
        "resources": [
          {
            "title": "Roadmap.sh Developer Roadmaps",
            "url": "https://roadmap.sh/",
            "provider": "Roadmap.sh",
            "isFree": true
          },
          {
            "title": "GeeksforGeeks Engineering Hub",
            "url": "https://www.geeksforgeeks.org/",
            "provider": "GeeksforGeeks",
            "isFree": true
          }
        ],
        "platformLink": {
          "label": "Take AI Mock Interview for Python Developer",
          "path": "/interview"
        }
      }
    ]
  },
  {
    "id": "mobile-app-developer",
    "title": "Mobile App Developer",
    "category": "Software Development",
    "difficulty": "Intermediate",
    "duration": "6-7 Months",
    "icon": "Smartphone",
    "color": "primary",
    "prerequisites": "JavaScript or Dart fundamentals, UI intuition",
    "technologies": [
      "React Native",
      "Flutter / Dart",
      "TypeScript",
      "Redux Toolkit",
      "Native Device APIs",
      "Firebase",
      "App Store & Google Play",
      "Expo"
    ],
    "shortDescription": "Create cross-platform native iOS & Android mobile applications with modern frameworks and smooth 60fps animations.",
    "overview": "Mobile Developers deliver high-performance applications directly to billions of smartphones. Learn React Native and Flutter, native gestures, device camera/GPS integrations, push notifications, and App Store publishing.",
    "stages": [
      {
        "stageNumber": 1,
        "id": "mobi-stage-1",
        "title": "Prerequisites & CS Fundamentals for Mobile App Developer",
        "summary": "Core theoretical and structural computer science prerequisites required to excel in Mobile App Developer.",
        "topics": [
          "Operating Systems & Memory Hierarchy",
          "Networking Fundamentals & Protocol Layers",
          "Boolean Logic & Discrete Mathematics",
          "Version Control with Git & GitHub",
          "Command Line Interface (CLI) Mastery"
        ],
        "objectives": [
          "Establish clear understanding of computational concepts essential for Mobile App Developer",
          "Configure professional development terminal environments",
          "Understand system architecture basics"
        ],
        "practiceActivities": [
          "Complete 10 Linux terminal navigation exercises",
          "Diagram a client-server transaction flow"
        ],
        "practicalTask": "Initialize a development workspace with Git, secure environment configuration, and project scaffolding for Mobile App Developer.",
        "prerequisites": "None",
        "estimatedTime": "2 Weeks",
        "resources": [
          {
            "title": "Roadmap.sh Developer Roadmaps",
            "url": "https://roadmap.sh/",
            "provider": "Roadmap.sh",
            "isFree": true
          },
          {
            "title": "GeeksforGeeks Engineering Hub",
            "url": "https://www.geeksforgeeks.org/",
            "provider": "GeeksforGeeks",
            "isFree": true
          }
        ],
        "platformLink": null
      },
      {
        "stageNumber": 2,
        "id": "mobi-stage-2",
        "title": "Core Languages & Foundations (React Native, Flutter / Dart, TypeScript, Redux Toolkit)",
        "summary": "Develop deep syntactic and operational mastery of primary programming tools used in Mobile App Developer.",
        "topics": [
          "Syntax, Control Flow, and Data Types",
          "Object-Oriented Programming (OOP) vs Functional Paradigms",
          "Error Handling, Exceptions, and Defensive Coding",
          "Memory Management and Garbage Collection",
          "Modular Code Structure & Package Management"
        ],
        "objectives": [
          "Write production-standard code in core languages utilized by Mobile App Developer",
          "Handle exceptions and edge cases with clean architecture"
        ],
        "practiceActivities": [
          "Write 15 standalone algorithmic functions with unit tests",
          "Implement custom class hierarchies demonstrating inheritance & polymorphism"
        ],
        "practicalTask": "Develop a robust CLI automation utility or foundational service utilizing React Native, Flutter / Dart, TypeScript, Redux Toolkit.",
        "prerequisites": "Stage 1",
        "estimatedTime": "3 Weeks",
        "resources": [
          {
            "title": "Roadmap.sh Developer Roadmaps",
            "url": "https://roadmap.sh/",
            "provider": "Roadmap.sh",
            "isFree": true
          },
          {
            "title": "GeeksforGeeks Engineering Hub",
            "url": "https://www.geeksforgeeks.org/",
            "provider": "GeeksforGeeks",
            "isFree": true
          }
        ],
        "platformLink": {
          "label": "Practice React Native Coding",
          "path": "/coding"
        }
      },
      {
        "stageNumber": 3,
        "id": "mobi-stage-3",
        "title": "Role-Specific Technical Skills & Core Frameworks",
        "summary": "Master specialized domain frameworks, libraries, protocols, and standard patterns for Mobile App Developer.",
        "topics": [
          "Primary Mobile App Developer Frameworks & Libraries",
          "Data Validation & Pipeline Architecture",
          "API Integration & Protocol Handlers",
          "Configuration Management & Environment Parity",
          "Security Best Practices & Threat Mitigation"
        ],
        "objectives": [
          "Build end-to-end features adhering to modern Mobile App Developer industry standards",
          "Apply design patterns tailored to the role"
        ],
        "practiceActivities": [
          "Build a working proof-of-concept module utilizing standard industry frameworks",
          "Audit a code repository for performance bottlenecks"
        ],
        "practicalTask": "Construct a fully functional core service module demonstrating Mobile App Developer competencies.",
        "prerequisites": "Stage 2",
        "estimatedTime": "3-4 Weeks",
        "resources": [
          {
            "title": "Roadmap.sh Developer Roadmaps",
            "url": "https://roadmap.sh/",
            "provider": "Roadmap.sh",
            "isFree": true
          },
          {
            "title": "GeeksforGeeks Engineering Hub",
            "url": "https://www.geeksforgeeks.org/",
            "provider": "GeeksforGeeks",
            "isFree": true
          }
        ],
        "platformLink": null
      },
      {
        "stageNumber": 4,
        "id": "mobi-stage-4",
        "title": "Data Structures, Algorithms & Problem Solving",
        "summary": "Targeted algorithmic problem solving, computational complexity, and data structures relevant to Mobile App Developer.",
        "topics": [
          "Arrays, Hash Maps, Linked Lists, and Stacks/Queues",
          "Trees, Graphs, and Breadth-First / Depth-First Traversal",
          "Searching, Sorting, and Binary Search",
          "Greedy Algorithms and Dynamic Programming Patterns",
          "Time & Space Complexity Tradeoff Analysis"
        ],
        "objectives": [
          "Confidently solve technical coding screening assessments",
          "Evaluate algorithm performance using Big-O notation"
        ],
        "practiceActivities": [
          "Solve 40 LeetCode Easy & Medium problems in your primary language",
          "Analyze space and time complexity for critical routines"
        ],
        "practicalTask": "Implement an optimized search, sort, and cache routine for domain-specific data structures.",
        "prerequisites": "Stage 2 & 3",
        "estimatedTime": "3 Weeks",
        "resources": [
          {
            "title": "Roadmap.sh Developer Roadmaps",
            "url": "https://roadmap.sh/",
            "provider": "Roadmap.sh",
            "isFree": true
          },
          {
            "title": "GeeksforGeeks Engineering Hub",
            "url": "https://www.geeksforgeeks.org/",
            "provider": "GeeksforGeeks",
            "isFree": true
          }
        ],
        "platformLink": {
          "label": "Solve Coding Problems",
          "path": "/coding"
        }
      },
      {
        "stageNumber": 5,
        "id": "mobi-stage-5",
        "title": "Tools, Platforms & Development Workflow",
        "summary": "Professional tooling, containerization, automated testing, and CI/CD pipelines for Mobile App Developer.",
        "topics": [
          "Docker Containerization & Multi-Stage Builds",
          "Automated Testing (Unit, Integration, End-to-End)",
          "CI/CD Pipeline Automation (GitHub Actions)",
          "Cloud Infrastructure & Deployment Services",
          "Observability, Logging, and Monitoring"
        ],
        "objectives": [
          "Automate build, test, and release cycles",
          "Containerize applications for reproducible environments"
        ],
        "practiceActivities": [
          "Write a Dockerfile and docker-compose.yml configuration",
          "Create a GitHub Actions workflow to run automated tests on every push"
        ],
        "practicalTask": "Configure a continuous deployment pipeline with automated testing for a Mobile App Developer project.",
        "prerequisites": "Stage 3",
        "estimatedTime": "2 Weeks",
        "resources": [
          {
            "title": "Roadmap.sh Developer Roadmaps",
            "url": "https://roadmap.sh/",
            "provider": "Roadmap.sh",
            "isFree": true
          },
          {
            "title": "GeeksforGeeks Engineering Hub",
            "url": "https://www.geeksforgeeks.org/",
            "provider": "GeeksforGeeks",
            "isFree": true
          }
        ],
        "platformLink": null
      },
      {
        "stageNumber": 6,
        "id": "mobi-stage-6",
        "title": "Guided Practice & Applied Exercises",
        "summary": "Solve realistic industry exercises, build architectural prototypes, and practice technical challenges.",
        "topics": [
          "Real-world Architectural Case Studies",
          "Debugging Complex Multi-Component Failures",
          "Performance Profiling & Bottleneck Resolution",
          "Data Consistency & Fault Tolerance",
          "Clean Code & Refactoring Patterns"
        ],
        "objectives": [
          "Handle unexpected system degradation and identify root causes",
          "Refactor legacy codebase into clean, testable architecture"
        ],
        "practiceActivities": [
          "Debug and resolve 5 intentionally broken code repositories",
          "Conduct benchmark performance profiling"
        ],
        "practicalTask": "Complete a 3-hour simulated take-home engineering assessment.",
        "prerequisites": "Stage 4 & 5",
        "estimatedTime": "2-3 Weeks",
        "resources": [
          {
            "title": "Roadmap.sh Developer Roadmaps",
            "url": "https://roadmap.sh/",
            "provider": "Roadmap.sh",
            "isFree": true
          },
          {
            "title": "GeeksforGeeks Engineering Hub",
            "url": "https://www.geeksforgeeks.org/",
            "provider": "GeeksforGeeks",
            "isFree": true
          }
        ],
        "platformLink": {
          "label": "Run Aptitude & Practice Tests",
          "path": "/aptitude"
        }
      },
      {
        "stageNumber": 7,
        "id": "mobi-stage-7",
        "title": "Beginner Capstone Project",
        "summary": "Synthesize your learning into a functional, standalone, production-ready beginner project.",
        "topics": [
          "Project Scaffolding & Architecture",
          "Implementing Core Business Logic",
          "Data Persistence & State Management",
          "Automated Test Coverage",
          "Public Deployment & Documentation"
        ],
        "objectives": [
          "Deliver a working, deployed application from scratch",
          "Document setup instructions and architectural decisions in README"
        ],
        "practiceActivities": [
          "Set up automated GitHub Actions deployment",
          "Write comprehensive unit tests for all business logic"
        ],
        "practicalTask": "Build and deploy a complete functional starter project for Mobile App Developer with live documentation and public repository.",
        "prerequisites": "Stage 3 & 5",
        "estimatedTime": "2-3 Weeks",
        "resources": [
          {
            "title": "Roadmap.sh Developer Roadmaps",
            "url": "https://roadmap.sh/",
            "provider": "Roadmap.sh",
            "isFree": true
          },
          {
            "title": "GeeksforGeeks Engineering Hub",
            "url": "https://www.geeksforgeeks.org/",
            "provider": "GeeksforGeeks",
            "isFree": true
          }
        ],
        "platformLink": null
      },
      {
        "stageNumber": 8,
        "id": "mobi-stage-8",
        "title": "Intermediate / Portfolio Flagship Project",
        "summary": "Engineer a high-impact, feature-rich portfolio flagship project that stands out to hiring managers.",
        "topics": [
          "Complex Architecture & Multi-Service Integration",
          "Scalability, Caching, and Fault Tolerance",
          "Security Hardening & Role Authorization",
          "Comprehensive Test Coverage (Unit + E2E)",
          "Professional Documentation & Video Walkthrough"
        ],
        "objectives": [
          "Demonstrate professional-level software engineering capability",
          "Present clean system design and quantitative performance results"
        ],
        "practiceActivities": [
          "Conduct stress testing and load testing with benchmark tools",
          "Record a 3-minute technical walkthrough video of your project"
        ],
        "practicalTask": "Publish a flagship Mobile App Developer portfolio project with production deployment, live database, and architecture documentation.",
        "prerequisites": "Stage 7",
        "estimatedTime": "3-4 Weeks",
        "resources": [
          {
            "title": "Roadmap.sh Developer Roadmaps",
            "url": "https://roadmap.sh/",
            "provider": "Roadmap.sh",
            "isFree": true
          },
          {
            "title": "GeeksforGeeks Engineering Hub",
            "url": "https://www.geeksforgeeks.org/",
            "provider": "GeeksforGeeks",
            "isFree": true
          }
        ],
        "platformLink": null
      },
      {
        "stageNumber": 9,
        "id": "mobi-stage-9",
        "title": "Resume, GitHub Portfolio & Professional Presence",
        "summary": "Craft an ATS-optimized technical resume, polish your GitHub repositories, and optimize LinkedIn presence.",
        "topics": [
          "Impact-Driven Resume Bullet Points (Action + Context + Quantified Result)",
          "GitHub Profile Readme & Pinned Projects Showcase",
          "Technical Blog Writing & Project Case Studies",
          "LinkedIn Profile Optimization for Technical Recruiters",
          "Elevator Pitch & Portfolio Website"
        ],
        "objectives": [
          "Pass technical screening ATS filters with a 90+ score",
          "Present repositories with clean documentation and demo URLs"
        ],
        "practiceActivities": [
          "Score your resume on PlaceMentor AI’s Resume Builder",
          "Draft technical case studies explaining your design tradeoffs"
        ],
        "practicalTask": "Finalize your tailored Mobile App Developer resume and publish an open-source GitHub portfolio.",
        "prerequisites": "Stage 7 & 8",
        "estimatedTime": "1-2 Weeks",
        "resources": [
          {
            "title": "Roadmap.sh Developer Roadmaps",
            "url": "https://roadmap.sh/",
            "provider": "Roadmap.sh",
            "isFree": true
          },
          {
            "title": "GeeksforGeeks Engineering Hub",
            "url": "https://www.geeksforgeeks.org/",
            "provider": "GeeksforGeeks",
            "isFree": true
          }
        ],
        "platformLink": {
          "label": "Build ATS Resume",
          "path": "/resume"
        }
      },
      {
        "stageNumber": 10,
        "id": "mobi-stage-10",
        "title": "Interview Preparation, System Design & Applications",
        "summary": "Ace live technical screening rounds, domain-specific problem solving, system design, and behavioral interviews.",
        "topics": [
          "Top Technical Interview Questions for Mobile App Developer",
          "System Design & Architectural Tradeoffs",
          "Live Whiteboard / Screen-Share Coding Best Practices",
          "Behavioral Leadership Rounds (STAR Method)",
          "Strategic Job Applications across Campus & Off-Campus Drives"
        ],
        "objectives": [
          "Pass 45-60 minute technical interviews with confidence",
          "Effectively communicate technical tradeoffs to Engineering Managers"
        ],
        "practiceActivities": [
          "Conduct at least 3 AI Mock Technical Interviews on PlaceMentor AI",
          "Apply to 20+ verified opportunities on the Jobs Portal"
        ],
        "practicalTask": "Complete a full mock technical interview panel for Mobile App Developer and apply to verified companies hiring in India.",
        "prerequisites": "Stages 1 through 9",
        "estimatedTime": "3-4 Weeks",
        "resources": [
          {
            "title": "Roadmap.sh Developer Roadmaps",
            "url": "https://roadmap.sh/",
            "provider": "Roadmap.sh",
            "isFree": true
          },
          {
            "title": "GeeksforGeeks Engineering Hub",
            "url": "https://www.geeksforgeeks.org/",
            "provider": "GeeksforGeeks",
            "isFree": true
          }
        ],
        "platformLink": {
          "label": "Take AI Mock Interview for Mobile App Developer",
          "path": "/interview"
        }
      }
    ]
  },
  {
    "id": "data-analyst",
    "title": "Data Analyst",
    "category": "AI & Data",
    "difficulty": "Beginner Friendly",
    "duration": "4-5 Months",
    "icon": "BarChart3",
    "color": "teal",
    "prerequisites": "Basic Math, Analytical Thinking, Excel familiarity",
    "technologies": [
      "Advanced SQL",
      "Microsoft Excel",
      "Power BI / Tableau",
      "Python (Pandas, NumPy, Matplotlib)",
      "Statistical Analysis",
      "Business Metrics"
    ],
    "shortDescription": "Transform raw organizational data into actionable business insights, visual dashboards, and strategic KPIs.",
    "overview": "Data Analysts turn unstructured datasets into revenue-driving business intelligence. Master advanced SQL queries, window functions, statistical hypothesis testing, data visualization, and Power BI dashboards.",
    "stages": [
      {
        "stageNumber": 1,
        "id": "data-stage-1",
        "title": "Prerequisites & CS Fundamentals for Data Analyst",
        "summary": "Core theoretical and structural computer science prerequisites required to excel in Data Analyst.",
        "topics": [
          "Operating Systems & Memory Hierarchy",
          "Networking Fundamentals & Protocol Layers",
          "Boolean Logic & Discrete Mathematics",
          "Version Control with Git & GitHub",
          "Command Line Interface (CLI) Mastery"
        ],
        "objectives": [
          "Establish clear understanding of computational concepts essential for Data Analyst",
          "Configure professional development terminal environments",
          "Understand system architecture basics"
        ],
        "practiceActivities": [
          "Complete 10 Linux terminal navigation exercises",
          "Diagram a client-server transaction flow"
        ],
        "practicalTask": "Initialize a development workspace with Git, secure environment configuration, and project scaffolding for Data Analyst.",
        "prerequisites": "None",
        "estimatedTime": "2 Weeks",
        "resources": [
          {
            "title": "Google DeepMind: Machine Learning & AI",
            "url": "https://deepmind.google/discover/blog/",
            "provider": "Google DeepMind",
            "isFree": true
          },
          {
            "title": "Hugging Face Official Documentation",
            "url": "https://huggingface.co/docs",
            "provider": "Hugging Face",
            "isFree": true
          },
          {
            "title": "Scikit-Learn User Guide",
            "url": "https://scikit-learn.org/stable/user_guide.html",
            "provider": "Scikit-Learn",
            "isFree": true
          }
        ],
        "platformLink": null
      },
      {
        "stageNumber": 2,
        "id": "data-stage-2",
        "title": "Core Languages & Foundations (Advanced SQL, Microsoft Excel, Power BI / Tableau, Python (Pandas, NumPy, Matplotlib))",
        "summary": "Develop deep syntactic and operational mastery of primary programming tools used in Data Analyst.",
        "topics": [
          "Syntax, Control Flow, and Data Types",
          "Object-Oriented Programming (OOP) vs Functional Paradigms",
          "Error Handling, Exceptions, and Defensive Coding",
          "Memory Management and Garbage Collection",
          "Modular Code Structure & Package Management"
        ],
        "objectives": [
          "Write production-standard code in core languages utilized by Data Analyst",
          "Handle exceptions and edge cases with clean architecture"
        ],
        "practiceActivities": [
          "Write 15 standalone algorithmic functions with unit tests",
          "Implement custom class hierarchies demonstrating inheritance & polymorphism"
        ],
        "practicalTask": "Develop a robust CLI automation utility or foundational service utilizing Advanced SQL, Microsoft Excel, Power BI / Tableau, Python (Pandas, NumPy, Matplotlib).",
        "prerequisites": "Stage 1",
        "estimatedTime": "3 Weeks",
        "resources": [
          {
            "title": "Google DeepMind: Machine Learning & AI",
            "url": "https://deepmind.google/discover/blog/",
            "provider": "Google DeepMind",
            "isFree": true
          },
          {
            "title": "Hugging Face Official Documentation",
            "url": "https://huggingface.co/docs",
            "provider": "Hugging Face",
            "isFree": true
          },
          {
            "title": "Scikit-Learn User Guide",
            "url": "https://scikit-learn.org/stable/user_guide.html",
            "provider": "Scikit-Learn",
            "isFree": true
          }
        ],
        "platformLink": {
          "label": "Practice Advanced SQL Coding",
          "path": "/coding"
        }
      },
      {
        "stageNumber": 3,
        "id": "data-stage-3",
        "title": "Role-Specific Technical Skills & Core Frameworks",
        "summary": "Master specialized domain frameworks, libraries, protocols, and standard patterns for Data Analyst.",
        "topics": [
          "Primary Data Analyst Frameworks & Libraries",
          "Data Validation & Pipeline Architecture",
          "API Integration & Protocol Handlers",
          "Configuration Management & Environment Parity",
          "Security Best Practices & Threat Mitigation"
        ],
        "objectives": [
          "Build end-to-end features adhering to modern Data Analyst industry standards",
          "Apply design patterns tailored to the role"
        ],
        "practiceActivities": [
          "Build a working proof-of-concept module utilizing standard industry frameworks",
          "Audit a code repository for performance bottlenecks"
        ],
        "practicalTask": "Construct a fully functional core service module demonstrating Data Analyst competencies.",
        "prerequisites": "Stage 2",
        "estimatedTime": "3-4 Weeks",
        "resources": [
          {
            "title": "Google DeepMind: Machine Learning & AI",
            "url": "https://deepmind.google/discover/blog/",
            "provider": "Google DeepMind",
            "isFree": true
          },
          {
            "title": "Hugging Face Official Documentation",
            "url": "https://huggingface.co/docs",
            "provider": "Hugging Face",
            "isFree": true
          },
          {
            "title": "Scikit-Learn User Guide",
            "url": "https://scikit-learn.org/stable/user_guide.html",
            "provider": "Scikit-Learn",
            "isFree": true
          }
        ],
        "platformLink": null
      },
      {
        "stageNumber": 4,
        "id": "data-stage-4",
        "title": "Data Structures, Algorithms & Problem Solving",
        "summary": "Targeted algorithmic problem solving, computational complexity, and data structures relevant to Data Analyst.",
        "topics": [
          "Arrays, Hash Maps, Linked Lists, and Stacks/Queues",
          "Trees, Graphs, and Breadth-First / Depth-First Traversal",
          "Searching, Sorting, and Binary Search",
          "Greedy Algorithms and Dynamic Programming Patterns",
          "Time & Space Complexity Tradeoff Analysis"
        ],
        "objectives": [
          "Confidently solve technical coding screening assessments",
          "Evaluate algorithm performance using Big-O notation"
        ],
        "practiceActivities": [
          "Solve 40 LeetCode Easy & Medium problems in your primary language",
          "Analyze space and time complexity for critical routines"
        ],
        "practicalTask": "Implement an optimized search, sort, and cache routine for domain-specific data structures.",
        "prerequisites": "Stage 2 & 3",
        "estimatedTime": "3 Weeks",
        "resources": [
          {
            "title": "Google DeepMind: Machine Learning & AI",
            "url": "https://deepmind.google/discover/blog/",
            "provider": "Google DeepMind",
            "isFree": true
          },
          {
            "title": "Hugging Face Official Documentation",
            "url": "https://huggingface.co/docs",
            "provider": "Hugging Face",
            "isFree": true
          },
          {
            "title": "Scikit-Learn User Guide",
            "url": "https://scikit-learn.org/stable/user_guide.html",
            "provider": "Scikit-Learn",
            "isFree": true
          }
        ],
        "platformLink": {
          "label": "Solve Coding Problems",
          "path": "/coding"
        }
      },
      {
        "stageNumber": 5,
        "id": "data-stage-5",
        "title": "Tools, Platforms & Development Workflow",
        "summary": "Professional tooling, containerization, automated testing, and CI/CD pipelines for Data Analyst.",
        "topics": [
          "Docker Containerization & Multi-Stage Builds",
          "Automated Testing (Unit, Integration, End-to-End)",
          "CI/CD Pipeline Automation (GitHub Actions)",
          "Cloud Infrastructure & Deployment Services",
          "Observability, Logging, and Monitoring"
        ],
        "objectives": [
          "Automate build, test, and release cycles",
          "Containerize applications for reproducible environments"
        ],
        "practiceActivities": [
          "Write a Dockerfile and docker-compose.yml configuration",
          "Create a GitHub Actions workflow to run automated tests on every push"
        ],
        "practicalTask": "Configure a continuous deployment pipeline with automated testing for a Data Analyst project.",
        "prerequisites": "Stage 3",
        "estimatedTime": "2 Weeks",
        "resources": [
          {
            "title": "Google DeepMind: Machine Learning & AI",
            "url": "https://deepmind.google/discover/blog/",
            "provider": "Google DeepMind",
            "isFree": true
          },
          {
            "title": "Hugging Face Official Documentation",
            "url": "https://huggingface.co/docs",
            "provider": "Hugging Face",
            "isFree": true
          },
          {
            "title": "Scikit-Learn User Guide",
            "url": "https://scikit-learn.org/stable/user_guide.html",
            "provider": "Scikit-Learn",
            "isFree": true
          }
        ],
        "platformLink": null
      },
      {
        "stageNumber": 6,
        "id": "data-stage-6",
        "title": "Guided Practice & Applied Exercises",
        "summary": "Solve realistic industry exercises, build architectural prototypes, and practice technical challenges.",
        "topics": [
          "Real-world Architectural Case Studies",
          "Debugging Complex Multi-Component Failures",
          "Performance Profiling & Bottleneck Resolution",
          "Data Consistency & Fault Tolerance",
          "Clean Code & Refactoring Patterns"
        ],
        "objectives": [
          "Handle unexpected system degradation and identify root causes",
          "Refactor legacy codebase into clean, testable architecture"
        ],
        "practiceActivities": [
          "Debug and resolve 5 intentionally broken code repositories",
          "Conduct benchmark performance profiling"
        ],
        "practicalTask": "Complete a 3-hour simulated take-home engineering assessment.",
        "prerequisites": "Stage 4 & 5",
        "estimatedTime": "2-3 Weeks",
        "resources": [
          {
            "title": "Google DeepMind: Machine Learning & AI",
            "url": "https://deepmind.google/discover/blog/",
            "provider": "Google DeepMind",
            "isFree": true
          },
          {
            "title": "Hugging Face Official Documentation",
            "url": "https://huggingface.co/docs",
            "provider": "Hugging Face",
            "isFree": true
          },
          {
            "title": "Scikit-Learn User Guide",
            "url": "https://scikit-learn.org/stable/user_guide.html",
            "provider": "Scikit-Learn",
            "isFree": true
          }
        ],
        "platformLink": {
          "label": "Run Aptitude & Practice Tests",
          "path": "/aptitude"
        }
      },
      {
        "stageNumber": 7,
        "id": "data-stage-7",
        "title": "Beginner Capstone Project",
        "summary": "Synthesize your learning into a functional, standalone, production-ready beginner project.",
        "topics": [
          "Project Scaffolding & Architecture",
          "Implementing Core Business Logic",
          "Data Persistence & State Management",
          "Automated Test Coverage",
          "Public Deployment & Documentation"
        ],
        "objectives": [
          "Deliver a working, deployed application from scratch",
          "Document setup instructions and architectural decisions in README"
        ],
        "practiceActivities": [
          "Set up automated GitHub Actions deployment",
          "Write comprehensive unit tests for all business logic"
        ],
        "practicalTask": "Build and deploy a complete functional starter project for Data Analyst with live documentation and public repository.",
        "prerequisites": "Stage 3 & 5",
        "estimatedTime": "2-3 Weeks",
        "resources": [
          {
            "title": "Google DeepMind: Machine Learning & AI",
            "url": "https://deepmind.google/discover/blog/",
            "provider": "Google DeepMind",
            "isFree": true
          },
          {
            "title": "Hugging Face Official Documentation",
            "url": "https://huggingface.co/docs",
            "provider": "Hugging Face",
            "isFree": true
          },
          {
            "title": "Scikit-Learn User Guide",
            "url": "https://scikit-learn.org/stable/user_guide.html",
            "provider": "Scikit-Learn",
            "isFree": true
          }
        ],
        "platformLink": null
      },
      {
        "stageNumber": 8,
        "id": "data-stage-8",
        "title": "Intermediate / Portfolio Flagship Project",
        "summary": "Engineer a high-impact, feature-rich portfolio flagship project that stands out to hiring managers.",
        "topics": [
          "Complex Architecture & Multi-Service Integration",
          "Scalability, Caching, and Fault Tolerance",
          "Security Hardening & Role Authorization",
          "Comprehensive Test Coverage (Unit + E2E)",
          "Professional Documentation & Video Walkthrough"
        ],
        "objectives": [
          "Demonstrate professional-level software engineering capability",
          "Present clean system design and quantitative performance results"
        ],
        "practiceActivities": [
          "Conduct stress testing and load testing with benchmark tools",
          "Record a 3-minute technical walkthrough video of your project"
        ],
        "practicalTask": "Publish a flagship Data Analyst portfolio project with production deployment, live database, and architecture documentation.",
        "prerequisites": "Stage 7",
        "estimatedTime": "3-4 Weeks",
        "resources": [
          {
            "title": "Google DeepMind: Machine Learning & AI",
            "url": "https://deepmind.google/discover/blog/",
            "provider": "Google DeepMind",
            "isFree": true
          },
          {
            "title": "Hugging Face Official Documentation",
            "url": "https://huggingface.co/docs",
            "provider": "Hugging Face",
            "isFree": true
          },
          {
            "title": "Scikit-Learn User Guide",
            "url": "https://scikit-learn.org/stable/user_guide.html",
            "provider": "Scikit-Learn",
            "isFree": true
          }
        ],
        "platformLink": null
      },
      {
        "stageNumber": 9,
        "id": "data-stage-9",
        "title": "Resume, GitHub Portfolio & Professional Presence",
        "summary": "Craft an ATS-optimized technical resume, polish your GitHub repositories, and optimize LinkedIn presence.",
        "topics": [
          "Impact-Driven Resume Bullet Points (Action + Context + Quantified Result)",
          "GitHub Profile Readme & Pinned Projects Showcase",
          "Technical Blog Writing & Project Case Studies",
          "LinkedIn Profile Optimization for Technical Recruiters",
          "Elevator Pitch & Portfolio Website"
        ],
        "objectives": [
          "Pass technical screening ATS filters with a 90+ score",
          "Present repositories with clean documentation and demo URLs"
        ],
        "practiceActivities": [
          "Score your resume on PlaceMentor AI’s Resume Builder",
          "Draft technical case studies explaining your design tradeoffs"
        ],
        "practicalTask": "Finalize your tailored Data Analyst resume and publish an open-source GitHub portfolio.",
        "prerequisites": "Stage 7 & 8",
        "estimatedTime": "1-2 Weeks",
        "resources": [
          {
            "title": "Google DeepMind: Machine Learning & AI",
            "url": "https://deepmind.google/discover/blog/",
            "provider": "Google DeepMind",
            "isFree": true
          },
          {
            "title": "Hugging Face Official Documentation",
            "url": "https://huggingface.co/docs",
            "provider": "Hugging Face",
            "isFree": true
          },
          {
            "title": "Scikit-Learn User Guide",
            "url": "https://scikit-learn.org/stable/user_guide.html",
            "provider": "Scikit-Learn",
            "isFree": true
          }
        ],
        "platformLink": {
          "label": "Build ATS Resume",
          "path": "/resume"
        }
      },
      {
        "stageNumber": 10,
        "id": "data-stage-10",
        "title": "Interview Preparation, System Design & Applications",
        "summary": "Ace live technical screening rounds, domain-specific problem solving, system design, and behavioral interviews.",
        "topics": [
          "Top Technical Interview Questions for Data Analyst",
          "System Design & Architectural Tradeoffs",
          "Live Whiteboard / Screen-Share Coding Best Practices",
          "Behavioral Leadership Rounds (STAR Method)",
          "Strategic Job Applications across Campus & Off-Campus Drives"
        ],
        "objectives": [
          "Pass 45-60 minute technical interviews with confidence",
          "Effectively communicate technical tradeoffs to Engineering Managers"
        ],
        "practiceActivities": [
          "Conduct at least 3 AI Mock Technical Interviews on PlaceMentor AI",
          "Apply to 20+ verified opportunities on the Jobs Portal"
        ],
        "practicalTask": "Complete a full mock technical interview panel for Data Analyst and apply to verified companies hiring in India.",
        "prerequisites": "Stages 1 through 9",
        "estimatedTime": "3-4 Weeks",
        "resources": [
          {
            "title": "Google DeepMind: Machine Learning & AI",
            "url": "https://deepmind.google/discover/blog/",
            "provider": "Google DeepMind",
            "isFree": true
          },
          {
            "title": "Hugging Face Official Documentation",
            "url": "https://huggingface.co/docs",
            "provider": "Hugging Face",
            "isFree": true
          },
          {
            "title": "Scikit-Learn User Guide",
            "url": "https://scikit-learn.org/stable/user_guide.html",
            "provider": "Scikit-Learn",
            "isFree": true
          }
        ],
        "platformLink": {
          "label": "Take AI Mock Interview for Data Analyst",
          "path": "/interview"
        }
      }
    ]
  },
  {
    "id": "data-scientist",
    "title": "Data Scientist",
    "category": "AI & Data",
    "difficulty": "Advanced",
    "duration": "7-9 Months",
    "icon": "Brain",
    "color": "purple",
    "prerequisites": "Linear Algebra, Calculus, Python fundamentals",
    "technologies": [
      "Python",
      "NumPy & Pandas",
      "Scikit-Learn",
      "Hypothesis Testing",
      "Regression & Classification",
      "Time Series",
      "PCA",
      "Seaborn"
    ],
    "shortDescription": "Apply mathematical modeling, statistical analysis, and machine learning algorithms to solve complex predictive problems.",
    "overview": "Data Scientists combine mathematical theory, statistical inference, and machine learning to predict trends, understand customer behavior, and optimize enterprise decisions.",
    "stages": [
      {
        "stageNumber": 1,
        "id": "data-stage-1",
        "title": "Prerequisites & CS Fundamentals for Data Scientist",
        "summary": "Core theoretical and structural computer science prerequisites required to excel in Data Scientist.",
        "topics": [
          "Operating Systems & Memory Hierarchy",
          "Networking Fundamentals & Protocol Layers",
          "Boolean Logic & Discrete Mathematics",
          "Version Control with Git & GitHub",
          "Command Line Interface (CLI) Mastery"
        ],
        "objectives": [
          "Establish clear understanding of computational concepts essential for Data Scientist",
          "Configure professional development terminal environments",
          "Understand system architecture basics"
        ],
        "practiceActivities": [
          "Complete 10 Linux terminal navigation exercises",
          "Diagram a client-server transaction flow"
        ],
        "practicalTask": "Initialize a development workspace with Git, secure environment configuration, and project scaffolding for Data Scientist.",
        "prerequisites": "None",
        "estimatedTime": "2 Weeks",
        "resources": [
          {
            "title": "Google DeepMind: Machine Learning & AI",
            "url": "https://deepmind.google/discover/blog/",
            "provider": "Google DeepMind",
            "isFree": true
          },
          {
            "title": "Hugging Face Official Documentation",
            "url": "https://huggingface.co/docs",
            "provider": "Hugging Face",
            "isFree": true
          },
          {
            "title": "Scikit-Learn User Guide",
            "url": "https://scikit-learn.org/stable/user_guide.html",
            "provider": "Scikit-Learn",
            "isFree": true
          }
        ],
        "platformLink": null
      },
      {
        "stageNumber": 2,
        "id": "data-stage-2",
        "title": "Core Languages & Foundations (Python, NumPy & Pandas, Scikit-Learn, Hypothesis Testing)",
        "summary": "Develop deep syntactic and operational mastery of primary programming tools used in Data Scientist.",
        "topics": [
          "Syntax, Control Flow, and Data Types",
          "Object-Oriented Programming (OOP) vs Functional Paradigms",
          "Error Handling, Exceptions, and Defensive Coding",
          "Memory Management and Garbage Collection",
          "Modular Code Structure & Package Management"
        ],
        "objectives": [
          "Write production-standard code in core languages utilized by Data Scientist",
          "Handle exceptions and edge cases with clean architecture"
        ],
        "practiceActivities": [
          "Write 15 standalone algorithmic functions with unit tests",
          "Implement custom class hierarchies demonstrating inheritance & polymorphism"
        ],
        "practicalTask": "Develop a robust CLI automation utility or foundational service utilizing Python, NumPy & Pandas, Scikit-Learn, Hypothesis Testing.",
        "prerequisites": "Stage 1",
        "estimatedTime": "3 Weeks",
        "resources": [
          {
            "title": "Google DeepMind: Machine Learning & AI",
            "url": "https://deepmind.google/discover/blog/",
            "provider": "Google DeepMind",
            "isFree": true
          },
          {
            "title": "Hugging Face Official Documentation",
            "url": "https://huggingface.co/docs",
            "provider": "Hugging Face",
            "isFree": true
          },
          {
            "title": "Scikit-Learn User Guide",
            "url": "https://scikit-learn.org/stable/user_guide.html",
            "provider": "Scikit-Learn",
            "isFree": true
          }
        ],
        "platformLink": {
          "label": "Practice Python Coding",
          "path": "/coding"
        }
      },
      {
        "stageNumber": 3,
        "id": "data-stage-3",
        "title": "Role-Specific Technical Skills & Core Frameworks",
        "summary": "Master specialized domain frameworks, libraries, protocols, and standard patterns for Data Scientist.",
        "topics": [
          "Primary Data Scientist Frameworks & Libraries",
          "Data Validation & Pipeline Architecture",
          "API Integration & Protocol Handlers",
          "Configuration Management & Environment Parity",
          "Security Best Practices & Threat Mitigation"
        ],
        "objectives": [
          "Build end-to-end features adhering to modern Data Scientist industry standards",
          "Apply design patterns tailored to the role"
        ],
        "practiceActivities": [
          "Build a working proof-of-concept module utilizing standard industry frameworks",
          "Audit a code repository for performance bottlenecks"
        ],
        "practicalTask": "Construct a fully functional core service module demonstrating Data Scientist competencies.",
        "prerequisites": "Stage 2",
        "estimatedTime": "3-4 Weeks",
        "resources": [
          {
            "title": "Google DeepMind: Machine Learning & AI",
            "url": "https://deepmind.google/discover/blog/",
            "provider": "Google DeepMind",
            "isFree": true
          },
          {
            "title": "Hugging Face Official Documentation",
            "url": "https://huggingface.co/docs",
            "provider": "Hugging Face",
            "isFree": true
          },
          {
            "title": "Scikit-Learn User Guide",
            "url": "https://scikit-learn.org/stable/user_guide.html",
            "provider": "Scikit-Learn",
            "isFree": true
          }
        ],
        "platformLink": null
      },
      {
        "stageNumber": 4,
        "id": "data-stage-4",
        "title": "Data Structures, Algorithms & Problem Solving",
        "summary": "Targeted algorithmic problem solving, computational complexity, and data structures relevant to Data Scientist.",
        "topics": [
          "Arrays, Hash Maps, Linked Lists, and Stacks/Queues",
          "Trees, Graphs, and Breadth-First / Depth-First Traversal",
          "Searching, Sorting, and Binary Search",
          "Greedy Algorithms and Dynamic Programming Patterns",
          "Time & Space Complexity Tradeoff Analysis"
        ],
        "objectives": [
          "Confidently solve technical coding screening assessments",
          "Evaluate algorithm performance using Big-O notation"
        ],
        "practiceActivities": [
          "Solve 40 LeetCode Easy & Medium problems in your primary language",
          "Analyze space and time complexity for critical routines"
        ],
        "practicalTask": "Implement an optimized search, sort, and cache routine for domain-specific data structures.",
        "prerequisites": "Stage 2 & 3",
        "estimatedTime": "3 Weeks",
        "resources": [
          {
            "title": "Google DeepMind: Machine Learning & AI",
            "url": "https://deepmind.google/discover/blog/",
            "provider": "Google DeepMind",
            "isFree": true
          },
          {
            "title": "Hugging Face Official Documentation",
            "url": "https://huggingface.co/docs",
            "provider": "Hugging Face",
            "isFree": true
          },
          {
            "title": "Scikit-Learn User Guide",
            "url": "https://scikit-learn.org/stable/user_guide.html",
            "provider": "Scikit-Learn",
            "isFree": true
          }
        ],
        "platformLink": {
          "label": "Solve Coding Problems",
          "path": "/coding"
        }
      },
      {
        "stageNumber": 5,
        "id": "data-stage-5",
        "title": "Tools, Platforms & Development Workflow",
        "summary": "Professional tooling, containerization, automated testing, and CI/CD pipelines for Data Scientist.",
        "topics": [
          "Docker Containerization & Multi-Stage Builds",
          "Automated Testing (Unit, Integration, End-to-End)",
          "CI/CD Pipeline Automation (GitHub Actions)",
          "Cloud Infrastructure & Deployment Services",
          "Observability, Logging, and Monitoring"
        ],
        "objectives": [
          "Automate build, test, and release cycles",
          "Containerize applications for reproducible environments"
        ],
        "practiceActivities": [
          "Write a Dockerfile and docker-compose.yml configuration",
          "Create a GitHub Actions workflow to run automated tests on every push"
        ],
        "practicalTask": "Configure a continuous deployment pipeline with automated testing for a Data Scientist project.",
        "prerequisites": "Stage 3",
        "estimatedTime": "2 Weeks",
        "resources": [
          {
            "title": "Google DeepMind: Machine Learning & AI",
            "url": "https://deepmind.google/discover/blog/",
            "provider": "Google DeepMind",
            "isFree": true
          },
          {
            "title": "Hugging Face Official Documentation",
            "url": "https://huggingface.co/docs",
            "provider": "Hugging Face",
            "isFree": true
          },
          {
            "title": "Scikit-Learn User Guide",
            "url": "https://scikit-learn.org/stable/user_guide.html",
            "provider": "Scikit-Learn",
            "isFree": true
          }
        ],
        "platformLink": null
      },
      {
        "stageNumber": 6,
        "id": "data-stage-6",
        "title": "Guided Practice & Applied Exercises",
        "summary": "Solve realistic industry exercises, build architectural prototypes, and practice technical challenges.",
        "topics": [
          "Real-world Architectural Case Studies",
          "Debugging Complex Multi-Component Failures",
          "Performance Profiling & Bottleneck Resolution",
          "Data Consistency & Fault Tolerance",
          "Clean Code & Refactoring Patterns"
        ],
        "objectives": [
          "Handle unexpected system degradation and identify root causes",
          "Refactor legacy codebase into clean, testable architecture"
        ],
        "practiceActivities": [
          "Debug and resolve 5 intentionally broken code repositories",
          "Conduct benchmark performance profiling"
        ],
        "practicalTask": "Complete a 3-hour simulated take-home engineering assessment.",
        "prerequisites": "Stage 4 & 5",
        "estimatedTime": "2-3 Weeks",
        "resources": [
          {
            "title": "Google DeepMind: Machine Learning & AI",
            "url": "https://deepmind.google/discover/blog/",
            "provider": "Google DeepMind",
            "isFree": true
          },
          {
            "title": "Hugging Face Official Documentation",
            "url": "https://huggingface.co/docs",
            "provider": "Hugging Face",
            "isFree": true
          },
          {
            "title": "Scikit-Learn User Guide",
            "url": "https://scikit-learn.org/stable/user_guide.html",
            "provider": "Scikit-Learn",
            "isFree": true
          }
        ],
        "platformLink": {
          "label": "Run Aptitude & Practice Tests",
          "path": "/aptitude"
        }
      },
      {
        "stageNumber": 7,
        "id": "data-stage-7",
        "title": "Beginner Capstone Project",
        "summary": "Synthesize your learning into a functional, standalone, production-ready beginner project.",
        "topics": [
          "Project Scaffolding & Architecture",
          "Implementing Core Business Logic",
          "Data Persistence & State Management",
          "Automated Test Coverage",
          "Public Deployment & Documentation"
        ],
        "objectives": [
          "Deliver a working, deployed application from scratch",
          "Document setup instructions and architectural decisions in README"
        ],
        "practiceActivities": [
          "Set up automated GitHub Actions deployment",
          "Write comprehensive unit tests for all business logic"
        ],
        "practicalTask": "Build and deploy a complete functional starter project for Data Scientist with live documentation and public repository.",
        "prerequisites": "Stage 3 & 5",
        "estimatedTime": "2-3 Weeks",
        "resources": [
          {
            "title": "Google DeepMind: Machine Learning & AI",
            "url": "https://deepmind.google/discover/blog/",
            "provider": "Google DeepMind",
            "isFree": true
          },
          {
            "title": "Hugging Face Official Documentation",
            "url": "https://huggingface.co/docs",
            "provider": "Hugging Face",
            "isFree": true
          },
          {
            "title": "Scikit-Learn User Guide",
            "url": "https://scikit-learn.org/stable/user_guide.html",
            "provider": "Scikit-Learn",
            "isFree": true
          }
        ],
        "platformLink": null
      },
      {
        "stageNumber": 8,
        "id": "data-stage-8",
        "title": "Intermediate / Portfolio Flagship Project",
        "summary": "Engineer a high-impact, feature-rich portfolio flagship project that stands out to hiring managers.",
        "topics": [
          "Complex Architecture & Multi-Service Integration",
          "Scalability, Caching, and Fault Tolerance",
          "Security Hardening & Role Authorization",
          "Comprehensive Test Coverage (Unit + E2E)",
          "Professional Documentation & Video Walkthrough"
        ],
        "objectives": [
          "Demonstrate professional-level software engineering capability",
          "Present clean system design and quantitative performance results"
        ],
        "practiceActivities": [
          "Conduct stress testing and load testing with benchmark tools",
          "Record a 3-minute technical walkthrough video of your project"
        ],
        "practicalTask": "Publish a flagship Data Scientist portfolio project with production deployment, live database, and architecture documentation.",
        "prerequisites": "Stage 7",
        "estimatedTime": "3-4 Weeks",
        "resources": [
          {
            "title": "Google DeepMind: Machine Learning & AI",
            "url": "https://deepmind.google/discover/blog/",
            "provider": "Google DeepMind",
            "isFree": true
          },
          {
            "title": "Hugging Face Official Documentation",
            "url": "https://huggingface.co/docs",
            "provider": "Hugging Face",
            "isFree": true
          },
          {
            "title": "Scikit-Learn User Guide",
            "url": "https://scikit-learn.org/stable/user_guide.html",
            "provider": "Scikit-Learn",
            "isFree": true
          }
        ],
        "platformLink": null
      },
      {
        "stageNumber": 9,
        "id": "data-stage-9",
        "title": "Resume, GitHub Portfolio & Professional Presence",
        "summary": "Craft an ATS-optimized technical resume, polish your GitHub repositories, and optimize LinkedIn presence.",
        "topics": [
          "Impact-Driven Resume Bullet Points (Action + Context + Quantified Result)",
          "GitHub Profile Readme & Pinned Projects Showcase",
          "Technical Blog Writing & Project Case Studies",
          "LinkedIn Profile Optimization for Technical Recruiters",
          "Elevator Pitch & Portfolio Website"
        ],
        "objectives": [
          "Pass technical screening ATS filters with a 90+ score",
          "Present repositories with clean documentation and demo URLs"
        ],
        "practiceActivities": [
          "Score your resume on PlaceMentor AI’s Resume Builder",
          "Draft technical case studies explaining your design tradeoffs"
        ],
        "practicalTask": "Finalize your tailored Data Scientist resume and publish an open-source GitHub portfolio.",
        "prerequisites": "Stage 7 & 8",
        "estimatedTime": "1-2 Weeks",
        "resources": [
          {
            "title": "Google DeepMind: Machine Learning & AI",
            "url": "https://deepmind.google/discover/blog/",
            "provider": "Google DeepMind",
            "isFree": true
          },
          {
            "title": "Hugging Face Official Documentation",
            "url": "https://huggingface.co/docs",
            "provider": "Hugging Face",
            "isFree": true
          },
          {
            "title": "Scikit-Learn User Guide",
            "url": "https://scikit-learn.org/stable/user_guide.html",
            "provider": "Scikit-Learn",
            "isFree": true
          }
        ],
        "platformLink": {
          "label": "Build ATS Resume",
          "path": "/resume"
        }
      },
      {
        "stageNumber": 10,
        "id": "data-stage-10",
        "title": "Interview Preparation, System Design & Applications",
        "summary": "Ace live technical screening rounds, domain-specific problem solving, system design, and behavioral interviews.",
        "topics": [
          "Top Technical Interview Questions for Data Scientist",
          "System Design & Architectural Tradeoffs",
          "Live Whiteboard / Screen-Share Coding Best Practices",
          "Behavioral Leadership Rounds (STAR Method)",
          "Strategic Job Applications across Campus & Off-Campus Drives"
        ],
        "objectives": [
          "Pass 45-60 minute technical interviews with confidence",
          "Effectively communicate technical tradeoffs to Engineering Managers"
        ],
        "practiceActivities": [
          "Conduct at least 3 AI Mock Technical Interviews on PlaceMentor AI",
          "Apply to 20+ verified opportunities on the Jobs Portal"
        ],
        "practicalTask": "Complete a full mock technical interview panel for Data Scientist and apply to verified companies hiring in India.",
        "prerequisites": "Stages 1 through 9",
        "estimatedTime": "3-4 Weeks",
        "resources": [
          {
            "title": "Google DeepMind: Machine Learning & AI",
            "url": "https://deepmind.google/discover/blog/",
            "provider": "Google DeepMind",
            "isFree": true
          },
          {
            "title": "Hugging Face Official Documentation",
            "url": "https://huggingface.co/docs",
            "provider": "Hugging Face",
            "isFree": true
          },
          {
            "title": "Scikit-Learn User Guide",
            "url": "https://scikit-learn.org/stable/user_guide.html",
            "provider": "Scikit-Learn",
            "isFree": true
          }
        ],
        "platformLink": {
          "label": "Take AI Mock Interview for Data Scientist",
          "path": "/interview"
        }
      }
    ]
  },
  {
    "id": "machine-learning-engineer",
    "title": "Machine Learning Engineer",
    "category": "AI & Data",
    "difficulty": "Advanced",
    "duration": "8-10 Months",
    "icon": "Cpu",
    "color": "accent",
    "prerequisites": "Data Science fundamentals, Object-Oriented Python",
    "technologies": [
      "PyTorch",
      "TensorFlow",
      "Deep Learning",
      "CNNs & Transformers",
      "MLflow",
      "FastAPI Model Serving",
      "Docker",
      "ONNX",
      "Hugging Face"
    ],
    "shortDescription": "Train, fine-tune, deploy, and monitor scalable deep learning models and production machine learning pipelines.",
    "overview": "ML Engineers bridge theoretical model research and scalable software engineering, moving models from Jupyter notebooks into production containerized inference services.",
    "stages": [
      {
        "stageNumber": 1,
        "id": "mach-stage-1",
        "title": "Prerequisites & CS Fundamentals for Machine Learning Engineer",
        "summary": "Core theoretical and structural computer science prerequisites required to excel in Machine Learning Engineer.",
        "topics": [
          "Operating Systems & Memory Hierarchy",
          "Networking Fundamentals & Protocol Layers",
          "Boolean Logic & Discrete Mathematics",
          "Version Control with Git & GitHub",
          "Command Line Interface (CLI) Mastery"
        ],
        "objectives": [
          "Establish clear understanding of computational concepts essential for Machine Learning Engineer",
          "Configure professional development terminal environments",
          "Understand system architecture basics"
        ],
        "practiceActivities": [
          "Complete 10 Linux terminal navigation exercises",
          "Diagram a client-server transaction flow"
        ],
        "practicalTask": "Initialize a development workspace with Git, secure environment configuration, and project scaffolding for Machine Learning Engineer.",
        "prerequisites": "None",
        "estimatedTime": "2 Weeks",
        "resources": [
          {
            "title": "Google DeepMind: Machine Learning & AI",
            "url": "https://deepmind.google/discover/blog/",
            "provider": "Google DeepMind",
            "isFree": true
          },
          {
            "title": "Hugging Face Official Documentation",
            "url": "https://huggingface.co/docs",
            "provider": "Hugging Face",
            "isFree": true
          },
          {
            "title": "Scikit-Learn User Guide",
            "url": "https://scikit-learn.org/stable/user_guide.html",
            "provider": "Scikit-Learn",
            "isFree": true
          }
        ],
        "platformLink": null
      },
      {
        "stageNumber": 2,
        "id": "mach-stage-2",
        "title": "Core Languages & Foundations (PyTorch, TensorFlow, Deep Learning, CNNs & Transformers)",
        "summary": "Develop deep syntactic and operational mastery of primary programming tools used in Machine Learning Engineer.",
        "topics": [
          "Syntax, Control Flow, and Data Types",
          "Object-Oriented Programming (OOP) vs Functional Paradigms",
          "Error Handling, Exceptions, and Defensive Coding",
          "Memory Management and Garbage Collection",
          "Modular Code Structure & Package Management"
        ],
        "objectives": [
          "Write production-standard code in core languages utilized by Machine Learning Engineer",
          "Handle exceptions and edge cases with clean architecture"
        ],
        "practiceActivities": [
          "Write 15 standalone algorithmic functions with unit tests",
          "Implement custom class hierarchies demonstrating inheritance & polymorphism"
        ],
        "practicalTask": "Develop a robust CLI automation utility or foundational service utilizing PyTorch, TensorFlow, Deep Learning, CNNs & Transformers.",
        "prerequisites": "Stage 1",
        "estimatedTime": "3 Weeks",
        "resources": [
          {
            "title": "Google DeepMind: Machine Learning & AI",
            "url": "https://deepmind.google/discover/blog/",
            "provider": "Google DeepMind",
            "isFree": true
          },
          {
            "title": "Hugging Face Official Documentation",
            "url": "https://huggingface.co/docs",
            "provider": "Hugging Face",
            "isFree": true
          },
          {
            "title": "Scikit-Learn User Guide",
            "url": "https://scikit-learn.org/stable/user_guide.html",
            "provider": "Scikit-Learn",
            "isFree": true
          }
        ],
        "platformLink": {
          "label": "Practice PyTorch Coding",
          "path": "/coding"
        }
      },
      {
        "stageNumber": 3,
        "id": "mach-stage-3",
        "title": "Role-Specific Technical Skills & Core Frameworks",
        "summary": "Master specialized domain frameworks, libraries, protocols, and standard patterns for Machine Learning Engineer.",
        "topics": [
          "Primary Machine Learning Engineer Frameworks & Libraries",
          "Data Validation & Pipeline Architecture",
          "API Integration & Protocol Handlers",
          "Configuration Management & Environment Parity",
          "Security Best Practices & Threat Mitigation"
        ],
        "objectives": [
          "Build end-to-end features adhering to modern Machine Learning Engineer industry standards",
          "Apply design patterns tailored to the role"
        ],
        "practiceActivities": [
          "Build a working proof-of-concept module utilizing standard industry frameworks",
          "Audit a code repository for performance bottlenecks"
        ],
        "practicalTask": "Construct a fully functional core service module demonstrating Machine Learning Engineer competencies.",
        "prerequisites": "Stage 2",
        "estimatedTime": "3-4 Weeks",
        "resources": [
          {
            "title": "Google DeepMind: Machine Learning & AI",
            "url": "https://deepmind.google/discover/blog/",
            "provider": "Google DeepMind",
            "isFree": true
          },
          {
            "title": "Hugging Face Official Documentation",
            "url": "https://huggingface.co/docs",
            "provider": "Hugging Face",
            "isFree": true
          },
          {
            "title": "Scikit-Learn User Guide",
            "url": "https://scikit-learn.org/stable/user_guide.html",
            "provider": "Scikit-Learn",
            "isFree": true
          }
        ],
        "platformLink": null
      },
      {
        "stageNumber": 4,
        "id": "mach-stage-4",
        "title": "Data Structures, Algorithms & Problem Solving",
        "summary": "Targeted algorithmic problem solving, computational complexity, and data structures relevant to Machine Learning Engineer.",
        "topics": [
          "Arrays, Hash Maps, Linked Lists, and Stacks/Queues",
          "Trees, Graphs, and Breadth-First / Depth-First Traversal",
          "Searching, Sorting, and Binary Search",
          "Greedy Algorithms and Dynamic Programming Patterns",
          "Time & Space Complexity Tradeoff Analysis"
        ],
        "objectives": [
          "Confidently solve technical coding screening assessments",
          "Evaluate algorithm performance using Big-O notation"
        ],
        "practiceActivities": [
          "Solve 40 LeetCode Easy & Medium problems in your primary language",
          "Analyze space and time complexity for critical routines"
        ],
        "practicalTask": "Implement an optimized search, sort, and cache routine for domain-specific data structures.",
        "prerequisites": "Stage 2 & 3",
        "estimatedTime": "3 Weeks",
        "resources": [
          {
            "title": "Google DeepMind: Machine Learning & AI",
            "url": "https://deepmind.google/discover/blog/",
            "provider": "Google DeepMind",
            "isFree": true
          },
          {
            "title": "Hugging Face Official Documentation",
            "url": "https://huggingface.co/docs",
            "provider": "Hugging Face",
            "isFree": true
          },
          {
            "title": "Scikit-Learn User Guide",
            "url": "https://scikit-learn.org/stable/user_guide.html",
            "provider": "Scikit-Learn",
            "isFree": true
          }
        ],
        "platformLink": {
          "label": "Solve Coding Problems",
          "path": "/coding"
        }
      },
      {
        "stageNumber": 5,
        "id": "mach-stage-5",
        "title": "Tools, Platforms & Development Workflow",
        "summary": "Professional tooling, containerization, automated testing, and CI/CD pipelines for Machine Learning Engineer.",
        "topics": [
          "Docker Containerization & Multi-Stage Builds",
          "Automated Testing (Unit, Integration, End-to-End)",
          "CI/CD Pipeline Automation (GitHub Actions)",
          "Cloud Infrastructure & Deployment Services",
          "Observability, Logging, and Monitoring"
        ],
        "objectives": [
          "Automate build, test, and release cycles",
          "Containerize applications for reproducible environments"
        ],
        "practiceActivities": [
          "Write a Dockerfile and docker-compose.yml configuration",
          "Create a GitHub Actions workflow to run automated tests on every push"
        ],
        "practicalTask": "Configure a continuous deployment pipeline with automated testing for a Machine Learning Engineer project.",
        "prerequisites": "Stage 3",
        "estimatedTime": "2 Weeks",
        "resources": [
          {
            "title": "Google DeepMind: Machine Learning & AI",
            "url": "https://deepmind.google/discover/blog/",
            "provider": "Google DeepMind",
            "isFree": true
          },
          {
            "title": "Hugging Face Official Documentation",
            "url": "https://huggingface.co/docs",
            "provider": "Hugging Face",
            "isFree": true
          },
          {
            "title": "Scikit-Learn User Guide",
            "url": "https://scikit-learn.org/stable/user_guide.html",
            "provider": "Scikit-Learn",
            "isFree": true
          }
        ],
        "platformLink": null
      },
      {
        "stageNumber": 6,
        "id": "mach-stage-6",
        "title": "Guided Practice & Applied Exercises",
        "summary": "Solve realistic industry exercises, build architectural prototypes, and practice technical challenges.",
        "topics": [
          "Real-world Architectural Case Studies",
          "Debugging Complex Multi-Component Failures",
          "Performance Profiling & Bottleneck Resolution",
          "Data Consistency & Fault Tolerance",
          "Clean Code & Refactoring Patterns"
        ],
        "objectives": [
          "Handle unexpected system degradation and identify root causes",
          "Refactor legacy codebase into clean, testable architecture"
        ],
        "practiceActivities": [
          "Debug and resolve 5 intentionally broken code repositories",
          "Conduct benchmark performance profiling"
        ],
        "practicalTask": "Complete a 3-hour simulated take-home engineering assessment.",
        "prerequisites": "Stage 4 & 5",
        "estimatedTime": "2-3 Weeks",
        "resources": [
          {
            "title": "Google DeepMind: Machine Learning & AI",
            "url": "https://deepmind.google/discover/blog/",
            "provider": "Google DeepMind",
            "isFree": true
          },
          {
            "title": "Hugging Face Official Documentation",
            "url": "https://huggingface.co/docs",
            "provider": "Hugging Face",
            "isFree": true
          },
          {
            "title": "Scikit-Learn User Guide",
            "url": "https://scikit-learn.org/stable/user_guide.html",
            "provider": "Scikit-Learn",
            "isFree": true
          }
        ],
        "platformLink": {
          "label": "Run Aptitude & Practice Tests",
          "path": "/aptitude"
        }
      },
      {
        "stageNumber": 7,
        "id": "mach-stage-7",
        "title": "Beginner Capstone Project",
        "summary": "Synthesize your learning into a functional, standalone, production-ready beginner project.",
        "topics": [
          "Project Scaffolding & Architecture",
          "Implementing Core Business Logic",
          "Data Persistence & State Management",
          "Automated Test Coverage",
          "Public Deployment & Documentation"
        ],
        "objectives": [
          "Deliver a working, deployed application from scratch",
          "Document setup instructions and architectural decisions in README"
        ],
        "practiceActivities": [
          "Set up automated GitHub Actions deployment",
          "Write comprehensive unit tests for all business logic"
        ],
        "practicalTask": "Build and deploy a complete functional starter project for Machine Learning Engineer with live documentation and public repository.",
        "prerequisites": "Stage 3 & 5",
        "estimatedTime": "2-3 Weeks",
        "resources": [
          {
            "title": "Google DeepMind: Machine Learning & AI",
            "url": "https://deepmind.google/discover/blog/",
            "provider": "Google DeepMind",
            "isFree": true
          },
          {
            "title": "Hugging Face Official Documentation",
            "url": "https://huggingface.co/docs",
            "provider": "Hugging Face",
            "isFree": true
          },
          {
            "title": "Scikit-Learn User Guide",
            "url": "https://scikit-learn.org/stable/user_guide.html",
            "provider": "Scikit-Learn",
            "isFree": true
          }
        ],
        "platformLink": null
      },
      {
        "stageNumber": 8,
        "id": "mach-stage-8",
        "title": "Intermediate / Portfolio Flagship Project",
        "summary": "Engineer a high-impact, feature-rich portfolio flagship project that stands out to hiring managers.",
        "topics": [
          "Complex Architecture & Multi-Service Integration",
          "Scalability, Caching, and Fault Tolerance",
          "Security Hardening & Role Authorization",
          "Comprehensive Test Coverage (Unit + E2E)",
          "Professional Documentation & Video Walkthrough"
        ],
        "objectives": [
          "Demonstrate professional-level software engineering capability",
          "Present clean system design and quantitative performance results"
        ],
        "practiceActivities": [
          "Conduct stress testing and load testing with benchmark tools",
          "Record a 3-minute technical walkthrough video of your project"
        ],
        "practicalTask": "Publish a flagship Machine Learning Engineer portfolio project with production deployment, live database, and architecture documentation.",
        "prerequisites": "Stage 7",
        "estimatedTime": "3-4 Weeks",
        "resources": [
          {
            "title": "Google DeepMind: Machine Learning & AI",
            "url": "https://deepmind.google/discover/blog/",
            "provider": "Google DeepMind",
            "isFree": true
          },
          {
            "title": "Hugging Face Official Documentation",
            "url": "https://huggingface.co/docs",
            "provider": "Hugging Face",
            "isFree": true
          },
          {
            "title": "Scikit-Learn User Guide",
            "url": "https://scikit-learn.org/stable/user_guide.html",
            "provider": "Scikit-Learn",
            "isFree": true
          }
        ],
        "platformLink": null
      },
      {
        "stageNumber": 9,
        "id": "mach-stage-9",
        "title": "Resume, GitHub Portfolio & Professional Presence",
        "summary": "Craft an ATS-optimized technical resume, polish your GitHub repositories, and optimize LinkedIn presence.",
        "topics": [
          "Impact-Driven Resume Bullet Points (Action + Context + Quantified Result)",
          "GitHub Profile Readme & Pinned Projects Showcase",
          "Technical Blog Writing & Project Case Studies",
          "LinkedIn Profile Optimization for Technical Recruiters",
          "Elevator Pitch & Portfolio Website"
        ],
        "objectives": [
          "Pass technical screening ATS filters with a 90+ score",
          "Present repositories with clean documentation and demo URLs"
        ],
        "practiceActivities": [
          "Score your resume on PlaceMentor AI’s Resume Builder",
          "Draft technical case studies explaining your design tradeoffs"
        ],
        "practicalTask": "Finalize your tailored Machine Learning Engineer resume and publish an open-source GitHub portfolio.",
        "prerequisites": "Stage 7 & 8",
        "estimatedTime": "1-2 Weeks",
        "resources": [
          {
            "title": "Google DeepMind: Machine Learning & AI",
            "url": "https://deepmind.google/discover/blog/",
            "provider": "Google DeepMind",
            "isFree": true
          },
          {
            "title": "Hugging Face Official Documentation",
            "url": "https://huggingface.co/docs",
            "provider": "Hugging Face",
            "isFree": true
          },
          {
            "title": "Scikit-Learn User Guide",
            "url": "https://scikit-learn.org/stable/user_guide.html",
            "provider": "Scikit-Learn",
            "isFree": true
          }
        ],
        "platformLink": {
          "label": "Build ATS Resume",
          "path": "/resume"
        }
      },
      {
        "stageNumber": 10,
        "id": "mach-stage-10",
        "title": "Interview Preparation, System Design & Applications",
        "summary": "Ace live technical screening rounds, domain-specific problem solving, system design, and behavioral interviews.",
        "topics": [
          "Top Technical Interview Questions for Machine Learning Engineer",
          "System Design & Architectural Tradeoffs",
          "Live Whiteboard / Screen-Share Coding Best Practices",
          "Behavioral Leadership Rounds (STAR Method)",
          "Strategic Job Applications across Campus & Off-Campus Drives"
        ],
        "objectives": [
          "Pass 45-60 minute technical interviews with confidence",
          "Effectively communicate technical tradeoffs to Engineering Managers"
        ],
        "practiceActivities": [
          "Conduct at least 3 AI Mock Technical Interviews on PlaceMentor AI",
          "Apply to 20+ verified opportunities on the Jobs Portal"
        ],
        "practicalTask": "Complete a full mock technical interview panel for Machine Learning Engineer and apply to verified companies hiring in India.",
        "prerequisites": "Stages 1 through 9",
        "estimatedTime": "3-4 Weeks",
        "resources": [
          {
            "title": "Google DeepMind: Machine Learning & AI",
            "url": "https://deepmind.google/discover/blog/",
            "provider": "Google DeepMind",
            "isFree": true
          },
          {
            "title": "Hugging Face Official Documentation",
            "url": "https://huggingface.co/docs",
            "provider": "Hugging Face",
            "isFree": true
          },
          {
            "title": "Scikit-Learn User Guide",
            "url": "https://scikit-learn.org/stable/user_guide.html",
            "provider": "Scikit-Learn",
            "isFree": true
          }
        ],
        "platformLink": {
          "label": "Take AI Mock Interview for Machine Learning Engineer",
          "path": "/interview"
        }
      }
    ]
  },
  {
    "id": "ai-engineer",
    "title": "AI Engineer (LLMs & Generative AI)",
    "category": "AI & Data",
    "difficulty": "Advanced",
    "duration": "6-8 Months",
    "icon": "Sparkles",
    "color": "secondary",
    "prerequisites": "Python proficiency, REST APIs, Basic NLP understanding",
    "technologies": [
      "Gemini API",
      "OpenAI API",
      "LangChain",
      "LlamaIndex",
      "Vector DBs (Pinecone, Chroma)",
      "RAG Architectures",
      "Prompt Engineering",
      "Fine-Tuning (LoRA)",
      "FastAPI"
    ],
    "shortDescription": "Architect generative AI systems, Retrieval-Augmented Generation (RAG), autonomous AI agents, and LLM applications.",
    "overview": "AI Engineers build next-generation applications powered by Large Language Models, embeddings, vector databases, multi-agent frameworks, and real-time multimodal capabilities.",
    "stages": [
      {
        "stageNumber": 1,
        "id": "aie-stage-1",
        "title": "Prerequisites & CS Fundamentals for AI Engineer (LLMs & Generative AI)",
        "summary": "Core theoretical and structural computer science prerequisites required to excel in AI Engineer (LLMs & Generative AI).",
        "topics": [
          "Operating Systems & Memory Hierarchy",
          "Networking Fundamentals & Protocol Layers",
          "Boolean Logic & Discrete Mathematics",
          "Version Control with Git & GitHub",
          "Command Line Interface (CLI) Mastery"
        ],
        "objectives": [
          "Establish clear understanding of computational concepts essential for AI Engineer (LLMs & Generative AI)",
          "Configure professional development terminal environments",
          "Understand system architecture basics"
        ],
        "practiceActivities": [
          "Complete 10 Linux terminal navigation exercises",
          "Diagram a client-server transaction flow"
        ],
        "practicalTask": "Initialize a development workspace with Git, secure environment configuration, and project scaffolding for AI Engineer (LLMs & Generative AI).",
        "prerequisites": "None",
        "estimatedTime": "2 Weeks",
        "resources": [
          {
            "title": "Google DeepMind: Machine Learning & AI",
            "url": "https://deepmind.google/discover/blog/",
            "provider": "Google DeepMind",
            "isFree": true
          },
          {
            "title": "Hugging Face Official Documentation",
            "url": "https://huggingface.co/docs",
            "provider": "Hugging Face",
            "isFree": true
          },
          {
            "title": "Scikit-Learn User Guide",
            "url": "https://scikit-learn.org/stable/user_guide.html",
            "provider": "Scikit-Learn",
            "isFree": true
          }
        ],
        "platformLink": null
      },
      {
        "stageNumber": 2,
        "id": "aie-stage-2",
        "title": "Core Languages & Foundations (Gemini API, OpenAI API, LangChain, LlamaIndex)",
        "summary": "Develop deep syntactic and operational mastery of primary programming tools used in AI Engineer (LLMs & Generative AI).",
        "topics": [
          "Syntax, Control Flow, and Data Types",
          "Object-Oriented Programming (OOP) vs Functional Paradigms",
          "Error Handling, Exceptions, and Defensive Coding",
          "Memory Management and Garbage Collection",
          "Modular Code Structure & Package Management"
        ],
        "objectives": [
          "Write production-standard code in core languages utilized by AI Engineer (LLMs & Generative AI)",
          "Handle exceptions and edge cases with clean architecture"
        ],
        "practiceActivities": [
          "Write 15 standalone algorithmic functions with unit tests",
          "Implement custom class hierarchies demonstrating inheritance & polymorphism"
        ],
        "practicalTask": "Develop a robust CLI automation utility or foundational service utilizing Gemini API, OpenAI API, LangChain, LlamaIndex.",
        "prerequisites": "Stage 1",
        "estimatedTime": "3 Weeks",
        "resources": [
          {
            "title": "Google DeepMind: Machine Learning & AI",
            "url": "https://deepmind.google/discover/blog/",
            "provider": "Google DeepMind",
            "isFree": true
          },
          {
            "title": "Hugging Face Official Documentation",
            "url": "https://huggingface.co/docs",
            "provider": "Hugging Face",
            "isFree": true
          },
          {
            "title": "Scikit-Learn User Guide",
            "url": "https://scikit-learn.org/stable/user_guide.html",
            "provider": "Scikit-Learn",
            "isFree": true
          }
        ],
        "platformLink": {
          "label": "Practice Gemini API Coding",
          "path": "/coding"
        }
      },
      {
        "stageNumber": 3,
        "id": "aie-stage-3",
        "title": "Role-Specific Technical Skills & Core Frameworks",
        "summary": "Master specialized domain frameworks, libraries, protocols, and standard patterns for AI Engineer (LLMs & Generative AI).",
        "topics": [
          "Primary AI Engineer (LLMs & Generative AI) Frameworks & Libraries",
          "Data Validation & Pipeline Architecture",
          "API Integration & Protocol Handlers",
          "Configuration Management & Environment Parity",
          "Security Best Practices & Threat Mitigation"
        ],
        "objectives": [
          "Build end-to-end features adhering to modern AI Engineer (LLMs & Generative AI) industry standards",
          "Apply design patterns tailored to the role"
        ],
        "practiceActivities": [
          "Build a working proof-of-concept module utilizing standard industry frameworks",
          "Audit a code repository for performance bottlenecks"
        ],
        "practicalTask": "Construct a fully functional core service module demonstrating AI Engineer (LLMs & Generative AI) competencies.",
        "prerequisites": "Stage 2",
        "estimatedTime": "3-4 Weeks",
        "resources": [
          {
            "title": "Google DeepMind: Machine Learning & AI",
            "url": "https://deepmind.google/discover/blog/",
            "provider": "Google DeepMind",
            "isFree": true
          },
          {
            "title": "Hugging Face Official Documentation",
            "url": "https://huggingface.co/docs",
            "provider": "Hugging Face",
            "isFree": true
          },
          {
            "title": "Scikit-Learn User Guide",
            "url": "https://scikit-learn.org/stable/user_guide.html",
            "provider": "Scikit-Learn",
            "isFree": true
          }
        ],
        "platformLink": null
      },
      {
        "stageNumber": 4,
        "id": "aie-stage-4",
        "title": "Data Structures, Algorithms & Problem Solving",
        "summary": "Targeted algorithmic problem solving, computational complexity, and data structures relevant to AI Engineer (LLMs & Generative AI).",
        "topics": [
          "Arrays, Hash Maps, Linked Lists, and Stacks/Queues",
          "Trees, Graphs, and Breadth-First / Depth-First Traversal",
          "Searching, Sorting, and Binary Search",
          "Greedy Algorithms and Dynamic Programming Patterns",
          "Time & Space Complexity Tradeoff Analysis"
        ],
        "objectives": [
          "Confidently solve technical coding screening assessments",
          "Evaluate algorithm performance using Big-O notation"
        ],
        "practiceActivities": [
          "Solve 40 LeetCode Easy & Medium problems in your primary language",
          "Analyze space and time complexity for critical routines"
        ],
        "practicalTask": "Implement an optimized search, sort, and cache routine for domain-specific data structures.",
        "prerequisites": "Stage 2 & 3",
        "estimatedTime": "3 Weeks",
        "resources": [
          {
            "title": "Google DeepMind: Machine Learning & AI",
            "url": "https://deepmind.google/discover/blog/",
            "provider": "Google DeepMind",
            "isFree": true
          },
          {
            "title": "Hugging Face Official Documentation",
            "url": "https://huggingface.co/docs",
            "provider": "Hugging Face",
            "isFree": true
          },
          {
            "title": "Scikit-Learn User Guide",
            "url": "https://scikit-learn.org/stable/user_guide.html",
            "provider": "Scikit-Learn",
            "isFree": true
          }
        ],
        "platformLink": {
          "label": "Solve Coding Problems",
          "path": "/coding"
        }
      },
      {
        "stageNumber": 5,
        "id": "aie-stage-5",
        "title": "Tools, Platforms & Development Workflow",
        "summary": "Professional tooling, containerization, automated testing, and CI/CD pipelines for AI Engineer (LLMs & Generative AI).",
        "topics": [
          "Docker Containerization & Multi-Stage Builds",
          "Automated Testing (Unit, Integration, End-to-End)",
          "CI/CD Pipeline Automation (GitHub Actions)",
          "Cloud Infrastructure & Deployment Services",
          "Observability, Logging, and Monitoring"
        ],
        "objectives": [
          "Automate build, test, and release cycles",
          "Containerize applications for reproducible environments"
        ],
        "practiceActivities": [
          "Write a Dockerfile and docker-compose.yml configuration",
          "Create a GitHub Actions workflow to run automated tests on every push"
        ],
        "practicalTask": "Configure a continuous deployment pipeline with automated testing for a AI Engineer (LLMs & Generative AI) project.",
        "prerequisites": "Stage 3",
        "estimatedTime": "2 Weeks",
        "resources": [
          {
            "title": "Google DeepMind: Machine Learning & AI",
            "url": "https://deepmind.google/discover/blog/",
            "provider": "Google DeepMind",
            "isFree": true
          },
          {
            "title": "Hugging Face Official Documentation",
            "url": "https://huggingface.co/docs",
            "provider": "Hugging Face",
            "isFree": true
          },
          {
            "title": "Scikit-Learn User Guide",
            "url": "https://scikit-learn.org/stable/user_guide.html",
            "provider": "Scikit-Learn",
            "isFree": true
          }
        ],
        "platformLink": null
      },
      {
        "stageNumber": 6,
        "id": "aie-stage-6",
        "title": "Guided Practice & Applied Exercises",
        "summary": "Solve realistic industry exercises, build architectural prototypes, and practice technical challenges.",
        "topics": [
          "Real-world Architectural Case Studies",
          "Debugging Complex Multi-Component Failures",
          "Performance Profiling & Bottleneck Resolution",
          "Data Consistency & Fault Tolerance",
          "Clean Code & Refactoring Patterns"
        ],
        "objectives": [
          "Handle unexpected system degradation and identify root causes",
          "Refactor legacy codebase into clean, testable architecture"
        ],
        "practiceActivities": [
          "Debug and resolve 5 intentionally broken code repositories",
          "Conduct benchmark performance profiling"
        ],
        "practicalTask": "Complete a 3-hour simulated take-home engineering assessment.",
        "prerequisites": "Stage 4 & 5",
        "estimatedTime": "2-3 Weeks",
        "resources": [
          {
            "title": "Google DeepMind: Machine Learning & AI",
            "url": "https://deepmind.google/discover/blog/",
            "provider": "Google DeepMind",
            "isFree": true
          },
          {
            "title": "Hugging Face Official Documentation",
            "url": "https://huggingface.co/docs",
            "provider": "Hugging Face",
            "isFree": true
          },
          {
            "title": "Scikit-Learn User Guide",
            "url": "https://scikit-learn.org/stable/user_guide.html",
            "provider": "Scikit-Learn",
            "isFree": true
          }
        ],
        "platformLink": {
          "label": "Run Aptitude & Practice Tests",
          "path": "/aptitude"
        }
      },
      {
        "stageNumber": 7,
        "id": "aie-stage-7",
        "title": "Beginner Capstone Project",
        "summary": "Synthesize your learning into a functional, standalone, production-ready beginner project.",
        "topics": [
          "Project Scaffolding & Architecture",
          "Implementing Core Business Logic",
          "Data Persistence & State Management",
          "Automated Test Coverage",
          "Public Deployment & Documentation"
        ],
        "objectives": [
          "Deliver a working, deployed application from scratch",
          "Document setup instructions and architectural decisions in README"
        ],
        "practiceActivities": [
          "Set up automated GitHub Actions deployment",
          "Write comprehensive unit tests for all business logic"
        ],
        "practicalTask": "Build and deploy a complete functional starter project for AI Engineer (LLMs & Generative AI) with live documentation and public repository.",
        "prerequisites": "Stage 3 & 5",
        "estimatedTime": "2-3 Weeks",
        "resources": [
          {
            "title": "Google DeepMind: Machine Learning & AI",
            "url": "https://deepmind.google/discover/blog/",
            "provider": "Google DeepMind",
            "isFree": true
          },
          {
            "title": "Hugging Face Official Documentation",
            "url": "https://huggingface.co/docs",
            "provider": "Hugging Face",
            "isFree": true
          },
          {
            "title": "Scikit-Learn User Guide",
            "url": "https://scikit-learn.org/stable/user_guide.html",
            "provider": "Scikit-Learn",
            "isFree": true
          }
        ],
        "platformLink": null
      },
      {
        "stageNumber": 8,
        "id": "aie-stage-8",
        "title": "Intermediate / Portfolio Flagship Project",
        "summary": "Engineer a high-impact, feature-rich portfolio flagship project that stands out to hiring managers.",
        "topics": [
          "Complex Architecture & Multi-Service Integration",
          "Scalability, Caching, and Fault Tolerance",
          "Security Hardening & Role Authorization",
          "Comprehensive Test Coverage (Unit + E2E)",
          "Professional Documentation & Video Walkthrough"
        ],
        "objectives": [
          "Demonstrate professional-level software engineering capability",
          "Present clean system design and quantitative performance results"
        ],
        "practiceActivities": [
          "Conduct stress testing and load testing with benchmark tools",
          "Record a 3-minute technical walkthrough video of your project"
        ],
        "practicalTask": "Publish a flagship AI Engineer (LLMs & Generative AI) portfolio project with production deployment, live database, and architecture documentation.",
        "prerequisites": "Stage 7",
        "estimatedTime": "3-4 Weeks",
        "resources": [
          {
            "title": "Google DeepMind: Machine Learning & AI",
            "url": "https://deepmind.google/discover/blog/",
            "provider": "Google DeepMind",
            "isFree": true
          },
          {
            "title": "Hugging Face Official Documentation",
            "url": "https://huggingface.co/docs",
            "provider": "Hugging Face",
            "isFree": true
          },
          {
            "title": "Scikit-Learn User Guide",
            "url": "https://scikit-learn.org/stable/user_guide.html",
            "provider": "Scikit-Learn",
            "isFree": true
          }
        ],
        "platformLink": null
      },
      {
        "stageNumber": 9,
        "id": "aie-stage-9",
        "title": "Resume, GitHub Portfolio & Professional Presence",
        "summary": "Craft an ATS-optimized technical resume, polish your GitHub repositories, and optimize LinkedIn presence.",
        "topics": [
          "Impact-Driven Resume Bullet Points (Action + Context + Quantified Result)",
          "GitHub Profile Readme & Pinned Projects Showcase",
          "Technical Blog Writing & Project Case Studies",
          "LinkedIn Profile Optimization for Technical Recruiters",
          "Elevator Pitch & Portfolio Website"
        ],
        "objectives": [
          "Pass technical screening ATS filters with a 90+ score",
          "Present repositories with clean documentation and demo URLs"
        ],
        "practiceActivities": [
          "Score your resume on PlaceMentor AI’s Resume Builder",
          "Draft technical case studies explaining your design tradeoffs"
        ],
        "practicalTask": "Finalize your tailored AI Engineer (LLMs & Generative AI) resume and publish an open-source GitHub portfolio.",
        "prerequisites": "Stage 7 & 8",
        "estimatedTime": "1-2 Weeks",
        "resources": [
          {
            "title": "Google DeepMind: Machine Learning & AI",
            "url": "https://deepmind.google/discover/blog/",
            "provider": "Google DeepMind",
            "isFree": true
          },
          {
            "title": "Hugging Face Official Documentation",
            "url": "https://huggingface.co/docs",
            "provider": "Hugging Face",
            "isFree": true
          },
          {
            "title": "Scikit-Learn User Guide",
            "url": "https://scikit-learn.org/stable/user_guide.html",
            "provider": "Scikit-Learn",
            "isFree": true
          }
        ],
        "platformLink": {
          "label": "Build ATS Resume",
          "path": "/resume"
        }
      },
      {
        "stageNumber": 10,
        "id": "aie-stage-10",
        "title": "Interview Preparation, System Design & Applications",
        "summary": "Ace live technical screening rounds, domain-specific problem solving, system design, and behavioral interviews.",
        "topics": [
          "Top Technical Interview Questions for AI Engineer (LLMs & Generative AI)",
          "System Design & Architectural Tradeoffs",
          "Live Whiteboard / Screen-Share Coding Best Practices",
          "Behavioral Leadership Rounds (STAR Method)",
          "Strategic Job Applications across Campus & Off-Campus Drives"
        ],
        "objectives": [
          "Pass 45-60 minute technical interviews with confidence",
          "Effectively communicate technical tradeoffs to Engineering Managers"
        ],
        "practiceActivities": [
          "Conduct at least 3 AI Mock Technical Interviews on PlaceMentor AI",
          "Apply to 20+ verified opportunities on the Jobs Portal"
        ],
        "practicalTask": "Complete a full mock technical interview panel for AI Engineer (LLMs & Generative AI) and apply to verified companies hiring in India.",
        "prerequisites": "Stages 1 through 9",
        "estimatedTime": "3-4 Weeks",
        "resources": [
          {
            "title": "Google DeepMind: Machine Learning & AI",
            "url": "https://deepmind.google/discover/blog/",
            "provider": "Google DeepMind",
            "isFree": true
          },
          {
            "title": "Hugging Face Official Documentation",
            "url": "https://huggingface.co/docs",
            "provider": "Hugging Face",
            "isFree": true
          },
          {
            "title": "Scikit-Learn User Guide",
            "url": "https://scikit-learn.org/stable/user_guide.html",
            "provider": "Scikit-Learn",
            "isFree": true
          }
        ],
        "platformLink": {
          "label": "Take AI Mock Interview for AI Engineer (LLMs & Generative AI)",
          "path": "/interview"
        }
      }
    ]
  },
  {
    "id": "data-engineer",
    "title": "Data Engineer",
    "category": "AI & Data",
    "difficulty": "Intermediate",
    "duration": "7-9 Months",
    "icon": "Database",
    "color": "teal",
    "prerequisites": "SQL mastery, Linux basics, Python or Java",
    "technologies": [
      "Apache Spark",
      "Apache Kafka",
      "PostgreSQL / Snowflake",
      "dbt",
      "Apache Airflow",
      "Data Warehousing",
      "AWS S3 / Glue",
      "Python ETL"
    ],
    "shortDescription": "Build distributed real-time data pipelines, lakehouses, warehouse schemas, and robust big data infrastructure.",
    "overview": "Data Engineers design the high-throughput pipelines that ingest, clean, and transport terabytes of data reliably for downstream analytics and machine learning systems.",
    "stages": [
      {
        "stageNumber": 1,
        "id": "data-stage-1",
        "title": "Prerequisites & CS Fundamentals for Data Engineer",
        "summary": "Core theoretical and structural computer science prerequisites required to excel in Data Engineer.",
        "topics": [
          "Operating Systems & Memory Hierarchy",
          "Networking Fundamentals & Protocol Layers",
          "Boolean Logic & Discrete Mathematics",
          "Version Control with Git & GitHub",
          "Command Line Interface (CLI) Mastery"
        ],
        "objectives": [
          "Establish clear understanding of computational concepts essential for Data Engineer",
          "Configure professional development terminal environments",
          "Understand system architecture basics"
        ],
        "practiceActivities": [
          "Complete 10 Linux terminal navigation exercises",
          "Diagram a client-server transaction flow"
        ],
        "practicalTask": "Initialize a development workspace with Git, secure environment configuration, and project scaffolding for Data Engineer.",
        "prerequisites": "None",
        "estimatedTime": "2 Weeks",
        "resources": [
          {
            "title": "Google DeepMind: Machine Learning & AI",
            "url": "https://deepmind.google/discover/blog/",
            "provider": "Google DeepMind",
            "isFree": true
          },
          {
            "title": "Hugging Face Official Documentation",
            "url": "https://huggingface.co/docs",
            "provider": "Hugging Face",
            "isFree": true
          },
          {
            "title": "Scikit-Learn User Guide",
            "url": "https://scikit-learn.org/stable/user_guide.html",
            "provider": "Scikit-Learn",
            "isFree": true
          }
        ],
        "platformLink": null
      },
      {
        "stageNumber": 2,
        "id": "data-stage-2",
        "title": "Core Languages & Foundations (Apache Spark, Apache Kafka, PostgreSQL / Snowflake, dbt)",
        "summary": "Develop deep syntactic and operational mastery of primary programming tools used in Data Engineer.",
        "topics": [
          "Syntax, Control Flow, and Data Types",
          "Object-Oriented Programming (OOP) vs Functional Paradigms",
          "Error Handling, Exceptions, and Defensive Coding",
          "Memory Management and Garbage Collection",
          "Modular Code Structure & Package Management"
        ],
        "objectives": [
          "Write production-standard code in core languages utilized by Data Engineer",
          "Handle exceptions and edge cases with clean architecture"
        ],
        "practiceActivities": [
          "Write 15 standalone algorithmic functions with unit tests",
          "Implement custom class hierarchies demonstrating inheritance & polymorphism"
        ],
        "practicalTask": "Develop a robust CLI automation utility or foundational service utilizing Apache Spark, Apache Kafka, PostgreSQL / Snowflake, dbt.",
        "prerequisites": "Stage 1",
        "estimatedTime": "3 Weeks",
        "resources": [
          {
            "title": "Google DeepMind: Machine Learning & AI",
            "url": "https://deepmind.google/discover/blog/",
            "provider": "Google DeepMind",
            "isFree": true
          },
          {
            "title": "Hugging Face Official Documentation",
            "url": "https://huggingface.co/docs",
            "provider": "Hugging Face",
            "isFree": true
          },
          {
            "title": "Scikit-Learn User Guide",
            "url": "https://scikit-learn.org/stable/user_guide.html",
            "provider": "Scikit-Learn",
            "isFree": true
          }
        ],
        "platformLink": {
          "label": "Practice Apache Spark Coding",
          "path": "/coding"
        }
      },
      {
        "stageNumber": 3,
        "id": "data-stage-3",
        "title": "Role-Specific Technical Skills & Core Frameworks",
        "summary": "Master specialized domain frameworks, libraries, protocols, and standard patterns for Data Engineer.",
        "topics": [
          "Primary Data Engineer Frameworks & Libraries",
          "Data Validation & Pipeline Architecture",
          "API Integration & Protocol Handlers",
          "Configuration Management & Environment Parity",
          "Security Best Practices & Threat Mitigation"
        ],
        "objectives": [
          "Build end-to-end features adhering to modern Data Engineer industry standards",
          "Apply design patterns tailored to the role"
        ],
        "practiceActivities": [
          "Build a working proof-of-concept module utilizing standard industry frameworks",
          "Audit a code repository for performance bottlenecks"
        ],
        "practicalTask": "Construct a fully functional core service module demonstrating Data Engineer competencies.",
        "prerequisites": "Stage 2",
        "estimatedTime": "3-4 Weeks",
        "resources": [
          {
            "title": "Google DeepMind: Machine Learning & AI",
            "url": "https://deepmind.google/discover/blog/",
            "provider": "Google DeepMind",
            "isFree": true
          },
          {
            "title": "Hugging Face Official Documentation",
            "url": "https://huggingface.co/docs",
            "provider": "Hugging Face",
            "isFree": true
          },
          {
            "title": "Scikit-Learn User Guide",
            "url": "https://scikit-learn.org/stable/user_guide.html",
            "provider": "Scikit-Learn",
            "isFree": true
          }
        ],
        "platformLink": null
      },
      {
        "stageNumber": 4,
        "id": "data-stage-4",
        "title": "Data Structures, Algorithms & Problem Solving",
        "summary": "Targeted algorithmic problem solving, computational complexity, and data structures relevant to Data Engineer.",
        "topics": [
          "Arrays, Hash Maps, Linked Lists, and Stacks/Queues",
          "Trees, Graphs, and Breadth-First / Depth-First Traversal",
          "Searching, Sorting, and Binary Search",
          "Greedy Algorithms and Dynamic Programming Patterns",
          "Time & Space Complexity Tradeoff Analysis"
        ],
        "objectives": [
          "Confidently solve technical coding screening assessments",
          "Evaluate algorithm performance using Big-O notation"
        ],
        "practiceActivities": [
          "Solve 40 LeetCode Easy & Medium problems in your primary language",
          "Analyze space and time complexity for critical routines"
        ],
        "practicalTask": "Implement an optimized search, sort, and cache routine for domain-specific data structures.",
        "prerequisites": "Stage 2 & 3",
        "estimatedTime": "3 Weeks",
        "resources": [
          {
            "title": "Google DeepMind: Machine Learning & AI",
            "url": "https://deepmind.google/discover/blog/",
            "provider": "Google DeepMind",
            "isFree": true
          },
          {
            "title": "Hugging Face Official Documentation",
            "url": "https://huggingface.co/docs",
            "provider": "Hugging Face",
            "isFree": true
          },
          {
            "title": "Scikit-Learn User Guide",
            "url": "https://scikit-learn.org/stable/user_guide.html",
            "provider": "Scikit-Learn",
            "isFree": true
          }
        ],
        "platformLink": {
          "label": "Solve Coding Problems",
          "path": "/coding"
        }
      },
      {
        "stageNumber": 5,
        "id": "data-stage-5",
        "title": "Tools, Platforms & Development Workflow",
        "summary": "Professional tooling, containerization, automated testing, and CI/CD pipelines for Data Engineer.",
        "topics": [
          "Docker Containerization & Multi-Stage Builds",
          "Automated Testing (Unit, Integration, End-to-End)",
          "CI/CD Pipeline Automation (GitHub Actions)",
          "Cloud Infrastructure & Deployment Services",
          "Observability, Logging, and Monitoring"
        ],
        "objectives": [
          "Automate build, test, and release cycles",
          "Containerize applications for reproducible environments"
        ],
        "practiceActivities": [
          "Write a Dockerfile and docker-compose.yml configuration",
          "Create a GitHub Actions workflow to run automated tests on every push"
        ],
        "practicalTask": "Configure a continuous deployment pipeline with automated testing for a Data Engineer project.",
        "prerequisites": "Stage 3",
        "estimatedTime": "2 Weeks",
        "resources": [
          {
            "title": "Google DeepMind: Machine Learning & AI",
            "url": "https://deepmind.google/discover/blog/",
            "provider": "Google DeepMind",
            "isFree": true
          },
          {
            "title": "Hugging Face Official Documentation",
            "url": "https://huggingface.co/docs",
            "provider": "Hugging Face",
            "isFree": true
          },
          {
            "title": "Scikit-Learn User Guide",
            "url": "https://scikit-learn.org/stable/user_guide.html",
            "provider": "Scikit-Learn",
            "isFree": true
          }
        ],
        "platformLink": null
      },
      {
        "stageNumber": 6,
        "id": "data-stage-6",
        "title": "Guided Practice & Applied Exercises",
        "summary": "Solve realistic industry exercises, build architectural prototypes, and practice technical challenges.",
        "topics": [
          "Real-world Architectural Case Studies",
          "Debugging Complex Multi-Component Failures",
          "Performance Profiling & Bottleneck Resolution",
          "Data Consistency & Fault Tolerance",
          "Clean Code & Refactoring Patterns"
        ],
        "objectives": [
          "Handle unexpected system degradation and identify root causes",
          "Refactor legacy codebase into clean, testable architecture"
        ],
        "practiceActivities": [
          "Debug and resolve 5 intentionally broken code repositories",
          "Conduct benchmark performance profiling"
        ],
        "practicalTask": "Complete a 3-hour simulated take-home engineering assessment.",
        "prerequisites": "Stage 4 & 5",
        "estimatedTime": "2-3 Weeks",
        "resources": [
          {
            "title": "Google DeepMind: Machine Learning & AI",
            "url": "https://deepmind.google/discover/blog/",
            "provider": "Google DeepMind",
            "isFree": true
          },
          {
            "title": "Hugging Face Official Documentation",
            "url": "https://huggingface.co/docs",
            "provider": "Hugging Face",
            "isFree": true
          },
          {
            "title": "Scikit-Learn User Guide",
            "url": "https://scikit-learn.org/stable/user_guide.html",
            "provider": "Scikit-Learn",
            "isFree": true
          }
        ],
        "platformLink": {
          "label": "Run Aptitude & Practice Tests",
          "path": "/aptitude"
        }
      },
      {
        "stageNumber": 7,
        "id": "data-stage-7",
        "title": "Beginner Capstone Project",
        "summary": "Synthesize your learning into a functional, standalone, production-ready beginner project.",
        "topics": [
          "Project Scaffolding & Architecture",
          "Implementing Core Business Logic",
          "Data Persistence & State Management",
          "Automated Test Coverage",
          "Public Deployment & Documentation"
        ],
        "objectives": [
          "Deliver a working, deployed application from scratch",
          "Document setup instructions and architectural decisions in README"
        ],
        "practiceActivities": [
          "Set up automated GitHub Actions deployment",
          "Write comprehensive unit tests for all business logic"
        ],
        "practicalTask": "Build and deploy a complete functional starter project for Data Engineer with live documentation and public repository.",
        "prerequisites": "Stage 3 & 5",
        "estimatedTime": "2-3 Weeks",
        "resources": [
          {
            "title": "Google DeepMind: Machine Learning & AI",
            "url": "https://deepmind.google/discover/blog/",
            "provider": "Google DeepMind",
            "isFree": true
          },
          {
            "title": "Hugging Face Official Documentation",
            "url": "https://huggingface.co/docs",
            "provider": "Hugging Face",
            "isFree": true
          },
          {
            "title": "Scikit-Learn User Guide",
            "url": "https://scikit-learn.org/stable/user_guide.html",
            "provider": "Scikit-Learn",
            "isFree": true
          }
        ],
        "platformLink": null
      },
      {
        "stageNumber": 8,
        "id": "data-stage-8",
        "title": "Intermediate / Portfolio Flagship Project",
        "summary": "Engineer a high-impact, feature-rich portfolio flagship project that stands out to hiring managers.",
        "topics": [
          "Complex Architecture & Multi-Service Integration",
          "Scalability, Caching, and Fault Tolerance",
          "Security Hardening & Role Authorization",
          "Comprehensive Test Coverage (Unit + E2E)",
          "Professional Documentation & Video Walkthrough"
        ],
        "objectives": [
          "Demonstrate professional-level software engineering capability",
          "Present clean system design and quantitative performance results"
        ],
        "practiceActivities": [
          "Conduct stress testing and load testing with benchmark tools",
          "Record a 3-minute technical walkthrough video of your project"
        ],
        "practicalTask": "Publish a flagship Data Engineer portfolio project with production deployment, live database, and architecture documentation.",
        "prerequisites": "Stage 7",
        "estimatedTime": "3-4 Weeks",
        "resources": [
          {
            "title": "Google DeepMind: Machine Learning & AI",
            "url": "https://deepmind.google/discover/blog/",
            "provider": "Google DeepMind",
            "isFree": true
          },
          {
            "title": "Hugging Face Official Documentation",
            "url": "https://huggingface.co/docs",
            "provider": "Hugging Face",
            "isFree": true
          },
          {
            "title": "Scikit-Learn User Guide",
            "url": "https://scikit-learn.org/stable/user_guide.html",
            "provider": "Scikit-Learn",
            "isFree": true
          }
        ],
        "platformLink": null
      },
      {
        "stageNumber": 9,
        "id": "data-stage-9",
        "title": "Resume, GitHub Portfolio & Professional Presence",
        "summary": "Craft an ATS-optimized technical resume, polish your GitHub repositories, and optimize LinkedIn presence.",
        "topics": [
          "Impact-Driven Resume Bullet Points (Action + Context + Quantified Result)",
          "GitHub Profile Readme & Pinned Projects Showcase",
          "Technical Blog Writing & Project Case Studies",
          "LinkedIn Profile Optimization for Technical Recruiters",
          "Elevator Pitch & Portfolio Website"
        ],
        "objectives": [
          "Pass technical screening ATS filters with a 90+ score",
          "Present repositories with clean documentation and demo URLs"
        ],
        "practiceActivities": [
          "Score your resume on PlaceMentor AI’s Resume Builder",
          "Draft technical case studies explaining your design tradeoffs"
        ],
        "practicalTask": "Finalize your tailored Data Engineer resume and publish an open-source GitHub portfolio.",
        "prerequisites": "Stage 7 & 8",
        "estimatedTime": "1-2 Weeks",
        "resources": [
          {
            "title": "Google DeepMind: Machine Learning & AI",
            "url": "https://deepmind.google/discover/blog/",
            "provider": "Google DeepMind",
            "isFree": true
          },
          {
            "title": "Hugging Face Official Documentation",
            "url": "https://huggingface.co/docs",
            "provider": "Hugging Face",
            "isFree": true
          },
          {
            "title": "Scikit-Learn User Guide",
            "url": "https://scikit-learn.org/stable/user_guide.html",
            "provider": "Scikit-Learn",
            "isFree": true
          }
        ],
        "platformLink": {
          "label": "Build ATS Resume",
          "path": "/resume"
        }
      },
      {
        "stageNumber": 10,
        "id": "data-stage-10",
        "title": "Interview Preparation, System Design & Applications",
        "summary": "Ace live technical screening rounds, domain-specific problem solving, system design, and behavioral interviews.",
        "topics": [
          "Top Technical Interview Questions for Data Engineer",
          "System Design & Architectural Tradeoffs",
          "Live Whiteboard / Screen-Share Coding Best Practices",
          "Behavioral Leadership Rounds (STAR Method)",
          "Strategic Job Applications across Campus & Off-Campus Drives"
        ],
        "objectives": [
          "Pass 45-60 minute technical interviews with confidence",
          "Effectively communicate technical tradeoffs to Engineering Managers"
        ],
        "practiceActivities": [
          "Conduct at least 3 AI Mock Technical Interviews on PlaceMentor AI",
          "Apply to 20+ verified opportunities on the Jobs Portal"
        ],
        "practicalTask": "Complete a full mock technical interview panel for Data Engineer and apply to verified companies hiring in India.",
        "prerequisites": "Stages 1 through 9",
        "estimatedTime": "3-4 Weeks",
        "resources": [
          {
            "title": "Google DeepMind: Machine Learning & AI",
            "url": "https://deepmind.google/discover/blog/",
            "provider": "Google DeepMind",
            "isFree": true
          },
          {
            "title": "Hugging Face Official Documentation",
            "url": "https://huggingface.co/docs",
            "provider": "Hugging Face",
            "isFree": true
          },
          {
            "title": "Scikit-Learn User Guide",
            "url": "https://scikit-learn.org/stable/user_guide.html",
            "provider": "Scikit-Learn",
            "isFree": true
          }
        ],
        "platformLink": {
          "label": "Take AI Mock Interview for Data Engineer",
          "path": "/interview"
        }
      }
    ]
  },
  {
    "id": "cloud-engineer",
    "title": "Cloud Engineer",
    "category": "Cloud, Security & Testing",
    "difficulty": "Intermediate",
    "duration": "6-7 Months",
    "icon": "Cloud",
    "color": "primary",
    "prerequisites": "Networking fundamentals, Linux command line",
    "technologies": [
      "AWS (EC2, S3, RDS, Lambda, VPC, IAM)",
      "Terraform (IaC)",
      "Docker",
      "CloudWatch",
      "CloudFormation",
      "Networking & Subnets",
      "Linux"
    ],
    "shortDescription": "Architect, provision, secure, and manage highly available multi-region cloud infrastructures across AWS and Azure.",
    "overview": "Cloud Engineers design resilient cloud architectures that deliver 99.99% uptime, elastic auto-scaling, tight IAM security perimeters, and cost-efficient cloud resources.",
    "stages": [
      {
        "stageNumber": 1,
        "id": "clou-stage-1",
        "title": "Prerequisites & CS Fundamentals for Cloud Engineer",
        "summary": "Core theoretical and structural computer science prerequisites required to excel in Cloud Engineer.",
        "topics": [
          "Operating Systems & Memory Hierarchy",
          "Networking Fundamentals & Protocol Layers",
          "Boolean Logic & Discrete Mathematics",
          "Version Control with Git & GitHub",
          "Command Line Interface (CLI) Mastery"
        ],
        "objectives": [
          "Establish clear understanding of computational concepts essential for Cloud Engineer",
          "Configure professional development terminal environments",
          "Understand system architecture basics"
        ],
        "practiceActivities": [
          "Complete 10 Linux terminal navigation exercises",
          "Diagram a client-server transaction flow"
        ],
        "practicalTask": "Initialize a development workspace with Git, secure environment configuration, and project scaffolding for Cloud Engineer.",
        "prerequisites": "None",
        "estimatedTime": "2 Weeks",
        "resources": [
          {
            "title": "AWS Official Getting Started Documentation",
            "url": "https://aws.amazon.com/getting-started/",
            "provider": "Amazon Web Services",
            "isFree": true
          },
          {
            "title": "Docker Official Documentation",
            "url": "https://docs.docker.com/",
            "provider": "Docker Inc.",
            "isFree": true
          },
          {
            "title": "Kubernetes Official Documentation",
            "url": "https://kubernetes.io/docs/home/",
            "provider": "CNCF",
            "isFree": true
          }
        ],
        "platformLink": null
      },
      {
        "stageNumber": 2,
        "id": "clou-stage-2",
        "title": "Core Languages & Foundations (AWS (EC2, S3, RDS, Lambda, VPC, IAM), Terraform (IaC), Docker, CloudWatch)",
        "summary": "Develop deep syntactic and operational mastery of primary programming tools used in Cloud Engineer.",
        "topics": [
          "Syntax, Control Flow, and Data Types",
          "Object-Oriented Programming (OOP) vs Functional Paradigms",
          "Error Handling, Exceptions, and Defensive Coding",
          "Memory Management and Garbage Collection",
          "Modular Code Structure & Package Management"
        ],
        "objectives": [
          "Write production-standard code in core languages utilized by Cloud Engineer",
          "Handle exceptions and edge cases with clean architecture"
        ],
        "practiceActivities": [
          "Write 15 standalone algorithmic functions with unit tests",
          "Implement custom class hierarchies demonstrating inheritance & polymorphism"
        ],
        "practicalTask": "Develop a robust CLI automation utility or foundational service utilizing AWS (EC2, S3, RDS, Lambda, VPC, IAM), Terraform (IaC), Docker, CloudWatch.",
        "prerequisites": "Stage 1",
        "estimatedTime": "3 Weeks",
        "resources": [
          {
            "title": "AWS Official Getting Started Documentation",
            "url": "https://aws.amazon.com/getting-started/",
            "provider": "Amazon Web Services",
            "isFree": true
          },
          {
            "title": "Docker Official Documentation",
            "url": "https://docs.docker.com/",
            "provider": "Docker Inc.",
            "isFree": true
          },
          {
            "title": "Kubernetes Official Documentation",
            "url": "https://kubernetes.io/docs/home/",
            "provider": "CNCF",
            "isFree": true
          }
        ],
        "platformLink": {
          "label": "Practice AWS (EC2 Coding",
          "path": "/coding"
        }
      },
      {
        "stageNumber": 3,
        "id": "clou-stage-3",
        "title": "Role-Specific Technical Skills & Core Frameworks",
        "summary": "Master specialized domain frameworks, libraries, protocols, and standard patterns for Cloud Engineer.",
        "topics": [
          "Primary Cloud Engineer Frameworks & Libraries",
          "Data Validation & Pipeline Architecture",
          "API Integration & Protocol Handlers",
          "Configuration Management & Environment Parity",
          "Security Best Practices & Threat Mitigation"
        ],
        "objectives": [
          "Build end-to-end features adhering to modern Cloud Engineer industry standards",
          "Apply design patterns tailored to the role"
        ],
        "practiceActivities": [
          "Build a working proof-of-concept module utilizing standard industry frameworks",
          "Audit a code repository for performance bottlenecks"
        ],
        "practicalTask": "Construct a fully functional core service module demonstrating Cloud Engineer competencies.",
        "prerequisites": "Stage 2",
        "estimatedTime": "3-4 Weeks",
        "resources": [
          {
            "title": "AWS Official Getting Started Documentation",
            "url": "https://aws.amazon.com/getting-started/",
            "provider": "Amazon Web Services",
            "isFree": true
          },
          {
            "title": "Docker Official Documentation",
            "url": "https://docs.docker.com/",
            "provider": "Docker Inc.",
            "isFree": true
          },
          {
            "title": "Kubernetes Official Documentation",
            "url": "https://kubernetes.io/docs/home/",
            "provider": "CNCF",
            "isFree": true
          }
        ],
        "platformLink": null
      },
      {
        "stageNumber": 4,
        "id": "clou-stage-4",
        "title": "Data Structures, Algorithms & Problem Solving",
        "summary": "Targeted algorithmic problem solving, computational complexity, and data structures relevant to Cloud Engineer.",
        "topics": [
          "Arrays, Hash Maps, Linked Lists, and Stacks/Queues",
          "Trees, Graphs, and Breadth-First / Depth-First Traversal",
          "Searching, Sorting, and Binary Search",
          "Greedy Algorithms and Dynamic Programming Patterns",
          "Time & Space Complexity Tradeoff Analysis"
        ],
        "objectives": [
          "Confidently solve technical coding screening assessments",
          "Evaluate algorithm performance using Big-O notation"
        ],
        "practiceActivities": [
          "Solve 40 LeetCode Easy & Medium problems in your primary language",
          "Analyze space and time complexity for critical routines"
        ],
        "practicalTask": "Implement an optimized search, sort, and cache routine for domain-specific data structures.",
        "prerequisites": "Stage 2 & 3",
        "estimatedTime": "3 Weeks",
        "resources": [
          {
            "title": "AWS Official Getting Started Documentation",
            "url": "https://aws.amazon.com/getting-started/",
            "provider": "Amazon Web Services",
            "isFree": true
          },
          {
            "title": "Docker Official Documentation",
            "url": "https://docs.docker.com/",
            "provider": "Docker Inc.",
            "isFree": true
          },
          {
            "title": "Kubernetes Official Documentation",
            "url": "https://kubernetes.io/docs/home/",
            "provider": "CNCF",
            "isFree": true
          }
        ],
        "platformLink": {
          "label": "Solve Coding Problems",
          "path": "/coding"
        }
      },
      {
        "stageNumber": 5,
        "id": "clou-stage-5",
        "title": "Tools, Platforms & Development Workflow",
        "summary": "Professional tooling, containerization, automated testing, and CI/CD pipelines for Cloud Engineer.",
        "topics": [
          "Docker Containerization & Multi-Stage Builds",
          "Automated Testing (Unit, Integration, End-to-End)",
          "CI/CD Pipeline Automation (GitHub Actions)",
          "Cloud Infrastructure & Deployment Services",
          "Observability, Logging, and Monitoring"
        ],
        "objectives": [
          "Automate build, test, and release cycles",
          "Containerize applications for reproducible environments"
        ],
        "practiceActivities": [
          "Write a Dockerfile and docker-compose.yml configuration",
          "Create a GitHub Actions workflow to run automated tests on every push"
        ],
        "practicalTask": "Configure a continuous deployment pipeline with automated testing for a Cloud Engineer project.",
        "prerequisites": "Stage 3",
        "estimatedTime": "2 Weeks",
        "resources": [
          {
            "title": "AWS Official Getting Started Documentation",
            "url": "https://aws.amazon.com/getting-started/",
            "provider": "Amazon Web Services",
            "isFree": true
          },
          {
            "title": "Docker Official Documentation",
            "url": "https://docs.docker.com/",
            "provider": "Docker Inc.",
            "isFree": true
          },
          {
            "title": "Kubernetes Official Documentation",
            "url": "https://kubernetes.io/docs/home/",
            "provider": "CNCF",
            "isFree": true
          }
        ],
        "platformLink": null
      },
      {
        "stageNumber": 6,
        "id": "clou-stage-6",
        "title": "Guided Practice & Applied Exercises",
        "summary": "Solve realistic industry exercises, build architectural prototypes, and practice technical challenges.",
        "topics": [
          "Real-world Architectural Case Studies",
          "Debugging Complex Multi-Component Failures",
          "Performance Profiling & Bottleneck Resolution",
          "Data Consistency & Fault Tolerance",
          "Clean Code & Refactoring Patterns"
        ],
        "objectives": [
          "Handle unexpected system degradation and identify root causes",
          "Refactor legacy codebase into clean, testable architecture"
        ],
        "practiceActivities": [
          "Debug and resolve 5 intentionally broken code repositories",
          "Conduct benchmark performance profiling"
        ],
        "practicalTask": "Complete a 3-hour simulated take-home engineering assessment.",
        "prerequisites": "Stage 4 & 5",
        "estimatedTime": "2-3 Weeks",
        "resources": [
          {
            "title": "AWS Official Getting Started Documentation",
            "url": "https://aws.amazon.com/getting-started/",
            "provider": "Amazon Web Services",
            "isFree": true
          },
          {
            "title": "Docker Official Documentation",
            "url": "https://docs.docker.com/",
            "provider": "Docker Inc.",
            "isFree": true
          },
          {
            "title": "Kubernetes Official Documentation",
            "url": "https://kubernetes.io/docs/home/",
            "provider": "CNCF",
            "isFree": true
          }
        ],
        "platformLink": {
          "label": "Run Aptitude & Practice Tests",
          "path": "/aptitude"
        }
      },
      {
        "stageNumber": 7,
        "id": "clou-stage-7",
        "title": "Beginner Capstone Project",
        "summary": "Synthesize your learning into a functional, standalone, production-ready beginner project.",
        "topics": [
          "Project Scaffolding & Architecture",
          "Implementing Core Business Logic",
          "Data Persistence & State Management",
          "Automated Test Coverage",
          "Public Deployment & Documentation"
        ],
        "objectives": [
          "Deliver a working, deployed application from scratch",
          "Document setup instructions and architectural decisions in README"
        ],
        "practiceActivities": [
          "Set up automated GitHub Actions deployment",
          "Write comprehensive unit tests for all business logic"
        ],
        "practicalTask": "Build and deploy a complete functional starter project for Cloud Engineer with live documentation and public repository.",
        "prerequisites": "Stage 3 & 5",
        "estimatedTime": "2-3 Weeks",
        "resources": [
          {
            "title": "AWS Official Getting Started Documentation",
            "url": "https://aws.amazon.com/getting-started/",
            "provider": "Amazon Web Services",
            "isFree": true
          },
          {
            "title": "Docker Official Documentation",
            "url": "https://docs.docker.com/",
            "provider": "Docker Inc.",
            "isFree": true
          },
          {
            "title": "Kubernetes Official Documentation",
            "url": "https://kubernetes.io/docs/home/",
            "provider": "CNCF",
            "isFree": true
          }
        ],
        "platformLink": null
      },
      {
        "stageNumber": 8,
        "id": "clou-stage-8",
        "title": "Intermediate / Portfolio Flagship Project",
        "summary": "Engineer a high-impact, feature-rich portfolio flagship project that stands out to hiring managers.",
        "topics": [
          "Complex Architecture & Multi-Service Integration",
          "Scalability, Caching, and Fault Tolerance",
          "Security Hardening & Role Authorization",
          "Comprehensive Test Coverage (Unit + E2E)",
          "Professional Documentation & Video Walkthrough"
        ],
        "objectives": [
          "Demonstrate professional-level software engineering capability",
          "Present clean system design and quantitative performance results"
        ],
        "practiceActivities": [
          "Conduct stress testing and load testing with benchmark tools",
          "Record a 3-minute technical walkthrough video of your project"
        ],
        "practicalTask": "Publish a flagship Cloud Engineer portfolio project with production deployment, live database, and architecture documentation.",
        "prerequisites": "Stage 7",
        "estimatedTime": "3-4 Weeks",
        "resources": [
          {
            "title": "AWS Official Getting Started Documentation",
            "url": "https://aws.amazon.com/getting-started/",
            "provider": "Amazon Web Services",
            "isFree": true
          },
          {
            "title": "Docker Official Documentation",
            "url": "https://docs.docker.com/",
            "provider": "Docker Inc.",
            "isFree": true
          },
          {
            "title": "Kubernetes Official Documentation",
            "url": "https://kubernetes.io/docs/home/",
            "provider": "CNCF",
            "isFree": true
          }
        ],
        "platformLink": null
      },
      {
        "stageNumber": 9,
        "id": "clou-stage-9",
        "title": "Resume, GitHub Portfolio & Professional Presence",
        "summary": "Craft an ATS-optimized technical resume, polish your GitHub repositories, and optimize LinkedIn presence.",
        "topics": [
          "Impact-Driven Resume Bullet Points (Action + Context + Quantified Result)",
          "GitHub Profile Readme & Pinned Projects Showcase",
          "Technical Blog Writing & Project Case Studies",
          "LinkedIn Profile Optimization for Technical Recruiters",
          "Elevator Pitch & Portfolio Website"
        ],
        "objectives": [
          "Pass technical screening ATS filters with a 90+ score",
          "Present repositories with clean documentation and demo URLs"
        ],
        "practiceActivities": [
          "Score your resume on PlaceMentor AI’s Resume Builder",
          "Draft technical case studies explaining your design tradeoffs"
        ],
        "practicalTask": "Finalize your tailored Cloud Engineer resume and publish an open-source GitHub portfolio.",
        "prerequisites": "Stage 7 & 8",
        "estimatedTime": "1-2 Weeks",
        "resources": [
          {
            "title": "AWS Official Getting Started Documentation",
            "url": "https://aws.amazon.com/getting-started/",
            "provider": "Amazon Web Services",
            "isFree": true
          },
          {
            "title": "Docker Official Documentation",
            "url": "https://docs.docker.com/",
            "provider": "Docker Inc.",
            "isFree": true
          },
          {
            "title": "Kubernetes Official Documentation",
            "url": "https://kubernetes.io/docs/home/",
            "provider": "CNCF",
            "isFree": true
          }
        ],
        "platformLink": {
          "label": "Build ATS Resume",
          "path": "/resume"
        }
      },
      {
        "stageNumber": 10,
        "id": "clou-stage-10",
        "title": "Interview Preparation, System Design & Applications",
        "summary": "Ace live technical screening rounds, domain-specific problem solving, system design, and behavioral interviews.",
        "topics": [
          "Top Technical Interview Questions for Cloud Engineer",
          "System Design & Architectural Tradeoffs",
          "Live Whiteboard / Screen-Share Coding Best Practices",
          "Behavioral Leadership Rounds (STAR Method)",
          "Strategic Job Applications across Campus & Off-Campus Drives"
        ],
        "objectives": [
          "Pass 45-60 minute technical interviews with confidence",
          "Effectively communicate technical tradeoffs to Engineering Managers"
        ],
        "practiceActivities": [
          "Conduct at least 3 AI Mock Technical Interviews on PlaceMentor AI",
          "Apply to 20+ verified opportunities on the Jobs Portal"
        ],
        "practicalTask": "Complete a full mock technical interview panel for Cloud Engineer and apply to verified companies hiring in India.",
        "prerequisites": "Stages 1 through 9",
        "estimatedTime": "3-4 Weeks",
        "resources": [
          {
            "title": "AWS Official Getting Started Documentation",
            "url": "https://aws.amazon.com/getting-started/",
            "provider": "Amazon Web Services",
            "isFree": true
          },
          {
            "title": "Docker Official Documentation",
            "url": "https://docs.docker.com/",
            "provider": "Docker Inc.",
            "isFree": true
          },
          {
            "title": "Kubernetes Official Documentation",
            "url": "https://kubernetes.io/docs/home/",
            "provider": "CNCF",
            "isFree": true
          }
        ],
        "platformLink": {
          "label": "Take AI Mock Interview for Cloud Engineer",
          "path": "/interview"
        }
      }
    ]
  },
  {
    "id": "devops-engineer",
    "title": "DevOps Engineer",
    "category": "Cloud, Security & Testing",
    "difficulty": "Advanced",
    "duration": "7-9 Months",
    "icon": "Repeat",
    "color": "accent",
    "prerequisites": "Linux Administration, Networking, Basic Scripting",
    "technologies": [
      "Linux Internals",
      "Docker",
      "Kubernetes (K8s)",
      "GitHub Actions",
      "Terraform",
      "Prometheus & Grafana",
      "Helm",
      "GitOps",
      "ArgoCD"
    ],
    "shortDescription": "Automate continuous integration and deployment (CI/CD), manage Kubernetes clusters, and build zero-downtime platforms.",
    "overview": "DevOps Engineers unify software development and operations through automated testing, container orchestration with Kubernetes, infrastructure as code, and observability.",
    "stages": [
      {
        "stageNumber": 1,
        "id": "devo-stage-1",
        "title": "Prerequisites & CS Fundamentals for DevOps Engineer",
        "summary": "Core theoretical and structural computer science prerequisites required to excel in DevOps Engineer.",
        "topics": [
          "Operating Systems & Memory Hierarchy",
          "Networking Fundamentals & Protocol Layers",
          "Boolean Logic & Discrete Mathematics",
          "Version Control with Git & GitHub",
          "Command Line Interface (CLI) Mastery"
        ],
        "objectives": [
          "Establish clear understanding of computational concepts essential for DevOps Engineer",
          "Configure professional development terminal environments",
          "Understand system architecture basics"
        ],
        "practiceActivities": [
          "Complete 10 Linux terminal navigation exercises",
          "Diagram a client-server transaction flow"
        ],
        "practicalTask": "Initialize a development workspace with Git, secure environment configuration, and project scaffolding for DevOps Engineer.",
        "prerequisites": "None",
        "estimatedTime": "2 Weeks",
        "resources": [
          {
            "title": "AWS Official Getting Started Documentation",
            "url": "https://aws.amazon.com/getting-started/",
            "provider": "Amazon Web Services",
            "isFree": true
          },
          {
            "title": "Docker Official Documentation",
            "url": "https://docs.docker.com/",
            "provider": "Docker Inc.",
            "isFree": true
          },
          {
            "title": "Kubernetes Official Documentation",
            "url": "https://kubernetes.io/docs/home/",
            "provider": "CNCF",
            "isFree": true
          }
        ],
        "platformLink": null
      },
      {
        "stageNumber": 2,
        "id": "devo-stage-2",
        "title": "Core Languages & Foundations (Linux Internals, Docker, Kubernetes (K8s), GitHub Actions)",
        "summary": "Develop deep syntactic and operational mastery of primary programming tools used in DevOps Engineer.",
        "topics": [
          "Syntax, Control Flow, and Data Types",
          "Object-Oriented Programming (OOP) vs Functional Paradigms",
          "Error Handling, Exceptions, and Defensive Coding",
          "Memory Management and Garbage Collection",
          "Modular Code Structure & Package Management"
        ],
        "objectives": [
          "Write production-standard code in core languages utilized by DevOps Engineer",
          "Handle exceptions and edge cases with clean architecture"
        ],
        "practiceActivities": [
          "Write 15 standalone algorithmic functions with unit tests",
          "Implement custom class hierarchies demonstrating inheritance & polymorphism"
        ],
        "practicalTask": "Develop a robust CLI automation utility or foundational service utilizing Linux Internals, Docker, Kubernetes (K8s), GitHub Actions.",
        "prerequisites": "Stage 1",
        "estimatedTime": "3 Weeks",
        "resources": [
          {
            "title": "AWS Official Getting Started Documentation",
            "url": "https://aws.amazon.com/getting-started/",
            "provider": "Amazon Web Services",
            "isFree": true
          },
          {
            "title": "Docker Official Documentation",
            "url": "https://docs.docker.com/",
            "provider": "Docker Inc.",
            "isFree": true
          },
          {
            "title": "Kubernetes Official Documentation",
            "url": "https://kubernetes.io/docs/home/",
            "provider": "CNCF",
            "isFree": true
          }
        ],
        "platformLink": {
          "label": "Practice Linux Internals Coding",
          "path": "/coding"
        }
      },
      {
        "stageNumber": 3,
        "id": "devo-stage-3",
        "title": "Role-Specific Technical Skills & Core Frameworks",
        "summary": "Master specialized domain frameworks, libraries, protocols, and standard patterns for DevOps Engineer.",
        "topics": [
          "Primary DevOps Engineer Frameworks & Libraries",
          "Data Validation & Pipeline Architecture",
          "API Integration & Protocol Handlers",
          "Configuration Management & Environment Parity",
          "Security Best Practices & Threat Mitigation"
        ],
        "objectives": [
          "Build end-to-end features adhering to modern DevOps Engineer industry standards",
          "Apply design patterns tailored to the role"
        ],
        "practiceActivities": [
          "Build a working proof-of-concept module utilizing standard industry frameworks",
          "Audit a code repository for performance bottlenecks"
        ],
        "practicalTask": "Construct a fully functional core service module demonstrating DevOps Engineer competencies.",
        "prerequisites": "Stage 2",
        "estimatedTime": "3-4 Weeks",
        "resources": [
          {
            "title": "AWS Official Getting Started Documentation",
            "url": "https://aws.amazon.com/getting-started/",
            "provider": "Amazon Web Services",
            "isFree": true
          },
          {
            "title": "Docker Official Documentation",
            "url": "https://docs.docker.com/",
            "provider": "Docker Inc.",
            "isFree": true
          },
          {
            "title": "Kubernetes Official Documentation",
            "url": "https://kubernetes.io/docs/home/",
            "provider": "CNCF",
            "isFree": true
          }
        ],
        "platformLink": null
      },
      {
        "stageNumber": 4,
        "id": "devo-stage-4",
        "title": "Data Structures, Algorithms & Problem Solving",
        "summary": "Targeted algorithmic problem solving, computational complexity, and data structures relevant to DevOps Engineer.",
        "topics": [
          "Arrays, Hash Maps, Linked Lists, and Stacks/Queues",
          "Trees, Graphs, and Breadth-First / Depth-First Traversal",
          "Searching, Sorting, and Binary Search",
          "Greedy Algorithms and Dynamic Programming Patterns",
          "Time & Space Complexity Tradeoff Analysis"
        ],
        "objectives": [
          "Confidently solve technical coding screening assessments",
          "Evaluate algorithm performance using Big-O notation"
        ],
        "practiceActivities": [
          "Solve 40 LeetCode Easy & Medium problems in your primary language",
          "Analyze space and time complexity for critical routines"
        ],
        "practicalTask": "Implement an optimized search, sort, and cache routine for domain-specific data structures.",
        "prerequisites": "Stage 2 & 3",
        "estimatedTime": "3 Weeks",
        "resources": [
          {
            "title": "AWS Official Getting Started Documentation",
            "url": "https://aws.amazon.com/getting-started/",
            "provider": "Amazon Web Services",
            "isFree": true
          },
          {
            "title": "Docker Official Documentation",
            "url": "https://docs.docker.com/",
            "provider": "Docker Inc.",
            "isFree": true
          },
          {
            "title": "Kubernetes Official Documentation",
            "url": "https://kubernetes.io/docs/home/",
            "provider": "CNCF",
            "isFree": true
          }
        ],
        "platformLink": {
          "label": "Solve Coding Problems",
          "path": "/coding"
        }
      },
      {
        "stageNumber": 5,
        "id": "devo-stage-5",
        "title": "Tools, Platforms & Development Workflow",
        "summary": "Professional tooling, containerization, automated testing, and CI/CD pipelines for DevOps Engineer.",
        "topics": [
          "Docker Containerization & Multi-Stage Builds",
          "Automated Testing (Unit, Integration, End-to-End)",
          "CI/CD Pipeline Automation (GitHub Actions)",
          "Cloud Infrastructure & Deployment Services",
          "Observability, Logging, and Monitoring"
        ],
        "objectives": [
          "Automate build, test, and release cycles",
          "Containerize applications for reproducible environments"
        ],
        "practiceActivities": [
          "Write a Dockerfile and docker-compose.yml configuration",
          "Create a GitHub Actions workflow to run automated tests on every push"
        ],
        "practicalTask": "Configure a continuous deployment pipeline with automated testing for a DevOps Engineer project.",
        "prerequisites": "Stage 3",
        "estimatedTime": "2 Weeks",
        "resources": [
          {
            "title": "AWS Official Getting Started Documentation",
            "url": "https://aws.amazon.com/getting-started/",
            "provider": "Amazon Web Services",
            "isFree": true
          },
          {
            "title": "Docker Official Documentation",
            "url": "https://docs.docker.com/",
            "provider": "Docker Inc.",
            "isFree": true
          },
          {
            "title": "Kubernetes Official Documentation",
            "url": "https://kubernetes.io/docs/home/",
            "provider": "CNCF",
            "isFree": true
          }
        ],
        "platformLink": null
      },
      {
        "stageNumber": 6,
        "id": "devo-stage-6",
        "title": "Guided Practice & Applied Exercises",
        "summary": "Solve realistic industry exercises, build architectural prototypes, and practice technical challenges.",
        "topics": [
          "Real-world Architectural Case Studies",
          "Debugging Complex Multi-Component Failures",
          "Performance Profiling & Bottleneck Resolution",
          "Data Consistency & Fault Tolerance",
          "Clean Code & Refactoring Patterns"
        ],
        "objectives": [
          "Handle unexpected system degradation and identify root causes",
          "Refactor legacy codebase into clean, testable architecture"
        ],
        "practiceActivities": [
          "Debug and resolve 5 intentionally broken code repositories",
          "Conduct benchmark performance profiling"
        ],
        "practicalTask": "Complete a 3-hour simulated take-home engineering assessment.",
        "prerequisites": "Stage 4 & 5",
        "estimatedTime": "2-3 Weeks",
        "resources": [
          {
            "title": "AWS Official Getting Started Documentation",
            "url": "https://aws.amazon.com/getting-started/",
            "provider": "Amazon Web Services",
            "isFree": true
          },
          {
            "title": "Docker Official Documentation",
            "url": "https://docs.docker.com/",
            "provider": "Docker Inc.",
            "isFree": true
          },
          {
            "title": "Kubernetes Official Documentation",
            "url": "https://kubernetes.io/docs/home/",
            "provider": "CNCF",
            "isFree": true
          }
        ],
        "platformLink": {
          "label": "Run Aptitude & Practice Tests",
          "path": "/aptitude"
        }
      },
      {
        "stageNumber": 7,
        "id": "devo-stage-7",
        "title": "Beginner Capstone Project",
        "summary": "Synthesize your learning into a functional, standalone, production-ready beginner project.",
        "topics": [
          "Project Scaffolding & Architecture",
          "Implementing Core Business Logic",
          "Data Persistence & State Management",
          "Automated Test Coverage",
          "Public Deployment & Documentation"
        ],
        "objectives": [
          "Deliver a working, deployed application from scratch",
          "Document setup instructions and architectural decisions in README"
        ],
        "practiceActivities": [
          "Set up automated GitHub Actions deployment",
          "Write comprehensive unit tests for all business logic"
        ],
        "practicalTask": "Build and deploy a complete functional starter project for DevOps Engineer with live documentation and public repository.",
        "prerequisites": "Stage 3 & 5",
        "estimatedTime": "2-3 Weeks",
        "resources": [
          {
            "title": "AWS Official Getting Started Documentation",
            "url": "https://aws.amazon.com/getting-started/",
            "provider": "Amazon Web Services",
            "isFree": true
          },
          {
            "title": "Docker Official Documentation",
            "url": "https://docs.docker.com/",
            "provider": "Docker Inc.",
            "isFree": true
          },
          {
            "title": "Kubernetes Official Documentation",
            "url": "https://kubernetes.io/docs/home/",
            "provider": "CNCF",
            "isFree": true
          }
        ],
        "platformLink": null
      },
      {
        "stageNumber": 8,
        "id": "devo-stage-8",
        "title": "Intermediate / Portfolio Flagship Project",
        "summary": "Engineer a high-impact, feature-rich portfolio flagship project that stands out to hiring managers.",
        "topics": [
          "Complex Architecture & Multi-Service Integration",
          "Scalability, Caching, and Fault Tolerance",
          "Security Hardening & Role Authorization",
          "Comprehensive Test Coverage (Unit + E2E)",
          "Professional Documentation & Video Walkthrough"
        ],
        "objectives": [
          "Demonstrate professional-level software engineering capability",
          "Present clean system design and quantitative performance results"
        ],
        "practiceActivities": [
          "Conduct stress testing and load testing with benchmark tools",
          "Record a 3-minute technical walkthrough video of your project"
        ],
        "practicalTask": "Publish a flagship DevOps Engineer portfolio project with production deployment, live database, and architecture documentation.",
        "prerequisites": "Stage 7",
        "estimatedTime": "3-4 Weeks",
        "resources": [
          {
            "title": "AWS Official Getting Started Documentation",
            "url": "https://aws.amazon.com/getting-started/",
            "provider": "Amazon Web Services",
            "isFree": true
          },
          {
            "title": "Docker Official Documentation",
            "url": "https://docs.docker.com/",
            "provider": "Docker Inc.",
            "isFree": true
          },
          {
            "title": "Kubernetes Official Documentation",
            "url": "https://kubernetes.io/docs/home/",
            "provider": "CNCF",
            "isFree": true
          }
        ],
        "platformLink": null
      },
      {
        "stageNumber": 9,
        "id": "devo-stage-9",
        "title": "Resume, GitHub Portfolio & Professional Presence",
        "summary": "Craft an ATS-optimized technical resume, polish your GitHub repositories, and optimize LinkedIn presence.",
        "topics": [
          "Impact-Driven Resume Bullet Points (Action + Context + Quantified Result)",
          "GitHub Profile Readme & Pinned Projects Showcase",
          "Technical Blog Writing & Project Case Studies",
          "LinkedIn Profile Optimization for Technical Recruiters",
          "Elevator Pitch & Portfolio Website"
        ],
        "objectives": [
          "Pass technical screening ATS filters with a 90+ score",
          "Present repositories with clean documentation and demo URLs"
        ],
        "practiceActivities": [
          "Score your resume on PlaceMentor AI’s Resume Builder",
          "Draft technical case studies explaining your design tradeoffs"
        ],
        "practicalTask": "Finalize your tailored DevOps Engineer resume and publish an open-source GitHub portfolio.",
        "prerequisites": "Stage 7 & 8",
        "estimatedTime": "1-2 Weeks",
        "resources": [
          {
            "title": "AWS Official Getting Started Documentation",
            "url": "https://aws.amazon.com/getting-started/",
            "provider": "Amazon Web Services",
            "isFree": true
          },
          {
            "title": "Docker Official Documentation",
            "url": "https://docs.docker.com/",
            "provider": "Docker Inc.",
            "isFree": true
          },
          {
            "title": "Kubernetes Official Documentation",
            "url": "https://kubernetes.io/docs/home/",
            "provider": "CNCF",
            "isFree": true
          }
        ],
        "platformLink": {
          "label": "Build ATS Resume",
          "path": "/resume"
        }
      },
      {
        "stageNumber": 10,
        "id": "devo-stage-10",
        "title": "Interview Preparation, System Design & Applications",
        "summary": "Ace live technical screening rounds, domain-specific problem solving, system design, and behavioral interviews.",
        "topics": [
          "Top Technical Interview Questions for DevOps Engineer",
          "System Design & Architectural Tradeoffs",
          "Live Whiteboard / Screen-Share Coding Best Practices",
          "Behavioral Leadership Rounds (STAR Method)",
          "Strategic Job Applications across Campus & Off-Campus Drives"
        ],
        "objectives": [
          "Pass 45-60 minute technical interviews with confidence",
          "Effectively communicate technical tradeoffs to Engineering Managers"
        ],
        "practiceActivities": [
          "Conduct at least 3 AI Mock Technical Interviews on PlaceMentor AI",
          "Apply to 20+ verified opportunities on the Jobs Portal"
        ],
        "practicalTask": "Complete a full mock technical interview panel for DevOps Engineer and apply to verified companies hiring in India.",
        "prerequisites": "Stages 1 through 9",
        "estimatedTime": "3-4 Weeks",
        "resources": [
          {
            "title": "AWS Official Getting Started Documentation",
            "url": "https://aws.amazon.com/getting-started/",
            "provider": "Amazon Web Services",
            "isFree": true
          },
          {
            "title": "Docker Official Documentation",
            "url": "https://docs.docker.com/",
            "provider": "Docker Inc.",
            "isFree": true
          },
          {
            "title": "Kubernetes Official Documentation",
            "url": "https://kubernetes.io/docs/home/",
            "provider": "CNCF",
            "isFree": true
          }
        ],
        "platformLink": {
          "label": "Take AI Mock Interview for DevOps Engineer",
          "path": "/interview"
        }
      }
    ]
  },
  {
    "id": "cybersecurity-analyst",
    "title": "Cybersecurity Analyst",
    "category": "Cloud, Security & Testing",
    "difficulty": "Intermediate",
    "duration": "6-8 Months",
    "icon": "ShieldCheck",
    "color": "secondary",
    "prerequisites": "Networking (TCP/IP, Ports, DNS), Linux, Security curiosity",
    "technologies": [
      "Wireshark",
      "OWASP Top 10",
      "Burp Suite",
      "Kali Linux",
      "SIEM (Splunk / ELK)",
      "Cryptography & PKI",
      "Network Security",
      "Incident Response"
    ],
    "shortDescription": "Protect corporate networks, audit web applications for vulnerabilities, hunt threats, and defend digital infrastructure.",
    "overview": "Cybersecurity Analysts monitor digital assets, detect intrusive attacks, conduct vulnerability assessments, analyze malware, and establish zero-trust security postures.",
    "stages": [
      {
        "stageNumber": 1,
        "id": "cybe-stage-1",
        "title": "Prerequisites & CS Fundamentals for Cybersecurity Analyst",
        "summary": "Core theoretical and structural computer science prerequisites required to excel in Cybersecurity Analyst.",
        "topics": [
          "Operating Systems & Memory Hierarchy",
          "Networking Fundamentals & Protocol Layers",
          "Boolean Logic & Discrete Mathematics",
          "Version Control with Git & GitHub",
          "Command Line Interface (CLI) Mastery"
        ],
        "objectives": [
          "Establish clear understanding of computational concepts essential for Cybersecurity Analyst",
          "Configure professional development terminal environments",
          "Understand system architecture basics"
        ],
        "practiceActivities": [
          "Complete 10 Linux terminal navigation exercises",
          "Diagram a client-server transaction flow"
        ],
        "practicalTask": "Initialize a development workspace with Git, secure environment configuration, and project scaffolding for Cybersecurity Analyst.",
        "prerequisites": "None",
        "estimatedTime": "2 Weeks",
        "resources": [
          {
            "title": "AWS Official Getting Started Documentation",
            "url": "https://aws.amazon.com/getting-started/",
            "provider": "Amazon Web Services",
            "isFree": true
          },
          {
            "title": "Docker Official Documentation",
            "url": "https://docs.docker.com/",
            "provider": "Docker Inc.",
            "isFree": true
          },
          {
            "title": "Kubernetes Official Documentation",
            "url": "https://kubernetes.io/docs/home/",
            "provider": "CNCF",
            "isFree": true
          }
        ],
        "platformLink": null
      },
      {
        "stageNumber": 2,
        "id": "cybe-stage-2",
        "title": "Core Languages & Foundations (Wireshark, OWASP Top 10, Burp Suite, Kali Linux)",
        "summary": "Develop deep syntactic and operational mastery of primary programming tools used in Cybersecurity Analyst.",
        "topics": [
          "Syntax, Control Flow, and Data Types",
          "Object-Oriented Programming (OOP) vs Functional Paradigms",
          "Error Handling, Exceptions, and Defensive Coding",
          "Memory Management and Garbage Collection",
          "Modular Code Structure & Package Management"
        ],
        "objectives": [
          "Write production-standard code in core languages utilized by Cybersecurity Analyst",
          "Handle exceptions and edge cases with clean architecture"
        ],
        "practiceActivities": [
          "Write 15 standalone algorithmic functions with unit tests",
          "Implement custom class hierarchies demonstrating inheritance & polymorphism"
        ],
        "practicalTask": "Develop a robust CLI automation utility or foundational service utilizing Wireshark, OWASP Top 10, Burp Suite, Kali Linux.",
        "prerequisites": "Stage 1",
        "estimatedTime": "3 Weeks",
        "resources": [
          {
            "title": "AWS Official Getting Started Documentation",
            "url": "https://aws.amazon.com/getting-started/",
            "provider": "Amazon Web Services",
            "isFree": true
          },
          {
            "title": "Docker Official Documentation",
            "url": "https://docs.docker.com/",
            "provider": "Docker Inc.",
            "isFree": true
          },
          {
            "title": "Kubernetes Official Documentation",
            "url": "https://kubernetes.io/docs/home/",
            "provider": "CNCF",
            "isFree": true
          }
        ],
        "platformLink": {
          "label": "Practice Wireshark Coding",
          "path": "/coding"
        }
      },
      {
        "stageNumber": 3,
        "id": "cybe-stage-3",
        "title": "Role-Specific Technical Skills & Core Frameworks",
        "summary": "Master specialized domain frameworks, libraries, protocols, and standard patterns for Cybersecurity Analyst.",
        "topics": [
          "Primary Cybersecurity Analyst Frameworks & Libraries",
          "Data Validation & Pipeline Architecture",
          "API Integration & Protocol Handlers",
          "Configuration Management & Environment Parity",
          "Security Best Practices & Threat Mitigation"
        ],
        "objectives": [
          "Build end-to-end features adhering to modern Cybersecurity Analyst industry standards",
          "Apply design patterns tailored to the role"
        ],
        "practiceActivities": [
          "Build a working proof-of-concept module utilizing standard industry frameworks",
          "Audit a code repository for performance bottlenecks"
        ],
        "practicalTask": "Construct a fully functional core service module demonstrating Cybersecurity Analyst competencies.",
        "prerequisites": "Stage 2",
        "estimatedTime": "3-4 Weeks",
        "resources": [
          {
            "title": "AWS Official Getting Started Documentation",
            "url": "https://aws.amazon.com/getting-started/",
            "provider": "Amazon Web Services",
            "isFree": true
          },
          {
            "title": "Docker Official Documentation",
            "url": "https://docs.docker.com/",
            "provider": "Docker Inc.",
            "isFree": true
          },
          {
            "title": "Kubernetes Official Documentation",
            "url": "https://kubernetes.io/docs/home/",
            "provider": "CNCF",
            "isFree": true
          }
        ],
        "platformLink": null
      },
      {
        "stageNumber": 4,
        "id": "cybe-stage-4",
        "title": "Data Structures, Algorithms & Problem Solving",
        "summary": "Targeted algorithmic problem solving, computational complexity, and data structures relevant to Cybersecurity Analyst.",
        "topics": [
          "Arrays, Hash Maps, Linked Lists, and Stacks/Queues",
          "Trees, Graphs, and Breadth-First / Depth-First Traversal",
          "Searching, Sorting, and Binary Search",
          "Greedy Algorithms and Dynamic Programming Patterns",
          "Time & Space Complexity Tradeoff Analysis"
        ],
        "objectives": [
          "Confidently solve technical coding screening assessments",
          "Evaluate algorithm performance using Big-O notation"
        ],
        "practiceActivities": [
          "Solve 40 LeetCode Easy & Medium problems in your primary language",
          "Analyze space and time complexity for critical routines"
        ],
        "practicalTask": "Implement an optimized search, sort, and cache routine for domain-specific data structures.",
        "prerequisites": "Stage 2 & 3",
        "estimatedTime": "3 Weeks",
        "resources": [
          {
            "title": "AWS Official Getting Started Documentation",
            "url": "https://aws.amazon.com/getting-started/",
            "provider": "Amazon Web Services",
            "isFree": true
          },
          {
            "title": "Docker Official Documentation",
            "url": "https://docs.docker.com/",
            "provider": "Docker Inc.",
            "isFree": true
          },
          {
            "title": "Kubernetes Official Documentation",
            "url": "https://kubernetes.io/docs/home/",
            "provider": "CNCF",
            "isFree": true
          }
        ],
        "platformLink": {
          "label": "Solve Coding Problems",
          "path": "/coding"
        }
      },
      {
        "stageNumber": 5,
        "id": "cybe-stage-5",
        "title": "Tools, Platforms & Development Workflow",
        "summary": "Professional tooling, containerization, automated testing, and CI/CD pipelines for Cybersecurity Analyst.",
        "topics": [
          "Docker Containerization & Multi-Stage Builds",
          "Automated Testing (Unit, Integration, End-to-End)",
          "CI/CD Pipeline Automation (GitHub Actions)",
          "Cloud Infrastructure & Deployment Services",
          "Observability, Logging, and Monitoring"
        ],
        "objectives": [
          "Automate build, test, and release cycles",
          "Containerize applications for reproducible environments"
        ],
        "practiceActivities": [
          "Write a Dockerfile and docker-compose.yml configuration",
          "Create a GitHub Actions workflow to run automated tests on every push"
        ],
        "practicalTask": "Configure a continuous deployment pipeline with automated testing for a Cybersecurity Analyst project.",
        "prerequisites": "Stage 3",
        "estimatedTime": "2 Weeks",
        "resources": [
          {
            "title": "AWS Official Getting Started Documentation",
            "url": "https://aws.amazon.com/getting-started/",
            "provider": "Amazon Web Services",
            "isFree": true
          },
          {
            "title": "Docker Official Documentation",
            "url": "https://docs.docker.com/",
            "provider": "Docker Inc.",
            "isFree": true
          },
          {
            "title": "Kubernetes Official Documentation",
            "url": "https://kubernetes.io/docs/home/",
            "provider": "CNCF",
            "isFree": true
          }
        ],
        "platformLink": null
      },
      {
        "stageNumber": 6,
        "id": "cybe-stage-6",
        "title": "Guided Practice & Applied Exercises",
        "summary": "Solve realistic industry exercises, build architectural prototypes, and practice technical challenges.",
        "topics": [
          "Real-world Architectural Case Studies",
          "Debugging Complex Multi-Component Failures",
          "Performance Profiling & Bottleneck Resolution",
          "Data Consistency & Fault Tolerance",
          "Clean Code & Refactoring Patterns"
        ],
        "objectives": [
          "Handle unexpected system degradation and identify root causes",
          "Refactor legacy codebase into clean, testable architecture"
        ],
        "practiceActivities": [
          "Debug and resolve 5 intentionally broken code repositories",
          "Conduct benchmark performance profiling"
        ],
        "practicalTask": "Complete a 3-hour simulated take-home engineering assessment.",
        "prerequisites": "Stage 4 & 5",
        "estimatedTime": "2-3 Weeks",
        "resources": [
          {
            "title": "AWS Official Getting Started Documentation",
            "url": "https://aws.amazon.com/getting-started/",
            "provider": "Amazon Web Services",
            "isFree": true
          },
          {
            "title": "Docker Official Documentation",
            "url": "https://docs.docker.com/",
            "provider": "Docker Inc.",
            "isFree": true
          },
          {
            "title": "Kubernetes Official Documentation",
            "url": "https://kubernetes.io/docs/home/",
            "provider": "CNCF",
            "isFree": true
          }
        ],
        "platformLink": {
          "label": "Run Aptitude & Practice Tests",
          "path": "/aptitude"
        }
      },
      {
        "stageNumber": 7,
        "id": "cybe-stage-7",
        "title": "Beginner Capstone Project",
        "summary": "Synthesize your learning into a functional, standalone, production-ready beginner project.",
        "topics": [
          "Project Scaffolding & Architecture",
          "Implementing Core Business Logic",
          "Data Persistence & State Management",
          "Automated Test Coverage",
          "Public Deployment & Documentation"
        ],
        "objectives": [
          "Deliver a working, deployed application from scratch",
          "Document setup instructions and architectural decisions in README"
        ],
        "practiceActivities": [
          "Set up automated GitHub Actions deployment",
          "Write comprehensive unit tests for all business logic"
        ],
        "practicalTask": "Build and deploy a complete functional starter project for Cybersecurity Analyst with live documentation and public repository.",
        "prerequisites": "Stage 3 & 5",
        "estimatedTime": "2-3 Weeks",
        "resources": [
          {
            "title": "AWS Official Getting Started Documentation",
            "url": "https://aws.amazon.com/getting-started/",
            "provider": "Amazon Web Services",
            "isFree": true
          },
          {
            "title": "Docker Official Documentation",
            "url": "https://docs.docker.com/",
            "provider": "Docker Inc.",
            "isFree": true
          },
          {
            "title": "Kubernetes Official Documentation",
            "url": "https://kubernetes.io/docs/home/",
            "provider": "CNCF",
            "isFree": true
          }
        ],
        "platformLink": null
      },
      {
        "stageNumber": 8,
        "id": "cybe-stage-8",
        "title": "Intermediate / Portfolio Flagship Project",
        "summary": "Engineer a high-impact, feature-rich portfolio flagship project that stands out to hiring managers.",
        "topics": [
          "Complex Architecture & Multi-Service Integration",
          "Scalability, Caching, and Fault Tolerance",
          "Security Hardening & Role Authorization",
          "Comprehensive Test Coverage (Unit + E2E)",
          "Professional Documentation & Video Walkthrough"
        ],
        "objectives": [
          "Demonstrate professional-level software engineering capability",
          "Present clean system design and quantitative performance results"
        ],
        "practiceActivities": [
          "Conduct stress testing and load testing with benchmark tools",
          "Record a 3-minute technical walkthrough video of your project"
        ],
        "practicalTask": "Publish a flagship Cybersecurity Analyst portfolio project with production deployment, live database, and architecture documentation.",
        "prerequisites": "Stage 7",
        "estimatedTime": "3-4 Weeks",
        "resources": [
          {
            "title": "AWS Official Getting Started Documentation",
            "url": "https://aws.amazon.com/getting-started/",
            "provider": "Amazon Web Services",
            "isFree": true
          },
          {
            "title": "Docker Official Documentation",
            "url": "https://docs.docker.com/",
            "provider": "Docker Inc.",
            "isFree": true
          },
          {
            "title": "Kubernetes Official Documentation",
            "url": "https://kubernetes.io/docs/home/",
            "provider": "CNCF",
            "isFree": true
          }
        ],
        "platformLink": null
      },
      {
        "stageNumber": 9,
        "id": "cybe-stage-9",
        "title": "Resume, GitHub Portfolio & Professional Presence",
        "summary": "Craft an ATS-optimized technical resume, polish your GitHub repositories, and optimize LinkedIn presence.",
        "topics": [
          "Impact-Driven Resume Bullet Points (Action + Context + Quantified Result)",
          "GitHub Profile Readme & Pinned Projects Showcase",
          "Technical Blog Writing & Project Case Studies",
          "LinkedIn Profile Optimization for Technical Recruiters",
          "Elevator Pitch & Portfolio Website"
        ],
        "objectives": [
          "Pass technical screening ATS filters with a 90+ score",
          "Present repositories with clean documentation and demo URLs"
        ],
        "practiceActivities": [
          "Score your resume on PlaceMentor AI’s Resume Builder",
          "Draft technical case studies explaining your design tradeoffs"
        ],
        "practicalTask": "Finalize your tailored Cybersecurity Analyst resume and publish an open-source GitHub portfolio.",
        "prerequisites": "Stage 7 & 8",
        "estimatedTime": "1-2 Weeks",
        "resources": [
          {
            "title": "AWS Official Getting Started Documentation",
            "url": "https://aws.amazon.com/getting-started/",
            "provider": "Amazon Web Services",
            "isFree": true
          },
          {
            "title": "Docker Official Documentation",
            "url": "https://docs.docker.com/",
            "provider": "Docker Inc.",
            "isFree": true
          },
          {
            "title": "Kubernetes Official Documentation",
            "url": "https://kubernetes.io/docs/home/",
            "provider": "CNCF",
            "isFree": true
          }
        ],
        "platformLink": {
          "label": "Build ATS Resume",
          "path": "/resume"
        }
      },
      {
        "stageNumber": 10,
        "id": "cybe-stage-10",
        "title": "Interview Preparation, System Design & Applications",
        "summary": "Ace live technical screening rounds, domain-specific problem solving, system design, and behavioral interviews.",
        "topics": [
          "Top Technical Interview Questions for Cybersecurity Analyst",
          "System Design & Architectural Tradeoffs",
          "Live Whiteboard / Screen-Share Coding Best Practices",
          "Behavioral Leadership Rounds (STAR Method)",
          "Strategic Job Applications across Campus & Off-Campus Drives"
        ],
        "objectives": [
          "Pass 45-60 minute technical interviews with confidence",
          "Effectively communicate technical tradeoffs to Engineering Managers"
        ],
        "practiceActivities": [
          "Conduct at least 3 AI Mock Technical Interviews on PlaceMentor AI",
          "Apply to 20+ verified opportunities on the Jobs Portal"
        ],
        "practicalTask": "Complete a full mock technical interview panel for Cybersecurity Analyst and apply to verified companies hiring in India.",
        "prerequisites": "Stages 1 through 9",
        "estimatedTime": "3-4 Weeks",
        "resources": [
          {
            "title": "AWS Official Getting Started Documentation",
            "url": "https://aws.amazon.com/getting-started/",
            "provider": "Amazon Web Services",
            "isFree": true
          },
          {
            "title": "Docker Official Documentation",
            "url": "https://docs.docker.com/",
            "provider": "Docker Inc.",
            "isFree": true
          },
          {
            "title": "Kubernetes Official Documentation",
            "url": "https://kubernetes.io/docs/home/",
            "provider": "CNCF",
            "isFree": true
          }
        ],
        "platformLink": {
          "label": "Take AI Mock Interview for Cybersecurity Analyst",
          "path": "/interview"
        }
      }
    ]
  },
  {
    "id": "qa-automation-engineer",
    "title": "QA Automation Engineer",
    "category": "Cloud, Security & Testing",
    "difficulty": "Beginner Friendly",
    "duration": "5-6 Months",
    "icon": "CheckSquare",
    "color": "teal",
    "prerequisites": "Basic Programming (Java, JS, or Python), Detail-oriented mindset",
    "technologies": [
      "Selenium WebDriver",
      "Playwright",
      "Cypress",
      "Postman / RestAssured",
      "TestNG / JUnit",
      "Jest",
      "CI/CD Test Pipelines",
      "Bug Tracking"
    ],
    "shortDescription": "Ensure software quality by writing automated test suites, end-to-end browser tests, API tests, and regression pipelines.",
    "overview": "QA Automation Engineers write code that tests code, ensuring zero bugs reach production customers across web, mobile, and API interfaces.",
    "stages": [
      {
        "stageNumber": 1,
        "id": "qaa-stage-1",
        "title": "Prerequisites & CS Fundamentals for QA Automation Engineer",
        "summary": "Core theoretical and structural computer science prerequisites required to excel in QA Automation Engineer.",
        "topics": [
          "Operating Systems & Memory Hierarchy",
          "Networking Fundamentals & Protocol Layers",
          "Boolean Logic & Discrete Mathematics",
          "Version Control with Git & GitHub",
          "Command Line Interface (CLI) Mastery"
        ],
        "objectives": [
          "Establish clear understanding of computational concepts essential for QA Automation Engineer",
          "Configure professional development terminal environments",
          "Understand system architecture basics"
        ],
        "practiceActivities": [
          "Complete 10 Linux terminal navigation exercises",
          "Diagram a client-server transaction flow"
        ],
        "practicalTask": "Initialize a development workspace with Git, secure environment configuration, and project scaffolding for QA Automation Engineer.",
        "prerequisites": "None",
        "estimatedTime": "2 Weeks",
        "resources": [
          {
            "title": "AWS Official Getting Started Documentation",
            "url": "https://aws.amazon.com/getting-started/",
            "provider": "Amazon Web Services",
            "isFree": true
          },
          {
            "title": "Docker Official Documentation",
            "url": "https://docs.docker.com/",
            "provider": "Docker Inc.",
            "isFree": true
          },
          {
            "title": "Kubernetes Official Documentation",
            "url": "https://kubernetes.io/docs/home/",
            "provider": "CNCF",
            "isFree": true
          }
        ],
        "platformLink": null
      },
      {
        "stageNumber": 2,
        "id": "qaa-stage-2",
        "title": "Core Languages & Foundations (Selenium WebDriver, Playwright, Cypress, Postman / RestAssured)",
        "summary": "Develop deep syntactic and operational mastery of primary programming tools used in QA Automation Engineer.",
        "topics": [
          "Syntax, Control Flow, and Data Types",
          "Object-Oriented Programming (OOP) vs Functional Paradigms",
          "Error Handling, Exceptions, and Defensive Coding",
          "Memory Management and Garbage Collection",
          "Modular Code Structure & Package Management"
        ],
        "objectives": [
          "Write production-standard code in core languages utilized by QA Automation Engineer",
          "Handle exceptions and edge cases with clean architecture"
        ],
        "practiceActivities": [
          "Write 15 standalone algorithmic functions with unit tests",
          "Implement custom class hierarchies demonstrating inheritance & polymorphism"
        ],
        "practicalTask": "Develop a robust CLI automation utility or foundational service utilizing Selenium WebDriver, Playwright, Cypress, Postman / RestAssured.",
        "prerequisites": "Stage 1",
        "estimatedTime": "3 Weeks",
        "resources": [
          {
            "title": "AWS Official Getting Started Documentation",
            "url": "https://aws.amazon.com/getting-started/",
            "provider": "Amazon Web Services",
            "isFree": true
          },
          {
            "title": "Docker Official Documentation",
            "url": "https://docs.docker.com/",
            "provider": "Docker Inc.",
            "isFree": true
          },
          {
            "title": "Kubernetes Official Documentation",
            "url": "https://kubernetes.io/docs/home/",
            "provider": "CNCF",
            "isFree": true
          }
        ],
        "platformLink": {
          "label": "Practice Selenium WebDriver Coding",
          "path": "/coding"
        }
      },
      {
        "stageNumber": 3,
        "id": "qaa-stage-3",
        "title": "Role-Specific Technical Skills & Core Frameworks",
        "summary": "Master specialized domain frameworks, libraries, protocols, and standard patterns for QA Automation Engineer.",
        "topics": [
          "Primary QA Automation Engineer Frameworks & Libraries",
          "Data Validation & Pipeline Architecture",
          "API Integration & Protocol Handlers",
          "Configuration Management & Environment Parity",
          "Security Best Practices & Threat Mitigation"
        ],
        "objectives": [
          "Build end-to-end features adhering to modern QA Automation Engineer industry standards",
          "Apply design patterns tailored to the role"
        ],
        "practiceActivities": [
          "Build a working proof-of-concept module utilizing standard industry frameworks",
          "Audit a code repository for performance bottlenecks"
        ],
        "practicalTask": "Construct a fully functional core service module demonstrating QA Automation Engineer competencies.",
        "prerequisites": "Stage 2",
        "estimatedTime": "3-4 Weeks",
        "resources": [
          {
            "title": "AWS Official Getting Started Documentation",
            "url": "https://aws.amazon.com/getting-started/",
            "provider": "Amazon Web Services",
            "isFree": true
          },
          {
            "title": "Docker Official Documentation",
            "url": "https://docs.docker.com/",
            "provider": "Docker Inc.",
            "isFree": true
          },
          {
            "title": "Kubernetes Official Documentation",
            "url": "https://kubernetes.io/docs/home/",
            "provider": "CNCF",
            "isFree": true
          }
        ],
        "platformLink": null
      },
      {
        "stageNumber": 4,
        "id": "qaa-stage-4",
        "title": "Data Structures, Algorithms & Problem Solving",
        "summary": "Targeted algorithmic problem solving, computational complexity, and data structures relevant to QA Automation Engineer.",
        "topics": [
          "Arrays, Hash Maps, Linked Lists, and Stacks/Queues",
          "Trees, Graphs, and Breadth-First / Depth-First Traversal",
          "Searching, Sorting, and Binary Search",
          "Greedy Algorithms and Dynamic Programming Patterns",
          "Time & Space Complexity Tradeoff Analysis"
        ],
        "objectives": [
          "Confidently solve technical coding screening assessments",
          "Evaluate algorithm performance using Big-O notation"
        ],
        "practiceActivities": [
          "Solve 40 LeetCode Easy & Medium problems in your primary language",
          "Analyze space and time complexity for critical routines"
        ],
        "practicalTask": "Implement an optimized search, sort, and cache routine for domain-specific data structures.",
        "prerequisites": "Stage 2 & 3",
        "estimatedTime": "3 Weeks",
        "resources": [
          {
            "title": "AWS Official Getting Started Documentation",
            "url": "https://aws.amazon.com/getting-started/",
            "provider": "Amazon Web Services",
            "isFree": true
          },
          {
            "title": "Docker Official Documentation",
            "url": "https://docs.docker.com/",
            "provider": "Docker Inc.",
            "isFree": true
          },
          {
            "title": "Kubernetes Official Documentation",
            "url": "https://kubernetes.io/docs/home/",
            "provider": "CNCF",
            "isFree": true
          }
        ],
        "platformLink": {
          "label": "Solve Coding Problems",
          "path": "/coding"
        }
      },
      {
        "stageNumber": 5,
        "id": "qaa-stage-5",
        "title": "Tools, Platforms & Development Workflow",
        "summary": "Professional tooling, containerization, automated testing, and CI/CD pipelines for QA Automation Engineer.",
        "topics": [
          "Docker Containerization & Multi-Stage Builds",
          "Automated Testing (Unit, Integration, End-to-End)",
          "CI/CD Pipeline Automation (GitHub Actions)",
          "Cloud Infrastructure & Deployment Services",
          "Observability, Logging, and Monitoring"
        ],
        "objectives": [
          "Automate build, test, and release cycles",
          "Containerize applications for reproducible environments"
        ],
        "practiceActivities": [
          "Write a Dockerfile and docker-compose.yml configuration",
          "Create a GitHub Actions workflow to run automated tests on every push"
        ],
        "practicalTask": "Configure a continuous deployment pipeline with automated testing for a QA Automation Engineer project.",
        "prerequisites": "Stage 3",
        "estimatedTime": "2 Weeks",
        "resources": [
          {
            "title": "AWS Official Getting Started Documentation",
            "url": "https://aws.amazon.com/getting-started/",
            "provider": "Amazon Web Services",
            "isFree": true
          },
          {
            "title": "Docker Official Documentation",
            "url": "https://docs.docker.com/",
            "provider": "Docker Inc.",
            "isFree": true
          },
          {
            "title": "Kubernetes Official Documentation",
            "url": "https://kubernetes.io/docs/home/",
            "provider": "CNCF",
            "isFree": true
          }
        ],
        "platformLink": null
      },
      {
        "stageNumber": 6,
        "id": "qaa-stage-6",
        "title": "Guided Practice & Applied Exercises",
        "summary": "Solve realistic industry exercises, build architectural prototypes, and practice technical challenges.",
        "topics": [
          "Real-world Architectural Case Studies",
          "Debugging Complex Multi-Component Failures",
          "Performance Profiling & Bottleneck Resolution",
          "Data Consistency & Fault Tolerance",
          "Clean Code & Refactoring Patterns"
        ],
        "objectives": [
          "Handle unexpected system degradation and identify root causes",
          "Refactor legacy codebase into clean, testable architecture"
        ],
        "practiceActivities": [
          "Debug and resolve 5 intentionally broken code repositories",
          "Conduct benchmark performance profiling"
        ],
        "practicalTask": "Complete a 3-hour simulated take-home engineering assessment.",
        "prerequisites": "Stage 4 & 5",
        "estimatedTime": "2-3 Weeks",
        "resources": [
          {
            "title": "AWS Official Getting Started Documentation",
            "url": "https://aws.amazon.com/getting-started/",
            "provider": "Amazon Web Services",
            "isFree": true
          },
          {
            "title": "Docker Official Documentation",
            "url": "https://docs.docker.com/",
            "provider": "Docker Inc.",
            "isFree": true
          },
          {
            "title": "Kubernetes Official Documentation",
            "url": "https://kubernetes.io/docs/home/",
            "provider": "CNCF",
            "isFree": true
          }
        ],
        "platformLink": {
          "label": "Run Aptitude & Practice Tests",
          "path": "/aptitude"
        }
      },
      {
        "stageNumber": 7,
        "id": "qaa-stage-7",
        "title": "Beginner Capstone Project",
        "summary": "Synthesize your learning into a functional, standalone, production-ready beginner project.",
        "topics": [
          "Project Scaffolding & Architecture",
          "Implementing Core Business Logic",
          "Data Persistence & State Management",
          "Automated Test Coverage",
          "Public Deployment & Documentation"
        ],
        "objectives": [
          "Deliver a working, deployed application from scratch",
          "Document setup instructions and architectural decisions in README"
        ],
        "practiceActivities": [
          "Set up automated GitHub Actions deployment",
          "Write comprehensive unit tests for all business logic"
        ],
        "practicalTask": "Build and deploy a complete functional starter project for QA Automation Engineer with live documentation and public repository.",
        "prerequisites": "Stage 3 & 5",
        "estimatedTime": "2-3 Weeks",
        "resources": [
          {
            "title": "AWS Official Getting Started Documentation",
            "url": "https://aws.amazon.com/getting-started/",
            "provider": "Amazon Web Services",
            "isFree": true
          },
          {
            "title": "Docker Official Documentation",
            "url": "https://docs.docker.com/",
            "provider": "Docker Inc.",
            "isFree": true
          },
          {
            "title": "Kubernetes Official Documentation",
            "url": "https://kubernetes.io/docs/home/",
            "provider": "CNCF",
            "isFree": true
          }
        ],
        "platformLink": null
      },
      {
        "stageNumber": 8,
        "id": "qaa-stage-8",
        "title": "Intermediate / Portfolio Flagship Project",
        "summary": "Engineer a high-impact, feature-rich portfolio flagship project that stands out to hiring managers.",
        "topics": [
          "Complex Architecture & Multi-Service Integration",
          "Scalability, Caching, and Fault Tolerance",
          "Security Hardening & Role Authorization",
          "Comprehensive Test Coverage (Unit + E2E)",
          "Professional Documentation & Video Walkthrough"
        ],
        "objectives": [
          "Demonstrate professional-level software engineering capability",
          "Present clean system design and quantitative performance results"
        ],
        "practiceActivities": [
          "Conduct stress testing and load testing with benchmark tools",
          "Record a 3-minute technical walkthrough video of your project"
        ],
        "practicalTask": "Publish a flagship QA Automation Engineer portfolio project with production deployment, live database, and architecture documentation.",
        "prerequisites": "Stage 7",
        "estimatedTime": "3-4 Weeks",
        "resources": [
          {
            "title": "AWS Official Getting Started Documentation",
            "url": "https://aws.amazon.com/getting-started/",
            "provider": "Amazon Web Services",
            "isFree": true
          },
          {
            "title": "Docker Official Documentation",
            "url": "https://docs.docker.com/",
            "provider": "Docker Inc.",
            "isFree": true
          },
          {
            "title": "Kubernetes Official Documentation",
            "url": "https://kubernetes.io/docs/home/",
            "provider": "CNCF",
            "isFree": true
          }
        ],
        "platformLink": null
      },
      {
        "stageNumber": 9,
        "id": "qaa-stage-9",
        "title": "Resume, GitHub Portfolio & Professional Presence",
        "summary": "Craft an ATS-optimized technical resume, polish your GitHub repositories, and optimize LinkedIn presence.",
        "topics": [
          "Impact-Driven Resume Bullet Points (Action + Context + Quantified Result)",
          "GitHub Profile Readme & Pinned Projects Showcase",
          "Technical Blog Writing & Project Case Studies",
          "LinkedIn Profile Optimization for Technical Recruiters",
          "Elevator Pitch & Portfolio Website"
        ],
        "objectives": [
          "Pass technical screening ATS filters with a 90+ score",
          "Present repositories with clean documentation and demo URLs"
        ],
        "practiceActivities": [
          "Score your resume on PlaceMentor AI’s Resume Builder",
          "Draft technical case studies explaining your design tradeoffs"
        ],
        "practicalTask": "Finalize your tailored QA Automation Engineer resume and publish an open-source GitHub portfolio.",
        "prerequisites": "Stage 7 & 8",
        "estimatedTime": "1-2 Weeks",
        "resources": [
          {
            "title": "AWS Official Getting Started Documentation",
            "url": "https://aws.amazon.com/getting-started/",
            "provider": "Amazon Web Services",
            "isFree": true
          },
          {
            "title": "Docker Official Documentation",
            "url": "https://docs.docker.com/",
            "provider": "Docker Inc.",
            "isFree": true
          },
          {
            "title": "Kubernetes Official Documentation",
            "url": "https://kubernetes.io/docs/home/",
            "provider": "CNCF",
            "isFree": true
          }
        ],
        "platformLink": {
          "label": "Build ATS Resume",
          "path": "/resume"
        }
      },
      {
        "stageNumber": 10,
        "id": "qaa-stage-10",
        "title": "Interview Preparation, System Design & Applications",
        "summary": "Ace live technical screening rounds, domain-specific problem solving, system design, and behavioral interviews.",
        "topics": [
          "Top Technical Interview Questions for QA Automation Engineer",
          "System Design & Architectural Tradeoffs",
          "Live Whiteboard / Screen-Share Coding Best Practices",
          "Behavioral Leadership Rounds (STAR Method)",
          "Strategic Job Applications across Campus & Off-Campus Drives"
        ],
        "objectives": [
          "Pass 45-60 minute technical interviews with confidence",
          "Effectively communicate technical tradeoffs to Engineering Managers"
        ],
        "practiceActivities": [
          "Conduct at least 3 AI Mock Technical Interviews on PlaceMentor AI",
          "Apply to 20+ verified opportunities on the Jobs Portal"
        ],
        "practicalTask": "Complete a full mock technical interview panel for QA Automation Engineer and apply to verified companies hiring in India.",
        "prerequisites": "Stages 1 through 9",
        "estimatedTime": "3-4 Weeks",
        "resources": [
          {
            "title": "AWS Official Getting Started Documentation",
            "url": "https://aws.amazon.com/getting-started/",
            "provider": "Amazon Web Services",
            "isFree": true
          },
          {
            "title": "Docker Official Documentation",
            "url": "https://docs.docker.com/",
            "provider": "Docker Inc.",
            "isFree": true
          },
          {
            "title": "Kubernetes Official Documentation",
            "url": "https://kubernetes.io/docs/home/",
            "provider": "CNCF",
            "isFree": true
          }
        ],
        "platformLink": {
          "label": "Take AI Mock Interview for QA Automation Engineer",
          "path": "/interview"
        }
      }
    ]
  },
  {
    "id": "site-reliability-engineer",
    "title": "Site Reliability Engineer (SRE)",
    "category": "Cloud, Security & Testing",
    "difficulty": "Advanced",
    "duration": "8-10 Months",
    "icon": "Activity",
    "color": "purple",
    "prerequisites": "Strong Backend programming, OS Internals, Networking",
    "technologies": [
      "Linux Kernel Tuning",
      "Distributed Systems",
      "Kubernetes",
      "Prometheus & OpenTelemetry",
      "SLO / SLI / Error Budgets",
      "Incident Post-Mortems",
      "Chaos Engineering"
    ],
    "shortDescription": "Apply software engineering practices to system operations, ensuring ultra-reliable, high-throughput distributed systems.",
    "overview": "Site Reliability Engineers apply software engineering to solve operational scale challenges, managing latency, reliability, error budgets, and chaos resiliency testing.",
    "stages": [
      {
        "stageNumber": 1,
        "id": "site-stage-1",
        "title": "Prerequisites & CS Fundamentals for Site Reliability Engineer (SRE)",
        "summary": "Core theoretical and structural computer science prerequisites required to excel in Site Reliability Engineer (SRE).",
        "topics": [
          "Operating Systems & Memory Hierarchy",
          "Networking Fundamentals & Protocol Layers",
          "Boolean Logic & Discrete Mathematics",
          "Version Control with Git & GitHub",
          "Command Line Interface (CLI) Mastery"
        ],
        "objectives": [
          "Establish clear understanding of computational concepts essential for Site Reliability Engineer (SRE)",
          "Configure professional development terminal environments",
          "Understand system architecture basics"
        ],
        "practiceActivities": [
          "Complete 10 Linux terminal navigation exercises",
          "Diagram a client-server transaction flow"
        ],
        "practicalTask": "Initialize a development workspace with Git, secure environment configuration, and project scaffolding for Site Reliability Engineer (SRE).",
        "prerequisites": "None",
        "estimatedTime": "2 Weeks",
        "resources": [
          {
            "title": "AWS Official Getting Started Documentation",
            "url": "https://aws.amazon.com/getting-started/",
            "provider": "Amazon Web Services",
            "isFree": true
          },
          {
            "title": "Docker Official Documentation",
            "url": "https://docs.docker.com/",
            "provider": "Docker Inc.",
            "isFree": true
          },
          {
            "title": "Kubernetes Official Documentation",
            "url": "https://kubernetes.io/docs/home/",
            "provider": "CNCF",
            "isFree": true
          }
        ],
        "platformLink": null
      },
      {
        "stageNumber": 2,
        "id": "site-stage-2",
        "title": "Core Languages & Foundations (Linux Kernel Tuning, Distributed Systems, Kubernetes, Prometheus & OpenTelemetry)",
        "summary": "Develop deep syntactic and operational mastery of primary programming tools used in Site Reliability Engineer (SRE).",
        "topics": [
          "Syntax, Control Flow, and Data Types",
          "Object-Oriented Programming (OOP) vs Functional Paradigms",
          "Error Handling, Exceptions, and Defensive Coding",
          "Memory Management and Garbage Collection",
          "Modular Code Structure & Package Management"
        ],
        "objectives": [
          "Write production-standard code in core languages utilized by Site Reliability Engineer (SRE)",
          "Handle exceptions and edge cases with clean architecture"
        ],
        "practiceActivities": [
          "Write 15 standalone algorithmic functions with unit tests",
          "Implement custom class hierarchies demonstrating inheritance & polymorphism"
        ],
        "practicalTask": "Develop a robust CLI automation utility or foundational service utilizing Linux Kernel Tuning, Distributed Systems, Kubernetes, Prometheus & OpenTelemetry.",
        "prerequisites": "Stage 1",
        "estimatedTime": "3 Weeks",
        "resources": [
          {
            "title": "AWS Official Getting Started Documentation",
            "url": "https://aws.amazon.com/getting-started/",
            "provider": "Amazon Web Services",
            "isFree": true
          },
          {
            "title": "Docker Official Documentation",
            "url": "https://docs.docker.com/",
            "provider": "Docker Inc.",
            "isFree": true
          },
          {
            "title": "Kubernetes Official Documentation",
            "url": "https://kubernetes.io/docs/home/",
            "provider": "CNCF",
            "isFree": true
          }
        ],
        "platformLink": {
          "label": "Practice Linux Kernel Tuning Coding",
          "path": "/coding"
        }
      },
      {
        "stageNumber": 3,
        "id": "site-stage-3",
        "title": "Role-Specific Technical Skills & Core Frameworks",
        "summary": "Master specialized domain frameworks, libraries, protocols, and standard patterns for Site Reliability Engineer (SRE).",
        "topics": [
          "Primary Site Reliability Engineer (SRE) Frameworks & Libraries",
          "Data Validation & Pipeline Architecture",
          "API Integration & Protocol Handlers",
          "Configuration Management & Environment Parity",
          "Security Best Practices & Threat Mitigation"
        ],
        "objectives": [
          "Build end-to-end features adhering to modern Site Reliability Engineer (SRE) industry standards",
          "Apply design patterns tailored to the role"
        ],
        "practiceActivities": [
          "Build a working proof-of-concept module utilizing standard industry frameworks",
          "Audit a code repository for performance bottlenecks"
        ],
        "practicalTask": "Construct a fully functional core service module demonstrating Site Reliability Engineer (SRE) competencies.",
        "prerequisites": "Stage 2",
        "estimatedTime": "3-4 Weeks",
        "resources": [
          {
            "title": "AWS Official Getting Started Documentation",
            "url": "https://aws.amazon.com/getting-started/",
            "provider": "Amazon Web Services",
            "isFree": true
          },
          {
            "title": "Docker Official Documentation",
            "url": "https://docs.docker.com/",
            "provider": "Docker Inc.",
            "isFree": true
          },
          {
            "title": "Kubernetes Official Documentation",
            "url": "https://kubernetes.io/docs/home/",
            "provider": "CNCF",
            "isFree": true
          }
        ],
        "platformLink": null
      },
      {
        "stageNumber": 4,
        "id": "site-stage-4",
        "title": "Data Structures, Algorithms & Problem Solving",
        "summary": "Targeted algorithmic problem solving, computational complexity, and data structures relevant to Site Reliability Engineer (SRE).",
        "topics": [
          "Arrays, Hash Maps, Linked Lists, and Stacks/Queues",
          "Trees, Graphs, and Breadth-First / Depth-First Traversal",
          "Searching, Sorting, and Binary Search",
          "Greedy Algorithms and Dynamic Programming Patterns",
          "Time & Space Complexity Tradeoff Analysis"
        ],
        "objectives": [
          "Confidently solve technical coding screening assessments",
          "Evaluate algorithm performance using Big-O notation"
        ],
        "practiceActivities": [
          "Solve 40 LeetCode Easy & Medium problems in your primary language",
          "Analyze space and time complexity for critical routines"
        ],
        "practicalTask": "Implement an optimized search, sort, and cache routine for domain-specific data structures.",
        "prerequisites": "Stage 2 & 3",
        "estimatedTime": "3 Weeks",
        "resources": [
          {
            "title": "AWS Official Getting Started Documentation",
            "url": "https://aws.amazon.com/getting-started/",
            "provider": "Amazon Web Services",
            "isFree": true
          },
          {
            "title": "Docker Official Documentation",
            "url": "https://docs.docker.com/",
            "provider": "Docker Inc.",
            "isFree": true
          },
          {
            "title": "Kubernetes Official Documentation",
            "url": "https://kubernetes.io/docs/home/",
            "provider": "CNCF",
            "isFree": true
          }
        ],
        "platformLink": {
          "label": "Solve Coding Problems",
          "path": "/coding"
        }
      },
      {
        "stageNumber": 5,
        "id": "site-stage-5",
        "title": "Tools, Platforms & Development Workflow",
        "summary": "Professional tooling, containerization, automated testing, and CI/CD pipelines for Site Reliability Engineer (SRE).",
        "topics": [
          "Docker Containerization & Multi-Stage Builds",
          "Automated Testing (Unit, Integration, End-to-End)",
          "CI/CD Pipeline Automation (GitHub Actions)",
          "Cloud Infrastructure & Deployment Services",
          "Observability, Logging, and Monitoring"
        ],
        "objectives": [
          "Automate build, test, and release cycles",
          "Containerize applications for reproducible environments"
        ],
        "practiceActivities": [
          "Write a Dockerfile and docker-compose.yml configuration",
          "Create a GitHub Actions workflow to run automated tests on every push"
        ],
        "practicalTask": "Configure a continuous deployment pipeline with automated testing for a Site Reliability Engineer (SRE) project.",
        "prerequisites": "Stage 3",
        "estimatedTime": "2 Weeks",
        "resources": [
          {
            "title": "AWS Official Getting Started Documentation",
            "url": "https://aws.amazon.com/getting-started/",
            "provider": "Amazon Web Services",
            "isFree": true
          },
          {
            "title": "Docker Official Documentation",
            "url": "https://docs.docker.com/",
            "provider": "Docker Inc.",
            "isFree": true
          },
          {
            "title": "Kubernetes Official Documentation",
            "url": "https://kubernetes.io/docs/home/",
            "provider": "CNCF",
            "isFree": true
          }
        ],
        "platformLink": null
      },
      {
        "stageNumber": 6,
        "id": "site-stage-6",
        "title": "Guided Practice & Applied Exercises",
        "summary": "Solve realistic industry exercises, build architectural prototypes, and practice technical challenges.",
        "topics": [
          "Real-world Architectural Case Studies",
          "Debugging Complex Multi-Component Failures",
          "Performance Profiling & Bottleneck Resolution",
          "Data Consistency & Fault Tolerance",
          "Clean Code & Refactoring Patterns"
        ],
        "objectives": [
          "Handle unexpected system degradation and identify root causes",
          "Refactor legacy codebase into clean, testable architecture"
        ],
        "practiceActivities": [
          "Debug and resolve 5 intentionally broken code repositories",
          "Conduct benchmark performance profiling"
        ],
        "practicalTask": "Complete a 3-hour simulated take-home engineering assessment.",
        "prerequisites": "Stage 4 & 5",
        "estimatedTime": "2-3 Weeks",
        "resources": [
          {
            "title": "AWS Official Getting Started Documentation",
            "url": "https://aws.amazon.com/getting-started/",
            "provider": "Amazon Web Services",
            "isFree": true
          },
          {
            "title": "Docker Official Documentation",
            "url": "https://docs.docker.com/",
            "provider": "Docker Inc.",
            "isFree": true
          },
          {
            "title": "Kubernetes Official Documentation",
            "url": "https://kubernetes.io/docs/home/",
            "provider": "CNCF",
            "isFree": true
          }
        ],
        "platformLink": {
          "label": "Run Aptitude & Practice Tests",
          "path": "/aptitude"
        }
      },
      {
        "stageNumber": 7,
        "id": "site-stage-7",
        "title": "Beginner Capstone Project",
        "summary": "Synthesize your learning into a functional, standalone, production-ready beginner project.",
        "topics": [
          "Project Scaffolding & Architecture",
          "Implementing Core Business Logic",
          "Data Persistence & State Management",
          "Automated Test Coverage",
          "Public Deployment & Documentation"
        ],
        "objectives": [
          "Deliver a working, deployed application from scratch",
          "Document setup instructions and architectural decisions in README"
        ],
        "practiceActivities": [
          "Set up automated GitHub Actions deployment",
          "Write comprehensive unit tests for all business logic"
        ],
        "practicalTask": "Build and deploy a complete functional starter project for Site Reliability Engineer (SRE) with live documentation and public repository.",
        "prerequisites": "Stage 3 & 5",
        "estimatedTime": "2-3 Weeks",
        "resources": [
          {
            "title": "AWS Official Getting Started Documentation",
            "url": "https://aws.amazon.com/getting-started/",
            "provider": "Amazon Web Services",
            "isFree": true
          },
          {
            "title": "Docker Official Documentation",
            "url": "https://docs.docker.com/",
            "provider": "Docker Inc.",
            "isFree": true
          },
          {
            "title": "Kubernetes Official Documentation",
            "url": "https://kubernetes.io/docs/home/",
            "provider": "CNCF",
            "isFree": true
          }
        ],
        "platformLink": null
      },
      {
        "stageNumber": 8,
        "id": "site-stage-8",
        "title": "Intermediate / Portfolio Flagship Project",
        "summary": "Engineer a high-impact, feature-rich portfolio flagship project that stands out to hiring managers.",
        "topics": [
          "Complex Architecture & Multi-Service Integration",
          "Scalability, Caching, and Fault Tolerance",
          "Security Hardening & Role Authorization",
          "Comprehensive Test Coverage (Unit + E2E)",
          "Professional Documentation & Video Walkthrough"
        ],
        "objectives": [
          "Demonstrate professional-level software engineering capability",
          "Present clean system design and quantitative performance results"
        ],
        "practiceActivities": [
          "Conduct stress testing and load testing with benchmark tools",
          "Record a 3-minute technical walkthrough video of your project"
        ],
        "practicalTask": "Publish a flagship Site Reliability Engineer (SRE) portfolio project with production deployment, live database, and architecture documentation.",
        "prerequisites": "Stage 7",
        "estimatedTime": "3-4 Weeks",
        "resources": [
          {
            "title": "AWS Official Getting Started Documentation",
            "url": "https://aws.amazon.com/getting-started/",
            "provider": "Amazon Web Services",
            "isFree": true
          },
          {
            "title": "Docker Official Documentation",
            "url": "https://docs.docker.com/",
            "provider": "Docker Inc.",
            "isFree": true
          },
          {
            "title": "Kubernetes Official Documentation",
            "url": "https://kubernetes.io/docs/home/",
            "provider": "CNCF",
            "isFree": true
          }
        ],
        "platformLink": null
      },
      {
        "stageNumber": 9,
        "id": "site-stage-9",
        "title": "Resume, GitHub Portfolio & Professional Presence",
        "summary": "Craft an ATS-optimized technical resume, polish your GitHub repositories, and optimize LinkedIn presence.",
        "topics": [
          "Impact-Driven Resume Bullet Points (Action + Context + Quantified Result)",
          "GitHub Profile Readme & Pinned Projects Showcase",
          "Technical Blog Writing & Project Case Studies",
          "LinkedIn Profile Optimization for Technical Recruiters",
          "Elevator Pitch & Portfolio Website"
        ],
        "objectives": [
          "Pass technical screening ATS filters with a 90+ score",
          "Present repositories with clean documentation and demo URLs"
        ],
        "practiceActivities": [
          "Score your resume on PlaceMentor AI’s Resume Builder",
          "Draft technical case studies explaining your design tradeoffs"
        ],
        "practicalTask": "Finalize your tailored Site Reliability Engineer (SRE) resume and publish an open-source GitHub portfolio.",
        "prerequisites": "Stage 7 & 8",
        "estimatedTime": "1-2 Weeks",
        "resources": [
          {
            "title": "AWS Official Getting Started Documentation",
            "url": "https://aws.amazon.com/getting-started/",
            "provider": "Amazon Web Services",
            "isFree": true
          },
          {
            "title": "Docker Official Documentation",
            "url": "https://docs.docker.com/",
            "provider": "Docker Inc.",
            "isFree": true
          },
          {
            "title": "Kubernetes Official Documentation",
            "url": "https://kubernetes.io/docs/home/",
            "provider": "CNCF",
            "isFree": true
          }
        ],
        "platformLink": {
          "label": "Build ATS Resume",
          "path": "/resume"
        }
      },
      {
        "stageNumber": 10,
        "id": "site-stage-10",
        "title": "Interview Preparation, System Design & Applications",
        "summary": "Ace live technical screening rounds, domain-specific problem solving, system design, and behavioral interviews.",
        "topics": [
          "Top Technical Interview Questions for Site Reliability Engineer (SRE)",
          "System Design & Architectural Tradeoffs",
          "Live Whiteboard / Screen-Share Coding Best Practices",
          "Behavioral Leadership Rounds (STAR Method)",
          "Strategic Job Applications across Campus & Off-Campus Drives"
        ],
        "objectives": [
          "Pass 45-60 minute technical interviews with confidence",
          "Effectively communicate technical tradeoffs to Engineering Managers"
        ],
        "practiceActivities": [
          "Conduct at least 3 AI Mock Technical Interviews on PlaceMentor AI",
          "Apply to 20+ verified opportunities on the Jobs Portal"
        ],
        "practicalTask": "Complete a full mock technical interview panel for Site Reliability Engineer (SRE) and apply to verified companies hiring in India.",
        "prerequisites": "Stages 1 through 9",
        "estimatedTime": "3-4 Weeks",
        "resources": [
          {
            "title": "AWS Official Getting Started Documentation",
            "url": "https://aws.amazon.com/getting-started/",
            "provider": "Amazon Web Services",
            "isFree": true
          },
          {
            "title": "Docker Official Documentation",
            "url": "https://docs.docker.com/",
            "provider": "Docker Inc.",
            "isFree": true
          },
          {
            "title": "Kubernetes Official Documentation",
            "url": "https://kubernetes.io/docs/home/",
            "provider": "CNCF",
            "isFree": true
          }
        ],
        "platformLink": {
          "label": "Take AI Mock Interview for Site Reliability Engineer (SRE)",
          "path": "/interview"
        }
      }
    ]
  },
  {
    "id": "internship-preparation",
    "title": "College Internship Preparation",
    "category": "Placement Preparation",
    "difficulty": "Beginner Friendly",
    "duration": "3-4 Months",
    "icon": "GraduationCap",
    "color": "primary",
    "prerequisites": "1st, 2nd, 3rd, or 4th Year College Student (All Branches)",
    "technologies": [
      "C++ / Java / Python",
      "Core DSA",
      "DBMS & SQL",
      "OOPs Concepts",
      "Web / App Project",
      "Git & GitHub",
      "ATS Resume",
      "HR Interview"
    ],
    "shortDescription": "Fast-track roadmap designed specifically for college students to crack summer and winter internships at top tech firms.",
    "overview": "Tailored for college students seeking 2026/2027/2028 internships. Focuses on foundational data structures, clean OOPs concepts, an impressive portfolio project, and ATS resume formatting.",
    "stages": [
      {
        "stageNumber": 1,
        "id": "inte-stage-1",
        "title": "Prerequisites & CS Fundamentals for College Internship Preparation",
        "summary": "Core theoretical and structural computer science prerequisites required to excel in College Internship Preparation.",
        "topics": [
          "Operating Systems & Memory Hierarchy",
          "Networking Fundamentals & Protocol Layers",
          "Boolean Logic & Discrete Mathematics",
          "Version Control with Git & GitHub",
          "Command Line Interface (CLI) Mastery"
        ],
        "objectives": [
          "Establish clear understanding of computational concepts essential for College Internship Preparation",
          "Configure professional development terminal environments",
          "Understand system architecture basics"
        ],
        "practiceActivities": [
          "Complete 10 Linux terminal navigation exercises",
          "Diagram a client-server transaction flow"
        ],
        "practicalTask": "Initialize a development workspace with Git, secure environment configuration, and project scaffolding for College Internship Preparation.",
        "prerequisites": "None",
        "estimatedTime": "2 Weeks",
        "resources": [
          {
            "title": "GeeksforGeeks: Campus Placement Preparation",
            "url": "https://www.geeksforgeeks.org/placement-preparation-course/",
            "provider": "GeeksforGeeks",
            "isFree": true
          },
          {
            "title": "IndiaBIX: Quantitative Aptitude & Reasoning",
            "url": "https://www.indiabix.com/",
            "provider": "IndiaBIX",
            "isFree": true
          },
          {
            "title": "LeetCode: Top Interview 150",
            "url": "https://leetcode.com/studyplan/top-interview-150/",
            "provider": "LeetCode",
            "isFree": true
          }
        ],
        "platformLink": null
      },
      {
        "stageNumber": 2,
        "id": "inte-stage-2",
        "title": "Core Languages & Foundations (C++ / Java / Python, Core DSA, DBMS & SQL, OOPs Concepts)",
        "summary": "Develop deep syntactic and operational mastery of primary programming tools used in College Internship Preparation.",
        "topics": [
          "Syntax, Control Flow, and Data Types",
          "Object-Oriented Programming (OOP) vs Functional Paradigms",
          "Error Handling, Exceptions, and Defensive Coding",
          "Memory Management and Garbage Collection",
          "Modular Code Structure & Package Management"
        ],
        "objectives": [
          "Write production-standard code in core languages utilized by College Internship Preparation",
          "Handle exceptions and edge cases with clean architecture"
        ],
        "practiceActivities": [
          "Write 15 standalone algorithmic functions with unit tests",
          "Implement custom class hierarchies demonstrating inheritance & polymorphism"
        ],
        "practicalTask": "Develop a robust CLI automation utility or foundational service utilizing C++ / Java / Python, Core DSA, DBMS & SQL, OOPs Concepts.",
        "prerequisites": "Stage 1",
        "estimatedTime": "3 Weeks",
        "resources": [
          {
            "title": "GeeksforGeeks: Campus Placement Preparation",
            "url": "https://www.geeksforgeeks.org/placement-preparation-course/",
            "provider": "GeeksforGeeks",
            "isFree": true
          },
          {
            "title": "IndiaBIX: Quantitative Aptitude & Reasoning",
            "url": "https://www.indiabix.com/",
            "provider": "IndiaBIX",
            "isFree": true
          },
          {
            "title": "LeetCode: Top Interview 150",
            "url": "https://leetcode.com/studyplan/top-interview-150/",
            "provider": "LeetCode",
            "isFree": true
          }
        ],
        "platformLink": {
          "label": "Practice C++ / Java / Python Coding",
          "path": "/coding"
        }
      },
      {
        "stageNumber": 3,
        "id": "inte-stage-3",
        "title": "Role-Specific Technical Skills & Core Frameworks",
        "summary": "Master specialized domain frameworks, libraries, protocols, and standard patterns for College Internship Preparation.",
        "topics": [
          "Primary College Internship Preparation Frameworks & Libraries",
          "Data Validation & Pipeline Architecture",
          "API Integration & Protocol Handlers",
          "Configuration Management & Environment Parity",
          "Security Best Practices & Threat Mitigation"
        ],
        "objectives": [
          "Build end-to-end features adhering to modern College Internship Preparation industry standards",
          "Apply design patterns tailored to the role"
        ],
        "practiceActivities": [
          "Build a working proof-of-concept module utilizing standard industry frameworks",
          "Audit a code repository for performance bottlenecks"
        ],
        "practicalTask": "Construct a fully functional core service module demonstrating College Internship Preparation competencies.",
        "prerequisites": "Stage 2",
        "estimatedTime": "3-4 Weeks",
        "resources": [
          {
            "title": "GeeksforGeeks: Campus Placement Preparation",
            "url": "https://www.geeksforgeeks.org/placement-preparation-course/",
            "provider": "GeeksforGeeks",
            "isFree": true
          },
          {
            "title": "IndiaBIX: Quantitative Aptitude & Reasoning",
            "url": "https://www.indiabix.com/",
            "provider": "IndiaBIX",
            "isFree": true
          },
          {
            "title": "LeetCode: Top Interview 150",
            "url": "https://leetcode.com/studyplan/top-interview-150/",
            "provider": "LeetCode",
            "isFree": true
          }
        ],
        "platformLink": null
      },
      {
        "stageNumber": 4,
        "id": "inte-stage-4",
        "title": "Data Structures, Algorithms & Problem Solving",
        "summary": "Targeted algorithmic problem solving, computational complexity, and data structures relevant to College Internship Preparation.",
        "topics": [
          "Arrays, Hash Maps, Linked Lists, and Stacks/Queues",
          "Trees, Graphs, and Breadth-First / Depth-First Traversal",
          "Searching, Sorting, and Binary Search",
          "Greedy Algorithms and Dynamic Programming Patterns",
          "Time & Space Complexity Tradeoff Analysis"
        ],
        "objectives": [
          "Confidently solve technical coding screening assessments",
          "Evaluate algorithm performance using Big-O notation"
        ],
        "practiceActivities": [
          "Solve 40 LeetCode Easy & Medium problems in your primary language",
          "Analyze space and time complexity for critical routines"
        ],
        "practicalTask": "Implement an optimized search, sort, and cache routine for domain-specific data structures.",
        "prerequisites": "Stage 2 & 3",
        "estimatedTime": "3 Weeks",
        "resources": [
          {
            "title": "GeeksforGeeks: Campus Placement Preparation",
            "url": "https://www.geeksforgeeks.org/placement-preparation-course/",
            "provider": "GeeksforGeeks",
            "isFree": true
          },
          {
            "title": "IndiaBIX: Quantitative Aptitude & Reasoning",
            "url": "https://www.indiabix.com/",
            "provider": "IndiaBIX",
            "isFree": true
          },
          {
            "title": "LeetCode: Top Interview 150",
            "url": "https://leetcode.com/studyplan/top-interview-150/",
            "provider": "LeetCode",
            "isFree": true
          }
        ],
        "platformLink": {
          "label": "Solve Coding Problems",
          "path": "/coding"
        }
      },
      {
        "stageNumber": 5,
        "id": "inte-stage-5",
        "title": "Tools, Platforms & Development Workflow",
        "summary": "Professional tooling, containerization, automated testing, and CI/CD pipelines for College Internship Preparation.",
        "topics": [
          "Docker Containerization & Multi-Stage Builds",
          "Automated Testing (Unit, Integration, End-to-End)",
          "CI/CD Pipeline Automation (GitHub Actions)",
          "Cloud Infrastructure & Deployment Services",
          "Observability, Logging, and Monitoring"
        ],
        "objectives": [
          "Automate build, test, and release cycles",
          "Containerize applications for reproducible environments"
        ],
        "practiceActivities": [
          "Write a Dockerfile and docker-compose.yml configuration",
          "Create a GitHub Actions workflow to run automated tests on every push"
        ],
        "practicalTask": "Configure a continuous deployment pipeline with automated testing for a College Internship Preparation project.",
        "prerequisites": "Stage 3",
        "estimatedTime": "2 Weeks",
        "resources": [
          {
            "title": "GeeksforGeeks: Campus Placement Preparation",
            "url": "https://www.geeksforgeeks.org/placement-preparation-course/",
            "provider": "GeeksforGeeks",
            "isFree": true
          },
          {
            "title": "IndiaBIX: Quantitative Aptitude & Reasoning",
            "url": "https://www.indiabix.com/",
            "provider": "IndiaBIX",
            "isFree": true
          },
          {
            "title": "LeetCode: Top Interview 150",
            "url": "https://leetcode.com/studyplan/top-interview-150/",
            "provider": "LeetCode",
            "isFree": true
          }
        ],
        "platformLink": null
      },
      {
        "stageNumber": 6,
        "id": "inte-stage-6",
        "title": "Guided Practice & Applied Exercises",
        "summary": "Solve realistic industry exercises, build architectural prototypes, and practice technical challenges.",
        "topics": [
          "Real-world Architectural Case Studies",
          "Debugging Complex Multi-Component Failures",
          "Performance Profiling & Bottleneck Resolution",
          "Data Consistency & Fault Tolerance",
          "Clean Code & Refactoring Patterns"
        ],
        "objectives": [
          "Handle unexpected system degradation and identify root causes",
          "Refactor legacy codebase into clean, testable architecture"
        ],
        "practiceActivities": [
          "Debug and resolve 5 intentionally broken code repositories",
          "Conduct benchmark performance profiling"
        ],
        "practicalTask": "Complete a 3-hour simulated take-home engineering assessment.",
        "prerequisites": "Stage 4 & 5",
        "estimatedTime": "2-3 Weeks",
        "resources": [
          {
            "title": "GeeksforGeeks: Campus Placement Preparation",
            "url": "https://www.geeksforgeeks.org/placement-preparation-course/",
            "provider": "GeeksforGeeks",
            "isFree": true
          },
          {
            "title": "IndiaBIX: Quantitative Aptitude & Reasoning",
            "url": "https://www.indiabix.com/",
            "provider": "IndiaBIX",
            "isFree": true
          },
          {
            "title": "LeetCode: Top Interview 150",
            "url": "https://leetcode.com/studyplan/top-interview-150/",
            "provider": "LeetCode",
            "isFree": true
          }
        ],
        "platformLink": {
          "label": "Run Aptitude & Practice Tests",
          "path": "/aptitude"
        }
      },
      {
        "stageNumber": 7,
        "id": "inte-stage-7",
        "title": "Beginner Capstone Project",
        "summary": "Synthesize your learning into a functional, standalone, production-ready beginner project.",
        "topics": [
          "Project Scaffolding & Architecture",
          "Implementing Core Business Logic",
          "Data Persistence & State Management",
          "Automated Test Coverage",
          "Public Deployment & Documentation"
        ],
        "objectives": [
          "Deliver a working, deployed application from scratch",
          "Document setup instructions and architectural decisions in README"
        ],
        "practiceActivities": [
          "Set up automated GitHub Actions deployment",
          "Write comprehensive unit tests for all business logic"
        ],
        "practicalTask": "Build and deploy a complete functional starter project for College Internship Preparation with live documentation and public repository.",
        "prerequisites": "Stage 3 & 5",
        "estimatedTime": "2-3 Weeks",
        "resources": [
          {
            "title": "GeeksforGeeks: Campus Placement Preparation",
            "url": "https://www.geeksforgeeks.org/placement-preparation-course/",
            "provider": "GeeksforGeeks",
            "isFree": true
          },
          {
            "title": "IndiaBIX: Quantitative Aptitude & Reasoning",
            "url": "https://www.indiabix.com/",
            "provider": "IndiaBIX",
            "isFree": true
          },
          {
            "title": "LeetCode: Top Interview 150",
            "url": "https://leetcode.com/studyplan/top-interview-150/",
            "provider": "LeetCode",
            "isFree": true
          }
        ],
        "platformLink": null
      },
      {
        "stageNumber": 8,
        "id": "inte-stage-8",
        "title": "Intermediate / Portfolio Flagship Project",
        "summary": "Engineer a high-impact, feature-rich portfolio flagship project that stands out to hiring managers.",
        "topics": [
          "Complex Architecture & Multi-Service Integration",
          "Scalability, Caching, and Fault Tolerance",
          "Security Hardening & Role Authorization",
          "Comprehensive Test Coverage (Unit + E2E)",
          "Professional Documentation & Video Walkthrough"
        ],
        "objectives": [
          "Demonstrate professional-level software engineering capability",
          "Present clean system design and quantitative performance results"
        ],
        "practiceActivities": [
          "Conduct stress testing and load testing with benchmark tools",
          "Record a 3-minute technical walkthrough video of your project"
        ],
        "practicalTask": "Publish a flagship College Internship Preparation portfolio project with production deployment, live database, and architecture documentation.",
        "prerequisites": "Stage 7",
        "estimatedTime": "3-4 Weeks",
        "resources": [
          {
            "title": "GeeksforGeeks: Campus Placement Preparation",
            "url": "https://www.geeksforgeeks.org/placement-preparation-course/",
            "provider": "GeeksforGeeks",
            "isFree": true
          },
          {
            "title": "IndiaBIX: Quantitative Aptitude & Reasoning",
            "url": "https://www.indiabix.com/",
            "provider": "IndiaBIX",
            "isFree": true
          },
          {
            "title": "LeetCode: Top Interview 150",
            "url": "https://leetcode.com/studyplan/top-interview-150/",
            "provider": "LeetCode",
            "isFree": true
          }
        ],
        "platformLink": null
      },
      {
        "stageNumber": 9,
        "id": "inte-stage-9",
        "title": "Resume, GitHub Portfolio & Professional Presence",
        "summary": "Craft an ATS-optimized technical resume, polish your GitHub repositories, and optimize LinkedIn presence.",
        "topics": [
          "Impact-Driven Resume Bullet Points (Action + Context + Quantified Result)",
          "GitHub Profile Readme & Pinned Projects Showcase",
          "Technical Blog Writing & Project Case Studies",
          "LinkedIn Profile Optimization for Technical Recruiters",
          "Elevator Pitch & Portfolio Website"
        ],
        "objectives": [
          "Pass technical screening ATS filters with a 90+ score",
          "Present repositories with clean documentation and demo URLs"
        ],
        "practiceActivities": [
          "Score your resume on PlaceMentor AI’s Resume Builder",
          "Draft technical case studies explaining your design tradeoffs"
        ],
        "practicalTask": "Finalize your tailored College Internship Preparation resume and publish an open-source GitHub portfolio.",
        "prerequisites": "Stage 7 & 8",
        "estimatedTime": "1-2 Weeks",
        "resources": [
          {
            "title": "GeeksforGeeks: Campus Placement Preparation",
            "url": "https://www.geeksforgeeks.org/placement-preparation-course/",
            "provider": "GeeksforGeeks",
            "isFree": true
          },
          {
            "title": "IndiaBIX: Quantitative Aptitude & Reasoning",
            "url": "https://www.indiabix.com/",
            "provider": "IndiaBIX",
            "isFree": true
          },
          {
            "title": "LeetCode: Top Interview 150",
            "url": "https://leetcode.com/studyplan/top-interview-150/",
            "provider": "LeetCode",
            "isFree": true
          }
        ],
        "platformLink": {
          "label": "Build ATS Resume",
          "path": "/resume"
        }
      },
      {
        "stageNumber": 10,
        "id": "inte-stage-10",
        "title": "Interview Preparation, System Design & Applications",
        "summary": "Ace live technical screening rounds, domain-specific problem solving, system design, and behavioral interviews.",
        "topics": [
          "Top Technical Interview Questions for College Internship Preparation",
          "System Design & Architectural Tradeoffs",
          "Live Whiteboard / Screen-Share Coding Best Practices",
          "Behavioral Leadership Rounds (STAR Method)",
          "Strategic Job Applications across Campus & Off-Campus Drives"
        ],
        "objectives": [
          "Pass 45-60 minute technical interviews with confidence",
          "Effectively communicate technical tradeoffs to Engineering Managers"
        ],
        "practiceActivities": [
          "Conduct at least 3 AI Mock Technical Interviews on PlaceMentor AI",
          "Apply to 20+ verified opportunities on the Jobs Portal"
        ],
        "practicalTask": "Complete a full mock technical interview panel for College Internship Preparation and apply to verified companies hiring in India.",
        "prerequisites": "Stages 1 through 9",
        "estimatedTime": "3-4 Weeks",
        "resources": [
          {
            "title": "GeeksforGeeks: Campus Placement Preparation",
            "url": "https://www.geeksforgeeks.org/placement-preparation-course/",
            "provider": "GeeksforGeeks",
            "isFree": true
          },
          {
            "title": "IndiaBIX: Quantitative Aptitude & Reasoning",
            "url": "https://www.indiabix.com/",
            "provider": "IndiaBIX",
            "isFree": true
          },
          {
            "title": "LeetCode: Top Interview 150",
            "url": "https://leetcode.com/studyplan/top-interview-150/",
            "provider": "LeetCode",
            "isFree": true
          }
        ],
        "platformLink": {
          "label": "Take AI Mock Interview for College Internship Preparation",
          "path": "/interview"
        }
      }
    ]
  },
  {
    "id": "product-based-company-prep",
    "title": "Product-Based Company Preparation",
    "category": "Placement Preparation",
    "difficulty": "Advanced",
    "duration": "6-8 Months",
    "icon": "Trophy",
    "color": "purple",
    "prerequisites": "Good DSA foundation, OS/DBMS/Networks fundamentals",
    "technologies": [
      "Advanced DSA (Blind 75 & NeetCode 150)",
      "Dynamic Programming & Graphs",
      "Low-Level Design (LLD)",
      "High-Level Design (HLD)",
      "System Architecture",
      "Leadership Principles"
    ],
    "shortDescription": "Crack top-tier product tech companies (FAANG, tier-1 tech startups, and unicorn engineering teams) with rigorous DSA & System Design.",
    "overview": "Comprehensive preparation roadmap for Tier-1 and Product-based companies (Google, Amazon, Microsoft, Uber, Atlassian, Flipkart, Zoho). Covers Hard-level DSA, Low-Level Design (LLD), High-Level Design (HLD), and behavioral bar raisers.",
    "stages": [
      {
        "stageNumber": 1,
        "id": "prod-stage-1",
        "title": "Prerequisites & CS Fundamentals for Product-Based Company Preparation",
        "summary": "Core theoretical and structural computer science prerequisites required to excel in Product-Based Company Preparation.",
        "topics": [
          "Operating Systems & Memory Hierarchy",
          "Networking Fundamentals & Protocol Layers",
          "Boolean Logic & Discrete Mathematics",
          "Version Control with Git & GitHub",
          "Command Line Interface (CLI) Mastery"
        ],
        "objectives": [
          "Establish clear understanding of computational concepts essential for Product-Based Company Preparation",
          "Configure professional development terminal environments",
          "Understand system architecture basics"
        ],
        "practiceActivities": [
          "Complete 10 Linux terminal navigation exercises",
          "Diagram a client-server transaction flow"
        ],
        "practicalTask": "Initialize a development workspace with Git, secure environment configuration, and project scaffolding for Product-Based Company Preparation.",
        "prerequisites": "None",
        "estimatedTime": "2 Weeks",
        "resources": [
          {
            "title": "GeeksforGeeks: Campus Placement Preparation",
            "url": "https://www.geeksforgeeks.org/placement-preparation-course/",
            "provider": "GeeksforGeeks",
            "isFree": true
          },
          {
            "title": "IndiaBIX: Quantitative Aptitude & Reasoning",
            "url": "https://www.indiabix.com/",
            "provider": "IndiaBIX",
            "isFree": true
          },
          {
            "title": "LeetCode: Top Interview 150",
            "url": "https://leetcode.com/studyplan/top-interview-150/",
            "provider": "LeetCode",
            "isFree": true
          }
        ],
        "platformLink": null
      },
      {
        "stageNumber": 2,
        "id": "prod-stage-2",
        "title": "Core Languages & Foundations (Advanced DSA (Blind 75 & NeetCode 150), Dynamic Programming & Graphs, Low-Level Design (LLD), High-Level Design (HLD))",
        "summary": "Develop deep syntactic and operational mastery of primary programming tools used in Product-Based Company Preparation.",
        "topics": [
          "Syntax, Control Flow, and Data Types",
          "Object-Oriented Programming (OOP) vs Functional Paradigms",
          "Error Handling, Exceptions, and Defensive Coding",
          "Memory Management and Garbage Collection",
          "Modular Code Structure & Package Management"
        ],
        "objectives": [
          "Write production-standard code in core languages utilized by Product-Based Company Preparation",
          "Handle exceptions and edge cases with clean architecture"
        ],
        "practiceActivities": [
          "Write 15 standalone algorithmic functions with unit tests",
          "Implement custom class hierarchies demonstrating inheritance & polymorphism"
        ],
        "practicalTask": "Develop a robust CLI automation utility or foundational service utilizing Advanced DSA (Blind 75 & NeetCode 150), Dynamic Programming & Graphs, Low-Level Design (LLD), High-Level Design (HLD).",
        "prerequisites": "Stage 1",
        "estimatedTime": "3 Weeks",
        "resources": [
          {
            "title": "GeeksforGeeks: Campus Placement Preparation",
            "url": "https://www.geeksforgeeks.org/placement-preparation-course/",
            "provider": "GeeksforGeeks",
            "isFree": true
          },
          {
            "title": "IndiaBIX: Quantitative Aptitude & Reasoning",
            "url": "https://www.indiabix.com/",
            "provider": "IndiaBIX",
            "isFree": true
          },
          {
            "title": "LeetCode: Top Interview 150",
            "url": "https://leetcode.com/studyplan/top-interview-150/",
            "provider": "LeetCode",
            "isFree": true
          }
        ],
        "platformLink": {
          "label": "Practice Advanced DSA (Blind 75 & NeetCode 150) Coding",
          "path": "/coding"
        }
      },
      {
        "stageNumber": 3,
        "id": "prod-stage-3",
        "title": "Role-Specific Technical Skills & Core Frameworks",
        "summary": "Master specialized domain frameworks, libraries, protocols, and standard patterns for Product-Based Company Preparation.",
        "topics": [
          "Primary Product-Based Company Preparation Frameworks & Libraries",
          "Data Validation & Pipeline Architecture",
          "API Integration & Protocol Handlers",
          "Configuration Management & Environment Parity",
          "Security Best Practices & Threat Mitigation"
        ],
        "objectives": [
          "Build end-to-end features adhering to modern Product-Based Company Preparation industry standards",
          "Apply design patterns tailored to the role"
        ],
        "practiceActivities": [
          "Build a working proof-of-concept module utilizing standard industry frameworks",
          "Audit a code repository for performance bottlenecks"
        ],
        "practicalTask": "Construct a fully functional core service module demonstrating Product-Based Company Preparation competencies.",
        "prerequisites": "Stage 2",
        "estimatedTime": "3-4 Weeks",
        "resources": [
          {
            "title": "GeeksforGeeks: Campus Placement Preparation",
            "url": "https://www.geeksforgeeks.org/placement-preparation-course/",
            "provider": "GeeksforGeeks",
            "isFree": true
          },
          {
            "title": "IndiaBIX: Quantitative Aptitude & Reasoning",
            "url": "https://www.indiabix.com/",
            "provider": "IndiaBIX",
            "isFree": true
          },
          {
            "title": "LeetCode: Top Interview 150",
            "url": "https://leetcode.com/studyplan/top-interview-150/",
            "provider": "LeetCode",
            "isFree": true
          }
        ],
        "platformLink": null
      },
      {
        "stageNumber": 4,
        "id": "prod-stage-4",
        "title": "Data Structures, Algorithms & Problem Solving",
        "summary": "Targeted algorithmic problem solving, computational complexity, and data structures relevant to Product-Based Company Preparation.",
        "topics": [
          "Arrays, Hash Maps, Linked Lists, and Stacks/Queues",
          "Trees, Graphs, and Breadth-First / Depth-First Traversal",
          "Searching, Sorting, and Binary Search",
          "Greedy Algorithms and Dynamic Programming Patterns",
          "Time & Space Complexity Tradeoff Analysis"
        ],
        "objectives": [
          "Confidently solve technical coding screening assessments",
          "Evaluate algorithm performance using Big-O notation"
        ],
        "practiceActivities": [
          "Solve 40 LeetCode Easy & Medium problems in your primary language",
          "Analyze space and time complexity for critical routines"
        ],
        "practicalTask": "Implement an optimized search, sort, and cache routine for domain-specific data structures.",
        "prerequisites": "Stage 2 & 3",
        "estimatedTime": "3 Weeks",
        "resources": [
          {
            "title": "GeeksforGeeks: Campus Placement Preparation",
            "url": "https://www.geeksforgeeks.org/placement-preparation-course/",
            "provider": "GeeksforGeeks",
            "isFree": true
          },
          {
            "title": "IndiaBIX: Quantitative Aptitude & Reasoning",
            "url": "https://www.indiabix.com/",
            "provider": "IndiaBIX",
            "isFree": true
          },
          {
            "title": "LeetCode: Top Interview 150",
            "url": "https://leetcode.com/studyplan/top-interview-150/",
            "provider": "LeetCode",
            "isFree": true
          }
        ],
        "platformLink": {
          "label": "Solve Coding Problems",
          "path": "/coding"
        }
      },
      {
        "stageNumber": 5,
        "id": "prod-stage-5",
        "title": "Tools, Platforms & Development Workflow",
        "summary": "Professional tooling, containerization, automated testing, and CI/CD pipelines for Product-Based Company Preparation.",
        "topics": [
          "Docker Containerization & Multi-Stage Builds",
          "Automated Testing (Unit, Integration, End-to-End)",
          "CI/CD Pipeline Automation (GitHub Actions)",
          "Cloud Infrastructure & Deployment Services",
          "Observability, Logging, and Monitoring"
        ],
        "objectives": [
          "Automate build, test, and release cycles",
          "Containerize applications for reproducible environments"
        ],
        "practiceActivities": [
          "Write a Dockerfile and docker-compose.yml configuration",
          "Create a GitHub Actions workflow to run automated tests on every push"
        ],
        "practicalTask": "Configure a continuous deployment pipeline with automated testing for a Product-Based Company Preparation project.",
        "prerequisites": "Stage 3",
        "estimatedTime": "2 Weeks",
        "resources": [
          {
            "title": "GeeksforGeeks: Campus Placement Preparation",
            "url": "https://www.geeksforgeeks.org/placement-preparation-course/",
            "provider": "GeeksforGeeks",
            "isFree": true
          },
          {
            "title": "IndiaBIX: Quantitative Aptitude & Reasoning",
            "url": "https://www.indiabix.com/",
            "provider": "IndiaBIX",
            "isFree": true
          },
          {
            "title": "LeetCode: Top Interview 150",
            "url": "https://leetcode.com/studyplan/top-interview-150/",
            "provider": "LeetCode",
            "isFree": true
          }
        ],
        "platformLink": null
      },
      {
        "stageNumber": 6,
        "id": "prod-stage-6",
        "title": "Guided Practice & Applied Exercises",
        "summary": "Solve realistic industry exercises, build architectural prototypes, and practice technical challenges.",
        "topics": [
          "Real-world Architectural Case Studies",
          "Debugging Complex Multi-Component Failures",
          "Performance Profiling & Bottleneck Resolution",
          "Data Consistency & Fault Tolerance",
          "Clean Code & Refactoring Patterns"
        ],
        "objectives": [
          "Handle unexpected system degradation and identify root causes",
          "Refactor legacy codebase into clean, testable architecture"
        ],
        "practiceActivities": [
          "Debug and resolve 5 intentionally broken code repositories",
          "Conduct benchmark performance profiling"
        ],
        "practicalTask": "Complete a 3-hour simulated take-home engineering assessment.",
        "prerequisites": "Stage 4 & 5",
        "estimatedTime": "2-3 Weeks",
        "resources": [
          {
            "title": "GeeksforGeeks: Campus Placement Preparation",
            "url": "https://www.geeksforgeeks.org/placement-preparation-course/",
            "provider": "GeeksforGeeks",
            "isFree": true
          },
          {
            "title": "IndiaBIX: Quantitative Aptitude & Reasoning",
            "url": "https://www.indiabix.com/",
            "provider": "IndiaBIX",
            "isFree": true
          },
          {
            "title": "LeetCode: Top Interview 150",
            "url": "https://leetcode.com/studyplan/top-interview-150/",
            "provider": "LeetCode",
            "isFree": true
          }
        ],
        "platformLink": {
          "label": "Run Aptitude & Practice Tests",
          "path": "/aptitude"
        }
      },
      {
        "stageNumber": 7,
        "id": "prod-stage-7",
        "title": "Beginner Capstone Project",
        "summary": "Synthesize your learning into a functional, standalone, production-ready beginner project.",
        "topics": [
          "Project Scaffolding & Architecture",
          "Implementing Core Business Logic",
          "Data Persistence & State Management",
          "Automated Test Coverage",
          "Public Deployment & Documentation"
        ],
        "objectives": [
          "Deliver a working, deployed application from scratch",
          "Document setup instructions and architectural decisions in README"
        ],
        "practiceActivities": [
          "Set up automated GitHub Actions deployment",
          "Write comprehensive unit tests for all business logic"
        ],
        "practicalTask": "Build and deploy a complete functional starter project for Product-Based Company Preparation with live documentation and public repository.",
        "prerequisites": "Stage 3 & 5",
        "estimatedTime": "2-3 Weeks",
        "resources": [
          {
            "title": "GeeksforGeeks: Campus Placement Preparation",
            "url": "https://www.geeksforgeeks.org/placement-preparation-course/",
            "provider": "GeeksforGeeks",
            "isFree": true
          },
          {
            "title": "IndiaBIX: Quantitative Aptitude & Reasoning",
            "url": "https://www.indiabix.com/",
            "provider": "IndiaBIX",
            "isFree": true
          },
          {
            "title": "LeetCode: Top Interview 150",
            "url": "https://leetcode.com/studyplan/top-interview-150/",
            "provider": "LeetCode",
            "isFree": true
          }
        ],
        "platformLink": null
      },
      {
        "stageNumber": 8,
        "id": "prod-stage-8",
        "title": "Intermediate / Portfolio Flagship Project",
        "summary": "Engineer a high-impact, feature-rich portfolio flagship project that stands out to hiring managers.",
        "topics": [
          "Complex Architecture & Multi-Service Integration",
          "Scalability, Caching, and Fault Tolerance",
          "Security Hardening & Role Authorization",
          "Comprehensive Test Coverage (Unit + E2E)",
          "Professional Documentation & Video Walkthrough"
        ],
        "objectives": [
          "Demonstrate professional-level software engineering capability",
          "Present clean system design and quantitative performance results"
        ],
        "practiceActivities": [
          "Conduct stress testing and load testing with benchmark tools",
          "Record a 3-minute technical walkthrough video of your project"
        ],
        "practicalTask": "Publish a flagship Product-Based Company Preparation portfolio project with production deployment, live database, and architecture documentation.",
        "prerequisites": "Stage 7",
        "estimatedTime": "3-4 Weeks",
        "resources": [
          {
            "title": "GeeksforGeeks: Campus Placement Preparation",
            "url": "https://www.geeksforgeeks.org/placement-preparation-course/",
            "provider": "GeeksforGeeks",
            "isFree": true
          },
          {
            "title": "IndiaBIX: Quantitative Aptitude & Reasoning",
            "url": "https://www.indiabix.com/",
            "provider": "IndiaBIX",
            "isFree": true
          },
          {
            "title": "LeetCode: Top Interview 150",
            "url": "https://leetcode.com/studyplan/top-interview-150/",
            "provider": "LeetCode",
            "isFree": true
          }
        ],
        "platformLink": null
      },
      {
        "stageNumber": 9,
        "id": "prod-stage-9",
        "title": "Resume, GitHub Portfolio & Professional Presence",
        "summary": "Craft an ATS-optimized technical resume, polish your GitHub repositories, and optimize LinkedIn presence.",
        "topics": [
          "Impact-Driven Resume Bullet Points (Action + Context + Quantified Result)",
          "GitHub Profile Readme & Pinned Projects Showcase",
          "Technical Blog Writing & Project Case Studies",
          "LinkedIn Profile Optimization for Technical Recruiters",
          "Elevator Pitch & Portfolio Website"
        ],
        "objectives": [
          "Pass technical screening ATS filters with a 90+ score",
          "Present repositories with clean documentation and demo URLs"
        ],
        "practiceActivities": [
          "Score your resume on PlaceMentor AI’s Resume Builder",
          "Draft technical case studies explaining your design tradeoffs"
        ],
        "practicalTask": "Finalize your tailored Product-Based Company Preparation resume and publish an open-source GitHub portfolio.",
        "prerequisites": "Stage 7 & 8",
        "estimatedTime": "1-2 Weeks",
        "resources": [
          {
            "title": "GeeksforGeeks: Campus Placement Preparation",
            "url": "https://www.geeksforgeeks.org/placement-preparation-course/",
            "provider": "GeeksforGeeks",
            "isFree": true
          },
          {
            "title": "IndiaBIX: Quantitative Aptitude & Reasoning",
            "url": "https://www.indiabix.com/",
            "provider": "IndiaBIX",
            "isFree": true
          },
          {
            "title": "LeetCode: Top Interview 150",
            "url": "https://leetcode.com/studyplan/top-interview-150/",
            "provider": "LeetCode",
            "isFree": true
          }
        ],
        "platformLink": {
          "label": "Build ATS Resume",
          "path": "/resume"
        }
      },
      {
        "stageNumber": 10,
        "id": "prod-stage-10",
        "title": "Interview Preparation, System Design & Applications",
        "summary": "Ace live technical screening rounds, domain-specific problem solving, system design, and behavioral interviews.",
        "topics": [
          "Top Technical Interview Questions for Product-Based Company Preparation",
          "System Design & Architectural Tradeoffs",
          "Live Whiteboard / Screen-Share Coding Best Practices",
          "Behavioral Leadership Rounds (STAR Method)",
          "Strategic Job Applications across Campus & Off-Campus Drives"
        ],
        "objectives": [
          "Pass 45-60 minute technical interviews with confidence",
          "Effectively communicate technical tradeoffs to Engineering Managers"
        ],
        "practiceActivities": [
          "Conduct at least 3 AI Mock Technical Interviews on PlaceMentor AI",
          "Apply to 20+ verified opportunities on the Jobs Portal"
        ],
        "practicalTask": "Complete a full mock technical interview panel for Product-Based Company Preparation and apply to verified companies hiring in India.",
        "prerequisites": "Stages 1 through 9",
        "estimatedTime": "3-4 Weeks",
        "resources": [
          {
            "title": "GeeksforGeeks: Campus Placement Preparation",
            "url": "https://www.geeksforgeeks.org/placement-preparation-course/",
            "provider": "GeeksforGeeks",
            "isFree": true
          },
          {
            "title": "IndiaBIX: Quantitative Aptitude & Reasoning",
            "url": "https://www.indiabix.com/",
            "provider": "IndiaBIX",
            "isFree": true
          },
          {
            "title": "LeetCode: Top Interview 150",
            "url": "https://leetcode.com/studyplan/top-interview-150/",
            "provider": "LeetCode",
            "isFree": true
          }
        ],
        "platformLink": {
          "label": "Take AI Mock Interview for Product-Based Company Preparation",
          "path": "/interview"
        }
      }
    ]
  },
  {
    "id": "service-based-company-prep",
    "title": "Service-Based Company Preparation",
    "category": "Placement Preparation",
    "difficulty": "Beginner Friendly",
    "duration": "3-4 Months",
    "icon": "Briefcase",
    "color": "teal",
    "prerequisites": "Basic Aptitude, Fundamental Programming (C/Java/Python)",
    "technologies": [
      "Quantitative Aptitude",
      "Logical Reasoning",
      "Verbal Ability",
      "C / Java Basics",
      "SQL Fundamentals",
      "TCS NQT / Infosys Pattern",
      "Technical & HR Interview"
    ],
    "shortDescription": "Target TCS, Infosys, Wipro, Cognizant, Accenture India, Capgemini, and HCLTech mass hiring and national qualifier drives.",
    "overview": "Proven strategy and practice curriculum to ace national campus drives (TCS NQT, Infosys DSE/SE, Wipro Elite, Cognizant GenC, Accenture India, Capgemini Exceller). Focuses on high-speed aptitude, quantitative shortcuts, technical MCQ patterns, and professional HR interviews.",
    "stages": [
      {
        "stageNumber": 1,
        "id": "serv-stage-1",
        "title": "Prerequisites & CS Fundamentals for Service-Based Company Preparation",
        "summary": "Core theoretical and structural computer science prerequisites required to excel in Service-Based Company Preparation.",
        "topics": [
          "Operating Systems & Memory Hierarchy",
          "Networking Fundamentals & Protocol Layers",
          "Boolean Logic & Discrete Mathematics",
          "Version Control with Git & GitHub",
          "Command Line Interface (CLI) Mastery"
        ],
        "objectives": [
          "Establish clear understanding of computational concepts essential for Service-Based Company Preparation",
          "Configure professional development terminal environments",
          "Understand system architecture basics"
        ],
        "practiceActivities": [
          "Complete 10 Linux terminal navigation exercises",
          "Diagram a client-server transaction flow"
        ],
        "practicalTask": "Initialize a development workspace with Git, secure environment configuration, and project scaffolding for Service-Based Company Preparation.",
        "prerequisites": "None",
        "estimatedTime": "2 Weeks",
        "resources": [
          {
            "title": "GeeksforGeeks: Campus Placement Preparation",
            "url": "https://www.geeksforgeeks.org/placement-preparation-course/",
            "provider": "GeeksforGeeks",
            "isFree": true
          },
          {
            "title": "IndiaBIX: Quantitative Aptitude & Reasoning",
            "url": "https://www.indiabix.com/",
            "provider": "IndiaBIX",
            "isFree": true
          },
          {
            "title": "LeetCode: Top Interview 150",
            "url": "https://leetcode.com/studyplan/top-interview-150/",
            "provider": "LeetCode",
            "isFree": true
          }
        ],
        "platformLink": null
      },
      {
        "stageNumber": 2,
        "id": "serv-stage-2",
        "title": "Core Languages & Foundations (Quantitative Aptitude, Logical Reasoning, Verbal Ability, C / Java Basics)",
        "summary": "Develop deep syntactic and operational mastery of primary programming tools used in Service-Based Company Preparation.",
        "topics": [
          "Syntax, Control Flow, and Data Types",
          "Object-Oriented Programming (OOP) vs Functional Paradigms",
          "Error Handling, Exceptions, and Defensive Coding",
          "Memory Management and Garbage Collection",
          "Modular Code Structure & Package Management"
        ],
        "objectives": [
          "Write production-standard code in core languages utilized by Service-Based Company Preparation",
          "Handle exceptions and edge cases with clean architecture"
        ],
        "practiceActivities": [
          "Write 15 standalone algorithmic functions with unit tests",
          "Implement custom class hierarchies demonstrating inheritance & polymorphism"
        ],
        "practicalTask": "Develop a robust CLI automation utility or foundational service utilizing Quantitative Aptitude, Logical Reasoning, Verbal Ability, C / Java Basics.",
        "prerequisites": "Stage 1",
        "estimatedTime": "3 Weeks",
        "resources": [
          {
            "title": "GeeksforGeeks: Campus Placement Preparation",
            "url": "https://www.geeksforgeeks.org/placement-preparation-course/",
            "provider": "GeeksforGeeks",
            "isFree": true
          },
          {
            "title": "IndiaBIX: Quantitative Aptitude & Reasoning",
            "url": "https://www.indiabix.com/",
            "provider": "IndiaBIX",
            "isFree": true
          },
          {
            "title": "LeetCode: Top Interview 150",
            "url": "https://leetcode.com/studyplan/top-interview-150/",
            "provider": "LeetCode",
            "isFree": true
          }
        ],
        "platformLink": {
          "label": "Practice Quantitative Aptitude Coding",
          "path": "/coding"
        }
      },
      {
        "stageNumber": 3,
        "id": "serv-stage-3",
        "title": "Role-Specific Technical Skills & Core Frameworks",
        "summary": "Master specialized domain frameworks, libraries, protocols, and standard patterns for Service-Based Company Preparation.",
        "topics": [
          "Primary Service-Based Company Preparation Frameworks & Libraries",
          "Data Validation & Pipeline Architecture",
          "API Integration & Protocol Handlers",
          "Configuration Management & Environment Parity",
          "Security Best Practices & Threat Mitigation"
        ],
        "objectives": [
          "Build end-to-end features adhering to modern Service-Based Company Preparation industry standards",
          "Apply design patterns tailored to the role"
        ],
        "practiceActivities": [
          "Build a working proof-of-concept module utilizing standard industry frameworks",
          "Audit a code repository for performance bottlenecks"
        ],
        "practicalTask": "Construct a fully functional core service module demonstrating Service-Based Company Preparation competencies.",
        "prerequisites": "Stage 2",
        "estimatedTime": "3-4 Weeks",
        "resources": [
          {
            "title": "GeeksforGeeks: Campus Placement Preparation",
            "url": "https://www.geeksforgeeks.org/placement-preparation-course/",
            "provider": "GeeksforGeeks",
            "isFree": true
          },
          {
            "title": "IndiaBIX: Quantitative Aptitude & Reasoning",
            "url": "https://www.indiabix.com/",
            "provider": "IndiaBIX",
            "isFree": true
          },
          {
            "title": "LeetCode: Top Interview 150",
            "url": "https://leetcode.com/studyplan/top-interview-150/",
            "provider": "LeetCode",
            "isFree": true
          }
        ],
        "platformLink": null
      },
      {
        "stageNumber": 4,
        "id": "serv-stage-4",
        "title": "Data Structures, Algorithms & Problem Solving",
        "summary": "Targeted algorithmic problem solving, computational complexity, and data structures relevant to Service-Based Company Preparation.",
        "topics": [
          "Arrays, Hash Maps, Linked Lists, and Stacks/Queues",
          "Trees, Graphs, and Breadth-First / Depth-First Traversal",
          "Searching, Sorting, and Binary Search",
          "Greedy Algorithms and Dynamic Programming Patterns",
          "Time & Space Complexity Tradeoff Analysis"
        ],
        "objectives": [
          "Confidently solve technical coding screening assessments",
          "Evaluate algorithm performance using Big-O notation"
        ],
        "practiceActivities": [
          "Solve 40 LeetCode Easy & Medium problems in your primary language",
          "Analyze space and time complexity for critical routines"
        ],
        "practicalTask": "Implement an optimized search, sort, and cache routine for domain-specific data structures.",
        "prerequisites": "Stage 2 & 3",
        "estimatedTime": "3 Weeks",
        "resources": [
          {
            "title": "GeeksforGeeks: Campus Placement Preparation",
            "url": "https://www.geeksforgeeks.org/placement-preparation-course/",
            "provider": "GeeksforGeeks",
            "isFree": true
          },
          {
            "title": "IndiaBIX: Quantitative Aptitude & Reasoning",
            "url": "https://www.indiabix.com/",
            "provider": "IndiaBIX",
            "isFree": true
          },
          {
            "title": "LeetCode: Top Interview 150",
            "url": "https://leetcode.com/studyplan/top-interview-150/",
            "provider": "LeetCode",
            "isFree": true
          }
        ],
        "platformLink": {
          "label": "Solve Coding Problems",
          "path": "/coding"
        }
      },
      {
        "stageNumber": 5,
        "id": "serv-stage-5",
        "title": "Tools, Platforms & Development Workflow",
        "summary": "Professional tooling, containerization, automated testing, and CI/CD pipelines for Service-Based Company Preparation.",
        "topics": [
          "Docker Containerization & Multi-Stage Builds",
          "Automated Testing (Unit, Integration, End-to-End)",
          "CI/CD Pipeline Automation (GitHub Actions)",
          "Cloud Infrastructure & Deployment Services",
          "Observability, Logging, and Monitoring"
        ],
        "objectives": [
          "Automate build, test, and release cycles",
          "Containerize applications for reproducible environments"
        ],
        "practiceActivities": [
          "Write a Dockerfile and docker-compose.yml configuration",
          "Create a GitHub Actions workflow to run automated tests on every push"
        ],
        "practicalTask": "Configure a continuous deployment pipeline with automated testing for a Service-Based Company Preparation project.",
        "prerequisites": "Stage 3",
        "estimatedTime": "2 Weeks",
        "resources": [
          {
            "title": "GeeksforGeeks: Campus Placement Preparation",
            "url": "https://www.geeksforgeeks.org/placement-preparation-course/",
            "provider": "GeeksforGeeks",
            "isFree": true
          },
          {
            "title": "IndiaBIX: Quantitative Aptitude & Reasoning",
            "url": "https://www.indiabix.com/",
            "provider": "IndiaBIX",
            "isFree": true
          },
          {
            "title": "LeetCode: Top Interview 150",
            "url": "https://leetcode.com/studyplan/top-interview-150/",
            "provider": "LeetCode",
            "isFree": true
          }
        ],
        "platformLink": null
      },
      {
        "stageNumber": 6,
        "id": "serv-stage-6",
        "title": "Guided Practice & Applied Exercises",
        "summary": "Solve realistic industry exercises, build architectural prototypes, and practice technical challenges.",
        "topics": [
          "Real-world Architectural Case Studies",
          "Debugging Complex Multi-Component Failures",
          "Performance Profiling & Bottleneck Resolution",
          "Data Consistency & Fault Tolerance",
          "Clean Code & Refactoring Patterns"
        ],
        "objectives": [
          "Handle unexpected system degradation and identify root causes",
          "Refactor legacy codebase into clean, testable architecture"
        ],
        "practiceActivities": [
          "Debug and resolve 5 intentionally broken code repositories",
          "Conduct benchmark performance profiling"
        ],
        "practicalTask": "Complete a 3-hour simulated take-home engineering assessment.",
        "prerequisites": "Stage 4 & 5",
        "estimatedTime": "2-3 Weeks",
        "resources": [
          {
            "title": "GeeksforGeeks: Campus Placement Preparation",
            "url": "https://www.geeksforgeeks.org/placement-preparation-course/",
            "provider": "GeeksforGeeks",
            "isFree": true
          },
          {
            "title": "IndiaBIX: Quantitative Aptitude & Reasoning",
            "url": "https://www.indiabix.com/",
            "provider": "IndiaBIX",
            "isFree": true
          },
          {
            "title": "LeetCode: Top Interview 150",
            "url": "https://leetcode.com/studyplan/top-interview-150/",
            "provider": "LeetCode",
            "isFree": true
          }
        ],
        "platformLink": {
          "label": "Run Aptitude & Practice Tests",
          "path": "/aptitude"
        }
      },
      {
        "stageNumber": 7,
        "id": "serv-stage-7",
        "title": "Beginner Capstone Project",
        "summary": "Synthesize your learning into a functional, standalone, production-ready beginner project.",
        "topics": [
          "Project Scaffolding & Architecture",
          "Implementing Core Business Logic",
          "Data Persistence & State Management",
          "Automated Test Coverage",
          "Public Deployment & Documentation"
        ],
        "objectives": [
          "Deliver a working, deployed application from scratch",
          "Document setup instructions and architectural decisions in README"
        ],
        "practiceActivities": [
          "Set up automated GitHub Actions deployment",
          "Write comprehensive unit tests for all business logic"
        ],
        "practicalTask": "Build and deploy a complete functional starter project for Service-Based Company Preparation with live documentation and public repository.",
        "prerequisites": "Stage 3 & 5",
        "estimatedTime": "2-3 Weeks",
        "resources": [
          {
            "title": "GeeksforGeeks: Campus Placement Preparation",
            "url": "https://www.geeksforgeeks.org/placement-preparation-course/",
            "provider": "GeeksforGeeks",
            "isFree": true
          },
          {
            "title": "IndiaBIX: Quantitative Aptitude & Reasoning",
            "url": "https://www.indiabix.com/",
            "provider": "IndiaBIX",
            "isFree": true
          },
          {
            "title": "LeetCode: Top Interview 150",
            "url": "https://leetcode.com/studyplan/top-interview-150/",
            "provider": "LeetCode",
            "isFree": true
          }
        ],
        "platformLink": null
      },
      {
        "stageNumber": 8,
        "id": "serv-stage-8",
        "title": "Intermediate / Portfolio Flagship Project",
        "summary": "Engineer a high-impact, feature-rich portfolio flagship project that stands out to hiring managers.",
        "topics": [
          "Complex Architecture & Multi-Service Integration",
          "Scalability, Caching, and Fault Tolerance",
          "Security Hardening & Role Authorization",
          "Comprehensive Test Coverage (Unit + E2E)",
          "Professional Documentation & Video Walkthrough"
        ],
        "objectives": [
          "Demonstrate professional-level software engineering capability",
          "Present clean system design and quantitative performance results"
        ],
        "practiceActivities": [
          "Conduct stress testing and load testing with benchmark tools",
          "Record a 3-minute technical walkthrough video of your project"
        ],
        "practicalTask": "Publish a flagship Service-Based Company Preparation portfolio project with production deployment, live database, and architecture documentation.",
        "prerequisites": "Stage 7",
        "estimatedTime": "3-4 Weeks",
        "resources": [
          {
            "title": "GeeksforGeeks: Campus Placement Preparation",
            "url": "https://www.geeksforgeeks.org/placement-preparation-course/",
            "provider": "GeeksforGeeks",
            "isFree": true
          },
          {
            "title": "IndiaBIX: Quantitative Aptitude & Reasoning",
            "url": "https://www.indiabix.com/",
            "provider": "IndiaBIX",
            "isFree": true
          },
          {
            "title": "LeetCode: Top Interview 150",
            "url": "https://leetcode.com/studyplan/top-interview-150/",
            "provider": "LeetCode",
            "isFree": true
          }
        ],
        "platformLink": null
      },
      {
        "stageNumber": 9,
        "id": "serv-stage-9",
        "title": "Resume, GitHub Portfolio & Professional Presence",
        "summary": "Craft an ATS-optimized technical resume, polish your GitHub repositories, and optimize LinkedIn presence.",
        "topics": [
          "Impact-Driven Resume Bullet Points (Action + Context + Quantified Result)",
          "GitHub Profile Readme & Pinned Projects Showcase",
          "Technical Blog Writing & Project Case Studies",
          "LinkedIn Profile Optimization for Technical Recruiters",
          "Elevator Pitch & Portfolio Website"
        ],
        "objectives": [
          "Pass technical screening ATS filters with a 90+ score",
          "Present repositories with clean documentation and demo URLs"
        ],
        "practiceActivities": [
          "Score your resume on PlaceMentor AI’s Resume Builder",
          "Draft technical case studies explaining your design tradeoffs"
        ],
        "practicalTask": "Finalize your tailored Service-Based Company Preparation resume and publish an open-source GitHub portfolio.",
        "prerequisites": "Stage 7 & 8",
        "estimatedTime": "1-2 Weeks",
        "resources": [
          {
            "title": "GeeksforGeeks: Campus Placement Preparation",
            "url": "https://www.geeksforgeeks.org/placement-preparation-course/",
            "provider": "GeeksforGeeks",
            "isFree": true
          },
          {
            "title": "IndiaBIX: Quantitative Aptitude & Reasoning",
            "url": "https://www.indiabix.com/",
            "provider": "IndiaBIX",
            "isFree": true
          },
          {
            "title": "LeetCode: Top Interview 150",
            "url": "https://leetcode.com/studyplan/top-interview-150/",
            "provider": "LeetCode",
            "isFree": true
          }
        ],
        "platformLink": {
          "label": "Build ATS Resume",
          "path": "/resume"
        }
      },
      {
        "stageNumber": 10,
        "id": "serv-stage-10",
        "title": "Interview Preparation, System Design & Applications",
        "summary": "Ace live technical screening rounds, domain-specific problem solving, system design, and behavioral interviews.",
        "topics": [
          "Top Technical Interview Questions for Service-Based Company Preparation",
          "System Design & Architectural Tradeoffs",
          "Live Whiteboard / Screen-Share Coding Best Practices",
          "Behavioral Leadership Rounds (STAR Method)",
          "Strategic Job Applications across Campus & Off-Campus Drives"
        ],
        "objectives": [
          "Pass 45-60 minute technical interviews with confidence",
          "Effectively communicate technical tradeoffs to Engineering Managers"
        ],
        "practiceActivities": [
          "Conduct at least 3 AI Mock Technical Interviews on PlaceMentor AI",
          "Apply to 20+ verified opportunities on the Jobs Portal"
        ],
        "practicalTask": "Complete a full mock technical interview panel for Service-Based Company Preparation and apply to verified companies hiring in India.",
        "prerequisites": "Stages 1 through 9",
        "estimatedTime": "3-4 Weeks",
        "resources": [
          {
            "title": "GeeksforGeeks: Campus Placement Preparation",
            "url": "https://www.geeksforgeeks.org/placement-preparation-course/",
            "provider": "GeeksforGeeks",
            "isFree": true
          },
          {
            "title": "IndiaBIX: Quantitative Aptitude & Reasoning",
            "url": "https://www.indiabix.com/",
            "provider": "IndiaBIX",
            "isFree": true
          },
          {
            "title": "LeetCode: Top Interview 150",
            "url": "https://leetcode.com/studyplan/top-interview-150/",
            "provider": "LeetCode",
            "isFree": true
          }
        ],
        "platformLink": {
          "label": "Take AI Mock Interview for Service-Based Company Preparation",
          "path": "/interview"
        }
      }
    ]
  }
];

export default CAREER_ROADMAPS;
