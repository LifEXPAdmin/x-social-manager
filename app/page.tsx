const modules = [
  {
    title: 'Module 1 • Programming Fundamentals',
    goal:
      'Build core coding skills in an approachable language (Python or JavaScript) so AI-assisted workflows have a solid foundation.',
    focus: [
      'Data types, variables, conditionals, loops, functions, basic OOP, file I/O, and error handling',
      'Grasp how code flows so AI output is understandable and easy to debug',
    ],
    practice: [
      'Create small utilities: a palindrome checker, CLI calculator, text file formatter',
      'Use AI to clarify errors or syntax, but always re-write and explain the solution in your own words',
    ],
    aiBoost: [
      'Treat ChatGPT/Cursor as a tutor who explains stack traces and suggests alternatives',
      'Ask for step-by-step debugging help, then document what you learned in a short note',
    ],
  },
  {
    title: 'Module 2 • Web Foundations (HTML, CSS, JavaScript)',
    goal:
      'Understand how the modern web is assembled so you can ship polished interfaces and use frameworks later.',
    focus: [
      'Semantic HTML5 structure, accessible forms, meta tags',
      'Responsive layouts with Flexbox/Grid, design systems, typography, color theory',
      'DOM manipulation, events, state with vanilla JavaScript',
    ],
    practice: [
      'Build a personal homepage, a responsive landing page, and a vanilla JS to-do list',
      'Iterate using AI for CSS refinements or explaining DOM APIs you just learned',
    ],
    aiBoost: [
      'Ask AI to review your markup for accessibility pitfalls',
      'Generate alternative CSS layouts and compare results to strengthen intuition',
    ],
  },
  {
    title: 'Module 3 • Programming Paradigms & Advanced Concepts',
    goal:
      'Think like a professional engineer: organize code, understand data structures, and collaborate with confidence.',
    focus: [
      'Object-oriented design, functional patterns, clean code principles',
      'Data structures (arrays → graphs) and algorithms (search, sort, recursion, DP)',
      'Git & GitHub workflows, testing basics, refactoring patterns',
    ],
    practice: [
      'Implement classic algorithms and unit tests in your primary language',
      'Refactor a previous project applying a design pattern (e.g., MVC for a web app)',
      'Use Git branches + pull requests to simulate team collaboration',
    ],
    aiBoost: [
      'Have AI explain time/space complexity of your solutions',
      'Request code reviews from AI, then compare feedback with your own assessment',
    ],
  },
  {
    title: 'Module 4 • Full-Stack & App Projects',
    goal:
      'Ship complete products—frontend, backend, or mobile—using AI as a pair-programmer while keeping control of architecture.',
    focus: [
      'REST APIs with Node/Express or Python/Flask, data modeling, authentication patterns',
      'Frontend frameworks (React/Vue) or SwiftUI for mobile, consuming your APIs',
      'Deployment basics, environment variables, logging, and monitoring',
    ],
    practice: [
      'Build a notes or habit-tracker app end-to-end, with a hosted backend and polished UI',
      'Add optional iOS companion app if mobile interests you',
      'Document architecture decisions and trade-offs in a README or blog post',
    ],
    aiBoost: [
      'Prompt AI for boilerplate (routing, fetch wrappers, SwiftUI views) and customize manually',
      'Use AI-generated test data and documentation templates to speed up polish',
    ],
  },
  {
    title: 'Module 5 • Resource Playbook',
    goal:
      'Curate a personal “curriculum” so you always know the best place to learn the next concept.',
    focus: [
      'CS fundamentals: Harvard CS50, freeCodeCamp, Automate the Boring Stuff',
      'Web dev tracks: The Odin Project, MDN, freeCodeCamp Responsive Web Design',
      'Backend & databases: freeCodeCamp APIs, SQLZoo, Flask/Express crash courses',
      'iOS specialization: Hacking with Swift, Stanford CS193p',
    ],
    practice: [
      'Design a weekly study plan with theory time, build time, and reflection notes',
      'Keep a learning journal summarizing concepts in your own words',
    ],
    aiBoost: [
      'Ask AI to synthesize multiple sources into a concise study guide or cheat sheet',
      'Generate flashcards or quick quizzes from your notes to reinforce retention',
    ],
  },
  {
    title: 'Module 6 • Interview Prep & Aptitude',
    goal:
      'Demonstrate your skills under pressure—coding interviews, CCAT aptitude tests, behavioral storytelling.',
    focus: [
      'Data structures & algorithms practice (LeetCode, Tech Interview Handbook plan)',
      'System design fundamentals (System Design Primer) for big-picture thinking',
      'CCAT strategy: timing drills, JobFlare practice mini-games, skip logic',
      'Behavioral narratives: STAR method, highlighting AI-accelerated learning',
    ],
    practice: [
      'Daily timed LeetCode sessions (self + AI explanations afterwards)',
      'Weekly mock interviews (Pramp, peer sessions, AI roleplay)',
      'Regular CCAT-style quick drills to build speed and calm under the timer',
    ],
    aiBoost: [
      'Use AI for post-mortems: “Explain optimal solution”, “What edge cases did I miss?”',
      'Simulate interviewers in ChatGPT to practice communication and pacing',
    ],
  },
  {
    title: 'Module 7 • Career Story & Continuous Growth',
    goal:
      'Package everything into a compelling portfolio and lifelong learning loop.',
    focus: [
      'Portfolio website, GitHub activity, polished READMEs and demo videos',
      'Resume emphasizing AI-assisted learning speed and shipped projects',
      'Community involvement (open source, forums, meetups) to keep momentum',
      'Learning cadence: plan each quarter with new technologies or deeper dives',
    ],
    practice: [
      'Record walkthrough videos for key projects to practice technical storytelling',
      'Write a blog post or LinkedIn article about your AI-first learning journey',
      'Schedule periodic skill retrospectives—what to double-down on next',
    ],
    aiBoost: [
      'Generate resume bullet drafts from project summaries, then refine manually',
      'Use AI to analyze job descriptions and map them to your skills & projects',
    ],
  },
];

const freeTierNotes = [
  'This site now focuses on the learning journey; AI integrations are advisory rather than automated.',
  'Follow each module sequentially or jump to the section you need most right now.',
  'Every checklist item is “AI-friendly”: attempt it yourself, then ask AI to critique or extend your work.',
];

const ctaLinks = [
  {
    label: 'Download Learning Journal Template',
    href: 'https://docs.google.com/document',
  },
  {
    label: 'Join the AI Coding Community (Discord)',
    href: 'https://discord.gg/',
  },
  {
    label: 'View Sample Portfolio Repo',
    href: 'https://github.com/',
  },
];

export default function Home() {
  return (
    <main className="page">
      <header className="hero">
        <span className="eyebrow">From beginner to AI-accelerated engineer</span>
        <h1>AI-Accelerated Software Engineering Course</h1>
        <p>
          A step-by-step learning experience that teaches you how to code, ship full products, and
          prepare for tech interviews in months—not years. AI tools are copilots, not crutches: you
          will still master fundamentals, but with the speed only modern tooling can provide.
        </p>
        <div className="cta-row">
          {ctaLinks.map((link) => (
            <a key={link.label} href={link.href} className="cta-button">
              {link.label}
            </a>
          ))}
        </div>
      </header>

      <section className="overview">
        <h2>How the program works</h2>
        <div className="overview-grid">
          <div className="card">
            <h3>Seven guided modules</h3>
            <p>
              Each module combines quick theory, curated resources, hands-on projects, and AI
              prompts. Work through them in sequence for a fast-track curriculum or focus on the
              areas you need right now.
            </p>
          </div>
          <div className="card">
            <h3>AI as your mentor</h3>
            <p>
              You&apos;ll learn how to prompt AI for explanations, code reviews, debugging help, and
              portfolio polish—while keeping yourself in the driver&apos;s seat.
            </p>
          </div>
          <div className="card">
            <h3>Build + document everything</h3>
            <p>
              Every module comes with deliverables that double as portfolio artifacts: mini-apps,
              architecture notes, interview prep logs, and more.
            </p>
          </div>
        </div>
        <ul className="note-list">
          {freeTierNotes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      </section>

      <section className="modules">
        {modules.map((module) => (
          <article key={module.title} className="module-card">
            <h2>{module.title}</h2>
            <p className="module-goal">{module.goal}</p>
            <div className="module-columns">
              <div>
                <h3>Focus</h3>
                <ul>
                  {module.focus.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3>Hands-on practice</h3>
                <ul>
                  {module.practice.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3>AI boost</h3>
                <ul>
                  {module.aiBoost.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="closing">
        <h2>What you&apos;ll achieve</h2>
        <div className="closing-grid">
          <div className="card">
            <h3>Full-stack portfolio</h3>
            <p>
              Launch a web or mobile app, complete with backend, tests, and deployment notes, to
              show employers you can deliver end-to-end.
            </p>
          </div>
          <div className="card">
            <h3>Interview readiness</h3>
            <p>
              Feel confident tackling coding challenges, the CCAT, and behavioral questions—with
              documented prep that proves your consistency.
            </p>
          </div>
          <div className="card">
            <h3>AI-native workflows</h3>
            <p>
              Work faster than traditional bootcamp grads by pairing human problem-solving with
              AI guidance while maintaining code quality.
            </p>
          </div>
        </div>
        <p className="closing-note">
          Stay curious. Rerun modules as you grow, deepen topics with additional resources, and keep
          iterating on your projects. This roadmap evolves with you—and so will the AI tools you
          wield every day.
        </p>
      </section>
    </main>
  );
}
