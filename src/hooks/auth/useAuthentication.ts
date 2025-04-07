
import { supabase } from "@/integrations/supabase/client";

export const useAuthentication = (
  setIsLoading: (value: boolean) => void,
  refreshProfile: () => Promise<void>
) => {
  // Sign up function
  const signUp = async (email: string, password: string, username?: string) => {
    const userData = username ? { username } : undefined;
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData,
        }
      });
      
      return { data, error };
    } catch (error: any) {
      console.error("Error during signup:", error);
      return { data: null, error };
    }
  };
  
  // Sign in function
  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      return { data, error };
    } catch (error: any) {
      console.error("Error during signin:", error);
      return { data: null, error };
    }
  };
  
  // Sign out function
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        throw error;
      }
      
      return true;
    } catch (error) {
      console.error("Error during signout:", error);
      return false;
    }
  };
  
  // Reset password function
  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (error) {
        throw error;
      }
      
      return true;
    } catch (error) {
      console.error("Error during password reset:", error);
      return false;
    }
  };
  
  // Update password function
  const updatePassword = async (oldPassword: string, newPassword: string) => {
    try {
      // Verify the old password first by attempting to sign in
      const { error: verifyError } = await supabase.auth.signInWithPassword({
        email: (await supabase.auth.getUser()).data.user?.email || '',
        password: oldPassword,
      });
      
      if (verifyError) {
        throw new Error("Current password is incorrect");
      }
      
      // Update to the new password
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });
      
      if (error) {
        throw error;
      }
      
      return true;
    } catch (error: any) {
      console.error("Error updating password:", error.message);
      return false;
    }
  };
  
  // Update profile function
  const updateProfile = async (userId: string, userData: any) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update(userData)
        .eq('id', userId);
      
      if (error) {
        throw error;
      }
      
      return true;
    } catch (error) {
      console.error("Error updating profile:", error);
      return false;
    }
  };
  
  return {
    signUp,
    signIn,
    signOut,
    resetPassword,
    updatePassword,
    updateProfile
  };
};

export default useAuthentication;
