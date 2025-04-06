import { Escort, Video } from "@/types/escort";

/**
 * Custom hook for managing escort video-related operations
 */
export const useVideoManagement = ({
  updateEscortProfile
}: {
  updateEscortProfile: (id: string, updates: Partial<Escort>) => Promise<Escort | null>
}) => {
  /**
   * Adds a video URL to the escort's profile
   */
  const addVideo = async (id: string, videoUrl: string, escort?: Escort | null): Promise<Escort | null> => {
    if (!escort) {
      console.error("Escort is null or undefined");
      return null;
    }
    
    const newVideo: Video = {
      id: `video-${Date.now()}`,
      url: videoUrl,
      thumbnail: '', // Generate thumbnail here
      title: 'New Video'
    };
    
    const updatedVideos = [...(escort.videos || []), newVideo];
    
    return await updateEscortProfile(id, { videos: updatedVideos });
  };
  
  /**
   * Removes a video URL from the escort's profile
   */
  const removeVideo = async (id: string, videoIdOrUrl: string, escort?: Escort | null): Promise<Escort | null> => {
    if (!escort) {
      console.error("Escort is null or undefined");
      return null;
    }
    
    const updatedVideos = (escort.videos || []).filter(video => video.id !== videoIdOrUrl && video.url !== videoIdOrUrl);
    
    return await updateEscortProfile(id, { videos: updatedVideos });
  };

  return {
    addVideo,
    removeVideo
  };
};
