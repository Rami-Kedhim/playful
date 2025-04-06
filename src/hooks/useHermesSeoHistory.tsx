
import { useState, useEffect } from 'react';
import { SeoOptimizationResult } from '@/services/seo/HermesSeoService';

interface SeoHistoryEntry {
  timestamp: number;
  contentId: string;
  contentType: 'profile' | 'content' | 'livecam' | 'event';
  result: SeoOptimizationResult;
}

export const useHermesSeoHistory = (contentId?: string) => {
  const [history, setHistory] = useState<SeoHistoryEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load history from localStorage on component mount
    const loadHistory = () => {
      try {
        setIsLoading(true);
        const storedHistory = localStorage.getItem('hermes_seo_history');
        if (storedHistory) {
          const parsedHistory: SeoHistoryEntry[] = JSON.parse(storedHistory);
          
          // Filter by contentId if provided
          const filteredHistory = contentId 
            ? parsedHistory.filter(entry => entry.contentId === contentId) 
            : parsedHistory;
          
          // Sort by timestamp (newest first)
          const sortedHistory = filteredHistory.sort((a, b) => b.timestamp - a.timestamp);
          
          setHistory(sortedHistory);
        }
      } catch (error) {
        console.error('Error loading SEO history:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadHistory();
  }, [contentId]);

  const addHistoryEntry = (
    contentId: string,
    contentType: 'profile' | 'content' | 'livecam' | 'event',
    result: SeoOptimizationResult
  ) => {
    try {
      // Create new entry
      const newEntry: SeoHistoryEntry = {
        timestamp: Date.now(),
        contentId,
        contentType,
        result
      };

      // Get existing history
      const storedHistory = localStorage.getItem('hermes_seo_history');
      const parsedHistory: SeoHistoryEntry[] = storedHistory ? JSON.parse(storedHistory) : [];
      
      // Add new entry
      const updatedHistory = [newEntry, ...parsedHistory];
      
      // Limit history to 50 entries to prevent localStorage bloat
      const limitedHistory = updatedHistory.slice(0, 50);
      
      // Save back to localStorage
      localStorage.setItem('hermes_seo_history', JSON.stringify(limitedHistory));
      
      // Update state
      setHistory(contentId 
        ? limitedHistory.filter(entry => entry.contentId === contentId)
        : limitedHistory
      );
      
      return newEntry;
    } catch (error) {
      console.error('Error saving SEO history:', error);
      return null;
    }
  };

  const clearHistory = () => {
    try {
      if (contentId) {
        // Only clear entries for this contentId
        const storedHistory = localStorage.getItem('hermes_seo_history');
        if (storedHistory) {
          const parsedHistory: SeoHistoryEntry[] = JSON.parse(storedHistory);
          const filteredHistory = parsedHistory.filter(entry => entry.contentId !== contentId);
          localStorage.setItem('hermes_seo_history', JSON.stringify(filteredHistory));
          setHistory([]);
        }
      } else {
        // Clear all history
        localStorage.removeItem('hermes_seo_history');
        setHistory([]);
      }
      return true;
    } catch (error) {
      console.error('Error clearing SEO history:', error);
      return false;
    }
  };

  return {
    history,
    isLoading,
    addHistoryEntry,
    clearHistory
  };
};

export default useHermesSeoHistory;
