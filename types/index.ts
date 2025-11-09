export type Track = 'beginner' | 'intermediate' | 'advanced';

export interface ChecklistItem {
  id: string;
  label: string;
  link?: string;
}

export interface Module {
  id: string;
  title: string;
  focus: string[];
  aiPrompts: string[];
  handsOn: Record<Track, string[]>;
  tasks: Record<Track, ChecklistItem[]>;
}

export interface TrackDefinition {
  id: Track;
  label: string;
  headline: string;
  description: string;
}

export const TRACK_DEFINITIONS: TrackDefinition[] = [
  {
    id: 'beginner',
    label: 'Beginner',
    headline: 'Start from zero with a friendly on-ramp.',
    description: 'No coding or AI experience — build fluency step by step.',
  },
  {
    id: 'intermediate',
    label: 'Intermediate',
    headline: 'You code already; add AI workflows.',
    description: 'Some software experience, ready to integrate AI pair-programming.',
  },
  {
    id: 'advanced',
    label: 'Advanced',
    headline: 'Ship like a senior: architecture, tests, polish.',
    description: 'Comfortable with code + AI and focused on production workflows.',
  },
];

export const trackLabelMap: Record<Track, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
};

declare global {
  interface Window {
    aaLog: (eventName: string, payload?: unknown) => void;
  }
}

export {};

