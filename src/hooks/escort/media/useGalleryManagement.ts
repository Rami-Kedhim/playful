
import { Escort } from "@/types/escort";
import { toast } from "@/components/ui/use-toast";

/**
 * Custom hook for managing the escort's image gallery
 */
export const useGalleryManagement = (
  updateEscortProfile: (id: string, updates: Partial<Escort>) => Promise<Escort | null>
) => {
  /**
   * Add an image to escort gallery
   */
  const addGalleryImage = async (id: string, imageUrl: string, escort: Escort | null) => {
    if (!escort) {
      toast({
        title: "Error adding image",
        description: "Profile not found",
        variant: "destructive",
      });
      return null;
    }
    
    const gallery = escort.gallery || [];
    
    // Check if image already exists
    if (gallery.includes(imageUrl)) {
      toast({
        title: "Image exists",
        description: "This image is already in your gallery",
      });
      return escort;
    }
    
    try {
      const updatedEscort = await updateEscortProfile(id, {
        gallery: [...gallery, imageUrl]
      });
      
      if (updatedEscort) {
        toast({
          title: "Image added",
          description: "Image has been added to your gallery",
        });
      }
      
      return updatedEscort;
    } catch (error) {
      console.error("Error adding gallery image:", error);
      toast({
        title: "Error adding image",
        description: "Failed to add image to gallery",
        variant: "destructive",
      });
      return null;
    }
  };
  
  /**
   * Remove an image from escort gallery
   */
  const removeGalleryImage = async (id: string, imageUrl: string, escort: Escort | null) => {
    if (!escort) {
      toast({
        title: "Error removing image",
        description: "Profile not found",
        variant: "destructive",
      });
      return null;
    }
    
    const gallery = escort.gallery || [];
    
    if (!gallery.includes(imageUrl)) {
      toast({
        title: "Image not found",
        description: "This image is not in your gallery",
      });
      return escort;
    }
    
    try {
      const updatedEscort = await updateEscortProfile(id, {
        gallery: gallery.filter(img => img !== imageUrl)
      });
      
      if (updatedEscort) {
        toast({
          title: "Image removed",
          description: "Image has been removed from your gallery",
        });
      }
      
      return updatedEscort;
    } catch (error) {
      console.error("Error removing gallery image:", error);
      toast({
        title: "Error removing image",
        description: "Failed to remove image from gallery",
        variant: "destructive",
      });
      return null;
    }
  };
  
  return {
    addGalleryImage,
    removeGalleryImage
  };
};
