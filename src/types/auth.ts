
export interface User {
  id: string;
  email: string;
  name?: string;
  role?: string;
  isVerified?: boolean;
  profileId?: string;
  avatarUrl?: string;
  preferences?: Record<string, any>;
  metadata?: Record<string, any>;
  createdAt?: string;
  updatedAt?: string;
  session?: any; // Add session property
  password?: string; // Add password property
  username?: string;
  roles?: UserRole[];
  website?: string;
  bio?: string;
  profileImageUrl?: string;
  avatar_url?: string;
  user_metadata?: Record<string, any>;
  ubxBalance?: number;
  created_at?: string;
  phone?: string; // Add phone property
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
  user?: User;
  error?: string;
  redirectTo?: string;
  token?: string;
  session?: any; // Add session property
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
  // Additional properties needed for auth
  ubxBalance?: number; // Add UBX balance
}

export interface AuthContextType {
  user: User | null;
  profile?: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  initialized: boolean;
  checkRole?: (role: string) => boolean;
  login: (email: string, password: string, options?: any) => Promise<AuthResult>;
  logout: () => Promise<void>;
  register: (email: string, password: string, username?: string, options?: any) => Promise<AuthResult>;
  updateUser: (data: Partial<User>) => Promise<boolean>;
  loadUserProfile: () => Promise<User | null>;
  refreshProfile: () => Promise<void>;
  sendPasswordResetEmail: (email: string) => Promise<AuthResult>;
  resetPassword: (token: string, password: string) => Promise<AuthResult>;
  requestPasswordReset: (email: string) => Promise<AuthResult>;
  verifyEmail: (token: string) => Promise<AuthResult>;
}
