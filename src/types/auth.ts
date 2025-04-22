
export type UserRole = 'user' | 'admin' | 'creator' | 'moderator' | 'subscriber' | string;

export interface User {
  id: string;
  email?: string;
  name?: string;
  username?: string;
  avatarUrl?: string;
  avatar_url?: string;
  profileImageUrl?: string;
  bio?: string;
  website?: string;
  phone?: string;
  location?: string;
  created_at?: string | Date;
  user_metadata?: Record<string, any>;
  lucoinsBalance?: number;
  isVerified?: boolean;
  app_metadata?: Record<string, any>;
  aud?: string;
  roles?: Array<UserRole | { name: UserRole }>;
  role?: UserRole;
  boost_status?: {
    isActive: boolean;
    expiresAt?: string;
  };
  // Additional fields needed by the app
  createdAt?: string | Date;
}

export interface UserProfile {
  id: string;
  userId: string;
  username: string;
  email: string;
  displayName?: string;
  location?: string;
  bio?: string;
  is_verified?: boolean;
  website?: string; 
  avatar_url?: string;
  joinedDate?: Date;
  phone?: string;
  profileImageUrl?: string;
  full_name?: string;
  gender?: DatabaseGender;
  lucoinsBalance?: number;
}

export type DatabaseGender = 'male' | 'female' | 'other' | 'trans' | 'non-binary';

export interface AuthUser {
  id: string;
  username?: string;
  email: string;
  profileImageUrl?: string;
  lucoinsBalance?: number;
  role?: string;
  isVerified?: boolean;
  avatarUrl?: string;
  full_name?: string;
  phone?: string;
  location?: string;
  bio?: string;
  app_metadata: Record<string, any>;
  user_metadata: Record<string, any>;
  aud: string;
  created_at?: string;
}

export interface AuthResult {
  success: boolean;
  error?: string | null;
  user?: User;
  message?: string;
  token?: string;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<AuthResult>;
  signUp: (email: string, password: string) => Promise<AuthResult>;
  signOut: () => Promise<void>;
  isAuthenticated: boolean;
  logout: () => Promise<void>;
  checkRole: (role: string) => boolean;
  updateUserProfile: (data: any) => Promise<boolean>;
  clearError: () => void;
  profile: any;
  refreshProfile: () => Promise<void>;
  updatePassword: (oldPassword: string, newPassword: string) => Promise<boolean>;
  userRoles: string[];
  // Additional required methods
  resetPassword?: (token: string, newPassword: string) => Promise<AuthResult>;
  sendPasswordResetEmail?: (email: string) => Promise<AuthResult>;
}

export type VerificationLevel = 'none' | 'basic' | 'enhanced' | 'premium';
