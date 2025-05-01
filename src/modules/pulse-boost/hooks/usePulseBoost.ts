
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/auth/useAuth';
import { toast } from '@/hooks/use-toast';
import { pulseBoostService } from '../service';
import type { 
  BoostPackage, 
  BoostPurchaseRequest, 
  BoostPurchaseResult, 
  BoostAnalytics,
  BoostHistory,
  EnhancedBoostStatus
} from '@/types/pulse-boost';

export function usePulseBoost(profileId?: string) {
  const { user } = useAuth();
  const [packages, setPackages] = useState<BoostPackage[]>([]);
  const [activeBoost, setActiveBoost] = useState<EnhancedBoostStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState<BoostHistory>({
    items: []
  });
  const [analytics, setAnalytics] = useState<BoostAnalytics | null>(null);
  
  useEffect(() => {
    if (!profileId) return;
    
    fetchBoostData();
  }, [profileId]);
  
  const fetchBoostData = async () => {
    setLoading(true);
    
    try {
      // Ensure the return type matches what we expect
      const boostPackages = pulseBoostService.getBoostPackages();
      setPackages(boostPackages.map(pkg => ({
        ...pkg,
        // Convert duration from number to string if needed
        duration: typeof pkg.duration === 'number' ? String(pkg.duration) : pkg.duration,
        // Ensure boostMultiplier exists
        boostMultiplier: pkg.boostMultiplier || 1.5
      })));
      
      // Fetch active boost (mock)
      setTimeout(() => {
        // Simulate active boost (50% chance)
        if (Math.random() > 0.5) {
          const randomIndex = Math.floor(Math.random() * packages.length);
          const randomPackage = packages.length > 0 ? packages[randomIndex] : {
            id: 'default-package',
            name: 'Basic Boost',
            duration: '24:00:00',
            boostMultiplier: 1.5
          };
          
          setActiveBoost({
            isActive: true,
            packageId: randomPackage.id,
            startedAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
            expiresAt: new Date(Date.now() + 12 * 60 * 60 * 1000),
            boostMultiplier: randomPackage.boostMultiplier || 1.5,
            remainingTime: '12:00:00',
            progress: 50
          });
        } else {
          setActiveBoost({
            isActive: false
          });
        }
        
        // Simulate history
        setHistory({
          items: [
            {
              id: 'hist-1',
              packageId: 'basic',
              startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
              endDate: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
              price: 50,
              status: 'completed'
            },
            {
              id: 'hist-2',
              packageId: 'premium',
              startDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
              endDate: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000),
              price: 125,
              status: 'completed'
            }
          ]
        });
        
        // Simulate analytics
        setAnalytics({
          totalBoosts: 8,
          activeBoosts: activeBoost?.isActive ? 1 : 0,
          averageBoostScore: 78,
          boostHistory: [
            { date: new Date(), score: 85 }
          ],
          additionalViews: 523,
          engagementIncrease: 42,
          rankingPosition: 3
        });
        
        setLoading(false);
      }, 1000);
      
    } catch (error) {
      console.error('Error fetching boost data', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch boost data',
        variant: 'destructive'
      });
      setLoading(false);
    }
  };
  
  const purchaseBoost = async (packageId: string): Promise<boolean> => {
    if (!profileId || !user?.id) {
      toast({
        title: 'Error',
        description: 'You must be logged in to purchase a boost',
        variant: 'destructive'
      });
      return false;
    }
    
    setLoading(true);
    
    try {
      const result = await pulseBoostService.purchaseBoost(profileId, packageId, user.id);
      
      if (result.success) {
        toast({
          title: 'Boost Purchased',
          description: result.message || 'Your profile has been boosted!',
        });
        
        // Refresh boost data
        fetchBoostData();
        return true;
      } else {
        toast({
          title: 'Purchase Failed',
          description: result.message || 'Failed to purchase boost',
          variant: 'destructive'
        });
        return false;
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'An error occurred while purchasing boost',
        variant: 'destructive'
      });
      return false;
    } finally {
      setLoading(false);
    }
  };
  
  const cancelBoost = async (): Promise<boolean> => {
    if (!profileId || !user?.id || !activeBoost?.isActive) return false;
    
    setLoading(true);
    
    try {
      // Mock success
      await new Promise(resolve => setTimeout(resolve, 800));
      
      toast({
        title: 'Boost Cancelled',
        description: 'Your boost has been cancelled successfully'
      });
      
      setActiveBoost({
        isActive: false
      });
      
      return true;
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to cancel boost',
        variant: 'destructive'
      });
      return false;
    } finally {
      setLoading(false);
    }
  };
  
  return {
    packages,
    activeBoost,
    loading,
    history,
    analytics,
    purchaseBoost,
    cancelBoost,
    refreshData: fetchBoostData
  };
}

export default usePulseBoost;
