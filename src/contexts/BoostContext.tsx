
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { BoostStatus, BoostPackage } from '@/types/boost';

interface BoostContextType {
  boostStatus: BoostStatus;
  packages: BoostPackage[];
  loading: boolean;
  error: string | null;
  boostProfile: (profileId: string, packageId: string) => Promise<boolean>;
  cancelBoost: () => Promise<boolean>;
}

export const BoostContext = createContext<BoostContextType | null>(null);

interface BoostProviderProps {
  children: ReactNode;
}

export const BoostProvider: React.FC<BoostProviderProps> = ({ children }) => {
  const [boostStatus, setBoostStatus] = useState<BoostStatus>({
    isActive: false,
  });
  const [packages, setPackages] = useState<BoostPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
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
      } catch (err: any) {
        setError(err.message || 'Failed to load boost data');
      } finally {
        setLoading(false);
      }
    };
    
    fetchBoostData();
  }, []);
  
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
  
  const value = {
    boostStatus,
    packages,
    loading,
    error,
    boostProfile,
    cancelBoost
  };
  
  return (
    <BoostContext.Provider value={value}>
      {children}
    </BoostContext.Provider>
  );
};
