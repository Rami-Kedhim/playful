
import { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

export function usePasswordManagement() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // Reset password through email
  const resetPassword = async (email: string): Promise<void> => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (error) {
        toast({
          title: "Error resetting password",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }
      
      toast({
        title: "Password reset email sent",
        description: "Check your email for the password reset link",
      });
    } catch (error: any) {
      console.error("Error resetting password:", error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Update user's password (requires user to be authenticated)
  const updatePassword = async (oldPassword: string, newPassword: string): Promise<void> => {
    try {
      setIsLoading(true);
      // Note: Supabase doesn't require the old password to update, but we're keeping
      // the parameter for interface consistency and potential future validation
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });
      
      if (error) {
        toast({
          title: "Error updating password",
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
  
  return { resetPassword, updatePassword, isLoading };
}
