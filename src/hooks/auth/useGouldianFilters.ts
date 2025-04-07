
import { useState } from 'react';

export interface GouldianFilters {
  criteriaA?: string;
  criteriaB?: string;
  threshold?: number;
  enabled?: boolean;
}

export const useGouldianFilters = () => {
  const [filters, setFilters] = useState<GouldianFilters>({
    enabled: false,
    threshold: 75
  });
  
  const updateFilter = (key: keyof GouldianFilters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  const resetFilters = () => {
    setFilters({
      enabled: false,
      threshold: 75
    });
  };
  
  return {
    filters,
    setFilters,
    updateFilter,
    resetFilters
  };
};

export default useGouldianFilters;
