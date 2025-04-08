
import { useState, useCallback, useEffect } from 'react';
import { EnhancedEscortFilters } from '@/types/escortTypes';

const defaultFilters: EnhancedEscortFilters = {
  location: '',
  serviceTypes: [],
  priceRange: [0, 1000],
  gender: [],
  orientation: [],
  ageRange: [21, 50],
  rating: 0,
  verified: false,
  availableNow: false,
  escortType: "all",
  language: [],
  height: [140, 200],
  weight: [40, 120],
  hairColor: [],
  eyeColor: [],
  ethnicity: [],
  bodyType: [],
  availability: {
    days: [],
    hours: [],
  },
  sortBy: "newest",
  useBoostSorting: true
};

export const useEnhancedEscortFilters = () => {
  const [filters, setFilters] = useState<EnhancedEscortFilters>(defaultFilters);
  const [isFiltering, setIsFiltering] = useState(false);
  
  // Update specific filter fields
  const updateFilters = useCallback((newFilters: Partial<EnhancedEscortFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);
  
  // Reset filters to default
  const resetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);
  
  // Toggle a filter value in an array
  const toggleFilterValue = useCallback((fieldName: keyof EnhancedEscortFilters, value: string) => {
    setFilters(prev => {
      const currentValues = prev[fieldName] as string[];
      const exists = currentValues.includes(value);
      const updatedValues = exists
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      
      return {
        ...prev,
        [fieldName]: updatedValues
      };
    });
  }, []);
  
  // Toggle availability day/hour
  const toggleAvailability = useCallback((type: 'days' | 'hours', value: string) => {
    setFilters(prev => {
      const currentValues = prev.availability[type];
      const exists = currentValues.includes(value);
      const updatedValues = exists
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      
      return {
        ...prev,
        availability: {
          ...prev.availability,
          [type]: updatedValues
        }
      };
    });
  }, []);

  // Apply filters
  const applyFilters = useCallback(async () => {
    setIsFiltering(true);
    
    try {
      // Implementation to apply filters to escorts list
      // This would typically involve API calls or context updates
      
      // For demo purposes, simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.error('Error applying filters:', error);
    } finally {
      setIsFiltering(false);
    }
  }, [filters]);
  
  return {
    filters,
    isFiltering,
    updateFilters,
    resetFilters,
    applyFilters,
    toggleFilterValue,
    toggleAvailability
  };
};

export default useEnhancedEscortFilters;
