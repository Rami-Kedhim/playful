
import { ServiceTypeFilter } from '@/components/escorts/filters/ServiceTypeBadgeLabel';

export interface EnhancedEscortFilters {
  location: string;
  serviceType: string[];
  price: [number, number];
  gender: string[];
  orientation: string[];
  age: [number, number];
  rating: number;
  verified: boolean;
  availableNow: boolean;
  escortType: "all" | "verified" | "ai" | "premium";
  languages?: string[];
  height?: [number, number];
  bodyType?: string[];
  hairColor?: string[];
  eyeColor?: string[];
  ethnicity?: string[];
  availability: {
    days: string[];
    hours: string[];
  };
  sortBy: "newest" | "rating" | "price" | "popularity";
  useBoostSorting: boolean;
  selectedFilters: string[];
  localOnly: boolean;
  useNeuralSuggestions: boolean;
  serviceTypes?: string[];
}

export interface EscortFilterOptions {
  location?: string;
  serviceType?: string[];
  serviceTypes?: string[];
  priceRange?: [number, number];
  price?: [number, number];
  ageRange?: [number, number];
  age?: [number, number];
  gender?: string[];
  orientation?: string[];
  verified?: boolean;
  availableNow?: boolean;
  escortType?: string;
  maxDistance?: number;
  rating?: number;
  language?: string[];
  sortBy?: string;
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
