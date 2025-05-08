
import { useState, useEffect, useCallback } from 'react';
import { Livecam } from '@/types/livecams';

export const useLivecamDetail = (livecamId: string) => {
  const [livecam, setLivecam] = useState<Livecam | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLivecam = useCallback(async () => {
    if (!livecamId) {
      setError('No livecam ID provided');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));

      // Mock data
      const mockLivecam: Livecam = {
        id: livecamId,
        name: 'Jessica',
        displayName: 'Jessica Diamond',
        username: 'jessica_diamond',
        thumbnailUrl: 'https://i.imgur.com/0y0tGXn.png',
        imageUrl: 'https://i.imgur.com/0y0tGXn.png',
        isLive: true,
        viewerCount: 423,
        streamUrl: 'https://example.com/stream.mp4',
        category: 'Dance',
        categories: ['Dance', 'Music'],
        language: 'English',
        country: 'United States',
        tags: ['blonde', 'dance', 'music'],
        description: 'Join me for a fun dance stream! I take song requests and love to chat with my viewers.',
        rating: 4.8,
        isStreaming: true,
        region: 'North America'
      };

      setLivecam(mockLivecam);
    } catch (error) {
      console.error('Error fetching livecam:', error);
      setError('Failed to load livecam details');
    } finally {
      setLoading(false);
    }
  }, [livecamId]);

  // Refetch when the livecam ID changes
  useEffect(() => {
    fetchLivecam();
  }, [fetchLivecam]);

  // Function to follow livecam
  const followLivecam = async (): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      console.log(`Following livecam: ${livecamId}`);
      return true;
    } catch (error) {
      console.error('Error following livecam:', error);
      return false;
    }
  };

  // Function to unfollow livecam
  const unfollowLivecam = async (): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      console.log(`Unfollowing livecam: ${livecamId}`);
      return true;
    } catch (error) {
      console.error('Error unfollowing livecam:', error);
      return false;
    }
  };

  // Function to send tip
  const sendTip = async (amount: number): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      console.log(`Sent tip of ${amount} to livecam: ${livecamId}`);
      return true;
    } catch (error) {
      console.error('Error sending tip:', error);
      return false;
    }
  };

  // Function to boost livecam
  const boostLivecam = async (boost: number): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log(`Boosting livecam: ${livecamId} with boost: ${boost}`);
      return true;
    } catch (error) {
      console.error('Error boosting livecam:', error);
      return false;
    }
  };

  return {
    livecam,
    loading,
    error,
    refreshLivecam: fetchLivecam,
    followLivecam,
    unfollowLivecam,
    sendTip,
    boostLivecam
  };
};

export default useLivecamDetail;
