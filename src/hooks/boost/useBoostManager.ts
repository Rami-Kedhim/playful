import { useState, useCallback } from "react";
import { toast } from "@/hooks/use-toast";
import { AnalyticsData } from "./useBoostAnalytics";

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
}

export interface BoostPackage {
  id: string;
  name: string;
  description: string;
  duration: number; // in hours
  price: number;
  features: string[];
  boostType: 'standard' | 'premium' | 'exclusive';
}

// Format boost duration in hours to user-friendly string
export const formatBoostDuration = (hours: number): string => {
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
      
      // Mock data - in a real app, this would be fetched from an API
      const mockPackages: BoostPackage[] = [
        {
          id: "boost-1",
          name: "Quick Boost",
          description: "Short-term visibility boost for your profile",
          duration: 1, // 1 hour
          price: 5,
          features: ["Higher search ranking", "Featured in 'Boosted' section"],
          boostType: "standard"
        },
        {
          id: "boost-2",
          name: "Standard Boost",
          description: "Medium-term visibility boost for your profile",
          duration: 3, // 3 hours
          price: 12,
          features: ["Higher search ranking", "Featured in 'Boosted' section", "Priority in matching"],
          boostType: "standard"
        },
        {
          id: "boost-3",
          name: "Premium Boost",
          description: "Long-term visibility boost with premium features",
          duration: 24, // 24 hours
          price: 40,
          features: ["Highest search ranking", "Featured in 'Premium Boosted' section", "Priority in matching", "Stats and analytics"],
          boostType: "premium"
        }
      ];
      
      setBoostPackages(mockPackages);
      
      // Simulating network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Check if user has an active boost
      if (profileId) {
        const hasActiveBoost = Math.random() > 0.7;
        
        if (hasActiveBoost) {
          const now = new Date();
          const endTime = new Date(now.getTime() + 2 * 60 * 60 * 1000); // 2 hours from now
          setBoostStatus({
            isActive: true,
            activeBoostId: "active-boost-1",
            startTime: now,
            endTime,
            timeRemaining: "1h 58min"
          });
        }
        
        // Check eligibility
        const isEligibleForBoost = Math.random() > 0.2;
        const dailyBoostsUsed = Math.floor(Math.random() * DAILY_BOOST_LIMIT);
        setDailyBoostUsage(dailyBoostsUsed);
        
        setEligibility({
          isEligible: isEligibleForBoost && dailyBoostsUsed < DAILY_BOOST_LIMIT,
          reasons: isEligibleForBoost 
            ? [] 
            : ["Profile needs to be completed", "Verification required"]
        });
      }
    } catch (err: any) {
      console.error("Error fetching boost packages:", err);
      setError("Failed to load boost packages. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [profileId]);
  
  // Calculate boost price
  const getBoostPrice = useCallback((boostPackage: BoostPackage) => {
    return boostPackage.price;
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
      
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate purchase success
      const now = new Date();
      const endTime = new Date(now.getTime() + boostPackage.duration * 60 * 60 * 1000);
      
      setBoostStatus({
        isActive: true,
        activeBoostId: boostPackage.id,
        startTime: now,
        endTime,
        timeRemaining: formatBoostDuration(boostPackage.duration)
      });
      
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
      
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
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
    try {
      // This would call an analytics API in a real implementation
      
      // Generate some mock analytics data
      const viewsBase = Math.floor(Math.random() * 300) + 100;
      const engagementBase = Math.floor(Math.random() * 50) + 20;
      
      const mockData: AnalyticsData = {
        additionalViews: Math.floor(viewsBase * 0.3),
        engagementIncrease: Math.floor(engagementBase * 0.4),
        rankingPosition: Math.floor(Math.random() * 5) + 1,
        effectiveness: Math.floor(Math.random() * 30) + 70,
        views: {
          withoutBoost: Math.floor(viewsBase * 0.7),
          withBoost: viewsBase,
          increase: Math.floor(viewsBase * 0.3),
          current: viewsBase,
          previous: Math.floor(viewsBase * 0.7),
          change: Math.floor(viewsBase * 0.3)
        },
        clicks: {
          withoutBoost: Math.floor(engagementBase * 0.6),
          withBoost: engagementBase,
          increase: Math.floor(engagementBase * 0.4),
          current: engagementBase,
          previous: Math.floor(engagementBase * 0.6),
          change: Math.floor(engagementBase * 0.4)
        },
        conversion: {
          current: Math.floor(Math.random() * 10) + 5,
          previous: Math.floor(Math.random() * 5) + 2,
          change: Math.floor(Math.random() * 40) + 10
        },
        timeData: Array.from({ length: 24 }, (_, i) => ({
          hour: `${i}:00`,
          views: Math.floor(Math.random() * 50) + 10,
          engagement: Math.floor(Math.random() * 10) + 5
        }))
      };
      
      return mockData;
    } catch (err) {
      console.error('Error fetching boost analytics:', err);
      return null;
    }
  };
  
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
