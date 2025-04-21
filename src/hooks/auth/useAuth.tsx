
import { useState, useEffect, useCallback } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin' | 'escort' | 'client';
}

interface Profile {
  userId: string;
  displayName: string;
  bio?: string;
  subscription_tier?: string;
  isEscort?: boolean;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Mock login function
  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser = {
        id: 'user-123',
        name: 'Test User',
        email,
        role: 'user' as const
      };
      
      const mockProfile = {
        userId: 'user-123',
        displayName: 'Test Profile',
        subscription_tier: 'basic',
        isEscort: false
      };
      
      setUser(mockUser);
      setProfile(mockProfile);
      setError(null);
      return true;
    } catch (err: any) {
      setError(err.message || 'Failed to login');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Mock logout function
  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setUser(null);
      setProfile(null);
      setError(null);
      return true;
    } catch (err: any) {
      setError(err.message || 'Failed to logout');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Mock check auth status on initial load
  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      try {
        // Simulate API call to check authentication
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // For demo, create a mock user
        const mockUser = {
          id: 'user-123',
          name: 'Test User',
          email: 'user@example.com',
          role: 'user' as const
        };
        
        const mockProfile = {
          userId: 'user-123',
          displayName: 'Test Profile',
          subscription_tier: 'basic',
          isEscort: false
        };
        
        setUser(mockUser);
        setProfile(mockProfile);
      } catch (err: any) {
        setError(err.message || 'Authentication check failed');
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  return {
    user,
    profile,
    isLoading,
    error,
    login,
    logout
  };
};

export default useAuth;
