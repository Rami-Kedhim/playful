
import { useState, useEffect, useCallback } from 'react';
import escortService from '@/services/escorts/escortService';
import { Escort } from '@/types/Escort';

interface SearchFilters {
  location?: string;
  services?: string[];
  priceRange?: [number, number];
  age?: [number, number];
  gender?: string;
  sortBy?: string;
  page?: number;
  limit?: number;
}

export const useEscortSearch = (initialFilters: SearchFilters = {}) => {
  const [filters, setFilters] = useState<SearchFilters>(initialFilters);
  const [escorts, setEscorts] = useState<Escort[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);

  const searchEscorts = useCallback(async (searchFilters: SearchFilters = filters) => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, total } = await escortService.searchEscorts(searchFilters);
      setEscorts(data);
      setTotalCount(total);
    } catch (err: any) {
      console.error('Error searching escorts:', err);
      setError(err.message || 'Failed to search escorts');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  // Search with initial filters when component mounts
  useEffect(() => {
    searchEscorts(initialFilters);
  }, [initialFilters, searchEscorts]);

  const updateFilters = (newFilters: Partial<SearchFilters>) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      ...newFilters,
      // Reset to page 1 when filters change (except when page is specifically updated)
      page: newFilters.hasOwnProperty('page') ? newFilters.page : 1
    }));
  };

  const resetFilters = () => {
    setFilters({});
    searchEscorts({});
  };

  return {
    escorts,
    loading,
    error,
    totalCount,
    filters,
    updateFilters,
    resetFilters,
    searchEscorts
  };
};

export default useEscortSearch;
