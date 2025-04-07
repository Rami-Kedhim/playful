
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
  lucoinsBalance?: number;
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
  
  // Additional fields needed by components
  lucoin_balance?: number;
  profile_completeness?: number;
  is_verified?: boolean;
  is_boosted?: boolean;
}

export interface AuthResult {
  success: boolean;
  error?: string | null;
}

export interface AuthContextType {
  user: AuthUser | null;
  profile: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<AuthResult>;
  register: (email: string, password: string, username?: string) => Promise<AuthResult>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<boolean>;
  updatePassword: (oldPassword: string, newPassword: string) => Promise<boolean>;
  updateUserProfile: (userData: Partial<AuthUser>) => Promise<boolean>;
  error: string | null;
  clearError: () => void;
  userRoles: string[];
  refreshProfile: () => Promise<void>;
  checkRole: (role: string) => boolean;
}
