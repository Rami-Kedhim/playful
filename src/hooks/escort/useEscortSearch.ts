
import { useState, useEffect } from 'react';
import { Escort } from '@/types/Escort';
import { escortServiceInstance } from '@/services/escorts/escortService';

export const useEscortSearch = () => {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<Escort[]>([]);

  useEffect(() => {
    const search = async () => {
      if (!query && Object.keys(filters).length === 0) {
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        
        const results = await escortServiceInstance.searchEscorts(query, filters);
        setSearchResults(results);
      } catch (err: any) {
        console.error('Error searching escorts:', err);
        setError(err.message || 'Failed to search escorts');
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    // Debounce search
    const timer = setTimeout(() => {
      search();
    }, 500);

    return () => clearTimeout(timer);
  }, [query, filters]);

  return {
    query,
    setQuery,
    filters,
    setFilters,
    isLoading,
    error,
    searchResults
  };
};
