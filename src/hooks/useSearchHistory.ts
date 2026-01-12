import { useEffect, useState } from 'react';

const STORAGE_KEY = 'search_history';
const MAX_HISTORY_COUNT = 8;

export default function useSearchHistory() {
  const [history, setHistory] = useState<string[]>(() => {
    try {
      const storedHistory = localStorage.getItem(STORAGE_KEY);
      if (!storedHistory) return [];

      const parsedHistory = JSON.parse(storedHistory);
      if (Array.isArray(parsedHistory) && parsedHistory.every(item => typeof item === 'string')) {
        return parsedHistory.slice(0, MAX_HISTORY_COUNT);
      }

      return [];
    } catch (e) {
      console.error(e);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  }, [history]);

  // 검색 기록 추가
  const add = (keyword: string) => {
    if (keyword.trim() === '') return;
    setHistory(prev => {
      const newHistory = [keyword, ...prev.filter(item => item !== keyword)];
      return newHistory.slice(0, MAX_HISTORY_COUNT);
    });
  };

  // 검색 기록 삭제
  const remove = (keyword: string) => {
    setHistory(prev => prev.filter(item => item !== keyword));
  };

  // 전체 삭제
  const clear = () => setHistory([]);

  return { history, add, remove, clear };
}
