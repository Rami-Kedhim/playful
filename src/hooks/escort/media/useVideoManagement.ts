
import { Escort, Video } from "@/types/escort";
import { toast } from "@/components/ui/use-toast";
import { v4 as uuidv4 } from 'uuid';

interface VideoManagementProps {
  updateEscortProfile: (id: string, updates: Partial<Escort>) => Promise<Escort | null>;
}

/**
 * Custom hook for managing escort videos
 */
export const useVideoManagement = ({ updateEscortProfile }: VideoManagementProps) => {
  /**
   * Add a video to the escort profile
   */
  const addVideo = async (id: string, videoUrl: string, escort?: Escort | null) => {
    try {
      // Create new video object
      const newVideo: Video = {
        id: uuidv4(),
        url: videoUrl,
        title: `Video ${Date.now()}`
      };
      
      // Get existing videos or initialize empty array
      const existingVideos = escort?.videos || [];
      
      // Update profile with new videos array
      const updatedEscort = await updateEscortProfile(id, {
        videos: [...existingVideos, newVideo]
      });
      
      if (updatedEscort) {
        toast({
          title: "Video added",
          description: "Video has been added to your profile"
        });
      }
      
      return updatedEscort;
    } catch (error) {
      console.error("Error adding video:", error);
      toast({
        title: "Error adding video",
        description: "Failed to add video to your profile",
        variant: "destructive"
      });
      return null;
    }
  };
  
  /**
   * Remove a video from the escort profile
   */
  const removeVideo = async (id: string, videoIdOrUrl: string, escort?: Escort | null) => {
    try {
      if (!escort) {
        console.error("Cannot remove video: Escort not found");
        return null;
      }
      
      const existingVideos = escort.videos || [];
      
      // Filter out the video by ID or URL
      const updatedVideos = existingVideos.filter(
        video => video.id !== videoIdOrUrl && video.url !== videoIdOrUrl
      );
      
      // Update profile with filtered videos array
      const updatedEscort = await updateEscortProfile(id, {
        videos: updatedVideos
      });
      
      if (updatedEscort) {
        toast({
          title: "Video removed",
          description: "Video has been removed from your profile"
        });
      }
      
      return updatedEscort;
    } catch (error) {
      console.error("Error removing video:", error);
      toast({
        title: "Error removing video",
        description: "Failed to remove video from your profile",
        variant: "destructive"
      });
      return null;
    }
  };
  
  return {
    addVideo,
    removeVideo
  };
};
