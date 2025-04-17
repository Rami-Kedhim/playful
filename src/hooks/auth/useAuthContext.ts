
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
  userRoles: [],
  checkRole: () => false, // Add missing method
  updatePassword: async () => false, // Add missing method
  logout: async () => ({ success: false, error: 'Not implemented' }) // Add missing method
};

export const AuthContext = createContext<AuthContextType>(DEFAULT_CONTEXT);

export const useAuth = () => useContext(AuthContext);

// Export AuthProvider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // This is a stub - the real implementation should be in src/hooks/auth/useAuthContext.tsx
  return <AuthContext.Provider value={DEFAULT_CONTEXT}>{children}</AuthContext.Provider>;
};

export default useAuth;
