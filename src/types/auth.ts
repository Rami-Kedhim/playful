import { Session, User } from "@supabase/supabase-js";

export interface AuthState {
  session: Session | null;
  user: User | null;
  profile: any | null;
  isLoading: boolean;
  userRoles: string[];
}

export interface AuthContextValue {
  session: any | null;
  user: AuthUser | null;
  profile: any | null;
  isLoading: boolean;
  userRoles: string[];
  isAuthenticated: boolean;
  signUp: (email: string, password: string, options?: any) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (password: string) => Promise<void>;
  refreshProfile: () => Promise<void>;
  checkRole: (role: string) => boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string, username: string) => Promise<void>;
  updateUserProfile: (userData: Partial<any>) => Promise<void>;
  error: string | null;
  clearError: () => void;
}

export type DatabaseGender = "male" | "female" | "other";

export type UserRole = "user" | "escort" | "creator" | "admin" | "moderator";

export interface UserProfile {
  id: string;
  username: string | null;
  full_name: string | null;
  bio: string | null;
  gender: DatabaseGender | null;
  sexual_orientation: string | null;
  location: string | null;
  avatar_url: string | null;
  lucoin_balance: number;
  is_verified: boolean;
  verification_level: string | null;
  profile_completeness: number;
  created_at: string;
  updated_at: string;
  languages: string[] | null;
  birth_date: string | null;
  last_online: string | null;
}

export interface AuthUser {
  id: string;
  email: string;
  username: string;
  profileImageUrl: string;
  lucoinsBalance: number;
  isVerified: boolean;
  role: string;
}
