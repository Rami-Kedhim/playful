
import { useState } from "react";
import { EscortFilterState, EscortFilterActions } from "@/types/escortFilters";

export const useFilterState = (): EscortFilterState & EscortFilterActions => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
  const [selectedOrientations, setSelectedOrientations] = useState<string[]>([]);
  const [ageRange, setAgeRange] = useState<[number, number]>([18, 60]);
  const [ratingMin, setRatingMin] = useState(0);
  const [availableNow, setAvailableNow] = useState(false);
  const [serviceTypeFilter, setServiceTypeFilter] = useState<"in-person" | "virtual" | "both" | "">("");
  const [isLoading, setIsLoading] = useState(false);
  
  // Toggle service selection
  const toggleService = (service: string) => {
    if (service === "") {
      // Special case for clearing services
      setSelectedServices([]);
      return;
    }
    
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
  
  // Handle price range change with proper typing
  const handlePriceRangeChange = (values: number[]) => {
    setPriceRange([values[0], values[1]] as [number, number]);
  };
  
  // Handle age range change with proper typing
  const handleAgeRangeChange = (values: number[]) => {
    setAgeRange([values[0], values[1]] as [number, number]);
  };
  
  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setLocation("");
    setPriceRange([0, 1000]);
    setVerifiedOnly(false);
    setSelectedServices([]);
    setSortBy("newest");
    setCurrentPage(1);
    setSelectedGenders([]);
    setSelectedOrientations([]);
    setAgeRange([18, 60]);
    setRatingMin(0);
    setAvailableNow(false);
    setServiceTypeFilter("");
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
    sortBy,
    setSortBy,
    currentPage,
    setCurrentPage,
    selectedGenders,
    setSelectedGenders,
    toggleGender,
    selectedOrientations,
    setSelectedOrientations,
    toggleOrientation,
    ageRange,
    setAgeRange,
    handleAgeRangeChange,
    ratingMin,
    setRatingMin,
    availableNow,
    setAvailableNow,
    serviceTypeFilter,
    setServiceTypeFilter,
    isLoading,
    setIsLoading,
    clearFilters
  };
};
