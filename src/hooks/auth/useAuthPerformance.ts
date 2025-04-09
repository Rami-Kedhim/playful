
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { AuthResult } from '@/types/auth';

/**
 * Hook for optimized authentication operations
 */
export function useAuthPerformance() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const performLogin = async (email: string, password: string): Promise<AuthResult> => {
    if (!email || !password) {
      setError("Email and password are required");
      toast({
        title: "Login failed",
        description: "Email and password are required",
        variant: "destructive",
      });
      return { success: false, error: "Email and password are required" };
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      console.log("Attempting login for:", email);
      const { data, error } = await supabase.auth.signInWithPassword({ 
        email, 
        password 
      });
      
      if (error) throw error;
      
      toast({
        title: "Login successful",
        description: "You have been logged in successfully",
      });
      
      return { success: true, user: data.user };
    } catch (error: any) {
      const errorMessage = error.message || "Login failed. Please check your credentials.";
      setError(errorMessage);
      
      toast({
        title: "Login failed",
        description: errorMessage,
        variant: "destructive",
      });
      
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const clearErrors = () => {
    setError(null);
  };

  return {
    performLogin,
    clearErrors,
    isLoading,
    error
  };
}

export default useAuthPerformance;
