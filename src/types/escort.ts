
import { VerificationLevel, VerificationStatus } from './verification';

export interface Availability {
  days: string[];
  hours: {
    from: string;
    to: string;
  };
}

export interface EscortProfile {
  id: string;
  userId?: string;
  name: string;
  age: number;
  gender: string;
  location: string;
  bio: string;
  rating: number;
  price: number;
  images: string[];
  profileImage?: string;
  imageUrl?: string;
  isVerified: boolean;
  featured?: boolean;
  isContentCreator?: boolean;
  verificationLevel?: VerificationLevel;
  measurements?: {
    bust: string;
    waist: string;
    hips: string;
  };
  height?: string;
  weight?: string;
  languages?: string[];
  services?: string[];
  availability?: {
    inCall: Availability;
    outCall: Availability;
  };
  phone?: string;
  email?: string;
  website?: string;
  socialMediaLinks?: {
    twitter?: string;
    instagram?: string;
    onlyfans?: string;
  };
  reviews?: EscortReview[];
  isActive?: boolean;
}

export interface EscortReview {
  id: string;
  userId: string;
  escortId: string;
  rating: number;
  comment: string;
  date: string;
  userName?: string;
  userAvatar?: string;
  isVerified?: boolean;
}

export interface VerificationRequest {
  id: string;
  userId?: string;
  user_id?: string;
  profile_id?: string;
  status: VerificationStatus;
  created_at?: string;
  createdAt?: string;
  updated_at?: string;
  updatedAt?: string;
  submittedAt?: string;
  documents: VerificationDocument[];
  level?: VerificationLevel;
  reviewer_id?: string;
  reviewerId?: string;
  reviewer_notes?: string;
  reviewerNotes?: string;
  rejectionReason?: string;
  rejection_reason?: string;
  requested_level?: VerificationLevel;
  requestedLevel?: VerificationLevel;
  verificationLevel?: VerificationLevel;
  reviewedAt?: string;
}
