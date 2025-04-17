import { Profile } from './profile';

export interface AuthContextType {
  user: AuthUser | null;
  profile: Profile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string;
  signUp: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  refreshUser: () => Promise<void>;
  updateUserProfile: (updates: Partial<Profile>) => Promise<boolean>;
  refreshProfile: () => Promise<void>;
  userRoles: string[];
  checkRole: (role: string) => boolean;
  updatePassword: (password: string) => Promise<boolean>;
}

export interface AuthUser {
  id: string;
  email?: string;
  name?: string;
  full_name?: string;
  avatar_url?: string;
  provider?: string;
  role?: string;
  created_at?: string;
  updated_at?: string;
  username?: string;
}

export interface Session {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  user: AuthUser;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  avatar_url: string;
  phone_number: string;
  location: string;
  bio: string;
  is_escort: boolean;
  created_at: string;
  updated_at: string;
}
