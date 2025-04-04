
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
      // For now, we'll implement the Oxum Ethical Boosting Model with fixed packages
      const oxumEthicalBoostPackages: BoostPackage[] = [
        {
          id: "boost-standard",
          name: "3-Hour Boost",
          duration: "03:00:00", // 3 hours
          price_lucoin: 15, // Equivalent to $1.50
          description: "Boost your profile for 3 hours with priority placement",
          features: ["Featured profile label", "Priority in search results", "Increased visibility"]
        }
      ];
      
      setBoostPackages(oxumEthicalBoostPackages);
      
      // Auto-select the only package as default
      if (oxumEthicalBoostPackages.length > 0 && !selectedPackage) {
        setSelectedPackage(oxumEthicalBoostPackages[0].id);
      }
      
      return oxumEthicalBoostPackages;
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
