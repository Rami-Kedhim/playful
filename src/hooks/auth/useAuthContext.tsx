
import React, { createContext, useState, useEffect, useContext } from 'react';
import { User, UserProfile } from '@/types/user';
import { AuthContextType, AuthResult } from '@/types/authTypes';
import { orus } from '@/core';

// Create the auth context with default values
export const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
  isLoading: true,
  error: null,
  isAuthenticated: false,
  initialized: false,
  
  login: async () => ({ success: false }),
  signIn: async () => ({ success: false }),
  logout: async () => false,
  signOut: async () => false,
  register: async () => ({ success: false }),
  
  updateUser: async () => false,
  updateUserProfile: async () => false,
  updateProfile: async () => false,
  loadUserProfile: async () => null,
  refreshProfile: async () => {},
  
  sendPasswordResetEmail: async () => false,
  resetPassword: async () => false,
  requestPasswordReset: async () => false,
  verifyEmail: async () => false,
  updatePassword: async () => false,
  
  deleteAccount: async () => false,
  checkRole: () => false
});

export const useAuthContext = () => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [initialized, setInitialized] = useState(false);

  // Initialize auth state
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Mock authentication check for now
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          
          // Validate session with Orus
          const sessionResult = orus.validateSession(userData.id);
          if (sessionResult.isValid) {
            setUser(userData);
            
            // Mock profile data
            const profileData = {
              ...userData,
              user_id: userData.id
            } as UserProfile;
            
            setProfile(profileData);
          } else {
            // Session expired, clear local storage
            localStorage.removeItem('user');
            setUser(null);
            setProfile(null);
          }
        }
      } catch (err) {
        console.error('Auth check failed:', err);
        setError('Authentication check failed');
        setUser(null);
        setProfile(null);
      } finally {
        setLoading(false);
        setInitialized(true);
      }
    };

    checkAuth();
  }, []);

  // Login method
  const login = async (email: string, password: string): Promise<AuthResult> => {
    setLoading(true);
    setError(null);
    
    try {
      // Mock login for now
      const mockUser: User = {
        id: `user-${Date.now()}`,
        email,
        name: email.split('@')[0],
        username: email.split('@')[0],
        is_verified: true,
        verified: true,
        is_escort: false
      };
      
      const mockProfile: UserProfile = {
        id: mockUser.id,
        user_id: mockUser.id,
        name: mockUser.name,
        email: mockUser.email,
        username: mockUser.username,
        verified: true,
        is_verified: true
      };
      
      // Store user data in local storage
      localStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
      setProfile(mockProfile);
      
      return { 
        success: true,
        user: mockUser,
        message: 'Login successful'
      };
    } catch (err: any) {
      const errorMsg = err.message || 'Login failed';
      setError(errorMsg);
      return { 
        success: false, 
        message: errorMsg
      };
    } finally {
      setLoading(false);
    }
  };

  // Register method
  const register = async (email: string, password: string): Promise<AuthResult> => {
    setLoading(true);
    setError(null);
    
    try {
      // Mock registration
      const mockUser: User = {
        id: `user-${Date.now()}`,
        email,
        name: email.split('@')[0],
        username: email.split('@')[0],
        is_verified: false,
        verified: false,
        is_escort: false
      };
      
      const mockProfile: UserProfile = {
        id: mockUser.id,
        user_id: mockUser.id,
        name: mockUser.name,
        username: mockUser.username,
        email: mockUser.email,
        is_verified: false,
        verified: false
      };
      
      // Store user data
      localStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
      setProfile(mockProfile);
      
      return { 
        success: true,
        user: mockUser,
        message: 'Registration successful'
      };
    } catch (err: any) {
      const errorMsg = err.message || 'Registration failed';
      setError(errorMsg);
      return { 
        success: false, 
        message: errorMsg
      };
    } finally {
      setLoading(false);
    }
  };

  // Logout method
  const logout = async (): Promise<boolean> => {
    try {
      localStorage.removeItem('user');
      setUser(null);
      setProfile(null);
      return true;
    } catch (err) {
      console.error('Logout failed:', err);
      return false;
    }
  };

  // Update user profile
  const updateUserProfile = async (profileData: Partial<UserProfile>): Promise<boolean> => {
    if (!user) return false;
    
    try {
      const updatedProfile = { ...profile, ...profileData, user_id: user.id };
      setProfile(updatedProfile as UserProfile);
      
      // If we're updating fields that are also in the user object, update those too
      const userFields = ['name', 'username', 'avatar_url', 'avatarUrl'];
      const userUpdates: Partial<User> = {};
      
      userFields.forEach(field => {
        if (field in profileData) {
          userUpdates[field as keyof User] = profileData[field as keyof UserProfile] as any;
        }
      });
      
      if (Object.keys(userUpdates).length > 0) {
        setUser({ ...user, ...userUpdates });
        
        // Update localStorage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          localStorage.setItem('user', JSON.stringify({ ...userData, ...userUpdates }));
        }
      }
      
      return true;
    } catch (err) {
      console.error('Failed to update profile:', err);
      return false;
    }
  };

  // Check if user has role
  const checkRole = (role: string): boolean => {
    if (!user) return false;
    
    if (user.roles && Array.isArray(user.roles)) {
      return user.roles.includes(role);
    }
    
    if (user.role) {
      return user.role === role;
    }
    
    return false;
  };

  // We implement the AuthContextType interface
  const authContextValue: AuthContextType = {
    user,
    profile,
    loading,
    isLoading: loading,
    error,
    isAuthenticated: !!user,
    initialized,
    
    login,
    signIn: login,
    logout,
    signOut: logout,
    register,
    
    updateUser: updateUserProfile,
    updateUserProfile,
    updateProfile: updateUserProfile,
    loadUserProfile: async () => profile,
    refreshProfile: async () => {},
    
    sendPasswordResetEmail: async () => false,
    requestPasswordReset: async () => false,
    resetPassword: async () => false,
    verifyEmail: async () => false,
    updatePassword: async () => false,
    
    deleteAccount: async () => false,
    checkRole
  };

  return authContextValue;
};

export default useAuthContext;
