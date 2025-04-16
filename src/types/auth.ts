export enum DatabaseGender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER'
}

export enum UserRole {
  USER = 'user',
  ESCORT = 'escort',
  ADMIN = 'admin',
  MODERATOR = 'moderator',
  CLIENT = 'client'
}

export interface AuthUser {
  id: string;
  email?: string;
  phone?: string;
  username?: string;
  full_name?: string;
  avatar_url?: string;
  avatarUrl?: string;
  profileImageUrl?: string;
  bio?: string;
  role?: UserRole;
  created_at?: string;
  user_metadata?: Record<string, any>;
  app_metadata?: Record<string, any>;
  aud?: string;
  ubx_balance?: number;
  lucoinsBalance?: number;
  isCreator?: boolean;
}

export interface UserProfile {
  id: string;
  username?: string;
  full_name?: string;
  avatar_url?: string;
  email?: string;
  bio?: string;
  location?: string;
  commute_route?: string;
  interests?: string[];
  gender?: DatabaseGender;
  sexual_orientation?: string;
  ubx_balance?: number;
  lucoin_balance?: number;
  lucoinsBalance?: number;
  profile_completeness?: number;
  profileCompleteness?: number;
  is_boosted?: boolean;
  isBoosted?: boolean;
  created_at?: string;
  is_verified?: boolean;
  role?: UserRole;
}

export interface AuthResult {
  user: AuthUser;
  session: any;
  error?: string;
  success?: boolean;
}

// Import verification types from the verification.ts file
import { 
  VerificationDocument as VerificationDocumentType,
  VerificationRequest as VerificationRequestType,
  VerificationStatus as VerificationStatusType,
  VerificationLevel as VerificationLevelType
} from './verification';

export type VerificationDocument = VerificationDocumentType;
export type VerificationRequest = VerificationRequestType;
export type VerificationStatus = VerificationStatusType;
export type VerificationLevel = VerificationLevelType;

// Export ServiceTypeFilter for components
export type { ServiceTypeFilter } from './escort';
