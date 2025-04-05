
import { useState, useCallback } from "react";
import { toast } from "@/hooks/use-toast";
import { BoostStatus, BoostPackage } from "@/types/boost";
import { 
  calculateBoostPrice, 
  isEligibleForBoosting, 
  getCurrentTimeSlot,
  calculateRemainingTime
} from "@/utils/boostCalculator";

export const useBoostStatus = (profileId?: string) => {
  const [loading, setLoading] = useState(false);
  const [boostStatus, setBoostStatus] = useState<BoostStatus>({ 
    isActive: false,
    progress: 0,
    remainingTime: ''
  });
  const [eligibility, setEligibility] = useState<{ eligible: boolean; reason?: string }>({ eligible: false });
  const [profileData, setProfileData] = useState<any>(null);
  const [dailyBoostUsage, setDailyBoostUsage] = useState<number>(0); // Track daily boost usage
  const DAILY_BOOST_LIMIT = 4; // Oxum model: 4 boosts max per day (12 hours)

  const fetchProfileData = useCallback(async (id: string) => {
    try {
      setLoading(true);
      const mockProfile = {
        id,
        completeness: 75,
        rating: 4.2,
        country: "Germany",
        isVerified: true,
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        lastBoost: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        dailyBoostsUsed: Math.floor(Math.random() * DAILY_BOOST_LIMIT)
      };
      
      setProfileData(mockProfile);
      setDailyBoostUsage(mockProfile.dailyBoostsUsed);
      
      const profileAge = (Date.now() - mockProfile.createdAt.getTime()) / (1000 * 60 * 60 * 24);
      
      let eligibilityResult;
      
      if (!mockProfile.isVerified) {
        eligibilityResult = { 
          eligible: false,
          reason: "Only verified escorts can use the boost feature"
        };
      } else if (mockProfile.dailyBoostsUsed >= DAILY_BOOST_LIMIT) {
        eligibilityResult = { 
          eligible: false,
          reason: `You've reached the daily limit of ${DAILY_BOOST_LIMIT} boosts (12 hours total)`
        };
      } else {
        eligibilityResult = isEligibleForBoosting(
          mockProfile.completeness,
          mockProfile.isVerified,
          profileAge,
          mockProfile.lastBoost
        );
      }
      
      setEligibility(eligibilityResult);
      
    } catch (err: any) {
      console.error("Error fetching profile data:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const checkActiveBoost = useCallback(async (id: string) => {
    try {
      setLoading(true);
      const hasActiveBoost = Math.random() > 0.7;
      
      if (hasActiveBoost) {
        const endDate = new Date(Date.now() + 2 * 60 * 60 * 1000);
        const mockPackage: BoostPackage = {
          id: "boost-standard",
          name: "3-Hour Boost",
          duration: "03:00:00",
          price_lucoin: 15
        };
        
        const remainingTime = calculateRemainingTime(endDate);
        const totalDuration = 3 * 60 * 60 * 1000;
        const elapsed = totalDuration - (endDate.getTime() - Date.now());
        const progress = Math.min(100, Math.floor((elapsed / totalDuration) * 100));
        
        setBoostStatus({
          isActive: true,
          expiresAt: endDate,
          boostPackage: mockPackage,
          remainingTime,
          progress
        });
      } else {
        setBoostStatus({ 
          isActive: false,
          progress: 0,
          remainingTime: ''
        });
      }
    } catch (err: any) {
      console.error("Error checking active boost:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const getBoostPrice = useCallback(() => {
    return 15;
  }, []);

  const cancelBoost = async (): Promise<boolean> => {
    if (!profileId || !boostStatus.isActive) {
      return false;
    }

    try {
      setLoading(true);
      
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

  return {
    boostStatus,
    setBoostStatus,
    eligibility,
    profileData,
    loading,
    dailyBoostUsage,
    dailyBoostLimit: DAILY_BOOST_LIMIT,
    fetchProfileData,
    checkActiveBoost,
    getBoostPrice,
    cancelBoost
  };
};
