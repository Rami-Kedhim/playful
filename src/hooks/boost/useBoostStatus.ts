
import { useState, useCallback } from "react";
import { toast } from "@/components/ui/use-toast";
import { BoostStatus, BoostPackage } from "@/types/boost";
import { 
  calculateBoostPrice, 
  isEligibleForBoosting, 
  getCurrentTimeSlot,
  calculateRemainingTime
} from "@/utils/boostCalculator";

export const useBoostStatus = (profileId?: string) => {
  const [loading, setLoading] = useState(false);
  const [boostStatus, setBoostStatus] = useState<BoostStatus>({ isActive: false });
  const [eligibility, setEligibility] = useState<{ eligible: boolean; reason?: string }>({ eligible: false });
  const [profileData, setProfileData] = useState<any>(null);

  // Fetch profile data to check completeness, rating, etc.
  const fetchProfileData = useCallback(async (id: string) => {
    try {
      setLoading(true);
      // In a real implementation, this would be an API call
      // For now, we'll simulate with mock data
      const mockProfile = {
        id,
        completeness: 75,
        rating: 4.2,
        country: "Germany",
        isVerified: true,
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
        lastBoost: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) // 5 days ago
      };
      
      setProfileData(mockProfile);
      
      // Check if profile is eligible for boosting
      const profileAge = (Date.now() - mockProfile.createdAt.getTime()) / (1000 * 60 * 60 * 24);
      const eligibilityResult = isEligibleForBoosting(
        mockProfile.completeness,
        mockProfile.isVerified,
        profileAge,
        mockProfile.lastBoost
      );
      setEligibility(eligibilityResult);
      
    } catch (err: any) {
      console.error("Error fetching profile data:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Check if profile has an active boost
  const checkActiveBoost = useCallback(async (id: string) => {
    try {
      setLoading(true);
      // In a real implementation, this would be an API call
      // For now, we'll simulate with mock data
      const hasActiveBoost = Math.random() > 0.7; // 30% chance of having an active boost
      
      if (hasActiveBoost) {
        const endDate = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000); // 2 days from now
        const mockPackage: BoostPackage = {
          id: "boost-1",
          name: "Weekly Boost",
          duration: "168:00:00", // 7 days in hours:minutes:seconds
          price_lucoin: 100
        };
        
        const remainingTime = calculateRemainingTime(endDate);
        const totalDuration = 7 * 24 * 60 * 60 * 1000; // 7 days in ms
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
        setBoostStatus({ isActive: false });
      }
    } catch (err: any) {
      console.error("Error checking active boost:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Calculate dynamic boost price based on the Oxum algorithm
  const getBoostPrice = useCallback(() => {
    if (!profileData) return 0;
    
    return calculateBoostPrice({
      country: profileData.country,
      completeness: profileData.completeness,
      rating: profileData.rating,
      timeSlot: getCurrentTimeSlot(),
      role: profileData.isVerified ? "verified" : "regular"
    });
  }, [profileData]);

  // Cancel an active boost
  const cancelBoost = async (): Promise<boolean> => {
    if (!profileId || !boostStatus.isActive) {
      return false;
    }

    try {
      setLoading(true);
      
      // In a real implementation, this would be an API call
      // For now, we'll simulate a successful cancellation
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setBoostStatus({ isActive: false });
      
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
    fetchProfileData,
    checkActiveBoost,
    getBoostPrice,
    cancelBoost
  };
};
