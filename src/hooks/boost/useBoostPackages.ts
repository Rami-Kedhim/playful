
import { useState, useEffect } from 'react';
import { BoostPackage } from '@/types/pulse-boost';

export function useBoostPackages() {
  const [packages, setPackages] = useState<BoostPackage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchPackages = async () => {
      setLoading(true);
      
      try {
        // Mock API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock data
        const mockPackages: BoostPackage[] = [
          {
            id: 'basic',
            name: 'Basic Boost',
            description: 'Get a small visibility boost for 24 hours',
            price: 5,
            price_ubx: 50,
            duration: '24h',
            durationMinutes: 24 * 60,
            features: ['Improved Search Position', 'Featured Label'],
            visibility: 'medium',
            visibility_increase: 50,
            color: 'blue',
            badgeColor: 'blue'
          },
          {
            id: 'premium',
            name: 'Premium Boost',
            description: 'Get a significant visibility boost for 3 days',
            price: 15,
            price_ubx: 150,
            duration: '3d',
            durationMinutes: 3 * 24 * 60,
            features: ['High Search Position', 'Featured Label', 'Homepage Spotlight'],
            visibility: 'high',
            visibility_increase: 150,
            color: 'purple',
            badgeColor: 'purple',
            isMostPopular: true
          }
        ];
        
        setPackages(mockPackages);
        setError(null);
      } catch (error) {
        console.error('Error fetching boost packages:', error);
        setError('Failed to fetch boost packages');
      } finally {
        setLoading(false);
      }
    };
    
    fetchPackages();
  }, []);
  
  return { packages, loading, error };
}

export default useBoostPackages;
