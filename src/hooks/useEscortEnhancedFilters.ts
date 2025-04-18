
import { useState, useCallback, useEffect } from 'react';
import { EnhancedEscortFilters, EscortFilterOptions } from '@/types/escortTypes';

const defaultFilters: EnhancedEscortFilters = {
  location: '',
  serviceType: [],
  serviceTypes: [],
  price: [0, 1000],
  gender: [],
  orientation: [],
  age: [21, 50],
  rating: 0,
  verified: false,
  availableNow: false,
  escortType: "all",
  language: [],
  selectedFilters: [],
  localOnly: false,
  sortBy: "newest",
  useNeuralSuggestions: false,
  useBoostSorting: true,
  availability: {
    days: [] as string[],
    hours: [] as string[]
  }
};

export const useEscortEnhancedFilters = () => {
  const [filters, setFilters] = useState<EnhancedEscortFilters>(defaultFilters);
  const [isFiltering, setIsFiltering] = useState(false);
  
  // Update specific filter fields
  const updateFilter = useCallback(<K extends keyof EnhancedEscortFilters>(
    key: K, 
    value: EnhancedEscortFilters[K]
  ) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);
  
  // Reset filters to default
  const resetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);
  
  // Convert enhanced filters to basic filter options for API calls
  const toFilterOptions = useCallback(() => {
    return {
      gender: filters.gender,
      serviceType: filters.serviceType,
      priceRange: filters.price,
      ageRange: filters.age,
      language: filters.language,
      location: filters.location,
      verified: filters.verified,
      availableNow: filters.availableNow,
      escortType: filters.escortType,
      orientation: filters.orientation
    };
  }, [filters]);

  return {
    filters,
    updateFilter,
    resetFilters,
    toFilterOptions
  };
};

export default useEscortEnhancedFilters;
