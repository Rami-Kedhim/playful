
import { useState } from 'react';
import type { AuthContextType } from './types';
import { User } from '@/types/user';

export { AuthContextType };

export const useAuth = (): AuthContextType => {
  // Mock implementation for development
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [initialized, setInitialized] = useState(true);
  
  const login = async (email: string, password: string): Promise<any> => {
    // Mock login logic
    setIsLoading(true);
    try {
      console.log(`Login attempt: ${email}`);
      const mockUser = {
        id: 'user-123',
        email,
        username: email.split('@')[0],
        roles: ['client'],
        created_at: new Date().toISOString(),
        avatarUrl: null,
        profileImageUrl: null,
        user_metadata: {
          username: email.split('@')[0],
          avatar_url: null,
        },
        ubxBalance: 100,
        name: email.split('@')[0],
      };
      setUser(mockUser);
      setIsAuthenticated(true);
      return { success: true, user: mockUser };
    } catch (err) {
      setError('Failed to login');
      return { success: false, error: 'Failed to login' };
    } finally {
      setIsLoading(false);
    }
  };
  
  const logout = async (): Promise<void> => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const signIn = login;
  const signOut = logout;
  
  const register = async (email: string, password: string, username: string): Promise<any> => {
    // Mock registration logic
    setIsLoading(true);
    try {
      console.log(`Register attempt: ${email}, ${username}`);
      const mockUser = {
        id: 'user-123',
        email,
        username: username || email.split('@')[0],
        roles: ['client'],
        created_at: new Date().toISOString(),
        avatarUrl: null,
        profileImageUrl: null,
        user_metadata: {
          username: username || email.split('@')[0],
          avatar_url: null,
        },
        ubxBalance: 0,
        name: username || email.split('@')[0],
      };
      setUser(mockUser);
      setIsAuthenticated(true);
      return { success: true, user: mockUser };
    } catch (err) {
      setError('Failed to register');
      return { success: false, error: 'Failed to register' };
    } finally {
      setIsLoading(false);
    }
  };

  const checkRole = (role: string): boolean => {
    if (!user) return false;
    return user.roles?.includes(role) || false;
  };

  // Add other required methods with basic implementations
  const updateUserProfile = async () => true;
  const updateUser = async () => true;
  const updateProfile = async () => true;
  const loadUserProfile = async () => user;
  const refreshProfile = async () => {};
  const sendPasswordResetEmail = async () => ({ success: true });
  const resetPassword = async () => ({ success: true });
  const requestPasswordReset = async () => ({ success: true });
  const verifyEmail = async () => ({ success: true });
  const updatePassword = async () => true;
  const deleteAccount = async () => true;
  
  return {
    user,
    profile,
    isAuthenticated,
    isLoading,
    loading,
    error,
    initialized,
    login,
    logout,
    signIn,
    signOut,
    register,
    checkRole,
    updateUserProfile,
    updateUser,
    updateProfile,
    loadUserProfile,
    refreshProfile,
    sendPasswordResetEmail,
    resetPassword,
    requestPasswordReset,
    verifyEmail,
    updatePassword,
    deleteAccount
  };
};

export default useAuth;
