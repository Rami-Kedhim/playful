
import { useState, useCallback, useEffect } from 'react';
import { useEscortContext } from '@/modules/escorts/providers/EscortProvider';
import { escortsNeuralService } from '@/services/neural/modules/EscortsNeuralService';
import { EnhancedEscortFilters } from '@/types/escortTypes';

const defaultFilters: EnhancedEscortFilters = {
  location: '',
  serviceType: [],
  price: [0, 1000],
  gender: [],
  orientation: [],
  age: [21, 50],
  rating: 0,
  verified: false,
  escortType: "all",
  languages: [],
  height: [140, 200],
  bodyType: [],
  hairColor: [],
  eyeColor: [],
  ethnicity: [],
  availability: {
    days: [],
    hours: [],
  },
  sortBy: '',
  useBoostSorting: false
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
      serviceType: state.filters.serviceType || state.filters.serviceTypes || [],
      price: state.filters.priceRange || [0, 1000],
      gender: state.filters.gender || [],
      orientation: state.filters.orientation || [],
      age: state.filters.ageRange || [21, 50],
      rating: state.filters.rating || 0,
      verified: state.filters.verified || state.filters.verifiedOnly || false,
      languages: state.filters.language || state.filters.languages || [],
    }));
  }, [state.filters]);
  
  // Update neural service config when boost sorting changes
  useEffect(() => {
    try {
      const neuralConfig = escortsNeuralService.config;
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
        serviceType: filters.serviceType,
        priceRange: filters.price,
        gender: filters.gender,
        orientation: filters.orientation,
        ageRange: filters.age,
        rating: filters.rating,
        verified: filters.verified,
        verifiedOnly: filters.verified,
        language: filters.languages,
        languages: filters.languages,
        escortType: filters.escortType
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
      // Safely handle field as array type
      const currentValues = prev[fieldName] as string[];
      if (!Array.isArray(currentValues)) {
        return prev;
      }
      
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
      if (!currentValues) return prev;
      
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
    featuredEscorts: state.featuredEscorts || [],
    loading: state.loading || state.isLoading || false,
    error: state.error
  };
};

export default useEscortEnhancedFilters;
