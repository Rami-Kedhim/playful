
// Escort filter options
export const ESCORT_BODY_TYPE_OPTIONS = [
  { value: 'slim', label: 'Slim' },
  { value: 'athletic', label: 'Athletic' },
  { value: 'average', label: 'Average' },
  { value: 'curvy', label: 'Curvy' },
  { value: 'full', label: 'Full-Figured' },
  { value: 'muscular', label: 'Muscular' },
];

export const ESCORT_ETHNICITY_OPTIONS = [
  { value: 'asian', label: 'Asian' },
  { value: 'black', label: 'Black' },
  { value: 'caucasian', label: 'Caucasian' },
  { value: 'hispanic', label: 'Hispanic' },
  { value: 'indian', label: 'Indian' },
  { value: 'middle_eastern', label: 'Middle Eastern' },
  { value: 'mixed', label: 'Mixed' },
  { value: 'other', label: 'Other' },
];

export const ESCORT_EYE_COLOR_OPTIONS = [
  { value: 'blue', label: 'Blue' },
  { value: 'brown', label: 'Brown' },
  { value: 'green', label: 'Green' },
  { value: 'hazel', label: 'Hazel' },
  { value: 'grey', label: 'Grey' },
  { value: 'other', label: 'Other' },
];

export const ESCORT_HAIR_COLOR_OPTIONS = [
  { value: 'black', label: 'Black' },
  { value: 'blonde', label: 'Blonde' },
  { value: 'brown', label: 'Brown' },
  { value: 'red', label: 'Red' },
  { value: 'grey', label: 'Grey' },
  { value: 'white', label: 'White' },
  { value: 'blue', label: 'Blue' },
  { value: 'pink', label: 'Pink' },
  { value: 'purple', label: 'Purple' },
  { value: 'multi', label: 'Multi-Colored' },
  { value: 'other', label: 'Other' },
];

export const ESCORT_LANGUAGE_OPTIONS = [
  { value: 'english', label: 'English' },
  { value: 'spanish', label: 'Spanish' },
  { value: 'french', label: 'French' },
  { value: 'german', label: 'German' },
  { value: 'italian', label: 'Italian' },
  { value: 'portuguese', label: 'Portuguese' },
  { value: 'russian', label: 'Russian' },
  { value: 'mandarin', label: 'Mandarin' },
  { value: 'japanese', label: 'Japanese' },
  { value: 'korean', label: 'Korean' },
  { value: 'arabic', label: 'Arabic' },
  { value: 'hindi', label: 'Hindi' },
  { value: 'other', label: 'Other' },
];

// Enhanced escort filters interface
export interface EnhancedEscortFilters {
  serviceType: string[];
  gender: string[];
  age: [number, number];
  height: [number, number];
  price: [number, number];
  location: string[];
  availability: string[];
  bodyType: string[];
  ethnicity: string[];
  hairColor: string[];
  eyeColor: string[];
  languages: string[];
  orientation: string[];
  rating: number;
  verified: boolean;
}

// Default filter values
export const DEFAULT_ENHANCED_FILTERS: EnhancedEscortFilters = {
  serviceType: [],
  gender: [],
  age: [18, 60],
  height: [150, 200],
  price: [0, 1000],
  location: [],
  availability: [],
  bodyType: [],
  ethnicity: [],
  hairColor: [],
  eyeColor: [],
  languages: [],
  orientation: [],
  rating: 0,
  verified: false
};

export interface EscortFilterOptions {
  serviceTypes?: string[];
  genders?: string[];
  minAge?: number;
  maxAge?: number;
  minHeight?: number;
  maxHeight?: number;
  minPrice?: number;
  maxPrice?: number;
  locations?: string[];
  availability?: string[];
  bodyTypes?: string[];
  ethnicities?: string[];
  hairColors?: string[];
  eyeColors?: string[];
  languages?: string[];
  orientations?: string[];
  minRating?: number;
  verified?: boolean;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
}

// Booking status enum
export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  REJECTED = 'rejected'
}

export interface Escort {
  id: string;
  name: string;
  age: number;
  gender: string;
  location: string;
  city?: string;
  country?: string;
  images: string[];
  profileImage: string;
  rate: number;
  currency: string;
  rating: number;
  reviewCount: number;
  verified: boolean;
  serviceType: string;
  about?: string;
  availableNow?: boolean;
  availability?: Availability | Availability[];
  services?: string[];
  description?: string;
  ethnicity?: string;
  bodyType?: string;
  height?: number;
  weight?: number;
  hairColor?: string;
  eyeColor?: string;
  orientation?: string;
  languages?: string[];
  tags?: string[];
  isFavorited?: boolean;
  verificationLevel?: string;
  verification_level?: string;
  gallery?: {
    images?: string[];
    videos?: string[];
  };
  videos?: string[];
  featured?: boolean;
  boosted?: boolean;
}

export interface Availability {
  day?: string;
  days?: string[];
  startTime?: string;
  endTime?: string;
  available?: boolean;
  customNotes?: string;
  hours?: number[];
}
