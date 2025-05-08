
import { useState, useEffect, useCallback } from 'react';
import { pulseService } from '@/services/boost/pulseService';
import { EnhancedBoostStatus, BoostPackage } from '@/types/pulse-boost';

/**
 * usePulseBoost hook for managing escort boost status
 */
export function usePulseBoost(userId?: string) {
  // Initialize state with proper types
  const [boostStatus, setBoostStatus] = useState<EnhancedBoostStatus>({
    isActive: false,
    remainingTime: "0",
    timeRemaining: "0",
    percentRemaining: 0,
    expiresAt: null,
    startedAt: null,
    isExpired: true,
    remainingMinutes: 0
  });

  const [packages, setPackages] = useState<BoostPackage[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshCounter, setRefreshCounter] = useState(0);

  // Fetch boost packages
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const fetchedPackages = pulseService.getPackages();
        setPackages(fetchedPackages);
      } catch (err) {
        console.error('Error fetching boost packages:', err);
      }
    };

    fetchPackages();
  }, []);

  // Load user's active boost status
  useEffect(() => {
    const fetchBoostStatus = async () => {
      if (!userId) return;

      setLoading(true);
      try {
        // Get mock boost purchase for the user
        const activePurchase = pulseService.getMockBoostPurchase(userId);

        if (activePurchase) {
          // Get package details
          const packageDetails = packages.find(pkg => pkg.id === activePurchase.packageId);
          const durationInMinutes = packageDetails?.durationMinutes || 0;

          // Calculate boost status
          const status = pulseService.calculateBoostStatus(
            activePurchase.startTime,
            durationInMinutes
          );

          setBoostStatus({
            ...status,
            isExpired: !status.isActive
          });
        } else {
          // No active boost
          setBoostStatus({
            isActive: false,
            remainingTime: "0",
            timeRemaining: "0",
            percentRemaining: 0,
            expiresAt: null,
            startedAt: null,
            isExpired: true,
            remainingMinutes: 0
          });
        }
      } catch (err) {
        console.error('Error fetching boost status:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBoostStatus();
  }, [userId, refreshCounter, packages]);

  // Manually refresh the boost status
  const refreshStatus = useCallback(() => {
    setRefreshCounter(prev => prev + 1);
  }, []);

  // Purchase a boost for the user
  const purchaseBoost = useCallback(async (packageId: string) => {
    if (!userId) return { success: false, message: 'User ID is required' };

    try {
      setLoading(true);
      
      // Find package details
      const boostPackage = packages.find(p => p.id === packageId);
      if (!boostPackage) {
        return { success: false, message: 'Invalid package selected' };
      }

      const now = new Date();
      const startDate = now;
      const endDate = new Date(now.getTime() + boostPackage.durationMinutes * 60 * 1000);

      // Update the boost status immediately for better UX
      setBoostStatus({
        isActive: true,
        remainingTime: boostPackage.durationMinutes.toString(),
        timeRemaining: boostPackage.durationMinutes.toString(),
        percentRemaining: 100,
        expiresAt: endDate,
        startedAt: startDate,
        isExpired: false,
        remainingMinutes: boostPackage.durationMinutes
      });

      // Perform purchase operation (mocked)
      // In a real app, this would call an API endpoint
      await new Promise(resolve => setTimeout(resolve, 1000));

      refreshStatus();
      return { success: true, message: 'Boost activated successfully' };
    } catch (error: any) {
      console.error('Error purchasing boost:', error);
      return { 
        success: false, 
        message: error.message || 'Failed to purchase boost'
      };
    } finally {
      setLoading(false);
    }
  }, [userId, packages, refreshStatus]);

  // Format the remaining time as a human-readable string
  const getFormattedTimeRemaining = useCallback(() => {
    const minutes = boostStatus.remainingMinutes || 0;
    const hours = Math.floor(minutes / 60);
    const remainingMins = minutes % 60;
    
    if (hours > 0) {
      return `${hours}h ${remainingMins}m`;
    }
    return `${remainingMins}m`;
  }, [boostStatus.remainingMinutes]);

  return {
    boostStatus,
    packages,
    loading,
    refreshStatus,
    purchaseBoost,
    getFormattedTimeRemaining
  };
}

export default usePulseBoost;
