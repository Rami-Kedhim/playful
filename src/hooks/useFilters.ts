
import { useState, useCallback } from 'react';

export interface Filters {
  availableOnly: boolean;
  verifiedOnly: boolean;
  gender: string[];
  // Add other filter properties as needed
}

export const useFilters = () => {
  const [filters, setFilters] = useState<Filters>({
    availableOnly: false,
    verifiedOnly: false,
    gender: []
  });

  const updateFilter = useCallback((key: keyof Filters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  }, []);

  const toggleFilter = useCallback((key: keyof Filters) => {
    setFilters(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      availableOnly: false,
      verifiedOnly: false,
      gender: []
    });
  }, []);

  return {
    filters,
    updateFilter,
    toggleFilter,
    resetFilters
  };
};

export default useFilters;
