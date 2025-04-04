
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/auth/useAuth";
import { BoostStatus } from "@/types/boost";
import { calculateRemainingTime } from "@/utils/boostCalculator";

export const useBoostPurchase = (
  profileId?: string,
  boostStatus?: BoostStatus,
  setBoostStatus?: React.Dispatch<React.SetStateAction<BoostStatus>>
) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

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

    if (!setBoostStatus) {
      toast({
        title: "Error",
        description: "Cannot update boost status",
        variant: "destructive"
      });
      return false;
    }

    try {
      setLoading(true);
      
      // In a real implementation, this would be an API call to fetch the selected package
      // For now, we'll simulate the process
      const mockPackages = [
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
      
      // Find the selected package
      const selectedBoostPackage = mockPackages.find(pkg => pkg.id === packageId);
      if (!selectedBoostPackage) {
        throw new Error("Selected package not found");
      }
      
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

  return {
    purchaseBoost,
    loading
  };
};
