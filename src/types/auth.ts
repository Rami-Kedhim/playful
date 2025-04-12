
// Auth types for the application

// Type for user roles in the application
export type UserRole = 'client' | 'escort' | 'user' | 'moderator' | 'admin' | 'creator' | string;

// Type for gender in the database
export type DatabaseGender = 'male' | 'female' | 'other' | 'trans' | 'non-binary';

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
  // User profile data for onboarding
  displayName?: string;
  bio?: string;
  location?: string;
  preferences?: any;
  profileComplete?: boolean;
  profileCompleteness?: number;
  isCreator?: boolean;
  isCouple?: boolean;
  isLGBTQ?: boolean;
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
  sexual_orientation?: string;
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
  ubx_balance?: number; // Added UBX balance field
  ubxBalance?: number; // Alias for ubx_balance
  profile_completeness?: number;
  profileCompleteness?: number; // Alias for profile_completeness
  is_boosted?: boolean;
  isBoosted?: boolean; // Alias for is_boosted
  
  // Adding missing fields from the errors
  role?: UserRole; // Adding role field
  role_name?: string; // Adding role_name as an alternative field name
  is_creator?: boolean; // Adding is_creator field
  is_content_creator?: boolean; // Adding is_content_creator as an alternative field name
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
  resetPassword: (email: string) => Promise<boolean>; 
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
