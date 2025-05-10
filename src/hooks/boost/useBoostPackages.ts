
import { useState, useEffect } from 'react';
import { BoostPackage } from '@/types/pulse-boost';

// Mock data for boost packages
const mockBoostPackages: BoostPackage[] = [
  {
    id: 'basic',
    name: 'Basic Boost',
    description: 'Increase your visibility with a basic boost',
    price: 9.99,
    price_ubx: 99,
    duration: 24,
    durationMinutes: 1440,
    features: ['Higher search ranking', 'Featured in browse'],
    boostLevel: 1,
    visibility: 30,
    popularity: 'low',
    visibilityIncrease: 30
  },
  {
    id: 'standard',
    name: 'Standard Boost',
    description: 'Our most popular visibility boost package',
    price: 19.99,
    price_ubx: 199,
    duration: 72,
    durationMinutes: 4320,
    features: ['Higher search ranking', 'Featured in browse', 'Priority matching'],
    boostLevel: 2,
    visibility: 60,
    popularity: 'medium',
    isPopular: true,
    visibilityIncrease: 60
  },
  {
    id: 'premium',
    name: 'Premium Boost',
    description: 'Maximum visibility and exposure',
    price: 29.99,
    price_ubx: 299,
    duration: 168,
    durationMinutes: 10080,
    features: ['Top search ranking', 'Featured in browse', 'Priority matching', 'Homepage feature'],
    boostLevel: 3,
    visibility: 100,
    popularity: 'high',
    isMostPopular: true,
    visibilityIncrease: 100
  }
];

const useBoostPackages = () => {
  const [packages, setPackages] = useState<BoostPackage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        // In a real app, this would be an API call
        setPackages(mockBoostPackages);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching boost packages:', err);
        setError('Failed to load boost packages');
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  return { packages, loading, error };
};

export default useBoostPackages;
