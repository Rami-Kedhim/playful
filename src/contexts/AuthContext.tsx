
import React, { createContext, useState, useEffect, useCallback } from 'react';
import { AuthContextType } from '@/hooks/auth/useAuthContext';

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<any | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [initialized, setInitialized] = useState<boolean>(false);

  // Mock authentication functions
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setUser({ id: '1', email, roles: ['user'] });
      setProfile({ id: '1', name: 'Test User', email });
      setIsAuthenticated(true);
      setIsLoading(false);
      setError(null);
      return true;
    } catch (err: any) {
      setError(err.message || 'Failed to login');
      setIsLoading(false);
      return false;
    }
  };
  
  const logout = async (): Promise<boolean> => {
    try {
      setIsLoading(true);
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setUser(null);
      setProfile(null);
      setIsAuthenticated(false);
      setIsLoading(false);
      setError(null);
      return true;
    } catch (err: any) {
      setError(err.message || 'Failed to logout');
      setIsLoading(false);
      return false;
    }
  };

  const register = async (email: string, password: string, userData: any): Promise<boolean> => {
    try {
      setIsLoading(true);
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setUser({ id: '1', email });
      setProfile({ id: '1', ...userData, email });
      setIsAuthenticated(true);
      setIsLoading(false);
      setError(null);
      return true;
    } catch (err: any) {
      setError(err.message || 'Failed to register');
      setIsLoading(false);
      return false;
    }
  };

  const updateProfile = async (data: any): Promise<boolean> => {
    try {
      setIsLoading(true);
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setProfile(prev => ({ ...prev, ...data }));
      setIsLoading(false);
      setError(null);
      return true;
    } catch (err: any) {
      setError(err.message || 'Failed to update profile');
      setIsLoading(false);
      return false;
    }
  };

  const updateUserProfile = updateProfile;
  const updateUser = updateProfile;

  const loadUserProfile = async (): Promise<any> => {
    try {
      setIsLoading(true);
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 600));
      
      const profileData = { ...profile };
      setProfile(profileData);
      setIsLoading(false);
      setError(null);
      return profileData;
    } catch (err: any) {
      setError(err.message || 'Failed to load user profile');
      setIsLoading(false);
      return null;
    }
  };

  const refreshProfile = loadUserProfile;
  
  const updatePassword = async (oldPassword: string, newPassword: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 700));
      
      setIsLoading(false);
      setError(null);
      return true;
    } catch (err: any) {
      setError(err.message || 'Failed to update password');
      setIsLoading(false);
      return false;
    }
  };

  const deleteAccount = async (): Promise<boolean> => {
    try {
      setIsLoading(true);
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      setUser(null);
      setProfile(null);
      setIsAuthenticated(false);
      setIsLoading(false);
      setError(null);
      return true;
    } catch (err: any) {
      setError(err.message || 'Failed to delete account');
      setIsLoading(false);
      return false;
    }
  };

  // Alias for other methods expected by components
  const signIn = login;
  const signOut = logout;

  const sendPasswordResetEmail = async (email: string): Promise<boolean> => {
    try {
      // Mock implementation
      await new Promise(resolve => setTimeout(resolve, 500));
      return true;
    } catch (err) {
      return false;
    }
  };

  const resetPassword = async (token: string, newPassword: string): Promise<boolean> => {
    try {
      // Mock implementation
      await new Promise(resolve => setTimeout(resolve, 500));
      return true;
    } catch (err) {
      return false;
    }
  };

  const requestPasswordReset = sendPasswordResetEmail;

  const verifyEmail = async (token: string): Promise<boolean> => {
    try {
      // Mock implementation
      await new Promise(resolve => setTimeout(resolve, 500));
      return true;
    } catch (err) {
      return false;
    }
  };

  // Role checking function
  const checkRole = useCallback((role: string): boolean => {
    if (!user) return false;
    
    // Check if user has metadata with roles
    const roles = user.roles || (user.app_metadata?.roles || []);
    
    return Array.isArray(roles) ? roles.includes(role) : false;
  }, [user]);

  // Initialize auth state
  useEffect(() => {
    const checkAuthState = async () => {
      try {
        // Mock API call to check if user is already logged in
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Simulate no existing session
        setUser(null);
        setProfile(null);
        setIsAuthenticated(false);
        setIsLoading(false);
        setInitialized(true);
      } catch (err) {
        setIsLoading(false);
        setInitialized(true);
      }
    };
    
    checkAuthState();
  }, []);

  const value: AuthContextType = {
    isAuthenticated,
    user,
    profile,
    isLoading,
    loading: isLoading,
    error,
    initialized,
    login,
    logout,
    signIn,
    signOut,
    register,
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
    deleteAccount,
    checkRole
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Add this export to fix imports from other files
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

