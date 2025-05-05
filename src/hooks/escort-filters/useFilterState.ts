
import { useState } from "react";
import { EscortFilterState, EscortFilterActions } from "@/types/escortFilters";

export const useFilterState = (): EscortFilterState & EscortFilterActions => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
  const [selectedOrientations, setSelectedOrientations] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [ageRange, setAgeRange] = useState<[number, number]>([21, 60]);
  const [ratingMin, setRatingMin] = useState(0);
  const [availableNow, setAvailableNow] = useState(false);
  // Changed default value from empty string to "any"
  const [serviceTypeFilter, setServiceTypeFilter] = useState<"in-person" | "virtual" | "both" | "any" | "">("any");
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
  
  // Modified to reset serviceTypeFilter to "any" instead of empty string
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
    setAgeRange([21, 60]);
    setRatingMin(0);
    setAvailableNow(false);
    setServiceTypeFilter("any");
  };

  // Ensure serviceTypeFilter is never an empty string
  const safeSetServiceTypeFilter = (type: "in-person" | "virtual" | "both" | "any" | "") => {
    setServiceTypeFilter(type || "any");
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
    setServiceTypeFilter: safeSetServiceTypeFilter,
    isLoading,
    setIsLoading,
    clearFilters
  };
};
