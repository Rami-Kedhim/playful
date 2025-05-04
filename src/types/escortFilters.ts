export interface EnhancedEscortFilters {
  location: string;
  serviceType: string[];
  serviceTypes: string[];
  priceRange: [number, number];
  ageRange: [number, number];
  price: [number, number];
  age: [number, number];
  gender: string[];
  orientation: string[];
  rating: number;
  verified: boolean;
  languages: string[];
  availableNow: boolean;
  escortType: string;
  hasContent: boolean;
  bodyType: string[];
  hairColor: string[];
  ethnicity: string[];
  maxDistance: number;
  localOnly: boolean;
  useNeuralSuggestions: boolean;
  selectedFilters: string[];
}

export interface EscortFilterOptions {
  gender: string[];
  service: string[];
  serviceType?: string[];
  serviceTypes?: string[];
  priceRange: [number, number];
  ageRange: [number, number];
  languages: string[];
  location: string;
  maxDistance: number;
  availability: string[];
  rating: number;
  verified: boolean;
  selectedServices?: string[];
  selectedGenders?: string[];
  verifiedOnly?: boolean;
  orientation?: string[];
  availableNow?: boolean;
}

// Add these new interfaces for the filter hooks
export interface EscortFilterState {
  searchQuery: string;
  location: string;
  priceRange: [number, number];
  verifiedOnly: boolean;
  selectedServices: string[];
  selectedGenders: string[];
  selectedOrientations: string[];
  sortBy: string;
  currentPage: number;
  ageRange: [number, number];
  ratingMin: number;
  availableNow: boolean;
  serviceTypeFilter: "in-person" | "virtual" | "both" | "any" | "";
  isLoading: boolean;
}

export interface EscortFilterActions {
  setSearchQuery: (query: string) => void;
  setLocation: (location: string) => void;
  setPriceRange: (range: [number, number]) => void;
  handlePriceRangeChange: (values: number[]) => void;
  setVerifiedOnly: (verified: boolean) => void;
  setSelectedServices: (services: string[]) => void;
  toggleService: (service: string) => void;
  setSelectedGenders: (genders: string[]) => void;
  toggleGender: (gender: string) => void;
  setSelectedOrientations: (orientations: string[]) => void;
  toggleOrientation: (orientation: string) => void;
  setSortBy: (sort: string) => void;
  setCurrentPage: (page: number) => void;
  setAgeRange: (range: [number, number]) => void;
  handleAgeRangeChange: (values: number[]) => void;
  setRatingMin: (rating: number) => void;
  setAvailableNow: (available: boolean) => void;
  setServiceTypeFilter: (type: "in-person" | "virtual" | "both" | "any" | "") => void;
  setIsLoading: (loading: boolean) => void;
  clearFilters: () => void;
}

export interface EscortFilterHook extends EscortFilterState, EscortFilterActions {
  filteredEscorts: any[];
  sortedEscorts: any[];
  paginatedEscorts: any[];
  totalPages: number;
}
