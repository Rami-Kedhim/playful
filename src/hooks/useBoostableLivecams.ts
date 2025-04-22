
import { useState, useEffect, useCallback } from 'react';
import { LivecamModel } from '@/types/livecam';
import { BoostableLivecamsOptions } from '@/types/livecam';
import { oxum } from '@/core/Oxum';

export const useBoostableLivecams = (options: BoostableLivecamsOptions = {}) => {
  const [livecams, setLivecams] = useState<LivecamModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchLivecams = useCallback(async (refresh = false) => {
    const {
      limit = 12,
      offset = 0,
      onlyLive = false,
      categories = [],
      region,
      language,
      sortBy = 'boosted'
    } = options;

    setLoading(true);
    setError(null);

    try {
      // Mock API request with a delay
      await new Promise(resolve => setTimeout(resolve, 800));

      // Generate mock data
      const count = limit;
      const mockLivecams: LivecamModel[] = Array.from({ length: count }, (_, index) => {
        const id = `livecam-${index + offset + 1}`;
        const isLive = onlyLive ? true : Math.random() > 0.3;
        const boosted = Math.random() > 0.7;
        const boostScore = boosted ? Math.random() * 10 : 0;
        const viewerCount = isLive ? Math.floor(Math.random() * 1000) : 0;

        // Generate some tags
        const categoryPool = ['Amateur', 'Professional', 'Couples', 'Solo', 'Group', 'Fetish'];
        const selectedCategories = onlyLive && categories.length > 0 
          ? categories
          : Array.from({ length: Math.floor(Math.random() * 3) + 1 }, () => 
              categoryPool[Math.floor(Math.random() * categoryPool.length)]
            );

        return {
          id,
          username: `user${index + offset + 1}`,
          name: `Livecam Model ${index + offset + 1}`,
          displayName: `Model ${index + offset + 1}`,
          imageUrl: `https://source.unsplash.com/random/300x300?portrait&sig=${id}`,
          thumbnailUrl: `https://source.unsplash.com/random/300x300?portrait&sig=${id}`,
          isLive,
          isStreaming: isLive,
          viewerCount,
          region: region || 'US',
          language: language || 'en',
          tags: selectedCategories,
          category: selectedCategories[0] || 'Amateur',
          rating: Math.floor(Math.random() * 5) + 1,
          boosted,
          boostScore,
          isPopular: viewerCount > 500
        };
      });

      // Sort based on sortBy parameter
      let sortedLivecams = [...mockLivecams];
      switch (sortBy) {
        case 'boosted':
          sortedLivecams = sortedLivecams.sort((a, b) => (b.boostScore || 0) - (a.boostScore || 0));
          break;
        case 'popular':
          sortedLivecams = sortedLivecams.sort((a, b) => b.viewerCount - a.viewerCount);
          break;
        case 'new':
          // For demo, just shuffle them
          sortedLivecams = sortedLivecams.sort(() => Math.random() - 0.5);
          break;
        case 'rating':
          sortedLivecams = sortedLivecams.sort((a, b) => b.rating - a.rating);
          break;
      }

      // Apply Oxum's boost allocation algorithm to refine the order
      try {
        // This is just an example of how to use Oxum
        // In a real application, this would use the actual boost data
        const boostMatrix = sortedLivecams.map(livecam => [
          livecam.boostScore || 0, 
          livecam.viewerCount / 100, 
          livecam.rating / 5
        ]);
        
        // Only if we have livecams, call Oxum's algorithm
        if (boostMatrix.length > 0) {
          const boostAllocation = oxum.boostAllocationEigen(boostMatrix);
          
          // Apply boost allocation to sort the livecams
          sortedLivecams = sortedLivecams.map((livecam, i) => ({
            ...livecam,
            boostScore: boostAllocation[i] * 10 // Scale from 0-1 to 0-10
          })).sort((a, b) => (b.boostScore || 0) - (a.boostScore || 0));
        }
      } catch (oxumError) {
        console.error("Error using Oxum boost allocation:", oxumError);
        // Continue with the original sorting if Oxum fails
      }

      // Update state based on refresh flag
      setLivecams(prev => refresh ? sortedLivecams : [...prev, ...sortedLivecams]);
      setHasMore(sortedLivecams.length >= limit);
      return sortedLivecams;
    } catch (err) {
      const caughtError = err instanceof Error ? err : new Error('Failed to fetch livecams');
      setError(caughtError);
      console.error('Error fetching livecams:', caughtError);
      return [];
    } finally {
      setLoading(false);
    }
  }, [options]);

  // Load initial data
  useEffect(() => {
    fetchLivecams(true);
  }, [fetchLivecams]);

  // Function to load more livecams
  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;
    
    // Calculate new offset
    const newOffset = livecams.length;
    
    // Fetch more livecams with updated offset
    await fetchLivecams(false);
  }, [loading, hasMore, livecams.length, fetchLivecams]);

  // Function to refresh the data
  const refresh = useCallback(() => {
    return fetchLivecams(true);
  }, [fetchLivecams]);

  // Function to boost a livecam
  const boostLivecam = useCallback(async (livecamId: string, boostAmount: number) => {
    try {
      // In a real application, this would call an API to boost the livecam
      // For now, we'll just update the local state
      setLivecams(prev => 
        prev.map(livecam => 
          livecam.id === livecamId 
            ? { 
                ...livecam, 
                boosted: true, 
                boostScore: (livecam.boostScore || 0) + boostAmount 
              } 
            : livecam
        )
      );
      return true;
    } catch (err) {
      console.error('Error boosting livecam:', err);
      return false;
    }
  }, []);

  return {
    livecams,
    loading,
    error,
    hasMore,
    loadMore,
    refresh,
    boostLivecam
  };
};

export default useBoostableLivecams;
