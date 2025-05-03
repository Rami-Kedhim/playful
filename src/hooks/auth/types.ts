import { User, UserProfile } from '@/types/auth';

export interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  loading: boolean;
  error: string | null;
  initialized: boolean;
  
  // Authentication methods
  login: (email: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<void>;
  register: (email: string, password: string, username?: string) => Promise<any>;
  
  // User management methods
  updateUser: (userData: Partial<User>) => Promise<boolean>;
  updateUserProfile: (profileData: Partial<UserProfile>) => Promise<boolean>;
  updateProfile: (profileData: Partial<UserProfile>) => Promise<boolean>;
  loadUserProfile: () => Promise<User | null>;
  refreshProfile: () => Promise<void>;
  
  // Password related methods
  sendPasswordResetEmail: (email: string) => Promise<any>;
  resetPassword: (password: string, token: string) => Promise<any>;
  requestPasswordReset: (email: string) => Promise<any>;
  verifyEmail: (token: string) => Promise<any>;
  updatePassword: (oldPassword: string, newPassword: string) => Promise<boolean>;
  
  // Other methods
  deleteAccount: () => Promise<boolean>;
  checkRole: (role: string) => boolean;
}
