'use client';

import { useEffect, useMemo, useState } from 'react';
import { ChecklistItem } from '@/types';
import { isBrowser } from '@/lib/storage';

interface ChecklistProps {
  items: ChecklistItem[];
  storageKeyPrefix: string;
}

export function Checklist({ items, storageKeyPrefix }: ChecklistProps) {
  const [state, setState] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!isBrowser) return;
    const next: Record<string, boolean> = {};
    items.forEach((item) => {
      const key = `${storageKeyPrefix}.task.${item.id}`;
      const raw = window.localStorage.getItem(key);
      next[item.id] = raw === 'true';
    });
    setState(next);
  }, [items, storageKeyPrefix]);

  const progress = useMemo(() => {
    const total = items.length || 1;
    const completed = Object.values(state).filter(Boolean).length;
    return {
      completed,
      total,
      percent: Math.round((completed / total) * 100),
    };
  }, [items.length, state]);

  const toggleItem = (item: ChecklistItem) => {
    setState((prev) => {
      const current = !!prev[item.id];
      const nextValue = !current;
      const nextState = { ...prev, [item.id]: nextValue };
      if (isBrowser) {
        window.localStorage.setItem(
          `${storageKeyPrefix}.task.${item.id}`,
          nextValue ? 'true' : 'false'
        );
        window.aaLog?.('checklist_toggle', {
          prefix: storageKeyPrefix,
          itemId: item.id,
          checked: nextValue,
        });
      }
      return nextState;
    });
  };

  const resetModule = () => {
    if (!isBrowser) return;
    items.forEach((item) => {
      window.localStorage.removeItem(`${storageKeyPrefix}.task.${item.id}`);
    });
    window.aaLog?.('checklist_reset', { prefix: storageKeyPrefix });
    setState({});
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col">
          <p className="text-sm font-medium text-slate-200">
            Progress: {progress.completed}/{progress.total}
          </p>
          <div className="h-2 w-full rounded-full bg-slate-700">
            <div
              className="h-2 rounded-full bg-sky-400 transition-[width] duration-500"
              style={{ width: `${progress.percent}%` }}
              aria-hidden="true"
            />
          </div>
        </div>
        <button
          type="button"
          onClick={resetModule}
          className="text-xs font-medium text-slate-300 underline-offset-4 hover:text-sky-200 hover:underline focus-visible:text-sky-100"
        >
          Reset module
        </button>
      </div>
      <ul className="space-y-2">
        {items.map((item) => {
          const checked = !!state[item.id];
          return (
            <li key={item.id} className="flex items-start gap-3 rounded-xl border border-white/10 bg-slate-900/40 p-3">
              <input
                id={`${storageKeyPrefix}-${item.id}`}
                type="checkbox"
                className="mt-1 h-5 w-5 flex-shrink-0 cursor-pointer rounded border-slate-500 bg-slate-800 text-sky-400 focus:ring-sky-400"
                checked={checked}
                onChange={() => toggleItem(item)}
              />
              <label
                htmlFor={`${storageKeyPrefix}-${item.id}`}
                className="flex flex-1 flex-col text-sm text-slate-200"
              >
                {item.link ? (
                  <a href={item.link} target="_blank" rel="noreferrer" className="underline">
                    {item.label}
                  </a>
                ) : (
                  item.label
                )}
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

