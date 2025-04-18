
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthUser, AuthResult, AuthContextType } from '@/types/authTypes';

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userRoles, setUserRoles] = useState<string[]>([]);
  
  useEffect(() => {
    // Initialize auth state
    const checkAuth = async () => {
      try {
        setIsLoading(true);
        // Implementation would go here in a real app
        setIsLoading(false);
      } catch (err) {
        setError('Authentication error');
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, []);
  
  const login = async (email: string, password: string): Promise<AuthResult> => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Mock implementation
      const mockUser: AuthUser = {
        id: '123',
        email,
        app_metadata: {},
        user_metadata: {},
        aud: 'authenticated'
      };
      
      setUser(mockUser);
      return { success: true, user: mockUser };
    } catch (err: any) {
      setError(err.message || 'Login failed');
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  };
  
  const logout = async (): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      
      setUser(null);
      setProfile(null);
      setUserRoles([]);
    } catch (err: any) {
      setError(err.message || 'Logout failed');
    } finally {
      setIsLoading(false);
    }
  };
  
  const register = async (email: string, password: string, username?: string): Promise<AuthResult> => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Mock implementation
      const mockUser: AuthUser = {
        id: '123',
        email,
        username,
        app_metadata: {},
        user_metadata: {},
        aud: 'authenticated'
      };
      
      setUser(mockUser);
      return { success: true, user: mockUser };
    } catch (err: any) {
      setError(err.message || 'Registration failed');
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  };
  
  const resetPassword = async (email: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Mock implementation
      return true;
    } catch (err: any) {
      setError(err.message || 'Password reset failed');
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  const updateUserProfile = async (userData: Partial<AuthUser>): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Mock implementation
      if (user) {
        setUser({ ...user, ...userData });
      }
      
      return true;
    } catch (err: any) {
      setError(err.message || 'Profile update failed');
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  const clearError = () => {
    setError(null);
  };
  
  const refreshProfile = async (): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Mock implementation
      // Would typically fetch user profile here
    } catch (err: any) {
      setError(err.message || 'Profile refresh failed');
    } finally {
      setIsLoading(false);
    }
  };
  
  const checkRole = (role: string): boolean => {
    return userRoles.includes(role);
  };
  
  const updatePassword = async (oldPassword: string, newPassword: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Mock implementation
      return true;
    } catch (err: any) {
      setError(err.message || 'Password update failed');
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Create the context value
  const contextValue: AuthContextType = {
    user,
    login,
    logout,
    isLoading,
    error,
    isAuthenticated: !!user,
    userRoles,
    register,
    resetPassword,
    updateUserProfile,
    clearError,
    profile,
    refreshProfile,
    checkRole,
    updatePassword
  };
  
  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};

export default useAuth;
