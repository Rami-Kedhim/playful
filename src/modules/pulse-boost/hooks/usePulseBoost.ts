
import { useState, useEffect, useCallback } from 'react';
import { pulseService } from '@/services/boost/pulseService';
import { BoostPackage, EnhancedBoostStatus } from '@/types/pulse-boost';
import { useToast } from '@/components/ui/use-toast';

export const usePulseBoost = (userId: string) => {
  const [packages, setPackages] = useState<BoostPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [optimalPackage, setOptimalPackage] = useState<string | null>(null);
  const [optimizationReason, setOptimizationReason] = useState<string | null>(null);
  const { toast } = useToast();

  const [boostStatus, setBoostStatus] = useState<EnhancedBoostStatus>(() => ({
    active: false,
    remainingMinutes: 0,
    percentRemaining: 0,
    expiresAt: null,
    startedAt: null,
  }));

  // Fetch packages and status
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [packagesData, statusData] = await Promise.all([
          pulseService.getBoostPackages(),
          pulseService.getBoostStatus(userId)
        ]);

        setPackages(packagesData);
        setBoostStatus(statusData);

        // Get optimal package recommendation
        const userData = {
          visibilityNeed: 7,
          budget: 200,
          urgency: 5
        };

        const optimal = await pulseService.calculateOptimalBoost(userData);
        setOptimalPackage(optimal.packageId);
        setOptimizationReason(optimal.reason);
      } catch (error) {
        console.error('Error fetching boost data:', error);
        toast({
          title: 'Error',
          description: 'Failed to load boost data. Please try again.',
          variant: 'destructive'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId, toast]);

  const getPackageById = useCallback((packageId: string) => {
    return packages.find(p => p.id === packageId) || null;
  }, [packages]);

  const purchaseBoost = useCallback(async (packageId: string) => {
    if (!packageId) return false;

    setPurchasing(true);
    try {
      const result = await pulseService.purchaseBoost(packageId, userId);

      if (result.success) {
        const selectedPkg = getPackageById(packageId);
        toast({
          title: 'Boost Activated',
          description: `Your ${selectedPkg?.name} is now active!`,
        });

        // Update status
        const newStatus = await pulseService.getBoostStatus(userId);
        setBoostStatus(newStatus);

        return true;
      } else {
        toast({
          title: 'Purchase Failed',
          description: result.error || 'Failed to purchase boost.',
          variant: 'destructive'
        });
        return false;
      }
    } catch (error) {
      console.error('Error purchasing boost:', error);
      toast({
        title: 'Error',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'destructive'
      });
      return false;
    } finally {
      setPurchasing(false);
    }
  }, [userId, getPackageById, toast]);

  const refreshStatus = useCallback(async () => {
    try {
      const status = await pulseService.getBoostStatus(userId);
      setBoostStatus(status);
    } catch (error) {
      console.error('Error refreshing boost status:', error);
    }
  }, [userId]);

  return {
    packages,
    boostStatus,
    loading,
    purchasing,
    selectedPackage,
    setSelectedPackage,
    optimalPackage,
    optimizationReason,
    getPackageById,
    purchaseBoost,
    refreshStatus
  };
};

export default usePulseBoost;
