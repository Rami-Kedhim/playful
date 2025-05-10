
import { useState, useEffect } from 'react';
import { BoostPackage } from '@/types/pulse-boost';

const mockPackages: BoostPackage[] = [
  {
    id: 'boost-1',
    name: 'Basic Boost',
    description: 'Essential visibility boost for your profile',
    price: 9.99,
    price_ubx: 999,
    duration: 24,
    durationMinutes: 24 * 60,
    features: ['Increased visibility', 'Profile highlighting', 'Higher search ranking'],
    boostLevel: 1,
    visibility: 25,
    popularity: 'medium',
    visibilityIncrease: 25,
    packageName: 'Basic Boost'
  },
  {
    id: 'boost-2',
    name: 'Premium Boost',
    description: 'Enhanced visibility for maximum exposure',
    price: 19.99,
    price_ubx: 1999,
    duration: 72,
    durationMinutes: 72 * 60,
    features: ['Top search results', 'Featured profile', 'Extended boost duration', 'Analytics insights'],
    boostLevel: 2,
    visibility: 50,
    popularity: 'high',
    isPopular: true,
    isMostPopular: true,
    badgeColor: 'bg-gradient-to-r from-pink-500 to-purple-500',
    visibilityIncrease: 50,
    packageName: 'Premium Boost'
  },
  {
    id: 'boost-3',
    name: 'Ultra Boost',
    description: 'Maximum visibility for serious professionals',
    price: 29.99,
    price_ubx: 2999,
    duration: 168,
    durationMinutes: 168 * 60,
    features: ['Priority placement', 'Spotlight feature', 'Week-long boost', 'Enhanced profile badge', 'Premium analytics'],
    boostLevel: 3,
    visibility: 75,
    popularity: 'low',
    visibilityIncrease: 75,
    packageName: 'Ultra Boost'
  }
];

const useBoostPackages = () => {
  const [packages, setPackages] = useState<BoostPackage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setLoading(true);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setPackages(mockPackages);
        setError(null);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch boost packages');
        console.error('Error fetching boost packages:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  return {
    packages,
    loading,
    error
  };
};

export default useBoostPackages;
