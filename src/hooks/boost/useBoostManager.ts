
import { useState, useCallback, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { AnalyticsData } from "./useBoostAnalytics";
import { GLOBAL_UBX_RATE, validateGlobalPrice } from "@/utils/oxum/globalPricing";

// Define service stub if not available
const boostService = {
  fetchBoostPackages: async () => [
    {
      id: "boost-1",
      name: "24-Hour Boost",
      description: "Standard boost for 24 hours",
      duration: "24:00:00",
      price_ubx: GLOBAL_UBX_RATE,
      features: ["Higher ranking in search", "Featured in boosted section", "Analytics tracking"]
    },
    {
      id: "boost-2",
      name: "Weekend Boost",
      description: "3-day visibility boost",
      duration: "72:00:00",
      price_ubx: GLOBAL_UBX_RATE * 2.5,
      features: ["Higher ranking in search", "Featured in boosted section", "Analytics tracking", "Extended duration"]
    }
  ],
  fetchActiveBoost: async (profileId: string) => ({
    isActive: Math.random() > 0.7, // 30% chance of having active boost
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    remainingTime: "18 hours remaining"
  }),
  checkBoostEligibility: async (profileId: string) => ({
    isEligible: true,
    reason: ""
  }),
  purchaseBoost: async (profileId: string, boostPackageId: string) => ({
    success: true,
    message: "Boost purchased successfully"
  }),
  cancelBoost: async (profileId: string) => ({
    success: true,
    message: "Boost cancelled successfully"
  }),
  fetchBoostAnalytics: async (profileId: string) => ({
    impressions: {
      today: 234,
      yesterday: 180,
      weeklyAverage: 200,
      withBoost: 280,
      withoutBoost: 120,
      increase: 133
    },
    clicks: {
      today: 45,
      yesterday: 30,
      weeklyAverage: 35,
      withBoost: 50,
      withoutBoost: 25,
      increase: 100
    },
    engagementRate: 19.2,
    conversionRate: 5.3,
    boostEfficiency: 78,
    additionalViews: 120,
    engagementIncrease: 25,
    rankingPosition: 3
  })
};

// Define and export types
export interface BoostStatus {
  isActive: boolean;
  activeBoostId?: string;
  startTime?: Date;
  endTime?: Date;
  timeRemaining?: string;
}

export interface BoostEligibility {
  isEligible: boolean;
  reasons?: string[];
  reason?: string;
}

export interface BoostPackage {
  id: string;
  name: string;
  description: string;
  duration: string;
  price: number;
  features: string[];
}

// Format boost duration in hours to user-friendly string
export const formatBoostDuration = (duration: string | number): string => {
  if (typeof duration === 'string') {
    if (duration.includes(':')) {
      const [hours] = duration.split(':').map(Number);
      if (hours < 1) {
        return `${Math.round(hours * 60)} minutes`;
      } else if (hours === 1) {
        return "1 hour";
      } else {
        return `${hours} hours`;
      }
    }
    return duration;
  }
  
  const hours = duration;
  if (hours < 1) {
    return `${Math.round(hours * 60)} minutes`;
  } else if (hours === 1) {
    return "1 hour";
  } else if (Number.isInteger(hours)) {
    return `${hours} hours`;
  } else {
    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);
    return `${h} hour${h !== 1 ? 's' : ''} ${m} min`;
  }
};

export const useBoostManager = (profileId?: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [boostStatus, setBoostStatus] = useState<BoostStatus>({ isActive: false });
  const [eligibility, setEligibility] = useState<BoostEligibility>({ isEligible: false });
  const [boostPackages, setBoostPackages] = useState<BoostPackage[]>([]);
  const [selectedPackage, setSelectedPackage] = useState<BoostPackage | null>(null);
  const [dailyBoostUsage, setDailyBoostUsage] = useState(0);
  const DAILY_BOOST_LIMIT = 4;
  
  // Fetch available boost packages
  const fetchBoostPackages = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch boost packages from the service
      const packages = await boostService.fetchBoostPackages();
      
      // Convert the API response to our internal format
      const formattedPackages: BoostPackage[] = packages.map(pkg => ({
        id: pkg.id,
        name: pkg.name,
        description: pkg.description || '',
        duration: pkg.duration,
        price: pkg.price_ubx,
        features: pkg.features || []
      }));
      
      setBoostPackages(formattedPackages);
      
      // Check active boost status
      if (profileId) {
        const activeBoostStatus = await boostService.fetchActiveBoost(profileId);
        
        if (activeBoostStatus?.isActive) {
          setBoostStatus({
            isActive: true,
            activeBoostId: "active-boost-1",
            startTime: activeBoostStatus.expiresAt 
              ? new Date(activeBoostStatus.expiresAt.getTime() - 2 * 60 * 60 * 1000)  // Approximate
              : new Date(),
            endTime: activeBoostStatus.expiresAt,
            timeRemaining: activeBoostStatus.remainingTime
          });
        }
        
        // Check eligibility
        const eligibilityResult = await boostService.checkBoostEligibility(profileId);
        setEligibility(eligibilityResult);
        
        // Get daily usage (this is a placeholder - real implementation would track this)
        const dailyBoostsUsed = Math.min(
          Math.floor(Math.random() * DAILY_BOOST_LIMIT), 
          DAILY_BOOST_LIMIT - (eligibilityResult.isEligible ? 1 : 0)
        );
        setDailyBoostUsage(dailyBoostsUsed);
      }
    } catch (err: any) {
      console.error("Error fetching boost packages:", err);
      setError("Failed to load boost packages. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [profileId]);
  
  // Calculate boost price - enforce global pricing
  const getBoostPrice = useCallback(() => {
    // Always return GLOBAL_UBX_RATE to match expected function signature
    return GLOBAL_UBX_RATE;
  }, []);
  
  // Purchase boost
  const purchaseBoost = useCallback(async (boostPackage: BoostPackage): Promise<boolean> => {
    if (!profileId) {
      toast({
        title: "Error",
        description: "Profile ID is required to purchase a boost",
        variant: "destructive"
      });
      return false;
    }
    
    try {
      setLoading(true);
      
      // Enforce Oxum Rule #001: Validate global price symmetry
      try {
        validateGlobalPrice(boostPackage.price);
      } catch (error: any) {
        console.error("Oxum Rule Violation:", error);
        toast({
          title: "Oxum Rule Violation",
          description: "Price inconsistency detected. Transaction halted.",
          variant: "destructive"
        });
        return false;
      }
      
      // Call the service to purchase the boost
      const result = await boostService.purchaseBoost(profileId, boostPackage.id);
      
      if (!result.success) {
        toast({
          title: "Error",
          description: result.message || "Failed to purchase boost",
          variant: "destructive"
        });
        return false;
      }
      
      // Refresh the boost status
      const updatedBoost = await boostService.fetchActiveBoost(profileId);
      
      if (updatedBoost?.isActive) {
        setBoostStatus({
          isActive: true,
          activeBoostId: boostPackage.id,
          startTime: new Date(),
          endTime: updatedBoost.expiresAt,
          timeRemaining: updatedBoost.remainingTime
        });
      }
      
      setDailyBoostUsage(prev => Math.min(DAILY_BOOST_LIMIT, prev + 1));
      
      toast({
        title: "Boost Purchased",
        description: `Your ${boostPackage.name} has been activated successfully!`
      });
      
      return true;
    } catch (err: any) {
      console.error("Error purchasing boost:", err);
      
      toast({
        title: "Error",
        description: err.message || "Failed to purchase boost. Please try again.",
        variant: "destructive"
      });
      
      return false;
    } finally {
      setLoading(false);
    }
  }, [profileId]);
  
  // Cancel boost
  const cancelBoost = useCallback(async (): Promise<boolean> => {
    if (!profileId || !boostStatus.isActive) {
      return false;
    }
    
    try {
      setLoading(true);
      
      // Call the service to cancel the boost
      const result = await boostService.cancelBoost(profileId);
      
      if (!result.success) {
        toast({
          title: "Error",
          description: result.message || "Failed to cancel boost",
          variant: "destructive"
        });
        return false;
      }
      
      setBoostStatus({
        isActive: false
      });
      
      toast({
        title: "Boost Cancelled",
        description: "Your profile boost has been cancelled successfully"
      });
      
      return true;
    } catch (err: any) {
      console.error("Error cancelling boost:", err);
      
      toast({
        title: "Error",
        description: err.message || "Failed to cancel boost. Please try again.",
        variant: "destructive"
      });
      
      return false;
    } finally {
      setLoading(false);
    }
  }, [profileId, boostStatus.isActive]);
  
  // Get boost analytics
  const getBoostAnalytics = async (): Promise<AnalyticsData | null> => {
    if (!profileId) return null;
    
    try {
      return await boostService.fetchBoostAnalytics(profileId);
    } catch (err) {
      console.error('Error fetching boost analytics:', err);
      return null;
    }
  };

  // Automatically refresh boost status on mount
  useEffect(() => {
    if (profileId) {
      fetchBoostPackages();
    }
  }, [profileId, fetchBoostPackages]);
  
  return {
    boostStatus,
    eligibility,
    boostPackages,
    selectedPackage,
    setSelectedPackage,
    fetchBoostPackages,
    getBoostPrice,
    purchaseBoost,
    cancelBoost,
    loading,
    error,
    getBoostAnalytics,
    dailyBoostUsage,
    dailyBoostLimit: DAILY_BOOST_LIMIT
  };
};
