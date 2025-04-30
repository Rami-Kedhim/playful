
import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';

export interface AuthUser {
  id: string;
  email: string;
  displayName?: string;
  roles?: string[];
  [key: string]: any;
}

export interface AuthContextType {
  user: AuthUser | null;
  profile: any | null;
  isLoading: boolean;
  loading: boolean; // Alias for isLoading for backward compatibility
  error: string | null;
  isAuthenticated: boolean;
  initialized: boolean;
  login: (email: string, password: string) => Promise<any>;
  logout: () => Promise<boolean>;
  register: (email: string, password: string, username?: string) => Promise<any>;
  checkRole: (role: string) => boolean;
  // Alias methods
  signIn: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<boolean>;
  signup: (email: string, password: string, username?: string) => Promise<any>; // Alias for register
  // Additional methods
  sendPasswordResetEmail: (email: string) => Promise<any>;
  updateUser: (user: Partial<AuthUser>) => Promise<boolean>;
  updateUserProfile: (profile: any) => Promise<boolean>;
  updateProfile: (profile: any) => Promise<boolean>;
  loadUserProfile: () => Promise<any>;
  refreshProfile: () => Promise<any>;
  requestPasswordReset: (email: string) => Promise<any>;
  resetPassword: (token: string, password: string) => Promise<any>;
  verifyEmail: (token: string) => Promise<any>;
  updatePassword: (currentPassword: string, newPassword: string) => Promise<boolean>;
  deleteAccount: () => Promise<boolean>;
}

// Create the initial context
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider props
interface AuthProviderProps {
  children: ReactNode;
}

// Auth Provider component
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<AuthUser | null>(null);
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

  // Login function
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

  // Logout function
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

  // Register function
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

  // Check role function
  const checkRole = (role: string) => {
    if (!user) return false;
    return user.roles?.includes(role) || false;
  };

  // Password reset function
  const sendPasswordResetEmail = async (email: string) => {
    try {
      // Mock password reset
      await new Promise(resolve => setTimeout(resolve, 800));
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Password reset failed' };
    }
  };

  // Update user function
  const updateUser = async () => true;
  
  // Update user profile function
  const updateUserProfile = async () => true;
  
  // Update profile function
  const updateProfile = async () => true;
  
  // Load user profile function
  const loadUserProfile = async () => profile;
  
  // Refresh profile function
  const refreshProfile = async () => profile;
  
  // Request password reset function
  const requestPasswordReset = sendPasswordResetEmail;
  
  // Reset password function
  const resetPassword = async () => ({ success: true });
  
  // Verify email function
  const verifyEmail = async () => ({ success: true });
  
  // Update password function
  const updatePassword = async () => true;
  
  // Delete account function
  const deleteAccount = async () => true;

  // Alias methods
  const signIn = login;
  const signOut = logout;
  const signup = register;
  
  // Create context value
  const value: AuthContextType = {
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
    signup,
    checkRole,
    sendPasswordResetEmail,
    updateUser,
    updateUserProfile,
    updateProfile,
    loadUserProfile,
    refreshProfile,
    requestPasswordReset,
    resetPassword,
    verifyEmail,
    updatePassword,
    deleteAccount
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default useAuth;
