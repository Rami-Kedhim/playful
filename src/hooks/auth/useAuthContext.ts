
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
  session: null,
  resetPassword: async () => {}, 
  updateUser: async () => {}, 
  clearSession: () => {}, 
  isLoggedIn: false, 
  isAdmin: () => false, 
  isCreator: () => false
};

export const AuthContext = createContext<AuthContextType>(DEFAULT_CONTEXT);

export const useAuth = () => useContext(AuthContext);

// Export AuthProvider component with explicit typing
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const contextValue: AuthContextType = DEFAULT_CONTEXT;
  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export default useAuth;
