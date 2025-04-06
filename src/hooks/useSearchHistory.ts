
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface RecentSearch {
  id: string;
  query: string;
  type: string;
  timestamp: number;
}

export const useSearchHistory = (maxHistory: number = 10) => {
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([]);
  
  useEffect(() => {
    const savedSearches = localStorage.getItem('recentSearches');
    if (savedSearches) {
      try {
        const parsed = JSON.parse(savedSearches);
        setRecentSearches(parsed);
      } catch (e) {
        console.error('Failed to parse saved searches', e);
      }
    }
  }, []);
  
  const saveSearches = (searches: RecentSearch[]) => {
    localStorage.setItem('recentSearches', JSON.stringify(searches));
    setRecentSearches(searches);
  };
  
  const addSearch = (query: string, type: string) => {
    // Don't add empty searches
    if (!query.trim()) return;
    
    // Create new search object
    const newSearch: RecentSearch = {
      id: uuidv4(),
      query,
      type,
      timestamp: Date.now()
    };
    
    // Remove duplicates, add new search to the start, limit to maxHistory
    const updatedSearches = [
      newSearch,
      ...recentSearches.filter(s => !(s.query === query && s.type === type))
    ].slice(0, maxHistory);
    
    saveSearches(updatedSearches);
  };
  
  const clearSearch = (id: string) => {
    const updatedSearches = recentSearches.filter(s => s.id !== id);
    saveSearches(updatedSearches);
  };
  
  const clearAllSearches = () => {
    saveSearches([]);
  };
  
  return {
    recentSearches,
    addSearch,
    clearSearch,
    clearAllSearches,
  };
};
