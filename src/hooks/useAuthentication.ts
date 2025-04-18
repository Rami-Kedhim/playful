
import { useCallback } from 'react';
import { useAuth } from './auth/useAuthContext';
import { AuthResult } from '@/types/auth';

/**
 * Hook that provides authentication methods with loading state and error handling
 */
export const useAuthentication = () => {
  const auth = useAuth();
  
  // Sign in method with better error handling
  const signIn = useCallback(async (email: string, password: string): Promise<AuthResult> => {
    try {
      const result = await auth.signIn(email, password);
      return result;
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to sign in'
      };
    }
  }, [auth]);
  
  // Sign up method with better error handling
  const signUp = useCallback(async (email: string, password: string, name?: string): Promise<AuthResult> => {
    try {
      const result = await auth.signUp(email, password, name);
      return result;
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to sign up'
      };
    }
  }, [auth]);
  
  // Sign out method
  const signOut = useCallback(async (): Promise<void> => {
    if (auth.signOut) {
      await auth.signOut();
    }
  }, [auth]);
  
  // Update profile method
  const updateProfile = useCallback(async (data: any): Promise<boolean> => {
    if (auth.updateUserProfile) {
      return await auth.updateUserProfile(data);
    }
    return false;
  }, [auth]);
  
  // Reset password method (mock implementation)
  const resetPassword = useCallback(async (email: string): Promise<AuthResult> => {
    console.log('Reset password requested for', email);
    return {
      success: true,
      error: null
    };
  }, []);
  
  // Send password reset email (mock implementation)
  const sendPasswordResetEmail = useCallback(async (email: string): Promise<AuthResult> => {
    console.log('Send password reset email to', email);
    return { 
      success: true,
      error: null
    };
  }, []);
  
  // Update password
  const updatePassword = useCallback(async (oldPassword: string, newPassword: string): Promise<boolean> => {
    if (auth.updatePassword) {
      return await auth.updatePassword(oldPassword, newPassword);
    }
    return false;
  }, [auth]);
  
  // Verify email (mock implementation)
  const verifyEmail = useCallback(async (token: string): Promise<AuthResult> => {
    console.log('Verify email with token', token);
    return {
      success: true,
      error: null
    };
  }, []);
  
  // Send verification email (mock implementation)
  const sendVerificationEmail = useCallback(async (): Promise<AuthResult> => {
    console.log('Send verification email requested');
    return {
      success: true,
      error: null
    };
  }, []);
  
  return {
    ...auth,
    signIn,
    signUp,
    signOut,
    updateProfile,
    resetPassword,
    sendPasswordResetEmail,
    updatePassword,
    verifyEmail,
    sendVerificationEmail,
  };
};

export default useAuthentication;
