export interface AuthUser {
  id: string;
  username?: string;
  email: string;
  profileImageUrl?: string;
  lucoinsBalance?: number;
  role?: string;
  isVerified?: boolean;
  // User profile data
  avatarUrl?: string;
  // Additional profile fields
  full_name?: string;
  phone?: string;
  location?: string;
  bio?: string;
  // Supabase User properties
  app_metadata: Record<string, any>;
  user_metadata: Record<string, any>;
  aud: string;
  created_at?: string;
}

export interface AuthContextType {
  user: AuthUser | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  userRoles: string[];
  register: (email: string, password: string, username?: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUserProfile: (userData: Partial<AuthUser>) => Promise<void>;
  clearError: () => void;
  profile: any;
  refreshProfile: () => Promise<void>;
  checkRole: (role: string) => boolean;
  updatePassword: (oldPassword: string, newPassword: string) => Promise<void>;
}
