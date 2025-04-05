
import React from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { handleAuthError, updateLastOnline } from "@/utils/authStateUtils";

export const useAuthActions = (
  setIsLoading: (value: boolean) => void,
  refreshProfile: () => Promise<void>
) => {
  // Sign up function
  const signUp = async (email: string, password: string, userData?: Record<string, any>) => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          data: userData || {}
        }
      });
      
      if (error) {
        toast({
          title: "Sign up failed",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }
      
      toast({
        title: "Sign up successful",
        description: "Please check your email to verify your account",
      });
    } catch (error: any) {
      console.error("Error signing up:", error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Sign in function
  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        toast({
          title: "Sign in failed",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }
      
      toast({
        title: "Welcome back!",
        description: "You have successfully signed in",
      });
      
      // Update last_online status in profile
      const userData = await supabase.auth.getUser();
      if (userData.data.user) {
        await updateLastOnline(userData.data.user.id);
      }
    } catch (error: any) {
      console.error("Error signing in:", error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Sign out function
  const signOut = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        toast({
          title: "Sign out failed",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }
      
      toast({
        title: "Signed out",
        description: "You have been signed out successfully",
      });
    } catch (error: any) {
      console.error("Error signing out:", error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { signUp, signIn, signOut };
};
