
import { useState, useEffect } from 'react';
import { BoostPackage } from '@/types/pulse-boost';
import { pulseBoostService } from '@/services/boost/pulseBoostService';

export function useBoostPackages() {
  const [packages, setPackages] = useState<BoostPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setLoading(true);
        // Get packages from the service
        const boostPackages = pulseBoostService.getBoostPackages();
        setPackages(boostPackages);
        setError(null);
      } catch (err) {
        console.error('Error fetching boost packages:', err);
        setError('Failed to fetch boost packages');
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
}

export default useBoostPackages;
