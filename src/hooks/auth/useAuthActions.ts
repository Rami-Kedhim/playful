import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AuthResult } from "@/types/auth";
import { toast } from "@/components/ui/use-toast";

export function useAuthActions() {
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string): Promise<AuthResult> => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ 
        email, 
        password 
      });
      
      if (error) throw error;
      
      return { success: true };
    } catch (error: any) {
      return { 
        success: false, 
        error: error.message || "Failed to login. Please check your credentials." 
      };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, username?: string): Promise<AuthResult> => {
    setIsLoading(true);
    
    try {
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
      
      toast({
        title: "Registration successful",
        description: "Your account has been created successfully.",
      });
      
      return { success: true };
    } catch (error: any) {
      return { 
        success: false, 
        error: error.message || "Registration failed. Please try again." 
      };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<AuthResult> => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) throw error;
      
      toast({
        title: "Logged out successfully",
        description: "You have been logged out successfully.",
      });
      
      return { success: true };
    } catch (error: any) {
      return { 
        success: false, 
        error: error.message || "Failed to logout. Please try again." 
      };
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithEmail = async (email: string, password: string): Promise<AuthResult> => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ 
        email, 
        password 
      });
      
      if (error) throw error;
      
      return {
        success: true,
        user: null,
        session: null
      };
    } catch (error) {
      return {
        success: false,
        user: null,
        session: null,
        error
      };
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithProvider = async (provider: Provider): Promise<AuthResult> => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithProvider({ 
        provider 
      });
      
      if (error) throw error;
      
      return {
        success: true,
        user: null,
        session: null
      };
    } catch (error) {
      return {
        success: false,
        user: null,
        session: null,
        error
      };
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async (): Promise<AuthResult> => {
    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) throw error;
      
      return {
        success: true,
        user: null,
        session: null
      };
    } catch (error) {
      return {
        success: false,
        user: null,
        session: null,
        error
      };
    } finally {
      setIsLoading(false);
    }
  };

  return { 
    login, 
    register, 
    logout,
    signInWithEmail,
    signInWithProvider,
    signOut,
    isLoading 
  };
}

export default useAuthActions;
