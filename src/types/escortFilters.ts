
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
  serviceTypeFilter: "in-person" | "virtual" | "both" | "";
  isLoading: boolean;
}

export interface EscortFilterActions {
  setSearchQuery: (value: string) => void;
  setLocation: (value: string) => void;
  setPriceRange: (value: [number, number]) => void;
  handlePriceRangeChange: (values: number[]) => void;
  setVerifiedOnly: (value: boolean) => void;
  setSelectedServices: (services: string[]) => void; 
  toggleService: (service: string) => void;
  setSortBy: (value: string) => void;
  setCurrentPage: (value: number) => void;
  setSelectedGenders: (genders: string[]) => void;
  toggleGender: (gender: string) => void;
  setSelectedOrientations: (orientations: string[]) => void;
  toggleOrientation: (orientation: string) => void;
  setAgeRange: (value: [number, number]) => void;
  handleAgeRangeChange: (values: number[]) => void;
  setRatingMin: (value: number) => void;
  setAvailableNow: (value: boolean) => void;
  setServiceTypeFilter: (value: "in-person" | "virtual" | "both" | "") => void;
  setIsLoading: (value: boolean) => void;
  clearFilters: () => void;
}

export interface EscortFilterResults {
  filteredEscorts: Escort[];
  sortedEscorts: Escort[];
  paginatedEscorts: Escort[];
  totalPages: number;
}

export interface EscortFilterHook extends EscortFilterState, EscortFilterActions, EscortFilterResults {}
