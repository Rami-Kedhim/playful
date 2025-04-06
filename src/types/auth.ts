
import { Session, User as SupabaseUser } from "@supabase/supabase-js";

export interface AuthUser {
  id: string;
  email: string;
  username: string;
  profileImageUrl?: string;
  lucoinsBalance?: number;
  isVerified?: boolean;
  role?: string;
}

export interface AuthState {
  session: Session | null;
  user: SupabaseUser | null;
  profile: any | null;
  isLoading: boolean;
  userRoles: string[];
}

export interface AuthContextValue {
  session: Session | null;
  user: AuthUser | null;
  profile: any | null;
  isLoading: boolean;
  userRoles: string[];
  isAuthenticated: boolean;
  error: string | null;
  
  // Auth methods
  signUp: (email: string, password: string, userData?: Record<string, any>) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (newPassword: string) => Promise<void>;
  
  // Convenience methods
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, username: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUserProfile: (userData: Partial<any>) => Promise<void>;
  clearError: () => void;
  
  // Profile methods
  refreshProfile: () => Promise<void>;
  
  // Role checking
  checkRole: (role: string) => boolean;
}

// Add missing types
export type UserRole = string;

export interface UserProfile {
  id: string;
  username: string;
  full_name?: string;
  bio?: string;
  avatar_url?: string;
  location?: string;
  gender?: DatabaseGender;
  sexual_orientation?: string;
  is_verified?: boolean;
  is_escort?: boolean;
  subscription_tier?: string;
  lucoins_balance?: number;
  created_at?: string;
  updated_at?: string;
}

export type DatabaseGender = "male" | "female" | "other";
