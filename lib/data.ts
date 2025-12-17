// lib/data.ts

export const categories = ["Food", "Transport", "School", "Load", "Fun", "Savings"];

// Offline storage utilities
export const storageKeys = {
  transactions: 'pitaka-transactions',
  accounts: 'pitaka-accounts',
  goals: 'pitaka-goals',
  budgets: 'pitaka-budgets',
  username: 'pitaka-username'
};

export function getOfflineData<T>(key: string): T | null {
  if (typeof window === 'undefined') return null;
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

export function setOfflineData<T>(key: string, data: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch {
    // Silently fail if localStorage is full
  }
}

export function isOfflineCapable(): boolean {
  return typeof window !== 'undefined' && 'localStorage' in window;
}