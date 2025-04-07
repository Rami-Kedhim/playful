
export interface AuthUser {
  id: string;
  email: string;
  username?: string;
  role?: string;
  profileImageUrl?: string;
  app_metadata?: Record<string, any>;
  user_metadata?: Record<string, any>;
  aud?: string;
  created_at?: string;
  lucoinsBalance?: number; // Added this field
}

export type UserRole = 'admin' | 'moderator' | 'escort' | 'creator' | 'user';

export type DatabaseGender = 'male' | 'female' | 'other';

export interface UserProfile {
  id: string;
  username?: string;
  email?: string;
  full_name?: string;
  avatar_url?: string;
  bio?: string;
  gender?: DatabaseGender;
  sexual_orientation?: string;
  location?: string;
  languages?: string[];
  birth_date?: string;
  updated_at?: string;
  created_at?: string;
}

export interface AuthResult {
  success: boolean;
  error?: string | null;
}
