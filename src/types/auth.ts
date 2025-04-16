
export enum DatabaseGender {
  MALE = 'male',
  FEMALE = 'female',
  NON_BINARY = 'non_binary',
  OTHER = 'other',
  PREFER_NOT_TO_SAY = 'prefer_not_to_say'
}

export type UserRole = 'user' | 'client' | 'escort' | 'creator' | 'admin' | 'moderator';

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
  // Additional profile properties
  lucoin_balance?: number;
  lucoinsBalance?: number; // Alias for compatibility
  ubx_balance?: number;
  profile_completeness?: number;
  profileCompleteness?: number; // Alias for compatibility
}

export type VerificationStatus = 'pending' | 'in_review' | 'approved' | 'rejected' | 'expired';
export type VerificationLevel = 'none' | 'basic' | 'enhanced' | 'premium';

export interface VerificationDocument {
  id: string;
  type: string;
  document_type?: string; // Alias for compatibility
  fileUrl: string;
  document_url?: string; // Alias for compatibility
  uploadedAt: string;
  created_at?: string; // Alias for compatibility
  status: 'pending' | 'approved' | 'rejected';
  verification_id?: string;
}

export interface VerificationRequest {
  id: string;
  userId?: string;
  profile_id?: string; // Some components use profile_id instead of userId
  status: VerificationStatus;
  verificationLevel?: VerificationLevel;
  requested_level?: VerificationLevel; // Some components use requested_level instead of verificationLevel
  documents: VerificationDocument[];
  submittedAt?: string;
  created_at?: string; // Some components use created_at instead of submittedAt
  updatedAt?: string;
  reviewed_at?: string;
  rejectionReason?: string;
  reviewer_notes?: string;
  expires_at?: string;
}

export interface AuthUser {
  id: string;
  email?: string;
  username?: string;
  name?: string;
  avatar_url?: string;
  avatarUrl?: string; // Alias for compatibility
  profileImageUrl?: string; // Additional alias used in many places
  isVerified?: boolean;
  isCreator?: boolean;  
  // Add properties referenced in various components
  role?: string;
  user_metadata?: Record<string, any>;
  app_metadata?: Record<string, any>;
  created_at?: string;
  lucoinsBalance?: number;
  lucoin_balance?: number;
  aud?: string;
}

export interface AuthResult {
  success: boolean;
  error?: string | null;
}

// Define ServiceTypeFilter referenced in several components
export type ServiceTypeFilter = "in-person" | "virtual" | "both" | "";

export interface ContentStats {
  photos?: number;
  videos?: number;
  streams?: string | number;
  live?: boolean | string | number; // Allow various types for compatibility
}

// Extend escort content types for use in profile/escort data
export interface EscortContent {
  subscriptionPrice?: number;
  contentStats?: ContentStats;
  gallery_images?: string[];
  description?: string;
  verificationLevel?: VerificationLevel;
}

