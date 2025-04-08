
import { useState, useEffect } from 'react';
import { LivecamModel } from '@/types/livecams';
import { useLivecamContext } from '@/modules/livecams/providers/LivecamProvider';

interface UseLivecamsOptions {
  initialData?: LivecamModel[];
  filters?: {
    status?: 'all' | 'live' | 'offline';
    categories?: string[];
    gender?: string;
    region?: string;
    minViewers?: number;
    sortBy?: string;
  };
}

export const useLivecams = (options: UseLivecamsOptions = {}) => {
  const { state, loadLivecams, applyFilters, resetFilters, loadMore } = useLivecamContext();
  const [initialized, setInitialized] = useState(false);
  
  // Apply initial filters if provided
  useEffect(() => {
    if (options.filters && !initialized) {
      applyFilters(options.filters);
      setInitialized(true);
    }
  }, [options.filters, initialized]);
  
  // Function to fetch livecams with optional force refresh
  const fetchLivecams = async (forceRefresh = false) => {
    await loadLivecams(forceRefresh);
  };
  
  // Function to update filters
  const updateFilters = (newFilters: Partial<typeof options.filters>) => {
    applyFilters(newFilters);
  };
  
  // Get values from state
  const {
    filteredLivecams,
    livecams: allLivecams,
    isLoading,
    error,
    filters,
    pagination
  } = state;
  
  return {
    livecams: filteredLivecams,
    allLivecams,
    loading: isLoading,
    error,
    filters,
    totalCount: pagination.total,
    hasMore: pagination.hasMore,
    fetchLivecams,
    updateFilters,
    resetFilters,
    loadMore
  };
};

export default useLivecams;
