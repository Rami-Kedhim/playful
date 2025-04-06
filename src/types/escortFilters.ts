
import { Escort as EscortType } from "./escort";

export interface Escort extends Omit<EscortType, 'reviews'> {
  // Override reviews to be compatible with the original type
  reviews?: any[];
  // Add any additional fields that might be needed
  tags?: string[];
}

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

export interface FilterOptions {
  genders: { id: string; label: string }[];
  orientations: { id: string; label: string }[];
  services: { id: string; label: string }[];
  sortOptions: { id: string; label: string }[];
  serviceTypes: { id: string; label: string }[];
}

// Add the EscortFilterHook interface that combines state and results
export interface EscortFilterHook extends EscortFilterState, EscortFilterActions {
  filteredEscorts: Escort[];
  sortedEscorts: Escort[];
  paginatedEscorts: Escort[];
  totalPages: number;
}
