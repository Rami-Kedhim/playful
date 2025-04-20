
// Fix import casing to exact '@/types/Escort' and extend Escort type for missing props

import { useState, useEffect, useMemo } from 'react';
import { Escort } from '@/types/Escort';
import { ServiceTypeFilter } from '@/components/escorts/filters/ServiceTypeBadgeLabel';

// Extend Escort type locally for those missing properties
interface ExtendedEscort extends Escort {
  sexualOrientation?: string;
  orientation?: string;
}

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
  sortBy?: string;
}

export type SortOption = 'newest' | 'price-low' | 'price-high' | 'rating' | 'featured';

export const useFilterResults = (
  escorts: ExtendedEscort[], 
  filters: FilterCriteria,
  currentPage: number,
  setCurrentPage: (page: number) => void,
  itemsPerPage: number = 12
) => {
  const [filteredEscorts, setFilteredEscorts] = useState<ExtendedEscort[]>(escorts);
  const [sortedEscorts, setSortedEscorts] = useState<ExtendedEscort[]>(escorts);
  const [paginatedEscorts, setPaginatedEscorts] = useState<ExtendedEscort[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isFiltering, setIsFiltering] = useState(false);
  
  useEffect(() => {
    setIsFiltering(true);
    setCurrentPage(1);
    setTimeout(() => {
      const results = escorts.filter(escort => {
        if (filters.searchQuery && !matchesSearchQuery(escort, filters.searchQuery)) {
          return false;
        }
        if (filters.location && !matchesLocation(escort, filters.location)) {
          return false;
        }
        if (filters.priceRange && !matchesPriceRange(escort, filters.priceRange)) {
          return false;
        }
        if (filters.verifiedOnly && !(escort.isVerified || escort.verified)) {
          return false;
        }
        if (filters.selectedServices && filters.selectedServices.length > 0 && !matchesServices(escort, filters.selectedServices)) {
          return false;
        }
        if (filters.selectedGenders && filters.selectedGenders.length > 0 && !matchesGender(escort, filters.selectedGenders)) {
          return false;
        }
        if (filters.selectedOrientations && filters.selectedOrientations.length > 0 && !matchesOrientation(escort, filters.selectedOrientations)) {
          return false;
        }
        if (filters.ageRange && !matchesAgeRange(escort, filters.ageRange)) {
          return false;
        }
        if (filters.ratingMin && !matchesRating(escort, filters.ratingMin)) {
          return false;
        }
        if (filters.availableNow && !escort.availableNow) {
          return false;
        }
        if (filters.serviceTypeFilter && !matchesServiceType(escort, filters.serviceTypeFilter)) {
          return false;
        }
        return true;
      });

      setFilteredEscorts(results);
      setIsFiltering(false);
    }, 100);
  }, [escorts, filters, setCurrentPage]);

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
        break;
    }
    setSortedEscorts(sortResults);
  }, [filteredEscorts, filters.sortBy]);

  useEffect(() => {
    const total = Math.ceil(sortedEscorts.length / itemsPerPage) || 1;
    setTotalPages(total);
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    setPaginatedEscorts(sortedEscorts.slice(start, end));
  }, [sortedEscorts, currentPage, itemsPerPage]);

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

const matchesSearchQuery = (escort: ExtendedEscort, query: string): boolean => {
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

const matchesLocation = (escort: ExtendedEscort, location: string): boolean => {
  return escort.location?.toLowerCase().includes(location.toLowerCase()) ?? false;
};

const matchesPriceRange = (escort: ExtendedEscort, range: [number, number]): boolean => {
  const price = escort.price || 0;
  return price >= range[0] && price <= range[1];
};

const matchesServices = (escort: ExtendedEscort, services: string[]): boolean => {
  return services.some(service => 
    escort.services?.includes(service) || 
    escort.tags?.includes(service)
  );
};

const matchesGender = (escort: ExtendedEscort, genders: string[]): boolean => {
  return escort.gender ? genders.includes(escort.gender.toLowerCase()) : false;
};

const matchesOrientation = (escort: ExtendedEscort, orientations: string[]): boolean => {
  const escortOrientation = (escort.sexualOrientation || escort.orientation)?.toLowerCase();
  return escortOrientation ? orientations.includes(escortOrientation) : false;
};

const matchesAgeRange = (escort: ExtendedEscort, range: [number, number]): boolean => {
  return escort.age !== undefined && escort.age >= range[0] && escort.age <= range[1];
};

const matchesRating = (escort: ExtendedEscort, min: number): boolean => {
  return (escort.rating || 0) >= min;
};

const matchesServiceType = (escort: ExtendedEscort, type: ServiceTypeFilter): boolean => {
  if (!type) return true;
  if (type === "in-person") {
    return escort.providesInPersonServices === true;
  } else if (type === "virtual") {
    return escort.providesVirtualContent === true;
  } else if (type === "both") {
    return escort.providesInPersonServices === true && escort.providesVirtualContent === true;
  }
  if (Array.isArray(escort.serviceType)) {
    return escort.serviceType.includes(type);
  }
  if (Array.isArray(escort.services)) {
    return escort.services.includes(type);
  }
  return false;
};

export default useFilterResults;

