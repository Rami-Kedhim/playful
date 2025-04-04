
import { Escort } from "@/types/escort";
import { toast } from "@/components/ui/use-toast";

/**
 * Custom hook for managing escort gallery images
 */
export const useGalleryManagement = (
  updateEscortProfile: (id: string, updates: Partial<Escort>) => Promise<Escort | null>
) => {
  /**
   * Add an image to the escort's gallery
   */
  const addGalleryImage = async (id: string, imageUrl: string, escort?: Escort | null) => {
    try {
      if (!escort) {
        console.error("Cannot add gallery image: Escort not found");
        return null;
      }
      
      // Get existing gallery or initialize empty array
      const existingGallery = escort.gallery || escort.gallery_images || [];
      
      // Avoid duplicates
      if (existingGallery.includes(imageUrl)) {
        console.log("Image already exists in gallery");
        return escort;
      }
      
      // Update profile with new gallery array
      const updatedEscort = await updateEscortProfile(id, {
        gallery: [...existingGallery, imageUrl]
      });
      
      if (updatedEscort) {
        toast({
          title: "Image added",
          description: "Image has been added to your gallery"
        });
      }
      
      return updatedEscort;
    } catch (error) {
      console.error("Error adding gallery image:", error);
      toast({
        title: "Error adding image",
        description: "Failed to add image to your gallery",
        variant: "destructive"
      });
      return null;
    }
  };
  
  /**
   * Remove an image from the escort's gallery
   */
  const removeGalleryImage = async (id: string, imageUrl: string, escort?: Escort | null) => {
    try {
      if (!escort) {
        console.error("Cannot remove gallery image: Escort not found");
        return null;
      }
      
      // Get existing gallery or initialize empty array
      const existingGallery = escort.gallery || escort.gallery_images || [];
      
      // Check if image exists in gallery
      if (!existingGallery.includes(imageUrl)) {
        console.log("Image not found in gallery");
        return escort;
      }
      
      // Filter out the image
      const updatedGallery = existingGallery.filter(img => img !== imageUrl);
      
      // Update profile with filtered gallery array
      const updatedEscort = await updateEscortProfile(id, {
        gallery: updatedGallery
      });
      
      if (updatedEscort) {
        toast({
          title: "Image removed",
          description: "Image has been removed from your gallery"
        });
      }
      
      return updatedEscort;
    } catch (error) {
      console.error("Error removing gallery image:", error);
      toast({
        title: "Error removing image",
        description: "Failed to remove image from your gallery",
        variant: "destructive"
      });
      return null;
    }
  };
  
  return {
    addGalleryImage,
    removeGalleryImage
  };
};
