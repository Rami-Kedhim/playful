
export enum DatabaseGender {
  MALE = 'male',
  FEMALE = 'female',
  NON_BINARY = 'non_binary',
  OTHER = 'other',
  PREFER_NOT_TO_SAY = 'prefer_not_to_say'
}

export interface UserProfile {
  id: string;
  email: string;
  username?: string;
  name?: string;
  full_name?: string;
  avatar_url?: string;
  avatarUrl?: string; // Alias for compatibility
  bio?: string;
  location?: string;
  phone_number?: string;
  is_escort?: boolean;
  created_at: string;
  updated_at: string;
  gender?: DatabaseGender | string;
  sexual_orientation?: string;
  role?: string;
  isVerified?: boolean;
  is_verified?: boolean;
  isCreator?: boolean;
  is_creator?: boolean;
  is_boosted?: boolean;
  isBoosted?: boolean;
}

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

export interface AuthUser {
  id: string;
  email?: string;
  username?: string;
  name?: string;
  avatar_url?: string;
  isVerified?: boolean;
  isCreator?: boolean;  
}
