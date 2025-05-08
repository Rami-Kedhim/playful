
import { useState, useCallback } from 'react';
import escortService from '@/services/escorts/escortService';
import { Escort } from '@/types/Escort';

interface FilterParams {
  location?: string;
  services?: string[];
  minAge?: number;
  maxAge?: number;
  gender?: string;
  availableNow?: boolean;
  priceRange?: [number, number];
  sortBy?: string;
}

export const useEscortFilter = () => {
  const [escorts, setEscorts] = useState<Escort[]>([]);
  const [filteredEscorts, setFilteredEscorts] = useState<Escort[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filterParams, setFilterParams] = useState<FilterParams>({});

  const fetchEscorts = useCallback(async () => {
    setLoading(true);
    try {
      const data = await escortService.getAllEscorts();
      setEscorts(data);
      setFilteredEscorts(data);
      setError(null);
    } catch (err: any) {
      console.error('Error fetching escorts:', err);
      setError(err.message || 'Failed to load escorts');
    } finally {
      setLoading(false);
    }
  }, []);

  const applyFilters = useCallback((params: FilterParams) => {
    setFilterParams(params);
    
    if (!escorts.length) return;
    
    let result = [...escorts];
    
    if (params.location) {
      result = result.filter(escort => 
        escort.location?.toLowerCase().includes(params.location!.toLowerCase())
      );
    }
    
    if (params.services && params.services.length) {
      result = result.filter(escort => 
        params.services!.some(service => 
          escort.services?.includes(service)
        )
      );
    }
    
    if (params.minAge) {
      result = result.filter(escort => (escort.age || 0) >= params.minAge!);
    }
    
    if (params.maxAge) {
      result = result.filter(escort => (escort.age || Infinity) <= params.maxAge!);
    }
    
    if (params.gender) {
      result = result.filter(escort => escort.gender === params.gender);
    }
    
    if (params.availableNow) {
      // Implement logic to check availability
    }
    
    if (params.priceRange) {
      result = result.filter(escort => {
        const rate = escort.rate || 0;
        return rate >= params.priceRange![0] && rate <= params.priceRange![1];
      });
    }
    
    // Apply sorting
    if (params.sortBy) {
      switch (params.sortBy) {
        case 'price_asc':
          result.sort((a, b) => (a.rate || 0) - (b.rate || 0));
          break;
        case 'price_desc':
          result.sort((a, b) => (b.rate || 0) - (a.rate || 0));
          break;
        case 'rating':
          result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
          break;
        // Add more sorting options as needed
      }
    }
    
    setFilteredEscorts(result);
  }, [escorts]);

  return {
    escorts: filteredEscorts,
    loading,
    error,
    fetchEscorts,
    applyFilters,
    filterParams
  };
};

export default useEscortFilter;
