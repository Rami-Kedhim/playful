
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
  name?: string;
  roles?: UserRole[];
  aud?: string;
  avatarUrl?: string;
  avatar_url?: string; // Keeping for backward compatibility
  profileImageUrl?: string;
  user_metadata?: any;
  app_metadata?: any;
  created_at?: string;
  lucoinsBalance?: number;
  lucoin_balance?: number; // Adding for compatibility
  isCreator?: boolean;
  // Added properties to fix errors
  phone_number?: string;
  is_escort?: boolean;
}

export interface UserProfile {
  id: string;
  username?: string;
  full_name?: string;
  avatar_url?: string; 
  email: string;
  bio?: string;
  location?: string;
  gender?: DatabaseGender;
  sexual_orientation?: string;
  profile_completeness?: number;
  is_boosted?: boolean;
  created_at?: string;
  is_verified?: boolean;
  ubx_balance?: number;
  lucoin_balance?: number;
  role?: string; // Adding role for backwards compatibility
  roles?: UserRole[]; // Adding roles array
  // Added properties to fix errors
  phone_number?: string;
  is_escort?: boolean;
}

// Add ServiceTypeFilter definition
export type ServiceTypeFilter = 'in-person' | 'virtual' | 'both' | '';

// Re-export verification types from verification.ts to maintain compatibility
export type { VerificationDocument, VerificationRequest, VerificationStatus } from '../types/verification';

export interface AuthContextType {
  user: AuthUser | null;
  profile: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string;
  signUp: (email: string, password: string, metadata?: UserMetadata) => Promise<AuthResult>;
  signIn: (email: string, password: string) => Promise<AuthResult>;
  signOut: () => Promise<void>;
  refreshUser: () => Promise<void>;
  updateUserProfile: (updates: Partial<AuthUser>) => Promise<boolean>;
  refreshProfile: () => Promise<void>;
  userRoles: string[]; // Adding userRoles to the context
  checkRole: (role: string | string[]) => boolean; // Add checkRole function
  updatePassword: (oldPassword: string, newPassword: string) => Promise<boolean>; // Add updatePassword function
  logout: () => Promise<AuthResult>; // Add logout function
}

export interface UserMetadata {
  full_name?: string;
  avatar_url?: string;
  username?: string;
}
