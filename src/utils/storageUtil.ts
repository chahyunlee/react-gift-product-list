export const storageUtil = {
  set<T>(key: string, value: T) {
    localStorage.setItem(key, JSON.stringify(value));
  },

  get<T>(key: string): T | null {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : null;
  },

  clear(key: string) {
    localStorage.removeItem(key);
  },
};
