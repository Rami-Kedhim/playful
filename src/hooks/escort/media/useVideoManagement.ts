
import { useState, useEffect } from 'react';
import { Video } from '@/types/escort';

interface UseVideoManagementProps {
  initialVideos: string[];
}

const useVideoManagement = ({ initialVideos }: UseVideoManagementProps) => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [newVideoUrl, setNewVideoUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // When processing videos from string[] to Video[]
    const processVideos = (videoUrls: string[]): Video[] => {
      return videoUrls.map((url, index) => ({
        id: `video-${index}`,
        url,
        title: `Video ${index + 1}`
      }));
    };

    setVideos(processVideos(initialVideos));
  }, [initialVideos]);

  const addVideo = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Basic validation
      if (!newVideoUrl.trim()) {
        throw new Error('Video URL cannot be empty');
      }

      // Optimistic update
      const newVideo: Video = {
        id: `video-${Date.now()}`,
        url: newVideoUrl,
        title: `Video ${videos.length + 1}`
      };
      setVideos(prevVideos => [...prevVideos, newVideo]);
      setNewVideoUrl('');

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (err: any) {
      setError(err.message || 'Failed to add video');
    } finally {
      setIsLoading(false);
    }
  };

  const deleteVideo = async (videoId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // Optimistic update
      setVideos(prevVideos => prevVideos.filter(video => video.id !== videoId));

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (err: any) {
      setError(err.message || 'Failed to delete video');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    videos,
    newVideoUrl,
    setNewVideoUrl,
    addVideo,
    deleteVideo,
    isLoading,
    error
  };
};

export default useVideoManagement;
