
import { VerificationLevel } from './verification';

export type UserRole = 'admin' | 'user' | 'moderator' | 'creator' | 'escort' | string;

export interface RoleObject {
  name: string;
  [key: string]: any;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  username?: string;
  confirmPassword: string;
}

export interface User {
  id: string;
  email?: string;
  name?: string;
  role?: string;
  roles?: Array<string | RoleObject>;
  isVerified?: boolean;
  created_at: string;
  username?: string;
  profileImageUrl?: string;
  avatarUrl?: string;
  avatar_url?: string;
  ubxBalance?: number;
  website?: string;
  bio?: string;
  aud?: string;
  preferences?: Record<string, any>;
  user_metadata?: {
    verification_status?: string;
    verification_submitted?: boolean;
    verification_level?: VerificationLevel;
    verification_documents?: {
      submittedAt: string;
      documentUrls: string[];
    };
    aiPreferences?: any;
    lastAiInteraction?: string;
    aiConversationCount?: number;
    aiFavoriteTopics?: string[];
    aiEnabled?: boolean;
    aiContextCreated?: string;
    role?: string;
    username?: string;
    avatar_url?: string;
    preferences?: Record<string, any>;
    content_preferences?: Record<string, any>;
    region?: string | Record<string, any>;
    subscription_tier?: string;
  };
}

export interface UserProfile {
  id: string;
  user_id: string;
  username?: string;
  name?: string;
  avatarUrl?: string;
  avatar_url?: string;
  bio?: string;
  location?: string;
  website?: string;
  phone?: string;
  full_name?: string;
  created_at?: string;
  updated_at?: string;
  last_active?: string;
  is_verified?: boolean;
  verification_level?: VerificationLevel;
  sexual_orientation?: string;
  is_boosted?: boolean;
  isBoosted?: boolean;
  ubx_balance?: number;
  ubxBalance?: number;
  subscription_tier?: string;
  preferences?: Record<string, any>;
  region?: string | Record<string, any>;
}
