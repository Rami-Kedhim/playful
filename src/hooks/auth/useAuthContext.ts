import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import {
  Session,
  User as SupabaseUser,
} from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { UserProfile } from '@/types/escort';
import { useProfile } from '../useProfile';
import { AuthUser, AuthResult, UserRole } from '@/types/auth';

export interface AuthContextType {
  user: AuthUser | null;
  session: Session | null;
  isLoading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<AuthResult>;
  signUp: (email: string, password: string, metadata?: UserMetadata) => Promise<AuthResult>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUser: (updates: Partial<AuthUser>) => Promise<void>;
  clearSession: () => void;
  isLoggedIn: boolean;
  isAdmin: (user: AuthUser | null) => boolean;
  isCreator: (user: AuthUser | null) => boolean;
  isAuthenticated: boolean;
  checkRole: (role: string | string[]) => boolean;
  profile: UserProfile | null;
  refreshProfile: () => Promise<void>;
  updateUserProfile: (updates: any) => Promise<boolean>;
  updatePassword: (oldPassword: string, newPassword: string) => Promise<boolean>;
  logout: () => Promise<AuthResult>;
  userRoles: string[];
}

export interface AuthProviderProps {
  children: React.ReactNode;
}

interface UserMetadata {
  full_name?: string;
  avatar_url?: string;
  username?: string;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create the provider
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  return <AuthContext.Provider value={DEFAULT_CONTEXT}>{children}</AuthContext.Provider>;
};

export default useAuth;
