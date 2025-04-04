
/**
 * Hook to access livecams with boost capabilities
 */
import { useState, useEffect, useCallback } from 'react';
import { Livecam } from '@/types/livecams';
import { useLivecams } from './useLivecams';
import livecamBoost from '@/services/visibility/LivecamBoostAdapter';
import { useToast } from '@/components/ui/use-toast';

export function useBoostableLivecams(initialFilters = {}) {
  // Use the base livecams hook
  const {
    models,
    loading,
    error,
    filters,
    hasMore,
    totalCount,
    loadMore,
    updateFilters
  } = useLivecams(initialFilters);
  
  const { toast } = useToast();
  const [boostedIds, setBoostedIds] = useState<string[]>([]);
  
  // Convert models to Livecam type for boost system
  const livecams = models.map(model => ({
    id: model.id,
    username: model.username,
    name: model.displayName,
    imageUrl: model.imageUrl,
    thumbnailUrl: model.thumbnailUrl,
    isStreaming: model.isLive,
    viewerCount: model.viewerCount || 0,
    region: model.country || 'unknown',
    language: model.language || 'en',
    tags: model.categories || [],
    category: model.categories?.[0] || 'general',
    rating: 5 // Default high rating
  }));
  
  // Update boosted IDs on load
  useEffect(() => {
    // In a real app, we'd fetch this from an API
    // For now, just use a mock check
    setBoostedIds(livecams.filter(lc => lc.id.endsWith('1')).map(lc => lc.id));
  }, [livecams]);
  
  // Boost a livecam
  const boostLivecam = useCallback((livecamId: string, intensity?: number, durationHours?: number) => {
    const livecam = livecams.find(lc => lc.id === livecamId);
    if (!livecam) {
      toast({
        title: "Boost Error",
        description: "Could not find the selected livecam",
        variant: "destructive",
      });
      return false;
    }
    
    livecamBoost.boostLivecam(livecam, intensity, durationHours);
    
    setBoostedIds(prev => [...prev, livecamId]);
    
    toast({
      title: "Boost Applied",
      description: `${livecam.name || livecam.username} has been boosted!`,
    });
    
    return true;
  }, [livecams, toast]);
  
  // Cancel a boost
  const cancelBoost = useCallback((livecamId: string) => {
    livecamBoost.removeLivecamBoost(livecamId);
    
    setBoostedIds(prev => prev.filter(id => id !== livecamId));
    
    toast({
      title: "Boost Cancelled",
      description: "The boost has been cancelled",
    });
    
    return true;
  }, [toast]);
  
  // Check if a livecam is boosted
  const isBoosted = useCallback((livecamId: string) => {
    return boostedIds.includes(livecamId);
  }, [boostedIds]);
  
  return {
    livecams,
    loading,
    error,
    filters,
    hasMore,
    totalCount,
    loadMore,
    updateFilters,
    boostLivecam,
    cancelBoost,
    isBoosted,
    boostedIds
  };
}

export default useBoostableLivecams;
