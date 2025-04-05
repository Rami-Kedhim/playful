
import { useState, useEffect, useMemo } from "react";
import { Escort } from "@/types/escort";

interface UseEscortFilterProps {
  escorts: Escort[];
}

export const useEscortFilter = ({ escorts }: UseEscortFilterProps) => {
  // Search filters
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("featured");
  
  // Advanced filters
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
  const [selectedOrientations, setSelectedOrientations] = useState<string[]>([]);
  const [ageRange, setAgeRange] = useState<[number, number]>([18, 65]);
  const [ratingMin, setRatingMin] = useState<number>(0);
  const [availableNow, setAvailableNow] = useState<boolean>(false);
  const [serviceTypeFilter, setServiceTypeFilter] = useState<"in-person" | "virtual" | "both" | null>(null);
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);
  
  // Loading state
  const [isLoading, setIsLoading] = useState(false);
  
  // Filter operations
  const handlePriceRangeChange = (range: [number, number]) => {
    setPriceRange(range);
  };
  
  const handleAgeRangeChange = (range: [number, number]) => {
    setAgeRange(range);
  };
  
  const toggleService = (service: string) => {
    setSelectedServices(prev => 
      prev.includes(service) 
        ? prev.filter(s => s !== service) 
        : [...prev, service]
    );
  };
  
  const toggleGender = (gender: string) => {
    setSelectedGenders(prev => 
      prev.includes(gender) 
        ? prev.filter(g => g !== gender) 
        : [...prev, gender]
    );
  };
  
  const toggleOrientation = (orientation: string) => {
    setSelectedOrientations(prev => 
      prev.includes(orientation) 
        ? prev.filter(o => o !== orientation) 
        : [...prev, orientation]
    );
  };
  
  // Reset all filters
  const clearFilters = () => {
    setSearchQuery("");
    setLocation("");
    setPriceRange([0, 1000]);
    setVerifiedOnly(false);
    setSelectedServices([]);
    setSortBy("featured");
    setSelectedGenders([]);
    setSelectedOrientations([]);
    setAgeRange([18, 65]);
    setRatingMin(0);
    setAvailableNow(false);
    setServiceTypeFilter(null);
  };
  
  // Filter escorts based on all criteria
  const filteredEscorts = useMemo(() => {
    return escorts.filter(escort => {
      // Basic search filters
      if (searchQuery && 
          !escort.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
          !escort.location?.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      if (location && 
          !escort.location?.toLowerCase().includes(location.toLowerCase())) {
        return false;
      }
      
      if (escort.price < priceRange[0] || escort.price > priceRange[1]) {
        return false;
      }
      
      if (verifiedOnly && !escort.verified) {
        return false;
      }
      
      if (selectedServices.length > 0 && 
          !selectedServices.every(service => escort.tags?.includes(service))) {
        return false;
      }
      
      // Advanced filters
      if (selectedGenders.length > 0 && 
          !selectedGenders.includes(escort.gender || '')) {
        return false;
      }
      
      if (selectedOrientations.length > 0 && 
          !selectedOrientations.includes(escort.sexualOrientation || '')) {
        return false;
      }
      
      if (escort.age < ageRange[0] || escort.age > ageRange[1]) {
        return false;
      }
      
      if (ratingMin > 0 && (escort.rating || 0) < ratingMin) {
        return false;
      }
      
      if (availableNow && !escort.availableNow) {
        return false;
      }
      
      if (serviceTypeFilter) {
        const escortServiceType = escort.serviceType || 'both';
        if (serviceTypeFilter !== 'both' && serviceTypeFilter !== escortServiceType) {
          return false;
        }
      }
      
      return true;
    });
  }, [
    escorts, 
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
  ]);
  
  // Sort filtered results
  const sortedEscorts = useMemo(() => {
    return [...filteredEscorts].sort((a, b) => {
      switch (sortBy) {
        case "featured":
          return ((b.featured ? 1 : 0) - (a.featured ? 1 : 0)) || 
                 ((b.verified ? 1 : 0) - (a.verified ? 1 : 0));
        case "priceAsc":
          return (a.price || 0) - (b.price || 0);
        case "priceDesc":
          return (b.price || 0) - (a.price || 0);
        case "rating":
          return (b.rating || 0) - (a.rating || 0);
        case "newest":
          const aDate = a.lastActive ? new Date(a.lastActive) : new Date(0);
          const bDate = b.lastActive ? new Date(b.lastActive) : new Date(0);
          return bDate.getTime() - aDate.getTime();
        default:
          return 0;
      }
    });
  }, [filteredEscorts, sortBy]);
  
  // Calculate pagination
  const totalPages = Math.ceil(sortedEscorts.length / itemsPerPage);
  
  const paginatedEscorts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedEscorts.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedEscorts, currentPage, itemsPerPage]);
  
  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [
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
    serviceTypeFilter
  ]);
  
  // Simulate loading state when filters change
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [
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
    serviceTypeFilter
  ]);
  
  return {
    // Filter states
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
    
    // Filter setters
    setSearchQuery,
    setLocation,
    handlePriceRangeChange,
    setVerifiedOnly,
    toggleService,
    setSortBy,
    toggleGender,
    toggleOrientation,
    handleAgeRangeChange,
    setRatingMin,
    setAvailableNow,
    setServiceTypeFilter,
    
    // Results
    filteredEscorts,
    sortedEscorts,
    paginatedEscorts,
    
    // Pagination
    currentPage,
    setCurrentPage,
    totalPages,
    
    // Loading
    isLoading,
    setIsLoading,
    
    // Actions
    clearFilters
  };
};

export default useEscortFilter;
