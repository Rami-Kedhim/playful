
import { useState, useEffect } from "react";
import { LivecamModel, LivecamsFilter } from "@/types/livecams";
import { fetchLivecams } from "@/services/livecamsService";
import { toast } from "sonner";

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
        
        console.log("Loading livecams with filters:", filters);
        
        const response = await fetchLivecams({
          ...filters,
          page: 1 // Reset to page 1 when filters change
        });
        
        console.log("Livecams response:", response);
        
        setModels(response.models || []);
        setHasMore(response.hasMore || false);
        setTotalCount(response.totalCount || 0);
        setPage(1);
      } catch (err: any) {
        console.error("Error loading livecams:", err);
        setError(err.message || "Failed to load livecams");
        setModels([]);
        toast.error(`Failed to load livecams: ${err.message || "Unknown error"}`);
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
      
      console.log("Loading more livecams, page:", nextPage);
      
      const response = await fetchLivecams({
        ...filters,
        page: nextPage
      });
      
      if (response && response.models) {
        setModels(prevModels => [...prevModels, ...response.models]);
        setHasMore(response.hasMore || false);
        setPage(nextPage);
      } else {
        console.warn("No models received when loading more");
        setHasMore(false);
      }
    } catch (err: any) {
      console.error("Error loading more livecams:", err);
      setError(err.message || "Failed to load more livecams");
      toast.error(`Failed to load more: ${err.message || "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  };

  // Function to update filters
  const updateFilters = (newFilters: Partial<LivecamsFilter>) => {
    console.log("Updating filters:", newFilters);
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
