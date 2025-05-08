
import { useState, useEffect, useCallback } from 'react';
import { EnhancedBoostStatus, BoostPackage } from '@/types/pulse-boost';
import { pulseService } from '@/services/boost/pulseService';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/hooks/auth';

export const usePulseBoost = (profileId?: string) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [boostPackages, setBoostPackages] = useState<BoostPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [boostStatus, setBoostStatus] = useState<EnhancedBoostStatus>({
    active: false,
    isActive: false,
    remainingMinutes: 0,
    timeRemaining: 0,
    percentRemaining: 0,
    expiresAt: null,
    startedAt: null,
    isExpired: false
  });
  
  const userId = profileId || user?.id;
  
  // Load packages and boost status
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Get packages
        const packages = pulseService.getPackages();
        setBoostPackages(packages);
        
        if (userId) {
          // Get existing boost purchase
          const boostPurchase = pulseService.getMockBoostPurchase(userId);
          
          if (boostPurchase) {
            const selectedPackage = packages.find(p => p.id === boostPurchase.packageId);
            const status = pulseService.calculateBoostStatus(
              boostPurchase.startTime, 
              selectedPackage?.durationMinutes
            );
            setBoostStatus(status);
          } else {
            // No active boost
            setBoostStatus({
              active: false,
              isActive: false,
              remainingMinutes: 0,
              timeRemaining: 0,
              percentRemaining: 0,
              expiresAt: null,
              startedAt: null,
              isExpired: true
            });
          }
        }
      } catch (error) {
        console.error('Error loading boost data:', error);
        toast({
          title: 'Error',
          description: 'Failed to load boost information',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [userId, toast]);
  
  // Activate a boost package
  const activateBoost = useCallback(async (packageId: string): Promise<boolean> => {
    if (!userId) {
      toast({
        title: 'Authentication Required',
        description: 'Please log in to activate a boost',
        variant: 'destructive',
      });
      return false;
    }
    
    setLoading(true);
    try {
      // Find the selected package
      const selectedPackage = boostPackages.find(p => p.id === packageId);
      
      if (!selectedPackage) {
        throw new Error('Invalid package selected');
      }
      
      // Simulate successful activation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const now = new Date();
      
      // Update boost status
      setBoostStatus({
        active: true,
        isActive: true,
        remainingMinutes: selectedPackage.durationMinutes,
        timeRemaining: selectedPackage.durationMinutes,
        percentRemaining: 100,
        expiresAt: new Date(now.getTime() + selectedPackage.durationMinutes * 60 * 1000).toISOString(),
        startedAt: now.toISOString(),
        isExpired: false
      });
      
      toast({
        title: 'Boost Activated',
        description: `${selectedPackage.name} has been successfully activated!`,
      });
      
      return true;
    } catch (error) {
      console.error('Error activating boost:', error);
      toast({
        title: 'Activation Failed',
        description: 'Failed to activate boost. Please try again.',
        variant: 'destructive',
      });
      return false;
    } finally {
      setLoading(false);
    }
  }, [userId, boostPackages, toast]);
  
  return {
    boostPackages,
    boostStatus,
    loading,
    activateBoost
  };
};

export default usePulseBoost;
