
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { BoostPackage } from '@/types/boost';

export interface BoostContextType {
  isActive: boolean;
  packages: BoostPackage[];
  boostProfile: (profileId: string, packageId: string) => Promise<boolean>;
  loading: boolean;
  error: string | null;
  boostStatus: {
    isActive: boolean;
    expiresAt?: string;
  } | null;
  dailyBoostUsage?: number;
  dailyBoostLimit?: number;
  cancelBoost?: () => Promise<boolean>;
}

const defaultValue: BoostContextType = {
  isActive: false,
  packages: [],
  boostProfile: async () => false,
  loading: false,
  error: null,
  boostStatus: null,
  dailyBoostUsage: 0,
  dailyBoostLimit: 5,
  cancelBoost: async () => false
};

export const BoostContext = createContext<BoostContextType>(defaultValue);

interface BoostProviderProps {
  children: ReactNode;
}

export const BoostProvider: React.FC<BoostProviderProps> = ({ children }) => {
  const [isActive, setIsActive] = useState(false);
  const [packages, setPackages] = useState<BoostPackage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [boostStatus, setBoostStatus] = useState<{ isActive: boolean; expiresAt?: string } | null>(null);
  const [dailyBoostUsage, setDailyBoostUsage] = useState(0);
  const [dailyBoostLimit, setDailyBoostLimit] = useState(5);

  useEffect(() => {
    // Fetch boost packages
    const fetchPackages = async () => {
      setLoading(true);
      try {
        // Mock data for demo purposes
        const mockPackages: BoostPackage[] = [
          {
            id: "1",
            name: "1 Hour Boost",
            description: "Increase your profile visibility for 1 hour",
            price: 5,
            price_ubx: 50,
            duration: "1:00:00",
            features: ["Top of search results", "Featured badge"]
          },
          {
            id: "2",
            name: "24 Hour Boost",
            description: "Increase your profile visibility for 24 hours",
            price: 20,
            price_ubx: 200,
            duration: "24:00:00",
            features: ["Top of search results", "Featured badge", "Homepage feature"]
          },
          {
            id: "3",
            name: "7 Day Boost",
            description: "Increase your profile visibility for 7 days",
            price: 100,
            price_ubx: 1000,
            duration: "168:00:00",
            features: ["Top of search results", "Featured badge", "Homepage feature", "Priority notifications"]
          }
        ];
        
        setPackages(mockPackages);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching boost packages:', err);
        setError('Failed to fetch boost packages');
        setLoading(false);
      }
    };

    fetchPackages();

    // Check if profile is currently boosted
    const checkBoostStatus = async () => {
      // Mock boost status for now
      const mockStatus = {
        isActive: Math.random() > 0.5,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
      };
      
      setBoostStatus(mockStatus);
      setIsActive(mockStatus.isActive);
    };
    
    checkBoostStatus();
  }, []);

  const boostProfile = async (profileId: string, packageId: string): Promise<boolean> => {
    setLoading(true);
    try {
      // Mock successful boost
      console.log(`Boosting profile ${profileId} with package ${packageId}`);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const selectedPackage = packages.find(pkg => pkg.id === packageId);
      
      if (!selectedPackage) {
        throw new Error('Invalid package selection');
      }
      
      // Set boost as active with expiry based on package duration
      const now = new Date();
      const durationParts = selectedPackage.duration.split(':').map(Number);
      const hours = durationParts[0] || 0;
      const minutes = durationParts[1] || 0;
      
      const expiryDate = new Date(now.getTime() + (hours * 60 * 60 * 1000) + (minutes * 60 * 1000));
      
      const newBoostStatus = {
        isActive: true,
        expiresAt: expiryDate.toISOString()
      };
      
      setBoostStatus(newBoostStatus);
      setIsActive(true);
      setLoading(false);
      setDailyBoostUsage(prev => prev + 1);
      
      return true;
    } catch (err: any) {
      console.error('Error boosting profile:', err);
      setError(err.message || 'Failed to boost profile');
      setLoading(false);
      return false;
    }
  };

  const cancelBoost = async (): Promise<boolean> => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setBoostStatus({
        isActive: false
      });
      setIsActive(false);
      setLoading(false);
      return true;
    } catch (err: any) {
      console.error('Error cancelling boost:', err);
      setError(err.message || 'Failed to cancel boost');
      setLoading(false);
      return false;
    }
  };

  return (
    <BoostContext.Provider value={{ 
      isActive, 
      packages, 
      boostProfile, 
      loading, 
      error, 
      boostStatus, 
      dailyBoostUsage,
      dailyBoostLimit,
      cancelBoost
    }}>
      {children}
    </BoostContext.Provider>
  );
};

export const useBoost = () => useContext(BoostContext);
