
import React, { useState, useEffect, createContext, useContext, useCallback } from 'react';
import { User, UserRole, AuthResult } from '@/types/user';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  username?: string;
  avatar_url?: string;
  profileImageUrl?: string;
  phone?: string;
  location?: string;
  bio?: string;
  is_verified?: boolean;
  website?: string;
  lucoin_balance?: number;
  ubx_balance?: number;
}

export interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string;
  signIn: (email: string, password: string) => Promise<AuthResult>;
  signUp: (email: string, password: string, username?: string) => Promise<AuthResult>;
  signOut: () => Promise<void>;
  checkRole: (role: string) => boolean;
  updateUserProfile: (userData: Partial<UserProfile>) => Promise<boolean>;
  refreshProfile: () => Promise<void>;
  resetPassword: (email: string) => Promise<AuthResult>;
  sendPasswordResetEmail: (email: string) => Promise<boolean>;
  userRoles: string[];
  updatePassword: (oldPassword: string, newPassword: string) => Promise<boolean>;
  login: (email: string, password: string) => Promise<AuthResult>;
  register: (email: string, password: string, username?: string) => Promise<AuthResult>;
  logout: () => Promise<void>;
  verifyEmail?: (token: string) => Promise<boolean>;
  sendVerificationEmail?: () => Promise<boolean>;
  updateProfile?: (data: any) => Promise<boolean>;
  setUser?: (user: User | null) => void;
}

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
  login: async () => ({ success: false }),
  register: async () => ({ success: false }),
  logout: async () => {},
};

export const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export const useAuth = (): AuthContextType => {
  return useContext(AuthContext);
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthContextType>(defaultAuthContext);

  const checkRole = useCallback((role: string) => {
    if (!state.user) return false;
    return state.user.role === role;
  }, [state.user]);

  const signIn = useCallback(async (email: string, password: string): Promise<AuthResult> => {
    return {
      success: true,
      user: {
        id: '1',
        email,
        role: 'user',
        name: 'Test User',
        isVerified: true,
        username: email.split('@')[0],
        createdAt: new Date().toISOString(),
      }
    };
  }, []);

  const login = signIn; // Alias for signIn

  const signUp = useCallback(async (email: string, password: string, username?: string): Promise<AuthResult> => {
    return {
      success: true,
      user: {
        id: '1',
        email,
        role: 'user',
        name: username || 'New User',
        isVerified: false,
        username: username || email.split('@')[0],
        createdAt: new Date().toISOString(),
      }
    };
  }, []);

  const register = signUp; // Alias for signUp

  const signOut = useCallback(async () => {
    setState(prev => ({
      ...prev,
      user: null,
      isAuthenticated: false
    }));
  }, []);
  
  const logout = signOut; // Alias for signOut

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

  useEffect(() => {
    setTimeout(() => {
      const mockUser: User = {
        id: '1',
        email: 'user@example.com',
        username: 'user',
        name: 'Test User',
        role: 'user' as 'user' | 'admin' | 'moderator',
        isVerified: true,
        createdAt: new Date().toISOString(),
        website: 'https://example.com',
        phone: '+1234567890'
      };
      
      const mockProfile: UserProfile = {
        id: '1',
        email: 'user@example.com',
        name: 'Test User',
        username: 'user',
        avatar_url: 'https://i.pravatar.cc/150?u=user',
        profileImageUrl: 'https://i.pravatar.cc/150?u=user',
        lucoin_balance: 1000,
        ubx_balance: 500,
        phone: '+1234567890',
        website: 'https://example.com',
        location: 'New York',
        bio: 'Test user biography'
      };
      
      setState(prev => ({ 
        ...prev, 
        user: mockUser,
        profile: mockProfile, 
        isAuthenticated: true,
        isLoading: false,
        login,
        register,
        signIn,
        signUp,
        signOut,
        logout,
        checkRole,
        updateUserProfile,
        refreshProfile,
        updatePassword,
        resetPassword,
        sendPasswordResetEmail,
        userRoles: [mockUser.role],
        verifyEmail,
        sendVerificationEmail,
        updateProfile,
        setUser: (user) => setState(prev => ({ ...prev, user }))
      }));
    }, 1000);
  }, [checkRole, updateUserProfile, refreshProfile, updatePassword, resetPassword, signIn, signUp, signOut, sendPasswordResetEmail, login, register, logout, updateProfile, verifyEmail, sendVerificationEmail]);

  return (
    <AuthContext.Provider value={{
      ...state,
      login,
      register,
      signIn,
      signUp,
      signOut,
      logout,
      checkRole,
      updateUserProfile,
      refreshProfile,
      updatePassword,
      resetPassword,
      sendPasswordResetEmail,
      userRoles: state.user ? [state.user.role] : [],
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
