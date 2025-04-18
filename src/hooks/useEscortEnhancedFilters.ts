
import { useState, useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { EnhancedEscortFilters, EscortFilterOptions } from '@/types/escortTypes';

// Initial state with all required properties
const initialFilters: EnhancedEscortFilters = {
  location: '',
  serviceType: [],
  serviceTypes: [],
  priceRange: [0, 1000],
  ageRange: [18, 99],
  price: [0, 1000],
  age: [18, 99],
  gender: undefined,
  orientation: undefined,
  language: [],
  availableNow: false,
  verified: false,
  verifiedOnly: false,
  escortType: 'all',
  selectedFilters: [],
  localOnly: false,
  sortBy: 'newest',
  useNeuralSuggestions: false,
  useBoostSorting: false,
  rating: 0,
  maxDistance: 50
};

export const useEscortEnhancedFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState<EnhancedEscortFilters>(initialFilters);
  
  // Parse search params on mount
  useEffect(() => {
    const parsedFilters: Partial<EnhancedEscortFilters> = {};
    
    // Location
    const location = searchParams.get('location');
    if (location) parsedFilters.location = location;
    
    // Service type
    const serviceType = searchParams.get('serviceType');
    if (serviceType) parsedFilters.serviceType = serviceType.split(',');
    
    // Price range
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    if (minPrice && maxPrice) {
      parsedFilters.priceRange = [parseInt(minPrice), parseInt(maxPrice)];
      parsedFilters.price = [parseInt(minPrice), parseInt(maxPrice)];
    }
    
    // Age range
    const minAge = searchParams.get('minAge');
    const maxAge = searchParams.get('maxAge');
    if (minAge && maxAge) {
      parsedFilters.ageRange = [parseInt(minAge), parseInt(maxAge)];
      parsedFilters.age = [parseInt(minAge), parseInt(maxAge)];
    }
    
    // Gender
    const gender = searchParams.get('gender');
    if (gender) parsedFilters.gender = gender.split(',');
    
    // Orientation
    const orientation = searchParams.get('orientation');
    if (orientation) parsedFilters.orientation = orientation.split(',');
    
    // Languages
    const language = searchParams.get('language');
    if (language) parsedFilters.language = language.split(',');
    
    // Boolean filters
    parsedFilters.availableNow = searchParams.get('availableNow') === 'true';
    parsedFilters.verified = searchParams.get('verified') === 'true';
    parsedFilters.verifiedOnly = searchParams.get('verifiedOnly') === 'true';
    parsedFilters.localOnly = searchParams.get('localOnly') === 'true';
    
    // Escort type
    const escortType = searchParams.get('escortType');
    if (escortType) parsedFilters.escortType = escortType as 'all' | 'verified' | 'ai' | 'provisional';
    
    // Sort by
    const sortBy = searchParams.get('sortBy');
    if (sortBy) parsedFilters.sortBy = sortBy;
    
    // Apply the parsed filters
    if (Object.keys(parsedFilters).length > 0) {
      setFilters(prev => ({ ...prev, ...parsedFilters }));
    }
  }, [searchParams]);

  // Update search params when filters change
  const updateSearchParams = useCallback((updatedFilters: EnhancedEscortFilters) => {
    const params = new URLSearchParams();
    
    // Only add non-default values
    if (updatedFilters.location) params.set('location', updatedFilters.location);
    if (updatedFilters.serviceType && updatedFilters.serviceType.length > 0) 
      params.set('serviceType', updatedFilters.serviceType.join(','));
    if (updatedFilters.price[0] > 0) params.set('minPrice', updatedFilters.price[0].toString());
    if (updatedFilters.price[1] < 1000) params.set('maxPrice', updatedFilters.price[1].toString());
    if (updatedFilters.age[0] > 18) params.set('minAge', updatedFilters.age[0].toString());
    if (updatedFilters.age[1] < 99) params.set('maxAge', updatedFilters.age[1].toString());
    if (updatedFilters.gender && updatedFilters.gender.length > 0) 
      params.set('gender', updatedFilters.gender.join(','));
    if (updatedFilters.orientation && updatedFilters.orientation.length > 0) 
      params.set('orientation', updatedFilters.orientation.join(','));
    if (updatedFilters.language && updatedFilters.language.length > 0) 
      params.set('language', updatedFilters.language.join(','));
    if (updatedFilters.availableNow) params.set('availableNow', 'true');
    if (updatedFilters.verified || updatedFilters.verifiedOnly) params.set('verified', 'true');
    if (updatedFilters.escortType !== 'all') params.set('escortType', updatedFilters.escortType);
    if (updatedFilters.sortBy !== 'newest') params.set('sortBy', updatedFilters.sortBy);
    
    setSearchParams(params);
  }, [setSearchParams]);

  // Update a specific filter value
  const updateFilter = useCallback(<K extends keyof EnhancedEscortFilters>(
    key: K, 
    value: EnhancedEscortFilters[K]
  ) => {
    setFilters(prev => {
      const updated = { ...prev, [key]: value };
      updateSearchParams(updated);
      return updated;
    });
  }, [updateSearchParams]);

  // Convert enhanced filters to simple filter options (for API calls)
  const toFilterOptions = useCallback((): EscortFilterOptions => {
    const options: EscortFilterOptions = {
      gender: filters.gender,
      service: filters.serviceType,
      serviceType: filters.serviceType,
      serviceTypes: filters.serviceTypes,
      priceRange: filters.priceRange,
      ageRange: filters.ageRange,
      language: filters.language,
      location: filters.location,
      maxDistance: filters.maxDistance,
      availableNow: filters.availableNow,
      rating: filters.rating,
      verified: filters.verified || filters.verifiedOnly,
    };
    
    return options;
  }, [filters]);

  // Reset filters to initial state
  const resetFilters = useCallback(() => {
    setFilters(initialFilters);
    setSearchParams(new URLSearchParams());
  }, [setSearchParams]);

  return {
    filters,
    updateFilter,
    resetFilters,
    toFilterOptions
  };
};

export default useEscortEnhancedFilters;
