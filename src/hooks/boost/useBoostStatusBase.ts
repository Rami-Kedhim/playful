
import { useState, useEffect, useCallback } from 'react';
import { BoostStatus, BoostPackage, BoostEligibility } from '@/types/boost';
import { formatDistanceToNow } from 'date-fns';

export interface UseBoostStatusBaseProps {
  profileId: string;
  initialStatus?: BoostStatus;
  initialEligibility?: BoostEligibility;
  initialPackages?: BoostPackage[];
  
  // API functions - these would be replaced with actual API calls in a real implementation
  fetchBoostStatus?: (profileId: string) => Promise<BoostStatus>;
  fetchEligibility?: (profileId: string) => Promise<BoostEligibility>;
  fetchBoostPackages?: () => Promise<BoostPackage[]>;
  activateBoost?: (profileId: string, packageId: string) => Promise<BoostStatus>;
  deactivateBoost?: (profileId: string) => Promise<boolean>;
}

export interface UseBoostStatusBaseResult {
  boostStatus: BoostStatus;
  loading: boolean;
  error: string | null;
  refreshStatus: () => Promise<void>;
}

export const useBoostStatusBase = ({
  profileId,
  initialStatus,
  initialEligibility = { isEligible: true, reason: '' },
  initialPackages = [],
  fetchBoostStatus,
  fetchEligibility,
  fetchBoostPackages,
  activateBoost,
  deactivateBoost
}: UseBoostStatusBaseProps): UseBoostStatusBaseResult => {
  // State
  const [boostStatus, setBoostStatus] = useState<BoostStatus>(initialStatus || {
    isActive: false,
    startTime: '',
    endTime: '',
    remainingTime: '0',
  } as BoostStatus);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Convert Date objects to ISO strings for consistent storage
  const ensureDateString = (date: string | Date | undefined): string => {
    if (!date) return '';
    if (date instanceof Date) return date.toISOString();
    return date;
  };

  // Refresh the boost status
  const refreshStatus = useCallback(async () => {
    if (!profileId || !fetchBoostStatus) return;

    setLoading(true);
    try {
      const statusData = await fetchBoostStatus(profileId);
      
      // Convert any Date objects to ISO strings for consistency
      const normalizedStatus: BoostStatus = {
        ...statusData,
        startTime: ensureDateString(statusData.startTime),
        endTime: ensureDateString(statusData.endTime),
        expiresAt: ensureDateString(statusData.expiresAt),
      };
      
      setBoostStatus(normalizedStatus);
    } catch (err) {
      console.error('Error fetching boost status:', err);
      setError('Failed to fetch boost status');
      
      // Reset to inactive status on error
      setBoostStatus(prev => ({
        isActive: false,
        remainingTime: '0',
        startTime: prev.startTime,
        endTime: prev.endTime,
        packageId: prev.packageId,
        packageName: prev.packageName,
        progress: prev.progress,
        expiresAt: prev.expiresAt,
        boostPackage: prev.boostPackage,
        profileId: prev.profileId,
        timeRemaining: prev.timeRemaining,
        activeBoostId: prev.activeBoostId
      }));
    } finally {
      setLoading(false);
    }
  }, [profileId, fetchBoostStatus]);

  // Initial data fetch
  useEffect(() => {
    if (initialStatus) return; // Skip if initial data was provided
    refreshStatus();
  }, [initialStatus, refreshStatus]);

  // Update remaining time for active boosts
  useEffect(() => {
    if (!boostStatus.isActive) return;

    const updateRemainingTime = () => {
      setBoostStatus(prev => {
        if (!prev.endTime) return prev;
        
        try {
          const endTime = new Date(prev.endTime);
          const now = new Date();
          
          if (now >= endTime) {
            // Boost has expired
            return {
              ...prev,
              isActive: false,
              remainingTime: '0',
            };
          }
          
          const diff = endTime.getTime() - now.getTime(); // in milliseconds
          const seconds = Math.floor(diff / 1000);
          
          return {
            ...prev,
            remainingTime: seconds.toString(),
            timeRemaining: formatDistanceToNow(endTime, { addSuffix: false }),
            progress: calculateProgress(prev.startTime, prev.endTime)
          };
        } catch (e) {
          console.error('Error updating remaining time:', e);
          return prev;
        }
      });
    };
    
    // Calculate progress percentage
    const calculateProgress = (startTime: string, endTime: string): number => {
      try {
        const start = new Date(startTime).getTime();
        const end = new Date(endTime).getTime();
        const now = Date.now();
        
        const total = end - start;
        const elapsed = now - start;
        
        return Math.min(100, Math.max(0, Math.round((elapsed / total) * 100)));
      } catch (e) {
        return 0;
      }
    };
    
    updateRemainingTime();
    const interval = setInterval(updateRemainingTime, 1000);
    
    return () => clearInterval(interval);
  }, [boostStatus.isActive, boostStatus.endTime]);

  return {
    boostStatus,
    loading,
    error,
    refreshStatus
  };
};
