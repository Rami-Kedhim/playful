
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/auth/useAuthContext';
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
  const { isAuthenticated, signIn, signUp, signOut, error } = useAuth();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      // Get intended destination from query params or use default
      const params = new URLSearchParams(location.search);
      const from = params.get('from') || redirectTo;
      navigate(from);
    }
  }, [isAuthenticated, navigate, location.search, redirectTo]);

  // Keep local error state synchronized with auth context error
  useEffect(() => {
    if (error) {
      setAuthError(error);
    }
  }, [error]);

  const handleLogin = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    setAuthError(null);
    
    try {
      const result = await signIn(credentials.email, credentials.password);
      // Success is determined by the isAuthenticated state changing
      if (!result.success) {
        setAuthError(result.error || 'An unexpected error occurred');
        toast({
          title: 'Login Error',
          description: result.error || 'An unexpected error occurred',
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
      const result = await signUp(credentials.email, credentials.password, {
        full_name: credentials.full_name,
        username: credentials.username
      });
      // Success is determined by the isAuthenticated state changing
      if (!result.success) {
        setAuthError(result.error || 'An unexpected error occurred');
        toast({
          title: 'Registration Error',
          description: result.error || 'An unexpected error occurred',
          variant: 'destructive',
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
      await signOut();
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
