
import { useState, useEffect } from 'react';
import { BoostPackage } from '@/types/boost';

export const useBoostPackages = (): BoostPackage[] => {
  const [packages, setPackages] = useState<BoostPackage[]>([]);
  
  useEffect(() => {
    // Simulated API fetch of boost packages
    const fetchPackages = async () => {
      // Mock data
      const mockPackages: BoostPackage[] = [
        {
          id: 'basic',
          name: 'Basic Boost',
          price: 15,
          price_ubx: 150,
          description: '6-hour visibility boost',
          duration: '06:00:00',
          boost_power: 20,
          visibility_increase: 25,
          features: ['Featured in search results', 'Higher ranking'],
          boostLevel: 1
        },
        {
          id: 'standard',
          name: 'Standard Boost',
          price: 30,
          price_ubx: 300,
          description: '24-hour visibility boost',
          duration: '24:00:00',
          boost_power: 50,
          visibility_increase: 75,
          features: ['Featured in search results', 'Higher ranking', 'Featured on homepage'],
          boostLevel: 2
        },
        {
          id: 'premium',
          name: 'Premium Boost',
          price: 50,
          price_ubx: 500,
          description: '3-day visibility boost',
          duration: '72:00:00',
          boost_power: 100,
          visibility_increase: 150,
          features: ['Featured in search results', 'Higher ranking', 'Featured on homepage', 'Premium badge'],
          boostLevel: 3
        }
      ];
      
      setPackages(mockPackages);
    };
    
    fetchPackages();
  }, []);
  
  return packages;
};

export default useBoostPackages;
