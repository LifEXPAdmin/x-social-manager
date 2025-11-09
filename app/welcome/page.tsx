'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function WelcomePage() {
  useEffect(() => {
    window.aaLog?.('welcome_view', {});
  }, []);

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center gap-8 px-4 py-16 text-center sm:px-6 lg:px-8">
      <div className="space-y-4">
        <p className="eyebrow">You&apos;re in</p>
        <h1 className="text-4xl font-bold text-slate-100 sm:text-5xl">Welcome aboard!</h1>
        <p className="text-base text-slate-300 sm:text-lg">
          We&apos;ll reach out with your onboarding kit shortly. In the meantime, jump into the
          community, grab the learning journal, and plan your first build sprint.
        </p>
      </div>
      <div className="grid w-full gap-3 sm:grid-cols-3">
        <Link
          href="https://discord.gg/"
          className="rounded-2xl border border-sky-400/40 bg-sky-500/10 px-5 py-4 text-sm font-semibold text-sky-200 shadow-[0_18px_45px_rgba(56,189,248,0.25)] transition hover:border-sky-300 hover:text-sky-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050816]"
        >
          Join Discord
        </Link>
        <Link
          href="/journal"
          className="rounded-2xl border border-white/10 bg-slate-900/60 px-5 py-4 text-sm font-semibold text-slate-200 transition hover:border-sky-300 hover:text-sky-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050816]"
        >
          Download journal
        </Link>
        <Link
          href="/"
          className="rounded-2xl border border-white/10 bg-slate-900/60 px-5 py-4 text-sm font-semibold text-slate-200 transition hover:border-sky-300 hover:text-sky-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050816]"
        >
          Back to home
        </Link>
      </div>
      <p className="max-w-xl text-xs text-slate-400">
        We use your submission to personalize content and share relevant milestones. You can update
        your preferences anytime.
      </p>
    </main>
  );
}

