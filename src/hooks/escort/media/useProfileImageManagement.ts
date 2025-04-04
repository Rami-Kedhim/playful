
import { Escort } from "@/types/escort";
import { toast } from "@/components/ui/use-toast";

/**
 * Custom hook for managing the escort's profile image
 */
export const useProfileImageManagement = (
  updateEscortProfile: (id: string, updates: Partial<Escort>) => Promise<Escort | null>
) => {
  /**
   * Set profile image
   */
  const setProfileImage = async (id: string, imageUrl: string) => {
    try {
      const updatedEscort = await updateEscortProfile(id, {
        imageUrl: imageUrl
      });
      
      if (updatedEscort) {
        toast({
          title: "Profile image updated",
          description: "Your profile image has been updated successfully",
        });
      }
      
      return updatedEscort;
    } catch (error) {
      console.error("Error updating profile image:", error);
      toast({
        title: "Error updating profile image",
        description: "Failed to update profile image",
        variant: "destructive",
      });
      return null;
    }
  };
  
  return {
    setProfileImage
  };
};
