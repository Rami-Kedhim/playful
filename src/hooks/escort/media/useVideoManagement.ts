
import { useState } from 'react';
import { Escort, Video } from '@/types/escort';
import { toast } from '@/components/ui/use-toast';

export const useVideoManagement = (
  updateEscortProfile: (id: string, updates: Partial<Escort>) => Promise<Escort | null>
) => {
  const [isAddingVideo, setIsAddingVideo] = useState(false);
  const [isRemovingVideo, setIsRemovingVideo] = useState(false);

  const addVideo = async (
    escortId: string, 
    videoUrl: string,
    escort?: Escort | null
  ) => {
    try {
      setIsAddingVideo(true);
      
      // Get current escort data if not provided
      const currentEscort = escort || await updateEscortProfile(escortId, {});
      if (!currentEscort) throw new Error("Escort not found");
      
      // Create new video object
      const newVideo: Video = {
        id: `video-${Date.now()}`,
        url: videoUrl,
        thumbnail: videoUrl.replace('.mp4', '.jpg'),
        title: "New Video",
        duration: 0,
        isPublic: true
      };
      
      // Add video to array
      const updatedVideos = [
        ...(currentEscort.videos || []),
        newVideo
      ];
      
      // Update escort profile
      const result = await updateEscortProfile(escortId, {
        videos: updatedVideos
      });
      
      if (result) {
        toast({
          title: "Video added",
          description: "The video has been added to your profile"
        });
      }
      
      return result;
    } catch (error) {
      console.error("Error adding video:", error);
      toast({
        title: "Error",
        description: "Failed to add video",
        variant: "destructive"
      });
      return null;
    } finally {
      setIsAddingVideo(false);
    }
  };
  
  const removeVideo = async (
    escortId: string,
    videoIdOrUrl: string,
    escort?: Escort | null
  ) => {
    try {
      setIsRemovingVideo(true);
      
      // Get current escort data if not provided
      const currentEscort = escort || await updateEscortProfile(escortId, {});
      if (!currentEscort) throw new Error("Escort not found");
      if (!currentEscort.videos) return currentEscort;
      
      // Filter out the video to remove
      const updatedVideos = currentEscort.videos.filter(video => 
        video.id !== videoIdOrUrl && video.url !== videoIdOrUrl
      );
      
      // Update escort profile
      const result = await updateEscortProfile(escortId, {
        videos: updatedVideos
      });
      
      if (result) {
        toast({
          title: "Video removed",
          description: "The video has been removed from your profile"
        });
      }
      
      return result;
    } catch (error) {
      console.error("Error removing video:", error);
      toast({
        title: "Error",
        description: "Failed to remove video",
        variant: "destructive"
      });
      return null;
    } finally {
      setIsRemovingVideo(false);
    }
  };
  
  return {
    addVideo,
    removeVideo,
    isAddingVideo,
    isRemovingVideo
  };
};
