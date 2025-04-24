
export interface AuthUser {
  id: string;
  username?: string;
  email: string;
  profileImageUrl?: string;
  lucoinsBalance?: number;
  role?: string;
  roles?: string[] | { name: string; permissions?: string[] }[];
  isVerified?: boolean;
  // User profile data
  avatarUrl?: string;
  name?: string;
  // Additional profile fields
  full_name?: string;
  phone?: string;
  location?: string;
  bio?: string;
  website?: string;
  ubxBalance?: number;
  // Supabase User properties
  user_metadata: Record<string, any>;
  aud: string;
  created_at?: string;
  avatar_url?: string;
}

export interface AuthResult {
  success: boolean;
  error?: string | null;
  user?: AuthUser | null;
  session?: any;
}

export interface AuthContextType {
  user: AuthUser | null;
  profile: any | null;
  login: (email: string, password: string) => Promise<AuthResult>;
  signIn: (email: string, password: string) => Promise<AuthResult>;
  logout: () => Promise<void>;
  signOut: () => Promise<void>;
  isLoading: boolean;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  initialized: boolean;
  register: (email: string, password: string, username?: string) => Promise<AuthResult>;
  resetPassword: (email: string) => Promise<boolean>;
  sendPasswordResetEmail: (email: string) => Promise<boolean>;
  requestPasswordReset: (email: string) => Promise<boolean>;
  verifyEmail: (token: string) => Promise<AuthResult>;
  updateUserProfile: (userData: Partial<AuthUser>) => Promise<boolean>;
  updateUser: (data: Partial<AuthUser>) => Promise<boolean>;
  updateProfile: (data: Partial<any>) => Promise<boolean>;
  loadUserProfile: () => Promise<AuthUser | null>;
  clearError: () => void;
  refreshProfile: () => Promise<void>;
  checkRole: (role: string) => boolean;
  updatePassword: (oldPassword: string, newPassword: string) => Promise<boolean>;
  deleteAccount: () => Promise<boolean>;
  session?: any;
}
