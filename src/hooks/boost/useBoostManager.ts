
import { useState, useEffect, useCallback } from 'react';
import { BoostStatus } from '@/types/pulse-boost';

const useBoostManager = (profileId?: string) => {
  const [boostStatus, setBoostStatus] = useState<BoostStatus>({
    isActive: false,
    expiresAt: '',
    remainingDays: 0,
    boostLevel: 0,
    isExpiring: false
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const fetchBoostStatus = useCallback(async () => {
    if (!profileId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Randomly determine if there's an active boost for demo purposes
      const isActive = Math.random() > 0.5;
      
      if (isActive) {
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + Math.floor(Math.random() * 7) + 1);
        
        setBoostStatus({
          isActive: true,
          expiresAt: expiresAt.toISOString(),
          remainingDays: Math.floor((expiresAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24)),
          boostLevel: Math.floor(Math.random() * 3) + 1,
          isExpiring: Math.random() > 0.7
        });
      } else {
        setBoostStatus({
          isActive: false,
          expiresAt: '',
          remainingDays: 0,
          boostLevel: 0,
          isExpiring: false
        });
      }
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
  
  const applyBoost = useCallback(async (packageId: string): Promise<boolean> => {
    if (!profileId) return false;
    
    setLoading(true);
    setError(null);
    
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 7); // 7 days boost
      
      setBoostStatus({
        isActive: true,
        expiresAt: expiresAt.toISOString(),
        remainingDays: 7,
        boostLevel: 2,
        isExpiring: false
      });
      
      return true;
    } catch (err) {
      console.error('Error applying boost:', err);
      setError('Failed to apply boost');
      return false;
    } finally {
      setLoading(false);
    }
  }, [profileId]);
  
  return {
    boostStatus,
    loading,
    error,
    fetchBoostStatus,
    applyBoost
  };
};

export default useBoostManager;
