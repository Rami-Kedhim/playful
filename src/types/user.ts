
// User authentication types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  confirmPassword?: string;
  name?: string;
}

export interface AuthResult {
  success: boolean;
  error?: string;
  user?: any;
  token?: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  avatar_url?: string;
  avatarUrl?: string;
  username?: string;
  bio?: string;
  website?: string;
  phone?: string;
  user_metadata?: Record<string, any>;
  app_metadata?: Record<string, any>;
  role?: string;
  roles?: string[];
  created_at?: string;
  updated_at?: string;
  profileImageUrl?: string;
  ubxBalance?: number;
  
  // Adding missing properties referenced in UserProfile.tsx
  birth_date?: string;
  birthDate?: string;
  location?: string;
  gender?: string;
  joined_date?: string;
}

export interface UserProfile {
  id: string;
  user_id: string;
  name?: string;
  username?: string;
  bio?: string;
  avatar_url?: string;
  avatarUrl?: string;
  email?: string;
  phone?: string;
  website?: string;
  location?: string;
  verified?: boolean;
  is_verified?: boolean;
  role?: string;
  roles?: string[];
  verification_level?: string;
  displayName?: string;
  services?: string[];
  languages?: string[];
  availability?: any;
  rates?: any;
  gender?: string;
  
  // Add properties needed for types to match
  ubx_balance?: number;
  ubxBalance?: number;
  is_escort?: boolean;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  profile: UserProfile | null;
  login: (email: string, password: string) => Promise<AuthResult>;
  logout: () => Promise<boolean>;
  register: (email: string, password: string, confirmPassword?: string) => Promise<AuthResult>;
  loading: boolean;
  isLoading: boolean; // Added for compatibility
  error: string | null;
  initialized: boolean;
  updateUser: (userData: Partial<User>) => Promise<boolean>;
  updateUserProfile: (profileData: Partial<UserProfile>) => Promise<boolean>;
  updateProfile: (profileData: Partial<UserProfile>) => Promise<boolean>;
  sendPasswordResetEmail: (email: string) => Promise<boolean>;
  resetPassword: (password: string, token: string) => Promise<boolean>;
  checkRole: (role: string) => boolean;
  signIn: (email: string, password: string) => Promise<AuthResult>;
  signOut: () => Promise<boolean>;
  refreshProfile: () => Promise<void>;
  updatePassword?: (oldPassword: string, newPassword: string) => Promise<boolean>;
  deleteAccount: () => Promise<boolean>;
  
  // Add missing properties referenced in hooks
  loadUserProfile?: () => Promise<UserProfile | null>;
  requestPasswordReset?: (email: string) => Promise<boolean>;
  verifyEmail?: (token: string) => Promise<boolean>;
  
  // These are used in SecureRouteWrapper
  isAdmin?: boolean;
  isEscort?: boolean;
  isClient?: boolean;
}
