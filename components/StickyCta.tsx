'use client';

import { useEffect, useState } from 'react';
import { isBrowser, setJson } from '@/lib/storage';

interface StickyCtaProps {
  onJoin: () => void;
}

export function StickyCta({ onJoin }: StickyCtaProps) {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [hasLogged, setHasLogged] = useState(false);

  useEffect(() => {
    if (!isBrowser) return;
    const storedDismissed = window.localStorage.getItem('aa.cta.dismissed') === 'true';
    setDismissed(storedDismissed);
  }, []);

  useEffect(() => {
    if (!isBrowser || dismissed) return;
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;
      const progress = window.scrollY / scrollHeight;
      const shouldShow = progress > 0.35;
      setVisible(shouldShow);
      if (shouldShow && !hasLogged) {
        window.aaLog?.('cta_shown', { source: 'sticky_bar' });
        setHasLogged(true);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [dismissed, hasLogged]);

  if (!visible || dismissed) return null;

  const dismiss = () => {
    setDismissed(true);
    if (isBrowser) {
      setJson('aa.cta.dismissed', true);
      window.aaLog?.('cta_dismissed', { source: 'sticky_bar' });
    }
  };

  return (
    <div className="fixed inset-x-0 bottom-4 z-40 px-4">
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 rounded-full border border-white/10 bg-slate-900/80 px-5 py-3 shadow-[0_20px_40px_rgba(15,23,42,0.45)] backdrop-blur-xl">
        <p className="text-sm text-slate-200">Ready to learn faster? Join the program.</p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onJoin}
            className="rounded-full border border-sky-400/60 bg-sky-500/20 px-4 py-2 text-sm font-semibold text-sky-200 shadow-[0_10px_25px_rgba(56,189,248,0.25)] transition-colors hover:border-sky-300 hover:text-sky-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050816]"
          >
            Join now
          </button>
          <button
            type="button"
            onClick={dismiss}
            className="rounded-full border border-white/10 p-2 text-xs text-slate-400 hover:text-sky-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050816]"
            aria-label="Dismiss join notification"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
}

