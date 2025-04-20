
// Fix import casing to exact '@/types/Escort' and fix property usage errors

import { useState, useEffect, useMemo } from 'react';
import { Escort } from '@/types/Escort';
import { ServiceTypeFilter } from '@/components/escorts/filters/ServiceTypeBadgeLabel';

// Filter criteria interface
interface FilterCriteria {
  searchQuery?: string;
  location?: string;
  priceRange?: [number, number];
  verifiedOnly?: boolean;
  selectedServices?: string[];
  selectedGenders?: string[];
  selectedOrientations?: string[];
  ageRange?: [number, number];
  ratingMin?: number;
  availableNow?: boolean;
  serviceTypeFilter?: ServiceTypeFilter;
  sortBy?: string; // Add this property to fix the TypeScript error
}

// Sort options
export type SortOption = 'newest' | 'price-low' | 'price-high' | 'rating' | 'featured';

export const useFilterResults = (
  escorts: Escort[], 
  filters: FilterCriteria,
  currentPage: number,
  setCurrentPage: (page: number) => void,
  itemsPerPage: number = 12
) => {
  const [filteredEscorts, setFilteredEscorts] = useState<Escort[]>(escorts);
  const [sortedEscorts, setSortedEscorts] = useState<Escort[]>(escorts);
  const [paginatedEscorts, setPaginatedEscorts] = useState<Escort[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isFiltering, setIsFiltering] = useState(false);
  
  // Apply filters
  useEffect(() => {
    setIsFiltering(true);
    
    // Reset to first page when filters change
    setCurrentPage(1);
    
    setTimeout(() => {
      const results = escorts.filter(escort => {
        // Filter by search query
        if (filters.searchQuery && !matchesSearchQuery(escort, filters.searchQuery)) {
          return false;
        }
        
        // Filter by location
        if (filters.location && !matchesLocation(escort, filters.location)) {
          return false;
        }
        
        // Filter by price range
        if (filters.priceRange && !matchesPriceRange(escort, filters.priceRange)) {
          return false;
        }
        
        // Filter by verified status
        if (filters.verifiedOnly && !escort.verified) {
          return false;
        }
        
        // Filter by services
        if (filters.selectedServices && filters.selectedServices.length > 0 && !matchesServices(escort, filters.selectedServices)) {
          return false;
        }
        
        // Filter by gender
        if (filters.selectedGenders && filters.selectedGenders.length > 0 && !matchesGender(escort, filters.selectedGenders)) {
          return false;
        }
        
        // Filter by orientation
        if (filters.selectedOrientations && filters.selectedOrientations.length > 0 && !matchesOrientation(escort, filters.selectedOrientations)) {
          return false;
        }
        
        // Filter by age range
        if (filters.ageRange && !matchesAgeRange(escort, filters.ageRange)) {
          return false;
        }
        
        // Filter by rating
        if (filters.ratingMin && !matchesRating(escort, filters.ratingMin)) {
          return false;
        }
        
        // Filter by availability
        if (filters.availableNow && !escort.availableNow) {
          return false;
        }
        
        // Filter by service type
        if (filters.serviceTypeFilter && !matchesServiceType(escort, filters.serviceTypeFilter)) {
          return false;
        }
        
        return true;
      });
      
      setFilteredEscorts(results);
      setIsFiltering(false);
    }, 100); // Short timeout to prevent UI freezing with large datasets
  }, [escorts, filters, setCurrentPage]);
  
  // Sort escorts
  useEffect(() => {
    const sortResults = [...filteredEscorts];
    
    switch (filters.sortBy) {
      case 'price-low':
        sortResults.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case 'price-high':
        sortResults.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case 'rating':
        sortResults.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'featured':
        sortResults.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
      default:
        // 'newest' is default - no sort needed if using creation date
        break;
    }
    
    setSortedEscorts(sortResults);
  }, [filteredEscorts, filters.sortBy]);
  
  // Paginate escorts
  useEffect(() => {
    const total = Math.ceil(sortedEscorts.length / itemsPerPage);
    setTotalPages(total || 1);
    
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    
    setPaginatedEscorts(sortedEscorts.slice(start, end));
  }, [sortedEscorts, currentPage, itemsPerPage]);
  
  // Calculate total after applying filters
  const totalResults = useMemo(() => filteredEscorts.length, [filteredEscorts]);
  
  return {
    filteredEscorts,
    sortedEscorts,
    paginatedEscorts,
    totalPages,
    totalResults,
    isFiltering,
  };
};

// Helper functions for filtering
const matchesSearchQuery = (escort: Escort, query: string): boolean => {
  const searchLower = query.toLowerCase();
  return (
    (escort.name?.toLowerCase().includes(searchLower)) ||
    (escort.location?.toLowerCase().includes(searchLower)) ||
    (escort.description?.toLowerCase().includes(searchLower)) ||
    (escort.bio?.toLowerCase().includes(searchLower)) ||
    (escort.services?.some(service => service.toLowerCase().includes(searchLower))) ||
    (escort.tags?.some(tag => tag.toLowerCase().includes(searchLower)))
  );
};

const matchesLocation = (escort: Escort, location: string): boolean => {
  return escort.location?.toLowerCase().includes(location.toLowerCase()) ?? false;
};

const matchesPriceRange = (escort: Escort, range: [number, number]): boolean => {
  const price = escort.price || 0;
  return price >= range[0] && price <= range[1];
};

const matchesServices = (escort: Escort, services: string[]): boolean => {
  return services.some(service => 
    escort.services?.includes(service) || 
    escort.tags?.includes(service)
  );
};

const matchesGender = (escort: Escort, genders: string[]): boolean => {
  return escort.gender ? genders.includes(escort.gender.toLowerCase()) : false;
};

const matchesOrientation = (escort: Escort, orientations: string[]): boolean => {
  const escortOrientation = escort.orientation || escort.sexualOrientation;
  return escortOrientation ? orientations.includes(escortOrientation.toLowerCase()) : false;
};

const matchesAgeRange = (escort: Escort, range: [number, number]): boolean => {
  return escort.age !== undefined && escort.age >= range[0] && escort.age <= range[1];
};

const matchesRating = (escort: Escort, min: number): boolean => {
  return (escort.rating || 0) >= min;
};

const matchesServiceType = (escort: Escort, type: ServiceTypeFilter): boolean => {
  if (!type) return true;
  
  // Check for service type fields
  if (type === "in-person") {
    return escort.providesInPersonServices === true;
  } else if (type === "virtual") {
    return escort.providesVirtualContent === true;
  } else if (type === "both") {
    return escort.providesInPersonServices === true && escort.providesVirtualContent === true;
  }

  // Fallback to service arrays
  if (Array.isArray(escort.serviceTypes)) {
    return escort.serviceTypes.includes(type);
  }
  
  if (Array.isArray(escort.services)) {
    return escort.services.includes(type);
  }
  
  return false;
};

export default useFilterResults;

