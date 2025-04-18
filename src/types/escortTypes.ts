
import { ServiceType } from './escort';

// Allow string literals for more flexible use in data files
export type ServiceTypeString = ServiceType | string;

export interface Escort {
  id: string;
  name: string;
  age: number;
  location: string;
  gender: string;
  services: ServiceTypeString[];
  rate: {
    hourly?: number;
    twoHours?: number;
    overnight?: number;
    weekend?: number;
  };
  rating: number;
  reviewCount: number;
  avatar: string;
  phone?: string;
  email?: string;
  verified: boolean;
  languages?: string[];
  gallery?: string[];
  availability?: Availability[];
  about?: string;
  bio?: string;
  // Adding fields needed by components
  description?: string;
  subscriptionPrice?: number;
  contentStats?: {
    photos?: number | string;
    videos?: number | string;
    streams?: string | number;
    live?: boolean | string | number;
  };
  gallery_images?: string[];
  verificationLevel?: string;
  orientation?: string;
  avatar_url?: string;
  // Fields for service type compatibility
  providesInPersonServices?: boolean;
  providesVirtualContent?: boolean;
  // Fields for profiles
  tags?: string[];
  price?: number;
  featured?: boolean;
  serviceTypes?: string[];
  profileType?: string;
  profileImage?: string;
  imageUrl?: string;
  availableNow?: boolean;
  lastActive?: string | Date;
  responseRate?: number;
  reviews?: number;
  sexualOrientation?: string;
}

export interface Availability {
  day: string;
  slots: {
    start: string;
    end: string;
  }[];
}

export interface EscortFilterOptions {
  gender?: string[];
  service?: ServiceTypeString[];
  serviceType?: string[];
  serviceTypes?: string[];
  priceRange?: [number, number];
  ageRange?: [number, number];
  language?: string[];
  location?: string;
  maxDistance?: number;
  availability?: string[];
  rating?: number;
  verified?: boolean;
  availableNow?: boolean;
  verifiedOnly?: boolean;
  orientation?: string[];
  escortType?: 'all' | 'verified' | 'ai' | 'provisional';
  // Additional filters used in components
  selectedServices?: ServiceTypeString[];
  selectedGenders?: string[];
  languages?: string[];
}

export interface EnhancedEscortFilters extends EscortFilterOptions {
  escortType: 'all' | 'verified' | 'ai' | 'provisional';
  price: [number, number];
  age: [number, number];
  gender: string[] | undefined;
  orientation: string[] | undefined;
  selectedFilters: string[];
  localOnly: boolean;
  sortBy: string;
  useNeuralSuggestions: boolean;
  useBoostSorting: boolean;
  availableNow: boolean;
}

export type BookingStatus = 'pending' | 'confirmed' | 'canceled' | 'completed' | 'rejected';
export type VerificationStatus = 'pending' | 'in_review' | 'approved' | 'rejected' | 'expired';
export type VerificationLevel = 'none' | 'basic' | 'enhanced' | 'premium';

export interface VerificationDocument {
  id: string;
  verification_id: string;
  document_type: string;
  document_url: string;
  status: VerificationStatus;
  notes?: string;
  created_at: string;
  updated_at?: string;
  
  // Adding these for backwards compatibility
  type?: string;
  fileUrl?: string;
  uploadedAt?: string;
}

export interface VerificationRequest {
  id: string;
  profile_id: string;
  status: VerificationStatus;
  requested_level: VerificationLevel;
  documents: VerificationDocument[];
  created_at: string;
  updated_at?: string;
  reviewed_at?: string;
  reviewed_by?: string;
  reviewer_notes?: string;
  expires_at?: string;
  
  // Adding these for backwards compatibility
  submittedAt?: string;
  updatedAt?: string;
  verificationLevel?: VerificationLevel;
  rejectionReason?: string;
  userId?: string;
}

// Add gender options constant
export const ESCORT_GENDER_OPTIONS = [
  { value: 'female', label: 'Female' },
  { value: 'male', label: 'Male' },
  { value: 'transgender', label: 'Transgender' },
  { value: 'non-binary', label: 'Non-Binary' },
  { value: 'other', label: 'Other' }
];
