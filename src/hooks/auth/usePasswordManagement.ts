import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { AuthResult } from '@/types/auth';

export function usePasswordManagement() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const validatePassword = async (password: string): Promise<AuthResult> => {
    setIsLoading(true);
    setError(null);
    
    // Password criteria
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    const validationErrors: string[] = [];
    
    if (password.length < minLength) {
      validationErrors.push(`Password must be at least ${minLength} characters`);
    }
    if (!hasUppercase) {
      validationErrors.push("Password must contain at least one uppercase letter");
    }
    if (!hasLowercase) {
      validationErrors.push("Password must contain at least one lowercase letter");
    }
    if (!hasNumber) {
      validationErrors.push("Password must contain at least one number");
    }
    if (!hasSpecialChar) {
      validationErrors.push("Password must contain at least one special character");
    }
    
    const isPasswordValid = validationErrors.length === 0;
    
    setIsLoading(false);
    
    // If validation fails
    if (!isPasswordValid) {
      return {
        success: false,
        user: null,
        session: null,
        error: validationErrors.join(", ")
      };
    }
    
    // If validation passes
    return {
      success: true,
      user: null,
      session: null
    };
  };
  
  const resetPassword = async (email: string): Promise<AuthResult> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/password/update`,
      });
      
      if (error) {
        throw error;
      }
      
      setIsLoading(false);
      
      return {
        success: true,
        user: null,
        session: null
      };
    } catch (error: any) {
      setIsLoading(false);
      setError(error.message || "Failed to reset password");
      
      return {
        success: false,
        user: null,
        session: null,
        error
      };
    }
  };
  
  return {
    validatePassword,
    resetPassword,
    isLoading,
    error
  };
}
