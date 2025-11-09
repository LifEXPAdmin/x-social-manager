import { ChecklistItem, Module, Track } from '@/types';

const makeItems = (moduleId: string, track: Track, labels: string[]): ChecklistItem[] =>
  labels.map((label, index) => ({
    id: `${moduleId}-${track}-${String(index + 1).padStart(2, '0')}`,
    label,
  }));

export const modules: Module[] = [
  {
    id: 'module-1',
    title: 'Module 1 • Programming Fundamentals',
    focus: [
      'Data types, variables, conditionals, loops, and functions',
      'Reading stack traces and debugging errors with intention',
      'Lightweight OOP and working with the filesystem',
    ],
    aiPrompts: [
      'Explain this stack trace like I am new to coding. What went wrong and what are two potential fixes?\n\n```<paste stack trace>```',
      'I wrote this function but it feels clunky. Refactor it to be more readable, add 2 unit tests, and explain the changes line by line.\n\n```<paste function>```',
      'Generate a short quiz (5 questions) to verify I understand loops and conditionals in <language>.',
    ],
    handsOn: {
      beginner: [
        'Write three CLI utilities: palindrome checker, tip calculator, text formatter.',
        'Ask AI to explain each solution, then rebuild it without looking — capture what changed.',
      ],
      intermediate: [
        'Build a “kata pack”: ten small functions written test-first.',
        'Capture time spent with vs. without AI to quantify speed gains.',
      ],
      advanced: [
        'Implement five classic algorithms (binary search, merge sort, BFS, DFS, Dijkstra).',
        'Record time/space complexity and use AI to validate your analysis.',
      ],
    },
    tasks: {
      beginner: makeItems('m1', 'beginner', [
        'Install runtime + editor; configure linting/formatting.',
        'Declare variables of every primitive type and log them.',
        'Write a pure function with matching unit test.',
        'Handle user input via CLI prompt and produce formatted output.',
        'Trigger a deliberate error and walk through the stack trace.',
        'Document the difference between let/const/var (or language equivalent).',
        'Rebuild an AI-provided snippet from scratch, annotating each line.',
        'Summarize what “Big O” means in two sentences.',
        'Commit your exercises to version control with clear messages.',
      ]),
      intermediate: makeItems('m1', 'intermediate', [
        'Complete 10 timed kata exercises (record time per challenge).',
        'Adopt a linting config; fix all style violations with AI explanations.',
        'Use AI to compare recursion vs iteration for the same problem.',
        'Profile a naive vs optimized solution on small inputs.',
        'Write table-driven tests for edge cases (empty, null, negative).',
        'Experiment with AI auto-complete and note when it misfires.',
        'Document how you debugged a failing test using AI hints.',
        'Push kata pack to repo with README describing lessons.',
        'Log a daily reflection: what did AI accelerate or confuse?',
      ]),
      advanced: makeItems('m1', 'advanced', [
        'Implement a reusable CLI boilerplate with argument parsing.',
        'Benchmark five algorithms and chart results (include AI-generated graph).',
        'Compare human vs AI solution quality on complex function—highlight trade-offs.',
        'Integrate static analysis tool and fix all warnings.',
        'Write property-based tests for at least one algorithm.',
        'Use AI to generate adversarial test cases that break your code.',
        'Document each algorithm with diagrams produced via AI prompt engineering.',
        'Publish a gist summarizing algorithm insights and share with peers.',
        'Capture metrics for time saved with AI pair-programming week over week.',
      ]),
    },
  },
  {
    id: 'module-2',
    title: 'Module 2 • Web Foundations (HTML, CSS, JavaScript)',
    focus: [
      'Semantic HTML5 structure, forms, and metadata',
      'Responsive design with Flexbox/Grid and accessibility practices',
      'DOM events, state management, and fetch basics',
    ],
    aiPrompts: [
      'Audit my HTML for accessibility pitfalls. Provide fixes with code snippets and explain why they matter.\n\n```<paste HTML>```',
      'Generate two alternative layout approaches (Flexbox vs Grid) for this content. Compare readability and responsiveness.\n\n```<describe layout>```',
      'Create a checklist to test keyboard navigation and focus order for this page.',
    ],
    handsOn: {
      beginner: [
        'Ship a personal homepage, a responsive landing page, and a vanilla to-do list.',
        'Run each through AI-powered accessibility checks and document fixes.',
      ],
      intermediate: [
        'Build a one-page site with manual a11y review, keyboard nav, and client-side validation.',
        'Use AI to generate copy variations and measure impact.',
      ],
      advanced: [
        'Create a componentized landing page with progressive enhancement and a perf budget.',
        'Automate lighthouse checks (AI prompts to interpret results).',
      ],
    },
    tasks: {
      beginner: makeItems('m2', 'beginner', [
        'Sketch wireframes for homepage + landing page.',
        'Mark up sections with semantic elements (header/nav/main).',
        'Implement responsive layout using Flexbox and media queries.',
        'Add basic CSS reset + design tokens for colors/spacing.',
        'Create vanilla JS to-do list with add/remove/filter features.',
        'Use AI to suggest accessible form patterns, then implement.',
        'Run Lighthouse accessibility audit and list next actions.',
        'Document CSS decisions in the project README.',
        'Deploy static site (Netlify/Vercel) and share link.',
      ]),
      intermediate: makeItems('m2', 'intermediate', [
        'Implement keyboard navigation (Tab/Shift+Tab) for all interactive elements.',
        'Add client-side validation with inline error messaging.',
        'Use AI to refactor CSS into utility-first structure.',
        'Measure CLS/LCP and adjust layout to improve metrics.',
        'Create automated tests for DOM interactions using Playwright or Vitest + jsdom.',
        'Bundle assets and analyze bundle size with AI recommendations.',
        'Add offline fallback (service worker or manifest).',
        'Perform manual accessibility checklist; log findings.',
        'Write post-project recap focusing on AI contributions.',
      ]),
      advanced: makeItems('m2', 'advanced', [
        'Design a component library (buttons, cards, modals) with documented props.',
        'Implement progressive enhancement: JS optional but enriches experience.',
        'Set performance budget and enforce via build pipeline.',
        'Build custom focus states and reduced-motion styles.',
        'Integrate automated accessibility tests (axe) and document results.',
        'Use AI to generate copy variations and run quick user feedback test.',
        'Optimize images (responsive sizes, formats) with AI-assisted scripts.',
        'Measure and improve hydration times / script execution.',
        'Write an article on how AI assisted your HTML/CSS workflow.',
      ]),
    },
  },
  {
    id: 'module-3',
    title: 'Module 3 • Paradigms & Advanced Concepts',
    focus: [
      'Clean code principles and refactoring patterns',
      'Data structures and algorithms from arrays to graphs',
      'Git workflows: branching, PR reviews, commit hygiene',
    ],
    aiPrompts: [
      'Refactor this module following clean code principles. Explain each transform and suggest commits.\n\n```<paste module>```',
      'Design a study plan to master graph algorithms over two weeks with daily micro-goals.',
      'Simulate a pull-request review for this diff; highlight positives and red flags.\n\n```<paste diff>```',
    ],
    handsOn: {
      beginner: [
        'Refactor a previous project applying a simple pattern (e.g., Strategy).',
        'Use AI to critique your refactor and capture feedback.',
      ],
      intermediate: [
        'Solve six DS/Algo exercises with unit tests and complexity notes.',
        'Use AI to generate alternative solutions and compare.',
      ],
      advanced: [
        'Build a sorting visualizer with animations and analysis overlays.',
        'Automate code review checks using AI-generated heuristics.',
      ],
    },
    tasks: {
      beginner: makeItems('m3', 'beginner', [
        'Identify code smells in earlier projects; document in GitHub issue.',
        'Refactor using a simple design pattern (Strategy/Observer).',
        'Write before/after tests to ensure behavior intact.',
        'Use AI to propose alternative refactors; capture learnings.',
        'Practice branching workflow (feature branch -> PR -> merge).',
        'Review a peer’s PR (or AI-generated diff) and leave comments.',
        'Record a short loom explaining your refactor strategy.',
        'Summarize clean-code principles in your own words.',
      ]),
      intermediate: makeItems('m3', 'intermediate', [
        'Implement six DS/Algo problems with tests + complexity analysis.',
        'Practice two problems entirely without AI, then compare with AI-assisted solutions.',
        'Use AI to refactor for readability and note differences.',
        'Add Git hooks for lint/test; ensure clean status before commit.',
        'Document a branching strategy (GitFlow vs trunk-based) and choose one.',
        'Conduct a mock PR review, focusing on maintainability.',
        'Improve commit history (squash or rebase) to tell a clear story.',
        'Publish a notes doc summarizing DS learnings + AI tips.',
      ]),
      advanced: makeItems('m3', 'advanced', [
        'Design and build a sorting visualizer with interactive controls.',
        'Profile algorithms and chart results; leverage AI for summaries.',
        'Introduce automated code review (Danger/CI) with AI-crafted rules.',
        'Lead a simulated architecture review; capture minutes.',
        'Create reusable git aliases/scripts to speed up workflows.',
        'Write ADR (architecture decision record) for major refactor.',
        'Pair with AI to identify hidden bottlenecks in complex code.',
        'Teach a fellow learner via blog post or workshop.',
        'Track time saved from AI-assisted reviews vs manual.',
      ]),
    },
  },
  {
    id: 'module-4',
    title: 'Module 4 • Full-Stack & App Projects',
    focus: [
      'REST APIs (Node/Express or Python/Flask), data modeling, authentication basics',
      'Frontend frameworks or SwiftUI for mobile consumption of APIs',
      'Deployment, environment variables, logging, and monitoring',
    ],
    aiPrompts: [
      'Design an API spec for a productivity dashboard. Include endpoints, payloads, and auth strategy.',
      'Generate a database schema (SQL + diagram) for tasks, habits, and notes. Suggest indexes.',
      'Create a deployment checklist with CI/CD steps, environment configuration, and smoke tests.',
    ],
    handsOn: {
      beginner: [
        'Build an AI-powered productivity dashboard with a local fake API (no auth).',
        'Use AI to stub endpoint responses and iterate quickly.',
      ],
      intermediate: [
        'Host API, add simple auth, and polish UI with charts or notes.',
        'Implement logging + error tracking guided by AI prompts.',
      ],
      advanced: [
        'Ship production-ready version: auth, tests, logging, README with trade-offs.',
        'Leverage AI to draft incident response docs and run load tests.',
      ],
    },
    tasks: {
      beginner: makeItems('m4', 'beginner', [
        'Define backlog + scope for productivity dashboard.',
        'Mock API using JSON server or Mirage; document endpoints.',
        'Build UI with basic routing/state management.',
        'Integrate AI-generated summaries for weekly review (mocked).',
        'Add local persistence (IndexedDB/localStorage).',
        'Write smoke tests for key flows.',
        'Deploy static frontend + mock backend.',
        'Retrospect: what did AI accelerate in full-stack thinking?',
      ]),
      intermediate: makeItems('m4', 'intermediate', [
        'Design real API (Express/Flask) with database integration.',
        'Implement auth (JWT/cookies) and protect routes.',
        'Add metrics logging and structured logs.',
        'Use AI to generate API docs + Postman collection.',
        'Implement automated tests (integration + unit).',
        'Set up CI pipeline that runs tests + lint.',
        'Deploy to cloud provider; document environment config.',
        'Add simple analytics dashboard summarizing usage.',
        'Log lessons learned in README (AI co-authored).',
      ]),
      advanced: makeItems('m4', 'advanced', [
        'Implement rate limiting + input validation for API.',
        'Add background jobs (cron or queue) for summaries.',
        'Instrument tracing and error monitoring.',
        'Write comprehensive tests incl. contract tests with AI support.',
        'Automate backups + recovery drill doc.',
        'Benchmark API under load; optimize hot paths.',
        'Publish deployment runbook referencing AI assistance.',
        'Record demo video walking through architecture.',
        'Collect feedback from 2 users and iterate.',
      ]),
    },
  },
  {
    id: 'module-5',
    title: 'Module 5 • Resource Playbook',
    focus: [
      'Curate a personal curriculum and build spaced-repetition habits',
      'Use AI to synthesize multi-source content into actionable notes',
      'Create reusable artifacts (cheat sheets, flashcards, study trackers)',
    ],
    aiPrompts: [
      'Summarize these three resources into a single cheat sheet with key takeaways and follow-up projects.\n\n```<links or text>```',
      'Generate flashcards from my notes. Provide Q/A pairs and tag difficulty levels.',
      'Propose a weekly study cadence balancing theory, building, and reflection.',
    ],
    handsOn: {
      beginner: [
        'Assemble 5 go-to resources per topic with notes.',
        'Use AI to create flashcards from your summaries.',
      ],
      intermediate: [
        'Create living knowledge base (Notion/Obsidian) with AI-assisted summaries.',
        'Automate spaced repetition schedule.',
      ],
      advanced: [
        'Build mini knowledge portal with search, AI-generated summaries, and tags.',
        'Publish public resource guide showcasing your system.',
      ],
    },
    tasks: {
      beginner: makeItems('m5', 'beginner', [
        'List top resources for fundamentals, web, backend, interviews.',
        'Summarize each resource in a paragraph (AI-assisted).',
        'Generate flashcards and store in spaced repetition tool.',
        'Schedule weekly review session and log outcomes.',
        'Create “flashcards.md” from your notes via AI.',
        'Share resource list with accountability partner.',
        'Track which resources paid off in project work.',
        'Write monthly reflection on learning velocity.',
      ]),
      intermediate: makeItems('m5', 'intermediate', [
        'Organize notes in Obsidian/Notion with backlinks.',
        'Automate note summary using AI templated prompt.',
        'Build dashboard to track completed modules/resources.',
        'Host knowledge base and invite feedback from peers.',
        'Run quarterly curriculum audit; add/remove resources.',
        'Document AI prompt recipes for summarization.',
        'Integrate daily journal template capturing wins/blocks.',
        'Publish “My Resource Playbook” blog post.',
      ]),
      advanced: makeItems('m5', 'advanced', [
        'Build custom search over notes with AI question-answering.',
        'Design taxonomy/tagging system for rapid retrieval.',
        'Automate reading queue prioritization using AI scoring.',
        'Track ROI of resources (impact vs time) in spreadsheet.',
        'Create shareable public site with curated learning paths.',
        'Host live session teaching your resource strategy.',
        'Iterate on AI prompts to improve summary fidelity.',
        'Contribute to community resource list with curated picks.',
        'Log experiments testing new AI learning workflows.',
      ]),
    },
  },
  {
    id: 'module-6',
    title: 'Module 6 • Interview Prep & Aptitude',
    focus: [
      'Structured DS/Algo practice with reflection and iteration',
      'System design fundamentals for collaborative conversations',
      'Aptitude prep (CCAT) with time management strategies',
    ],
    aiPrompts: [
      'Provide a post-mortem for this LeetCode problem. Include optimal approach, edge cases, and follow-up variations.\n\n```<problem summary>```',
      'Simulate a system design interview for “design a URL shortener”. Ask questions sequentially and critique my answers.',
      'Generate a CCAT-style rapid-fire quiz (10 questions) focusing on spatial reasoning.',
    ],
    handsOn: {
      beginner: [
        'Solve daily LeetCode easy problems with AI post-mortems.',
        'Practice CCAT mini-tests and build stamina.',
      ],
      intermediate: [
        'Mix medium LeetCode, mock interviews, and system design sketches.',
        'Use AI to grade your explanations.',
      ],
      advanced: [
        'Run full mock interviews (timed) and system design deep dives.',
        'Document patterns and heuristics for reuse.',
      ],
    },
    tasks: {
      beginner: makeItems('m6', 'beginner', [
        'Create 30-day interview prep plan balancing topics.',
        'Solve 5 easy LeetCode problems/week with write-ups.',
        'Use AI to explain optimal solutions after self-attempt.',
        'Track accuracy and speed in spreadsheet.',
        'Run CCAT mini-test twice per week; log scores.',
        'Practice telling project story using STAR framework.',
        'Record elevator pitch video and critique with AI feedback.',
        'Join study group or accountability partner check-in.',
      ]),
      intermediate: makeItems('m6', 'intermediate', [
        'Solve 10 medium LeetCode problems/week with timeboxing.',
        'Conduct weekly mock interview (Pramp or AI-simulated).',
        'Sketch one system design diagram each week.',
        'Use AI to challenge your solution with edge cases.',
        'Refine behavioral stories with metrics & outcomes.',
        'Simulate CCAT full test bi-weekly and analyze misses.',
        'Document question patterns and solution templates.',
        'Build interview readiness dashboard (progress tracker).',
        'Share learnings with peers via recap note.',
      ]),
      advanced: makeItems('m6', 'advanced', [
        'Target difficult LeetCode problems with timed constraints.',
        'Perform mock interviews with senior engineers or AI coach.',
        'Dissect real system design case studies and write critiques.',
        'Develop playbook of reusable system design components.',
        'Create CCAT strategy guide (skip logic, pacing).',
        'Run full interview day simulation (DSA + system + behavioral).',
        'Collect feedback and iterate on weaknesses weekly.',
        'Publish weekly prep summary with stats and insights.',
        'Build repository of annotated solutions for future refreshers.',
      ]),
    },
  },
  {
    id: 'module-7',
    title: 'Module 7 • Career Story & Continuous Growth',
    focus: [
      'Crafting a compelling portfolio and personal brand',
      'Communicating AI-accelerated workflows to employers',
      'Planning ongoing skill growth, networking, and learning loops',
    ],
    aiPrompts: [
      'Rewrite my resume bullets to highlight AI-assisted impact. Make them metric-driven.\n\n```<paste bullets>```',
      'Draft a LinkedIn post about how I learn 3× faster with AI, including hook, body, and CTA.',
      'Generate a script for a 90-second project demo video covering problem, solution, and AI contribution.',
    ],
    handsOn: {
      beginner: [
        'Publish a simple portfolio site and record demo video for flagship project.',
        'Document AI learning journey in journal post.',
      ],
      intermediate: [
        'Polish README files, add case studies, and collect testimonials.',
        'Plan networking outreach with AI-generated scripts.',
      ],
      advanced: [
        'Launch personal brand assets (site, newsletter, community).',
        'Automate weekly learning retrospectives and share publicly.',
      ],
    },
    tasks: {
      beginner: makeItems('m7', 'beginner', [
        'Update resume emphasizing AI-assisted learning.',
        'Create portfolio homepage with project summaries.',
        'Record 90-second demo video per project.',
        'Write LinkedIn post announcing learning journey.',
        'Draft outreach message for mentors (AI-assisted).',
        'Set 90-day growth plan with milestones.',
        'Join community (Discord/Slack) and introduce yourself.',
        'Track weekly wins in learning journal.',
      ]),
      intermediate: makeItems('m7', 'intermediate', [
        'Publish detailed case study for flagship project.',
        'Optimize README files for clarity + onboarding.',
        'Collect testimonials or peer reviews.',
        'Automate newsletter or update cadence (monthly).',
        'Use AI to tailor resume for specific roles.',
        'Build networking CRM to manage outreach.',
        'Host live session or AMA about AI learning.',
        'Document job search strategy and metrics.',
        'Plan post-offer skill roadmap.',
      ]),
      advanced: makeItems('m7', 'advanced', [
        'Launch personal brand hub (site + blog + newsletter).',
        'Share weekly retrospectives publicly.',
        'Create playbook for AI-accelerated onboarding at a new job.',
        'Mentor another learner, documenting the process.',
        'Automate content repurposing using AI workflows.',
        'Develop talk/workshop outline on AI-assisted engineering.',
        'Measure personal KPI dashboard (learning hours, shipped features).',
        'Set quarterly deep-dive themes and accountability systems.',
        'Reflect on long-term career thesis and publish it.',
      ]),
    },
  },
];

export const moduleIdList = modules.map((module) => module.id);

export const trackToHeadline: Record<Track, string> = {
  beginner: 'No coding or AI experience',
  intermediate: 'Coding experience, new to AI',
  advanced: 'Coding + AI experience; want production workflows',
};

