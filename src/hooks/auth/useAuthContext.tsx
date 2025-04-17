
import React, { createContext, useContext, useState, useCallback } from 'react';
import { AuthContextType, AuthUser, UserProfile } from '@/types/auth';

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

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthContextType>(DEFAULT_CONTEXT);

  // Add methods to update state if needed
  const updateAuthState = useCallback((updates: Partial<AuthContextType>) => {
    setState(prevState => ({ ...prevState, ...updates }));
  }, []);
  
  return (
    <AuthContext.Provider value={{ ...state, updateAuthState }}>
      {children}
    </AuthContext.Provider>
  );
};

export default useAuth;
