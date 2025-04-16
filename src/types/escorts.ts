
export enum ServiceType {
  Massage = 'massage',
  Roleplay = 'roleplay',
  Overnight = 'overnight',
  BDSM = 'bdsm',
  Companionship = 'companionship',
  Dinner = 'dinner',
  Events = 'events',
  Travel = 'travel',
  // Add other service types as needed
}

// Also allow string literals for more flexible use in data files
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
    photos?: number;
    videos?: number;
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
  gender: string[];
  service: ServiceTypeString[];
  priceRange: [number, number];
  ageRange: [number, number];
  language: string[];
  location: string;
  maxDistance: number;
  availability: string[];
  rating: number;
  verified: boolean;
  // Additional filters used in components
  selectedServices?: ServiceTypeString[];
  selectedGenders?: string[];
  verifiedOnly?: boolean;
  languages?: string[];
}

export interface Video {
  id: string;
  url: string;
  thumbnail?: string;
  title?: string;
  duration?: number;
  isPublic?: boolean;
}

export interface Booking {
  id: string;
  escortId: string;
  clientId: string;
  date: string;
  startTime: string;
  endTime: string;
  duration: number;
  service: ServiceTypeString;
  status: BookingStatus;
  location?: string;
  price: number;
  deposit?: number;
  notes?: string;
  createdAt: string;
  updatedAt?: string;
}

export type BookingStatus = 'pending' | 'confirmed' | 'canceled' | 'completed' | 'rejected';

// Add verification types for compatibility
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
