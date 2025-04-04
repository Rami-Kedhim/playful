
import { useState } from "react";
import { Escort } from "@/types/escort";
import { v4 as uuidv4 } from "uuid";

interface UseVideoManagementProps {
  updateEscortProfile: (id: string, updates: Partial<Escort>) => Promise<Escort | null>;
}

export const useVideoManagement = ({ updateEscortProfile }: UseVideoManagementProps) => {
  const [loading, setLoading] = useState(false);
  
  /**
   * Add a video to an escort's gallery
   */
  const addVideo = async (
    id: string, 
    videoUrl: string, 
    escort?: Escort | null,
    thumbnail?: string,
    title?: string
  ) => {
    if (!id) return null;
    
    setLoading(true);
    
    try {
      const currentVideos = escort?.videos || [];
      
      // Create new video object
      const newVideo = {
        id: uuidv4(),
        url: videoUrl,
        thumbnail,
        title
      };
      
      const updatedEscort = await updateEscortProfile(id, {
        videos: [...currentVideos, newVideo]
      });
      
      setLoading(false);
      return updatedEscort;
    } catch (error) {
      console.error("Error adding video:", error);
      setLoading(false);
      return null;
    }
  };
  
  /**
   * Remove a video from an escort's gallery
   */
  const removeVideo = async (
    id: string, 
    videoIdOrUrl: string, 
    escort?: Escort | null
  ) => {
    if (!id || !escort) return null;
    
    setLoading(true);
    
    try {
      const currentVideos = escort.videos || [];
      
      // Filter out the video to remove
      // It can be either a video ID or URL
      const updatedVideos = currentVideos.filter(video => {
        return video.id !== videoIdOrUrl && video.url !== videoIdOrUrl;
      });
      
      const updatedEscort = await updateEscortProfile(id, {
        videos: updatedVideos
      });
      
      setLoading(false);
      return updatedEscort;
    } catch (error) {
      console.error("Error removing video:", error);
      setLoading(false);
      return null;
    }
  };
  
  return {
    loading,
    addVideo,
    removeVideo
  };
};

export default useVideoManagement;
