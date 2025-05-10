
import { useState } from 'react';

export type BoostPackage = {
  id: string;
  name: string;
  description?: string;
  duration: string;
  price: number;
  price_ubx?: number;
  features?: string[];
  level?: number;
};

export interface BoostState {
  isActive: boolean;
  packages: BoostPackage[];
  boostProfile: (profileId: string, packageId: string) => Promise<boolean>;
  isLoading: boolean;
  error: string | null;
}

export const useBoost = (): BoostState => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isActive, setIsActive] = useState(false);
  
  // Mock boost packages
  const packages: BoostPackage[] = [
    {
      id: 'boost-basic',
      name: 'Basic Boost',
      description: 'Increase visibility for 1 day',
      duration: '24 hours',
      price: 9.99,
      price_ubx: 15,
      features: ['Featured in search results', '50% more profile views'],
      level: 1
    },
    {
      id: 'boost-standard',
      name: 'Standard Boost',
      description: 'Boost your profile for a full week',
      duration: '7 days',
      price: 29.99,
      price_ubx: 45,
      features: ['Featured in search results', '100% more profile views', 'Highlighted profile badge'],
      level: 2
    },
    {
      id: 'boost-premium',
      name: 'Premium Boost',
      description: 'Maximum visibility for 30 days',
      duration: '30 days',
      price: 89.99,
      price_ubx: 135,
      features: ['Top search placement', '250% more profile views', 'Featured on homepage', 'Priority in recommendations'],
      level: 3
    }
  ];
  
  const boostProfile = async (profileId: string, packageId: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, this would make an API call
      console.log(`Boosting profile ${profileId} with package ${packageId}`);
      
      // Mock successful boost after a short delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsActive(true);
      return true;
    } catch (err: any) {
      setError(err.message || 'Failed to boost profile');
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    isActive,
    packages,
    boostProfile,
    isLoading,
    error
  };
};
