
export type VerificationStatus = 'pending' | 'in_review' | 'approved' | 'rejected';
export type VerificationLevel = 'none' | 'basic' | 'enhanced' | 'premium';

export interface VerificationDocument {
  id: string;
  type: string;
  fileUrl: string;
  uploadedAt: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface VerificationRequest {
  id: string;
  userId: string;
  status: VerificationStatus;
  verificationLevel: VerificationLevel;
  documents: VerificationDocument[];
  submittedAt: string;
  updatedAt?: string;
  rejectionReason?: string;
}

export interface Escort {
  id: string;
  name: string;
  age?: number;
  gender: string;
  location?: string;
  rating?: number;
  reviewCount?: number;
  price: number;
  tags?: string[];
  imageUrl?: string;
  profileImage?: string;  // For compatibility with different naming conventions
  images?: string[];      // For compatibility with array-based image storage
  isVerified?: boolean;
  verified?: boolean;     // For compatibility with different naming conventions
  availableNow?: boolean;
  responseRate?: number;
  description?: string;
  services?: string[];
  languages?: string[];
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  avatar_url: string;
  phone_number: string;
  location: string;
  bio: string;
  is_escort: boolean;
  created_at: string;
  updated_at: string;
}
