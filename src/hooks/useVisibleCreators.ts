
/**
 * Hook to access creators sorted by visibility algorithm
 */
import { useState, useEffect, useCallback } from 'react';
import { ContentCreator } from '@/types/creator';
import creatorVisibility from '@/services/visibility/CreatorVisibilityAdapter';

interface CreatorFilters {
  region?: string;
  tags?: string[];
  isPremium?: boolean;
  limit?: number;
}

// Mock function (replace with actual API call)
const fetchCreators = async (filters: CreatorFilters): Promise<ContentCreator[]> => {
  // This would be an API call in production
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Return mock data
  return Array.from({ length: 20 }, (_, i) => ({
    id: `creator-${i}`,
    name: `Creator ${i}`,
    username: `creator${i}`,
    imageUrl: `https://picsum.photos/seed/creator${i}/200`,
    bio: `This is creator ${i}'s bio`,
    isPremium: i % 3 === 0,
    isLive: i % 5 === 0,
    isAI: i % 7 === 0,
    subscriberCount: Math.floor(Math.random() * 1000),
    contentCount: {
      photos: Math.floor(Math.random() * 100),
      videos: Math.floor(Math.random() * 20)
    },
    price: Math.floor(Math.random() * 20) + 5,
    createdAt: new Date().toISOString(),
    tags: ['tag1', 'tag2', 'tag3'].slice(0, Math.floor(Math.random() * 3) + 1),
    rating: Math.floor(Math.random() * 5) + 1,
    region: filters.region || 'US',
    language: 'en'
  }));
};

export function useVisibleCreators(initialFilters: CreatorFilters = {}) {
  const [creators, setCreators] = useState<ContentCreator[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<CreatorFilters>(initialFilters);
  
  // Load creators with visibility algorithm applied
  const loadCreators = useCallback(async (loadFilters: CreatorFilters = filters) => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch creators from API
      const response = await fetchCreators(loadFilters);
      
      // Register all creators with visibility system
      response.forEach(creator => {
        creatorVisibility.registerCreator(creator);
      });
      
      // Get sorted IDs from visibility system
      const sortedIds = creatorVisibility.getSortedCreators({
        region: loadFilters.region,
        tags: loadFilters.tags,
        limit: loadFilters.limit
      });
      
      // Sort creators according to visibility system
      const sortedCreators = sortedIds
        .map(id => response.find(creator => creator.id === id))
        .filter((creator): creator is ContentCreator => !!creator);
      
      // Append any remaining creators
      const remainingCreators = response.filter(
        creator => !sortedCreators.some(sorted => sorted.id === creator.id)
      );
      
      // Filter by premium if needed
      const filtered = [...sortedCreators, ...remainingCreators]
        .filter(creator => loadFilters.isPremium === undefined || 
                          creator.isPremium === loadFilters.isPremium);
      
      // Set result
      setCreators(filtered);
    } catch (err: any) {
      console.error('Error loading creators with visibility:', err);
      setError(err.message || 'Failed to load creators');
    } finally {
      setLoading(false);
    }
  }, [filters]);
  
  // Update filters and reload
  const updateFilters = useCallback((newFilters: Partial<CreatorFilters>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    loadCreators(updatedFilters);
  }, [filters, loadCreators]);
  
  // Record a view when a creator is viewed
  const recordView = useCallback((creatorId: string) => {
    creatorVisibility.recordCreatorView(creatorId);
  }, []);
  
  // Initial load
  useEffect(() => {
    loadCreators();
  }, [loadCreators]);
  
  return {
    creators,
    loading,
    error,
    filters,
    updateFilters,
    recordView,
    refreshCreators: loadCreators
  };
}

export default useVisibleCreators;
