import { useCallback } from 'react';
import { BoostStatus, BoostPackage } from '@/types/boost';
import { toast } from '@/hooks/use-toast';
import { AnalyticsData } from '@/hooks/boost/useBoostAnalytics';
import { calculateRemainingTime } from '@/utils/boostCalculator';

interface BoostOperationsProps {
  userId?: string;
  boostStatus: BoostStatus;
  setBoostStatus: React.Dispatch<React.SetStateAction<BoostStatus>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  setDailyBoostUsage: React.Dispatch<React.SetStateAction<number>>;
  durationToMilliseconds: (duration: string) => number;
}

export const useBoostOperations = (
  userId?: string,
  boostStatus?: BoostStatus, 
  setBoostStatus?: React.Dispatch<React.SetStateAction<BoostStatus>>, 
  setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>, 
  setError?: React.Dispatch<React.SetStateAction<string | null>>, 
  setDailyBoostUsage?: React.Dispatch<React.SetStateAction<number>>, 
  durationToMilliseconds?: (duration: string) => number
) => {
  const _setBoostStatus = setBoostStatus || (() => {});
  const _setIsLoading = setIsLoading || (() => {});
  const _setError = setError || (() => {});
  const _setDailyBoostUsage = setDailyBoostUsage || (() => {});
  
  const _durationToMilliseconds = durationToMilliseconds || ((duration: string): number => {
    const [hours, minutes, seconds] = duration.split(':').map(Number);
    return ((hours * 60 + minutes) * 60 + seconds) * 1000;
  });

  const checkActiveBoost = useCallback(async () => {
    if (!userId) return;
    
    try {
      _setIsLoading(true);
      _setError(null);
      
      const hasActiveBoost = Math.random() > 0.6;
      
      if (hasActiveBoost) {
        const duration = "03:00:00";
        const endDate = new Date(Date.now() + _durationToMilliseconds(duration));
        
        const mockPackage: BoostPackage = {
          id: "boost-standard",
          name: "3-Hour Boost",
          duration,
          price_ubx: 15,
          description: "Standard visibility boost package",
          features: ["Top search position", "Featured badge"]
        };
        
        _setBoostStatus({
          isActive: true,
          expiresAt: endDate,
          boostPackage: mockPackage,
          remainingTime: calculateRemainingTime(endDate),
          progress: 10
        });
        
        _setDailyBoostUsage(Math.floor(Math.random() * 3) + 1);
      } else {
        _setBoostStatus({
          isActive: false,
          progress: 0,
          remainingTime: ''
        });
        _setDailyBoostUsage(0);
      }
    } catch (err) {
      console.error("Error checking active boost:", err);
      _setError("Failed to check boost status");
    } finally {
      _setIsLoading(false);
    }
  }, [userId, _setBoostStatus, _setIsLoading, _setError, _setDailyBoostUsage, _durationToMilliseconds]);

  const purchaseBoost = useCallback(async (boostPackage: BoostPackage): Promise<boolean> => {
    if (!userId) {
      toast({
        title: "Authentication Required",
        description: "Please log in to purchase a boost",
        variant: "destructive"
      });
      return false;
    }
    
    try {
      _setIsLoading(true);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const duration = boostPackage.duration;
      const expiresAt = new Date(Date.now() + _durationToMilliseconds(duration));
      
      _setBoostStatus({
        isActive: true,
        expiresAt,
        boostPackage: boostPackage,
        remainingTime: calculateRemainingTime(expiresAt),
        progress: 0
      });
      
      _setDailyBoostUsage(prev => prev + 1);
      
      toast({
        title: "Boost Activated",
        description: `Your profile has been boosted for ${formatDuration(duration)}`
      });
      
      return true;
    } catch (err) {
      console.error("Error purchasing boost:", err);
      _setError("Failed to purchase boost");
      
      toast({
        title: "Purchase Failed",
        description: "There was a problem activating your boost",
        variant: "destructive"
      });
      
      return false;
    } finally {
      _setIsLoading(false);
    }
  }, [userId, _setBoostStatus, _setIsLoading, _setError, _setDailyBoostUsage, _durationToMilliseconds]);

  const cancelBoost = useCallback(async (): Promise<boolean> => {
    if (!userId || !(boostStatus?.isActive)) {
      return false;
    }
    
    try {
      _setIsLoading(true);
      
      await new Promise(resolve => setTimeout(resolve, 500));
      
      _setBoostStatus({
        isActive: false,
        progress: 0,
        remainingTime: ''
      });
      
      toast({
        title: "Boost Cancelled",
        description: "Your profile boost has been cancelled"
      });
      
      return true;
    } catch (err) {
      console.error("Error cancelling boost:", err);
      _setError("Failed to cancel boost");
      
      toast({
        title: "Error",
        description: "Failed to cancel boost",
        variant: "destructive"
      });
      
      return false;
    } finally {
      _setIsLoading(false);
    }
  }, [userId, boostStatus, _setBoostStatus, _setIsLoading, _setError]);

  const formatDuration = (durationStr: string): string => {
    const [hours, minutes] = durationStr.split(':');
    if (parseInt(hours) > 0) {
      return `${parseInt(hours)} hour${parseInt(hours) > 1 ? 's' : ''}`;
    }
    return `${parseInt(minutes)} minutes`;
  };

  const fetchAnalytics = useCallback(async (): Promise<AnalyticsData | null> => {
    if (!boostStatus?.isActive) return null;
    
    try {
      _setIsLoading(true);
      
      const mockAnalytics: AnalyticsData = {
        additionalViews: Math.floor(Math.random() * 50) + 20,
        engagementIncrease: Math.floor(Math.random() * 30) + 10,
        rankingPosition: Math.floor(Math.random() * 5) + 1,
        effectiveness: Math.floor(Math.random() * 30) + 70,
        views: {
          withoutBoost: Math.floor(Math.random() * 100) + 50,
          withBoost: Math.floor(Math.random() * 200) + 150,
          increase: Math.floor(Math.random() * 30) + 20
        },
        clicks: {
          withoutBoost: Math.floor(Math.random() * 30) + 10,
          withBoost: Math.floor(Math.random() * 70) + 30,
          increase: Math.floor(Math.random() * 50) + 30
        },
        searchRanking: {
          withoutBoost: Math.floor(Math.random() * 15) + 8,
          withBoost: Math.floor(Math.random() * 5) + 1,
          improvement: Math.floor(Math.random() * 7) + 3
        }
      };
      
      return mockAnalytics;
    } catch (err) {
      console.error("Error fetching analytics:", err);
      return null;
    } finally {
      _setIsLoading(false);
    }
  }, [boostStatus, _setIsLoading]);

  return {
    checkActiveBoost,
    purchaseBoost,
    cancelBoost,
    fetchAnalytics,
    formatDuration
  };
};

export type UseBoostOperationsReturn = ReturnType<typeof useBoostOperations>;
