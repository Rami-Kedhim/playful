
import { VerificationLevel, VerificationStatus } from './verification';

export interface Escort {
  id: string;
  user_id: string;
  name: string;
  email: string;
  avatar: string;
  gender: string;
  age: number;
  bio: string;
  location: string;
  phone: string;
  website: string;
  social_media: {
    instagram?: string;
    twitter?: string;
    onlyfans?: string;
    [key: string]: string | undefined;
  };
  hourly_rate: string;
  is_verified: boolean;
  isAI?: boolean;
  verification_level: VerificationLevel;
  created_at: string;
  updated_at: string;
  reviews: Review[];
  services: string[];
  languages: string[];
  height: string;
  weight: string;
  hair_color: string;
  eye_color: string;
  measurements: {
    bust: string;
    waist: string;
    hips: string;
  };
  nationality: string;
  availability: Availability[] | Availability;
  images: string[];
  videos: string[];
  tags: string[];
  orientation: string;
  ethnicity: string;
  body_type: string;
  is_featured: boolean;
  rating: number;
  
  // Additional properties required by components
  contactInfo?: ContactInfo;
  serviceLocations?: string[];
  verified?: boolean;
  providesInPersonServices?: boolean;
  providesVirtualContent?: boolean;
  price?: number;
  
  // Added properties to fix errors
  imageUrl?: string;
  profileImage?: string;
  gallery?: string[] | { imageUrls: string[] };
  reviewCount?: number;
  sexualOrientation?: string;
  availableNow?: boolean;
  lastActive?: string | Date;
  responseRate?: number;
  description?: string;
  featured?: boolean;
  hairColor?: string;
  eyeColor?: string;
  rates?: {
    hourly?: number;
    twoHours?: number;
    overnight?: number;
    weekend?: number;
  };
  isScraped?: boolean;
  profileType?: string;
  serviceTypes?: string[];
  boostLevel?: number;
  verificationLevel?: VerificationLevel;
}

export interface ContactInfo {
  email?: string;
  phone?: string;
  website?: string;
  social?: Record<string, string>;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  verifiedBooking: boolean;
}

export interface Availability {
  day: string;
  available: boolean;
  // Added properties to fix errors
  days?: string[];
  hours?: string[];
  customNotes?: string;
}

export interface VerificationRequest {
  id: string;
  userId: string;
  profile_id?: string;
  user_id?: string;
  status: VerificationStatus;
  level: VerificationLevel;
  verificationLevel?: VerificationLevel;
  requested_level?: VerificationLevel;
  documents: VerificationDocument[];
  submittedAt?: string;
  reviewedAt?: string;
  updated_at?: string;
  created_at?: string;
  reviewed_at?: string;
  reviewer_id?: string;
  reviewer_notes?: string;
  rejectionReason?: string;
  rejection_reason?: string;
}

export interface VerificationDocument {
  id: string;
  verification_id: string;
  document_type?: string;
  type?: string;
  status?: VerificationStatus;
  document_url?: string;
  file_url?: string;
  fileUrl?: string;
  created_at?: string;
  uploadedAt?: string;
  uploaded_at?: string;
}

export interface Video {
  id: string;
  url: string;
  thumbnail?: string;
  title?: string;
  description?: string;
}

// Adding booking-related types
export type BookingStatus = 'pending' | 'confirmed' | 'canceled' | 'completed' | 'rejected' | 'declined';

export interface Booking {
  id: string;
  escortId: string;
  clientId: string;
  date: string;
  startTime: string;
  endTime: string;
  duration: number;
  service: string;
  status: BookingStatus;
  location?: string;
  price: number;
  deposit?: number;
  notes?: string;
  createdAt: string;
  updatedAt?: string;
}
