
import { useState, useEffect } from 'react';
import { Escort } from '@/types/escort';
import { escortServiceInstance } from '@/services/escorts/escortService';

const useEscortSearch = (initialQuery: string = '') => {
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<Escort[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const search = async () => {
      if (!query.trim()) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        // Updated to only use one parameter
        const searchResults = await escortServiceInstance.searchEscorts(query);
        setResults(searchResults);
      } catch (err) {
        setError('An error occurred while searching');
        console.error('Search error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    search();
  }, [query]);

  return {
    query,
    setQuery,
    results,
    isLoading,
    error,
  };
};

export default useEscortSearch;
