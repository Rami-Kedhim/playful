
import { useState, useCallback, useEffect } from 'react';

interface FilterState {
  genders: string[];
  orientations: string[];
  serviceTypes: string[];
  ageRanges: string[];
  ratings: string[];
  availability: string[];
  verificationLevels: string[];
  services: string[];
  physicalAttributes: {
    height: string[];
    bodyType: string[];
    hairColor: string[];
    ethnicity: string[];
  };
  pricing: {
    price: string[];
    city: string[];
    distance: string[];
  };
}

const initialFilterState: FilterState = {
  genders: [],
  orientations: [],
  serviceTypes: [],
  ageRanges: [],
  ratings: [],
  availability: [],
  verificationLevels: [],
  services: [],
  physicalAttributes: {
    height: [],
    bodyType: [],
    hairColor: [],
    ethnicity: [],
  },
  pricing: {
    price: [],
    city: [],
    distance: [],
  },
};

export const useFilters = () => {
  const [filters, setFilters] = useState<FilterState>(() => {
    // Try to load filters from localStorage
    const savedFilters = localStorage.getItem('escortFilters');
    return savedFilters ? JSON.parse(savedFilters) : initialFilterState;
  });

  const [selectedFiltersCount, setSelectedFiltersCount] = useState<number>(0);

  // Save filters to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('escortFilters', JSON.stringify(filters));

    // Calculate total selected filters
    let count = 0;
    count += filters.genders.length;
    count += filters.orientations.length;
    count += filters.serviceTypes.length;
    count += filters.ageRanges.length;
    count += filters.ratings.length;
    count += filters.availability.length;
    count += filters.verificationLevels.length;
    count += filters.services.length;
    count += filters.physicalAttributes.height.length;
    count += filters.physicalAttributes.bodyType.length;
    count += filters.physicalAttributes.hairColor.length;
    count += filters.physicalAttributes.ethnicity.length;
    count += filters.pricing.price.length;
    count += filters.pricing.city.length;
    count += filters.pricing.distance.length;

    setSelectedFiltersCount(count);
  }, [filters]);

  // Functions to toggle filters
  const toggleFilter = useCallback((category: keyof FilterState, value: string) => {
    setFilters((prev) => {
      if (Array.isArray(prev[category])) {
        const array = prev[category] as string[];
        return {
          ...prev,
          [category]: array.includes(value)
            ? array.filter((item) => item !== value)
            : [...array, value],
        };
      }
      return prev;
    });
  }, []);

  const toggleNestedFilter = useCallback(
    (parentCategory: 'physicalAttributes' | 'pricing', category: string, value: string) => {
      setFilters((prev) => {
        const parentObject = { ...prev[parentCategory] };
        // Type assertion to access nested array
        const array = (parentObject as any)[category] as string[];
        
        (parentObject as any)[category] = array.includes(value)
          ? array.filter((item) => item !== value)
          : [...array, value];

        return {
          ...prev,
          [parentCategory]: parentObject,
        };
      });
    },
    []
  );

  const clearAllFilters = useCallback(() => {
    setFilters(initialFilterState);
  }, []);

  return {
    filters,
    selectedFiltersCount,
    toggleFilter,
    toggleNestedFilter,
    clearAllFilters,
  };
};
