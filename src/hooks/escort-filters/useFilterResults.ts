
import { useState, useEffect, useMemo } from "react";
import { Escort } from "@/types/Escort";

interface FilterResultsProps {
  searchQuery?: string;
  location?: string;
  priceRange?: [number, number];
  verifiedOnly?: boolean;
  selectedServices?: string[];
  sortBy?: string;
  selectedGenders?: string[];
  selectedOrientations?: string[];
  ageRange?: [number, number];
  ratingMin?: number;
  availableNow?: boolean;
  serviceTypeFilter?: "" | "in-person" | "virtual" | "both";
  currentPage?: number;
}

const ITEMS_PER_PAGE = 9; // Number of escorts per page

const useFilterResults = (
  escorts: Escort[],
  filters: FilterResultsProps,
  currentPage = 1,
  setCurrentPage?: (page: number) => void
) => {
  const [isFiltering, setIsFiltering] = useState(false);
  
  // Reset page when filters change
  useEffect(() => {
    if (setCurrentPage) {
      setCurrentPage(1);
    }
  }, [
    filters.searchQuery,
    filters.location,
    filters.verifiedOnly,
    filters.selectedServices,
    filters.selectedGenders,
    filters.selectedOrientations,
    filters.ageRange,
    filters.ratingMin,
    filters.availableNow,
    filters.serviceTypeFilter,
    setCurrentPage
  ]);
  
  // Filter escorts based on all filter criteria
  const filteredEscorts = useMemo(() => {
    setIsFiltering(true);
    
    let result = [...escorts];
    
    // Filter by search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter(escort => 
        escort.name?.toLowerCase().includes(query) || 
        escort.description?.toLowerCase().includes(query) ||
        (escort.tags?.some(tag => tag.toLowerCase().includes(query)))
      );
    }
    
    // Filter by location
    if (filters.location) {
      result = result.filter(escort => 
        escort.location?.toLowerCase().includes(filters.location!.toLowerCase())
      );
    }
    
    // Filter by price range
    if (filters.priceRange) {
      result = result.filter(escort => {
        const price = escort.price || 0;
        return price >= filters.priceRange![0] && price <= filters.priceRange![1];
      });
    }
    
    // Filter by verified
    if (filters.verifiedOnly) {
      result = result.filter(escort => escort.verified || escort.isVerified);
    }
    
    // Filter by services
    if (filters.selectedServices && filters.selectedServices.length > 0) {
      result = result.filter(escort => 
        escort.services?.some(service => 
          filters.selectedServices!.includes(service)
        )
      );
    }
    
    // Filter by genders
    if (filters.selectedGenders && filters.selectedGenders.length > 0) {
      result = result.filter(escort => 
        filters.selectedGenders!.includes(escort.gender || '')
      );
    }
    
    // Filter by orientations
    if (filters.selectedOrientations && filters.selectedOrientations.length > 0) {
      result = result.filter(escort => 
        filters.selectedOrientations!.includes(escort.sexualOrientation || escort.orientation || '')
      );
    }
    
    // Filter by age range
    if (filters.ageRange) {
      result = result.filter(escort => {
        const age = escort.age || 0;
        return age >= filters.ageRange![0] && age <= filters.ageRange![1];
      });
    }
    
    // Filter by rating
    if (filters.ratingMin && filters.ratingMin > 0) {
      result = result.filter(escort => (escort.rating || 0) >= filters.ratingMin!);
    }
    
    // Filter by availability
    if (filters.availableNow) {
      result = result.filter(escort => escort.availableNow);
    }
    
    // Filter by service type
    if (filters.serviceTypeFilter) {
      result = result.filter(escort => {
        switch (filters.serviceTypeFilter) {
          case 'in-person':
            return Boolean(escort.providesInPersonServices) || escort.services?.includes('in-person');
          case 'virtual':
            return Boolean(escort.providesVirtualContent) || escort.services?.includes('virtual');
          case 'both':
            return (Boolean(escort.providesInPersonServices) || escort.services?.includes('in-person')) && 
                  (Boolean(escort.providesVirtualContent) || escort.services?.includes('virtual'));
          default:
            return true;
        }
      });
    }
    
    setIsFiltering(false);
    return result;
  }, [escorts, filters]);
  
  // Sort escorts
  const sortedEscorts = useMemo(() => {
    let sorted = [...filteredEscorts];
    
    switch (filters.sortBy) {
      case 'featured':
        return sorted.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
      case 'rating':
        return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      case 'price-low':
        return sorted.sort((a, b) => (a.price || 0) - (b.price || 0));
      case 'price-high':
        return sorted.sort((a, b) => (b.price || 0) - (a.price || 0));
      case 'reviews':
        return sorted.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0));
      case 'newest':
        return sorted.sort((a, b) => {
          const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
          const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
          return dateB - dateA;
        });
      default:
        return sorted;
    }
  }, [filteredEscorts, filters.sortBy]);
  
  // Calculate pagination
  const totalEscorts = sortedEscorts.length;
  const totalPages = Math.max(1, Math.ceil(totalEscorts / ITEMS_PER_PAGE));
  const safeCurrentPage = Math.min(Math.max(1, currentPage), totalPages);
  
  // Get escorts for current page
  const paginatedEscorts = useMemo(() => {
    const startIdx = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
    const endIdx = startIdx + ITEMS_PER_PAGE;
    return sortedEscorts.slice(startIdx, endIdx);
  }, [sortedEscorts, safeCurrentPage]);
  
  return {
    filteredEscorts,
    sortedEscorts,
    paginatedEscorts,
    totalPages,
    isFiltering
  };
};

export default useFilterResults;
