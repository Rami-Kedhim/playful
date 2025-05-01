
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { BoostStatus, BoostPackage, AnalyticsData, BoostEligibility, HermesStatus, BoostContextType } from '@/types/boost';

export const BoostContext = createContext<BoostContextType | null>(null);

interface BoostProviderProps {
  children: ReactNode;
}

export const BoostProvider: React.FC<BoostProviderProps> = ({ children }) => {
  const [boostStatus, setBoostStatus] = useState<BoostStatus>({
    isActive: false,
  });
  
  const [hermesStatus, setHermesStatus] = useState<HermesStatus>({
    position: 0,
    activeUsers: 0,
    estimatedVisibility: 0,
    lastUpdateTime: new Date().toISOString(),
    boostScore: 0,
    effectivenessScore: 0
  });
  
  const [eligibility, setEligibility] = useState<BoostEligibility>({
    eligible: true,
  });
  
  const [packages, setPackages] = useState<BoostPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dailyBoostUsage] = useState(0);
  const [dailyBoostLimit] = useState(3);
  
  useEffect(() => {
    const fetchBoostData = async () => {
      setLoading(true);
      try {
        // Mock data
        setPackages([
          {
            id: 'boost-1',
            name: '24 Hour Boost',
            description: 'Boost your profile for 24 hours',
            duration: '24:00:00',
            price: 29.99,
            price_ubx: 300,
            boostMultiplier: 1.5,
            features: ['Top search results', 'Featured profile'],
            isMostPopular: true
          },
          {
            id: 'boost-2',
            name: 'Weekend Boost',
            description: 'Boost your profile for the entire weekend',
            duration: '72:00:00',
            price: 69.99,
            price_ubx: 700,
            boostMultiplier: 2,
            features: ['Top search results', 'Featured profile', 'Homepage feature']
          }
        ]);
        
        setBoostStatus({
          isActive: false,
          remainingTime: '00:00:00'
        });
        
        setHermesStatus({
          position: Math.floor(Math.random() * 100),
          activeUsers: 245,
          estimatedVisibility: 65,
          lastUpdateTime: new Date().toISOString(),
          boostScore: 0,
          effectivenessScore: 0
        });
        
        setEligibility({
          eligible: true
        });
      } catch (err: any) {
        setError(err.message || 'Failed to load boost data');
      } finally {
        setLoading(false);
      }
    };
    
    fetchBoostData();
  }, []);
  
  const fetchBoostPackages = async (): Promise<BoostPackage[]> => {
    return packages;
  };
  
  const boostProfile = async (profileId: string, packageId: string): Promise<boolean> => {
    try {
      console.log(`Boosting profile ${profileId} with package ${packageId}`);
      
      // Set active boost status
      const selectedPackage = packages.find(p => p.id === packageId);
      
      if (!selectedPackage) {
        throw new Error('Selected package not found');
      }
      
      setBoostStatus({
        isActive: true,
        packageId: packageId,
        startedAt: new Date(),
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
        remainingTime: '24:00:00',
        packageName: selectedPackage.name,
        boostMultiplier: selectedPackage.boostMultiplier,
        boostPackage: selectedPackage,
        progress: 0
      });
      
      return true;
    } catch (error) {
      console.error('Failed to boost profile', error);
      return false;
    }
  };
  
  const cancelBoost = async (): Promise<boolean> => {
    try {
      console.log('Cancelling active boost');
      
      // Reset boost status
      setBoostStatus({
        isActive: false,
        remainingTime: '00:00:00'
      });
      
      return true;
    } catch (error) {
      console.error('Failed to cancel boost', error);
      return false;
    }
  };
  
  const getBoostAnalytics = async (): Promise<AnalyticsData> => {
    // Mock analytics data
    return {
      additionalViews: 145,
      engagementIncrease: 32,
      rankingPosition: 8,
      views: 300,
      impressions: {
        today: 180,
        yesterday: 150,
        weeklyAverage: 145,
        withBoost: 180,
      },
      interactions: {
        today: 45,
        yesterday: 32,
        weeklyAverage: 30,
        withBoost: 45,
      },
      rank: {
        current: 8,
        previous: 24,
        change: 16
      }
    };
  };
  
  const formatBoostDuration = (duration: string): string => {
    // Simple formatting helper
    if (!duration.includes(':')) return duration;
    
    const [hours, minutes] = duration.split(':');
    return `${hours}h ${minutes}m`;
  };
  
  const adaptGetBoostPrice = (): number => {
    // Mock price calculation
    return 299;
  };
  
  const value: BoostContextType = {
    boostStatus,
    hermesStatus,
    eligibility,
    packages,
    boostPackages: packages,
    loading,
    error,
    boostProfile,
    cancelBoost,
    getBoostAnalytics,
    fetchBoostPackages,
    dailyBoostUsage,
    dailyBoostLimit,
    formatBoostDuration,
    adaptGetBoostPrice
  };
  
  return (
    <BoostContext.Provider value={value}>
      {children}
    </BoostContext.Provider>
  );
};
