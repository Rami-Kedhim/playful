
import { createContext, useContext } from 'react';
import { AuthUser, AuthContextType } from '@/types/auth';

const DEFAULT_CONTEXT: AuthContextType = {
  user: null,
  profile: null,
  isAuthenticated: false,
  isLoading: true,
  error: '',
  signUp: async () => ({ success: false, error: 'Not implemented' }),
  signIn: async () => ({ success: false, error: 'Not implemented' }),
  signOut: async () => {},
  refreshUser: async () => {},
  updateUserProfile: async () => false,
  refreshProfile: async () => {},
  userRoles: [] // Add userRoles property to context
};

export const AuthContext = createContext<AuthContextType>(DEFAULT_CONTEXT);

export const useAuth = () => useContext(AuthContext);

export default useAuth;
