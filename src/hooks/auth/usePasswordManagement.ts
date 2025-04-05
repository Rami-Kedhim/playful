
import React from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

export const usePasswordManagement = (setIsLoading: (value: boolean) => void) => {
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

  return { resetPassword, updatePassword };
};
