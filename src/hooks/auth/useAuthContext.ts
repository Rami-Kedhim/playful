
import { useState, useEffect, useCallback } from 'react';
import { User } from '@/types/user';
import { UserRole } from '@/types/user';

export const useAuthContext = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const login = useCallback(async (email: string, password: string) => {
    // Mock login implementation
    try {
      setLoading(true);
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
        },
        ubxBalance: 100,
        name: 'Test User',
        created_at: new Date().toISOString(),
      };
      
      // Save to local storage
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      setUser(mockUser);
      return { success: true, user: mockUser };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Invalid credentials' };
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (credentials: { email: string; password: string; username?: string }) => {
    // Mock registration implementation
    try {
      setLoading(true);
      
      // Simulate registration process
      console.log('Register attempt with', credentials);
      
      // Create mock user
      const mockUser: User = {
        id: 'user-' + Date.now(),
        email: credentials.email,
        role: UserRole.USER, // Set the role properly
        username: credentials.username || credentials.email.split('@')[0],
        avatarUrl: null,
        profileImageUrl: null,
        user_metadata: {
          username: credentials.username || credentials.email.split('@')[0],
          avatar_url: null,
        },
        ubxBalance: 50,
        name: credentials.username || 'New User',
        created_at: new Date().toISOString(),
      };
      
      // Save to local storage
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      setUser(mockUser);
      return { success: true, user: mockUser };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: 'Registration failed' };
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('user');
    setUser(null);
    return { success: true };
  }, []);
  
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
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return {
    user,
    setUser,
    login,
    logout,
    register,
    loading,
    isAuthenticated: !!user,
  };
};
