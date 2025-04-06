import { supabase } from "@/integrations/supabase/client";

export const usePasswordManagement = (setIsLoading: (loading: boolean) => void) => {
  const resetPassword = async (email: string) => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });
      
      if (error) {
        throw error;
      }
    } finally {
      setIsLoading(false);
    }
  };

  const updatePassword = async (oldPassword: string, newPassword: string) => {
    try {
      setIsLoading(true);
      
      // If oldPassword is empty, we're in a password reset flow (not an update flow)
      if (!oldPassword) {
        const { error } = await supabase.auth.updateUser({
          password: newPassword,
        });
        
        if (error) {
          throw error;
        }
        return;
      }
      
      // Otherwise, we're in a password update flow (user knows current password)
      // Get current user email
      const { data: { user } } = await supabase.auth.getUser();
      if (!user || !user.email) {
        throw new Error("User not found or email not available");
      }
      
      // First, sign in with the old password to verify it
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: oldPassword,
      });
      
      if (signInError) {
        throw new Error("Current password is incorrect");
      }
      
      // Then update the password
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });
      
      if (error) {
        throw error;
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { resetPassword, updatePassword };
};
