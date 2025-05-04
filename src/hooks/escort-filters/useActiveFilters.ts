
import { EscortFilterState } from "@/types/escortFilters";

type ActiveFilter = {
  key: string;
  label: string;
  value?: string | number;
};

/**
 * Hook to determine which filters are currently active
 * @param filterState Current filter state
 * @returns Object with activeFilters array and count
 */
const useActiveFilters = (filterState: EscortFilterState) => {
  const activeFilters: ActiveFilter[] = [];
  
  // Search query filter
  if (filterState.searchQuery) {
    activeFilters.push({
      key: 'searchQuery',
      label: 'Search',
      value: filterState.searchQuery,
    });
  }
  
  // Location filter
  if (filterState.location) {
    activeFilters.push({
      key: 'location',
      label: 'Location',
      value: filterState.location,
    });
  }
  
  // Service type filter
  if (filterState.serviceTypeFilter && filterState.serviceTypeFilter !== 'any') {
    let serviceTypeLabel = '';
    
    switch (filterState.serviceTypeFilter) {
      case 'in-person':
        serviceTypeLabel = 'In Person';
        break;
      case 'virtual':
        serviceTypeLabel = 'Virtual';
        break;
      case 'both':
        serviceTypeLabel = 'Both Types';
        break;
      default:
        serviceTypeLabel = filterState.serviceTypeFilter;
    }
    
    activeFilters.push({
      key: 'serviceTypeFilter',
      label: 'Service Type',
      value: serviceTypeLabel,
    });
  }
  
  // Price range filter (only if not default)
  if (filterState.priceRange[0] !== 0 || filterState.priceRange[1] !== 1000) {
    activeFilters.push({
      key: 'priceRange',
      label: 'Price',
      value: `${filterState.priceRange[0]}-${filterState.priceRange[1]}`,
    });
  }
  
  // Age range filter (only if not default)
  if (filterState.ageRange[0] !== 21 || filterState.ageRange[1] !== 60) {
    activeFilters.push({
      key: 'ageRange',
      label: 'Age',
      value: `${filterState.ageRange[0]}-${filterState.ageRange[1]}`,
    });
  }
  
  // Verified only filter
  if (filterState.verifiedOnly) {
    activeFilters.push({
      key: 'verifiedOnly',
      label: 'Verified Only',
    });
  }
  
  // Available now filter
  if (filterState.availableNow) {
    activeFilters.push({
      key: 'availableNow',
      label: 'Available Now',
    });
  }
  
  // Rating filter
  if (filterState.ratingMin > 0) {
    activeFilters.push({
      key: 'ratingMin',
      label: 'Minimum Rating',
      value: filterState.ratingMin,
    });
  }
  
  // Gender filters
  if (filterState.selectedGenders && filterState.selectedGenders.length > 0) {
    activeFilters.push({
      key: 'selectedGenders',
      label: 'Genders',
      value: filterState.selectedGenders.length > 1 
        ? `${filterState.selectedGenders.length} selected` 
        : filterState.selectedGenders[0],
    });
  }
  
  // Orientation filters
  if (filterState.selectedOrientations && filterState.selectedOrientations.length > 0) {
    activeFilters.push({
      key: 'selectedOrientations',
      label: 'Orientations',
      value: filterState.selectedOrientations.length > 1 
        ? `${filterState.selectedOrientations.length} selected` 
        : filterState.selectedOrientations[0],
    });
  }
  
  // Services filters
  if (filterState.selectedServices && filterState.selectedServices.length > 0) {
    activeFilters.push({
      key: 'selectedServices',
      label: 'Services',
      value: filterState.selectedServices.length > 1 
        ? `${filterState.selectedServices.length} selected` 
        : filterState.selectedServices[0],
    });
  }

  return {
    activeFilters,
    activeFilterCount: activeFilters.length
  };
};

export default useActiveFilters;
