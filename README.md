# AI-Accelerated Software Engineering Course

A single-page Next.js site that presents the “AI-Accelerated Software Engineering Learning Plan” — a guided curriculum for going from zero coding experience to shipping full products with the help of AI copilots.

## 🌟 What’s inside

- **Seven learning modules** that cover fundamentals, web dev, advanced paradigms, full-stack projects, best resources, interview prep, and career packaging.
- **AI playbooks** in every module to show how to combine hands-on work with tools like Cursor and ChatGPT without skipping the hard learning.
- **Call-to-action resources** (journal template, community invite, sample portfolio) to help learners stay organized.
- **Responsive, course-style design** tuned for reading on desktop or mobile.

## 🚀 Getting started

```bash
npm install
npm run dev
# open http://localhost:3000
```

No environment variables are required. Deploy to Vercel straight from the repository to share the course site publicly.

## 🗂️ Project structure

```
.
├── app/
│   ├── layout.tsx      # Root layout wrapper
│   ├── page.tsx        # Course content + sections
│   └── globals.css     # Global gradient theme + typography
├── public/             # (Optional) static assets
├── package.json        # Next.js 14 + TypeScript
└── README.md
```

## 🛠️ Tech stack

- Next.js 14 (App Router)
- TypeScript + React Server Components
- Custom CSS (no component library)
- Ready for Vercel deployment

## 📌 Customizing the course

- Update the `modules` array inside `app/page.tsx` to tweak module content, resources, or CTAs.
- Adjust global styling or theming in `app/globals.css` (fonts, colors, spacing).
- Add extra sections by extending the JSX structure in `page.tsx` (e.g., testimonials, FAQ, pricing tiers).

## 📄 License

Private use only. Not for redistribution without permission. Replace this notice with your own licensing if you repurpose the template.