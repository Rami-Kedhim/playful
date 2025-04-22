import { useCallback } from 'react';
import { toast } from '@/components/ui/use-toast';
import { useBoostAnalytics } from './useBoostAnalytics';
import { AnalyticsData } from './useBoostAnalytics';
import { boostService } from '@/services/boostService';

export const useBoostOperations = (
  profileId?: string,
  boostStatus?: any,
  setBoostStatus?: any,
  setIsLoading?: any,
  setError?: any,
  setDailyBoostUsage?: any
) => {
  const { fetchAnalytics } = useBoostAnalytics(profileId);

  // Check for active boost
  const checkActiveBoost = useCallback(async () => {
    if (!profileId) return null;
    
    try {
      const activeBoost = await boostService.fetchActiveBoost(profileId);
      
      if (setBoostStatus && activeBoost) {
        setBoostStatus(activeBoost);
      }
      
      return activeBoost;
    } catch (error) {
      console.error("Error checking active boost:", error);
      return null;
    }
  }, [profileId, setBoostStatus]);

  // Purchase a boost
  const purchaseBoost = useCallback(async (boostPackage: any) => {
    if (!profileId) {
      toast({
        title: "Error",
        description: "Profile ID is required",
        variant: "destructive"
      });
      return false;
    }

    if (setIsLoading) setIsLoading(true);
    
    try {
      const result = await boostService.purchaseBoost(profileId, boostPackage.id);
      
      if (!result.success) {
        toast({
          title: "Error",
          description: result.message || "Failed to purchase boost",
          variant: "destructive"
        });
        return false;
      }
      
      if (setDailyBoostUsage) {
        setDailyBoostUsage((prev: number) => prev + 1);
      }
      
      // Fetch updated boost status
      const updatedBoost = await checkActiveBoost();
      
      toast({
        title: "Success",
        description: "Boost purchased successfully!",
      });
      
      return true;
    } catch (error: any) {
      console.error("Error purchasing boost:", error);
      toast({
        title: "Error",
        description: error.message || "An error occurred",
        variant: "destructive"
      });
      
      if (setError) setError(error.message || "Failed to purchase boost");
      return false;
    } finally {
      if (setIsLoading) setIsLoading(false);
    }
  }, [profileId, setIsLoading, setError, setDailyBoostUsage, checkActiveBoost]);

  // Cancel a boost
  const cancelBoost = useCallback(async () => {
    if (!profileId || !boostStatus?.isActive) {
      toast({
        title: "Error",
        description: "No active boost to cancel",
        variant: "destructive"
      });
      return false;
    }

    if (setIsLoading) setIsLoading(true);
    
    try {
      const result = await boostService.cancelBoost(profileId);
      
      if (!result.success) {
        toast({
          title: "Error",
          description: result.message || "Failed to cancel boost",
          variant: "destructive"
        });
        return false;
      }
      
      if (setBoostStatus) {
        setBoostStatus({ isActive: false });
      }
      
      toast({
        title: "Success",
        description: "Boost cancelled successfully",
      });
      
      return true;
    } catch (error: any) {
      console.error("Error cancelling boost:", error);
      toast({
        title: "Error",
        description: error.message || "An error occurred",
        variant: "destructive"
      });
      
      if (setError) setError(error.message || "Failed to cancel boost");
      return false;
    } finally {
      if (setIsLoading) setIsLoading(false);
    }
  }, [profileId, boostStatus, setIsLoading, setError, setBoostStatus]);

  // Fetch boost analytics
  const fetchBoostAnalytics = useCallback(async (): Promise<AnalyticsData | null> => {
    try {
      if (!profileId || !boostStatus?.isActive) {
        return null;
      }
      
      return await fetchAnalytics();
    } catch (error) {
      console.error("Error fetching boost analytics:", error);
      return null;
    }
  }, [profileId, boostStatus, fetchAnalytics]);

  return {
    checkActiveBoost,
    purchaseBoost,
    cancelBoost,
    fetchAnalytics: fetchBoostAnalytics
  };
};
