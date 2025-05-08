
import { useState, useEffect } from 'react';
import { Livecam } from '@/types/livecams';

interface UseLivecamDetailProps {
  livecamId: string;
}

interface UseLivecamDetailResult {
  livecam: Livecam | null;
  loading: boolean;
  error: string | null;
  viewerCount: number;
  isSubscribed: boolean;
  isFavorited: boolean;
  isStreaming: boolean;
  toggleFavorite: () => void;
  subscribeToModel: () => Promise<boolean>;
  sendTip: (amount: number, message: string) => Promise<boolean>;
}

export function useLivecamDetail({ livecamId }: UseLivecamDetailProps): UseLivecamDetailResult {
  const [livecam, setLivecam] = useState<Livecam | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [viewerCount, setViewerCount] = useState<number>(0);
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [isFavorited, setIsFavorited] = useState<boolean>(false);
  const [isStreaming, setIsStreaming] = useState<boolean>(false);

  useEffect(() => {
    const fetchLivecamDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        // Mock API call with delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Mock data
        const mockLivecam: Livecam = {
          id: livecamId,
          name: `Model ${livecamId}`,
          username: `model_${livecamId}`,
          displayName: `Model ${livecamId}`,
          imageUrl: `https://picsum.photos/seed/${livecamId}/800/600`,
          thumbnailUrl: `https://picsum.photos/seed/${livecamId}/400/300`,
          isLive: true,
          isStreaming: true,
          viewerCount: Math.floor(Math.random() * 1000) + 100,
          tags: ['tag1', 'tag2', Math.random() > 0.5 ? 'featured' : 'trending'],
          category: 'category1',
          categories: ['category1', 'category2'],
          language: 'English',
          country: 'United States',
          description: 'This is a mock livecam model with streaming capability.',
          streamUrl: `https://example.com/streams/${livecamId}`,
          rating: 4.5,
          price: 9.99
        };

        setLivecam(mockLivecam);
        setViewerCount(mockLivecam.viewerCount);
        setIsStreaming(mockLivecam.isLive);
        
        // Random subscription and favorite status
        setIsSubscribed(Math.random() > 0.7);
        setIsFavorited(Math.random() > 0.6);
      } catch (err: any) {
        console.error('Error fetching livecam details:', err);
        setError(err.message || 'Failed to load livecam details');
      } finally {
        setLoading(false);
      }
    };

    if (livecamId) {
      fetchLivecamDetails();
    }
  }, [livecamId]);

  // Simulate view count increasing randomly during the stream
  useEffect(() => {
    if (!livecam?.isLive) return;

    const interval = setInterval(() => {
      setViewerCount(current => {
        const change = Math.floor(Math.random() * 5) - 2; // -2 to +2 viewers
        return Math.max(10, current + change);
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [livecam?.isLive]);

  // Toggle favorite status
  const toggleFavorite = () => {
    setIsFavorited(prev => !prev);
  };

  // Subscribe to model
  const subscribeToModel = async (): Promise<boolean> => {
    try {
      // Mock API call with delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSubscribed(true);
      return true;
    } catch (err) {
      console.error('Error subscribing to model:', err);
      return false;
    }
  };

  // Send tip to model
  const sendTip = async (amount: number, message: string): Promise<boolean> => {
    try {
      // Mock API call with delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log(`Sending tip of ${amount} with message: ${message}`);
      return true;
    } catch (err) {
      console.error('Error sending tip:', err);
      return false;
    }
  };

  return {
    livecam,
    loading,
    error,
    viewerCount,
    isSubscribed,
    isFavorited,
    isStreaming,
    toggleFavorite,
    subscribeToModel,
    sendTip
  };
}
