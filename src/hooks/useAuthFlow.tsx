
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/auth/useAuth';
import { toast } from '@/components/ui/use-toast';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  username?: string;
  full_name?: string;
}

export function useAuthFlow(redirectTo: string = '/') {
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, login, register, logout } = useAuth();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      // Get intended destination from query params or use default
      const params = new URLSearchParams(location.search);
      const from = params.get('from') || redirectTo;
      navigate(from);
    }
  }, [isAuthenticated, navigate, location.search, redirectTo]);

  const handleLogin = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    setAuthError(null);
    
    try {
      const result = await login(credentials);
      if (!result.success) {
        setAuthError(result.error || 'Failed to login');
        toast({
          title: 'Login Failed',
          description: result.error || 'Please check your credentials and try again',
          variant: 'destructive',
        });
      }
    } catch (error: any) {
      console.error('Login error:', error);
      setAuthError(error.message || 'An unexpected error occurred');
      toast({
        title: 'Login Error',
        description: error.message || 'An unexpected error occurred',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (credentials: RegisterCredentials) => {
    setIsLoading(true);
    setAuthError(null);
    
    try {
      const result = await register(credentials);
      if (!result.success) {
        setAuthError(result.error || 'Failed to register');
        toast({
          title: 'Registration Failed',
          description: result.error || 'Please check your information and try again',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Registration Successful',
          description: 'Your account has been created successfully',
        });
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      setAuthError(error.message || 'An unexpected error occurred');
      toast({
        title: 'Registration Error',
        description: error.message || 'An unexpected error occurred',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await logout();
      navigate('/auth');
      toast({
        title: 'Logged Out',
        description: 'You have been successfully logged out',
      });
    } catch (error: any) {
      console.error('Logout error:', error);
      toast({
        title: 'Logout Error',
        description: error.message || 'An error occurred while logging out',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    authError,
    handleLogin,
    handleRegister,
    handleLogout,
    isAuthenticated
  };
}
