
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
  logout: async () => {}, // Alias for signOut for backward compatibility
  login: async () => ({ success: false }), // Alias for signIn
  register: async () => ({ success: false }), // Alias for signUp
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

  const userRoles = state.user?.roles?.map(r => r.toString()) || [];

  const updateUserProfile = useCallback(async (data: Partial<UserProfile>) => {
    console.log('Updating user profile with data:', data);
    return true;
  }, []);

  const refreshProfile = useCallback(async () => {
    console.log('Refreshing user profile');
  }, []);

  const updatePassword = async (oldPassword: string, newPassword: string) => {
    try {
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
        roles: [UserRole.USER],
        name: 'Test User'
      }
    };
  }, []);

  // Alias for signIn
  const login = signIn;

  const signUp = useCallback(async (email: string, password: string, name?: string): Promise<AuthResult> => {
    return {
      success: true,
      user: {
        id: '1',
        email,
        roles: [UserRole.USER],
        name: name || 'New User'
      }
    };
  }, []);

  // Alias for signUp
  const register = signUp;

  const signOut = useCallback(async () => {
    setState(prev => ({
      ...prev,
      user: null,
      isAuthenticated: false
    }));
  }, []);
  
  // Alias for signOut for backward compatibility
  const logout = signOut;

  // Mock verification functions for compatibility
  const verifyEmail = useCallback(async (token: string) => {
    console.log('Verifying email with token:', token);
    return true;
  }, []);

  const sendVerificationEmail = useCallback(async () => {
    console.log('Sending verification email');
    return true;
  }, []);

  const updateProfile = useCallback(async (data: any) => {
    console.log('Updating profile with data:', data);
    return await updateUserProfile(data);
  }, [updateUserProfile]);

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
          profileImageUrl: 'https://i.pravatar.cc/150?u=user',
          avatarUrl: 'https://i.pravatar.cc/150?u=user',
          roles: [UserRole.USER]
        },
        isAuthenticated: true,
        isLoading: false,
        login,
        register,
        signIn,
        signUp,
        checkRole,
        userRoles,
        updateUserProfile,
        refreshProfile,
        updatePassword,
        resetPassword,
        signOut,
        logout,
        sendPasswordResetEmail,
        verifyEmail,
        sendVerificationEmail,
        updateProfile,
        setUser: (user) => setState(prev => ({ ...prev, user })),
        profile: {
          id: '1',
          email: 'user@example.com',
          name: 'Test User',
          username: 'user',
          avatar_url: 'https://i.pravatar.cc/150?u=user',
          profileImageUrl: 'https://i.pravatar.cc/150?u=user',
          lucoin_balance: 1000,
          ubx_balance: 500
        }
      }));
    }, 1000);
  }, [checkRole, userRoles, updateUserProfile, refreshProfile, updatePassword, resetPassword, signIn, signUp, signOut, sendPasswordResetEmail, logout, login, register, updateProfile, verifyEmail, sendVerificationEmail]);

  return (
    <AuthContext.Provider value={{
      ...state,
      login,
      register,
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
      logout,
      verifyEmail,
      sendVerificationEmail,
      updateProfile,
      setUser: (user) => setState(prev => ({ ...prev, user }))
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default useAuth;
