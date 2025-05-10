
import { useState, useEffect, useCallback } from 'react';
import { BoostAnalytics, AnalyticsData } from '@/types/pulse-boost';
import { pulseBoostService } from '@/services/boost/pulseBoostService';

export const useBoostAnalytics = (profileId: string) => {
  const [analytics, setAnalytics] = useState<BoostAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const fetchAnalytics = useCallback(async () => {
    if (!profileId) {
      setLoading(false);
      return;
    }
    
    try {
      setLoading(true);
      const data = await pulseBoostService.getBoostAnalytics(profileId);
      
      // Ensure data meets the requirements of BoostAnalytics type
      const boostAnalytics: BoostAnalytics = {
        totalBoosts: data.totalBoosts || 0,
        activeBoosts: data.activeBoosts || 0,
        averageBoostScore: data.averageBoostScore || 0,
        boostHistory: data.boostHistory || [],
        additionalViews: data.additionalViews,
        engagementIncrease: data.engagementIncrease,
        rankingPosition: data.rankingPosition,
        views: data.views,
        impressions: typeof data.impressions === 'object' ? data.impressions : undefined,
        interactions: typeof data.interactions === 'object' ? data.interactions : undefined
      };
      
      setAnalytics(boostAnalytics);
      setError(null);
    } catch (err) {
      console.error('Error fetching boost analytics:', err);
      setError('Failed to fetch boost analytics');
    } finally {
      setLoading(false);
    }
  }, [profileId]);
  
  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);
  
  return {
    analytics,
    loading,
    error,
    refreshAnalytics: fetchAnalytics
  };
};

export default useBoostAnalytics;
