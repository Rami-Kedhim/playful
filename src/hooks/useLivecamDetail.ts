
import { useState, useEffect, useCallback } from 'react';
import { LivecamModel } from '@/types/livecam';
import { oxum } from '@/core/Oxum';

export const useLivecamDetail = (livecamId: string) => {
  const [livecam, setLivecam] = useState<LivecamModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [relatedLivecams, setRelatedLivecams] = useState<LivecamModel[]>([]);

  const fetchLivecamDetail = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Mock API request with a delay
      await new Promise(resolve => setTimeout(resolve, 800));

      // Generate mock data for the livecam
      const mockLivecam: LivecamModel = {
        id: livecamId,
        username: `user_${livecamId}`,
        name: `Livecam Model ${livecamId}`,
        displayName: `Model ${livecamId}`,
        imageUrl: `https://source.unsplash.com/random/600x900?portrait&sig=${livecamId}`,
        thumbnailUrl: `https://source.unsplash.com/random/300x450?portrait&sig=${livecamId}`,
        isLive: Math.random() > 0.3,
        isStreaming: Math.random() > 0.3,
        viewerCount: Math.floor(Math.random() * 1000),
        country: 'United States',
        region: 'US',
        language: 'English',
        tags: ['Amateur', 'Couples', 'Fetish'],
        category: 'Amateur',
        categories: ['Amateur', 'Couples'],
        rating: Math.floor(Math.random() * 5) + 1,
        age: Math.floor(Math.random() * 10) + 20,
        description: 'This is a sample livecam model description that would typically contain information about the model, their interests, and what viewers can expect during their streams.',
        streamUrl: 'https://example.com/stream',
        previewVideoUrl: 'https://example.com/preview.mp4'
      };

      setLivecam(mockLivecam);
      
      // Also fetch related livecams while we're at it
      fetchRelatedLivecams(mockLivecam);
      
      return mockLivecam;
    } catch (err) {
      const caughtError = err instanceof Error ? err : new Error('Failed to fetch livecam detail');
      setError(caughtError);
      console.error('Error fetching livecam detail:', caughtError);
      return null;
    } finally {
      setLoading(false);
    }
  }, [livecamId]);

  const fetchRelatedLivecams = useCallback(async (currentLivecam: LivecamModel) => {
    try {
      // Mock API request with a delay
      await new Promise(resolve => setTimeout(resolve, 600));

      // Generate mock data for related livecams
      const mockRelated: LivecamModel[] = Array.from({ length: 4 }, (_, index) => {
        const id = `related-${index}`;
        const isLive = Math.random() > 0.3;
        
        return {
          id,
          username: `user${index}`,
          name: `Related Model ${index}`,
          displayName: `Related ${index}`,
          imageUrl: `https://source.unsplash.com/random/300x300?portrait&sig=${id}`,
          thumbnailUrl: `https://source.unsplash.com/random/300x300?portrait&sig=${id}`,
          isLive,
          isStreaming: isLive,
          viewerCount: isLive ? Math.floor(Math.random() * 500) : 0,
          region: currentLivecam.region,
          language: currentLivecam.language,
          tags: [...currentLivecam.tags].sort(() => Math.random() - 0.5).slice(0, 2),
          category: currentLivecam.category,
          rating: Math.floor(Math.random() * 5) + 1
        };
      });

      // Apply Oxum's boost allocation to order the related livecams
      try {
        const boostMatrix = mockRelated.map(livecam => [
          Math.random() * 5,  // Random boost score 
          livecam.viewerCount / 100, 
          livecam.rating / 5
        ]);
        
        const boostAllocation = oxum.boostAllocationEigen(boostMatrix);
        
        // Apply boost allocation to sort the related livecams
        const sortedRelated = mockRelated
          .map((livecam, i) => ({
            ...livecam,
            boostScore: boostAllocation[i] * 10 // Scale from 0-1 to 0-10
          }))
          .sort((a, b) => (b.boostScore || 0) - (a.boostScore || 0));

        setRelatedLivecams(sortedRelated);
      } catch (error) {
        console.error("Error applying boost allocation:", error);
        // Fall back to unsorted related livecams
        setRelatedLivecams(mockRelated);
      }
    } catch (err) {
      console.error('Error fetching related livecams:', err);
      setRelatedLivecams([]);
    }
  }, []);

  // Load data on mount and when livecamId changes
  useEffect(() => {
    if (livecamId) {
      fetchLivecamDetail();
    }
  }, [livecamId, fetchLivecamDetail]);

  return {
    livecam,
    loading,
    error,
    relatedLivecams,
    refresh: fetchLivecamDetail
  };
};

export default useLivecamDetail;
