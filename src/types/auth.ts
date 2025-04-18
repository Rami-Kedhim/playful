
export enum UserRole {
  ADMIN = "admin",
  MODERATOR = "moderator",
  USER = "user",
  ESCORT = "escort",
  CLIENT = "client",
  CREATOR = "creator",
  CUSTOMER = "customer"
}

export enum DatabaseGender {
  MALE = "male",
  FEMALE = "female",
  OTHER = "other",
  TRANS = "trans",
  NON_BINARY = "non-binary"
}

export interface AuthUser {
  id: string;
  email?: string;
  phone?: string;
  phone_number?: string;  // Added for compatibility
  role?: UserRole;
  roles?: UserRole[];
  created_at?: string;
  updated_at?: string;
  app_metadata?: {
    provider?: string;
    [key: string]: any;
  };
  user_metadata?: {
    [key: string]: any;
  };
  // Additional properties used in components
  username?: string;
  name?: string;
  profileImageUrl?: string;
  avatarUrl?: string;
  avatar_url?: string;
  lucoinsBalance?: number;
  // Profile properties sometimes accessed directly from user
  location?: string;
  bio?: string;
}

export interface UserProfile {
  id: string;
  email?: string;
  name?: string;
  avatar_url?: string;
  phone_number?: string;
  location?: string;
  bio?: string;
  is_escort?: boolean;
  is_verified?: boolean;
  created_at?: string;
  updated_at?: string;
  ubx_balance?: number;
  lucoin_balance?: number;
  lucoinsBalance?: number; // Alias for lucoin_balance for compatibility
  stripe_account_id?: string;
  stripe_customer_id?: string;
  // Additional properties used in components
  username?: string;
  full_name?: string;
  gender?: string;
  sexual_orientation?: string;
  is_boosted?: boolean;
  isBoosted?: boolean;
}

export interface AuthResult {
  success: boolean;
  user?: AuthUser | null;
  profile?: UserProfile | null;
  error?: string;
  session?: any; // Allow session property
}

export interface AuthContextType {
  user: AuthUser | null;
  profile: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  signUp: (email: string, password: string, options?: any) => Promise<AuthResult>;
  signIn: (email: string, password: string) => Promise<AuthResult>;
  signOut: () => Promise<void>;
  login?: (email: string, password: string) => Promise<AuthResult>; // Alias for signIn
  register?: (email: string, password: string, username?: string) => Promise<AuthResult>; // Alias for signUp
  logout?: () => Promise<void>; // Alias for signOut
  sendPasswordResetEmail: (email: string) => Promise<boolean>;
  resetPassword: (token: string, newPassword: string) => Promise<boolean>;
  updateProfile: (data: Partial<UserProfile>) => Promise<boolean>;
  checkRole: (role: UserRole | string) => boolean;
  refreshUser: () => Promise<void>;
  sendVerificationEmail: () => Promise<boolean>;
  verifyEmail: (token: string) => Promise<boolean>;
  updateEmail: (email: string) => Promise<boolean>;
  updatePassword: (password: string) => Promise<boolean>;
  setUser: (user: AuthUser | null) => void;
  clearError?: () => void;
  
  // Additional methods used in components
  updateUserProfile?: (data: Partial<AuthUser>) => Promise<boolean>;
  refreshProfile?: () => Promise<void>;
  userRoles?: UserRole[];
}
