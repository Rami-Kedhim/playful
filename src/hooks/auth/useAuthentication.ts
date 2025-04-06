
import { useAuthActions } from "./useAuthActions";
import { usePasswordManagement } from "./usePasswordManagement";
import { useProfileManagement } from "./useProfileManagement";
import { supabase } from "@/integrations/supabase/client";

export const useAuthentication = (
  setIsLoading: (value: boolean) => void,
  refreshProfile: () => Promise<void>
) => {
  // Get authentication actions
  const { signUp, signIn, signOut } = useAuthActions(setIsLoading, refreshProfile);
  
  // Get password management functions
  const { resetPassword, updatePassword } = usePasswordManagement(setIsLoading);
  
  // Get profile management functions
  const { updateProfile } = useProfileManagement();

  return { 
    signUp, 
    signIn, 
    signOut, 
    resetPassword, 
    updatePassword,
    updateProfile: async (userId: string, userData: Partial<any>) => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('profiles')
          .update(userData)
          .eq('id', userId)
          .single();

        if (error) throw error;
        return data;
      } finally {
        setIsLoading(false);
      }
    }
  };
};
