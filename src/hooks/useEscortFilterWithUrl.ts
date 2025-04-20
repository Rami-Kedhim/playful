
import { useEffect } from 'react';
import useEscortFilter from './useEscortFilter';
import useFilterStateWithUrl from './useFilterStateWithUrl';
import { Escort } from '@/types/Escort';

interface UseEscortFilterWithUrlProps {
  escorts: Escort[];
}

/**
 * Hook that combines escort filtering with URL parameter synchronization
 */
export const useEscortFilterWithUrl = ({ escorts }: UseEscortFilterWithUrlProps) => {
  // Get the base filter state and actions
  const filterState = useEscortFilter({ escorts });
  
  // Default values for URL synchronization
  const defaultValues = {
    serviceTypeFilter: "" as "" | "in-person" | "virtual" | "both",
    verifiedOnly: false,
    availableNow: false,
    location: "",
    searchQuery: "",
    ratingMin: 0
  };
  
  // Set up URL synchronization
  const { updateUrl } = useFilterStateWithUrl({
    filters: {
      serviceTypeFilter: filterState.serviceTypeFilter,
      verifiedOnly: filterState.verifiedOnly,
      availableNow: filterState.availableNow,
      location: filterState.location,
      searchQuery: filterState.searchQuery,
      ratingMin: filterState.ratingMin
    },
    setFilters: (newFilters) => {
      // Update local state with URL values
      if (newFilters.serviceTypeFilter !== undefined) {
        filterState.setServiceTypeFilter(String(newFilters.serviceTypeFilter) as "" | "in-person" | "virtual" | "both");
      }
      if (newFilters.verifiedOnly !== undefined) {
        filterState.setVerifiedOnly(Boolean(newFilters.verifiedOnly));
      }
      if (newFilters.availableNow !== undefined) {
        filterState.setAvailableNow(Boolean(newFilters.availableNow));
      }
      if (newFilters.location !== undefined) {
        filterState.setLocation(String(newFilters.location));
      }
      if (newFilters.searchQuery !== undefined) {
        filterState.setSearchQuery(String(newFilters.searchQuery));
      }
      if (newFilters.ratingMin !== undefined) {
        filterState.setRatingMin(Number(newFilters.ratingMin));
      }
    },
    defaultValues
  });
  
  // Update URL when filter state changes
  useEffect(() => {
    updateUrl({
      serviceTypeFilter: filterState.serviceTypeFilter,
      verifiedOnly: filterState.verifiedOnly,
      availableNow: filterState.availableNow,
      location: filterState.location,
      searchQuery: filterState.searchQuery,
      ratingMin: filterState.ratingMin
    });
  }, [
    updateUrl,
    filterState.serviceTypeFilter,
    filterState.verifiedOnly,
    filterState.availableNow,
    filterState.location,
    filterState.searchQuery,
    filterState.ratingMin
  ]);
  
  return filterState;
};

export default useEscortFilterWithUrl;

