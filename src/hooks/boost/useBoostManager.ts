
import { useState, useEffect } from 'react';
import { adaptBoostStatus } from '@/hooks/boost/useBoostAdapters';
import { BoostStatus, BoostEligibility, BoostAnalytics, BoostPackage } from '@/types/boost';
import BoostService from '@/services/boostService';

export const useBoostManager = (profileId?: string) => {
  const [boostStatus, setBoostStatus] = useState<BoostStatus>({ isActive: false });
  const [boostAnalytics, setBoostAnalytics] = useState<BoostAnalytics | null>(null);
  const [eligibility, setEligibility] = useState<BoostEligibility>({ eligible: true });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dailyBoostUsage] = useState(0);
  const [dailyBoostLimit] = useState(5);
  const [boostPackages, setBoostPackages] = useState<BoostPackage[]>([]);
  
  const boostService = new BoostService();
  
  useEffect(() => {
    if (profileId) {
      fetchBoostStatus();
      fetchBoostPackages();
      checkEligibility();
    }
  }, [profileId]);
  
  const fetchBoostStatus = async () => {
    if (!profileId) return;
    
    try {
      setLoading(true);
      const status = await boostService.getBoostStatus(profileId);
      setBoostStatus(status);
    } catch (err) {
      console.error('Error fetching boost status:', err);
      setError('Failed to fetch boost status');
    } finally {
      setLoading(false);
    }
  };
  
  const checkEligibility = async () => {
    if (!profileId) return;
    
    try {
      setLoading(true);
      const eligibilityData = await boostService.getBoostEligibility(profileId);
      setEligibility(eligibilityData);
    } catch (err) {
      console.error('Error checking eligibility:', err);
      setError('Failed to check eligibility');
    } finally {
      setLoading(false);
    }
  };

  const getBoostAnalytics = async () => {
    if (!profileId) return null;
    
    try {
      setLoading(true);
      const analytics = await boostService.getBoostAnalytics(profileId);
      setBoostAnalytics(analytics);
      return analytics;
    } catch (err) {
      console.error('Error fetching boost analytics:', err);
      setError('Failed to fetch boost analytics');
      return null;
    } finally {
      setLoading(false);
    }
  };
  
  const fetchBoostPackages = async () => {
    try {
      setLoading(true);
      const packages = await boostService.getBoostPackages();
      setBoostPackages(packages);
      return packages;
    } catch (err) {
      console.error('Error fetching boost packages:', err);
      setError('Failed to fetch boost packages');
      return [];
    } finally {
      setLoading(false);
    }
  };

  const purchaseBoost = async (pkg: BoostPackage) => {
    if (!profileId) return false;
    
    try {
      setLoading(true);
      const success = await boostService.purchaseBoost(profileId, pkg.id);
      
      if (success) {
        await fetchBoostStatus();
      }
      
      return success;
    } catch (err) {
      console.error('Error purchasing boost:', err);
      setError('Failed to purchase boost');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const cancelBoost = async () => {
    if (!profileId) return false;
    
    try {
      setLoading(true);
      const success = await boostService.cancelBoost(profileId);
      
      if (success) {
        await fetchBoostStatus();
      }
      
      return success;
    } catch (err) {
      console.error('Error cancelling boost:', err);
      setError('Failed to cancel boost');
      return false;
    } finally {
      setLoading(false);
    }
  };
  
  const formatBoostDuration = (duration: string): string => {
    // Convert duration strings like "24:00:00" to "24 hours"
    if (!duration) return '';
    
    const parts = duration.split(':');
    const hours = parseInt(parts[0]);
    const minutes = parseInt(parts[1]);
    
    if (hours > 0) {
      return hours === 1 ? '1 hour' : `${hours} hours`;
    }
    if (minutes > 0) {
      return minutes === 1 ? '1 minute' : `${minutes} minutes`;
    }
    return duration;
  };
  
  const adaptGetBoostPrice = (fn: (pkg: BoostPackage) => number) => {
    return fn;
  };

  return {
    boostStatus,
    boostAnalytics,
    eligibility,
    loading,
    error,
    boostPackages,
    dailyBoostUsage,
    dailyBoostLimit,
    getBoostAnalytics,
    fetchBoostPackages,
    purchaseBoost,
    cancelBoost,
    formatBoostDuration,
    adaptGetBoostPrice
  };
};

export default useBoostManager;
