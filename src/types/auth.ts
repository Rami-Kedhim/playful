
// Auth types
export enum UserRole {
  USER = 'user',
  ESCORT = 'escort',
  CREATOR = 'creator',
  ADMIN = 'admin',
  MODERATOR = 'moderator'
}

export interface User {
  id: string;
  username?: string;
  email: string;
  profileImageUrl?: string;
  avatarUrl?: string;
  lucoinsBalance?: number;
  roles?: UserRole[];
  role?: string; 
  isVerified?: boolean;
  createdAt?: string;
  user_metadata?: Record<string, any>;
  avatar_url?: string;
  app_metadata?: Record<string, any>;
  created_at?: string;
  name?: string;
  phone_number?: string;
  location?: string;
  bio?: string;
  gender?: string;
}

export interface AuthUser extends User {
  // Extended fields from the AuthUser
  full_name?: string;
  phone?: string;
  location?: string;
  bio?: string;
}

export interface AuthResult {
  success: boolean;
  error?: string | null;
  user?: User;
  session?: any; // Add session property
}

export interface UserProfile {
  id: string;
  email?: string;
  username?: string;
  name?: string;
  bio?: string;
  location?: string;
  avatar_url?: string;
  full_name?: string;
  is_verified?: boolean;
  lucoin_balance?: number;
  ubx_balance?: number;
  verificationLevel?: string;
  profileImageUrl?: string;
  gender?: string; // Add gender field
}

export type DatabaseGender = 'male' | 'female' | 'other' | 'trans' | 'non-binary';

export interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string;
  signIn: (email: string, password: string) => Promise<AuthResult>;
  signUp: (email: string, password: string, name?: string) => Promise<AuthResult>;
  signOut: () => Promise<void>;
  logout?: () => Promise<void>; // Alias for signOut for backward compatibility
  login?: (email: string, password: string) => Promise<AuthResult>; // Alias for signIn
  register?: (email: string, password: string, name?: string) => Promise<AuthResult>; // Alias for signUp
  checkRole: (role: string) => boolean;
  updateUserProfile: (data: Partial<UserProfile>) => Promise<boolean>;
  refreshProfile: () => Promise<void>;
  resetPassword: (email: string) => Promise<AuthResult>;
  sendPasswordResetEmail: (email: string) => Promise<boolean>;
  userRoles: string[];
  updatePassword: (oldPassword: string, newPassword: string) => Promise<boolean>;
  setUser?: (user: User | null) => void;
  verifyEmail?: (token: string) => Promise<boolean>;
  sendVerificationEmail?: () => Promise<boolean>;
  updateProfile?: (data: any) => Promise<boolean>;
}
