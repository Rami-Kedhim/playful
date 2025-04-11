
// Auth types for the application

// Type for user roles in the application
export type UserRole = 'user' | 'moderator' | 'admin' | 'escort' | 'creator' | string;

// Type for gender in the database
export type DatabaseGender = 'male' | 'female' | 'other';

// Type for the authentication result
export interface AuthResult {
  success: boolean;
  error?: string | null;
  user?: AuthUser | null; // Optional user field
}

// Type for the authentication user
export interface AuthUser {
  id: string;
  email: string;
  username?: string;
  profileImageUrl?: string;
  lucoinsBalance?: number;
  isVerified?: boolean;
  role?: UserRole;
  avatarUrl?: string;
  // Supabase User properties
  app_metadata: Record<string, any>;
  user_metadata: Record<string, any>;
  aud: string;
  created_at?: string;
}

// User profile data structure
export interface UserProfile {
  id: string;
  user_id?: string;
  username?: string;
  first_name?: string;
  last_name?: string;
  full_name?: string;
  bio?: string;
  avatarUrl?: string;
  avatar_url?: string;  // Adding this to support both naming conventions
  gender?: DatabaseGender;
  dateOfBirth?: string;
  location?: string;
  isVerified?: boolean;
  is_verified?: boolean; // Adding this to support both naming conventions
  membership?: {
    status: 'active' | 'inactive' | 'pending';
    expiresAt?: string;
    type?: string;
  };
  createdAt?: string;
  updatedAt?: string;
  created_at?: string;
  updated_at?: string;
  
  // Adding fields to fix type errors
  lucoin_balance?: number;
  lucoinsBalance?: number; // Alias for lucoin_balance
  profile_completeness?: number;
  profileCompleteness?: number; // Alias for profile_completeness
  is_boosted?: boolean;
  isBoosted?: boolean; // Alias for is_boosted
}

// Auth state maintained by auth context
export interface AuthState {
  user: AuthUser | null;
  profile: UserProfile | null;
  isLoading: boolean;
  userRoles: string[];
}

// Auth context value interface
export interface AuthContextValue extends AuthState {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<AuthResult>;
  register: (email: string, password: string, username?: string) => Promise<AuthResult>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<boolean>; // Add this line
  updatePassword: (oldPassword: string, newPassword: string) => Promise<boolean>;
  updateUserProfile: (userData: Partial<AuthUser>) => Promise<boolean>;
  error: string | null;
  clearError: () => void;
  refreshProfile: () => Promise<void>;
  
  // Role helpers
  checkRole: (role: string) => boolean;
  hasRole: (role: string | string[]) => boolean;
  hasAllRoles: (roles: string[]) => boolean;
  isAdmin: () => boolean;
  isModerator: () => boolean;
  isCreator: () => boolean;
  isEscort: () => boolean;
  canAccessAdminFeatures: () => boolean;
  roles: string[];
}
