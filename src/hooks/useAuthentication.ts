
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
      return result;
    } catch (err: any) {
      const errorMessage = err.message || 'An unexpected error occurred during sign in';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, [auth]);
  
  const signUp = useCallback(async (email: string, password: string, username?: string): Promise<AuthResult> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await auth.signUp(email, password, username);
      return result;
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
      const result = await auth.resetPassword(email);
      return result.success;
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
      const success = await auth.updateUserProfile(data);
      return success;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to update profile';
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
      if (auth.verifyEmail) {
        return await auth.verifyEmail(token);
      }
      return false;
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
      if (auth.sendVerificationEmail) {
        return await auth.sendVerificationEmail();
      }
      return false;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to send verification email';
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [auth]);
  
  return {
    signIn,
    signUp,
    signOut,
    resetPassword,
    updateProfile,
    verifyEmail,
    sendVerificationEmail,
    isLoading,
    error,
    clearError: () => setError(null),
  };
};

export default useAuthentication;
