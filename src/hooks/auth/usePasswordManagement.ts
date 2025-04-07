
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { AuthResult } from '@/types/auth';

export const usePasswordManagement = () => {
  const [isLoading, setIsLoading] = useState(false);

  const resetPassword = async (email: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Password reset email sent",
        description: "Check your email for the password reset link.",
      });

      return true;
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to send reset email",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const updatePassword = async (currentPassword: string, newPassword: string): Promise<AuthResult> => {
    setIsLoading(true);
    try {
      // First verify current password by trying to sign in
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: supabase.auth.getUser().then(res => res.data.user?.email || ''),
        password: currentPassword,
      });

      if (signInError) {
        return {
          success: false,
          error: "Current password is incorrect"
        };
      }

      // Update to new password
      const { error } = await supabase.auth.updateUser({ password: newPassword });

      if (error) {
        throw error;
      }

      toast({
        title: "Password updated",
        description: "Your password has been successfully updated.",
      });

      return { success: true };
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update password",
        variant: "destructive",
      });
      return {
        success: false,
        error: error.message
      };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    resetPassword,
    updatePassword,
    isLoading
  };
};

export default usePasswordManagement;
