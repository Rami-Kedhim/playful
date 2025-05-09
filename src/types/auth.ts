import { User, UserProfile } from './user';
import { Session } from '@supabase/supabase-js';

export interface AuthUser extends User {}

export interface AuthResult {
  success: boolean;
  user?: AuthUser;
  session?: Session;
  error?: string;
}

export interface AuthContextType {
  user: AuthUser | null;
  profile: UserProfile | null;
  loading: boolean;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  initialized: boolean;
  
  // Authentication methods
  login: (email: string, password: string) => Promise<AuthResult>;
  logout: () => Promise<boolean>;
  signIn: (email: string, password: string) => Promise<AuthResult>;
  signOut: () => Promise<boolean>;
  register: (email: string, password: string, confirmPassword: string) => Promise<AuthResult>;
  
  // User management methods
  updateUser: (userData: Partial<User>) => Promise<boolean>;
  updateUserProfile: (profileData: Partial<UserProfile>) => Promise<boolean>;
  updateProfile: (profileData: Partial<UserProfile>) => Promise<boolean>;
  loadUserProfile: () => Promise<UserProfile | null>;
  refreshProfile: () => Promise<void>;
  
  // Password related methods
  sendPasswordResetEmail: (email: string) => Promise<boolean>;
  resetPassword: (password: string, token: string) => Promise<boolean>;
  requestPasswordReset: (email: string) => Promise<boolean>;
  verifyEmail: (token: string) => Promise<boolean>;
  updatePassword: (oldPassword: string, newPassword: string) => Promise<boolean>;
  
  // Other methods
  deleteAccount: () => Promise<boolean>;
  checkRole: (role: string) => boolean;
}

export interface AuthState {
  user: AuthUser | null;
  profile: UserProfile | null;
  isLoading: boolean;
  userRoles: string[];
}

export type DatabaseGender = 'male' | 'female' | 'other' | 'trans' | 'non-binary';

// Re-export types from user.ts to avoid circular dependencies
export type { User, UserProfile, UserRole } from './user';
