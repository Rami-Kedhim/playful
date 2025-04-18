
import { createContext, useContext } from 'react';
import { AuthContextType } from '@/types/auth';

// Create the default state
const defaultAuthContext: AuthContextType = {
  user: null,
  profile: null,
  isLoading: true,
  isAuthenticated: false,
  error: '',
  signIn: async () => ({ success: false }),
  signUp: async () => ({ success: false }),
  signOut: async () => {},
  checkRole: () => false,
  updateUserProfile: async () => false,
  refreshProfile: async () => {},
  resetPassword: async () => ({ success: false }),
  sendPasswordResetEmail: async () => false,
  userRoles: [],
  updatePassword: async () => false,
};

// Create the context
export const AuthContext = createContext<AuthContextType>(defaultAuthContext);

// Create a hook for using the auth context
export const useAuth = (): AuthContextType => {
  return useContext(AuthContext);
};
