
import { useState, useEffect, useMemo } from 'react';
import { Escort } from '@/types/Escort';
import escortService from '@/services/escortService';

export const useEscorts = () => {
  const [escorts, setEscorts] = useState<Escort[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<Record<string, any>>({});

  useEffect(() => {
    const fetchEscorts = async () => {
      try {
        setLoading(true);
        const data = await escortService.getAllEscorts();
        setEscorts(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch escorts');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEscorts();
  }, []);

  // Featured escorts
  const featuredEscorts = useMemo(() => {
    return escorts.filter(escort => escort.featured);
  }, [escorts]);

  // Update filters
  const updateFilters = (newFilters: Record<string, any>) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters
    }));
  };

  // Apply current filters
  const applyCurrentFilters = () => {
    // Implementation would depend on your filtering logic
    console.log('Applying filters:', filters);
  };

  // Clear all filters
  const clearAllFilters = () => {
    setFilters({});
  };

  return {
    escorts,
    featuredEscorts,
    loading,
    error,
    filters,
    updateFilters,
    applyCurrentFilters,
    clearAllFilters
  };
};
