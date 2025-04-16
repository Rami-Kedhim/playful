
import { useState } from 'react';
import { Escort, Video } from '@/types/escort';
import { v4 as uuidv4 } from 'uuid';

export const useVideoManagement = (
  updateEscortProfile: (id: string, updates: Partial<Escort>) => Promise<Escort | null>
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const addVideo = async (escortId: string, videoUrl: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Get current escort data first
      const escort = await updateEscortProfile(escortId, {});
      
      if (!escort) {
        throw new Error('Escort not found');
      }
      
      // Create new video object
      const newVideo: Video = {
        id: uuidv4(),
        url: videoUrl,
        thumbnail: videoUrl.replace(/\.[^/.]+$/, "_thumb.jpg") // Generate simple thumbnail URL
      };
      
      // Add video to videos array
      const currentVideos = escort.videos || [];
      const updatedVideos = [...currentVideos, newVideo];
      
      // Update escort with new videos
      const updatedEscort = await updateEscortProfile(escortId, {
        videos: updatedVideos
      });
      
      return updatedEscort;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to add video';
      setError(errorMessage);
      console.error('Error adding video:', err);
      return null;
    } finally {
      setIsLoading(false);
    }
  };
  
  const removeVideo = async (escortId: string, videoIdOrUrl: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Get current escort data first
      const escort = await updateEscortProfile(escortId, {});
      
      if (!escort) {
        throw new Error('Escort not found');
      }
      
      // Remove the video from videos array
      const currentVideos = escort.videos || [];
      const updatedVideos = currentVideos.filter(
        video => video.id !== videoIdOrUrl && video.url !== videoIdOrUrl
      );
      
      // Update escort with new videos
      const updatedEscort = await updateEscortProfile(escortId, {
        videos: updatedVideos
      });
      
      return updatedEscort;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to remove video';
      setError(errorMessage);
      console.error('Error removing video:', err);
      return null;
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    addVideo,
    removeVideo,
    isLoading,
    error
  };
};
