
import { User } from '@/types/user';
import { UserProfile } from '@/types/auth';

export interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  loading: boolean;
  error: string | null;
  initialized: boolean;
  login: (email: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<void>;
  register: (email: string, password: string, username?: string) => Promise<any>;
  checkRole: (role: string) => boolean;
  updateUserProfile: (data: any) => Promise<any>;
  updateUser: (data: any) => Promise<any>;
  updateProfile: (data: any) => Promise<any>;
  loadUserProfile: () => Promise<any>;
  refreshProfile: () => Promise<void>;
  sendPasswordResetEmail: (email: string) => Promise<any>;
  resetPassword: (token: string, password: string) => Promise<any>;
  requestPasswordReset: (email: string) => Promise<any>;
  verifyEmail: (token: string) => Promise<any>;
  updatePassword: (oldPassword: string, newPassword: string) => Promise<boolean>;
  deleteAccount: () => Promise<boolean>;
}
