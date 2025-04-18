
export type UserRole = 'USER' | 'ADMIN' | 'ESCORT' | 'CLIENT' | 'MODERATOR';

export const UserRole = {
  USER: 'USER' as UserRole,
  ADMIN: 'ADMIN' as UserRole,
  ESCORT: 'ESCORT' as UserRole,
  CLIENT: 'CLIENT' as UserRole,
  MODERATOR: 'MODERATOR' as UserRole,
};

export interface User {
  id: string;
  email: string;
  username?: string;
  name?: string;
  roles?: UserRole[];
  emailVerified?: boolean;
  profileId?: string;
  createdAt?: string;
  updatedAt?: string;
  lastLoginAt?: string;
}

export interface UserProfile {
  id: string;
  userId?: string;
  name?: string;
  email?: string;
  username?: string;
  bio?: string;
  avatar?: string;
  phone?: string;
  location?: string;
  website?: string;
  socialLinks?: {
    twitter?: string;
    instagram?: string;
    facebook?: string;
    [key: string]: string | undefined;
  };
  preferences?: {
    theme?: string;
    notifications?: boolean;
    language?: string;
    [key: string]: string | boolean | undefined;
  };
  verificationStatus?: 'pending' | 'verified' | 'rejected';
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthResult {
  success: boolean;
  user?: User;
  error?: string;
  token?: string;
}

export interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string;
  signIn: (email: string, password: string) => Promise<AuthResult>;
  signUp: (email: string, password: string, options?: any) => Promise<AuthResult>;
  signOut: () => Promise<void>;
  updateUserProfile: (data: Partial<UserProfile>) => Promise<boolean>;
  updatePassword: (oldPassword: string, newPassword: string) => Promise<boolean>;
  sendPasswordResetEmail: (email: string) => Promise<boolean>;
  refreshProfile: () => Promise<void>;
  checkRole: (role: string) => boolean;
  userRoles: string[];
  resetPassword: (email: string) => Promise<AuthResult>;
  setUser?: (user: User | null) => void;
  verifyEmail?: (token: string) => Promise<boolean>;
  sendVerificationEmail?: () => Promise<boolean>;
}
