export interface UserProfile {
  id: string;
  name: string;
  avatar_url?: string;
  avatarUrl?: string;
  profileImageUrl?: string;
  email?: string;
  phone?: string;
  phone_number?: string;
  location?: string;
  bio?: string;
  is_escort?: boolean;
  is_verified?: boolean;
  isVerified?: boolean;
  verified?: boolean;
  created_at?: string;
  updated_at?: string;
  username?: string;
  ubx_balance?: number;
  ubxBalance?: number;
  role?: string;
  roles?: string[];
  website?: string;
  verification_level?: string;
  verification_status?: string;
  verification_submitted?: boolean;
  rates?: Record<string, any>;
  availability?: Record<string, any>;
  services?: string[];
  languages?: string[];
  user_metadata?: Record<string, any>;
  bodyType?: string;
  height?: string | number;
  weight?: string | number;
  hairColor?: string;
  eyeColor?: string;
  ethnicity?: string;
  sexualOrientation?: string;
  measurements?: string;
  clientsServed?: number;
  lastActive?: Date | string;
  stats?: Record<string, any>;
  interests?: string[];
  specialties?: string[];
  limitations?: string[];
  payment_methods?: string[];
  deposit_required?: boolean;
}

export interface User {
  id: string;
  email?: string;
  name?: string;
  role?: string;
  roles?: string[];
  isVerified?: boolean;
  user_metadata?: Record<string, any>;
  username?: string;
  website?: string;
  bio?: string;
  avatarUrl?: string;
  avatar_url?: string;
  profileImageUrl?: string;
  ubxBalance?: number;
  ubx_balance?: number;
}

export interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  login: (email: string, password: string) => Promise<AuthResult>;
  logout: () => Promise<boolean>;
  register: (email: string, password: string, confirmPassword?: string) => Promise<AuthResult>;
  isLoading: boolean;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  initialized: boolean;
  
  // Authentication methods
  signIn: (email: string, password: string) => Promise<AuthResult>;
  signOut: () => Promise<boolean>;
  
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

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResult {
  success: boolean;
  user?: User;
  error?: string;
  session?: any;
}

export type UserRole = 'admin' | 'moderator' | 'creator' | 'escort' | 'client' | 'user';

export type DatabaseGender = 'male' | 'female' | 'other' | 'trans' | 'non-binary';
