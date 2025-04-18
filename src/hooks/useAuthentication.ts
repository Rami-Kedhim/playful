
import { useState, useCallback } from 'react';
import { useAuth } from './auth/useAuthContext';
import { AuthResult } from '@/types/auth';

export const useAuthentication = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const auth = useAuth();
  
  const signIn = useCallback(async (email: string, password: string): Promise<AuthResult> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await auth.signIn(email, password);
      
      if (result.success) {
        // Update the context with user data
        if (auth.setUser && result.user) {
          auth.setUser(result.user);
        }
        return result;
      } else {
        setError(result.error || 'Failed to sign in');
        return result;
      }
    } catch (err: any) {
      const errorMessage = err.message || 'An unexpected error occurred during sign in';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, [auth]);
  
  const signUp = useCallback(async (email: string, password: string, options?: any): Promise<AuthResult> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await auth.signUp(email, password, options);
      
      if (result.success) {
        // Update the context with user data if auto sign-in
        if (auth.setUser && result.user) {
          auth.setUser(result.user);
        }
        return result;
      } else {
        setError(result.error || 'Failed to sign up');
        return result;
      }
    } catch (err: any) {
      const errorMessage = err.message || 'An unexpected error occurred during sign up';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, [auth]);
  
  const signOut = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      await auth.signOut();
      
      // Clear user from context
      if (auth.setUser) {
        auth.setUser(null);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to sign out');
    } finally {
      setIsLoading(false);
    }
  }, [auth]);
  
  const resetPassword = useCallback(async (email: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Pass only the email parameter
      const result = await auth.sendPasswordResetEmail(email);
      if (!result) {
        setError('Failed to send password reset email');
      }
      return !!result;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to send password reset email';
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [auth]);
  
  const updateProfile = useCallback(async (data: any): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const success = await auth.updateProfile(data);
      if (!success) {
        setError('Failed to update profile');
      }
      return success;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to update profile';
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [auth]);
  
  const updatePassword = useCallback(async (newPassword: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const success = await auth.updatePassword(newPassword);
      if (!success) {
        setError('Failed to update password');
      }
      return success;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to update password';
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [auth]);
  
  const verifyEmail = useCallback(async (token: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const success = await auth.verifyEmail(token);
      if (!success) {
        setError('Failed to verify email');
      }
      return success;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to verify email';
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [auth]);
  
  const sendVerificationEmail = useCallback(async (): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const success = await auth.sendVerificationEmail();
      if (!success) {
        setError('Failed to send verification email');
      }
      return success;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to send verification email';
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [auth]);
  
  const clearError = useCallback(() => {
    setError(null);
  }, []);
  
  return {
    signIn,
    signUp,
    signOut,
    resetPassword,
    updateProfile,
    updatePassword,
    verifyEmail,
    sendVerificationEmail,
    isLoading,
    error,
    clearError,
    user: auth.user,
    profile: auth.profile,
    isAuthenticated: auth.isAuthenticated
  };
};

export default useAuthentication;
