'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function JournalPage() {
  useEffect(() => {
    window.aaLog?.('journal_view', {});
  }, []);

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center gap-6 px-4 py-16 text-center sm:px-6 lg:px-8">
      <div className="space-y-3">
        <p className="eyebrow">Learning journal</p>
        <h1 className="text-4xl font-bold text-slate-100 sm:text-5xl">Journal template</h1>
        <p className="text-base text-slate-300 sm:text-lg">
          Use this Google Docs template to capture prompts, reflections, and weekly retrospectives.
        </p>
      </div>
      <a
        href="https://docs.google.com/document"
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center rounded-full border border-sky-400/40 bg-sky-500/20 px-6 py-3 text-sm font-semibold text-sky-200 shadow-[0_18px_45px_rgba(56,189,248,0.3)] transition hover:border-sky-300 hover:text-sky-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050816]"
      >
        Open journal template
      </a>
      <Link
        href="/"
        className="text-xs text-slate-400 underline-offset-4 hover:text-slate-200 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050816]"
      >
        Back to home
      </Link>
    </main>
  );
}

