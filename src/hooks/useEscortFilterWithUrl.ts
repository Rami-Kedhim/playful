import { useState, useEffect, useMemo } from "react";
import { Escort } from "@/types/Escort";
import { ServiceTypeFilter } from "@/components/escorts/filters/ServiceTypeBadgeLabel";
import { useFilterStateWithUrl } from "./useFilterStateWithUrl";

interface UseEscortFilterParams {
  escorts: Escort[];
}

export interface EscortFilterState {
  filteredEscorts: Escort[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  location: string;
  setLocation: (location: string) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  handlePriceRangeChange: (values: number[]) => void;
  verifiedOnly: boolean;
  setVerifiedOnly: (verified: boolean) => void;
  selectedServices: string[];
  toggleService: (service: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  selectedGenders: string[];
  toggleGender: (gender: string) => void;
  selectedOrientations: string[];
  toggleOrientation: (orientation: string) => void;
  ageRange: [number, number];
  setAgeRange: (range: [number, number]) => void;
  handleAgeRangeChange: (values: number[]) => void;
  ratingMin: number;
  setRatingMin: (rating: number) => void;
  availableNow: boolean;
  setAvailableNow: (available: boolean) => void;
  serviceTypeFilter: ServiceTypeFilter;
  setServiceTypeFilter: (type: ServiceTypeFilter) => void;
  isLoading: boolean;
  totalPages: number;
  clearFilters: () => void;
}

export const useEscortFilterWithUrl = ({ escorts = [] }: UseEscortFilterParams): EscortFilterState => {
  // You can keep your existing implementation here, but now with a proper return type
  // For now, let's return a placeholder implementation that satisfies the TypeScript interface

  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
  const [selectedOrientations, setSelectedOrientations] = useState<string[]>([]);
  const [ageRange, setAgeRange] = useState<[number, number]>([21, 50]);
  const [ratingMin, setRatingMin] = useState(0);
  const [availableNow, setAvailableNow] = useState(false);
  const [serviceTypeFilter, setServiceTypeFilter] = useState<ServiceTypeFilter>("");
  const [isLoading, setIsLoading] = useState(false);

  // URL synchronization
  useFilterStateWithUrl({
    filters: {
      serviceTypeFilter,
      verifiedOnly,
      availableNow,
      location,
      searchQuery,
      ratingMin
    },
    setFilters: (newFilters) => {
      if ('serviceTypeFilter' in newFilters) setServiceTypeFilter(newFilters.serviceTypeFilter as ServiceTypeFilter);
      if ('verifiedOnly' in newFilters) setVerifiedOnly(Boolean(newFilters.verifiedOnly));
      if ('availableNow' in newFilters) setAvailableNow(Boolean(newFilters.availableNow));
      if ('location' in newFilters) setLocation(String(newFilters.location || ""));
      if ('searchQuery' in newFilters) setSearchQuery(String(newFilters.searchQuery || ""));
      if ('ratingMin' in newFilters) setRatingMin(Number(newFilters.ratingMin || 0));
    },
    defaultValues: {
      serviceTypeFilter: "" as ServiceTypeFilter,
      verifiedOnly: false,
      availableNow: false,
      location: "",
      searchQuery: "",
      ratingMin: 0
    }
  });

  // Filter escorts based on all criteria
  const filteredEscorts = useMemo(() => {
    // Apply all filters here
    let filtered = [...escorts];
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(escort => 
        escort.name?.toLowerCase().includes(query) || 
        escort.location?.toLowerCase().includes(query) ||
        escort.description?.toLowerCase().includes(query) ||
        escort.tags?.some(tag => tag.toLowerCase().includes(query)) ||
        escort.services?.some(service => service.toLowerCase().includes(query))
      );
    }
    
    // Filter by location
    if (location) {
      filtered = filtered.filter(escort => 
        escort.location?.toLowerCase().includes(location.toLowerCase())
      );
    }
    
    // Filter by price range
    filtered = filtered.filter(escort => {
      const price = escort.price || escort.rates?.hourly || 0;
      return price >= priceRange[0] && price <= priceRange[1];
    });
    
    // Filter by verification status
    if (verifiedOnly) {
      filtered = filtered.filter(escort => 
        escort.verified || escort.isVerified || escort.is_verified
      );
    }
    
    // Filter by selected services
    if (selectedServices.length > 0) {
      filtered = filtered.filter(escort => 
        selectedServices.every(service => 
          escort.services?.includes(service) || escort.tags?.includes(service)
        )
      );
    }
    
    // Filter by selected genders
    if (selectedGenders.length > 0) {
      filtered = filtered.filter(escort => 
        selectedGenders.includes(escort.gender || '')
      );
    }
    
    // Filter by selected orientations
    if (selectedOrientations.length > 0) {
      filtered = filtered.filter(escort => 
        selectedOrientations.includes(escort.sexualOrientation || escort.orientation || '')
      );
    }
    
    // Filter by age range
    filtered = filtered.filter(escort => {
      const age = escort.age || 0;
      return age >= ageRange[0] && age <= ageRange[1];
    });
    
    // Filter by minimum rating
    if (ratingMin > 0) {
      filtered = filtered.filter(escort => 
        (escort.rating || 0) >= ratingMin
      );
    }
    
    // Filter by availability
    if (availableNow) {
      filtered = filtered.filter(escort => 
        escort.availableNow === true
      );
    }
    
    // Filter by service type
    if (serviceTypeFilter) {
      filtered = filtered.filter(escort => {
        if (serviceTypeFilter === 'in-person') {
          return escort.providesInPersonServices === true || escort.serviceType === 'in-person';
        } else if (serviceTypeFilter === 'virtual') {
          return escort.providesVirtualContent === true || escort.serviceType === 'virtual';
        } else if (serviceTypeFilter === 'both') {
          return (escort.providesInPersonServices === true && escort.providesVirtualContent === true) || 
                 escort.serviceType === 'both';
        }
        return true;
      });
    }
    
    // Sort escorts
    if (sortBy === 'price-low') {
      filtered.sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => (b.price || 0) - (a.price || 0));
    } else if (sortBy === 'rating') {
      filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortBy === 'reviews') {
      filtered.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0));
    } else if (sortBy === 'newest') {
      filtered.sort((a, b) => {
        const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
        const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
        return dateB - dateA;
      });
    } else if (sortBy === 'featured') {
      filtered.sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return 0;
      });
    }
    
    return filtered;
  }, [
    escorts,
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
  
  // Calculate total pages based on filtered escorts
  const totalPages = Math.max(1, Math.ceil(filteredEscorts.length / 12));
  
  // Toggle service selection
  const toggleService = (service: string) => {
    setSelectedServices(prev => 
      prev.includes(service) 
        ? prev.filter(s => s !== service) 
        : [...prev, service]
    );
  };
  
  // Toggle gender selection
  const toggleGender = (gender: string) => {
    setSelectedGenders(prev => 
      prev.includes(gender) 
        ? prev.filter(g => g !== gender) 
        : [...prev, gender]
    );
  };
  
  // Toggle orientation selection
  const toggleOrientation = (orientation: string) => {
    setSelectedOrientations(prev => 
      prev.includes(orientation) 
        ? prev.filter(o => o !== orientation) 
        : [...prev, orientation]
    );
  };
  
  // Handle price range change
  const handlePriceRangeChange = (values: number[]) => {
    setPriceRange([values[0], values[1]]);
  };
  
  // Handle age range change
  const handleAgeRangeChange = (values: number[]) => {
    setAgeRange([values[0], values[1]]);
  };
  
  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setLocation("");
    setPriceRange([0, 500]);
    setVerifiedOnly(false);
    setSelectedServices([]);
    setSortBy("newest");
    setCurrentPage(1);
    setSelectedGenders([]);
    setSelectedOrientations([]);
    setAgeRange([21, 50]);
    setRatingMin(0);
    setAvailableNow(false);
    setServiceTypeFilter("");
  };

  return {
    filteredEscorts,
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
    toggleService,
    sortBy,
    setSortBy,
    currentPage,
    setCurrentPage,
    selectedGenders,
    toggleGender,
    selectedOrientations,
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
    totalPages,
    clearFilters
  };
};

export default useEscortFilterWithUrl;
