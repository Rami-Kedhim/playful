
import { useEffect } from 'react';
import { useBoostStatus } from '../boost/useBoostStatus';

// Hook for creator boost status
export const useCreatorBoostStatus = (creatorId?: string) => {
  const { status, loading, error, refetch } = useBoostStatus(creatorId);
  
  // Override the base fetchBoostStatus function for creator-specific logic
  const fetchBoostStatus = async () => {
    try {
      // Creator-specific implementation
      const creatorStatus = { isActive: Math.random() > 0.5 };
      return creatorStatus;
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
      refetch();
    }
  }, [creatorId, refetch]);
  
  // Return the base hook with overrides
  return {
    status,
    loading,
    error,
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
