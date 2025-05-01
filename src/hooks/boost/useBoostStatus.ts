
import { useState, useEffect } from 'react';
import { BoostStatus } from '@/types/boost';

export const useBoostStatus = (profileId?: string) => {
  const [status, setStatus] = useState<BoostStatus>({
    isActive: false,
    remainingTime: '00:00:00'
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const fetchBoostStatus = async () => {
    if (!profileId) {
      setLoading(false);
      return;
    }
    
    setLoading(true);
    try {
      // Mock data
      setStatus({
        isActive: Math.random() > 0.5, // Randomly active for demo
        packageName: '24 Hour Boost',
        startTime: new Date().toISOString(),
        endTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        remainingTime: '18:45:30',
        packageId: 'boost-1',
        progress: 25
      });
    } catch (err: any) {
      setError(err.message || 'Failed to fetch boost status');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchBoostStatus();
    
    // Poll for updates every minute
    const interval = setInterval(fetchBoostStatus, 60000);
    return () => clearInterval(interval);
  }, [profileId]);
  
  const refetch = () => {
    fetchBoostStatus();
  };
  
  return {
    status,
    loading,
    error,
    refetch
  };
};

export default useBoostStatus;
