export interface User {
  id: string;
  email?: string;
  name?: string;
  role?: string;
  roles?: UserRole[];
  isVerified?: boolean;
  profileId?: string;
  avatarUrl?: string;
  username?: string;
  profileImageUrl?: string;
  avatar_url?: string;
  user_metadata?: Record<string, any>;
  preferences?: Record<string, any>;
  metadata?: Record<string, any>;
  createdAt?: string;
  updatedAt?: string;
  session?: any;
  password?: string;
  ubxBalance?: number;
  created_at?: string;
  phone?: string;
  website?: string;
  bio?: string;
}

export interface UserProfile {
  id: string;
  email: string;
  username?: string;
  name?: string;
  avatar_url?: string;
  bio?: string;
  website?: string;
  role?: string;
  roles?: UserRole[];
  gender?: DatabaseGender;
  ubx_balance?: number;
  is_verified?: boolean;
  is_escort?: boolean;
  subscription_tier?: string;
  full_name?: string;
  location?: string;
  sexual_orientation?: string;
  verification_status?: string;
  is_boosted?: boolean;
  isBoosted?: boolean;
  ubxBalance?: number;
  preferences?: Record<string, any>;
}

export enum DatabaseGender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
  Trans = 'trans',
  NonBinary = 'non-binary'
}

export interface AuthResult {
  success: boolean;
  user?: User | null;
  error?: string | null;
  redirectTo?: string;
  token?: string;
  session?: any;
  password?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  initialized: boolean;
}

export type UserRole = string | { name: string; permissions?: string[] };

export interface AuthUser extends User {
  ubxBalance?: number;
}

export interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  loading: boolean;
  error: string | null;
  initialized: boolean;
  checkRole: (role: string) => boolean;
  login: (email: string, password: string, options?: any) => Promise<AuthResult>;
  logout: () => Promise<void>;
  signIn: (email: string, password: string, options?: any) => Promise<AuthResult>;
  signOut: () => Promise<void>;
  register: (email: string, password: string, username?: string, options?: any) => Promise<AuthResult>;
  updateUser: (data: Partial<User>) => Promise<boolean>;
  updateUserProfile: (data: Partial<UserProfile>) => Promise<boolean>;
  updateProfile: (data: Partial<UserProfile>) => Promise<boolean>;
  loadUserProfile: () => Promise<User | null>;
  refreshProfile: () => Promise<void>;
  sendPasswordResetEmail: (email: string) => Promise<AuthResult>;
  resetPassword: (token: string, password: string) => Promise<AuthResult>;
  requestPasswordReset: (email: string) => Promise<AuthResult>;
  verifyEmail: (token: string) => Promise<AuthResult>;
  updatePassword: (currentPassword: string, newPassword: string) => Promise<boolean>;
  deleteAccount: () => Promise<boolean>;
  session?: any;
}
