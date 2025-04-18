
import { useState } from 'react';
import { User } from '@supabase/supabase-js';

export interface AuthResult {
  success: boolean;
  error?: string;
  user?: User;
}

export const useAuthentication = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const login = async (email: string, password: string): Promise<AuthResult> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Mock successful login
      await new Promise(r => setTimeout(r, 800));
      
      // Return success with mock user
      return {
        success: true,
        user: { id: '1', email } as User
      };
    } catch (err: any) {
      setError(err.message);
      return {
        success: false,
        error: err.message
      };
    } finally {
      setIsLoading(false);
    }
  };
  
  const register = async (email: string, password: string): Promise<AuthResult> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Mock successful registration
      await new Promise(r => setTimeout(r, 1000));
      
      // Return success with mock user
      return {
        success: true,
        user: { id: '1', email } as User
      };
    } catch (err: any) {
      setError(err.message);
      return {
        success: false,
        error: err.message
      };
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    isLoading,
    error,
    login,
    register
  };
};
