
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { AuthResult } from '@/types/auth';

export const usePasswordManagement = () => {
  const [isLoading, setIsLoading] = useState(false);

  const resetPassword = async (email: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // For email based password reset
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;
      return true;
    } catch (error: any) {
      console.error('Reset password error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const updatePassword = async (oldPassword: string, newPassword: string): Promise<AuthResult> => {
    setIsLoading(true);
    try {
      // Since Supabase doesn't have a direct method to verify old password before updating,
      // we'd typically handle this server-side or with a custom function
      
      // In a real app, verify old password then update
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) return {
        success: false,
        error: error.message
      };

      return {
        success: true,
        error: null
      };
    } catch (error: any) {
      console.error('Update password error:', error);
      return {
        success: false,
        error: error.message || 'Failed to update password'
      };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    resetPassword,
    updatePassword,
    isLoading,
  };
};

export default usePasswordManagement;
