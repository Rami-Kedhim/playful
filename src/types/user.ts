
export interface UserProfile {
  id: string;
  name: string;
  avatar_url?: string;
  avatarUrl?: string;
  profileImageUrl?: string;
  email?: string;
  phone?: string;
  phone_number?: string;
  location?: string;
  bio?: string;
  is_escort?: boolean;
  is_verified?: boolean;
  isVerified?: boolean;
  verified?: boolean;
  created_at?: string;
  updated_at?: string;
  username?: string;
  ubx_balance?: number;
  ubxBalance?: number;
  role?: string;
  roles?: string[];
  website?: string;
  verification_level?: string;
  verification_status?: string;
  verification_submitted?: boolean;
  rates?: Record<string, any>;
  availability?: Record<string, any>;
  services?: string[];
  languages?: string[];
  user_metadata?: Record<string, any>;
}

export interface User {
  id: string;
  email?: string;
  name?: string;
  role?: string;
  roles?: string[];
  isVerified?: boolean;
  user_metadata?: Record<string, any>;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export type UserRole = 'admin' | 'moderator' | 'creator' | 'escort' | 'client' | 'user';

export type DatabaseGender = 'male' | 'female' | 'other' | 'trans' | 'non-binary';
