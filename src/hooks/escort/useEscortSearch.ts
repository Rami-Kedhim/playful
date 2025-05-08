
import { useState, useEffect } from 'react';
import { Escort } from '@/types/Escort'; // Using the correct casing
import { escortService } from '@/services/escortService';

export const useEscortSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Escort[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]);

  // Replace searchEscorts with a compatible approach
  const searchResults = async (query: string) => {
    setLoading(true);
    try {
      // Instead of escortService.searchEscorts, use getEscorts and filter locally
      const allEscorts = await escortService.getEscorts();
      const filtered = allEscorts.filter(escort => 
        escort.name.toLowerCase().includes(query.toLowerCase()) || 
        (escort.location && escort.location.toLowerCase().includes(query.toLowerCase()))
      );
      return filtered;
    } catch (error) {
      console.error('Error searching escorts:', error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      const fetchSearchResults = async () => {
        setLoading(true);
        setError(null);
        try {
          const results = await searchResults(debouncedSearchTerm);
          setSearchResults(results);
        } catch (err: any) {
          setError(err.message || 'Failed to fetch search results');
          setSearchResults([]);
        } finally {
          setLoading(false);
        }
      };

      fetchSearchResults();
    } else {
      setSearchResults([]);
    }
  }, [debouncedSearchTerm]);

  return {
    searchTerm,
    setSearchTerm,
    searchResults,
    loading,
    error
  };
};
