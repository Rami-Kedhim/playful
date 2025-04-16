
export type UserRole = 'admin' | 'escort' | 'client' | 'moderator' | 'creator' | 'user';

export interface AuthUser {
  id: string;
  email?: string;
  username?: string;
  profileImageUrl?: string;
  lucoinsBalance?: number;
  role?: string;
  avatarUrl?: string;
  app_metadata?: any;
  user_metadata?: any;
  aud?: string;
  created_at?: string;
}

export interface UserProfile {
  id: string;
  username?: string;
  full_name?: string;
  avatar_url?: string;
  bio?: string;
  location?: string;
  website?: string;
  is_verified?: boolean;
  services?: string[];
  languages?: string[];
  availability?: any;
  rates?: any;
  created_at?: string;
  updated_at?: string;
  verification_level?: string;
}

export interface AuthResult {
  success: boolean;
  error?: string;
}
