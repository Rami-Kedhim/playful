
import { useAuthActions } from "./useAuthActions";
import { usePasswordManagement } from "./usePasswordManagement";
import { useProfileManagement } from "./useProfileManagement";

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
    updateProfile
  };
};
