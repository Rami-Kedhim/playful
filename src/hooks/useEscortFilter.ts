
import { useCallback, useState } from 'react';
import { ServiceTypeFilter } from '@/components/escorts/filters/ServiceTypeBadgeLabel';
import { Escort } from '@/types/Escort';

interface UseEscortFilterProps {
  escorts: Escort[];
}

export const useEscortFilter = ({ escorts }: UseEscortFilterProps) => {
  const [serviceTypeFilter, setServiceTypeFilter] = useState<ServiceTypeFilter>("");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [availableNow, setAvailableNow] = useState(false);
  const [location, setLocation] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [ratingMin, setRatingMin] = useState(0);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Filter escorts based on the current filter state
  const filteredEscorts = useCallback(() => {
    return escorts.filter(escort => {
      // Filter by service type
      if (serviceTypeFilter && serviceTypeFilter !== "any" && serviceTypeFilter !== "") {
        if (!escort.serviceType || escort.serviceType !== serviceTypeFilter) {
          return false;
        }
      }
      
      // Filter by verified status
      if (verifiedOnly && (!escort.isVerified && !escort.verified)) {
        return false;
      }
      
      // Filter by availability
      if (availableNow && !escort.availableNow) {
        return false;
      }
      
      // Filter by location
      if (location && (!escort.location || !escort.location.toLowerCase().includes(location.toLowerCase()))) {
        return false;
      }
      
      // Filter by search query (name or description)
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const nameMatch = escort.name?.toLowerCase().includes(query);
        const descMatch = escort.description?.toLowerCase().includes(query);
        if (!nameMatch && !descMatch) {
          return false;
        }
      }
      
      // Filter by rating
      if (ratingMin > 0 && (!escort.rating || escort.rating < ratingMin)) {
        return false;
      }
      
      // Filter by price range
      if (priceRange[0] > 0 || priceRange[1] < 1000) {
        const escortPrice = escort.price || 0;
        if (escortPrice < priceRange[0] || escortPrice > priceRange[1]) {
          return false;
        }
      }
      
      return true;
    });
  }, [
    escorts,
    serviceTypeFilter,
    verifiedOnly,
    availableNow,
    location,
    searchQuery,
    ratingMin,
    priceRange
  ]);
  
  // Reset all filters to their default values
  const resetFilters = useCallback(() => {
    setServiceTypeFilter("");
    setVerifiedOnly(false);
    setAvailableNow(false);
    setLocation('');
    setSearchQuery('');
    setRatingMin(0);
    setPriceRange([0, 1000]);
  }, []);
  
  return {
    serviceTypeFilter,
    setServiceTypeFilter,
    verifiedOnly,
    setVerifiedOnly,
    availableNow,
    setAvailableNow,
    location,
    setLocation,
    searchQuery,
    setSearchQuery,
    ratingMin,
    setRatingMin,
    priceRange,
    setPriceRange,
    filteredEscorts,
    resetFilters,
    isLoading
  };
};

export default useEscortFilter;
