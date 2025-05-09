
/**
 * Unified filter types for UberEscorts platform
 */

// Service type filter options
export type ServiceTypeFilter = 'in-person' | 'virtual' | 'both' | string;

// Verification filter options
export type VerificationFilter = 'verified' | 'all' | 'unverified';

// Sort options
export type SortOption = 'price-asc' | 'price-desc' | 'rating-desc' | 'newest' | 'popular' | 'relevance';

// Filter interface for escort search
export interface EscortFilterOptions {
  serviceType?: ServiceTypeFilter;
  verification?: VerificationFilter;
  minPrice?: number;
  maxPrice?: number;
  gender?: string[];
  location?: string;
  ageRange?: [number, number];
  sortBy?: SortOption;
  availableNow?: boolean;
  languages?: string[];
  specialties?: string[];
  serviceTypes?: string[];
  priceRange?: [number, number];
  price?: [number, number];
  age?: [number, number];
  orientation?: string[];
  verified?: boolean;
  escortType?: string;
  maxDistance?: number;
  rating?: number;
}

// Enhanced escort filter options
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
  useBoostSorting?: boolean;
}

// Filter interface for creator search
export interface CreatorFilterOptions {
  contentTypes?: string[];
  verification?: VerificationFilter;
  minPrice?: number;
  maxPrice?: number;
  gender?: string[];
  sortBy?: SortOption;
  hasContent?: boolean;
}

// Filter interface for livecam search
export interface LivecamFilterOptions {
  isLive?: boolean;
  verification?: VerificationFilter;
  minViewers?: number;
  gender?: string[];
  sortBy?: SortOption;
  categories?: string[];
}

// Unified filter for the UberPersona system
export interface UberPersonaFilterOptions {
  serviceType?: ServiceTypeFilter;
  verification?: VerificationFilter;
  minPrice?: number;
  maxPrice?: number;
  gender?: string[];
  location?: string;
  ageRange?: [number, number];
  sortBy?: SortOption;
  availableNow?: boolean;
  languages?: string[];
  specialties?: string[];
  profileType?: ('escort' | 'creator' | 'livecam' | 'ai-companion')[];
  hasContent?: boolean;
  isLive?: boolean;
}

// Filter state and actions
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

export const ESCORT_SERVICE_TYPES = [
  { label: "In Person", value: "in-person" },
  { label: "Virtual", value: "virtual" },
  { label: "Both", value: "both" },
  { label: "Massage", value: "massage" },
  { label: "Dinner Date", value: "dinner" },
];

export const ESCORT_GENDER_OPTIONS = [
  { label: "Female", value: "female" },
  { label: "Male", value: "male" },
  { label: "Non-Binary", value: "non-binary" },
  { label: "Trans Female", value: "trans-female" },
  { label: "Trans Male", value: "trans-male" },
];
