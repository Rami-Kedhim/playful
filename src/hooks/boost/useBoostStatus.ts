
import { useState, useEffect, useCallback } from 'react';
import { BoostStatus } from '@/types/pulse-boost';

const useBoostStatus = (profileId?: string) => {
  const [boostStatus, setBoostStatus] = useState<BoostStatus | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const fetchBoostStatus = useCallback(async () => {
    if (!profileId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      // In a real app, this would be an API call
      // Simulating API call for now
      await new Promise(resolve => setTimeout(resolve, 500));

      const mockStatus: BoostStatus = {
        isActive: true,
        packageName: 'Premium Boost',
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        startTime: new Date(),
        timeRemaining: '6 days, 23 hours',
        progress: 85,
        boostLevel: 3,
        isExpiring: false,
        packageId: 'premium'
      };

      setBoostStatus(mockStatus);
      setError('');
    } catch (err) {
      console.error('Error fetching boost status:', err);
      setError('Failed to load boost status');
    } finally {
      setLoading(false);
    }
  }, [profileId]);

  const applyBoost = async (packageId: string): Promise<boolean> => {
    if (!profileId) return false;

    setLoading(true);
    try {
      // In a real app, this would be an API call
      // Simulating API call for now
      await new Promise(resolve => setTimeout(resolve, 800));

      const mockStatus: BoostStatus = {
        isActive: true,
        packageName: 'Premium Boost',
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        startTime: new Date(),
        timeRemaining: '7 days',
        progress: 100,
        boostLevel: 3,
        isExpiring: false,
        packageId
      };

      setBoostStatus(mockStatus);
      setError('');
      return true;
    } catch (err) {
      console.error('Error applying boost:', err);
      setError('Failed to apply boost');
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBoostStatus();
  }, [fetchBoostStatus]);

  return {
    boostStatus,
    loading,
    error,
    fetchBoostStatus,
    applyBoost
  };
};

export default useBoostStatus;
