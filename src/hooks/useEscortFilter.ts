
import { useState } from "react";
import { ServiceTypeFilter } from '@/components/escorts/filters/ServiceTypeBadgeLabel';
import { Escort } from '@/types/Escort';

interface UseEscortFilterProps {
  escorts?: Escort[];
}

export const useEscortFilter = ({ escorts = [] }: UseEscortFilterProps = {}) => {
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
  const [serviceTypeFilter, setServiceTypeFilter] = useState<ServiceTypeFilter>("any");
  const [isLoading, setIsLoading] = useState(false);

  // Safe setter for serviceTypeFilter that prevents empty strings
  const safeSetServiceTypeFilter = (type: ServiceTypeFilter | string) => {
    const safeType: ServiceTypeFilter = !type || type === "" ? "any" : type as ServiceTypeFilter;
    setServiceTypeFilter(safeType);
  };
  
  // Toggle service selection
  const toggleService = (service: string) => {
    if (!service || service === "") {
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
    if (!gender || gender === "") {
      return; // Prevent empty strings
    }
    
    if (selectedGenders.includes(gender)) {
      setSelectedGenders(selectedGenders.filter(g => g !== gender));
    } else {
      setSelectedGenders([...selectedGenders, gender]);
    }
  };
  
  // Toggle orientation selection
  const toggleOrientation = (orientation: string) => {
    if (!orientation || orientation === "") {
      return; // Prevent empty strings
    }
    
    if (selectedOrientations.includes(orientation)) {
      setSelectedOrientations(selectedOrientations.filter(o => o !== orientation));
    } else {
      setSelectedOrientations([...selectedOrientations, orientation]);
    }
  };
  
  // Handle price range change with proper typing
  const handlePriceRangeChange = (values: number[]) => {
    if (values && values.length >= 2) {
      setPriceRange([values[0], values[1]] as [number, number]);
    }
  };
  
  // Handle age range change with proper typing
  const handleAgeRangeChange = (values: number[]) => {
    if (values && values.length >= 2) {
      setAgeRange([values[0], values[1]] as [number, number]);
    }
  };
  
  // Always reset serviceTypeFilter to "any" - never empty string
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

export default useEscortFilter;
