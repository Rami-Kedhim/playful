
import { useState, useCallback } from 'react';
import { Video } from '@/types/Escort';

interface VideoManagementResult {
  videos: Video[];
  uploading: boolean;
  uploadProgress: number;
  error: string | null;
  uploadVideo: (file: File, metadata: Pick<Video, 'title' | 'description' | 'isPremium'>) => Promise<void>;
  deleteVideo: (videoId: string) => Promise<void>;
  updateVideoMetadata: (videoId: string, metadata: Partial<Video>) => Promise<void>;
}

export const useVideoManagement = (escortId: string): VideoManagementResult => {
  const [videos, setVideos] = useState<Video[]>([
    {
      id: 'video-1',
      title: 'Beach Day Fun',
      thumbnailUrl: 'https://via.placeholder.com/300x200',
      videoUrl: 'https://example.com/videos/beach.mp4',
      duration: 120, // in seconds
      views: 245,
      createdAt: new Date().toISOString(),
      isPublished: true,
      escortId,
      viewCount: 245,
      isPremium: false
    },
    {
      id: 'video-2',
      title: 'Private Yacht Party',
      thumbnailUrl: 'https://via.placeholder.com/300x200',
      videoUrl: 'https://example.com/videos/yacht.mp4',
      duration: 180, // in seconds
      views: 120,
      createdAt: new Date().toISOString(),
      isPublished: true,
      escortId,
      viewCount: 120,
      isPremium: true
    }
  ]);
  
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  
  const uploadVideo = useCallback(async (file: File, metadata: Pick<Video, 'title' | 'description' | 'isPremium'>) => {
    setUploading(true);
    setUploadProgress(0);
    setError(null);
    
    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(current => {
          const next = current + 10;
          return next >= 100 ? 100 : next;
        });
      }, 500);
      
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      // Create new video object
      const newVideo: Video = {
        id: 'video-' + Date.now(),
        title: metadata.title,
        description: metadata.description,
        thumbnailUrl: 'https://via.placeholder.com/300x200',
        videoUrl: URL.createObjectURL(file),
        duration: 60, // Mock duration
        views: 0,
        createdAt: new Date().toISOString(),
        isPublished: true,
        escortId,
        viewCount: 0,
        isPremium: metadata.isPremium || false
      };
      
      setVideos(current => [...current, newVideo]);
      
      // Reset upload state
      setTimeout(() => {
        setUploading(false);
        setUploadProgress(0);
      }, 500);
      
    } catch (err) {
      setError('Failed to upload video');
      setUploading(false);
    }
  }, [escortId]);
  
  const deleteVideo = useCallback(async (videoId: string) => {
    try {
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setVideos(current => current.filter(video => video.id !== videoId));
    } catch (err) {
      setError('Failed to delete video');
    }
  }, []);
  
  const updateVideoMetadata = useCallback(async (videoId: string, metadata: Partial<Video>) => {
    try {
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setVideos(current =>
        current.map(video =>
          video.id === videoId
            ? { ...video, ...metadata }
            : video
        )
      );
    } catch (err) {
      setError('Failed to update video metadata');
    }
  }, []);
  
  return {
    videos,
    uploading,
    uploadProgress,
    error,
    uploadVideo,
    deleteVideo,
    updateVideoMetadata
  };
};
