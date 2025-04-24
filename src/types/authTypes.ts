
// Define the AuthUser type needed for our authentication system
export interface AuthUser {
  id: string;
  email: string;
  username?: string;
  name?: string;
  role?: string;
  aud?: string;
  user_metadata?: Record<string, any>;
  created_at: string;
  avatarUrl?: string;
}

export interface AuthContextType {
  user: AuthUser | null;
  profile: any | null;
  loading: boolean;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  initialized: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<boolean>;
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => Promise<boolean>;
  register: (email: string, password: string, username?: string) => Promise<boolean>;
  updateUser: (userData: Partial<AuthUser>) => Promise<boolean>;
  updateUserProfile: (profileData: any) => Promise<boolean>;
  updateProfile: (profileData: any) => Promise<boolean>;
  loadUserProfile: () => Promise<any>;
  refreshProfile: () => Promise<void>;
  sendPasswordResetEmail: (email: string) => Promise<boolean>;
  resetPassword: (email: string) => Promise<boolean>;
  requestPasswordReset: (email: string) => Promise<boolean>;
  verifyEmail: (token: string) => Promise<boolean>;
  updatePassword: (oldPassword: string, newPassword: string) => Promise<boolean>;
  deleteAccount: () => Promise<boolean>;
  checkRole: (role: string) => boolean;
}

export interface AuthResult {
  success: boolean;
  user?: AuthUser | null;
  session?: any | null;
  error?: any;
}
