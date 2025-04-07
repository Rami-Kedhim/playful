
/**
 * Custom hook to fetch and manage livecams with boosting capabilities
 * Uses the LivecamScraper for data fetching
 */
import { useState, useEffect, useCallback } from "react";
import { LivecamModel, LivecamsFilter } from "@/types/livecams";
import { useNotifications } from "@/contexts/NotificationsContext";
import { LivecamScraper } from "@/services/scrapers/LivecamScraper";
import { brainHub } from "@/services/neural/HermesOxumBrainHub";

export const useBoostableLivecams = () => {
  const [livecams, setLivecams] = useState<LivecamModel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [boostedIds, setBoostedIds] = useState<string[]>([]);
  const [filters, setFilters] = useState<LivecamsFilter>({
    page: 1,
    limit: 24,
  });
  
  const { showSuccess, showError } = useNotifications();
  
  const loadLivecams = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Access the singleton instance
      const scraper = LivecamScraper.getInstance();
      
      // Configure filters
      scraper.setFilters({
        region: filters.country,
        categories: filters.category ? [filters.category] : [],
        limit: filters.limit || 24
      });
      
      // Perform scraping
      const models = await scraper.scrape();
      const response = scraper.getResponse();
      
      setLivecams(models);
      setTotalCount(response.totalCount);
      setHasMore(response.hasMore);
      
      // Process models through Brain Hub for any boosting information
      const boostedModelIds: string[] = [];
      
      // Process each model through Brain Hub
      for (const model of models) {
        const brainHubResponse = await brainHub.processRequest({
          requestType: 'livecam',
          targetId: model.id,
          region: filters.country
        });
        
        // Ensure we properly check the response after awaiting it
        if (brainHubResponse && 
            brainHubResponse.economicData && 
            brainHubResponse.economicData.price && 
            brainHubResponse.economicData.price > 50) {
          boostedModelIds.push(model.id);
        }
      }
      
      setBoostedIds(boostedModelIds);
    } catch (err: any) {
      console.error("Error loading livecams:", err);
      setError(err.message || "Failed to load livecams data");
    } finally {
      setLoading(false);
    }
  }, [filters]);
  
  const loadMore = useCallback(() => {
    setFilters(prev => ({ 
      ...prev, 
      page: (prev.page || 1) + 1 
    }));
  }, []);
  
  const updateFilters = useCallback((newFilters: Partial<LivecamsFilter>) => {
    setFilters(prev => ({ 
      ...prev,
      ...newFilters,
      page: 1  // Reset to first page when filters change
    }));
  }, []);
  
  const boostLivecam = useCallback(async (modelId: string, intensity: number, durationHours: number): Promise<boolean> => {
    try {
      // Process through Brain Hub boost system
      const response = await brainHub.processRequest({
        requestType: 'economic',
        targetId: modelId
      });
      
      if (response.isRegionAllowed) {
        setBoostedIds(prev => [...prev, modelId]);
        showSuccess("Boost Applied", "Livecam has been boosted successfully");
      } else {
        showError("Boost Failed", "This content cannot be boosted in your region");
      }
      
      return true;
    } catch (err) {
      console.error("Error boosting livecam:", err);
      showError("Boost Error", "Failed to apply boost to livecam");
      return false;
    }
  }, [showSuccess, showError]);
  
  const cancelBoost = useCallback(async (modelId: string): Promise<boolean> => {
    try {
      // Process through Brain Hub to cancel boost
      await brainHub.processRequest({
        requestType: 'economic',
        targetId: modelId,
        content: JSON.stringify({ action: 'cancel_boost' })
      });
      
      setBoostedIds(prev => prev.filter(id => id !== modelId));
      showSuccess("Boost Canceled", "Livecam boost has been canceled");
      return true;
    } catch (err) {
      console.error("Error canceling boost:", err);
      showError("Error", "Failed to cancel livecam boost");
      return false;
    }
  }, [showSuccess, showError]);
  
  const isBoosted = useCallback((modelId: string) => {
    return boostedIds.includes(modelId);
  }, [boostedIds]);
  
  useEffect(() => {
    loadLivecams();
  }, [loadLivecams]);
  
  return {
    livecams,
    loading,
    error,
    hasMore,
    totalCount,
    loadMore,
    filters,
    updateFilters,
    boostLivecam,
    cancelBoost,
    isBoosted,
    boostedIds,
    refresh: loadLivecams
  };
};

export default useBoostableLivecams;
