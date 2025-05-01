
import { useState, useEffect, useCallback } from 'react';
import { AIProfile } from '@/types/ai-profile';

export interface LivecamContextType {
  activeStreams: AIProfile[];
  featuredStream: AIProfile | null;
  isLoading: boolean;
  error: Error | null;
  joinStream: (profileId: string) => Promise<boolean>;
  leaveStream: (profileId: string) => Promise<boolean>;
}

export const useLivecams = (): LivecamContextType => {
  const [activeStreams, setActiveStreams] = useState<AIProfile[]>([]);
  const [featuredStream, setFeaturedStream] = useState<AIProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Mock function to fetch active streams
  const fetchActiveStreams = useCallback(async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock response with correctly typed AIProfile objects
      const mockStreams: AIProfile[] = [
        {
          id: '1',
          name: 'Sophia',
          livecam_enabled: true, // This is now defined in the AIProfile type
          avatarUrl: '/avatars/sophia.jpg',
          displayName: 'Sophia',
          thumbnailUrl: '/thumbnails/sophia-stream.jpg',
          type: 'virtual_companion'
        },
        {
          id: '2',
          name: 'Emma',
          livecam_enabled: true, // This is now defined in the AIProfile type
          avatarUrl: '/avatars/emma.jpg',
          displayName: 'Emma',
          thumbnailUrl: '/thumbnails/emma-stream.jpg',
          type: 'virtual_companion'
        }
      ];
      
      setActiveStreams(mockStreams);
      setFeaturedStream(mockStreams[0]);
    } catch (err: any) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchActiveStreams();
    
    // Poll for active streams every minute
    const interval = setInterval(fetchActiveStreams, 60000);
    
    return () => {
      clearInterval(interval);
    };
  }, [fetchActiveStreams]);

  const joinStream = useCallback(async (profileId: string): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      return true;
    } catch (err) {
      console.error('Failed to join stream:', err);
      return false;
    }
  }, []);

  const leaveStream = useCallback(async (profileId: string): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      return true;
    } catch (err) {
      console.error('Failed to leave stream:', err);
      return false;
    }
  }, []);

  return {
    activeStreams,
    featuredStream,
    isLoading,
    error,
    joinStream,
    leaveStream
  };
};

export default useLivecams;
