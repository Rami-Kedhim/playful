
import { User, UserProfile } from '@/types/auth';

export interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  loading: boolean;
  error: string | null;
  initialized: boolean;
  checkRole: (role: string) => boolean;
  login: (email: string, password: string, options?: any) => Promise<any>;
  logout: () => Promise<void>;
  signIn: (email: string, password: string, options?: any) => Promise<any>;
  signOut: () => Promise<void>;
  register: (email: string, password: string, username?: string, options?: any) => Promise<any>;
  updateUser: (data: Partial<User>) => Promise<boolean>;
  updateUserProfile: (data: Partial<UserProfile>) => Promise<boolean>;
  updateProfile: (data: Partial<UserProfile>) => Promise<boolean>;
  loadUserProfile: () => Promise<User | null>;
  refreshProfile: () => Promise<void>;
  sendPasswordResetEmail: (email: string) => Promise<any>;
  resetPassword: (token: string, password: string) => Promise<any>;
  requestPasswordReset: (email: string) => Promise<any>;
  verifyEmail: (token: string) => Promise<any>;
  updatePassword: (currentPassword: string, newPassword: string) => Promise<boolean>;
  deleteAccount: () => Promise<boolean>;
}

export interface AuthProviderProps {
  children: React.ReactNode;
}
