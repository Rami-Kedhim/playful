
import { createContext, useContext } from 'react';
import { AuthContextType } from '@/types/auth';

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
  userRoles: [],
  checkRole: () => false,
  updatePassword: async () => false,
  logout: async () => ({ success: false, error: 'Not implemented' }),
  session: null, // Adding missing session property
  resetPassword: async () => {}, // Adding missing resetPassword method
  updateUser: async () => {}, // Adding missing updateUser method
  clearSession: () => {}, // Adding missing clearSession method
  isLoggedIn: false, // Adding missing isLoggedIn property
  isAdmin: () => false, // Adding missing isAdmin method
  isCreator: () => false, // Adding missing isCreator method
};

export const AuthContext = createContext<AuthContextType>(DEFAULT_CONTEXT);

export const useAuth = () => useContext(AuthContext);

// Export AuthProvider component with explicit typing
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // This is a stub - the real implementation will be in useAuthContext.tsx
  return <AuthContext.Provider value={DEFAULT_CONTEXT}>{children}</AuthContext.Provider>;
};

export default useAuth;
