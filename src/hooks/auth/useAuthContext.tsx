
import React, { createContext, useContext, useState, useCallback } from 'react';
import { AuthContextType, AuthUser, UserProfile } from '@/types/auth';

// Extend the AuthContextType to include the properties that are used in the code but not in the type
type ExtendedAuthContextType = AuthContextType & {
  session?: any;
  login?: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout?: () => Promise<{ success: boolean; error?: string }>;
  register?: (email: string, password: string, username?: string) => Promise<{ success: boolean; error?: string }>;
  resetPassword?: (email: string) => Promise<void>;
  clearError?: () => void;
  updateAuthState?: (updates: Partial<ExtendedAuthContextType>) => void;
};

const DEFAULT_CONTEXT: ExtendedAuthContextType = {
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
  login: async () => ({ success: false, error: 'Not implemented' }),
  register: async () => ({ success: false, error: 'Not implemented' }),
  session: null,
  resetPassword: async () => {}, 
  updateUser: async () => {}, 
  clearSession: () => {}, 
  isLoggedIn: false, 
  isAdmin: () => false, 
  isCreator: () => false,
  clearError: () => {},
};

export const AuthContext = createContext<ExtendedAuthContextType>(DEFAULT_CONTEXT);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<ExtendedAuthContextType>(DEFAULT_CONTEXT);

  // Add methods to update state if needed
  const updateAuthState = useCallback((updates: Partial<ExtendedAuthContextType>) => {
    setState(prevState => ({ ...prevState, ...updates }));
  }, []);
  
  return (
    <AuthContext.Provider value={{ ...state, updateAuthState }}>
      {children}
    </AuthContext.Provider>
  );
};

export default useAuth;
