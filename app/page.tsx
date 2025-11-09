'use client';

import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { clsx } from 'clsx';
import { TrackSelector } from '@/components/TrackSelector';
import { ModuleAccordion } from '@/components/ModuleAccordion';
import { JoinModal } from '@/components/JoinModal';
import { StickyCta } from '@/components/StickyCta';
import { modules, moduleIdList, trackToHeadline } from '@/content/modules';
import { appendEvent, getJson, isBrowser, setJson } from '@/lib/storage';
import { Track, TRACK_DEFINITIONS } from '@/types';

const heroButtons = [
  { label: 'Join the Program', action: 'join' as const },
  { label: 'Download Learning Journal', href: '/journal' },
  { label: 'Sample Portfolio Repo', href: 'https://github.com/' },
];

const whyBullets = [
  'Build 3–5× faster with AI pair-programming and instant debugging.',
  'Learn just-in-time — master concepts while shipping real features.',
  'Document everything: prompts, decisions, and trade-offs for interviews.',
];

export default function Home() {
  const [track, setTrack] = useState<Track>('beginner');
  const [openMap, setOpenMap] = useState<Record<string, boolean>>({});
  const [joinOpen, setJoinOpen] = useState(false);

  useEffect(() => {
    if (!isBrowser) return;
    if (!window.aaLog) {
      window.aaLog = (eventName: string, payload?: unknown) => {
        appendEvent(eventName, payload);
      };
    }
  }, []);

  useEffect(() => {
    if (!isBrowser) return;
    const storedTrack = (getJson<Track>('aa.track') ?? 'beginner') as Track;
    setTrack(storedTrack);
  }, []);

  useEffect(() => {
    if (!isBrowser) return;
    setJson('aa.track', track);
  }, [track]);

  const anyOpen = useMemo(() => Object.values(openMap).some(Boolean), [openMap]);

  const handleToggle = useCallback((moduleId: string, open: boolean) => {
    setOpenMap((prev) => ({ ...prev, [moduleId]: open }));
  }, []);

  const expandAll = () => {
    const nextState = moduleIdList.reduce<Record<string, boolean>>((acc, id) => {
      acc[id] = true;
      return acc;
    }, {});
    setOpenMap(nextState);
    window.aaLog?.('modules_expand_all', { track });
  };

  const collapseAll = () => {
    const nextState = moduleIdList.reduce<Record<string, boolean>>((acc, id) => {
      acc[id] = false;
      return acc;
    }, {});
    setOpenMap(nextState);
    window.aaLog?.('modules_collapse_all', { track });
  };

  const scrollToModules = () => {
    const section = document.getElementById('modules-section');
    section?.scrollIntoView({ behavior: 'smooth' });
  };

  const openJoinModal = () => {
    setJoinOpen(true);
    window.aaLog?.('join_modal_requested', { source: 'hero' });
  };

  const closeJoinModal = () => {
    setJoinOpen(false);
  };

  return (
    <>
      <main className="mx-auto flex max-w-6xl flex-col gap-16 px-4 pb-24 pt-16 sm:px-6 lg:px-8">
        <section className="rounded-[2.5rem] border border-white/10 bg-slate-900/40 p-8 shadow-[0_35px_90px_rgba(15,23,42,0.4)] backdrop-blur-2xl sm:p-12">
          <div className="space-y-6 text-center">
            <p className="eyebrow">AI-first learning</p>
            <h1 className="text-4xl font-bold leading-tight text-slate-100 sm:text-5xl lg:text-6xl">
              AI-Accelerated Software Engineering Course
            </h1>
            <p className="mx-auto max-w-2xl text-base text-slate-300 sm:text-lg">
              Learn to code, ship polished products, and pass interviews in months — not years. AI
              is your copilot, fundamentals are your foundation.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {heroButtons.map((button) =>
                button.action === 'join' ? (
                  <button
                    key={button.label}
                    type="button"
                    onClick={openJoinModal}
                    className="inline-flex items-center rounded-full border border-sky-400/70 bg-sky-500/20 px-6 py-3 text-sm font-semibold text-sky-200 shadow-[0_18px_45px_rgba(56,189,248,0.3)] transition hover:border-sky-300 hover:text-sky-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050816]"
                  >
                    {button.label}
                  </button>
                ) : (
                  <Link
                    key={button.label}
                    href={button.href}
                    className="inline-flex items-center rounded-full border border-slate-600 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-sky-300 hover:text-sky-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050816]"
                  >
                    {button.label}
                  </Link>
                )
              )}
            </div>
            <div className="mx-auto flex max-w-2xl flex-col gap-1 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-center sm:gap-6">
              <span>Journal: a template to track tasks, prompts, and reflections.</span>
              <span>Portfolio: see what “job-ready” looks like.</span>
            </div>
          </div>
        </section>

        <section className="space-y-8">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
            <div className="rounded-3xl border border-white/10 bg-slate-900/50 p-8 shadow-[0_20px_60px_rgba(15,23,42,0.35)]">
              <h2 className="text-3xl font-semibold text-slate-100">Why AI-accelerated?</h2>
              <p className="mt-2 text-sm text-slate-300">
                Your work isn’t replaced — it’s amplified. Pair fundamentals with automation so you
                can learn, build, and interview with momentum.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-slate-200">
                {whyBullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-sky-300"
                    />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-xs uppercase tracking-[0.35em] text-sky-200">
                GitHub research shows AI pair-programming speeds delivery by ~55%.
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-slate-900/50 p-8 shadow-[0_20px_60px_rgba(15,23,42,0.35)]">
              <h2 className="text-3xl font-semibold text-slate-100">Choose your starting point</h2>
              <p className="mt-2 text-sm text-slate-300">
                Set your track now—every module adapts to the goals and constraints of your level.
              </p>
              <div className="mt-6 grid gap-4">
                {TRACK_DEFINITIONS.map((definition) => (
                  <button
                    key={`card-${definition.id}`}
                    type="button"
                    onClick={() => {
                      setTrack(definition.id);
                      if (isBrowser) {
                        window.aaLog?.('track_card_select', { track: definition.id });
                      }
                    }}
                    className={clsx(
                      'rounded-2xl border border-white/10 bg-slate-900/60 p-5 text-left transition hover:border-sky-300/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050816]',
                      track === definition.id
                        ? 'border-sky-400/50 shadow-[0_15px_45px_rgba(56,189,248,0.25)]'
                        : ''
                    )}
                  >
                    <p className="text-sm font-semibold uppercase tracking-widest text-sky-200">
                      {definition.label}
                    </p>
                    <p className="mt-1 text-base text-slate-100">{definition.headline}</p>
                    <p className="mt-1 text-sm text-slate-300">{trackToHeadline[definition.id]}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
          <TrackSelector
            track={track}
            onTrackChange={(nextTrack) => {
              setTrack(nextTrack);
            }}
          />
        </section>

        <section id="modules-section" className="space-y-6">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <p className="eyebrow">Modules</p>
              <h2 className="text-3xl font-semibold text-slate-100">Seven guided modules</h2>
              <p className="text-sm text-slate-300">
                Each module aligns with your current track. Expand to view focus areas, hands-on
                projects, AI prompts, and your checklist.
              </p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={expandAll}
                className="rounded-full border border-sky-400/40 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-sky-200 transition hover:border-sky-300 hover:text-sky-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050816]"
              >
                Expand all
              </button>
              <button
                type="button"
                onClick={collapseAll}
                className="rounded-full border border-slate-500/50 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-slate-300 transition hover:border-slate-400 hover:text-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050816]"
              >
                Collapse all
              </button>
            </div>
          </div>
          <div className="space-y-5">
            {modules.map((module) => (
              <ModuleAccordion
                key={module.id}
                module={module}
                track={track}
                isOpen={!!openMap[module.id]}
                onToggle={(open) => handleToggle(module.id, open)}
              />
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-slate-900/50 p-8 shadow-[0_20px_60px_rgba(15,23,42,0.35)]">
          <h2 className="text-3xl font-semibold text-slate-100">Keep shipping</h2>
          <p className="mt-2 text-sm text-slate-300">
            Rerun modules whenever you need a tune-up. Share wins with the community, iterate on
            your workflows, and keep the flywheel spinning.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
              <h3 className="text-lg font-semibold text-slate-100">Portfolio-ready artifacts</h3>
              <p className="mt-2 text-sm text-slate-300">
                Case studies, demos, README files, and reflections baked into every module.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
              <h3 className="text-lg font-semibold text-slate-100">Community + accountability</h3>
              <p className="mt-2 text-sm text-slate-300">
                Join peers learning at the same pace. Swap prompts, debrief interviews, collaborate.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
              <h3 className="text-lg font-semibold text-slate-100">AI-native toolkit</h3>
              <p className="mt-2 text-sm text-slate-300">
                Templates, journaling flows, and automation recipes to keep scaling yourself.
              </p>
            </div>
          </div>
        </section>
      </main>

      {anyOpen && (
        <button
          type="button"
          onClick={scrollToModules}
          className="fixed bottom-24 right-6 z-40 rounded-full border border-sky-400/50 bg-slate-900/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-sky-200 shadow-[0_12px_30px_rgba(15,23,42,0.5)] transition hover:border-sky-300 hover:text-sky-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050816]"
        >
          Overview
        </button>
      )}

      <StickyCta onJoin={() => {
        setJoinOpen(true);
        window.aaLog?.('join_modal_requested', { source: 'sticky' });
      }} />
      <JoinModal open={joinOpen} onClose={closeJoinModal} defaultExperience={track} />
    </>
  );
}
