
import React, { useState, useEffect, createContext, useContext, useCallback } from 'react';
import { User, UserRole, AuthResult, AuthContextType, UserProfile } from '@/types/auth';

const DEFAULT_CONTEXT: AuthContextType = {
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
  resetPassword: async () => ({
    success: false,
    error: 'Not implemented'
  }),
  sendPasswordResetEmail: async () => false,
  userRoles: [],
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

  const checkRole = useCallback((role: string) => {
    if (!state.user || !state.user.roles) return false;
    return state.user.roles.includes(role as UserRole);
  }, [state.user]);

  const userRoles = state.user?.roles || [];

  const updateUserProfile = useCallback(async (data: Partial<UserProfile>) => {
    console.log('Updating user profile with data:', data);
    return true;
  }, []);

  const refreshProfile = useCallback(async () => {
    console.log('Refreshing user profile');
  }, []);

  const updatePassword = async (oldPassword: string, newPassword: string) => {
    try {
      // In a real implementation, call an auth service here
      console.log('Updating password', oldPassword, newPassword);
      return true;
    } catch (error) {
      console.error('Error updating password:', error);
      return false;
    }
  };

  const sendPasswordResetEmail = useCallback(async (email: string) => {
    console.log('Sending password reset email to:', email);
    return true;
  }, []);

  const resetPassword = useCallback(async (email: string) => {
    console.log('Resetting password for:', email);
    return {
      success: true
    };
  }, []);

  const signIn = useCallback(async (email: string, password: string): Promise<AuthResult> => {
    return {
      success: true,
      user: {
        id: '1',
        email,
        roles: [UserRole.USER]
      }
    };
  }, []);

  const signUp = useCallback(async (email: string, password: string, name?: string): Promise<AuthResult> => {
    return {
      success: true,
      user: {
        id: '1',
        email,
        roles: [UserRole.USER]
      }
    };
  }, []);

  const signOut = useCallback(async () => {
    setState(prev => ({
      ...prev,
      user: null,
      isAuthenticated: false
    }));
  }, []);

  // Set up a mock user for development
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
        sendPasswordResetEmail,
        setUser: (user) => setState(prev => ({ ...prev, user })),
        profile: {
          id: '1',
          email: 'user@example.com',
          name: 'Test User',
          username: 'user'
        }
      }));
    }, 1000);
  }, [checkRole, userRoles, updateUserProfile, refreshProfile, updatePassword, resetPassword, signIn, signUp, signOut, sendPasswordResetEmail]);

  return (
    <AuthContext.Provider value={{
      ...state,
      checkRole,
      userRoles,
      updateUserProfile,
      refreshProfile,
      updatePassword,
      resetPassword,
      sendPasswordResetEmail,
      signIn,
      signUp,
      signOut,
      setUser: (user) => setState(prev => ({ ...prev, user }))
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default useAuth;
