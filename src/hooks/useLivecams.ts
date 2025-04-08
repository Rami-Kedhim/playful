
import { useState, useCallback } from 'react';
import { useLivecamContext } from '@/modules/livecams/providers/LivecamProvider';
import { LivecamModel } from '@/types/livecams';

export function useLivecams() {
  const { state, loadLivecams, updateFilters: updateContextFilters } = useLivecamContext();
  const { livecams, featuredLivecams, isLoading, error, filters } = state;
  
  // Add functions that were missing in the context
  const applyFilters = useCallback(async () => {
    await loadLivecams(true); // Use neural processing
  }, [loadLivecams]);
  
  const resetFilters = useCallback(() => {
    updateContextFilters({
      categories: [],
      viewers: [0, 10000],
      sortBy: 'recommended',
      showOffline: false
    });
    loadLivecams(true);
  }, [updateContextFilters, loadLivecams]);
  
  const loadMore = useCallback(() => {
    // Implementation would load more livecams
    console.log("Loading more livecams...");
  }, []);
  
  // Define properties that were missing
  const filteredLivecams = livecams;
  const pagination = {
    page: 1,
    limit: 20,
    total: livecams.length,
    hasMore: false
  };

  return {
    livecams,
    featuredLivecams,
    loading: isLoading,
    error,
    filters,
    updateFilters: updateContextFilters,
    applyFilters,
    resetFilters,
    loadMore,
    filteredLivecams,
    pagination
  };
}

export default useLivecams;
