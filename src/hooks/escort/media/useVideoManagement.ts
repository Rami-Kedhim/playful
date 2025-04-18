
import { useState, useCallback } from 'react';
import { Video } from '@/types/video';

export const useVideoManagement = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchVideos = useCallback(async (escortId: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock videos
      const mockVideos: Video[] = [
        {
          id: "video1",
          title: "Welcome to my profile",
          thumbnailUrl: "https://via.placeholder.com/400x250",
          videoUrl: "https://example.com/video1.mp4",
          duration: 180,
          viewCount: 1250,
          views: 1250,
          createdAt: "2025-03-15T14:30:00Z",
          isPremium: false,
          isPublished: true,
          escortId: escortId
        },
        {
          id: "video2",
          title: "Premium content preview",
          thumbnailUrl: "https://via.placeholder.com/400x250",
          videoUrl: "https://example.com/video2.mp4",
          duration: 240,
          viewCount: 850,
          views: 850,
          createdAt: "2025-03-10T11:15:00Z",
          isPremium: true,
          isPublished: true,
          escortId: escortId
        }
      ];
      
      setVideos(mockVideos);
    } catch (err) {
      console.error("Error fetching videos:", err);
      setError("Failed to load videos");
    } finally {
      setLoading(false);
    }
  }, []);

  const uploadVideo = useCallback(async (
    escortId: string,
    title: string,
    videoFile: File,
    thumbnailFile: File,
    isPremium: boolean
  ) => {
    setLoading(true);
    setError(null);
    
    try {
      // In a real app, this would handle file uploads to cloud storage
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const newVideo: Video = {
        id: `video-${Date.now()}`,
        title,
        thumbnailUrl: URL.createObjectURL(thumbnailFile),
        videoUrl: URL.createObjectURL(videoFile),
        duration: Math.floor(Math.random() * 300) + 60, // Random duration between 60-360 seconds
        viewCount: 0,
        views: 0,
        createdAt: new Date().toISOString(),
        isPremium,
        isPublished: true,
        escortId
      };
      
      setVideos(prev => [...prev, newVideo]);
      return newVideo;
    } catch (err) {
      console.error("Error uploading video:", err);
      setError("Failed to upload video");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteVideo = useCallback(async (videoId: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setVideos(prev => prev.filter(video => video.id !== videoId));
      return true;
    } catch (err) {
      console.error("Error deleting video:", err);
      setError("Failed to delete video");
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateVideoVisibility = useCallback(async (videoId: string, isPublished: boolean) => {
    setLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setVideos(prev =>
        prev.map(video =>
          video.id === videoId ? { ...video, isPublished } : video
        )
      );
      return true;
    } catch (err) {
      console.error("Error updating video visibility:", err);
      setError("Failed to update video visibility");
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    videos,
    loading,
    error,
    fetchVideos,
    uploadVideo,
    deleteVideo,
    updateVideoVisibility
  };
};
