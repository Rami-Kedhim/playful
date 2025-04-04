
/**
 * Hook to access livecams sorted by visibility algorithm
 */
import { useState, useEffect, useCallback } from 'react';
import { LivecamsFilter, LivecamsResponse, LivecamModel } from '@/types/livecams';
import { fetchLivecams } from '@/services/livecamsService';
import livecamVisibility from '@/services/visibility/LivecamVisibilityAdapter';

export function useVisibleLivecams(initialFilters: LivecamsFilter = {}) {
  const [livecams, setLivecams] = useState<LivecamModel[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<LivecamsFilter>(initialFilters);
  
  // Load livecams with visibility algorithm applied
  const loadLivecams = useCallback(async (loadFilters: LivecamsFilter = filters) => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch livecams from API
      const response = await fetchLivecams(loadFilters);
      
      // Register all models with visibility system
      response.models.forEach(model => {
        livecamVisibility.registerLivecam(model);
      });
      
      // Get sorted IDs from visibility system
      const sortedIds = livecamVisibility.getSortedLivecams({
        region: loadFilters.country,
        category: loadFilters.category,
        limit: loadFilters.limit
      });
      
      // Sort livecams according to visibility system
      const sortedLivecams = sortedIds
        .map(id => response.models.find(model => model.id === id))
        .filter((model): model is LivecamModel => !!model);
      
      // Append any remaining models
      const remainingModels = response.models.filter(
        model => !sortedLivecams.some(sorted => sorted.id === model.id)
      );
      
      // Set combined result
      setLivecams([...sortedLivecams, ...remainingModels]);
    } catch (err: any) {
      console.error('Error loading livecams with visibility:', err);
      setError(err.message || 'Failed to load livecams');
    } finally {
      setLoading(false);
    }
  }, [filters]);
  
  // Update filters and reload
  const updateFilters = useCallback((newFilters: Partial<LivecamsFilter>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    loadLivecams(updatedFilters);
  }, [filters, loadLivecams]);
  
  // Record a view when a livecam is viewed
  const recordView = useCallback((modelId: string) => {
    livecamVisibility.recordLivecamView(modelId);
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
