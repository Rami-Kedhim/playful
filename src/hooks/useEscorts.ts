
import { useCallback, useState, useEffect } from 'react';
import { useEscortContext } from '@/modules/escorts/providers/EscortProvider';
import { EscortFilterOptions } from '@/types/escortTypes';

export const useEscorts = () => {
  const { state, loadEscorts, updateFilters: updateContextFilters } = useEscortContext();
  const [currentFilters, setCurrentFilters] = useState<EscortFilterOptions>(state.filters);
  
  // Apply current filters to load escorts
  const applyCurrentFilters = useCallback(async () => {
    await loadEscorts(true); // Use neural processing
  }, [loadEscorts]);
  
  // Update filters in the context
  const updateFilters = useCallback((newFilters: Partial<EscortFilterOptions>) => {
    // Make sure arrays are properly typed
    const typedFilters: Partial<EscortFilterOptions> = {
      ...newFilters,
      gender: newFilters.gender || [],
      serviceType: newFilters.serviceType || [],
      serviceTypes: newFilters.serviceTypes || [],
      language: newFilters.language || []
    };
    
    setCurrentFilters(prev => ({ ...prev, ...typedFilters }));
    updateContextFilters(typedFilters);
  }, [updateContextFilters]);
  
  // Clear all filters
  const clearAllFilters = useCallback(() => {
    const emptyFilters: EscortFilterOptions = {
      location: '',
      serviceType: [],
      serviceTypes: [],
      priceRange: [0, 1000] as [number, number],
      gender: [],
      orientation: [],
      ageRange: [18, 99] as [number, number],
      rating: 0,
      verified: false,
      verifiedOnly: false,
      availableNow: false,
      escortType: "all" as "all" | "verified" | "ai" | "provisional",
      language: [],
    };
    
    setCurrentFilters(emptyFilters);
    updateContextFilters(emptyFilters);
    applyCurrentFilters();
  }, [updateContextFilters, applyCurrentFilters]);
  
  // Load escorts when component mounts
  useEffect(() => {
    if (state.escorts.length === 0 && !state.loading && !state.isLoading) {
      loadEscorts(true); // Use neural processing for initial load
    }
  }, [state.escorts.length, state.loading, state.isLoading, loadEscorts]);
  
  return {
    escorts: state.escorts,
    featuredEscorts: state.featuredEscorts || [],
    loading: state.loading || state.isLoading || false,
    error: state.error,
    filters: currentFilters,
    updateFilters,
    applyCurrentFilters,
    clearAllFilters
  };
};
