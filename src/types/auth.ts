
// Add this to your existing auth.ts file or create it if it doesn't exist

export enum DatabaseGender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
  NON_BINARY = 'non_binary',
  TRANS = 'trans'
}

export interface AuthResult {
  success: boolean;
  user?: AuthUser | null;
  session?: any | null; 
  error?: any;
}

export type UserRole = 'admin' | 'moderator' | 'user' | 'escort' | 'creator' | string;

export interface AuthUser {
  id: string;
  email: string;
  username?: string;
  roles?: UserRole[];
  aud?: string;
  avatarUrl?: string;
  profileImageUrl?: string;
  user_metadata?: any;
  app_metadata?: any; // Adding app_metadata property
  created_at?: string;
  lucoinsBalance?: number;
  lucoin_balance?: number; // Adding for compatibility
  isCreator?: boolean; // Adding isCreator flag
  // Add other user properties as needed
}

export interface UserProfile {
  id: string;
  username?: string;
  full_name?: string;
  avatar_url?: string; 
  email: string;
  bio?: string;
  location?: string;
  gender: DatabaseGender;
  sexual_orientation?: string;
  profile_completeness?: number;
  is_boosted?: boolean;
  created_at: string;
  is_verified?: boolean;
  ubx_balance?: number;
  lucoin_balance?: number;
  role?: string; // Adding role for backwards compatibility
}

// Add ServiceTypeFilter definition
export type ServiceTypeFilter = 'in-person' | 'virtual' | 'both' | '';

// Re-export verification types from verification.ts to maintain compatibility
export { VerificationDocument, VerificationRequest, VerificationStatus } from '../types/verification';
