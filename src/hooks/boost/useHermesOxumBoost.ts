
/**
 * Hook to integrate the Hermes + Oxum algorithms with the existing boost system
 */

import { useState, useCallback, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { updateBoostScores, sortProfilesByScore, applyRepetitionPenalty, resetRepetitionPenalties } from "@/utils/oxum/oxumAlgorithm";
import { getOptimalTimeWindow } from "@/utils/hermes/hermesMath";

// Initialize with a 60-second refresh interval
const REFRESH_INTERVAL = 60 * 1000;

export type HermesBoostStatus = {
  profileId: string;
  boostScore: number;
  position: number;
  effectivenessScore: number;
  timeRemaining: number;
  isActive: boolean;
};

export const useHermesOxumBoost = (profileId?: string) => {
  const [loading, setLoading] = useState(false);
  const [hermesBoostStatus, setHermesBoostStatus] = useState<HermesBoostStatus>({
    profileId: profileId || '',
    boostScore: 0,
    position: 0,
    effectivenessScore: 0,
    timeRemaining: 0,
    isActive: false
  });
  const [recentlyViewedProfiles, setRecentlyViewedProfiles] = useState<string[]>([]);

  // Get current system load (mock implementation)
  const getCurrentSystemLoad = useCallback(async (): Promise<number> => {
    // In a real implementation, this would check active users, server load, etc.
    // For now, return a random value between 0.3 and 0.9
    return 0.3 + Math.random() * 0.6;
  }, []);

  // Calculate position in queue based on Oxum algorithm
  const calculatePositionInQueue = useCallback(async (profileId: string): Promise<number> => {
    try {
      // This should fetch profiles and their scores from the database
      // For now, we'll simulate it
      const { data: activeBoosts, error } = await supabase
        .from('active_boosts')
        .select('user_id, start_time, boost_data')
        .eq('status', 'active');
        
      if (error) throw error;
      
      if (!activeBoosts || activeBoosts.length === 0) {
        return 0;
      }
      
      // Convert to ProfileScoreData format
      const profileScores = activeBoosts.map(boost => ({
        profileId: boost.user_id,
        boostScore: boost.boost_data?.score || 50,
        engagementScore: boost.boost_data?.engagement || 50,
        timeSinceLastTop: 
          (new Date().getTime() - new Date(boost.start_time).getTime()) / (1000 * 60 * 60),
        repetitionPenalty: boost.boost_data?.repetitionPenalty || 0,
        region: boost.boost_data?.region || 'global',
        language: boost.boost_data?.language || 'en',
        lastCalculated: new Date(boost.boost_data?.lastCalculated || boost.start_time)
      }));
      
      // Update scores based on current time
      const updatedProfiles = updateBoostScores(profileScores);
      
      // Apply repetition penalties
      const penalizedProfiles = applyRepetitionPenalty(
        updatedProfiles, 
        recentlyViewedProfiles
      );
      
      // Sort profiles
      const sortedProfiles = sortProfilesByScore(penalizedProfiles);
      
      // Find position of the profile
      const position = sortedProfiles.findIndex(p => p.profileId === profileId);
      return position >= 0 ? position + 1 : 0;
    } catch (err) {
      console.error("Error calculating queue position:", err);
      return 0;
    }
  }, [recentlyViewedProfiles]);

  // Effectiveness of the boost based on Hermes model
  const calculateBoostEffectiveness = useCallback((): number => {
    const optimalTime = getOptimalTimeWindow();
    const currentHour = new Date().getHours();
    
    // Simplified effectiveness calculation
    if (optimalTime === 1) {
      // Prime time
      return 90 + Math.random() * 10; // 90-100%
    } else if (optimalTime === -1) {
      // Off-peak
      return 40 + Math.random() * 30; // 40-70%
    } else {
      // Regular time
      return 70 + Math.random() * 20; // 70-90%
    }
  }, []);

  // Update boost stats periodically
  useEffect(() => {
    if (!profileId) return;
    
    const updateBoostStats = async () => {
      setLoading(true);
      try {
        // Check if profile has an active boost
        const { data: boostData, error } = await supabase
          .from('active_boosts')
          .select('*')
          .eq('user_id', profileId)
          .eq('status', 'active')
          .single();
          
        if (error && error.code !== 'PGRST116') { // PGRST116 means no rows returned
          throw error;
        }
        
        if (boostData) {
          const position = await calculatePositionInQueue(profileId);
          const effectivenessScore = calculateBoostEffectiveness();
          
          // Calculate time remaining
          const startTime = new Date(boostData.start_time).getTime();
          const endTime = new Date(boostData.end_time).getTime();
          const now = new Date().getTime();
          const timeRemaining = Math.max(0, (endTime - now) / (1000 * 60)); // minutes
          
          setHermesBoostStatus({
            profileId,
            boostScore: boostData.boost_data?.score || 50,
            position,
            effectivenessScore,
            timeRemaining,
            isActive: true
          });
        } else {
          setHermesBoostStatus({
            profileId,
            boostScore: 0,
            position: 0,
            effectivenessScore: 0,
            timeRemaining: 0,
            isActive: false
          });
        }
      } catch (err) {
        console.error("Error updating boost stats:", err);
      } finally {
        setLoading(false);
      }
    };
    
    // Update immediately and then set interval
    updateBoostStats();
    const interval = setInterval(updateBoostStats, REFRESH_INTERVAL);
    
    return () => clearInterval(interval);
  }, [profileId, calculatePositionInQueue, calculateBoostEffectiveness]);

  // Record a profile view to apply repetition penalty
  const recordProfileView = useCallback((viewedProfileId: string) => {
    setRecentlyViewedProfiles(prev => {
      const updated = [...prev, viewedProfileId].slice(-20); // Keep only last 20 viewed
      return updated;
    });
  }, []);

  return {
    hermesBoostStatus,
    loading,
    recordProfileView,
  };
};

export default useHermesOxumBoost;
