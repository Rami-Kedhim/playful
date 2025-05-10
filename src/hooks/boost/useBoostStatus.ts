
import { useState, useEffect, useCallback } from 'react';
import { BoostStatus } from '@/types/pulse-boost';
import { pulseBoostService } from '@/services/boost/pulseBoostService';

export const useBoostStatus = (profileId?: string) => {
  const [boostStatus, setBoostStatus] = useState<BoostStatus>({
    isActive: false,
    timeRemaining: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  
  const fetchBoostStatus = useCallback(async () => {
    if (!profileId) {
      setLoading(false);
      return;
    }
    
    try {
      setLoading(true);
      const status = await pulseBoostService.getBoostStatus(profileId);
      setBoostStatus(status);
      setError('');
    } catch (err) {
      console.error('Error fetching boost status:', err);
      setError('Failed to fetch boost status');
    } finally {
      setLoading(false);
    }
  }, [profileId]);
  
  useEffect(() => {
    fetchBoostStatus();
  }, [fetchBoostStatus]);
  
  const applyBoost = async (packageId: string): Promise<boolean> => {
    if (!profileId) return false;
    
    try {
      setLoading(true);
      const result = await pulseBoostService.purchaseBoost(profileId, packageId);
      
      if (result.success) {
        await fetchBoostStatus();
        return true;
      } else {
        setError(result.message || 'Failed to apply boost');
        return false;
      }
    } catch (err) {
      console.error('Error applying boost:', err);
      setError('Failed to apply boost');
      return false;
    } finally {
      setLoading(false);
    }
  };
  
  return {
    boostStatus,
    loading,
    error,
    fetchBoostStatus,
    applyBoost,
    // Add hermesStatus for compatibility
    hermesStatus: {
      score: 0,
      position: 0,
      estimatedVisibility: 0,
      recommendations: [],
      lastUpdated: new Date()
    }
  };
};

// Export both as default and named export for maximum compatibility
export default useBoostStatus;
