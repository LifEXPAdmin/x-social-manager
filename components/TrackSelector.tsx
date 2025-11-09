'use client';

import { useEffect, useState } from 'react';
import { clsx } from 'clsx';
import { TRACK_DEFINITIONS, Track } from '@/types';
import { isBrowser, setJson } from '@/lib/storage';

interface TrackSelectorProps {
  track: Track;
  onTrackChange: (track: Track) => void;
}

const trackToTagline: Record<Track, string> = {
  beginner: 'No coding or AI experience',
  intermediate: 'Coding experience, new to AI',
  advanced: 'Coding + AI experience; want production workflows',
};

export function TrackSelector({ track, onTrackChange }: TrackSelectorProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSelect = (next: Track) => {
    onTrackChange(next);
    if (isBrowser) {
      setJson('aa.track', next);
      window.aaLog?.('track_changed', { track: next });
    }
  };

  return (
    <section aria-label="Select learning track" className="space-y-4">
      <div className="flex flex-col gap-2 text-center">
        <p className="text-sm uppercase tracking-[0.35em] text-sky-200">Track selector</p>
        <h2 className="text-2xl font-semibold text-slate-100 sm:text-3xl">Choose your pace</h2>
        <p className="text-sm text-slate-300">
          Current focus:{' '}
          <span className="font-medium text-sky-200">
            {trackToTagline[mounted ? track : 'beginner']}
          </span>
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {TRACK_DEFINITIONS.map((definition) => {
          const isActive = track === definition.id;
          return (
            <button
              key={definition.id}
              type="button"
              onClick={() => handleSelect(definition.id)}
              className={clsx(
                'group relative flex h-full flex-col items-start gap-3 rounded-2xl border border-white/10 bg-slate-900/40 p-5 text-left transition-colors',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050816]',
                isActive
                  ? 'border-sky-400/60 bg-slate-900/70 shadow-[0_15px_40px_rgba(56,189,248,0.25)]'
                  : 'hover:border-sky-300/40 hover:bg-slate-900/60'
              )}
            >
              <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-sky-200">
                <span>{definition.label}</span>
                {isActive && <span aria-hidden="true">•</span>}
                <span className="rounded-full border border-sky-300/50 px-2 py-0.5 text-[10px] uppercase tracking-[0.35em] text-sky-200/80">
                  {definition.id}
                </span>
              </div>
              <p className="text-lg font-semibold text-slate-100">{definition.headline}</p>
              <p className="text-sm text-slate-300">{definition.description}</p>
            </button>
          );
        })}
      </div>
    </section>
  );
}

