
import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { pulseService } from '@/services/boost/pulseService';
import { BoostPackage, BoostAnalyticsData } from '@/types/pulse-boost';

interface BoostManagerHook {
  activeBoost: any | null;
  boostPackages: BoostPackage[];
  isLoading: boolean;
  analyticsData: BoostAnalyticsData;
  purchaseBoost: (packageId: string) => Promise<{ success: boolean; message: string }>;
  cancelBoost: () => Promise<boolean>;
  refreshBoostStatus: () => void;
}

interface AnalyticsData {
  impressionsIncrease: number;
  viewsIncrease: number;
  rankingIncrease: number;
  conversionRate: number;
  timeActive?: number;
  boostEfficiency?: number;
  trending?: boolean;
}

export function useBoostManager(profileId?: string): BoostManagerHook {
  const [activeBoost, setActiveBoost] = useState<any | null>(null);
  const [boostPackages, setBoostPackages] = useState<BoostPackage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    impressionsIncrease: 0,
    viewsIncrease: 0,
    rankingIncrease: 0,
    conversionRate: 0
  });
  
  const { toast } = useToast();
  
  // Function to load boost packages
  const loadBoostPackages = useCallback(async () => {
    try {
      const packages = pulseService.getPackages();
      setBoostPackages(packages);
    } catch (error) {
      console.error('Error loading boost packages:', error);
      toast({
        title: 'Error',
        description: 'Failed to load boost packages',
        variant: 'destructive'
      });
    }
  }, [toast]);
  
  // Load active boost for profile
  const loadActiveBoost = useCallback(async () => {
    if (!profileId) return;
    
    setIsLoading(true);
    try {
      // In a real app, this would be an API call
      // For now, simulate a 50% chance the user has an active boost
      const hasActiveBoost = Math.random() > 0.5;
      
      if (hasActiveBoost) {
        // Get a random boost package
        const randomIdx = Math.floor(Math.random() * boostPackages.length);
        const randomPackage = boostPackages[randomIdx];
        
        if (randomPackage) {
          // Random remaining time between 0-100%
          const remainingPercent = Math.random();
          const totalMinutes = randomPackage.durationMinutes;
          const remainingMinutes = Math.floor(totalMinutes * remainingPercent);
          
          const now = new Date();
          const startedAt = new Date(now.getTime() - ((totalMinutes - remainingMinutes) * 60 * 1000));
          const expiresAt = new Date(startedAt.getTime() + (totalMinutes * 60 * 1000));
          
          setActiveBoost({
            packageId: randomPackage.id,
            packageName: randomPackage.name,
            packageDuration: randomPackage.duration,
            remainingTime: `${Math.floor(remainingMinutes / 60)}h ${remainingMinutes % 60}m`,
            remainingMinutes,
            startedAt,
            expiresAt,
            percentRemaining: remainingPercent * 100
          });
          
          // Also set analytics data
          setAnalyticsData({
            impressionsIncrease: Math.floor(Math.random() * 200) + 50,
            viewsIncrease: Math.floor(Math.random() * 100) + 20,
            rankingIncrease: Math.floor(Math.random() * 5) + 1,
            conversionRate: Math.random() * 10,
            timeActive: (totalMinutes - remainingMinutes),
            boostEfficiency: (Math.random() * 50) + 50,
            trending: Math.random() > 0.5
          });
        }
      } else {
        setActiveBoost(null);
      }
    } catch (error) {
      console.error('Error loading active boost:', error);
      toast({
        title: 'Error',
        description: 'Failed to load active boost',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  }, [profileId, boostPackages, toast]);
  
  // Initial load
  useEffect(() => {
    loadBoostPackages();
  }, [loadBoostPackages]);
  
  useEffect(() => {
    if (boostPackages.length > 0) {
      loadActiveBoost();
    }
  }, [boostPackages, loadActiveBoost]);
  
  // Purchase a boost
  const purchaseBoost = useCallback(async (packageId: string) => {
    if (!profileId) {
      return { success: false, message: 'No profile ID provided' };
    }
    
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const selectedPackage = boostPackages.find(p => p.id === packageId);
      if (!selectedPackage) {
        return { success: false, message: 'Package not found' };
      }
      
      // Create a new active boost
      const now = new Date();
      const expiresAt = new Date(now.getTime() + (selectedPackage.durationMinutes * 60 * 1000));
      
      setActiveBoost({
        packageId: selectedPackage.id,
        packageName: selectedPackage.name,
        packageDuration: selectedPackage.duration,
        remainingTime: selectedPackage.duration,
        remainingMinutes: selectedPackage.durationMinutes,
        startedAt: now,
        expiresAt,
        percentRemaining: 100
      });
      
      toast({
        title: 'Boost Activated',
        description: `Your ${selectedPackage.name} has been successfully activated.`
      });
      
      return { success: true, message: 'Boost activated successfully' };
    } catch (error) {
      console.error('Error purchasing boost:', error);
      toast({
        title: 'Error',
        description: 'Failed to purchase boost',
        variant: 'destructive'
      });
      return { success: false, message: 'Failed to purchase boost' };
    } finally {
      setIsLoading(false);
    }
  }, [profileId, boostPackages, toast]);
  
  // Cancel active boost
  const cancelBoost = useCallback(async () => {
    if (!activeBoost || !profileId) return false;
    
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setActiveBoost(null);
      
      toast({
        title: 'Boost Cancelled',
        description: 'Your active boost has been cancelled'
      });
      
      return true;
    } catch (error) {
      console.error('Error cancelling boost:', error);
      toast({
        title: 'Error',
        description: 'Failed to cancel boost',
        variant: 'destructive'
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [activeBoost, profileId, toast]);
  
  return {
    activeBoost,
    boostPackages,
    isLoading,
    analyticsData,
    purchaseBoost,
    cancelBoost,
    refreshBoostStatus: loadActiveBoost
  };
}

export default useBoostManager;
