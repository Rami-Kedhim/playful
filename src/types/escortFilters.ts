
import { Escort } from "./escort";

export interface EscortFilterState {
  searchQuery: string;
  location: string;
  priceRange: [number, number];
  verifiedOnly: boolean;
  selectedServices: string[];
  sortBy: string;
  currentPage: number;
  selectedGenders: string[];
  selectedOrientations: string[];
  ageRange: [number, number];
  ratingMin: number;
  availableNow: boolean;
  serviceTypeFilter: "" | "in-person" | "virtual" | "both";
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
  setSortBy: (sortBy: string) => void;
  setCurrentPage: (page: number) => void;
  setSelectedGenders: (genders: string[]) => void;
  toggleGender: (gender: string) => void;
  setSelectedOrientations: (orientations: string[]) => void;
  toggleOrientation: (orientation: string) => void;
  setAgeRange: (range: [number, number]) => void;
  handleAgeRangeChange: (values: number[]) => void;
  setRatingMin: (rating: number) => void;
  setAvailableNow: (available: boolean) => void;
  setServiceTypeFilter: (type: "" | "in-person" | "virtual" | "both") => void;
  setIsLoading: (loading: boolean) => void;
  clearFilters: () => void;
}

export interface EscortFilterHook extends EscortFilterState, EscortFilterActions {
  filteredEscorts: Escort[];
  sortedEscorts: Escort[];
  paginatedEscorts: Escort[];
  totalPages: number;
}
