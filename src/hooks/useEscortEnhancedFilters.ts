
import { useState } from 'react';
import { EnhancedEscortFilters } from '@/types/escortFilters';

export const useEscortEnhancedFilters = () => {
  const [filters, setFilters] = useState<EnhancedEscortFilters>({
    location: '',
    serviceType: [],
    serviceTypes: [],
    price: [0, 500],
    priceRange: [0, 500],
    age: [18, 99],
    ageRange: [18, 99],
    gender: [],
    orientation: [],
    rating: 0,
    verified: false,
    languages: [],
    availableNow: false,
    escortType: 'all',
    hasContent: false,
    bodyType: [],
    hairColor: [],
    ethnicity: [],
    maxDistance: 50,
    localOnly: false,
    useNeuralSuggestions: false,
    selectedFilters: []
  });

  const updateFilters = (newFilters: Partial<EnhancedEscortFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const resetFilters = () => {
    setFilters({
      location: '',
      serviceType: [],
      serviceTypes: [],
      price: [0, 500],
      priceRange: [0, 500],
      age: [18, 99],
      ageRange: [18, 99],
      gender: [],
      orientation: [],
      rating: 0,
      verified: false,
      languages: [],
      availableNow: false,
      escortType: 'all',
      hasContent: false,
      bodyType: [],
      hairColor: [],
      ethnicity: [],
      maxDistance: 50,
      localOnly: false,
      useNeuralSuggestions: false,
      selectedFilters: []
    });
  };

  return {
    filters,
    updateFilters,
    resetFilters
  };
};

export default useEscortEnhancedFilters;
