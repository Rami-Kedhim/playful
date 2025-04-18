
import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { AuthContextType, AuthUser, UserProfile, UserRole } from '@/types/auth';

const DEFAULT_CONTEXT: AuthContextType = {
  user: null,
  profile: null,
  isAuthenticated: false,
  isLoading: true,
  error: '',
  signUp: async () => ({ success: false, error: 'Not implemented' }),
  signIn: async () => ({ success: false, error: 'Not implemented' }),
  signOut: async () => {},
  login: async () => ({ success: false, error: 'Not implemented' }),
  register: async () => ({ success: false, error: 'Not implemented' }),
  logout: async () => {},
  refreshUser: async () => {},
  updateUserProfile: async () => false,
  refreshProfile: async () => {},
  resetPassword: async () => ({ success: false, error: 'Not implemented' }),
  userRoles: [],
  checkRole: () => false,
  updatePassword: async () => false
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
  
  // Mock implementation for role checking
  const checkRole = useCallback((role: string | UserRole) => {
    if (!state.user || !state.user.roles) return false;
    return state.user.roles.includes(role as UserRole);
  }, [state.user]);
  
  // Mock user roles
  const userRoles = state.user?.roles || [];
  
  // Mock implementation for updating user profile
  const updateUserProfile = useCallback(async (data: any): Promise<boolean> => {
    console.log('Updating user profile with data:', data);
    // In a real app, this would call an API
    return true;
  }, []);
  
  // Mock implementation for refreshing profile
  const refreshProfile = useCallback(async (): Promise<void> => {
    console.log('Refreshing user profile');
    // In a real app, this would fetch from an API
  }, []);
  
  // Mock implementation for updating password
  const updatePassword = useCallback(async (newPassword: string): Promise<boolean> => {
    console.log('Updating password');
    // In a real app, this would call an API
    return true;
  }, []);
  
  // Mock implementation for reset password
  const resetPassword = useCallback(async (email: string): Promise<any> => {
    console.log('Resetting password for:', email);
    // In a real app, this would call an API
    return { success: true };
  }, []);
  
  // Mock sign in
  const signIn = useCallback(async (email: string, password: string) => {
    return { success: true, user: { id: '1', email, roles: [UserRole.USER] } };
  }, []);
  
  // Mock sign up
  const signUp = useCallback(async (email: string, password: string) => {
    return { success: true, user: { id: '1', email, roles: [UserRole.USER] } };
  }, []);
  
  // Mock sign out
  const signOut = useCallback(async () => {
    setState(prev => ({...prev, user: null, isAuthenticated: false}));
  }, []);
  
  // For demonstration purposes, simulate a logged in user
  useEffect(() => {
    setTimeout(() => {
      setState(prev => ({
        ...prev,
        user: {
          id: '1',
          email: 'user@example.com',
          username: 'user',
          name: 'Test User',
          roles: [UserRole.USER]
        },
        isAuthenticated: true,
        isLoading: false,
        checkRole,
        userRoles,
        updateUserProfile,
        refreshProfile,
        updatePassword,
        resetPassword,
        signIn,
        signUp,
        signOut,
        profile: {
          id: '1',
          email: 'user@example.com',
          name: 'Test User',
          username: 'user'
        }
      }));
    }, 1000);
  }, [checkRole, userRoles, updateUserProfile, refreshProfile, updatePassword, resetPassword, signIn, signUp, signOut]);
  
  return (
    <AuthContext.Provider value={{
      ...state,
      checkRole,
      userRoles,
      updateUserProfile,
      refreshProfile,
      updatePassword,
      resetPassword,
      signIn,
      signUp,
      signOut
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default useAuth;
