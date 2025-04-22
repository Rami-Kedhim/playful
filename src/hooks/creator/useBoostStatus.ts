
import { useEffect } from 'react';
import { useBoostStatusBase, UseBoostStatusBaseResult } from '../boost/useBoostStatus';

// Hook for creator boost status
export const useCreatorBoostStatus = (creatorId?: string): UseBoostStatusBaseResult => {
  const baseHook = useBoostStatusBase();
  
  // Override the base fetchBoostStatus function for creator-specific logic
  const fetchBoostStatus = async (): Promise<any> => {
    try {
      // Creator-specific implementation
      const status = { isActive: Math.random() > 0.5 };
      baseHook.setBoostStatus(status);
      return status;
    } catch (err) {
      console.error('Failed to fetch creator boost status', err);
      return null;
    }
  };
  
  // Override the formatDuration function
  const formatDuration = (duration: string): string => {
    // Creator-specific formatter
    const [hours, minutes] = duration.split(':').map(Number);
    if (hours >= 24) {
      const days = Math.floor(hours / 24);
      return `${days} ${days === 1 ? 'day' : 'days'}`;
    }
    return `${hours} ${hours === 1 ? 'hour' : 'hours'}`;
  };
  
  // Load boost status on mount
  useEffect(() => {
    if (creatorId) {
      fetchBoostStatus();
    }
  }, [creatorId]);
  
  // Return the base hook with overrides
  return {
    ...baseHook,
    fetchBoostStatus,
    formatDuration,
    getBoostPrice: (packageId: string) => {
      // Creator-specific pricing
      const prices: Record<string, number> = {
        'basic': 10,
        'standard': 25,
        'premium': 50,
        'ultimate': 100
      };
      return prices[packageId] || 15;
    }
  };
};

export default useCreatorBoostStatus;
