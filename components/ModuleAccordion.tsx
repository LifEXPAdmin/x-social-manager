/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
'use client';

import { useEffect, useRef, useState } from 'react';
import { clsx } from 'clsx';
import { Checklist } from '@/components/Checklist';
import { Module, Track, trackLabelMap } from '@/types';

interface ModuleAccordionProps {
  module: Module;
  track: Track;
  isOpen: boolean;
  onToggle: (open: boolean) => void;
}

export function ModuleAccordion({ module, track, isOpen, onToggle }: ModuleAccordionProps) {
  const buttonId = `${module.id}-trigger`;
  const panelId = `${module.id}-panel`;
  const contentRef = useRef<HTMLDivElement>(null);
  const firstRunRef = useRef(true);
  const [copiedPromptIndex, setCopiedPromptIndex] = useState<number | null>(null);

  useEffect(() => {
    const element = contentRef.current;
    if (!element) return;
    const targetHeight = isOpen ? `${element.scrollHeight}px` : '0px';
    element.style.maxHeight = targetHeight;
    element.style.opacity = isOpen ? '1' : '0';
    if (firstRunRef.current) {
      firstRunRef.current = false;
      return;
    }
    window.aaLog?.(isOpen ? 'module_open' : 'module_close', { moduleId: module.id, track });
  }, [isOpen, module.id, track]);

  useEffect(() => {
    if (!isOpen) {
      setCopiedPromptIndex(null);
    }
  }, [isOpen]);

  const handleCopyPrompt = async (prompt: string, index: number) => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopiedPromptIndex(index);
      window.aaLog?.('prompt_copied', { moduleId: module.id, track, index });
      setTimeout(() => setCopiedPromptIndex((value) => (value === index ? null : value)), 2000);
    } catch (error) {
      console.warn('Failed to copy prompt', error);
    }
  };

  return (
    <article
      className={clsx(
        'rounded-3xl border border-white/10 bg-slate-900/40 shadow-[0_20px_60px_rgba(15,23,42,0.35)] backdrop-blur-lg transition-colors',
        isOpen ? 'border-sky-400/40' : 'hover:border-sky-300/30'
      )}
    >
      <button
        id={buttonId}
        type="button"
        className="flex w-full items-start justify-between gap-4 rounded-3xl px-6 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050816]"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => onToggle(!isOpen)}
      >
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.35em] text-sky-200">{module.id}</p>
          <h3 className="text-2xl font-semibold text-slate-100 sm:text-3xl">{module.title}</h3>
          <p className="text-sm text-slate-300">
            This module adapts to:{' '}
            <span className="font-medium text-sky-200">{trackLabelMap[track]}</span>
          </p>
        </div>
        <span
          aria-hidden="true"
          className={clsx(
            'mt-2 inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-sky-300/40 text-sky-200 transition-transform duration-300',
            isOpen ? 'rotate-45 bg-sky-300/20' : 'bg-slate-800/60'
          )}
        >
          +
        </span>
      </button>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        ref={contentRef}
        className="grid max-h-0 overflow-hidden px-6 pb-6 text-slate-200 opacity-0 transition-all duration-500 ease-in-out motion-reduce:transition-none"
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-widest text-sky-200">
              Focus
            </h4>
            <ul className="space-y-2 text-sm text-slate-300">
              {module.focus.map((item) => (
                <li key={item} className="flex gap-2">
                  <span aria-hidden="true" className="mt-1 h-2 w-2 rounded-full bg-sky-300" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="space-y-2">
              <h4 className="text-sm font-semibold uppercase tracking-widest text-sky-200">
                Hands-on ({trackLabelMap[track]})
              </h4>
              <ul className="space-y-2 text-sm text-slate-300">
                {module.handsOn[track].map((item) => (
                  <li key={item} className="flex gap-2">
                    <span aria-hidden="true" className="mt-1 h-2 w-2 rounded-full bg-emerald-300" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-widest text-sky-200">
              AI Boost Prompts
            </h4>
            <ul className="space-y-3 text-sm text-slate-300">
              {module.aiPrompts.map((prompt, index) => (
                <li key={prompt} className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
                  <pre className="whitespace-pre-wrap text-xs text-slate-200">{prompt}</pre>
                  <button
                    type="button"
                    onClick={() => handleCopyPrompt(prompt, index)}
                    className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-sky-300 underline-offset-4 hover:text-sky-200 hover:underline focus-visible:text-sky-100"
                  >
                    {copiedPromptIndex === index ? 'Copied!' : 'Copy prompt'}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-6 rounded-3xl border border-white/10 bg-slate-900/40 p-5">
          <Checklist items={module.tasks[track]} storageKeyPrefix={`aa.${module.id}.${track}`} />
        </div>
      </div>
    </article>
  );
}

