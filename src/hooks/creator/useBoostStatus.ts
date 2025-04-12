import { useState, useEffect } from "react";
import { BoostStatus, BoostPackage } from "@/types/boost";
import { calculateRemainingTime, formatBoostDuration } from "@/utils/boostCalculator";

export const useBoostStatus = (creatorId: string | undefined) => {
  const [boostStatus, setBoostStatus] = useState<BoostStatus>({
    isActive: false,
    progress: 0,
    remainingTime: ''
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
        
        const mockActiveBoost = Math.random() > 0.5;
        
        if (mockActiveBoost) {
          const expiryDate = new Date();
          expiryDate.setDate(expiryDate.getDate() + 3); // 3 days from now
          
          const mockBoostPackage: BoostPackage = {
            id: "boost-premium",
            name: "Premium Boost",
            duration: "72:00:00", // 3 days
            price_ubx: 150,
            description: "Premium visibility boost for 3 days",
            features: ["Top search results", "Featured badge", "Highlighted profile"]
          };
          
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
            isActive: false,
            progress: 0,
            remainingTime: ''
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
    
    const timer = setInterval(() => {
      if (boostStatus.isActive && boostStatus.expiresAt) {
        setBoostStatus(prev => ({
          ...prev,
          remainingTime: calculateRemainingTime(prev.expiresAt as Date),
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
