
// Auth types for the application

// Type for user roles in the application
export type UserRole = 'user' | 'moderator' | 'admin' | 'escort' | 'creator';

// Type for gender in the database
export type DatabaseGender = 'male' | 'female' | 'other';

// Type for the authentication user
export interface AuthUser {
  id: string;
  email: string;
  username?: string;
  profileImageUrl?: string;
  lucoinsBalance?: number;
  isVerified?: boolean;
  role?: UserRole;
  // Supabase User properties
  app_metadata: Record<string, any>;
  user_metadata: Record<string, any>;
  aud: string;
  created_at?: string;
}

// User profile data structure
export interface UserProfile {
  id: string;
  userId: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  bio?: string;
  avatarUrl?: string;
  gender?: DatabaseGender;
  dateOfBirth?: string;
  location?: string;
  isVerified?: boolean;
  membership?: {
    status: 'active' | 'inactive' | 'pending';
    expiresAt?: string;
    type?: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

// Auth state maintained by auth context
export interface AuthState {
  user: AuthUser | null;
  profile: any | null;
  isLoading: boolean;
  userRoles: string[];
}

// Auth context value interface
export interface AuthContextValue extends AuthState {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, username?: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (oldPassword: string, newPassword: string) => Promise<void>;
  updateUserProfile: (userData: Partial<AuthUser>) => Promise<void>;
  error: string | null;
  clearError: () => void;
  refreshProfile: () => Promise<void>;
  checkRole: (role: string) => boolean;
}
