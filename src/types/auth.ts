
import { User } from './user';
import { Session } from '@supabase/supabase-js';

export enum UserRole {
  ADMIN = "admin",
  MODERATOR = "moderator",
  CLIENT = "client",
  ESCORT = "escort",
  CREATOR = "creator"
}

export interface UserProfile {
  id: string;
  userId: string;
  username?: string;
  fullName?: string;
  name?: string;
  bio?: string;
  avatarUrl?: string;
  avatar_url?: string; // For backward compatibility
  preferences?: Record<string, any>;
  verified?: boolean;
  is_verified?: boolean; // For backward compatibility
  isVerified?: boolean;  // For standardization
  createdAt: string;
  updatedAt?: string;
  gender?: string;
  location?: string;
  sexual_orientation?: string;
  website?: string;
  phone?: string;
  ubxBalance?: number;
  ubx_balance?: number; // For backward compatibility
  isBoosted?: boolean;
  is_boosted?: boolean; // For backward compatibility
  subscription_tier?: string;
  role?: string;
  roles?: string[];
  verification_status?: string;
  verification_level?: string;
  verification_submitted?: boolean;
}

export type VerificationLevel = 'none' | 'basic' | 'full';
export type UserStatus = 'active' | 'suspended' | 'banned' | 'pending';
export type SubscriptionTier = 'free' | 'basic' | 'premium' | 'vip';
export type DatabaseGender = 'male' | 'female' | 'other' | 'trans' | 'non-binary';

export interface AuthUser extends User {}

export interface AuthResult {
  success: boolean;
  user?: AuthUser;
  session?: Session;
  error?: string;
}
