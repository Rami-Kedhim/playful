
import { useState, useEffect, useCallback } from 'react';
import { AuthContextType, User, UserProfile, AuthResult } from '@/types/auth';

export const useAuth = (): AuthContextType => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  
  const checkRole = useCallback((role: string): boolean => {
    if (!user) return false;
    
    if (user.roles && Array.isArray(user.roles)) {
      return user.roles.includes(role as any);
    }
    
    return user.role === role;
  }, [user]);
  
  const signIn = useCallback(async (email: string, password: string): Promise<AuthResult> => {
    try {
      // Mock implementation
      const mockUser: User = {
        id: 'user123',
        email,
        username: email.split('@')[0],
        role: 'user',
        isVerified: true,
        name: email.split('@')[0],
        createdAt: new Date().toISOString()
      };
      
      setUser(mockUser);
      return { success: true, user: mockUser };
    } catch (err) {
      setError('Failed to sign in');
      return { success: false, error: 'Authentication failed' };
    }
  }, []);
  
  const signUp = useCallback(async (email: string, password: string, name?: string): Promise<AuthResult> => {
    try {
      // Mock implementation
      const mockUser: User = {
        id: 'user' + Date.now(),
        email,
        username: name || email.split('@')[0],
        role: 'user',
        isVerified: false,
        name: name || email.split('@')[0],
        createdAt: new Date().toISOString()
      };
      
      setUser(mockUser);
      return { success: true, user: mockUser };
    } catch (err) {
      setError('Failed to create account');
      return { success: false, error: 'Registration failed' };
    }
  }, []);
  
  const signOut = useCallback(async (): Promise<void> => {
    setUser(null);
    setProfile(null);
  }, []);
  
  const updateUserProfile = useCallback(async (data: Partial<UserProfile>): Promise<boolean> => {
    try {
      if (profile) {
        const updatedProfile = { ...profile, ...data };
        setProfile(updatedProfile);
        return true;
      }
      return false;
    } catch (err) {
      setError('Failed to update profile');
      return false;
    }
  }, [profile]);
  
  const refreshProfile = useCallback(async (): Promise<void> => {
    if (!user) return;
    
    try {
      // Mock implementation
      const mockProfile: UserProfile = {
        id: user.id,
        userId: user.id,
        username: user.username || '',
        email: user.email,
        displayName: user.name || user.username || '',
        location: '',
        bio: '',
        isVerified: user.isVerified || false,
        website: '',
        avatarUrl: '',
        joinedDate: new Date(),
        avatar_url: '',
        phone: ''
      };
      
      setProfile(mockProfile);
    } catch (err) {
      setError('Failed to refresh profile');
    }
  }, [user]);
  
  const resetPassword = useCallback(async (email: string): Promise<AuthResult> => {
    try {
      // Mock implementation
      return { success: true };
    } catch (err) {
      return { success: false, error: 'Password reset failed' };
    }
  }, []);
  
  const sendPasswordResetEmail = useCallback(async (email: string): Promise<boolean> => {
    try {
      // Mock implementation
      return true;
    } catch (err) {
      return false;
    }
  }, []);
  
  const updatePassword = useCallback(async (oldPassword: string, newPassword: string): Promise<boolean> => {
    try {
      // Mock implementation
      return true;
    } catch (err) {
      return false;
    }
  }, []);
  
  useEffect(() => {
    // Initialize auth state
    setIsLoading(false);
  }, []);
  
  return {
    user,
    profile,
    isLoading,
    isAuthenticated: !!user,
    error,
    signIn,
    signUp,
    signOut,
    login: signIn, // Alias for backward compatibility
    register: signUp, // Alias for backward compatibility
    logout: signOut, // Alias for backward compatibility
    checkRole,
    updateUserProfile,
    refreshProfile,
    resetPassword,
    sendPasswordResetEmail,
    userRoles: user?.roles || [user?.role || 'user'],
    updatePassword,
    setUser,
    updateProfile: updateUserProfile,
  };
};

export default useAuth;
