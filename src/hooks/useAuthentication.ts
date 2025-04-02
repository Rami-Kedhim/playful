
import { useState } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { useProfile } from "./useProfile";

export const useAuthentication = (
  setIsLoading: (value: boolean) => void,
  refreshProfile: () => Promise<void>
) => {
  const { fetchProfile, updateProfile } = useProfile();

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
        await supabase
          .from('profiles')
          .update({ last_online: new Date().toISOString() })
          .eq('id', userData.data.user.id);
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

  // Reset password function
  const resetPassword = async (email: string) => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (error) {
        toast({
          title: "Password reset failed",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }
      
      toast({
        title: "Password reset email sent",
        description: "Please check your email for the password reset link",
      });
    } catch (error: any) {
      console.error("Error resetting password:", error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Update password function
  const updatePassword = async (newPassword: string) => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      
      if (error) {
        toast({
          title: "Password update failed",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }
      
      toast({
        title: "Password updated",
        description: "Your password has been updated successfully",
      });
    } catch (error: any) {
      console.error("Error updating password:", error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { signUp, signIn, signOut, resetPassword, updatePassword };
};
