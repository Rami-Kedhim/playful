
import { useMemo } from "react";

export interface Filter {
  key: string;
  label: string;
  value?: string | number;
}

export const useActiveFilters = (filterState: any) => {
  const activeFilters = useMemo(() => {
    const filters: Filter[] = [];
    
    // Add search query filter
    if (filterState.searchQuery) {
      filters.push({
        key: 'searchQuery',
        label: 'Search',
        value: filterState.searchQuery
      });
    }
    
    // Add location filter
    if (filterState.location) {
      filters.push({
        key: 'location',
        label: 'Location',
        value: filterState.location
      });
    }
    
    // Add service type filter
    if (filterState.serviceTypeFilter) {
      const serviceTypeLabels: Record<string, string> = {
        'in-person': 'In Person',
        'virtual': 'Virtual',
        'both': 'Both Types'
      };
      
      filters.push({
        key: 'serviceTypeFilter',
        label: 'Service Type',
        value: serviceTypeLabels[filterState.serviceTypeFilter] || filterState.serviceTypeFilter
      });
    }
    
    // Add verification filter
    if (filterState.verifiedOnly) {
      filters.push({
        key: 'verifiedOnly',
        label: 'Verified Only'
      });
    }
    
    // Add available now filter
    if (filterState.availableNow) {
      filters.push({
        key: 'availableNow',
        label: 'Available Now'
      });
    }
    
    // Add rating filter
    if (filterState.ratingMin > 0) {
      filters.push({
        key: 'ratingMin',
        label: 'Min Rating',
        value: `${filterState.ratingMin}★`
      });
    }
    
    // Add price range filter if not default
    if (filterState.priceRange && 
        (filterState.priceRange[0] > 0 || 
         filterState.priceRange[1] < 500)) {
      filters.push({
        key: 'priceRange',
        label: 'Price',
        value: `$${filterState.priceRange[0]}-$${filterState.priceRange[1]}`
      });
    }
    
    // Add age range filter if not default
    if (filterState.ageRange && 
        (filterState.ageRange[0] > 21 || 
         filterState.ageRange[1] < 50)) {
      filters.push({
        key: 'ageRange',
        label: 'Age',
        value: `${filterState.ageRange[0]}-${filterState.ageRange[1]}`
      });
    }
    
    // Add gender filters
    if (filterState.selectedGenders?.length) {
      filters.push({
        key: 'selectedGenders',
        label: 'Genders',
        value: filterState.selectedGenders.length === 1 
          ? filterState.selectedGenders[0] 
          : `${filterState.selectedGenders.length} selected`
      });
    }
    
    // Add orientation filters
    if (filterState.selectedOrientations?.length) {
      filters.push({
        key: 'selectedOrientations',
        label: 'Orientations',
        value: filterState.selectedOrientations.length === 1 
          ? filterState.selectedOrientations[0] 
          : `${filterState.selectedOrientations.length} selected`
      });
    }
    
    // Add service filters
    if (filterState.selectedServices?.length) {
      filters.push({
        key: 'selectedServices',
        label: 'Services',
        value: filterState.selectedServices.length === 1 
          ? filterState.selectedServices[0] 
          : `${filterState.selectedServices.length} selected`
      });
    }
    
    return filters;
  }, [
    filterState.searchQuery,
    filterState.location,
    filterState.serviceTypeFilter,
    filterState.verifiedOnly,
    filterState.availableNow,
    filterState.ratingMin,
    filterState.priceRange,
    filterState.ageRange,
    filterState.selectedGenders,
    filterState.selectedOrientations,
    filterState.selectedServices
  ]);
  
  const activeFilterCount = useMemo(() => activeFilters.length, [activeFilters]);
  
  return {
    activeFilters,
    activeFilterCount
  };
};

export default useActiveFilters;
