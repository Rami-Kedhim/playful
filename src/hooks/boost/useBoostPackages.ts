
import { useState, useEffect } from 'react';
import { BoostPackage } from '@/types/boost';

const useBoostPackages = () => {
  const [packages, setPackages] = useState<BoostPackage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        // Simulate API call to fetch boost packages
        setTimeout(() => {
          const boostPackages: BoostPackage[] = [
            {
              id: 'boost-1',
              name: '24 Hour Boost',
              description: 'Boost your profile for 24 hours',
              duration: '24:00:00',
              price: 29.99,
              price_ubx: 300,
              boostMultiplier: 1.5,
              features: ['Top search results', 'Featured profile'],
              isMostPopular: true,
              visibility: 'high',
              visibility_increase: 50,
              boost_power: 50,
              color: '#4CAF50',
              badgeColor: '#388E3C',
              durationMinutes: 1440
            },
            {
              id: 'boost-2',
              name: 'Weekend Boost',
              description: 'Boost your profile for the entire weekend',
              duration: '72:00:00',
              price: 69.99,
              price_ubx: 700,
              boostMultiplier: 2,
              features: ['Top search results', 'Featured profile', 'Homepage feature'],
              visibility: 'premium',
              visibility_increase: 75,
              boost_power: 75,
              color: '#2196F3',
              badgeColor: '#1976D2',
              durationMinutes: 4320
            },
            {
              id: 'boost-3',
              name: 'Full Week Spotlight',
              description: 'Maximum visibility for a full week',
              duration: '168:00:00',
              price: 129.99,
              price_ubx: 1200,
              boostMultiplier: 3,
              features: ['Top of all searches', 'Featured everywhere', 'Priority matching', 'Analytics dashboard'],
              visibility: 'ultimate',
              visibility_increase: 100,
              boost_power: 100,
              color: '#9C27B0',
              badgeColor: '#7B1FA2',
              durationMinutes: 10080
            }
          ];
          
          setPackages(boostPackages);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching boost packages:', error);
        setLoading(false);
      }
    };
    
    fetchPackages();
  }, []);
  
  return { packages, loading };
};

export default useBoostPackages;
