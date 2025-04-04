
/**
 * Hook to access livecams sorted by visibility algorithm
 */
import { useState, useEffect, useCallback } from 'react';
import { Livecam } from '@/types/livecams';
import livecamVisibility from '@/services/visibility/LivecamVisibilityAdapter';

interface LivecamFilters {
  region?: string;
  categories?: string[];
  isStreaming?: boolean;
  limit?: number;
}

// Mock function (replace with actual API call)
const fetchLivecams = async (filters: LivecamFilters): Promise<Livecam[]> => {
  // This would be an API call in production
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Return mock data
  return Array.from({ length: 20 }, (_, i) => ({
    id: `livecam-${i}`,
    name: `Streamer ${i}`,
    username: `streamer${i}`,
    imageUrl: `https://picsum.photos/seed/livecam${i}/200`,
    isStreaming: i % 3 === 0,
    viewerCount: Math.floor(Math.random() * 1000),
    tags: ['tag1', 'tag2', 'tag3'].slice(0, Math.floor(Math.random() * 3) + 1),
    rating: Math.floor(Math.random() * 5) + 1,
    price: Math.floor(Math.random() * 10) + 5,
    category: ['gaming', 'chat', 'music', 'art'][Math.floor(Math.random() * 4)],
    region: filters.region || 'US',
    language: 'en'
  }));
};

export function useVisibleLivecams(initialFilters: LivecamFilters = {}) {
  const [livecams, setLivecams] = useState<Livecam[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<LivecamFilters>(initialFilters);
  
  // Load livecams with visibility algorithm applied
  const loadLivecams = useCallback(async (loadFilters: LivecamFilters = filters) => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch livecams from API
      const response = await fetchLivecams(loadFilters);
      
      // Register all livecams with visibility system
      response.forEach(livecam => {
        livecamVisibility.registerLivecam(livecam);
      });
      
      // Get sorted IDs from visibility system
      const sortedIds = livecamVisibility.getSortedLivecams({
        region: loadFilters.region,
        categories: loadFilters.categories,
        limit: loadFilters.limit
      });
      
      // Sort livecams according to visibility system
      const sortedLivecams = sortedIds
        .map(id => response.find(livecam => livecam.id === id))
        .filter((livecam): livecam is Livecam => !!livecam);
      
      // Append any remaining livecams
      const remainingLivecams = response.filter(
        livecam => !sortedLivecams.some(sorted => sorted.id === livecam.id)
      );
      
      // Filter by streaming if needed
      const filtered = [...sortedLivecams, ...remainingLivecams]
        .filter(livecam => loadFilters.isStreaming === undefined || 
                          livecam.isStreaming === loadFilters.isStreaming);
      
      // Set result
      setLivecams(filtered);
    } catch (err: any) {
      console.error('Error loading livecams with visibility:', err);
      setError(err.message || 'Failed to load livecams');
    } finally {
      setLoading(false);
    }
  }, [filters]);
  
  // Update filters and reload
  const updateFilters = useCallback((newFilters: Partial<LivecamFilters>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    loadLivecams(updatedFilters);
  }, [filters, loadLivecams]);
  
  // Record a view when a livecam is viewed
  const recordView = useCallback((livecamId: string) => {
    livecamVisibility.recordLivecamView(livecamId);
  }, []);
  
  // Initial load
  useEffect(() => {
    loadLivecams();
  }, [loadLivecams]);
  
  return {
    livecams,
    loading,
    error,
    filters,
    updateFilters,
    recordView,
    refreshLivecams: loadLivecams
  };
}

export default useVisibleLivecams;
