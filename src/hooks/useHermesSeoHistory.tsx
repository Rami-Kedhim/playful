import { useState, useEffect } from 'react';
import { SeoOptimizationResult } from '@/services/seo/HermesSeoService';

interface HistoryEntry {
  contentId: string;
  contentType: 'profile' | 'content' | 'livecam' | 'event';
  timestamp: string;
  result: SeoOptimizationResult;
}

export const useHermesSeoHistory = (contentId?: string) => {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  
  // Load history from local storage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('hermes_seo_history');
    if (savedHistory) {
      try {
        const parsedHistory = JSON.parse(savedHistory) as HistoryEntry[];
        
        // If contentId is provided, filter history for that content
        if (contentId) {
          setHistory(parsedHistory.filter(entry => entry.contentId === contentId));
        } else {
          setHistory(parsedHistory);
        }
      } catch (error) {
        console.error('Failed to parse SEO history:', error);
        // If parsing fails, start with empty history
        setHistory([]);
      }
    }
  }, [contentId]);
  
  // Add a new entry to history
  const addHistoryEntry = (
    contentId: string,
    contentType: 'profile' | 'content' | 'livecam' | 'event',
    result: SeoOptimizationResult
  ) => {
    const newEntry: HistoryEntry = {
      contentId,
      contentType,
      timestamp: new Date().toISOString(),
      result
    };
    
    // Get current history from localStorage
    const savedHistory = localStorage.getItem('hermes_seo_history');
    let fullHistory: HistoryEntry[] = [];
    
    if (savedHistory) {
      try {
        fullHistory = JSON.parse(savedHistory);
      } catch (error) {
        console.error('Failed to parse existing history:', error);
      }
    }
    
    // Add new entry to full history
    const updatedHistory = [newEntry, ...fullHistory];
    
    // Keep only the latest 100 entries to prevent localStorage from growing too large
    const trimmedHistory = updatedHistory.slice(0, 100);
    
    // Save back to localStorage
    localStorage.setItem('hermes_seo_history', JSON.stringify(trimmedHistory));
    
    // Update state with history filtered for current contentId if needed
    if (contentId) {
      setHistory(trimmedHistory.filter(entry => entry.contentId === contentId));
    } else {
      setHistory(trimmedHistory);
    }
  };
  
  return {
    history,
    addHistoryEntry
  };
};

export default useHermesSeoHistory;
