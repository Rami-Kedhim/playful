
import { useState, useEffect, useMemo } from 'react';
import { Escort } from '@/types/Escort';

interface EscortFilterOptions {
  services?: string[];
  priceRange?: [number, number];
  ageRange?: [number, number];
  gender?: string;
  location?: string;
  searchQuery?: string;
}

export const useEscortFilter = (
  escorts: Escort[],
  initialFilters: EscortFilterOptions = {}
) => {
  const [filters, setFilters] = useState<EscortFilterOptions>(initialFilters);
  
  // Filtered escorts based on current filter settings
  const filteredEscorts = useMemo(() => {
    return escorts.filter((escort) => {
      // Filter by search query
      if (filters.searchQuery && !escort.name.toLowerCase().includes(filters.searchQuery.toLowerCase())) {
        return false;
      }
      
      // Filter by services
      if (filters.services && filters.services.length > 0) {
        const escortServices = escort.services || [];
        const hasMatchingService = filters.services.some(service => 
          escortServices.includes(service)
        );
        
        if (!hasMatchingService) return false;
      }
      
      // Filter by price range
      if (filters.priceRange) {
        const [min, max] = filters.priceRange;
        const escortPrice = escort.hourlyRate || 0;
        
        if (escortPrice < min || escortPrice > max) {
          return false;
        }
      }
      
      // Filter by age range
      if (filters.ageRange) {
        const [min, max] = filters.ageRange;
        const escortAge = escort.age || 0;
        
        if (escortAge < min || escortAge > max) {
          return false;
        }
      }
      
      // Filter by gender
      if (filters.gender && escort.gender !== filters.gender) {
        return false;
      }
      
      // Filter by location
      if (filters.location && !escort.location?.includes(filters.location)) {
        return false;
      }
      
      return true;
    });
  }, [escorts, filters]);
  
  // Update filters
  const updateFilters = (newFilters: Partial<EscortFilterOptions>) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters
    }));
  };
  
  // Reset all filters
  const resetFilters = () => {
    setFilters({});
  };
  
  return {
    filters,
    updateFilters,
    resetFilters,
    filteredEscorts
  };
};

export default useEscortFilter;
