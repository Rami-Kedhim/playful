
import { useState, useEffect, useCallback } from 'react';
import { brainHub } from '@/services/neural/HermesOxumBrainHub';

// Define types for the livecam data
interface LivecamModel {
  id: string;
  name: string;
  isLive: boolean;
  viewerCount: number;
  thumbnailUrl: string;
  profileUrl: string;
  tags: string[];
  boosted: boolean;
  boostScore?: number;
  boostRank?: string;
}

interface BoostableLivecamsOptions {
  limit?: number;
  onlyLive?: boolean;
  categories?: string[];
}

export const useBoostableLivecams = (options: BoostableLivecamsOptions = {}) => {
  const [livecams, setLivecams] = useState<LivecamModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [boostedIds, setBoostedIds] = useState<string[]>([]);
  
  const fetchLivecams = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Mock data generation
      const mockLivecams = generateMockLivecams(options.limit || 10, options.onlyLive);
      
      // Process through Brain Hub
      const processedLivecams = await processThroughBrainHub(mockLivecams);
      
      // Track which livecams are boosted
      const boostIds = processedLivecams.filter(cam => cam.boosted).map(cam => cam.id);
      setBoostedIds(boostIds);
      
      setLivecams(processedLivecams);
    } catch (err) {
      console.error('Error fetching livecams:', err);
      setError('Failed to load livecam data');
    } finally {
      setLoading(false);
    }
  }, [options.limit, options.onlyLive, options.categories]);
  
  // Fetch data on mount
  useEffect(() => {
    fetchLivecams();
  }, [fetchLivecams]);
  
  // Helper to process livecams through Brain Hub
  const processThroughBrainHub = async (data: LivecamModel[]): Promise<LivecamModel[]> => {
    try {
      const response = await brainHub.processRequest({
        type: 'livecam_boost',
        data,
        options: {
          applyBoostScores: true,
          filterInappropriate: true
        }
      });
      
      return response.data || data;
    } catch (error) {
      console.error('Error processing livecams through Brain Hub:', error);
      return data;
    }
  };
  
  // Helper to boost a specific livecam
  const boostLivecam = useCallback(async (id: string): Promise<boolean> => {
    try {
      const livecamToBoost = livecams.find(cam => cam.id === id);
      if (!livecamToBoost) return false;
      
      const response = await brainHub.processRequest({
        type: 'apply_boost',
        data: {
          itemId: id,
          itemType: 'livecam',
          currentScore: livecamToBoost.boostScore || 0
        }
      });
      
      if (response.success) {
        setLivecams(prev => 
          prev.map(cam => 
            cam.id === id 
              ? { ...cam, boosted: true, boostScore: response.data.newScore, boostRank: response.data.boostRank } 
              : cam
          )
        );
        setBoostedIds(prev => [...prev, id]);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error boosting livecam:', error);
      return false;
    }
  }, [livecams]);
  
  // Helper to cancel a boost for a livecam
  const cancelBoost = useCallback(async (id: string): Promise<boolean> => {
    try {
      const response = await brainHub.processRequest({
        type: 'cancel_boost',
        data: {
          itemId: id,
          itemType: 'livecam'
        }
      });
      
      if (response.success) {
        setLivecams(prev => 
          prev.map(cam => 
            cam.id === id 
              ? { ...cam, boosted: false, boostScore: undefined, boostRank: undefined } 
              : cam
          )
        );
        setBoostedIds(prev => prev.filter(itemId => itemId !== id));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error canceling boost:', error);
      return false;
    }
  }, []);

  // Check if a livecam is boosted
  const isBoosted = useCallback((id: string) => {
    return boostedIds.includes(id);
  }, [boostedIds]);
  
  // Helper function to generate mock data
  const generateMockLivecams = (limit: number, onlyLive = false): LivecamModel[] => {
    const models: LivecamModel[] = [];
    
    for (let i = 0; i < limit; i++) {
      const isLive = onlyLive ? true : Math.random() > 0.3;
      
      models.push({
        id: `livecam-${i}`,
        name: `Model ${i}`,
        isLive,
        viewerCount: isLive ? Math.floor(Math.random() * 5000) : 0,
        thumbnailUrl: `https://picsum.photos/seed/livecam${i}/300/200`,
        profileUrl: `/livecams/model-${i}`,
        tags: ['interactive', 'hd', Math.random() > 0.5 ? 'featured' : 'new'],
        boosted: Math.random() > 0.8,
        boostScore: Math.random() > 0.7 ? Math.floor(Math.random() * 100) : undefined
      });
    }
    
    return models;
  };
  
  return {
    livecams,
    loading,
    error,
    refreshLivecams: fetchLivecams,
    boostLivecam,
    filters: options,
    hasMore: false,
    totalCount: livecams.length,
    loadMore: () => {}, // No-op function for pagination
    updateFilters: () => {}, // No-op function for filters
    cancelBoost, // Function for canceling boosts
    isBoosted, // Function to check if boosted
    boostedIds // Array of boosted IDs
  };
};

export default useBoostableLivecams;
