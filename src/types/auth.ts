
// Auth types for the application

// Type for user roles in the application
export type UserRole = 'user' | 'moderator' | 'admin' | 'escort' | 'creator';

// Type for gender in the database
export type DatabaseGender = 'male' | 'female' | 'other';

// Type for the authentication user
export interface AuthUser {
  id: string;
  email: string;
  username?: string;
  profileImageUrl?: string;
  lucoinsBalance?: number;
  isVerified?: boolean;
  role?: UserRole;
}

// Auth state maintained by auth context
export interface AuthState {
  session: any | null;
  user: AuthUser | null;
  profile: any | null;
  isLoading: boolean;
  userRoles: string[];
}

// Auth context value interface
export interface AuthContextValue extends AuthState {
  signUp: (email: string, password: string, metadata?: {}) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (oldPassword: string, newPassword: string) => Promise<void>;
  refreshProfile: () => Promise<void>;
  checkRole: (role: string) => boolean;
  
  // Additional methods for components
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string, username: string) => Promise<void>;
  updateUserProfile: (userData: Partial<any>) => Promise<void>;
  error: string | null;
  clearError: () => void;
}
