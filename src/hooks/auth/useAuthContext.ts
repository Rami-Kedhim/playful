
import { useState, useEffect, useCallback } from 'react';
import { User, UserRole, UserProfile } from '@/types/user';
import { AuthContextType, AuthResult } from './types';

export const useAuthContext = (): AuthContextType => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [initialized, setInitialized] = useState(false);

  const login = useCallback(async (email: string, password: string): Promise<AuthResult> => {
    // Mock login implementation
    try {
      setLoading(true);
      setError(null);
      // In a real app, this would call an API
      console.log('Login attempt with', email);
      
      // Simulate successful login with mock user
      const mockUser: User = {
        id: 'user-1',
        email: email,
        role: UserRole.USER, // Set the role properly
        username: email.split('@')[0],
        avatarUrl: null,
        profileImageUrl: null,
        user_metadata: {
          username: email.split('@')[0],
          avatar_url: null,
          region: null,
          lastAiInteraction: null,
          aiConversationCount: 0,
          verification_request: null,
          aiFavoriteTopics: [],
          aiEnabled: true,
          role: 'user'
        },
        ubxBalance: 100,
        name: 'Test User',
        created_at: new Date().toISOString(),
      };
      
      // Save to local storage
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      setUser(mockUser);
      return { success: true, user: mockUser };
    } catch (error: any) {
      console.error('Login error:', error);
      setError(error.message || 'Login failed');
      return { success: false, error: 'Invalid credentials' };
    } finally {
      setLoading(false);
    }
  }, []);

  // Alias for login for API compatibility
  const signIn = useCallback(async (email: string, password: string): Promise<AuthResult> => {
    return login(email, password);
  }, [login]);

  const register = useCallback(async (email: string, password: string, confirmPassword: string): Promise<AuthResult> => {
    // Mock registration implementation
    try {
      setLoading(true);
      setError(null);
      
      if (password !== confirmPassword) {
        throw new Error('Passwords do not match');
      }
      
      // Simulate registration process
      console.log('Register attempt with', email);
      
      // Create mock user
      const mockUser: User = {
        id: 'user-' + Date.now(),
        email: email,
        role: UserRole.USER, // Set the role properly
        username: email.split('@')[0],
        avatarUrl: null,
        profileImageUrl: null,
        user_metadata: {
          username: email.split('@')[0],
          avatar_url: null,
          region: null,
          lastAiInteraction: null,
          aiConversationCount: 0,
          verification_request: null,
          aiFavoriteTopics: [],
          aiEnabled: true,
          role: 'user'
        },
        ubxBalance: 50,
        name: email.split('@')[0] || 'New User',
        created_at: new Date().toISOString(),
      };
      
      // Save to local storage
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      setUser(mockUser);
      return { success: true, user: mockUser };
    } catch (error: any) {
      console.error('Registration error:', error);
      setError(error.message || 'Registration failed');
      return { success: false, error: error.message || 'Registration failed' };
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async (): Promise<boolean> => {
    try {
      localStorage.removeItem('user');
      setUser(null);
      setProfile(null);
      return true;
    } catch (error) {
      console.error('Error during logout:', error);
      return false;
    }
  }, []);

  // Alias for logout for API compatibility
  const signOut = useCallback(async (): Promise<boolean> => {
    return logout();
  }, [logout]);
  
  const checkAuth = useCallback(() => {
    try {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (error) {
      console.error('Error checking auth:', error);
    } finally {
      setLoading(false);
      setInitialized(true);
    }
  }, []);

  const checkRole = useCallback((roleName: string): boolean => {
    if (!user) return false;

    // Check single role
    if (user.role && user.role.toString().toLowerCase() === roleName.toLowerCase()) {
      return true;
    }

    // Check for user_metadata.role
    if (user.user_metadata?.role && user.user_metadata.role.toLowerCase() === roleName.toLowerCase()) {
      return true;
    }

    return false;
  }, [user]);
  
  // Implement additional methods required by AuthContextType
  const updateUser = useCallback(async (userData: Partial<User>): Promise<boolean> => {
    try {
      if (!user) return false;
      
      const updatedUser = { ...user, ...userData };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      return true;
    } catch (error) {
      console.error('Error updating user:', error);
      return false;
    }
  }, [user]);
  
  const loadUserProfile = useCallback(async (): Promise<UserProfile | null> => {
    try {
      if (!user) return null;
      
      // Mock profile
      const mockProfile: UserProfile = {
        id: user.id,
        userId: user.id,
        displayName: user.name || user.username,
        email: user.email,
        createdAt: new Date(user.created_at),
        bio: 'Sample user bio',
        avatarUrl: user.avatarUrl || ''
      };
      
      setProfile(mockProfile);
      return mockProfile;
    } catch (error) {
      console.error('Error loading user profile:', error);
      return null;
    }
  }, [user]);
  
  const updateUserProfile = useCallback(async (profileData: Partial<UserProfile>): Promise<boolean> => {
    try {
      if (!profile) {
        await loadUserProfile();
      }
      
      if (profile) {
        const updatedProfile = { ...profile, ...profileData };
        setProfile(updatedProfile);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error updating profile:', error);
      return false;
    }
  }, [profile, loadUserProfile]);
  
  // Alias for updateUserProfile
  const updateProfile = useCallback((profileData: Partial<UserProfile>): Promise<boolean> => {
    return updateUserProfile(profileData);
  }, [updateUserProfile]);
  
  const refreshProfile = useCallback(async (): Promise<void> => {
    await loadUserProfile();
  }, [loadUserProfile]);
  
  const sendPasswordResetEmail = useCallback(async (email: string): Promise<boolean> => {
    try {
      console.log(`Password reset email sent to ${email}`);
      return true;
    } catch (error) {
      console.error('Error sending password reset:', error);
      return false;
    }
  }, []);
  
  // Alias for sendPasswordResetEmail
  const requestPasswordReset = useCallback((email: string): Promise<boolean> => {
    return sendPasswordResetEmail(email);
  }, [sendPasswordResetEmail]);
  
  const resetPassword = useCallback(async (password: string, token: string): Promise<boolean> => {
    try {
      console.log(`Password reset with token ${token}`);
      return true;
    } catch (error) {
      console.error('Error resetting password:', error);
      return false;
    }
  }, []);
  
  const verifyEmail = useCallback(async (token: string): Promise<boolean> => {
    try {
      console.log(`Email verified with token ${token}`);
      return true;
    } catch (error) {
      console.error('Error verifying email:', error);
      return false;
    }
  }, []);
  
  const updatePassword = useCallback(async (oldPassword: string, newPassword: string): Promise<boolean> => {
    try {
      console.log(`Password updated`);
      return true;
    } catch (error) {
      console.error('Error updating password:', error);
      return false;
    }
  }, []);
  
  const deleteAccount = useCallback(async (): Promise<boolean> => {
    try {
      await logout();
      console.log('Account deleted');
      return true;
    } catch (error) {
      console.error('Error deleting account:', error);
      return false;
    }
  }, [logout]);

  useEffect(() => {
    checkAuth();
    
    if (user && !profile) {
      loadUserProfile();
    }
  }, [checkAuth, user, profile, loadUserProfile]);

  return {
    user,
    profile,
    setUser,
    login,
    logout,
    signIn,
    signOut,
    register,
    loading,
    isLoading: loading,
    error,
    isAuthenticated: !!user,
    initialized,
    checkRole,
    updateUser,
    updateUserProfile,
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

// Export both names for compatibility
export const useAuth = useAuthContext;

export default useAuthContext;
