
import { useState, useCallback } from 'react';
import { BoostPackage } from '@/types/boost';

export const useBoostPackages = () => {
  const [packages, setPackages] = useState<BoostPackage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPackages = useCallback(async () => {
    try {
      setLoading(true);
      
      // In a real app, this would be an API call
      // For demo, we'll use mock data
      const mockPackages: BoostPackage[] = [
        {
          id: "boost-1",
          name: "1-Hour Boost",
          duration: "01:00:00",
          price_lucoin: 5,
          description: "Quick visibility boost",
          features: ["Top search position", "Featured badge"]
        },
        {
          id: "boost-3",
          name: "3-Hour Boost",
          duration: "03:00:00",
          price_lucoin: 15,
          description: "Standard visibility boost",
          features: ["Top search position", "Featured badge", "Profile highlighting"]
        },
        {
          id: "boost-24",
          name: "24-Hour Boost",
          duration: "24:00:00",
          price_lucoin: 50,
          description: "Full day visibility boost",
          features: ["Top search position", "Featured badge", "Profile highlighting", "Priority in all listings"]
        }
      ];
      
      setPackages(mockPackages);
      setError(null);
    } catch (err) {
      console.error("Error fetching boost packages:", err);
      setError("Failed to fetch boost packages");
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    packages,
    loading,
    error,
    fetchPackages
  };
};
