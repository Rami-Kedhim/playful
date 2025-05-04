
import { useState, useCallback } from 'react';
import { ServiceTypeFilter } from '@/components/escorts/filters/ServiceTypeBadgeLabel';
import { Escort } from '@/types/Escort';

export interface UseEscortFilterProps {
  escorts?: Escort[];
}

export const useEscortFilter = (props?: UseEscortFilterProps) => {
  // Basic filters
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [ageRange, setAgeRange] = useState<[number, number]>([18, 60]);
  const [gender, setGender] = useState<string[]>([]);
  const [serviceTypeFilter, setServiceTypeFilter] = useState<ServiceTypeFilter>('');
  
  // Advanced filters
  const [selectedBodyTypes, setSelectedBodyTypes] = useState<string[]>([]);
  const [selectedEthnicities, setSelectedEthnicities] = useState<string[]>([]);
  const [selectedHairColors, setSelectedHairColors] = useState<string[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [verifiedOnly, setVerifiedOnly] = useState<boolean>(false);
  const [availableNow, setAvailableNow] = useState<boolean>(false);
  const [ratingMin, setRatingMin] = useState<number>(0);
  const [sortOrder, setSortOrder] = useState<string>('recommended');

  // Filter the actual escorts based on criteria
  const filteredEscorts = useCallback(() => {
    if (!props?.escorts) return [];
    
    let filtered = [...props.escorts];
    
    // Apply basic filters
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(escort => 
        escort.name.toLowerCase().includes(query) || 
        escort.bio?.toLowerCase().includes(query) ||
        escort.location?.toLowerCase().includes(query)
      );
    }
    
    if (location) {
      const loc = location.toLowerCase();
      filtered = filtered.filter(escort => 
        escort.location?.toLowerCase().includes(loc)
      );
    }
    
    // Price filter
    filtered = filtered.filter(escort => {
      const price = escort.hourlyRate || 0;
      return price >= priceRange[0] && price <= priceRange[1];
    });
    
    // Age filter (if age is available)
    filtered = filtered.filter(escort => {
      if (!escort.age) return true; // Include if no age data
      return escort.age >= ageRange[0] && escort.age <= ageRange[1];
    });
    
    // Gender filter
    if (gender.length > 0) {
      filtered = filtered.filter(escort => 
        gender.includes(escort.gender || '')
      );
    }
    
    // Service type filter
    if (serviceTypeFilter && serviceTypeFilter !== 'any') {
      filtered = filtered.filter(escort => {
        if (serviceTypeFilter === 'in-person') {
          return escort.serviceTypes?.includes('in-person');
        } else if (serviceTypeFilter === 'virtual') {
          return escort.serviceTypes?.includes('virtual');
        } else if (serviceTypeFilter === 'both') {
          return escort.serviceTypes?.includes('in-person') && 
                 escort.serviceTypes?.includes('virtual');
        }
        return true; // Default case
      });
    }
    
    // Advanced filters
    if (selectedBodyTypes.length > 0) {
      filtered = filtered.filter(escort => 
        selectedBodyTypes.includes(escort.bodyType || '')
      );
    }
    
    if (selectedEthnicities.length > 0) {
      filtered = filtered.filter(escort => 
        selectedEthnicities.includes(escort.ethnicity || '')
      );
    }
    
    if (selectedHairColors.length > 0) {
      filtered = filtered.filter(escort => 
        selectedHairColors.includes(escort.hairColor || '')
      );
    }
    
    if (selectedServices.length > 0) {
      filtered = filtered.filter(escort => 
        selectedServices.some(service => escort.services?.includes(service))
      );
    }
    
    // Verification and availability filters
    if (verifiedOnly) {
      filtered = filtered.filter(escort => escort.isVerified);
    }
    
    if (availableNow) {
      filtered = filtered.filter(escort => escort.available);
    }
    
    // Rating filter
    if (ratingMin > 0) {
      filtered = filtered.filter(escort => (escort.rating || 0) >= ratingMin);
    }
    
    // Apply sorting
    if (sortOrder === 'price-low') {
      filtered.sort((a, b) => (a.hourlyRate || 0) - (b.hourlyRate || 0));
    } else if (sortOrder === 'price-high') {
      filtered.sort((a, b) => (b.hourlyRate || 0) - (a.hourlyRate || 0));
    } else if (sortOrder === 'rating') {
      filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }
    
    return filtered;
  }, [
    props?.escorts,
    searchQuery,
    location,
    priceRange,
    ageRange,
    gender,
    serviceTypeFilter,
    selectedBodyTypes,
    selectedEthnicities,
    selectedHairColors,
    selectedServices,
    verifiedOnly,
    availableNow,
    ratingMin,
    sortOrder
  ]);

  // Reset all filters
  const resetFilters = useCallback(() => {
    setSearchQuery('');
    setLocation('');
    setPriceRange([0, 1000]);
    setAgeRange([18, 60]);
    setGender([]);
    setServiceTypeFilter('');
    setSelectedBodyTypes([]);
    setSelectedEthnicities([]);
    setSelectedHairColors([]);
    setSelectedServices([]);
    setVerifiedOnly(false);
    setAvailableNow(false);
    setRatingMin(0);
    setSortOrder('recommended');
  }, []);

  return {
    // Filter states
    searchQuery,
    setSearchQuery,
    location,
    setLocation,
    priceRange,
    setPriceRange,
    ageRange,
    setAgeRange,
    gender,
    setGender,
    serviceTypeFilter,
    setServiceTypeFilter,
    selectedBodyTypes,
    setSelectedBodyTypes,
    selectedEthnicities, 
    setSelectedEthnicities,
    selectedHairColors,
    setSelectedHairColors,
    selectedServices,
    setSelectedServices,
    verifiedOnly,
    setVerifiedOnly,
    availableNow,
    setAvailableNow,
    ratingMin,
    setRatingMin,
    sortOrder,
    setSortOrder,
    
    // Methods
    filteredEscorts,
    resetFilters
  };
};

export default useEscortFilter;
