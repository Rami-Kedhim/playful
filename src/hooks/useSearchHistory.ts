
import { useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface RecentSearch {
  id: string;
  query: string;
  type: string;
  timestamp: number;
}

export interface SearchHistoryOptions {
  maxHistory?: number;
  storageKey?: string;
}

export const useSearchHistory = (options: SearchHistoryOptions = {}) => {
  const { 
    maxHistory = 10,
    storageKey = 'recentSearches'
  } = options;

  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([]);
  
  // Load saved searches from localStorage
  useEffect(() => {
    const loadSavedSearches = () => {
      const savedSearches = localStorage.getItem(storageKey);
      if (savedSearches) {
        try {
          const parsed = JSON.parse(savedSearches);
          setRecentSearches(parsed);
        } catch (e) {
          console.error('Failed to parse saved searches', e);
          // If parsing fails, reset the storage
          localStorage.removeItem(storageKey);
        }
      }
    };
    
    loadSavedSearches();
  }, [storageKey]);
  
  // Save searches to localStorage
  const saveSearches = useCallback((searches: RecentSearch[]) => {
    localStorage.setItem(storageKey, JSON.stringify(searches));
    setRecentSearches(searches);
  }, [storageKey]);
  
  // Add a new search to history
  const addSearch = useCallback((query: string, type: string) => {
    // Don't add empty searches
    if (!query.trim()) return;
    
    // Create new search object
    const newSearch: RecentSearch = {
      id: uuidv4(),
      query: query.trim(),
      type,
      timestamp: Date.now()
    };
    
    // Remove duplicates, add new search to the start, limit to maxHistory
    setRecentSearches(prevSearches => {
      const updatedSearches = [
        newSearch,
        ...prevSearches.filter(s => !(s.query.toLowerCase() === query.toLowerCase() && s.type === type))
      ].slice(0, maxHistory);
      
      localStorage.setItem(storageKey, JSON.stringify(updatedSearches));
      return updatedSearches;
    });
  }, [maxHistory, storageKey]);
  
  // Clear a specific search from history
  const clearSearch = useCallback((id: string) => {
    setRecentSearches(prevSearches => {
      const updatedSearches = prevSearches.filter(s => s.id !== id);
      localStorage.setItem(storageKey, JSON.stringify(updatedSearches));
      return updatedSearches;
    });
  }, [storageKey]);
  
  // Clear all searches from history
  const clearAllSearches = useCallback(() => {
    localStorage.removeItem(storageKey);
    setRecentSearches([]);
  }, [storageKey]);
  
  return {
    recentSearches,
    addSearch,
    clearSearch,
    clearAllSearches,
  };
};

export default useSearchHistory;
