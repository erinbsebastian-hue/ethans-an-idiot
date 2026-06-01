import { useState, useEffect } from 'react';

export interface HistoryEntry {
  id: string;
  act: number;
  sat: number;
  percentile: number;
  timestamp: number;
}

const KEY = 'act_history';

export function useHistory() {
  const [history, setHistory] = useState<HistoryEntry[]>(() => {
    try { return JSON.parse(localStorage.getItem(KEY) ?? '[]'); }
    catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(history));
  }, [history]);

  const add = (entry: Omit<HistoryEntry, 'id' | 'timestamp'>) => {
    setHistory(prev => [
      { ...entry, id: crypto.randomUUID(), timestamp: Date.now() },
      ...prev.slice(0, 9),
    ]);
  };

  const clear = () => setHistory([]);

  return { history, add, clear };
}
