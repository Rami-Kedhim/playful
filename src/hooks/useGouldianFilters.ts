
import { useState, useCallback } from 'react';

export interface GouldianFilters {
  trustThreshold: number;
  hermesMode: string;
  oxumPriceMultiplier: number;
  toneFilter: string;
  responseDelayMs: number;
}

export const defaultFilters: GouldianFilters = {
  trustThreshold: 50,
  hermesMode: 'emotional',
  oxumPriceMultiplier: 1.0,
  toneFilter: 'authentic',
  responseDelayMs: 0,
};

export const useGouldianFilters = () => {
  const [filters, setFilters] = useState<GouldianFilters>(defaultFilters);
  
  const updateFilter = useCallback((key: keyof GouldianFilters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  }, []);
  
  const resetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);
  
  // For compatibility with code that uses systemSettings
  const systemSettings = {
    trustThreshold: filters.trustThreshold,
    hermesMode: filters.hermesMode,
    oxumPriceMultiplier: filters.oxumPriceMultiplier,
    toneFilter: filters.toneFilter,
    responseDelayMs: filters.responseDelayMs,
  };
  
  return {
    filters,
    setFilters,
    updateFilter,
    resetFilters,
    systemSettings
  };
};

export default useGouldianFilters;
