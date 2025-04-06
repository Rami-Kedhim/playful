
import React from 'react';
import { supabase } from "@/integrations/supabase/client";

export const usePasswordManagement = (setIsLoading: (loading: boolean) => void) => {
  // Reset password through email
  const resetPassword = async (email: string) => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (error) throw error;
      
      return { success: true };
    } catch (error: any) {
      console.error("Error resetting password:", error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Update user's password (requires user to be authenticated)
  const updatePassword = async (newPassword: string) => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });
      
      if (error) throw error;
      
      return { success: true };
    } catch (error: any) {
      console.error("Error updating password:", error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  return { resetPassword, updatePassword };
};
