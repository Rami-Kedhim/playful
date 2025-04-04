
import { useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { BoostPackage, BoostStatus } from "@/types/boost";
import { useAuth } from "@/hooks/auth/useAuth";
import { 
  calculateBoostPrice, 
  isEligibleForBoosting, 
  getCurrentTimeSlot,
  calculateRemainingTime,
  formatBoostDuration
} from "@/utils/boostCalculator";

export const useBoostManager = (profileId?: string) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [boostPackages, setBoostPackages] = useState<BoostPackage[]>([]);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [boostStatus, setBoostStatus] = useState<BoostStatus>({ isActive: false });
  const [eligibility, setEligibility] = useState<{ eligible: boolean; reason?: string }>({ eligible: false });
  const [profileData, setProfileData] = useState<any>(null);

  // Get profile boost info when profileId changes
  useEffect(() => {
    if (profileId) {
      fetchProfileData(profileId);
      checkActiveBoost(profileId);
    }
  }, [profileId]);

  // Fetch profile data to check completeness, rating, etc.
  const fetchProfileData = async (id: string) => {
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
      setError(err.message || "Failed to load profile data");
    } finally {
      setLoading(false);
    }
  };

  // Check if profile has an active boost
  const checkActiveBoost = async (id: string) => {
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
  };

  // Fetch available boost packages
  const fetchBoostPackages = async () => {
    try {
      setLoading(true);
      // In a real implementation, this would be an API call
      // For now, we'll use mock data
      const mockPackages: BoostPackage[] = [
        {
          id: "boost-1",
          name: "24 Hour Boost",
          duration: "24:00:00",
          price_lucoin: 50,
          description: "Boost your profile for 24 hours"
        },
        {
          id: "boost-2",
          name: "Weekend Boost",
          duration: "72:00:00",
          price_lucoin: 120,
          description: "Boost your profile for 3 days"
        },
        {
          id: "boost-3",
          name: "Weekly Boost",
          duration: "168:00:00",
          price_lucoin: 200,
          description: "Boost your profile for a full week",
          features: ["Featured section placement", "Special badge"]
        }
      ];
      
      setBoostPackages(mockPackages);
      
      // Auto-select the first package as default
      if (mockPackages.length > 0 && !selectedPackage) {
        setSelectedPackage(mockPackages[0].id);
      }
      
      return mockPackages;
    } catch (err: any) {
      console.error("Error fetching boost packages:", err);
      setError(err.message || "Failed to load boost packages");
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Calculate dynamic boost price based on the Oxum algorithm
  const getBoostPrice = () => {
    if (!profileData) return 0;
    
    return calculateBoostPrice({
      country: profileData.country,
      completeness: profileData.completeness,
      rating: profileData.rating,
      timeSlot: getCurrentTimeSlot(),
      role: profileData.isVerified ? "verified" : "regular"
    });
  };

  // Purchase a boost package
  const purchaseBoost = async (packageId: string): Promise<boolean> => {
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to purchase a boost",
        variant: "destructive"
      });
      return false;
    }

    if (!profileId) {
      toast({
        title: "Error",
        description: "No profile selected for boosting",
        variant: "destructive"
      });
      return false;
    }

    if (!eligibility.eligible) {
      toast({
        title: "Not Eligible",
        description: eligibility.reason || "Your profile is not eligible for boosting",
        variant: "destructive"
      });
      return false;
    }

    try {
      setLoading(true);
      
      // Find the selected package
      const selectedBoostPackage = boostPackages.find(pkg => pkg.id === packageId);
      if (!selectedBoostPackage) {
        throw new Error("Selected package not found");
      }
      
      // In a real implementation, this would be an API call to process the payment
      // For now, we'll simulate a successful boost purchase
      
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update the boost status
      const endDate = new Date();
      // Parse duration string (format: "168:00:00" for 7 days)
      const hoursPart = selectedBoostPackage.duration.split(':')[0];
      const hoursToAdd = parseInt(hoursPart);
      endDate.setTime(endDate.getTime() + hoursToAdd * 60 * 60 * 1000);
      
      setBoostStatus({
        isActive: true,
        expiresAt: endDate,
        boostPackage: selectedBoostPackage,
        remainingTime: calculateRemainingTime(endDate),
        progress: 0
      });
      
      toast({
        title: "Boost Purchased",
        description: `Your profile has been boosted until ${endDate.toLocaleDateString()}`,
      });
      
      return true;
    } catch (err: any) {
      console.error("Error purchasing boost:", err);
      setError(err.message || "Failed to purchase boost");
      
      toast({
        title: "Error",
        description: err.message || "Failed to purchase boost",
        variant: "destructive"
      });
      
      return false;
    } finally {
      setLoading(false);
    }
  };

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
      setError(err.message || "Failed to cancel boost");
      
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

  // Return analytics about the boost (views, engagement, etc.)
  const getBoostAnalytics = async () => {
    if (!profileId || !boostStatus.isActive) {
      return null;
    }

    try {
      // In a real implementation, this would be an API call
      // For now, we'll return mock data
      return {
        additionalViews: Math.floor(Math.random() * 100) + 50,
        engagementIncrease: Math.floor(Math.random() * 30) + 10,
        rankingPosition: Math.floor(Math.random() * 5) + 1
      };
    } catch (err) {
      console.error("Error fetching boost analytics:", err);
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
    formatBoostDuration,
    getBoostAnalytics
  };
};

export default useBoostManager;
