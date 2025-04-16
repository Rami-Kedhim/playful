
// Add any missing type definitions to support all service types
export enum ServiceType {
  Massage = "Massage",
  Companionship = "Companionship",
  GFE = "GFE",
  Roleplay = "Role Play",
  DinnerDate = "Dinner Date",
  TravelCompanion = "Travel Companion",
  Events = "Events",
  Overnight = "Overnight",
  WeekendGetaways = "Weekend Getaways",
  BDSM = "BDSM",
  SensualMassage = "Sensual Massage",
  VirtualDate = "virtual-date",
  CustomContent = "custom-content",
  
  // Add string literals that are used in the codebase
  dinner = "dinner",
  travel = "travel",
  events = "events",
  companionship = "companionship",
  massage = "massage",
  roleplay = "roleplay",
  bdsm = "bdsm",
  overnight = "overnight"
}

export interface Escort {
  id: string;
  name: string;
  age: number;
  location: string;
  price: number;
  gender?: string;
  sexualOrientation?: string;
  imageUrl: string;
  profileImage?: string;
  gallery?: string[];
  gallery_images?: string[]; // Added for compatibility
  videos?: Video[];
  bio?: string;
  description?: string; // Added for compatibility
  services?: ServiceType[];
  rating?: number;
  reviews?: number;
  verified?: boolean;
  tags?: string[];
  availableNow?: boolean;
  languages?: string[];
  lastActive?: string | Date;
  responseRate?: number;
  height?: number;
  weight?: number;
  measurements?: Measurements | string;
  hairColor?: string;
  eyeColor?: string;
  ethnicity?: string;
  rates?: Rates;
  featured?: boolean;
  isAI?: boolean;
  profileType?: "verified" | "ai" | "provisional";
  contactInfo?: ContactInfo;
  availability?: Availability;
  serviceTypes?: string[];
  reviewCount?: number;
  providesInPersonServices?: boolean;
  providesVirtualContent?: boolean;
  metaverse_enabled?: boolean;
  boostLevel?: number;
  verificationLevel?: string; // Added for compatibility
}

export interface Video {
  id: string;
  url: string;
  thumbnail: string;
  title: string;
}

export interface Measurements {
  bust: number;
  waist: number;
  hips: number;
}

export interface Rates {
  hourly: number;
  twoHours: number;
  overnight: number;
  weekend: number;
}

export interface ContactInfo {
  email: string;
  phone: string;
  website: string;
}

export interface Availability {
  days: string[];
  hours: string[];
}

export interface EscortFilterOptions {
  location?: string;
  serviceTypes?: string[];
  priceRange?: [number, number];
  gender?: string[];
  orientation?: string[];
  ageRange?: [number, number];
  rating?: number;
  verified?: boolean;
  availableNow?: boolean;
  escortType?: "verified" | "ai" | "provisional" | "all";
  language?: string[];
  
  // Add these fields to fix EscortFilterControls errors
  selectedServices?: string[];
  selectedGenders?: string[];
  verifiedOnly?: boolean;
  languages?: string[];
}

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
  setVerifiedOnly: (verified: boolean) => void;
  setSelectedServices: (services: string[]) => void;
  toggleService: (service: string) => void;
  setSortBy: (sortBy: string) => void;
  setCurrentPage: (page: number) => void;
  setSelectedGenders: (genders: string[]) => void;
  toggleGender: (gender: string) => void;
  setSelectedOrientations: (orientations: string[]) => void;
  toggleOrientation: (orientation: string) => void;
  setAgeRange: (ageRange: [number, number]) => void;
  setRatingMin: (rating: number) => void;
  setAvailableNow: (available: boolean) => void;
  setServiceTypeFilter: (type: "in-person" | "virtual" | "both" | "") => void;
  setIsLoading: (loading: boolean) => void;
  clearFilters: () => void;
}

export interface EscortFilterHook {
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
  setAgeRange: (ageRange: [number, number]) => void;
  handleAgeRangeChange: (values: number[]) => void;
  setRatingMin: (rating: number) => void;
  setAvailableNow: (available: boolean) => void;
  setServiceTypeFilter: (type: "" | "in-person" | "virtual" | "both") => void;
  setIsLoading: (loading: boolean) => void;
  clearFilters: () => void;
  filteredEscorts: Escort[];
  sortedEscorts: Escort[];
  paginatedEscorts: Escort[];
  totalPages: number;
}

export type VerificationLevel = 'none' | 'basic' | 'enhanced' | 'premium';
export type VerificationStatus = 'pending' | 'in_review' | 'approved' | 'rejected';

// Add Booking related types
export type BookingStatus = 'pending' | 'confirmed' | 'rejected' | 'cancelled' | 'completed' | 'in_review';

export interface Booking {
  id: string;
  escort_id: string;
  client_id: string;
  start_time: string;
  end_time: string;
  status: BookingStatus;
  created_at: string;
  updated_at: string;
  service_type?: string;
  location?: string;
  price?: number;
  notes?: string;
  reviewed_by?: string;
  review_notes?: string;
}

// Add verification document interfaces
export interface VerificationDocument {
  id: string;
  verification_id: string;
  document_type: string;
  document_url: string;
  status: VerificationStatus;
  notes?: string;
  created_at: string;
  updated_at?: string;
}

export interface VerificationRequest {
  id: string;
  profile_id: string;
  status: VerificationStatus;
  requested_level: string;
  documents?: VerificationDocument[];
  created_at: string;
  updated_at?: string;
  reviewed_at?: string;
  reviewed_by?: string;
  reviewer_notes?: string;
  expires_at?: string;
  submittedAt?: string;
  updatedAt?: string; // Added for compatibility
  verificationLevel?: string; // Added for compatibility
  rejectionReason?: string; // Added for compatibility
}
