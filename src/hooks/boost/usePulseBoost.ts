
import { useState, useEffect, useCallback } from 'react';
import { BoostStatus, BoostPackage } from '@/types/pulse-boost';
import { pulseBoostService } from '@/services/boost/pulseBoostService';

export const usePulseBoost = (profileId?: string) => {
  const [boostStatus, setBoostStatus] = useState<BoostStatus>({
    isActive: false
  });
  const [packages, setPackages] = useState<BoostPackage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchBoostStatus = useCallback(async () => {
    if (!profileId) return;
    
    try {
      setLoading(true);
      const data = await pulseBoostService.getBoostStatus(profileId);
      setBoostStatus(data);
    } catch (error) {
      console.error('Error fetching boost status:', error);
    } finally {
      setLoading(false);
    }
  }, [profileId]);

  const fetchBoostPackages = useCallback(async () => {
    try {
      setLoading(true);
      const data = await pulseBoostService.getBoostPackages();
      setPackages(data);
    } catch (error) {
      console.error('Error fetching boost packages:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBoostStatus();
    fetchBoostPackages();
  }, [fetchBoostStatus, fetchBoostPackages]);

  const purchaseBoost = async (packageId: string) => {
    if (!profileId) return { success: false, message: 'No profile ID provided' };
    
    try {
      setLoading(true);
      const result = await pulseBoostService.purchaseBoost(profileId, packageId);
      
      if (result.success) {
        await fetchBoostStatus();
        return { success: true, message: 'Boost purchased successfully' };
      } else {
        return { success: false, message: result.message };
      }
    } catch (error) {
      console.error('Error purchasing boost:', error);
      return { success: false, message: 'An error occurred while purchasing boost' };
    } finally {
      setLoading(false);
    }
  };

  const getFormattedTimeRemaining = () => {
    if (!boostStatus.isActive || !boostStatus.expiresAt) return 'No active boost';
    
    const expiry = boostStatus.expiresAt instanceof Date 
      ? boostStatus.expiresAt 
      : new Date(boostStatus.expiresAt);
    
    const now = new Date();
    const timeDiff = expiry.getTime() - now.getTime();
    
    if (timeDiff <= 0) return 'Expired';
    
    // Calculate days, hours, minutes
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ${hours}h remaining`;
    } else if (hours > 0) {
      return `${hours}h ${minutes}m remaining`;
    } else {
      return `${minutes} minute${minutes !== 1 ? 's' : ''} remaining`;
    }
  };

  return {
    boostStatus,
    packages,
    loading,
    refreshStatus: fetchBoostStatus,
    purchaseBoost,
    getFormattedTimeRemaining
  };
};

export default usePulseBoost;
