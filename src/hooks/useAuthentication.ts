
// Import necessary modules
import { useState } from 'react';
import { useAuth } from '@/hooks/auth/useAuthContext';
import { useToast } from '@/components/ui/use-toast';
import { useProfile } from '@/hooks/useProfile';

export const useAuthentication = () => {
  const auth = useAuth();
  const { toast } = useToast();
  const { loadProfile, profile, updateProfile } = useProfile();
  const [loading, setLoading] = useState(false);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Simulate login
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock login success
      auth.setUser({
        id: '123',
        email,
        name: 'User',
        roles: ['user']
      });
      
      // Load profile after login
      if (auth.user) {
        await loadProfile(auth.user.id);
      }
      
      toast({
        title: 'Welcome back!',
        description: 'You have been successfully logged in.',
      });
      
      return true;
    } catch (error: any) {
      toast({
        title: 'Login failed',
        description: error.message || 'An error occurred during login',
        variant: 'destructive',
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string) => {
    setLoading(true);
    try {
      // Simulate registration
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock register success
      auth.setUser({
        id: '123',
        email,
        name,
        roles: ['user']
      });
      
      toast({
        title: 'Registration successful!',
        description: 'Your account has been created.',
      });
      
      return true;
    } catch (error: any) {
      toast({
        title: 'Registration failed',
        description: error.message || 'An error occurred during registration',
        variant: 'destructive',
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      // Simulate logout
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Clear user data
      auth.setUser(null);
      
      toast({
        title: 'Logged out',
        description: 'You have been successfully logged out.',
      });
    } catch (error: any) {
      toast({
        title: 'Logout failed',
        description: error.message || 'An error occurred during logout',
        variant: 'destructive',
      });
    }
  };

  return {
    login,
    register,
    logout,
    loading,
    user: auth.user,
    isAuthenticated: !!auth.user
  };
};

export default useAuthentication;
