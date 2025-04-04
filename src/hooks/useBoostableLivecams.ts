
/**
 * Hook to access livecams with boost capabilities
 */
import { useState, useEffect, useCallback } from 'react';
import { LivecamModel } from '@/types/livecams';
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
  
  // Update boosted IDs on load
  useEffect(() => {
    // In a real app, we'd fetch this from an API
    // For now, just use a mock check
    setBoostedIds(models.filter(lc => lc.id.endsWith('1')).map(lc => lc.id));
  }, [models]);
  
  // Boost a livecam
  const boostLivecam = useCallback((livecamId: string, intensity?: number, durationHours?: number) => {
    const livecam = models.find(lc => lc.id === livecamId);
    if (!livecam) {
      toast({
        title: "Boost Error",
        description: "Could not find the selected livecam",
        variant: "destructive",
      });
      return false;
    }
    
    // Convert LivecamModel to what the boost adapter needs
    const boostableLivecam = {
      id: livecam.id,
      username: livecam.username,
      name: livecam.displayName,
      imageUrl: livecam.imageUrl,
      thumbnailUrl: livecam.thumbnailUrl || livecam.imageUrl,
      isStreaming: livecam.isLive,
      viewerCount: livecam.viewerCount || 0,
      region: livecam.country || 'unknown',
      language: livecam.language || 'en',
      tags: livecam.categories || [],
      category: livecam.categories?.[0] || 'general',
      rating: 5 // Default high rating
    };
    
    livecamBoost.boostLivecam(boostableLivecam, intensity, durationHours);
    
    setBoostedIds(prev => [...prev, livecamId]);
    
    toast({
      title: "Boost Applied",
      description: `${livecam.displayName || livecam.username} has been boosted!`,
    });
    
    return true;
  }, [models, toast]);
  
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
    livecams: models, // Return the original models directly
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
