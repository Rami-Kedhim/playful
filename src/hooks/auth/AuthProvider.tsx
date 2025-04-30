
import React, { createContext, useState, useEffect, useCallback } from 'react';
import { AuthContextType } from './useAuthContext';

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
  const login = async (email: string, password: string): Promise<any> => {
    try {
      setIsLoading(true);
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser = { id: '1', email, roles: ['user'] };
      const mockProfile = { id: '1', name: 'Test User', email };
      
      setUser(mockUser);
      setProfile(mockProfile);
      setIsAuthenticated(true);
      setError(null);
      
      return { success: true, user: mockUser };
    } catch (err: any) {
      setError(err.message || 'Failed to login');
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
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
      setError(null);
      
      return true;
    } catch (err: any) {
      setError(err.message || 'Failed to logout');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, username?: string): Promise<any> => {
    try {
      setIsLoading(true);
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockUser = { id: '1', email, username, roles: ['user'] };
      const mockProfile = { id: '1', name: username || email.split('@')[0], email };
      
      setUser(mockUser);
      setProfile(mockProfile);
      setIsAuthenticated(true);
      setError(null);
      
      return { success: true, user: mockUser };
    } catch (err: any) {
      setError(err.message || 'Failed to register');
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (data: any): Promise<boolean> => {
    try {
      setIsLoading(true);
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setProfile(prev => ({ ...prev, ...data }));
      setError(null);
      
      return true;
    } catch (err: any) {
      setError(err.message || 'Failed to update profile');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const updateUserProfile = updateProfile;
  const updateUser = updateProfile;

  const loadUserProfile = async (): Promise<any> => {
    try {
      setIsLoading(true);
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 600));
      
      setError(null);
      return profile;
    } catch (err: any) {
      setError(err.message || 'Failed to load user profile');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const refreshProfile = loadUserProfile;
  
  const updatePassword = async (oldPassword: string, newPassword: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 700));
      
      setError(null);
      return true;
    } catch (err: any) {
      setError(err.message || 'Failed to update password');
      return false;
    } finally {
      setIsLoading(false);
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
      setError(null);
      
      return true;
    } catch (err: any) {
      setError(err.message || 'Failed to delete account');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const sendPasswordResetEmail = async (email: string): Promise<any> => {
    try {
      // Mock implementation
      await new Promise(resolve => setTimeout(resolve, 500));
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  };

  const resetPassword = async (token: string, newPassword: string): Promise<any> => {
    try {
      // Mock implementation
      await new Promise(resolve => setTimeout(resolve, 500));
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  };

  const requestPasswordReset = sendPasswordResetEmail;

  const verifyEmail = async (token: string): Promise<any> => {
    try {
      // Mock implementation
      await new Promise(resolve => setTimeout(resolve, 500));
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  };

  // Role checking function
  const checkRole = useCallback((role: string): boolean => {
    if (!user) return false;
    
    // Check if user has roles array
    const roles = user.roles || [];
    
    return Array.isArray(roles) ? roles.includes(role) : false;
  }, [user]);

  // Initialize auth state
  useEffect(() => {
    const checkAuthState = async () => {
      try {
        // For demo purposes, automatically log in a mock user
        const mockUser = { 
          id: 'user-demo', 
          email: 'demo@example.com', 
          roles: ['user'],
          username: 'demouser'
        };
        
        const mockProfile = { 
          id: 'profile-demo', 
          name: 'Demo User',
          email: 'demo@example.com',
          ubx_balance: 1000
        };
        
        setUser(mockUser);
        setProfile(mockProfile);
        setIsAuthenticated(true);
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
    signIn: login,
    signOut: logout,
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
    checkRole,
    session: null
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Export hook for easier usage
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
