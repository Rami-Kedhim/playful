export interface User {
  id: string;
  email?: string;
  username?: string;
  displayName?: string;
  profileImageUrl?: string;
  roles?: string[];
  emailVerified?: boolean;
  phoneVerified?: boolean;
  isVerified?: boolean;
  ubxBalance?: number;
  created_at?: Date | string;
  
  // Additional properties needed by various components
  name?: string;
  website?: string;
  bio?: string;
  user_metadata?: Record<string, any>;
  avatarUrl?: string;
  avatar_url?: string;
  role?: string;
}

// Add UserProfile interface
export interface UserProfile {
  id: string;
  user_id: string;
  bio?: string;
  phone?: string;
  website?: string;
  name?: string;
  displayName?: string;
  avatar_url?: string;
  services?: string[];
  languages?: string[];
  rates?: Record<string, number>;
}

// Add missing auth types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResult {
  success: boolean;
  user?: User;
  session?: any;
  error?: string;
}

// Add AuthContextType
export interface AuthContextType {
  user: User | null;
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
  register: (email: string, password: string, confirmPassword?: string) => Promise<AuthResult>;
  
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
