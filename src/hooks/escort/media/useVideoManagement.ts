
import { useState } from 'react';
import { Escort } from '@/types/escort';

// Define Video type
interface Video {
  id: string;
  url: string;
  thumbnail: string;
  title: string;
  duration?: number;
  isPublic?: boolean;
}

export const useVideoManagement = (escortData?: Escort) => {
  const [videos, setVideos] = useState<Video[]>(() => {
    if (!escortData) return [];
    
    // Convert the videos from the escort data to a proper Video array
    if (Array.isArray(escortData.videos)) {
      return escortData.videos as Video[];
    }
    
    // Return an empty array if no videos
    return [];
  });

  const uploadVideo = async (file: File): Promise<boolean> => {
    try {
      // Mock implementation - in a real app this would upload to storage
      const videoUrl = URL.createObjectURL(file);
      const newVideo: Video = {
        id: `video-${Date.now()}`,
        url: videoUrl,
        thumbnail: videoUrl, // In real implementation, generate a thumbnail
        title: file.name,
        isPublic: false,
      };
      
      setVideos(prev => [...prev, newVideo]);
      return true;
    } catch (error) {
      console.error("Error uploading video:", error);
      return false;
    }
  };

  const deleteVideo = (videoId: string): boolean => {
    try {
      setVideos(prev => prev.filter(video => video.id !== videoId));
      return true;
    } catch (error) {
      console.error("Error deleting video:", error);
      return false;
    }
  };

  const updateVideoVisibility = (videoId: string, isPublic: boolean): boolean => {
    try {
      setVideos(prev => 
        prev.map(video => 
          video.id === videoId ? { ...video, isPublic } : video
        )
      );
      return true;
    } catch (error) {
      console.error("Error updating video visibility:", error);
      return false;
    }
  };

  const updateVideoTitle = (videoId: string, title: string): boolean => {
    try {
      setVideos(prev => 
        prev.map(video => 
          video.id === videoId ? { ...video, title } : video
        )
      );
      return true;
    } catch (error) {
      console.error("Error updating video title:", error);
      return false;
    }
  };

  return {
    videos,
    uploadVideo,
    deleteVideo,
    updateVideoVisibility,
    updateVideoTitle,
  };
};
