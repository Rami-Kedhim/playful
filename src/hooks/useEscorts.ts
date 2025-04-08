
import { useCallback, useState, useEffect } from 'react';
import { useEscortContext } from '@/modules/escorts/providers/EscortProvider';
import { Escort } from '@/types/escort';

export const useEscorts = () => {
  const { state, loadEscorts, updateFilters: updateContextFilters } = useEscortContext();
  const [currentFilters, setCurrentFilters] = useState(state.filters);
  
  // Apply current filters to load escorts
  const applyCurrentFilters = useCallback(async () => {
    await loadEscorts(true); // Use neural processing
  }, [loadEscorts]);
  
  // Update filters in the context
  const updateFilters = useCallback((newFilters: Partial<typeof state.filters>) => {
    setCurrentFilters(prev => ({ ...prev, ...newFilters }));
    updateContextFilters(newFilters);
  }, [updateContextFilters]);
  
  // Clear all filters
  const clearAllFilters = useCallback(() => {
    const emptyFilters = {
      location: '',
      serviceTypes: [],
      priceRange: [0, 1000],
      gender: [],
      orientation: [],
      ageRange: [18, 99],
      rating: 0,
      verified: false,
      availableNow: false,
      escortType: "all",
      language: [],
    };
    
    setCurrentFilters(emptyFilters);
    updateContextFilters(emptyFilters);
    applyCurrentFilters();
  }, [updateContextFilters, applyCurrentFilters]);
  
  // Load escorts when component mounts
  useEffect(() => {
    if (state.escorts.length === 0 && !state.isLoading) {
      loadEscorts(true); // Use neural processing for initial load
    }
  }, [state.escorts.length, state.isLoading, loadEscorts]);
  
  return {
    escorts: state.escorts,
    featuredEscorts: state.featuredEscorts,
    loading: state.isLoading,
    error: state.error,
    filters: currentFilters,
    updateFilters,
    applyCurrentFilters,
    clearAllFilters
  };
};
