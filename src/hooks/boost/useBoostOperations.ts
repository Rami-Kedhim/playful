
import { useEffect, useState } from 'react';
import { useBoostStatus } from './useBoostStatus';
import { useBoostPackages } from './useBoostPackages';
import { BoostStatus, BoostPackage } from '@/types/pulse-boost';

export function useBoostOperations(profileId?: string) {
  const { boostStatus, loading: statusLoading, error: statusError, applyBoost, fetchBoostStatus } = useBoostStatus(profileId);
  const { packages, loading: packagesLoading, error: packagesError } = useBoostPackages();
  
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Set default package when packages are loaded
  useEffect(() => {
    if (packages.length > 0 && !selectedPackage) {
      setSelectedPackage(packages[0].id);
    }
  }, [packages, selectedPackage]);

  // Mock boost eligibility
  const boostEligibility = {
    eligible: true,
    reason: '',
    reasons: [],
    nextEligibleTime: new Date(Date.now() + 24 * 60 * 60 * 1000)
  };

  // Mock hermes metrics
  const hermesMetrics = {
    score: 85,
    position: 12,
    estimatedVisibility: 65,
    lastUpdateTime: new Date().toISOString()
  };

  // Get price for selected package
  const getBoostPrice = (): number => {
    const pkg = packages.find(p => p.id === selectedPackage);
    return pkg?.price_ubx || 0;
  };

  // Function to activate boost
  const activateBoost = async (packageId: string): Promise<boolean> => {
    if (!profileId) return false;
    setIsSubmitting(true);
    
    try {
      const result = await applyBoost(packageId);
      if (result) {
        await fetchBoostStatus();
      }
      return result;
    } catch (error) {
      console.error("Error activating boost:", error);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  // Wrapper for compatibility with older code
  const boostProfile = async (profileId: string, packageId: string): Promise<boolean> => {
    return activateBoost(packageId);
  };

  // Function to cancel boost
  const cancelBoost = async (): Promise<boolean> => {
    setIsSubmitting(true);
    
    try {
      // Mock cancellation
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Reset status
      await fetchBoostStatus();
      
      return true;
    } catch (error) {
      console.error("Error cancelling boost:", error);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    boostStatus,
    loading: statusLoading || packagesLoading || isSubmitting,
    error: statusError || packagesError,
    activateBoost,
    cancelBoost,
    // Add properties needed by CreatorBoostTab
    boostEligibility,
    boostPackages: packages,
    getBoostPrice,
    hermesMetrics,
    boostProfile
  };
}
