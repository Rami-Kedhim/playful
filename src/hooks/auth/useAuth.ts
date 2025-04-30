
import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [initialized, setInitialized] = useState(false);
  
  useEffect(() => {
    // Mock user data
    setUser({
      id: 'user-123',
      email: 'user@example.com',
      displayName: 'Demo User',
      roles: ['user']
    });
    
    setProfile({
      id: 'profile-123',
      subscription_tier: 'standard'
    });
    
    setIsLoading(false);
    setIsAuthenticated(true);
    setInitialized(true);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Mock authentication
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setUser({
        id: 'user-123',
        email,
        displayName: 'Demo User',
        roles: ['user']
      });
      
      setIsAuthenticated(true);
      setError(null);
      return { success: true, user: user };
    } catch (err: any) {
      setError(err.message || 'Login failed');
      return { success: false, error: err.message || 'Login failed' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      // Mock logout
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setUser(null);
      setProfile(null);
      setIsAuthenticated(false);
      setError(null);
      return true;
    } catch (err: any) {
      setError(err.message || 'Logout failed');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, username?: string) => {
    setIsLoading(true);
    try {
      // Mock registration
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser = {
        id: 'user-' + Date.now(),
        email,
        username: username || email.split('@')[0],
        displayName: username || email.split('@')[0],
        roles: ['user']
      };
      
      setUser(newUser);
      setIsAuthenticated(true);
      setError(null);
      
      return { success: true, user: newUser };
    } catch (err: any) {
      setError(err.message || 'Registration failed');
      return { success: false, error: err.message || 'Registration failed' };
    } finally {
      setIsLoading(false);
    }
  };

  const checkRole = (role: string) => {
    if (!user) return false;
    return user.roles?.includes(role) || false;
  };

  const sendPasswordResetEmail = async (email: string) => {
    try {
      // Mock password reset
      await new Promise(resolve => setTimeout(resolve, 800));
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Password reset failed' };
    }
  };

  // Alias methods
  const signIn = login;
  const signOut = logout;
  
  return {
    user,
    profile,
    isLoading,
    loading: isLoading,
    error,
    isAuthenticated,
    initialized,
    login,
    logout,
    register,
    signIn,
    signOut,
    checkRole,
    sendPasswordResetEmail,
    updateUser: async () => true,
    updateUserProfile: async () => true,
    updateProfile: async () => true,
    loadUserProfile: async () => profile,
    refreshProfile: async () => profile,
    requestPasswordReset: sendPasswordResetEmail,
    resetPassword: async () => ({ success: true }),
    verifyEmail: async () => ({ success: true }),
    updatePassword: async () => true,
    deleteAccount: async () => true
  };
};

export default useAuth;
