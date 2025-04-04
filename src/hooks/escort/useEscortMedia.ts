
import { Escort } from "@/types/escort";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

/**
 * Custom hook for managing escort media (images, videos)
 */
export const useEscortMedia = (
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
  
  /**
   * Add a video to escort videos
   */
  const addVideo = async (id: string, videoUrl: string, escort: Escort | null) => {
    if (!escort) {
      toast({
        title: "Error adding video",
        description: "Profile not found",
        variant: "destructive",
      });
      return null;
    }
    
    const videos = escort.videos || [];
    
    // Check if video already exists
    if (videos.includes(videoUrl)) {
      toast({
        title: "Video exists",
        description: "This video is already in your collection",
      });
      return escort;
    }
    
    try {
      const updatedEscort = await updateEscortProfile(id, {
        videos: [...videos, videoUrl]
      });
      
      if (updatedEscort) {
        toast({
          title: "Video added",
          description: "Video has been added to your collection",
        });
      }
      
      return updatedEscort;
    } catch (error) {
      console.error("Error adding video:", error);
      toast({
        title: "Error adding video",
        description: "Failed to add video to collection",
        variant: "destructive",
      });
      return null;
    }
  };
  
  /**
   * Remove a video from escort videos
   */
  const removeVideo = async (id: string, videoUrl: string, escort: Escort | null) => {
    if (!escort) {
      toast({
        title: "Error removing video",
        description: "Profile not found",
        variant: "destructive",
      });
      return null;
    }
    
    const videos = escort.videos || [];
    
    if (!videos.includes(videoUrl)) {
      toast({
        title: "Video not found",
        description: "This video is not in your collection",
      });
      return escort;
    }
    
    try {
      const updatedEscort = await updateEscortProfile(id, {
        videos: videos.filter(v => v !== videoUrl)
      });
      
      if (updatedEscort) {
        toast({
          title: "Video removed",
          description: "Video has been removed from your collection",
        });
      }
      
      return updatedEscort;
    } catch (error) {
      console.error("Error removing video:", error);
      toast({
        title: "Error removing video",
        description: "Failed to remove video from collection",
        variant: "destructive",
      });
      return null;
    }
  };

  return {
    addGalleryImage,
    removeGalleryImage,
    setProfileImage,
    addVideo,
    removeVideo
  };
};
