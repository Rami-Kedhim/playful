
import { useState } from 'react';
import { Video } from '@/types/video';

export const useVideoManagement = () => {
  const [videos, setVideos] = useState<Video[]>([
    {
      id: "v1",
      title: "Welcome to My Profile",
      thumbnailUrl: "/placeholders/video-thumbnail-1.jpg",
      videoUrl: "/videos/sample-video-1.mp4",
      duration: 120,
      viewCount: 1450,
      views: 1450,
      createdAt: "2023-08-02T14:30:00Z",
      isPremium: false,
      isPublished: true,
      escortId: "e1"
    },
    {
      id: "v2",
      title: "Exclusive Content Preview",
      thumbnailUrl: "/placeholders/video-thumbnail-2.jpg",
      videoUrl: "/videos/sample-video-2.mp4",
      duration: 180,
      viewCount: 876,
      views: 876,
      createdAt: "2023-07-25T09:15:00Z",
      isPremium: true,
      isPublished: true,
      escortId: "e1"
    },
    {
      id: "v3",
      title: "Behind the Scenes",
      thumbnailUrl: "/placeholders/video-thumbnail-3.jpg",
      videoUrl: "/videos/sample-video-3.mp4",
      duration: 240,
      viewCount: 2100,
      views: 2100,
      createdAt: "2023-08-10T18:45:00Z",
      isPremium: true,
      isPublished: true,
      escortId: "e1"
    }
  ]);

  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);
  
  const addVideo = (video: Partial<Video>) => {
    const newVideo: Video = {
      id: `v${Date.now()}`,
      title: video.title || "Untitled Video",
      thumbnailUrl: video.thumbnailUrl || "/placeholders/default-video-thumbnail.jpg",
      videoUrl: video.videoUrl || "",
      duration: video.duration || 0,
      viewCount: 0,
      views: 0,
      createdAt: new Date().toISOString(),
      isPremium: Boolean(video.isPremium),
      isPublished: true,
      escortId: video.escortId || "e1"
    };
    
    setVideos([...videos, newVideo]);
    return newVideo;
  };
  
  const deleteVideo = (id: string) => {
    setVideos(videos.filter(video => video.id !== id));
    if (currentVideo?.id === id) {
      setCurrentVideo(null);
    }
  };
  
  const updateVideo = (id: string, updates: Partial<Video>) => {
    const updatedVideos = videos.map(video => {
      if (video.id === id) {
        return { ...video, ...updates };
      }
      return video;
    });
    
    setVideos(updatedVideos);
    
    if (currentVideo?.id === id) {
      setCurrentVideo({ ...currentVideo, ...updates });
    }
  };
  
  const getVideoById = (id: string): Video | undefined => {
    return videos.find(video => video.id === id);
  };
  
  const selectVideo = (id: string): boolean => {
    const video = getVideoById(id);
    if (video) {
      setCurrentVideo(video);
      return true;
    }
    return false;
  };
  
  const clearSelectedVideo = () => {
    setCurrentVideo(null);
  };
  
  const incrementViews = (id: string) => {
    updateVideo(id, {
      viewCount: (getVideoById(id)?.viewCount || 0) + 1,
      views: (getVideoById(id)?.views || 0) + 1
    });
  };
  
  const getPremiumVideos = () => {
    return videos.filter(video => video.isPremium);
  };
  
  const getFreeVideos = () => {
    return videos.filter(video => !video.isPremium);
  };
  
  return {
    videos,
    currentVideo,
    addVideo,
    deleteVideo,
    updateVideo,
    getVideoById,
    selectVideo,
    clearSelectedVideo,
    incrementViews,
    getPremiumVideos,
    getFreeVideos
  };
};
