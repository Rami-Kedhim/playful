
import { useState, useCallback, useEffect } from 'react';
import { BoostPackage, BoostStatus } from '@/types/boost';
import { useBoostAnalytics, AnalyticsData } from './useBoostAnalytics';
import { calculateRemainingTime } from '@/utils/boostCalculator';
import { useBoostPackages } from './useBoostPackages';
import { toast } from '@/hooks/use-toast';

export const formatBoostDuration = (duration: string): string => {
  const [hours, minutes] = duration.split(':');
  if (parseInt(hours) > 0) {
    return `${parseInt(hours)} hour${parseInt(hours) > 1 ? 's' : ''}`;
  }
  return `${parseInt(minutes)} minutes`;
};

export const useBoostManager = (profileId: string) => {
  const [boostStatus, setBoostStatus] = useState<BoostStatus>({
    isActive: false,
    progress: 0,
    remainingTime: ''
  });
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [eligibility, setEligibility] = useState<{ eligible: boolean; reason?: string }>({ eligible: true });
  const [dailyBoostUsage, setDailyBoostUsage] = useState(0);
  const DAILY_BOOST_LIMIT = 4;
  
  const { packages: boostPackages, loading: packagesLoading, error: packagesError, fetchPackages } = useBoostPackages();
  const { fetchAnalytics } = useBoostAnalytics(profileId);

  // Check if user has an active boost
  const checkActiveBoost = useCallback(async () => {
    try {
      setLoading(true);
      
      // In a real app, this would be an API call
      const mockActiveBoost = Math.random() > 0.6;
      
      if (mockActiveBoost) {
        const mockPackage: BoostPackage = {
          id: "boost-standard",
          name: "3-Hour Boost",
          duration: "03:00:00",
          price_lucoin: 15,
          description: "Standard visibility boost"
        };
        
        const endDate = new Date(Date.now() + 3 * 60 * 60 * 1000); // 3 hours from now
        
        setBoostStatus({
          isActive: true,
          expiresAt: endDate,
          boostPackage: mockPackage,
          remainingTime: calculateRemainingTime(endDate),
          progress: 20 // 20% complete
        });
        
        setDailyBoostUsage(Math.floor(Math.random() * 3) + 1); // 1-3 boosts used
      } else {
        setBoostStatus({
          isActive: false,
          progress: 0,
          remainingTime: ''
        });
        setDailyBoostUsage(0);
      }
      
      setError(null);
    } catch (err) {
      console.error("Error checking boost status:", err);
      setError("Failed to check boost status");
    } finally {
      setLoading(false);
    }
  }, [profileId]);

  // Fetch boost packages
  const fetchBoostPackages = useCallback(async () => {
    await fetchPackages();
  }, [fetchPackages]);

  // Calculate boost price based on profile attributes
  const getBoostPrice = useCallback(() => {
    // In a real app, this would calculate dynamic pricing
    // For now, we'll return a fixed price
    return 15;
  }, []);

  // Purchase a boost
  const purchaseBoost = async (packageId: string): Promise<boolean> => {
    if (!profileId) {
      toast({
        title: "Error",
        description: "Profile ID is required",
        variant: "destructive"
      });
      return false;
    }
    
    try {
      setLoading(true);
      
      const selectedBoostPackage = boostPackages.find(pkg => pkg.id === packageId);
      
      if (!selectedBoostPackage) {
        toast({
          title: "Error",
          description: "Invalid package selected",
          variant: "destructive"
        });
        return false;
      }
      
      // Check daily limit
      if (dailyBoostUsage >= DAILY_BOOST_LIMIT) {
        toast({
          title: "Daily limit reached",
          description: `You can only purchase ${DAILY_BOOST_LIMIT} boosts per day`,
          variant: "destructive"
        });
        return false;
      }
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const endDate = new Date();
      const [hours, minutes, seconds] = selectedBoostPackage.duration.split(':').map(Number);
      endDate.setTime(endDate.getTime() + ((hours * 60 + minutes) * 60 + seconds) * 1000);
      
      setBoostStatus({
        isActive: true,
        expiresAt: endDate,
        boostPackage: selectedBoostPackage,
        remainingTime: calculateRemainingTime(endDate),
        progress: 0
      });
      
      setDailyBoostUsage(prev => prev + 1);
      
      toast({
        title: "Boost Activated",
        description: `Your profile has been boosted for ${formatBoostDuration(selectedBoostPackage.duration)}`
      });
      
      return true;
    } catch (err) {
      console.error("Error purchasing boost:", err);
      setError("Failed to purchase boost");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Cancel an active boost
  const cancelBoost = async (): Promise<boolean> => {
    try {
      setLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setBoostStatus({
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
      setError("Failed to cancel boost");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Get analytics data for current boost
  const getBoostAnalytics = async (): Promise<AnalyticsData | null> => {
    return await fetchAnalytics();
  };

  // Initialize by checking for active boost and packages
  useEffect(() => {
    if (profileId) {
      checkActiveBoost();
      fetchBoostPackages();
    }
  }, [profileId, checkActiveBoost, fetchBoostPackages]);

  return {
    boostStatus,
    eligibility,
    loading: loading || packagesLoading,
    error: error || packagesError,
    boostPackages,
    selectedPackage,
    setSelectedPackage,
    fetchBoostPackages,
    getBoostPrice,
    purchaseBoost,
    cancelBoost,
    getBoostAnalytics,
    dailyBoostUsage,
    dailyBoostLimit: DAILY_BOOST_LIMIT
  };
};
