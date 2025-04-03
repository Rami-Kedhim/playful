
import { useState, useEffect } from "react";
import { LivecamModel, LivecamsFilter } from "@/types/livecams";
import { fetchLivecams } from "@/services/livecamsService";

export const useLivecams = (initialFilters: LivecamsFilter = {}) => {
  const [models, setModels] = useState<LivecamModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<LivecamsFilter>(initialFilters);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);

  // Load models when filters change
  useEffect(() => {
    const loadModels = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetchLivecams({
          ...filters,
          page: 1 // Reset to page 1 when filters change
        });
        
        setModels(response.models);
        setHasMore(response.hasMore);
        setTotalCount(response.totalCount);
        setPage(1);
      } catch (err: any) {
        console.error("Error loading livecams:", err);
        setError(err.message || "Failed to load livecams");
        setModels([]);
      } finally {
        setLoading(false);
      }
    };
    
    loadModels();
  }, [filters]);

  // Function to load more models (pagination)
  const loadMore = async () => {
    if (loading || !hasMore) return;
    
    try {
      setLoading(true);
      const nextPage = page + 1;
      
      const response = await fetchLivecams({
        ...filters,
        page: nextPage
      });
      
      setModels(prevModels => [...prevModels, ...response.models]);
      setHasMore(response.hasMore);
      setPage(nextPage);
    } catch (err: any) {
      console.error("Error loading more livecams:", err);
      setError(err.message || "Failed to load more livecams");
    } finally {
      setLoading(false);
    }
  };

  // Function to update filters
  const updateFilters = (newFilters: Partial<LivecamsFilter>) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      ...newFilters
    }));
  };

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
};

export default useLivecams;
