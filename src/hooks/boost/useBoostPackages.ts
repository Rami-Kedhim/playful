
import { useState, useEffect } from 'react';
import { BoostPackage } from '@/types/boost';

const useBoostPackages = (): BoostPackage[] => {
  const [packages, setPackages] = useState<BoostPackage[]>([]);
  
  useEffect(() => {
    // Mock data for boost packages
    const mockPackages: BoostPackage[] = [
      {
        id: 'boost-1',
        name: 'Standard Boost',
        description: 'Increase your visibility for 24 hours',
        price: 50,
        price_ubx: 50,
        duration: '24:00:00',
        durationMinutes: 1440,
        features: [
          'Featured in search results',
          'Higher visibility in feeds',
          'Priority in matching algorithm'
        ],
        visibility: 'medium',
        visibility_increase: 50,
        boost_power: 50,
        color: 'blue',
        badgeColor: 'bg-blue-500'
      },
      {
        id: 'boost-2',
        name: 'Premium Boost',
        description: 'Maximum visibility for 3 days',
        price: 120,
        price_ubx: 120,
        duration: '72:00:00',
        durationMinutes: 4320,
        features: [
          'Top position in search results',
          'Featured profile highlight',
          'Maximum visibility in feeds',
          'Priority in recommendation engine'
        ],
        visibility: 'high',
        visibility_increase: 75,
        boost_power: 75,
        color: 'purple',
        badgeColor: 'bg-purple-500'
      },
      {
        id: 'boost-3',
        name: 'Economy Boost',
        description: 'Basic visibility boost for 12 hours',
        price: 25,
        price_ubx: 25,
        duration: '12:00:00',
        durationMinutes: 720,
        features: [
          'Improved search visibility',
          'Basic algorithm prioritization'
        ],
        visibility: 'low',
        visibility_increase: 25,
        boost_power: 25,
        color: 'green',
        badgeColor: 'bg-green-500'
      }
    ];
    
    setPackages(mockPackages);
  }, []);
  
  return packages;
};

export default useBoostPackages;
