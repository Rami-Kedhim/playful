import { useState, useEffect, useCallback } from 'react';
import { LivecamModel } from '@/types/livecams';
import { oxum } from '@/core/Oxum';

interface UseLivecamDetailResult {
  livecam: LivecamModel | null;
  loading: boolean;
  error: string | null;
  boostScore: number | null;
  refreshLivecam: () => Promise<void>;
}

const useLivecamDetail = (livecamId: string): UseLivecamDetailResult => {
  const [livecam, setLivecam] = useState<LivecamModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [boostScore, setBoostScore] = useState<number | null>(null);

  const fetchLivecam = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));

      // Mock data
      const mockLivecam: LivecamModel = {
        id: livecamId,
        name: 'Jessica',
        username: 'jessica_live',
        displayName: 'Jessica Live',
        imageUrl: 'https://example.com/jessica.jpg',
        thumbnailUrl: 'https://example.com/jessica-thumb.jpg',
        isLive: true,
        isStreaming: true,
        viewerCount: 342,
        tags: ['dance', 'music'],
        rating: 4.8,
        price: 50,
        category: 'Dance',
        language: 'English',
        description: 'Join my dance party livestream!',
        boostScore: 75,
      };

      setLivecam(mockLivecam);

      // Simulate boost score calculation
      const matrix = [
        [0.7, 0.2, 0.1],
        [0.2, 0.6, 0.2],
        [0.1, 0.2, 0.7]
      ];

      // Correctly use the boostAllocationEigen method
      const boostScore = await oxum.boostAllocationEigen(livecamId, 2); // 2 is the boost level
      setBoostScore(boostScore as number);

      setError(null);
    } catch (err: any) {
      console.error('Error fetching livecam:', err);
      setError(err.message || 'Failed to load livecam');
    } finally {
      setLoading(false);
    }
  }, [livecamId]);

  useEffect(() => {
    fetchLivecam();
  }, [fetchLivecam]);

  return {
    livecam,
    loading,
    error,
    boostScore,
    refreshLivecam: fetchLivecam,
  };
};

export default useLivecamDetail;
