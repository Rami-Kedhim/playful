
import { useState } from 'react';
import { useAuth } from '@/hooks/auth/useAuth';
import { toast } from '@/hooks/use-toast';

export const useAuthFlow = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login, register, resetPassword, logout } = useAuth();

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await login(email, password);
      
      if (!result.success) {
        setError(result.error || 'Failed to log in');
        return false;
      }
      
      toast({
        title: "Login successful",
        description: "Welcome back!",
        variant: "success"
      });
      
      return true;
    } catch (err: any) {
      setError(err.message || 'An error occurred during login');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (email: string, password: string, username?: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // Fixed argument count
      const result = await register(email, password);
      
      if (!result.success) {
        setError(result.error || 'Failed to register');
        return false;
      }
      
      toast({
        title: "Registration successful",
        description: "Your account has been created",
        variant: "success"
      });
      
      return true;
    } catch (err: any) {
      setError(err.message || 'An error occurred during registration');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (email: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await resetPassword(email);
      
      if (!result.success) {
        setError(result.error || 'Failed to send reset password email');
        return false;
      }
      
      toast({
        title: "Password reset email sent",
        description: "Check your inbox for instructions",
        variant: "success"
      });
      
      return true;
    } catch (err: any) {
      setError(err.message || 'An error occurred');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    setIsLoading(true);
    setError(null);

    try {
      await logout();
      
      toast({
        title: "Logged out",
        description: "You have been successfully logged out",
      });
      
      return true;
    } catch (err: any) {
      setError(err.message || 'An error occurred during logout');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    setError,
    handleLogin,
    handleRegister,
    handleResetPassword,
    handleLogout
  };
};

export default useAuthFlow;
