
import { useMemo } from "react";
import { Escort } from "@/types/escort";
import { EscortFilterState } from "@/types/escortFilters";

const ESCORTS_PER_PAGE = 12;

export const useFilterResults = (
  escorts: Escort[],
  filterState: EscortFilterState,
  currentPage: number,
  setCurrentPage: (page: number) => void
) => {
  // Filter escorts based on selected filters
  const filteredEscorts = useMemo(() => {
    // Reset to first page when filters change
    if (currentPage !== 1) setCurrentPage(1);
    
    const {
      searchQuery,
      location,
      priceRange,
      verifiedOnly,
      selectedServices,
      selectedGenders,
      selectedOrientations,
      ageRange,
      ratingMin,
      availableNow,
      serviceTypeFilter
    } = filterState;
    
    return escorts.filter(escort => {
      // Filter by search query (name, location, description)
      if (searchQuery && !escort.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !escort.location.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      // Filter by location
      if (location && !escort.location.toLowerCase().includes(location.toLowerCase())) {
        return false;
      }
      
      // Filter by price range
      if (escort.price < priceRange[0] || escort.price > priceRange[1]) {
        return false;
      }
      
      // Filter by verification status
      if (verifiedOnly && !escort.verified) {
        return false;
      }
      
      // Filter by services
      if (selectedServices.length > 0) {
        const escortServices = escort.services || [];
        if (!selectedServices.some(service => escortServices.includes(service))) {
          return false;
        }
      }
      
      // Filter by gender
      if (selectedGenders.length > 0 && !selectedGenders.includes(escort.gender || '')) {
        return false;
      }
      
      // Filter by orientation
      if (selectedOrientations.length > 0 && !selectedOrientations.includes(escort.sexualOrientation || '')) {
        return false;
      }
      
      // Filter by age range
      if (escort.age < ageRange[0] || escort.age > ageRange[1]) {
        return false;
      }
      
      // Filter by minimum rating
      if (escort.rating < ratingMin) {
        return false;
      }
      
      // Filter by availability
      if (availableNow && !(escort.availableNow || false)) {
        return false;
      }
      
      // Filter by service type
      if (serviceTypeFilter) {
        if (serviceTypeFilter === "in-person" && !(escort.providesInPersonServices || escort.providesInPersonServices === undefined)) {
          return false;
        }
        if (serviceTypeFilter === "virtual" && !escort.providesVirtualContent) {
          return false;
        }
        if (serviceTypeFilter === "both" && (!escort.providesInPersonServices || !escort.providesVirtualContent)) {
          return false;
        }
      }
      
      return true;
    });
  }, [
    escorts, 
    filterState,
    currentPage,
    setCurrentPage
  ]);
  
  // Sort filtered escorts
  const sortedEscorts = useMemo(() => {
    return [...filteredEscorts].sort((a, b) => {
      switch (filterState.sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "oldest":
          // If we had creation dates, we'd use those
          return filteredEscorts.indexOf(a) - filteredEscorts.indexOf(b);
        case "newest":
        default:
          // If we had creation dates, we'd use those
          return filteredEscorts.indexOf(b) - filteredEscorts.indexOf(a);
      }
    });
  }, [filteredEscorts, filterState.sortBy]);
  
  // Paginate sorted escorts
  const paginatedEscorts = useMemo(() => {
    const startIndex = (currentPage - 1) * ESCORTS_PER_PAGE;
    return sortedEscorts.slice(startIndex, startIndex + ESCORTS_PER_PAGE);
  }, [sortedEscorts, currentPage]);
  
  // Calculate total pages
  const totalPages = Math.ceil(sortedEscorts.length / ESCORTS_PER_PAGE);
  
  return {
    filteredEscorts,
    sortedEscorts,
    paginatedEscorts,
    totalPages
  };
};
