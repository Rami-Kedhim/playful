
import { VerificationLevel } from './verification';

export type UserRole = 'admin' | 'user' | 'moderator';

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
  isVerified?: boolean;
  created_at: string;
  user_metadata?: {
    verification_status?: string;
    verification_submitted?: boolean;
    verification_level?: VerificationLevel;
    verification_documents?: {
      submittedAt: string;
      documentUrls: string[];
    };
  };
}

export interface UserProfile {
  id: string;
  user_id: string;
  username?: string;
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
}
