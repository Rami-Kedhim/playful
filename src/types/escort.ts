
import { UserRole } from './auth';

export type EscortCategory = 'elite' | 'premium' | 'verified' | 'featured' | 'new';
export type ServiceType = 'massage' | 'escort' | 'companionship' | 'fetish' | 'bdsm' | 'virtual' | 'in-person' | 'both';
export type ServiceLocation = 'incall' | 'outcall' | 'both' | 'virtual';
export type Availability = {
  days: string[];
  hours: string[];
  customNotes?: string;
  timeZone?: string; // Add missing property
};
export type ServiceTypeFilter = 'in-person' | 'virtual' | 'both' | '';

// Booking related types
export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  DECLINED = 'declined',
  CANCELED = 'canceled',
  COMPLETED = 'completed',
  REJECTED = 'rejected'
}

export interface Booking {
  id: string;
  escortId: string;
  userId: string;
  clientId?: string; // Added for backward compatibility
  startTime: Date | string;  // Modified to accept both Date and string
  endTime: Date | string;    // Modified to accept both Date and string
  serviceType?: string;
  service?: string; // For backward compatibility
  location: string;
  status: BookingStatus;
  totalPrice: number;
  price?: number; // For backward compatibility
  createdAt: Date | string;  // Modified to accept both Date and string
  notes?: string;
  isPaid?: boolean;
  paymentId?: string;
}

export interface Escort {
  id: string;
  name: string;
  username: string;
  profileSource?: 'scraped' | 'manual' | 'ai_enhanced' | 'ai_generated';
  verified?: boolean;
  featured?: boolean;
  boosted?: boolean;
  elite?: boolean;
  age?: number;
  gender?: string;
  location?: string;
  about?: string;
  description?: string;
  bio?: string;
  avatar?: string;
  profileImage?: string;
  imageUrl?: string;
  images?: string[];
  videos?: string[] | { id: string; url: string; thumbnail: string; title: string; duration?: number; isPublic?: boolean; }[];
  isAI?: boolean;
  gallery?: {
    imageUrls?: string[];
    videoUrls?: string[];
  };
  gallery_images?: string[]; // For backward compatibility
  categories?: EscortCategory[];
  serviceTypes?: ServiceType[];
  serviceLocations?: ServiceLocation[];
  availability?: Availability | Availability[];
  rating?: number;
  reviews?: number;
  reviewCount?: number;
  contactInfo?: {
    phone?: string;
    email?: string;
    website?: string;
  };
  price?: number;
  pricePerHour?: number;
  rates?: {
    hourly?: number;
    twoHours?: number;
    overnight?: number;
    weekend?: number;
  };
  socialMedia?: {
    instagram?: string;
    twitter?: string;
    onlyfans?: string;
  };
  bodyStats?: {
    height?: string;
    weight?: string;
    measurements?: string;
    bodyType?: string;
    hairColor?: string;
    eyeColor?: string;
  };
  preferences?: {
    languages?: string[];
    nationality?: string;
    ethnicity?: string;
    orientation?: string;
  };
  roles?: UserRole[];
  
  // Additional properties needed by components
  tags?: string[];
  sexualOrientation?: string;
  orientation?: string; // Alias for sexualOrientation
  availableNow?: boolean;
  lastActive?: Date;
  responseRate?: number;
  providesInPersonServices?: boolean;
  providesVirtualContent?: boolean;
  languages?: string[];
  height?: number | string;
  weight?: number | string;
  measurements?: string | { bust?: number | string; waist?: number | string; hips?: number | string; };
  hairColor?: string;
  eyeColor?: string;
  ethnicity?: string;
  services?: string[];
  verificationLevel?: VerificationLevel;
  contentStats?: {
    photos?: number;
    videos?: number;
    streams?: number;
    live?: boolean;
  };
  profileType?: 'verified' | 'ai' | 'provisional';
  boostLevel?: number;
  subscriptionPrice?: number;
}

// Verification related types
export type VerificationStatus = 'pending' | 'in_review' | 'approved' | 'rejected' | 'expired';
export type VerificationLevel = 'none' | 'basic' | 'enhanced' | 'premium';

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
  
  // For backward compatibility
  submittedAt?: string;
  updatedAt?: string;
  verificationLevel?: VerificationLevel;
  rejectionReason?: string;
  userId?: string;
}

export interface VerificationDocument {
  id: string;
  type: string;
  fileUrl: string;
  uploadedAt: string;
  verification_id?: string;
  document_type?: string;
  document_url?: string;
  status?: VerificationStatus;
  notes?: string;
  created_at?: string;
  updated_at?: string;
}

// For media management
export interface Video {
  id: string;
  url: string;
  thumbnail?: string;
  title?: string;
  duration?: number;
  isPublic?: boolean;
}

// Filter options
export interface EscortFilterOptions {
  gender?: string[];
  service?: string[];
  priceRange?: [number, number];
  ageRange?: [number, number];
  language?: string[];
  location?: string;
  maxDistance?: number;
  availability?: string[];
  rating?: number;
  verified?: boolean;
  // Additional filters
  selectedServices?: string[];
  selectedGenders?: string[];
  verifiedOnly?: boolean;
  languages?: string[];
}
