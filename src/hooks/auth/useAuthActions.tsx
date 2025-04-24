
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { AuthResult } from '@/types/auth';
import { useAuth } from './useAuthContext';

export const useAuthActions = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { refreshProfile } = useAuth();
  
  /**
   * Log in a user with email and password
   */
  const login = async (email: string, password: string): Promise<AuthResult> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ 
        email, 
        password 
      });
      
      if (error) throw error;
      
      // Auth state listener will handle setting user, session, etc.
      return { success: true };
    } catch (error: any) {
      const errorMessage = error.message || "Failed to login. Please check your credentials.";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Register a new user with email and password
   */
  const register = async (email: string, password: string, username?: string): Promise<AuthResult> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Register with Supabase
      const { data, error } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          data: {
            username: username || email.split('@')[0],
            role: 'user',
          }
        }
      });
      
      if (error) throw error;

      toast.success("Registration successful", {
        description: "Your account has been created successfully."
      });
      
      // Auth state listener will handle the rest
      return { success: true };
    } catch (error: any) {
      const errorMessage = error.message || "Registration failed. Please try again.";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Log out the current user
   */
  const logout = async (): Promise<AuthResult> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) throw error;
      
      toast.success("Logged out successfully", {
        description: "You have been logged out successfully."
      });
      
      return { success: true };
    } catch (error: any) {
      const errorMessage = error.message || "Failed to logout. Please try again.";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => setError(null);
  
  return {
    login,
    register,
    logout,
    isLoading,
    error,
    clearError,
  };
};

export default useAuthActions;
