
export interface UserProfile {
  id: string;
  name: string;
  avatar_url?: string;
  avatarUrl?: string;      // Alternative naming
  profileImageUrl?: string; // Alternative naming
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

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthContextType {
  user: UserProfile | null;
  profile?: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  loading?: boolean;
  error?: string | null;
  initialized?: boolean;
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => Promise<void>;
  signUp: (email: string, password: string, userData?: any) => Promise<boolean>;
  resetPassword: (email: string) => Promise<boolean>;
  updateProfile: (data: Partial<UserProfile>) => Promise<boolean>;
  setUser?: (user: UserProfile | null) => void;
  // Add these additional methods to match component expectations
  login: (email: string, password: string) => Promise<{ success: boolean; user?: any; error?: string; }>;
  logout: () => Promise<boolean>;
  register: (email: string, password: string, confirmPassword?: string) => Promise<{ success: boolean; user?: any; error?: string; }>;
  sendPasswordResetEmail: (email: string) => Promise<boolean>;
  checkRole: (role: string) => boolean;
  refreshProfile?: () => Promise<void>;
  updateUserProfile?: (data: Partial<UserProfile>) => Promise<boolean>;
  updateUser?: (userData: Partial<User>) => Promise<boolean>;
  loadUserProfile?: () => Promise<UserProfile | null>;
  updatePassword?: (oldPassword: string, newPassword: string) => Promise<boolean>;
  deleteAccount?: () => Promise<boolean>;
  requestPasswordReset?: (email: string) => Promise<boolean>;
  verifyEmail?: (token: string) => Promise<boolean>;
}

export interface User {
  id: string;
  email?: string;
  name?: string;
  username?: string;
  avatarUrl?: string;
  avatar_url?: string;
  role?: string;
  roles?: string[];
  profileImageUrl?: string;
  user_metadata?: Record<string, any>;
  bio?: string;
  website?: string;
  isVerified?: boolean;
  created_at?: string;
}

export enum UserRole {
  ADMIN = "admin",
  MODERATOR = "moderator",
  USER = "user",
  ESCORT = "escort",
  CLIENT = "client",
  CREATOR = "creator"
}
