
import { useState, useEffect } from "react";
import { useFilterResults } from "@/hooks/escort-filters/useFilterResults";
import { Escort } from "@/types/escort";
import { EscortFilterHook } from "@/types/escortFilters";

export const useEscortFilter = (escorts: Escort[]): EscortFilterHook => {
  // Filter state
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [verifiedOnly, setVerifiedOnly] = useState<boolean>(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [currentPage, setCurrentPage] = useState<number>(1);
  
  // New filter states
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
  const [selectedOrientations, setSelectedOrientations] = useState<string[]>([]);
  const [ageRange, setAgeRange] = useState<[number, number]>([18, 50]);
  const [ratingMin, setRatingMin] = useState<number>(0);
  const [availableNow, setAvailableNow] = useState<boolean>(false);
  const [serviceTypeFilter, setServiceTypeFilter] = useState<"in-person" | "virtual" | "both" | "">("");
  
  // Combined filter state for useFilterResults hook
  const filters = {
    searchQuery,
    location,
    priceRange,
    verifiedOnly,
    selectedServices,
    sortBy,
    selectedGenders,
    selectedOrientations,
    ageRange,
    ratingMin,
    availableNow,
    serviceTypeFilter,
    currentPage
  };
  
  // Get filtered, sorted, and paginated escorts
  const { 
    filteredEscorts, 
    sortedEscorts,
    paginatedEscorts, 
    totalPages 
  } = useFilterResults(escorts, filters, currentPage, setCurrentPage);
  
  // Handle price range change from slider component
  const handlePriceRangeChange = (values: number[]) => {
    setPriceRange([values[0], values[1]]);
  };
  
  // Handle age range change from slider component
  const handleAgeRangeChange = (values: number[]) => {
    setAgeRange([values[0], values[1]]);
  };
  
  // Toggle service selection
  const toggleService = (service: string) => {
    setSelectedServices(prev => 
      prev.includes(service)
        ? prev.filter(item => item !== service)
        : [...prev, service]
    );
  };
  
  // Toggle gender selection
  const toggleGender = (gender: string) => {
    setSelectedGenders(prev => 
      prev.includes(gender)
        ? prev.filter(item => item !== gender)
        : [...prev, gender]
    );
  };
  
  // Toggle orientation selection
  const toggleOrientation = (orientation: string) => {
    setSelectedOrientations(prev => 
      prev.includes(orientation)
        ? prev.filter(item => item !== orientation)
        : [...prev, orientation]
    );
  };
  
  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setLocation("");
    setPriceRange([0, 1000]);
    setVerifiedOnly(false);
    setSelectedServices([]);
    setSortBy("featured");
    setCurrentPage(1);
    setSelectedGenders([]);
    setSelectedOrientations([]);
    setAgeRange([18, 50]);
    setRatingMin(0);
    setAvailableNow(false);
    setServiceTypeFilter("");
  };
  
  return {
    // Filter state
    searchQuery,
    location,
    priceRange,
    verifiedOnly,
    selectedServices,
    sortBy,
    currentPage,
    selectedGenders,
    selectedOrientations,
    ageRange,
    ratingMin,
    availableNow,
    serviceTypeFilter,
    
    // Filter actions
    setSearchQuery,
    setLocation,
    setPriceRange,
    handlePriceRangeChange,
    setVerifiedOnly,
    setSelectedServices,
    toggleService,
    setSortBy,
    setCurrentPage,
    setSelectedGenders,
    toggleGender,
    setSelectedOrientations,
    toggleOrientation,
    setAgeRange,
    handleAgeRangeChange,
    setRatingMin,
    setAvailableNow,
    setServiceTypeFilter,
    clearFilters,
    
    // Filter results
    filteredEscorts,
    sortedEscorts,
    paginatedEscorts,
    totalPages
  };
};
