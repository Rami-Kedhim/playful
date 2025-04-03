
import { Escort } from "@/types/escort";
import { useFilterState } from "./escort-filters/useFilterState";
import { useFilterResults } from "./escort-filters/useFilterResults";
import { EscortFilterHook } from "@/types/escortFilters";

export const useEscortFilter = (escorts: Escort[]): EscortFilterHook => {
  const filterState = useFilterState();
  
  // Clear all filters
  const clearFilters = () => {
    filterState.setSearchQuery("");
    filterState.setLocation("");
    filterState.setPriceRange([0, 1000]);
    filterState.setVerifiedOnly(false);
    filterState.setSelectedServices([]);
    filterState.setSelectedGenders([]);
    filterState.setSelectedOrientations([]);
    filterState.setAgeRange([18, 60]);
    filterState.setRatingMin(0);
    filterState.setAvailableNow(false);
    filterState.setServiceTypeFilter("");
    filterState.setCurrentPage(1);
  };
  
  const filterResults = useFilterResults(
    escorts,
    {
      searchQuery: filterState.searchQuery,
      location: filterState.location,
      priceRange: filterState.priceRange,
      verifiedOnly: filterState.verifiedOnly,
      selectedServices: filterState.selectedServices,
      sortBy: filterState.sortBy,
      currentPage: filterState.currentPage,
      selectedGenders: filterState.selectedGenders,
      selectedOrientations: filterState.selectedOrientations,
      ageRange: filterState.ageRange,
      ratingMin: filterState.ratingMin,
      availableNow: filterState.availableNow,
      serviceTypeFilter: filterState.serviceTypeFilter
    },
    filterState.currentPage,
    filterState.setCurrentPage
  );
  
  return {
    ...filterState,
    ...filterResults,
    clearFilters
  };
};
