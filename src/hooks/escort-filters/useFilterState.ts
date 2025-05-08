
import { useState } from 'react';
import { ServiceTypeFilter } from '@/components/escorts/filters/ServiceTypeBadgeLabel';

/**
 * Custom hook for managing escort filter state
 */
export const useFilterState = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
  const [selectedOrientations, setSelectedOrientations] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [ageRange, setAgeRange] = useState<[number, number]>([18, 60]);
  const [ratingMin, setRatingMin] = useState(0);
  const [availableNow, setAvailableNow] = useState(false);
  const [serviceTypeFilter, setServiceTypeFilter] = useState<ServiceTypeFilter>("any");

  // Toggle service selection
  const toggleService = (service: string) => {
    if (selectedServices.includes(service)) {
      setSelectedServices(selectedServices.filter(s => s !== service));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  // Toggle gender selection
  const toggleGender = (gender: string) => {
    if (selectedGenders.includes(gender)) {
      setSelectedGenders(selectedGenders.filter(g => g !== gender));
    } else {
      setSelectedGenders([...selectedGenders, gender]);
    }
  };

  // Toggle orientation selection
  const toggleOrientation = (orientation: string) => {
    if (selectedOrientations.includes(orientation)) {
      setSelectedOrientations(selectedOrientations.filter(o => o !== orientation));
    } else {
      setSelectedOrientations([...selectedOrientations, orientation]);
    }
  };

  // Handle price range change
  const handlePriceRangeChange = (values: number[]) => {
    if (values && values.length >= 2) {
      setPriceRange([values[0], values[1]]);
    }
  };

  // Handle age range change
  const handleAgeRangeChange = (values: number[]) => {
    if (values && values.length >= 2) {
      setAgeRange([values[0], values[1]]);
    }
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setLocation("");
    setPriceRange([0, 1000]);
    setVerifiedOnly(false);
    setSelectedServices([]);
    setSelectedGenders([]);
    setSelectedOrientations([]);
    setSortBy("newest");
    setCurrentPage(1);
    setAgeRange([18, 60]);
    setRatingMin(0);
    setAvailableNow(false);
    setServiceTypeFilter("any");
  };

  return {
    searchQuery,
    setSearchQuery,
    location,
    setLocation,
    priceRange,
    setPriceRange,
    handlePriceRangeChange,
    verifiedOnly,
    setVerifiedOnly,
    selectedServices,
    setSelectedServices,
    toggleService,
    selectedGenders,
    setSelectedGenders,
    toggleGender,
    selectedOrientations,
    setSelectedOrientations,
    toggleOrientation,
    sortBy,
    setSortBy,
    currentPage,
    setCurrentPage,
    ageRange,
    setAgeRange,
    handleAgeRangeChange,
    ratingMin,
    setRatingMin,
    availableNow,
    setAvailableNow,
    serviceTypeFilter,
    setServiceTypeFilter,
    clearFilters
  };
};

export default useFilterState;
