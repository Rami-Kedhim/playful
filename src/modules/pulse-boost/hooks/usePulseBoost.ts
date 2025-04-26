
/**
 * usePulseBoost Hook
 * React hook for interacting with the Pulse Boost system
 */
import { useState, useEffect, useCallback } from 'react';
import { pulseBoostService } from '../service';
import type { 
  BoostPackage, 
  BoostPurchaseRequest,
  BoostPurchaseResult,
  BoostAnalytics,
  BoostHistory
} from '../types';
import type { EnhancedBoostStatus } from '@/types/pulse-boost';

export function usePulseBoost(profileId?: string) {
  const [boostStatus, setBoostStatus] = useState<EnhancedBoostStatus>({ isActive: false });
  const [boostPackages, setBoostPackages] = useState<BoostPackage[]>([]);
  const [analytics, setAnalytics] = useState<BoostAnalytics | null>(null);
  const [history, setHistory] = useState<BoostHistory | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch available boost packages
  const fetchPackages = useCallback(async () => {
    try {
      const packages = pulseBoostService.getBoostPackages();
      // Convert from PulseBoostPackage to BoostPackage
      const convertedPackages = packages.map(pkg => ({
        id: pkg.id,
        name: pkg.name,
        description: pkg.description,
        price: pkg.price,
        duration: typeof pkg.duration === 'number' ? `${pkg.duration}:00:00` : pkg.duration,
        features: pkg.features,
        price_ubx: pkg.price,
        durationMinutes: typeof pkg.duration === 'number' ? pkg.duration * 60 : 0,
        visibility: 'homepage',
        visibility_increase: 50
      } as unknown as BoostPackage));
      
      setBoostPackages(convertedPackages);
    } catch (err: any) {
      setError(err.message || 'Failed to load boost packages');
    }
  }, []);
  
  // Fetch boost status for a profile
  const fetchBoostStatus = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const status = await pulseBoostService.getBoostStatus(id);
      setBoostStatus(status);
    } catch (err: any) {
      setError(err.message || 'Failed to load boost status');
    } finally {
      setLoading(false);
    }
  }, []);
  
  // Fetch analytics for a profile
  const fetchAnalytics = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await pulseBoostService.getBoostAnalytics(id);
      setAnalytics(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load analytics');
    } finally {
      setLoading(false);
    }
  }, []);
  
  // Fetch boost history for a profile
  const fetchHistory = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await pulseBoostService.getBoostHistory(id);
      setHistory(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load boost history');
    } finally {
      setLoading(false);
    }
  }, []);
  
  // Purchase a boost - Fix the parameter structure to match service
  const purchaseBoost = async (request: BoostPurchaseRequest): Promise<BoostPurchaseResult> => {
    setLoading(true);
    setError(null);
    
    try {
      // Fix: Pass userId and packageId as required by the service method
      const result = await pulseBoostService.purchaseBoost(
        request.profileId, 
        request.packageId
      );
      
      if (result.success && profileId === request.profileId) {
        // Refresh boost status if successful
        fetchBoostStatus(profileId);
      } else if (!result.success) {
        // Check for error message from the response
        setError(result.error || result.message || 'Purchase failed');
      }
      
      // Convert to expected return type
      return {
        success: result.success,
        boostId: result.transactionId,
        error: result.error || result.message
      };
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to purchase boost';
      setError(errorMessage);
      
      return {
        success: false,
        error: errorMessage
      };
    } finally {
      setLoading(false);
    }
  };
  
  // Cancel a boost - fix method call
  const cancelBoost = async (boostId: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await pulseBoostService.cancelBoost(boostId);
      
      if (result && profileId) {
        // Refresh boost status if successful
        fetchBoostStatus(profileId);
      }
      
      return result;
    } catch (err: any) {
      setError(err.message || 'Failed to cancel boost');
      return false;
    } finally {
      setLoading(false);
    }
  };
  
  // Load initial data
  useEffect(() => {
    fetchPackages();
    
    if (profileId) {
      fetchBoostStatus(profileId);
      fetchAnalytics(profileId);
      fetchHistory(profileId);
    }
  }, [profileId, fetchPackages, fetchBoostStatus, fetchAnalytics, fetchHistory]);
  
  return {
    boostStatus,
    boostPackages,
    analytics,
    history,
    loading,
    error,
    fetchBoostStatus,
    fetchAnalytics,
    fetchHistory,
    purchaseBoost,
    cancelBoost
  };
}

export default usePulseBoost;
