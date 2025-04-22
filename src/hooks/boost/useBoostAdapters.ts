
import { useState, useCallback } from 'react';
import { BoostPackage, BoostStatus, BoostEligibility, BoostAnalytics } from '@/types/boost';

export const useBoostAdapters = (profileId: string) => {
  // Mock data and states
  const [boostStatus, setBoostStatus] = useState<any>({
    isActive: false,
    startTime: '',
    endTime: '',
    remainingTime: '',
  });
  
  const [eligibility, setEligibility] = useState<any>({
    isEligible: true,
    reason: ''
  });
  
  const [boostPackages, setBoostPackages] = useState<any[]>([
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
    }
  ]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dailyBoostUsage] = useState(0);
  const [dailyBoostLimit] = useState(3);
  
  // Adapter functions to convert from raw data to the expected types
  const adaptBoostStatus = useCallback((raw: any): BoostStatus => {
    if (!raw) return {
      isActive: false,
      startTime: '',
      endTime: '',
      remainingTime: '',
    };

    return {
      isActive: raw.isActive || false,
      startTime: raw.startTime || '',
      endTime: raw.endTime || '',
      remainingTime: raw.remainingTime || '',
      progress: raw.progress,
      packageId: raw.packageId,
      packageName: raw.packageName,
      profileId: raw.profileId,
      timeRemaining: raw.timeRemaining,
      activeBoostId: raw.activeBoostId,
      expiresAt: raw.expiresAt,
      boostPackage: raw.boostPackage,
      pulseData: raw.pulseData,
    };
  }, []);

  const adaptBoostEligibility = useCallback((raw: any): BoostEligibility => {
    if (!raw) return {
      isEligible: false,
      reason: 'Unknown',
    };

    return {
      isEligible: raw.isEligible || false,
      reason: raw.reason || '',
    };
  }, []);

  const adaptBoostPackages = useCallback((raw: any[]): BoostPackage[] => {
    if (!raw || !Array.isArray(raw)) return [];

    return raw.map(pkg => ({
      id: pkg.id || '',
      name: pkg.name || '',
      description: pkg.description || '',
      duration: pkg.duration || '',
      price: pkg.price || 0,
      price_ubx: pkg.price_ubx || 0,
      boost_power: pkg.boost_power || 0,
      visibility_increase: pkg.visibility_increase || 0,
      image_url: pkg.image_url,
      is_featured: pkg.is_featured,
      badge_color: pkg.badge_color,
      icon: pkg.icon,
      features: pkg.features || [],
    }));
  }, []);

  // Function to format boost duration based on the given duration string
  const formatBoostDuration = useCallback((duration: string): string => {
    const [hours, minutes] = duration.split(':').map(Number);
    if (isNaN(hours) || isNaN(minutes)) return 'Invalid duration';
    
    return hours >= 24 ? 
      `${Math.floor(hours / 24)} days` : 
      `${hours} hours`;
  }, []);

  // Function to adapt a formatter function for boost durations
  const adaptFormatBoostDuration = useCallback((formatter: (duration: string) => string) => {
    return (duration: string): string => {
      try {
        return formatter(duration);
      } catch (error) {
        console.error('Error formatting boost duration:', error);
        return 'Unknown duration';
      }
    };
  }, []);

  // Function to adapt a price getter function
  const adaptGetBoostPrice = useCallback((fn: (pkg: BoostPackage) => number) => {
    return (pkg: BoostPackage): number => {
      try {
        return fn(pkg);
      } catch (error) {
        console.error('Error getting boost price:', error);
        return 0;
      }
    };
  }, []);

  // Function to purchase a boost package
  const purchaseBoost = useCallback(async (pkg: BoostPackage): Promise<boolean> => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Update boost status
      setBoostStatus({
        isActive: true,
        startTime: new Date().toISOString(),
        endTime: new Date(Date.now() + (parseInt(pkg.duration.split(':')[0]) * 60 * 60 * 1000)).toISOString(),
        remainingTime: pkg.duration,
        packageId: pkg.id,
        packageName: pkg.name,
        profileId: profileId,
      });

      return true;
    } catch (err: any) {
      setError(err.message || 'Failed to purchase boost');
      return false;
    } finally {
      setLoading(false);
    }
  }, [profileId]);

  // Function to cancel an active boost
  const cancelBoost = useCallback(async (): Promise<boolean> => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Reset boost status
      setBoostStatus({
        isActive: false,
        startTime: '',
        endTime: '',
        remainingTime: '',
        packageId: '',
        packageName: '',
        profileId: profileId,
      });

      return true;
    } catch (err: any) {
      setError(err.message || 'Failed to cancel boost');
      return false;
    } finally {
      setLoading(false);
    }
  }, [profileId]);

  // Function to get boost analytics
  const getBoostAnalytics = useCallback(async (): Promise<BoostAnalytics | null> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));

      return {
        impressions: {
          today: 120,
          yesterday: 98,
          weeklyAverage: 105,
          withBoost: 150,
          withoutBoost: 80,
          increase: 87.5,
        },
        interactions: {
          today: 42,
          yesterday: 35,
          weeklyAverage: 38,
          withBoost: 55,
          withoutBoost: 30,
          increase: 83.3,
        },
        rank: {
          current: 12,
          previous: 24,
          change: 12,
        },
        trending: true,
        additionalViews: 70,
        engagementIncrease: 25,
        rankingPosition: 12,
        viewsIncrease: 87.5,
        engagementRate: 0.35,
        clicks: {
          today: 15,
          yesterday: 12,
          weeklyAverage: 13,
          withBoost: 20,
          withoutBoost: 10,
          increase: 100,
        },
      };
    } catch (err) {
      console.error('Error getting boost analytics:', err);
      return null;
    }
  }, []);

  // Function to fetch boost packages
  const fetchBoostPackages = useCallback(async (): Promise<BoostPackage[]> => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      return boostPackages;
    } catch (err: any) {
      setError(err.message || 'Failed to fetch boost packages');
      return [];
    } finally {
      setLoading(false);
    }
  }, [boostPackages]);

  return {
    boostStatus,
    eligibility,
    boostPackages,
    dailyBoostUsage,
    dailyBoostLimit,
    loading,
    error,
    purchaseBoost,
    cancelBoost,
    adaptBoostStatus,
    adaptBoostEligibility,
    adaptBoostPackages,
    formatBoostDuration,
    adaptFormatBoostDuration,
    getBoostAnalytics,
    fetchBoostPackages,
    adaptGetBoostPrice
  };
};
