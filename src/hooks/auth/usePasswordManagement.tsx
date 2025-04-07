
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

interface PasswordResetResult {
  success: boolean;
  error?: string;
}

export const usePasswordManagement = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  /**
   * Request a password reset email
   * @param email Email address to send reset instructions to
   * @returns Object indicating success or error
   */
  const resetPassword = async (email: string): Promise<PasswordResetResult> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });
      
      if (error) throw error;
      
      return { success: true };
    } catch (error: any) {
      setError(error.message || "Failed to send password reset instructions");
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };
  
  /**
   * Update user's password
   * @param currentPassword Current password for verification
   * @param newPassword New password to set
   * @returns Object indicating success or error
   */
  const updatePassword = async (currentPassword: string, newPassword: string): Promise<PasswordResetResult> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // First verify the current password by attempting to sign in
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: supabase.auth.getUser().then(({ data }) => data.user?.email || ''),
        password: currentPassword,
      });
      
      if (signInError) {
        throw new Error("Current password is incorrect");
      }
      
      // Now update to the new password
      const { error } = await supabase.auth.updateUser({ 
        password: newPassword 
      });
      
      if (error) throw error;
      
      toast({
        title: "Password updated",
        description: "Your password has been updated successfully",
      });
      
      return { success: true };
    } catch (error: any) {
      const errorMessage = error.message || "Failed to update password";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };
  
  /**
   * Complete a password recovery from the reset link
   * @param newPassword New password to set
   * @returns Object indicating success or error
   */
  const completePasswordRecovery = async (newPassword: string): Promise<PasswordResetResult> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { error } = await supabase.auth.updateUser({ 
        password: newPassword 
      });
      
      if (error) throw error;
      
      toast({
        title: "Password reset successful",
        description: "Your password has been reset successfully. You can now log in with your new password.",
      });
      
      return { success: true };
    } catch (error: any) {
      setError(error.message || "Failed to reset password");
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };
  
  const clearError = () => setError(null);
  
  return { 
    resetPassword, 
    updatePassword, 
    completePasswordRecovery,
    isLoading, 
    error, 
    clearError 
  };
};
