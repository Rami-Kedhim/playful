
import { useState, useMemo } from "react";
import { Escort } from "@/data/escortData";

export const useEscortFilter = (escorts: Escort[]) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  // Add new filter states
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
  const [selectedOrientations, setSelectedOrientations] = useState<string[]>([]);
  const [ageRange, setAgeRange] = useState<[number, number]>([18, 60]);
  const [ratingMin, setRatingMin] = useState(0);
  const [availableNow, setAvailableNow] = useState(false);
  const [serviceTypeFilter, setServiceTypeFilter] = useState<"in-person" | "virtual" | "both" | "">("");
  
  const ESCORTS_PER_PAGE = 12;
  
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
  
  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setLocation("");
    setPriceRange([0, 1000]);
    setVerifiedOnly(false);
    setSelectedServices([]);
    setSelectedGenders([]);
    setSelectedOrientations([]);
    setAgeRange([18, 60]);
    setRatingMin(0);
    setAvailableNow(false);
    setServiceTypeFilter("");
    setCurrentPage(1);
  };
  
  // Filter escorts based on selected filters
  const filteredEscorts = useMemo(() => {
    // Reset to first page when filters change
    if (currentPage !== 1) setCurrentPage(1);
    
    return escorts.filter(escort => {
      // Filter by search query (name, location, description)
      if (searchQuery && !escort.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !escort.location.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      // Filter by location
      if (location && !escort.location.toLowerCase().includes(location.toLowerCase())) {
        return false;
      }
      
      // Filter by price range
      if (escort.price < priceRange[0] || escort.price > priceRange[1]) {
        return false;
      }
      
      // Filter by verification status
      if (verifiedOnly && !escort.verified) {
        return false;
      }
      
      // Filter by services
      if (selectedServices.length > 0) {
        const escortServices = escort.services || [];
        if (!selectedServices.some(service => escortServices.includes(service))) {
          return false;
        }
      }
      
      // Filter by gender
      if (selectedGenders.length > 0 && !selectedGenders.includes(escort.gender)) {
        return false;
      }
      
      // Filter by orientation
      if (selectedOrientations.length > 0 && !selectedOrientations.includes(escort.sexualOrientation)) {
        return false;
      }
      
      // Filter by age range
      if (escort.age < ageRange[0] || escort.age > ageRange[1]) {
        return false;
      }
      
      // Filter by minimum rating
      if (escort.rating < ratingMin) {
        return false;
      }
      
      // Filter by availability
      if (availableNow && !escort.availableNow) {
        return false;
      }
      
      // Filter by service type
      if (serviceTypeFilter) {
        if (serviceTypeFilter === "in-person" && !(escort.providesInPersonServices || escort.providesInPersonServices === undefined)) {
          return false;
        }
        if (serviceTypeFilter === "virtual" && !escort.providesVirtualContent) {
          return false;
        }
        if (serviceTypeFilter === "both" && (!escort.providesInPersonServices || !escort.providesVirtualContent)) {
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
  
  // Sort filtered escorts
  const sortedEscorts = useMemo(() => {
    return [...filteredEscorts].sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "oldest":
          // If we had creation dates, we'd use those
          return filteredEscorts.indexOf(a) - filteredEscorts.indexOf(b);
        case "newest":
        default:
          // If we had creation dates, we'd use those
          return filteredEscorts.indexOf(b) - filteredEscorts.indexOf(a);
      }
    });
  }, [filteredEscorts, sortBy]);
  
  // Paginate sorted escorts
  const paginatedEscorts = useMemo(() => {
    const startIndex = (currentPage - 1) * ESCORTS_PER_PAGE;
    return sortedEscorts.slice(startIndex, startIndex + ESCORTS_PER_PAGE);
  }, [sortedEscorts, currentPage]);
  
  // Calculate total pages
  const totalPages = Math.ceil(sortedEscorts.length / ESCORTS_PER_PAGE);
  
  return {
    searchQuery,
    setSearchQuery,
    location,
    setLocation,
    priceRange,
    setPriceRange,
    verifiedOnly,
    setVerifiedOnly,
    selectedServices,
    toggleService,
    sortBy,
    setSortBy,
    currentPage,
    setCurrentPage,
    clearFilters,
    filteredEscorts,
    sortedEscorts,
    paginatedEscorts,
    totalPages,
    // New filter states and functions
    selectedGenders,
    toggleGender,
    selectedOrientations,
    toggleOrientation,
    ageRange,
    setAgeRange,
    ratingMin,
    setRatingMin,
    availableNow,
    setAvailableNow,
    serviceTypeFilter,
    setServiceTypeFilter
  };
};
