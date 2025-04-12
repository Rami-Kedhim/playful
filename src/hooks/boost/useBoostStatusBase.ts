
import { useState, useEffect, useCallback } from "react";
import { BoostStatus, BoostPackage } from "@/types/boost";
import { calculateRemainingTime, formatBoostDuration } from "@/utils/boostCalculator";
import { toast } from "@/hooks/use-toast";

export interface BoostStatusOptions {
  mockMode?: boolean;
  mockActiveChance?: number;
  dailyBoostLimit?: number;
  boostDuration?: string;
}

const defaultOptions: BoostStatusOptions = {
  mockMode: true,
  mockActiveChance: 0.5,
  dailyBoostLimit: 4,
  boostDuration: "03:00:00", // 3 hours
};

/**
 * Base hook for handling boost status functionality
 * Can be used for both creator and client contexts
 */
export const useBoostStatusBase = (profileId?: string, options: BoostStatusOptions = defaultOptions) => {
  const [boostStatus, setBoostStatus] = useState<BoostStatus>({
    isActive: false,
    progress: 0,
    remainingTime: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dailyBoostUsage, setDailyBoostUsage] = useState<number>(0);
  const [eligibility, setEligibility] = useState<{ eligible: boolean; reason?: string }>({ eligible: false });
  const [profileData, setProfileData] = useState<any>(null);
  
  const dailyBoostLimit = options.dailyBoostLimit || 4;

  /**
   * Fetch boost status from API or mock data
   */
  const fetchBoostStatus = useCallback(async () => {
    if (!profileId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      
      // In mock mode, randomly determine if there's an active boost
      const mockActiveBoost = Math.random() > (1 - (options.mockActiveChance || 0.5));
      
      if (mockActiveBoost) {
        // Create mock expiry date based on configured boost duration
        const expiryDate = new Date();
        const durationStr = options.boostDuration || "03:00:00";
        const [hours, minutes, seconds] = durationStr.split(':').map(Number);
        const durationMs = ((hours * 60 + minutes) * 60 + seconds) * 1000;
        expiryDate.setTime(expiryDate.getTime() + durationMs);
        
        // Create mock boost package
        const mockBoostPackage: BoostPackage = {
          id: "boost-standard",
          name: "Standard Boost",
          duration: durationStr,
          price: 15,
          price_ubx: 15,
          description: "Standard visibility boost for limited time",
          features: ["Top search results", "Featured badge", "Profile highlighting"]
        };
        
        // Calculate progress based on elapsed time
        const totalDurationMs = durationMs;
        const elapsedMs = totalDurationMs - (expiryDate.getTime() - new Date().getTime());
        const progress = Math.max(0, Math.min(100, (elapsedMs / totalDurationMs) * 100));
        
        setBoostStatus({
          isActive: true,
          expiresAt: expiryDate,
          boostPackage: mockBoostPackage,
          remainingTime: calculateRemainingTime(expiryDate),
          progress: progress
        });
        
        // Set daily boost usage (random number between 1 and dailyBoostLimit)
        setDailyBoostUsage(Math.floor(Math.random() * (dailyBoostLimit - 1)) + 1);
      } else {
        setBoostStatus({
          isActive: false,
          progress: 0,
          remainingTime: ''
        });
        
        // Random daily boost usage (0 or small number)
        setDailyBoostUsage(Math.floor(Math.random() * 2));
      }
      
      setError(null);
    } catch (err) {
      console.error("Error fetching boost status:", err);
      setError("Failed to fetch boost status");
    } finally {
      setLoading(false);
    }
  }, [profileId, options.mockActiveChance, options.boostDuration, dailyBoostLimit]);

  /**
   * Check profile eligibility for boosting
   */
  const checkEligibility = useCallback(async () => {
    if (!profileId) {
      setEligibility({ eligible: false, reason: "No profile ID provided" });
      return;
    }

    try {
      // In a real app, this would call an API to check eligibility
      const mockProfile = {
        id: profileId,
        completeness: 75,
        rating: 4.2,
        isVerified: true,
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        lastBoost: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      };
      
      setProfileData(mockProfile);
      
      const profileAge = (Date.now() - mockProfile.createdAt.getTime()) / (1000 * 60 * 60 * 24);
      
      let eligibilityResult;
      
      if (!mockProfile.isVerified) {
        eligibilityResult = { 
          eligible: false,
          reason: "Only verified profiles can use the boost feature"
        };
      } else if (dailyBoostUsage >= dailyBoostLimit) {
        eligibilityResult = { 
          eligible: false,
          reason: `You've reached the daily limit of ${dailyBoostLimit} boosts`
        };
      } else {
        // In a real app, use isEligibleForBoosting utility
        eligibilityResult = { 
          eligible: true 
        };
      }
      
      setEligibility(eligibilityResult);
    } catch (err: any) {
      console.error("Error checking eligibility:", err);
      setEligibility({ eligible: false, reason: err.message || "Failed to check eligibility" });
    }
  }, [profileId, dailyBoostUsage, dailyBoostLimit]);

  /**
   * Start a timer to update remaining time and progress
   */
  const startBoostTimer = useCallback(() => {
    // Fix the timer type by using NodeJS.Timeout
    const timer = setInterval(() => {
      if (boostStatus.isActive && boostStatus.expiresAt) {
        setBoostStatus(prev => {
          if (!prev.expiresAt) return prev;
          
          const now = new Date();
          
          // If boost has expired, deactivate it
          if (prev.expiresAt <= now) {
            clearInterval(timer);
            return {
              isActive: false,
              progress: 100,
              remainingTime: 'Expired'
            };
          }
          
          // Otherwise update remaining time and progress
          const totalDuration = prev.boostPackage?.duration || "03:00:00";
          const [hours, minutes, seconds] = totalDuration.split(':').map(Number);
          const durationMs = ((hours * 60 + minutes) * 60 + seconds) * 1000;
          
          const remainingMs = prev.expiresAt.getTime() - now.getTime();
          const elapsedMs = durationMs - remainingMs;
          const progress = Math.min(100, (elapsedMs / durationMs) * 100);
          
          return {
            ...prev,
            remainingTime: calculateRemainingTime(prev.expiresAt),
            progress
          };
        });
      }
    }, 60000); // Update every minute
    
    return timer;
  }, [boostStatus.isActive, boostStatus.expiresAt]);

  /**
   * Cancel an active boost
   */
  const cancelBoost = async (): Promise<boolean> => {
    if (!profileId || !boostStatus.isActive) {
      return false;
    }

    try {
      setLoading(true);
      
      // In a real app, this would call an API to cancel the boost
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setBoostStatus({
        isActive: false,
        progress: 0,
        remainingTime: ''
      });
      
      toast({
        title: "Boost Cancelled",
        description: "Your profile boost has been cancelled",
      });
      
      return true;
    } catch (err: any) {
      console.error("Error cancelling boost:", err);
      
      toast({
        title: "Error",
        description: err.message || "Failed to cancel boost",
        variant: "destructive"
      });
      
      return false;
    } finally {
      setLoading(false);
    }
  };
  
  /**
   * Format a duration string
   */
  const formatDuration = (durationStr: string): string => {
    return formatBoostDuration(durationStr);
  };
  
  // Initial fetch on mount
  useEffect(() => {
    if (profileId) {
      fetchBoostStatus();
      checkEligibility();
    }
  }, [profileId, fetchBoostStatus, checkEligibility]);
  
  // Setup timer if boost is active
  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    
    if (boostStatus.isActive && boostStatus.expiresAt) {
      timer = startBoostTimer();
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [boostStatus.isActive, boostStatus.expiresAt, startBoostTimer]);

  return {
    boostStatus,
    setBoostStatus,
    eligibility,
    profileData,
    loading,
    error,
    dailyBoostUsage,
    dailyBoostLimit,
    fetchBoostStatus,
    checkEligibility,
    cancelBoost,
    formatDuration
  };
};
