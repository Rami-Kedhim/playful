
import { useState, useEffect, useCallback } from 'react';
import { ContentCreator } from '@/types/creator';
import CreatorVisibilityAdapter from '@/services/visibility/CreatorVisibilityAdapter';

interface CreatorFilters {
  region?: string;
  tags?: string[];
  isPremium?: boolean;
  limit?: number;
}

// Instantiate visibility adapter inside hook
const visibilityAdapter = new CreatorVisibilityAdapter([]);

const fetchCreators = async (filters: CreatorFilters): Promise<ContentCreator[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));

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
    languages: ['en'] // Fixed to languages array
  }));
};

export function useVisibleCreators(initialFilters: CreatorFilters = {}) {
  const [creators, setCreators] = useState<ContentCreator[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<CreatorFilters>(initialFilters);

  const loadCreators = useCallback(async (loadFilters: CreatorFilters = filters) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetchCreators(loadFilters);

      // Update visibilityAdapter creators list
      visibilityAdapter.creators = response;

      // Get sorted IDs by instance methods
      const sortedIds = visibilityAdapter.getSortedCreators
        ? visibilityAdapter.getSortedCreators({
          region: loadFilters.region,
          tags: loadFilters.tags,
          limit: loadFilters.limit,
        })
        : [];

      // Sort creators based on sortedIds
      const sortedCreators = sortedIds
        .map(id => response.find(creator => creator.id === id))
        .filter((creator): creator is ContentCreator => !!creator);

      const remainingCreators = response.filter(
        creator => !sortedCreators.some(sorted => sorted.id === creator.id)
      );

      const filtered = [...sortedCreators, ...remainingCreators].filter(
        creator => loadFilters.isPremium === undefined ||
          creator.isPremium === loadFilters.isPremium
      );

      setCreators(filtered);
    } catch (err: any) {
      console.error('Error loading creators with visibility:', err);
      setError(err.message || 'Failed to load creators');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const updateFilters = useCallback((newFilters: Partial<CreatorFilters>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    loadCreators(updatedFilters);
  }, [filters, loadCreators]);

  const recordView = useCallback((creatorId: string) => {
    if (visibilityAdapter.recordCreatorView) {
      visibilityAdapter.recordCreatorView(creatorId);
    }
  }, []);

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
    refreshCreators: loadCreators,
  };
}

export default useVisibleCreators;
