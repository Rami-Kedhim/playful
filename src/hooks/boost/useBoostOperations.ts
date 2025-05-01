
import { useState, useEffect } from 'react';
import { BoostAnalytics, BoostPackage, BoostStatus } from '@/types/boost';

interface UseBoostOperationsProps {
  profileId: string;
}

export const useBoostOperations = ({ profileId }: UseBoostOperationsProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [boostStatus, setBoostStatus] = useState<BoostStatus>({ 
    isActive: false,
    packageId: undefined,
    expiresAt: undefined
  });
  const [analytics, setAnalytics] = useState<BoostAnalytics | null>(null);

  // Fetch boost status on mount and when profileId changes
  useEffect(() => {
    const fetchBoostStatus = async () => {
      if (!profileId) return;
      
      setLoading(true);
      
      try {
        // Mock boost status data
        const mockStatus: BoostStatus = {
          isActive: Math.random() > 0.5,
          packageId: 'boost-premium',
          startedAt: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
          expiresAt: new Date(Date.now() + 16 * 60 * 60 * 1000), // 16 hours from now
          packageName: 'Premium Boost',
          progress: 33,
          remainingTime: '16:00:00',
          startTime: new Date(Date.now() - 8 * 60 * 60 * 1000),
          endTime: new Date(Date.now() + 16 * 60 * 60 * 1000)
        };
        
        setBoostStatus(mockStatus);
        
        // Fetch analytics if boost is active
        if (mockStatus.isActive) {
          fetchAnalytics();
        }
        
      } catch (err: any) {
        setError(err?.message || 'Failed to fetch boost status');
      } finally {
        setLoading(false);
      }
    };

    fetchBoostStatus();
  }, [profileId]);

  const fetchAnalytics = async () => {
    try {
      // Mock analytics data
      const mockAnalytics: BoostAnalytics = {
        additionalViews: 145,
        engagementIncrease: 32,
        rankingPosition: 8,
        views: 300,
        boostHistory: [
          { date: new Date(), score: 85 }
        ],
        impressions: {
          today: 180,
          yesterday: 150,
          weeklyAverage: 145,
          withBoost: 180,
        },
        interactions: {
          today: 45,
          yesterday: 32,
          weeklyAverage: 30,
          withBoost: 45,
        },
        rank: {
          current: 8,
          previous: 24,
          change: 16
        }
      };
      
      setAnalytics(mockAnalytics);
    } catch (err: any) {
      console.error('Failed to fetch analytics:', err);
      // Don't set error state here to avoid disrupting the UI
    }
  };

  const cancelBoost = async (): Promise<boolean> => {
    if (!profileId || !boostStatus.isActive) return false;
    
    setLoading(true);
    try {
      // Mock cancellation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setBoostStatus({
        isActive: false
      });
      
      return true;
    } catch (err: any) {
      setError(err?.message || 'Failed to cancel boost');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const activateBoost = async (packageId: string): Promise<boolean> => {
    if (!profileId) return false;
    
    setLoading(true);
    try {
      // Mock activation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setBoostStatus({
        isActive: true,
        packageId: packageId,
        startedAt: new Date(),
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
        packageName: 'Premium Boost',
        progress: 0,
        remainingTime: '24:00:00',
        startTime: new Date(),
        endTime: new Date(Date.now() + 24 * 60 * 60 * 1000)
      });
      
      return true;
    } catch (err: any) {
      setError(err?.message || 'Failed to activate boost');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const getImpressionsWithoutBoost = (): number => {
    return analytics?.impressions?.withBoost 
      ? Math.round(analytics.impressions.withBoost * 0.7) 
      : 0;
  };

  const getInteractionsWithoutBoost = (): number => {
    return analytics?.interactions?.withBoost 
      ? Math.round(analytics.interactions.withBoost * 0.6) 
      : 0;
  };

  // Fix the withoutBoost property reference
  const getEnhancedAnalytics = (): BoostAnalytics => {
    if (!analytics) {
      return {
        additionalViews: 0,
        engagementIncrease: 0,
        rankingPosition: 0,
        views: 0,
        boostHistory: [],
        impressions: {
          today: 0,
          yesterday: 0,
          weeklyAverage: 0,
          withBoost: 0,
        },
        interactions: {
          today: 0,
          yesterday: 0,
          weeklyAverage: 0,
          withBoost: 0,
        },
        rank: {
          current: 0,
          previous: 0,
          change: 0
        }
      };
    }
    
    const withoutBoostImpressions = getImpressionsWithoutBoost();
    const withoutBoostInteractions = getInteractionsWithoutBoost();
    
    return {
      ...analytics,
      impressions: {
        ...analytics.impressions,
        withBoost: analytics.impressions?.withBoost || 0
      },
      interactions: {
        ...analytics.interactions,
        withBoost: analytics.interactions?.withBoost || 0
      }
    };
  };

  return {
    loading,
    error,
    boostStatus,
    isActive: boostStatus.isActive,
    analytics: getEnhancedAnalytics(),
    cancelBoost,
    activateBoost,
    fetchAnalytics
  };
};

export default useBoostOperations;
