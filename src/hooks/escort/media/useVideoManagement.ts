
import { useState } from 'react';
import { Escort, Video } from '@/types/escorts';
import { toast } from '@/components/ui/use-toast';

export const useVideoManagement = (profile: Escort | null) => {
  const [videos, setVideos] = useState<Video[]>(profile?.videos || []);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addVideo = async (videoData: Partial<Video>) => {
    if (!videoData.url) {
      toast({
        title: "Error",
        description: "Video URL is required",
        variant: "destructive"
      });
      return;
    }

    const newVideo: Video = {
      id: `video-${Date.now()}`,
      url: videoData.url,
      thumbnail: videoData.thumbnail || "",
      title: videoData.title || "Untitled Video",
      duration: videoData.duration,
      isPublic: videoData.isPublic
    };

    try {
      setIsSubmitting(true);
      // In a real app, we would save to the backend here
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call

      const updatedVideos = [...videos, newVideo];
      setVideos(updatedVideos);

      toast({
        title: "Video added",
        description: "Your video has been added successfully"
      });

      return updatedVideos;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add video",
        variant: "destructive"
      });
      return null;
    } finally {
      setIsSubmitting(false);
    }
  };

  const removeVideo = async (videoId: string) => {
    try {
      setIsSubmitting(true);
      // In a real app, we would delete from the backend here
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call

      const updatedVideos = videos.filter(video => video.id !== videoId);
      setVideos(updatedVideos);

      toast({
        title: "Video removed",
        description: "The video has been removed successfully"
      });

      return updatedVideos;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove video",
        variant: "destructive"
      });
      return null;
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateVideoDetails = async (videoId: string, details: Partial<Video>) => {
    try {
      setIsSubmitting(true);
      // In a real app, we would update the backend here
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call

      const updatedVideos = videos.map(video => 
        video.id === videoId ? { ...video, ...details } : video
      );
      
      setVideos(updatedVideos);

      toast({
        title: "Video updated",
        description: "Video details have been updated successfully"
      });

      return updatedVideos;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update video details",
        variant: "destructive"
      });
      return null;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    videos,
    setVideos,
    addVideo,
    removeVideo,
    updateVideoDetails,
    isSubmitting
  };
};
