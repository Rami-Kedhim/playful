
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
  user_metadata: Record<string, any>;
  aud: string;
  created_at?: string;
}

export interface AuthResult {
  success: boolean;
  error?: string | null;
}

export interface AuthContextType {
  user: AuthUser | null;
  login: (email: string, password: string) => Promise<AuthResult>;
  logout: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  register: (email: string, password: string, username?: string) => Promise<AuthResult>;
  resetPassword: (email: string) => Promise<boolean>;
  updateUserProfile: (userData: Partial<AuthUser>) => Promise<boolean>;
  clearError: () => void;
  profile: any;
  refreshProfile: () => Promise<void>;
  checkRole: (role: string) => boolean;
  updatePassword: (oldPassword: string, newPassword: string) => Promise<boolean>;
  deleteAccount: () => Promise<boolean>;
}
