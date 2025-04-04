
import { Escort } from "@/types/escort";
import { toast } from "@/components/ui/use-toast";

/**
 * Custom hook for managing escort videos
 */
export const useVideoManagement = (
  updateEscortProfile: (id: string, updates: Partial<Escort>) => Promise<Escort | null>
) => {
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
    addVideo,
    removeVideo
  };
};
