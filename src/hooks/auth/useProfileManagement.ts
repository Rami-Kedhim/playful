
import { useProfile } from "@/hooks/useProfile";

export const useProfileManagement = () => {
  const { fetchProfile, updateProfile, checkUsernameAvailability } = useProfile();
  
  return {
    fetchProfile,
    updateProfile,
    checkUsernameAvailability
  };
};
