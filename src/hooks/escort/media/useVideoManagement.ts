
import { useState, useEffect, useCallback } from 'react';
import { Escort, Video } from '@/types/escort';
import { useToast } from '@/components/ui/use-toast';

interface UseVideoManagementProps {
  escortId: string;
}

export const useVideoManagement = ({ escortId }: UseVideoManagementProps) => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Fetch videos
  const fetchVideos = useCallback(async () => {
    if (!escortId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be an API call
      const mockVideos: Video[] = [
        {
          id: '1',
          title: 'Introduction Video',
          thumbnailUrl: 'https://example.com/thumbnail1.jpg',
          videoUrl: 'https://example.com/video1.mp4',
          duration: 120,
          viewCount: 42,
          createdAt: new Date().toISOString(),
          isPremium: false
        },
        {
          id: '2',
          title: 'Private Message',
          thumbnailUrl: 'https://example.com/thumbnail2.jpg',
          videoUrl: 'https://example.com/video2.mp4',
          duration: 45,
          viewCount: 18,
          createdAt: new Date().toISOString(),
          isPremium: true
        }
      ];
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setVideos(mockVideos);
    } catch (err) {
      console.error('Error fetching videos:', err);
      setError('Failed to load videos. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [escortId]);

  // Upload a new video
  const uploadVideo = useCallback(async (file: File, metadata: { title: string; isPublic: boolean }) => {
    setUploading(true);
    setError(null);
    
    try {
      // In a real app, this would upload to a server
      console.log('Uploading video:', file.name, metadata);
      
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Create a mock video entry
      const newVideo: Video = {
        id: `video-${Date.now()}`,
        title: metadata.title,
        thumbnailUrl: 'https://example.com/default-thumbnail.jpg',
        videoUrl: URL.createObjectURL(file),
        duration: 60, // Mock duration
        viewCount: 0,
        createdAt: new Date().toISOString(),
        isPremium: !metadata.isPublic
      };
      
      setVideos(prev => [newVideo, ...prev]);
      
      toast({
        title: 'Video uploaded successfully',
        description: `"${metadata.title}" has been added to your gallery.`,
      });
      
      return newVideo;
    } catch (err) {
      console.error('Error uploading video:', err);
      setError('Failed to upload video. Please try again.');
      
      toast({
        title: 'Upload failed',
        description: 'There was a problem uploading your video. Please try again.',
        variant: 'destructive',
      });
      
      return null;
    } finally {
      setUploading(false);
    }
  }, [toast]);

  // Delete a video
  const deleteVideo = useCallback(async (videoId: string) => {
    try {
      // In a real app, this would be an API call
      console.log('Deleting video:', videoId);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setVideos(prev => prev.filter(video => video.id !== videoId));
      
      toast({
        title: 'Video deleted',
        description: 'The video has been removed from your gallery.',
      });
      
      return true;
    } catch (err) {
      console.error('Error deleting video:', err);
      
      toast({
        title: 'Delete failed',
        description: 'There was a problem deleting your video. Please try again.',
        variant: 'destructive',
      });
      
      return false;
    }
  }, [toast]);

  // Load videos on mount
  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  return {
    videos,
    loading,
    uploading,
    error,
    fetchVideos,
    uploadVideo,
    deleteVideo
  };
};

export default useVideoManagement;
