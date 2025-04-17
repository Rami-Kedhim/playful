
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
  contactInfo?: ContactInfo; // Adding this to fix the error in useEscortProfile.ts
  serviceLocations?: string[]; // Adding this to support escortService.ts
  verified?: boolean; // Alias for is_verified
  providesInPersonServices?: boolean;
  providesVirtualContent?: boolean;
  price?: number;
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
