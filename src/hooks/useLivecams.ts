
import { useState, useEffect, useCallback } from 'react';
import { LivecamModel, LivecamsFilter, LivecamsResponse } from '@/types/livecams';
import { fetchLivecams } from '@/services/livecamsService';

export function useLivecams(initialFilters: LivecamsFilter = {}) {
  const [models, setModels] = useState<LivecamModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<LivecamsFilter>(initialFilters);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  
  // Load livecams
  const loadLivecams = useCallback(async (loadFilters: LivecamsFilter = filters, replace = true) => {
    try {
      setLoading(true);
      setError(null);
      
      // Call API service
      const response = await fetchLivecams({
        ...loadFilters,
        page: replace ? 1 : page + 1
      });
      
      // Update state with response
      setModels(prev => replace ? response.models : [...prev, ...response.models]);
      setTotalCount(response.totalCount);
      setPage(replace ? 1 : page + 1);
      setHasMore(response.hasMore);
    } catch (err: any) {
      console.error("Error loading livecams:", err);
      setError(err.message || 'Failed to load livecams');
    } finally {
      setLoading(false);
    }
  }, [filters, page]);
  
  // Load more livecams (pagination)
  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      loadLivecams(filters, false);
    }
  }, [loading, hasMore, filters, loadLivecams]);
  
  // Update filters
  const updateFilters = useCallback((newFilters: Partial<LivecamsFilter>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    loadLivecams(updatedFilters);
  }, [filters, loadLivecams]);
  
  // Initial load
  useEffect(() => {
    loadLivecams();
  }, [loadLivecams]);
  
  return {
    models,
    loading,
    error,
    filters,
    hasMore,
    totalCount,
    loadMore,
    updateFilters
  };
}

export default useLivecams;
