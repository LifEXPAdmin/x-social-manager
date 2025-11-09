export const isBrowser = typeof window !== 'undefined';

export function getJson<T>(key: string, fallback: T | null = null): T | null {
  if (!isBrowser) return fallback;
  try {
    const value = window.localStorage.getItem(key);
    if (value === null) return fallback;
    return JSON.parse(value) as T;
  } catch (error) {
    console.warn('[storage] failed to parse', key, error);
    return fallback;
  }
}

export function setJson(key: string, value: unknown) {
  if (!isBrowser) return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn('[storage] failed to set', key, error);
  }
}

export function remove(key: string) {
  if (!isBrowser) return;
  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    console.warn('[storage] failed to remove', key, error);
  }
}

export function removeByPrefix(prefix: string) {
  if (!isBrowser) return;
  try {
    const keys = Object.keys(window.localStorage).filter((key) => key.startsWith(prefix));
    keys.forEach((key) => window.localStorage.removeItem(key));
  } catch (error) {
    console.warn('[storage] failed to remove prefix', prefix, error);
  }
}

export function appendEvent(eventName: string, payload?: unknown) {
  if (!isBrowser) return;
  try {
    const entry = {
      event: eventName,
      payload,
      timestamp: new Date().toISOString(),
    };
    const events = getJson<any[]>('aa.events', []) ?? [];
    events.push(entry);
    setJson('aa.events', events);
  } catch (error) {
    console.warn('[storage] failed to record event', eventName, error);
  }
}

