import { useState, useEffect, createContext } from 'react';
import type { UserProfile, AuthContextType } from '@/types/user';

// Create the context with default values
export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  signIn: async () => false,
  signOut: async () => {},
  signUp: async () => false,
  resetPassword: async () => false,
  updateProfile: async () => false
});

export const useAuthContext = () => {
  const [user, setUserProfile] = useState<UserProfile | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUserProfile(parsedUser);
        setIsAuthenticated(true);
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const signIn = async (email: string, password: string): Promise<boolean> => {
    // Mock sign-in implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockUser: UserProfile = {
          id: '1',
          name: 'Test User',
          email: email,
          username: 'testuser',
          is_escort: false,
          is_verified: true,
          verified: true
        };
        setUserProfile(mockUser);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(mockUser));
        resolve(true);
      }, 500);
    });
  };

  const signOut = async (): Promise<void> => {
    // Mock sign-out implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        setUserProfile(null);
        setProfile(null);
        setIsAuthenticated(false);
        localStorage.removeItem('user');
        resolve();
      }, 500);
    });
  };

  const signUp = async (email: string, password: string, userData?: any): Promise<boolean> => {
    // Mock sign-up implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockUser: UserProfile = {
          id: '2',
          name: userData?.name || 'New User',
          email: email,
          username: userData?.username || 'newuser',
          is_escort: false,
          is_verified: false,
          verified: false
        };
        setUserProfile(mockUser);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(mockUser));
        resolve(true);
      }, 500);
    });
  };

  const resetPassword = async (email: string): Promise<boolean> => {
    // Mock reset password implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Password reset email sent to:', email);
        resolve(true);
      }, 500);
    });
  };

  const updateProfile = async (data: Partial<UserProfile>): Promise<boolean> => {
    // Mock update profile implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        setProfile(prevProfile => ({ ...prevProfile, ...data }));
        resolve(true);
      }, 500);
    });
  };

  const createUserProfile = async (userData: any) => {
    // Mock user profile creation
    return new Promise((resolve) => {
      setTimeout(() => {
        setProfile(userData);
        resolve(true);
      }, 500);
    });
  };

  // Create the auth context value
  const authContextValue: AuthContextType = {
    user,
    profile,
    isAuthenticated,
    isLoading,
    signIn,
    signOut,
    signUp,
    resetPassword,
    updateProfile,
    setUser: setUserProfile  // Add this to match AuthContextType
  };

  return authContextValue;
};
