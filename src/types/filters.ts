
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
