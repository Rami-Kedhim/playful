
import { Escort, Video } from '@/types/escort';
import { useState, useCallback } from 'react';
import { useToast } from '@/components/ui/use-toast';

export const useVideoManagement = (updateProfile: (id: string, data: Partial<Escort>) => Promise<Escort | null>) => {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const addVideo = useCallback(async (
    escortId: string,
    videoData: string | Video,
    escortProfile?: Escort
  ) => {
    if (!escortProfile) return null;

    setIsUploading(true);
    try {
      let updatedVideos: (string | Video)[] = [];
      
      // Add the new video to existing videos or create a new array
      if (escortProfile.videos && Array.isArray(escortProfile.videos)) {
        updatedVideos = [...escortProfile.videos, videoData];
      } else {
        updatedVideos = [videoData];
      }

      // Update the escort profile with the new videos array
      const updatedProfile = await updateProfile(escortId, { videos: updatedVideos });
      
      toast({
        title: 'Video added successfully',
        description: 'Your video has been added to your gallery',
      });
      
      return updatedProfile;
    } catch (error) {
      toast({
        title: 'Error adding video',
        description: error instanceof Error ? error.message : 'An unknown error occurred',
        variant: 'destructive',
      });
      return null;
    } finally {
      setIsUploading(false);
    }
  }, [updateProfile, toast]);

  const removeVideo = useCallback(async (
    escortId: string,
    videoToRemove: string | Video,
    escortProfile?: Escort
  ) => {
    if (!escortProfile) return null;
    
    try {
      // Filter out the video to remove
      const updatedVideos = escortProfile.videos ? 
        escortProfile.videos.filter(video => {
          if (typeof video === 'string' && typeof videoToRemove === 'string') {
            return video !== videoToRemove;
          }
          
          if (typeof video !== 'string' && typeof videoToRemove !== 'string') {
            return video.id !== videoToRemove.id;
          }
          
          return true;
        }) : [];
      
      // Update the escort profile with the filtered videos array
      const updatedProfile = await updateProfile(escortId, { videos: updatedVideos });
      
      toast({
        title: 'Video removed successfully',
        description: 'The video has been removed from your gallery',
      });
      
      return updatedProfile;
    } catch (error) {
      toast({
        title: 'Error removing video',
        description: error instanceof Error ? error.message : 'An unknown error occurred',
        variant: 'destructive',
      });
      return null;
    }
  }, [updateProfile, toast]);
  
  return {
    isUploading,
    addVideo,
    removeVideo
  };
};
