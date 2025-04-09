
import { useState, useCallback, useEffect } from 'react';
import { useEscortContext } from '@/modules/escorts/providers/EscortProvider';
import { escortsNeuralService } from '@/services/neural/modules/EscortsNeuralService';
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

export const useEscortEnhancedFilters = () => {
  const { state, loadEscorts, updateFilters: updateContextFilters } = useEscortContext();
  const [filters, setFilters] = useState<EnhancedEscortFilters>(defaultFilters);
  const [isFiltering, setIsFiltering] = useState(false);
  
  // Initialize filters from context when component mounts
  useEffect(() => {
    setFilters(prev => ({
      ...prev,
      location: state.filters.location || '',
      serviceTypes: state.filters.serviceTypes || [],
      priceRange: state.filters.priceRange || [0, 1000],
      gender: state.filters.gender || [],
      orientation: state.filters.orientation || [],
      ageRange: state.filters.ageRange || [21, 50],
      rating: state.filters.rating || 0,
      verified: state.filters.verified || false,
      availableNow: state.filters.availableNow || false,
      escortType: state.filters.escortType || "all",
      language: state.filters.language || [],
      useBoostSorting: escortsNeuralService.getConfig().orderByBoost
    }));
  }, [
    state.filters.location,
    state.filters.serviceTypes,
    state.filters.priceRange,
    state.filters.gender,
    state.filters.orientation,
    state.filters.ageRange,
    state.filters.rating,
    state.filters.verified,
    state.filters.availableNow,
    state.filters.escortType,
    state.filters.language
  ]);
  
  // Update neural service config when boost sorting changes
  useEffect(() => {
    try {
      const neuralConfig = escortsNeuralService.getConfig();
      if (neuralConfig.orderByBoost !== filters.useBoostSorting) {
        escortsNeuralService.updateConfig({
          orderByBoost: filters.useBoostSorting
        });
      }
    } catch (error) {
      console.error('Error updating neural service config:', error);
      // Continue execution even if neural service fails
    }
  }, [filters.useBoostSorting]);
  
  // Update filters
  const updateFilters = useCallback((newFilters: Partial<EnhancedEscortFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);
  
  // Reset filters to default
  const resetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);
  
  // Apply filters
  const applyFilters = useCallback(async () => {
    setIsFiltering(true);
    
    try {
      // Update context filters with the subset it supports
      updateContextFilters({
        location: filters.location,
        serviceTypes: filters.serviceTypes,
        priceRange: filters.priceRange,
        gender: filters.gender,
        orientation: filters.orientation,
        ageRange: filters.ageRange,
        rating: filters.rating,
        verified: filters.verified,
        availableNow: filters.availableNow,
        escortType: filters.escortType,
        language: filters.language
      });
      
      // Load escorts with neural processing
      await loadEscorts(true);
    } catch (error) {
      console.error('Error applying filters:', error);
    } finally {
      setIsFiltering(false);
    }
  }, [filters, updateContextFilters, loadEscorts]);
  
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
  
  return {
    filters,
    isFiltering,
    updateFilters,
    resetFilters,
    applyFilters,
    toggleFilterValue,
    toggleAvailability,
    escorts: state.escorts,
    featuredEscorts: state.featuredEscorts,
    loading: state.isLoading,
    error: state.error
  };
};

export default useEscortEnhancedFilters;
