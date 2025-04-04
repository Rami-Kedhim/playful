
import { useState, useEffect } from "react";
import { BoostStatus, BoostPackage } from "@/types/boost";
import { calculateRemainingTime, formatBoostDuration } from "@/utils/boostCalculator";

export const useBoostStatus = (creatorId: string | undefined) => {
  const [boostStatus, setBoostStatus] = useState<BoostStatus>({
    isActive: false
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBoostStatus = async () => {
      if (!creatorId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        
        // In a real app, this would be an API call to fetch the current boost status
        // For demo purposes, we're creating mock data
        const mockActiveBoost = Math.random() > 0.5;
        
        if (mockActiveBoost) {
          const expiryDate = new Date();
          expiryDate.setDate(expiryDate.getDate() + 3); // 3 days from now
          
          const mockBoostPackage: BoostPackage = {
            id: "boost-premium",
            name: "Premium Boost",
            duration: "72:00:00", // 3 days
            price_lucoin: 150,
            features: ["Top search results", "Featured badge", "Highlighted profile"],
            description: "Premium visibility boost for 3 days"
          };
          
          // Calculate progress (0-100)
          const totalDurationMs = 3 * 24 * 60 * 60 * 1000; // 3 days in ms
          const elapsedMs = totalDurationMs - (expiryDate.getTime() - new Date().getTime());
          const progress = Math.max(0, Math.min(100, (elapsedMs / totalDurationMs) * 100));
          
          setBoostStatus({
            isActive: true,
            expiresAt: expiryDate,
            boostPackage: mockBoostPackage,
            remainingTime: calculateRemainingTime(expiryDate),
            progress: progress
          });
        } else {
          setBoostStatus({
            isActive: false
          });
        }
        
        setError(null);
      } catch (err) {
        console.error("Error fetching boost status:", err);
        setError("Failed to fetch boost status");
      } finally {
        setLoading(false);
      }
    };
    
    fetchBoostStatus();
    
    // Set up a timer to update remaining time every minute
    const timer = setInterval(() => {
      if (boostStatus.isActive && boostStatus.expiresAt) {
        setBoostStatus(prev => ({
          ...prev,
          remainingTime: calculateRemainingTime(prev.expiresAt as Date),
          // Update progress
          progress: prev.expiresAt ? 
            (1 - (prev.expiresAt.getTime() - new Date().getTime()) / 
            (new Date(prev.expiresAt).getTime() - new Date(new Date().getTime() - (3 * 24 * 60 * 60 * 1000)).getTime())) * 100 : 
            prev.progress
        }));
      }
    }, 60000); // Every minute
    
    return () => clearInterval(timer);
  }, [creatorId]);

  const formatDuration = (durationStr: string): string => {
    return formatBoostDuration(durationStr);
  };

  return {
    boostStatus,
    loading,
    error,
    formatDuration
  };
};
