
export interface EscortFilterOptions {
  location: string;
  serviceType: string[];
  serviceTypes: string[];
  priceRange: [number, number];
  gender: string[];
  orientation: string[];
  ageRange: [number, number];
  rating: number;
  verified: boolean;
  verifiedOnly: boolean;
  availableNow: boolean;
  language: string[];
  escortType: "all" | "verified" | "ai" | "provisional";
}

export interface EnhancedEscortFilters {
  location: string;
  serviceType: string[];
  price: [number, number];
  gender: string[];
  orientation: string[];
  age: [number, number];
  rating: number;
  verified: boolean;
  escortType: "all" | "verified" | "ai" | "provisional";
  languages: string[];
  height: [number, number];
  bodyType: string[];
  hairColor: string[];
  eyeColor: string[];
  ethnicity: string[];
  availability: {
    days: string[];
    hours: string[];
  };
  sortBy: string;
  useBoostSorting: boolean;
  availableNow: boolean; // Add missing property
}

export interface ServiceTypeOption {
  value: string;
  label: string;
}

export type ServiceTypeFilter = "" | "in-person" | "virtual" | "both";

export const ESCORT_SERVICE_TYPES: ServiceTypeOption[] = [
  { value: 'in-person', label: 'In Person' },
  { value: 'virtual', label: 'Virtual' },
  { value: 'both', label: 'Both' }
];
