
import { useState, useCallback } from 'react';
import escortService from '@/services/escorts/escortService';
import { Escort } from '@/types/Escort';

export const useEscortSearch = () => {
  const [results, setResults] = useState<Escort[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  
  const search = useCallback(async (query: string, filters?: any) => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    
    setIsSearching(true);
    setSearchError(null);
    
    try {
      const searchResults = await escortService.searchEscorts(query, filters);
      setResults(searchResults);
    } catch (error: any) {
      console.error('Search error:', error);
      setSearchError(error.message || 'Failed to search escorts');
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  }, []);
  
  const clearSearch = useCallback(() => {
    setResults([]);
    setSearchError(null);
  }, []);
  
  return {
    results,
    isSearching,
    searchError,
    search,
    clearSearch
  };
};

export default useEscortSearch;
