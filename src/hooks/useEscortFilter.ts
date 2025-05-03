
import { useState, useEffect, useCallback, useMemo } from "react";
import useFilterResults from "@/hooks/escort-filters/useFilterResults";
import { Escort } from "@/types/Escort";

interface UseEscortFilterProps {
  escorts: Escort[];
}

export const useEscortFilter = ({ escorts }: UseEscortFilterProps) => {
  // Filter state
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [verifiedOnly, setVerifiedOnly] = useState<boolean>(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // New filter states
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
  const [selectedOrientations, setSelectedOrientations] = useState<string[]>([]);
  const [ageRange, setAgeRange] = useState<[number, number]>([21, 50]);
  const [ratingMin, setRatingMin] = useState<number>(0);
  const [availableNow, setAvailableNow] = useState<boolean>(false);
  const [serviceTypeFilter, setServiceTypeFilter] = useState<"" | "in-person" | "virtual" | "both">("");
  
  // Combined filter state for useFilterResults hook - memoize to prevent recreating on each render
  const filters = useMemo(() => ({
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
  }), [
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
  ]);
  
  // Get filtered, sorted, and paginated escorts
  const { 
    filteredEscorts, 
    sortedEscorts,
    paginatedEscorts, 
    totalPages,
    isFiltering 
  } = useFilterResults(escorts, filters, currentPage, setCurrentPage);
  
  // Sync loading state
  useEffect(() => {
    setIsLoading(isFiltering);
  }, [isFiltering]);
  
  // Handler functions wrapped with useCallback
  const handlePriceRangeChange = useCallback((values: number[]) => {
    setPriceRange([values[0], values[1]]);
  }, []);
  
  const handleAgeRangeChange = useCallback((values: number[]) => {
    setAgeRange([values[0], values[1]]);
  }, []);
  
  const toggleService = useCallback((service: string) => {
    setSelectedServices(prev => 
      prev.includes(service)
        ? prev.filter(item => item !== service)
        : [...prev, service]
    );
  }, []);
  
  const toggleGender = useCallback((gender: string) => {
    setSelectedGenders(prev => 
      prev.includes(gender)
        ? prev.filter(item => item !== gender)
        : [...prev, gender]
    );
  }, []);
  
  const toggleOrientation = useCallback((orientation: string) => {
    setSelectedOrientations(prev => 
      prev.includes(orientation)
        ? prev.filter(item => item !== orientation)
        : [...prev, orientation]
    );
  }, []);
  
  const clearFilters = useCallback(() => {
    setSearchQuery("");
    setLocation("");
    setPriceRange([0, 500]);
    setVerifiedOnly(false);
    setSelectedServices([]);
    setSortBy("featured");
    setCurrentPage(1);
    setSelectedGenders([]);
    setSelectedOrientations([]);
    setAgeRange([21, 50]);
    setRatingMin(0);
    setAvailableNow(false);
    setServiceTypeFilter("");
  }, []);
  
  // Return the filter state and handlers as a single object
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
    isLoading,
    
    // Filter actions - with stable references
    setSearchQuery: useCallback((query: string) => setSearchQuery(query), []),
    setLocation: useCallback((loc: string) => setLocation(loc), []),
    setPriceRange: useCallback((range: [number, number]) => setPriceRange(range), []),
    handlePriceRangeChange,
    setVerifiedOnly: useCallback((verified: boolean) => setVerifiedOnly(verified), []),
    setSelectedServices: useCallback((services: string[]) => setSelectedServices(services), []),
    toggleService,
    setSortBy: useCallback((sort: string) => setSortBy(sort), []),
    setCurrentPage: useCallback((page: number) => setCurrentPage(page), []),
    setSelectedGenders: useCallback((genders: string[]) => setSelectedGenders(genders), []),
    toggleGender,
    setSelectedOrientations: useCallback((orientations: string[]) => setSelectedOrientations(orientations), []),
    toggleOrientation,
    setAgeRange: useCallback((range: [number, number]) => setAgeRange(range), []),
    handleAgeRangeChange,
    setRatingMin: useCallback((rating: number) => setRatingMin(rating), []),
    setAvailableNow: useCallback((available: boolean) => setAvailableNow(available), []),
    setServiceTypeFilter: useCallback((type: "" | "in-person" | "virtual" | "both") => setServiceTypeFilter(type), []),
    setIsLoading: useCallback((loading: boolean) => setIsLoading(loading), []),
    clearFilters,
    
    // Filter results
    filteredEscorts,
    sortedEscorts,
    paginatedEscorts,
    totalPages
  };
};

export default useEscortFilter;
