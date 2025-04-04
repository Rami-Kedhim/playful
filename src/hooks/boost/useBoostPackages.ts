
import { useState, useCallback } from "react";
import { BoostPackage } from "@/types/boost";

export const useBoostPackages = (
  selectedPackage: string | null,
  setSelectedPackage: (packageId: string | null) => void
) => {
  const [loading, setLoading] = useState(false);
  const [boostPackages, setBoostPackages] = useState<BoostPackage[]>([]);

  // Fetch available boost packages
  const fetchBoostPackages = useCallback(async () => {
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
      return [];
    } finally {
      setLoading(false);
    }
  }, [selectedPackage, setSelectedPackage]);

  return {
    boostPackages,
    loading,
    fetchBoostPackages
  };
};
