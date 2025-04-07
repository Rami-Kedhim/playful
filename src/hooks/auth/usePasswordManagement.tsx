
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

export const usePasswordManagement = () => {
  const [isLoading, setIsLoading] = useState(false);

  // Reset password request
  const resetPassword = async (email: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (error) {
        toast({
          title: "Password reset failed",
          description: error.message,
          variant: "destructive",
        });
        return false;
      }
      
      toast({
        title: "Password reset email sent",
        description: "Please check your email for the password reset link",
      });
      return true;
    } catch (error: any) {
      toast({
        title: "Password reset failed",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Update password
  const updatePassword = async (oldPassword: string, newPassword: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // First verify the old password is correct
      const { error: verifyError } = await supabase.auth.signInWithPassword({
        email: supabase.auth.getUser().then(({ data }) => data.user?.email || ''),
        password: oldPassword,
      });
      
      if (verifyError) {
        toast({
          title: "Password update failed",
          description: "Current password is incorrect",
          variant: "destructive",
        });
        return false;
      }
      
      // Then update to the new password
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      
      if (error) {
        toast({
          title: "Password update failed",
          description: error.message,
          variant: "destructive",
        });
        return false;
      }
      
      toast({
        title: "Password updated",
        description: "Your password has been updated successfully",
      });
      return true;
    } catch (error: any) {
      toast({
        title: "Password update failed",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { resetPassword, updatePassword };
};
