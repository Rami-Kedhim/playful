
export interface EscortFilterState {
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
  setSelectedServices: (services: string[]) => void;
  sortBy: string;
  setSortBy: (sortBy: string) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  selectedGenders: string[];
  setSelectedGenders: (genders: string[]) => void;
  selectedOrientations: string[];
  setSelectedOrientations: (orientations: string[]) => void;
  ageRange: [number, number];
  setAgeRange: (range: [number, number]) => void;
  handleAgeRangeChange: (values: number[]) => void;
  ratingMin: number;
  setRatingMin: (rating: number) => void;
  availableNow: boolean;
  setAvailableNow: (available: boolean) => void;
  serviceTypeFilter: "in-person" | "virtual" | "both" | "";
  setServiceTypeFilter: (type: "in-person" | "virtual" | "both" | "") => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export interface EscortFilterActions {
  toggleService: (service: string) => void;
  toggleGender: (gender: string) => void;
  toggleOrientation: (orientation: string) => void;
  clearFilters: () => void;
}

export interface Escort {
  id: string;
  name: string;
  bio?: string;
  location: string;
  price?: number;
  verified?: boolean;
  services?: string[];
  gender?: string;
  sexualOrientation?: string;
  age: number;
  rating: number;
  availableNow?: boolean;
  serviceTypes?: string[];
  providesInPersonServices?: boolean;
  providesVirtualContent?: boolean;
}

export interface FilterOptions {
  genders: { id: string; label: string }[];
  orientations: { id: string; label: string }[];
  services: { id: string; label: string }[];
  sortOptions: { id: string; label: string }[];
  serviceTypes: { id: string; label: string }[];
}
