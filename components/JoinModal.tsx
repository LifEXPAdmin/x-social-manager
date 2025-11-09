'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
import { clsx } from 'clsx';
import { Track, trackLabelMap } from '@/types';
import { isBrowser, setJson } from '@/lib/storage';

interface JoinModalProps {
  open: boolean;
  onClose: () => void;
  defaultExperience: Track;
}

const experienceOptions: { label: string; value: Track }[] = [
  { label: 'Beginner', value: 'beginner' },
  { label: 'Intermediate', value: 'intermediate' },
  { label: 'Advanced', value: 'advanced' },
];

export function JoinModal({ open, onClose, defaultExperience }: JoinModalProps) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [experience, setExperience] = useState<Track>(defaultExperience);
  const [goals, setGoals] = useState('');
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open || !isBrowser) return;
    window.aaLog?.('join_modal_open', { defaultExperience });
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const focusTimer = window.setTimeout(() => {
      firstFieldRef.current?.focus();
    }, 0);

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
      } else if (event.key === 'Tab') {
        const dialog = dialogRef.current;
        if (!dialog) return;
        const focusable = Array.from(
          dialog.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          )
        ).filter((el) => !el.hasAttribute('disabled'));
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        } else if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeydown);
    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener('keydown', handleKeydown);
      previouslyFocused?.focus();
    };
  }, [defaultExperience, onClose, open]);

  useEffect(() => {
    if (open) {
      setExperience(defaultExperience);
    }
  }, [defaultExperience, open]);

  if (!mounted || !open) {
    return null;
  }

  const closeModal = () => {
    onClose();
    setErrors({});
  };

  const validate = () => {
    const nextErrors: { name?: string; email?: string } = {};
    if (!name.trim()) nextErrors.name = 'Name is required.';
    if (!email.trim()) nextErrors.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) nextErrors.email = 'Enter a valid email.';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!validate()) return;

    const payload = {
      name: name.trim(),
      email: email.trim(),
      experience,
      goals: goals.trim(),
      submittedAt: new Date().toISOString(),
    };

    if (isBrowser) {
      setJson(`aa.lead.${Date.now()}`, payload);
      window.aaLog?.('join_submitted', payload);
    }

    closeModal();
    router.push('/welcome');
  };

  return createPortal(
    <div
      aria-modal="true"
      role="dialog"
      aria-labelledby="join-program-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-md"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          closeModal();
        }
      }}
    >
      <div
        ref={dialogRef}
        className="w-full max-w-lg rounded-3xl border border-white/10 bg-slate-900/90 p-6 text-left shadow-[0_25px_80px_rgba(15,23,42,0.65)]"
      >
        <div className="flex items-start justify-between">
          <h2 id="join-program-title" className="text-2xl font-semibold text-slate-100 sm:text-3xl">
            Join the program
          </h2>
          <button
            type="button"
            onClick={closeModal}
            className="rounded-full border border-white/10 p-2 text-slate-300 hover:border-sky-300/40 hover:text-sky-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050816]"
            aria-label="Close join form"
          >
            ×
          </button>
        </div>
        <p className="mt-2 text-sm text-slate-300">
          Tell us a bit about you and we&rsquo;ll send the onboarding kit, Discord invite, and weekly
          learning cadence.
        </p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div className="space-y-2">
            <label htmlFor="join-name" className="text-sm font-medium text-slate-200">
              Name
            </label>
            <input
              id="join-name"
              ref={firstFieldRef}
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-slate-100 shadow-inner focus:border-sky-400"
              placeholder="Ada Lovelace"
            />
            {errors.name && <p className="text-xs text-rose-300">{errors.name}</p>}
          </div>
          <div className="space-y-2">
            <label htmlFor="join-email" className="text-sm font-medium text-slate-200">
              Email
            </label>
            <input
              id="join-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-slate-100 shadow-inner focus:border-sky-400"
              placeholder="you@example.com"
            />
            {errors.email && <p className="text-xs text-rose-300">{errors.email}</p>}
          </div>
          <fieldset className="space-y-3">
            <legend className="text-sm font-medium text-slate-200">Experience level</legend>
            <div className="grid gap-2 sm:grid-cols-3">
              {experienceOptions.map((option) => (
                <label
                  key={option.value}
                  className={clsx(
                    'flex cursor-pointer items-center gap-2 rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2 text-sm text-slate-200 transition-colors',
                    experience === option.value
                      ? 'border-sky-400/50 bg-slate-900/80 text-sky-200'
                      : 'hover:border-sky-300/40'
                  )}
                >
                  <input
                    type="radio"
                    name="experience"
                    value={option.value}
                    checked={experience === option.value}
                    onChange={() => setExperience(option.value)}
                    className="h-4 w-4 border-slate-500 text-sky-400 focus:ring-sky-400"
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </fieldset>
          <div className="space-y-2">
            <label htmlFor="join-goals" className="text-sm font-medium text-slate-200">
              What do you want to ship next?
            </label>
            <textarea
              id="join-goals"
              value={goals}
              onChange={(event) => setGoals(event.target.value)}
              rows={4}
              className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-slate-100 shadow-inner focus:border-sky-400"
              placeholder="Share your goals or focus areas — we tailor resources around them."
            />
          </div>
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs text-slate-400">
              You&rsquo;ll also get the Discord invite &amp; learning journal template.
            </p>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-full border border-sky-400/60 bg-sky-500/20 px-6 py-2 text-sm font-semibold text-sky-200 shadow-[0_10px_30px_rgba(56,189,248,0.25)] transition-all hover:border-sky-300 hover:text-sky-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050816]"
            >
              Join now
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}

