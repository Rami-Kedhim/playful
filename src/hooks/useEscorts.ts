
import { useState, useCallback } from 'react';
import { useEscortContext } from '@/modules/escorts/providers/EscortProvider';
import { Escort } from '@/types/escort';

export function useEscorts() {
  const { state, loadEscorts, updateFilters: updateContextFilters } = useEscortContext();
  const { escorts, featuredEscorts, isLoading, error, filters } = state;
  
  // Add functions that were missing in the context
  const applyCurrentFilters = useCallback(async () => {
    await loadEscorts(true); // Use neural processing
  }, [loadEscorts]);
  
  const clearAllFilters = useCallback(() => {
    updateContextFilters({
      location: '',
      serviceTypes: [],
      priceRange: [0, 1000],
      gender: [],
      orientation: [],
      ageRange: [18, 99],
      rating: 0,
      verified: false,
      availableNow: false,
      escortType: 'all',
      language: []
    });
    loadEscorts(true);
  }, [updateContextFilters, loadEscorts]);

  return {
    escorts,
    featuredEscorts,
    loading: isLoading,
    error,
    filters,
    updateFilters: updateContextFilters,
    applyCurrentFilters,
    clearAllFilters,
    loadEscorts
  };
}

export default useEscorts;
