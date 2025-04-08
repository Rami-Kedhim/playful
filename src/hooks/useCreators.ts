
import { useState, useEffect } from 'react';
import { useCreatorContext } from '@/modules/creators/providers/CreatorProvider';

export interface Creator {
  id: string;
  name: string;
  username: string;
  imageUrl: string;
  bio?: string;
  isLive: boolean;
  isPremium: boolean;
  isAI: boolean;
  subscriberCount: number;
  contentCount?: {
    photos: number;
    videos: number;
  };
  price: number;
  tags: string[];
  rating: number;
  region?: string;
  language?: string;
  neuralScore?: number;
}

interface UseCreatorsOptions {
  initialData?: Creator[];
  filters?: {
    categories?: string[];
    priceRange?: [number, number];
    sortBy?: string;
    rating?: number;
    showAI?: boolean;
  };
}

export const useCreators = (options: UseCreatorsOptions = {}) => {
  const { state, loadCreators, applyFilters, resetFilters } = useCreatorContext();
  const [initialized, setInitialized] = useState(false);
  
  // Apply initial filters if provided
  useEffect(() => {
    if (options.filters && !initialized) {
      applyFilters(options.filters);
      setInitialized(true);
    }
  }, [options.filters, initialized]);
  
  // Function to fetch creators with optional force refresh
  const fetchCreators = async (forceRefresh = false) => {
    await loadCreators(forceRefresh);
  };
  
  // Function to update filters
  const updateFilters = (newFilters: Partial<typeof options.filters>) => {
    applyFilters(newFilters);
  };
  
  return {
    creators: state.filteredCreators,
    allCreators: state.creators,
    loading: state.isLoading,
    error: state.error,
    filters: state.filters,
    fetchCreators,
    updateFilters,
    resetFilters
  };
};

export default useCreators;
