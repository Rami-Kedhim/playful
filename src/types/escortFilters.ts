
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
}
