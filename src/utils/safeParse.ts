// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type JSONRecord = Record<string, any>;

export function safeParse<T = JSONRecord>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}
