
import { useState, useEffect } from 'react';
import { BoostStatus, BoostEligibility, BoostPackage, HermesBoostStatus } from '@/types/boost';

interface RawBoostData {
  isActive?: boolean;
  packageId?: string;
  packageName?: string;
  expiresAt?: string;
  startTime?: string;
  endTime?: string;
  progress?: number;
}

export const useBoostAdapters = (profileId: string) => {
  const [boostStatus, setBoostStatus] = useState<RawBoostData | null>(null);
  const [eligibility, setEligibility] = useState<BoostEligibility | null>(null);
  const [boostPackages, setBoostPackages] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [dailyBoostUsage, setDailyBoostUsage] = useState<number>(0);
  const [dailyBoostLimit, setDailyBoostLimit] = useState<number>(5);

  useEffect(() => {
    if (!profileId) return;

    const fetchBoostData = async () => {
      try {
        setLoading(true);
        
        // Mock data for testing
        const mockStatus = {
          isActive: Math.random() > 0.7,
          packageName: 'Premium Boost',
          expiresAt: new Date(Date.now() + 3600000 * 24).toISOString(),
          startTime: new Date(Date.now() - 3600000).toISOString(),
          endTime: new Date(Date.now() + 3600000 * 24).toISOString(),
          progress: 22,
        };
        
        const mockEligibility = {
          isEligible: true,
          reason: undefined
        };
        
        const mockPackages = [
          {
            id: 'basic',
            name: 'Basic Boost',
            description: '24 hour visibility boost',
            duration: '24:00:00',
            price: 10,
            price_ubx: 100,
            boost_power: 1,
            visibility_increase: 25,
            image_url: '',
            is_featured: false,
            badge_color: 'blue',
            icon: 'zap',
            features: ['24-hour duration', 'Basic visibility increase']
          },
          {
            id: 'premium',
            name: 'Premium Boost',
            description: '3 day visibility boost with priority placement',
            duration: '72:00:00',
            price: 25,
            price_ubx: 250,
            boost_power: 2,
            visibility_increase: 50,
            image_url: '',
            is_featured: true,
            badge_color: 'purple',
            icon: 'star',
            features: ['3-day duration', 'Homepage feature', '50% visibility increase']
          },
          {
            id: 'ultimate',
            name: 'Ultimate Boost',
            description: '7 day max visibility with spotlight feature',
            duration: '168:00:00',
            price: 50,
            price_ubx: 500,
            boost_power: 3,
            visibility_increase: 100,
            image_url: '',
            is_featured: true,
            badge_color: 'gold',
            icon: 'crown',
            features: ['7-day duration', 'Featured section placement', 'Top search results']
          }
        ];
        
        setBoostStatus(mockStatus);
        setEligibility(mockEligibility);
        setBoostPackages(mockPackages);
        setDailyBoostUsage(Math.floor(Math.random() * 3));
        setDailyBoostLimit(5);
        
        setLoading(false);
      } catch (err) {
        console.error("Error fetching boost data:", err);
        setError("Failed to load boost data");
        setLoading(false);
      }
    };
    
    fetchBoostData();
  }, [profileId]);
  
  // Adapter functions to convert data formats
  const adaptBoostStatus = (rawStatus: RawBoostData | null): BoostStatus => {
    if (!rawStatus) return { isActive: false };
    
    return {
      isActive: rawStatus.isActive || false,
      timeRemaining: rawStatus.expiresAt ? getTimeRemaining(new Date(rawStatus.expiresAt)) : undefined,
      expiresAt: rawStatus.expiresAt,
      packageName: rawStatus.packageName,
      startTime: rawStatus.startTime,
      endTime: rawStatus.endTime,
      progress: rawStatus.progress
    };
  };
  
  const adaptBoostEligibility = (rawEligibility: BoostEligibility | null): BoostEligibility => {
    if (!rawEligibility) return { isEligible: false, reason: "Unknown eligibility status" };
    
    return {
      isEligible: rawEligibility.isEligible,
      reason: rawEligibility.reason
    };
  };
  
  const adaptBoostPackages = (rawPackages: any[] | null): BoostPackage[] => {
    if (!rawPackages || rawPackages.length === 0) return [];
    
    return rawPackages.map(pkg => ({
      id: pkg.id,
      name: pkg.name,
      description: pkg.description,
      price: pkg.price,
      duration: pkg.duration,
      features: pkg.features,
      boostLevel: pkg.boost_power || 1,
      color: pkg.badge_color,
      price_ubx: pkg.price_ubx,
      is_featured: pkg.is_featured,
      boost_power: pkg.boost_power,
      visibility_increase: pkg.visibility_increase
    }));
  };
  
  const getTimeRemaining = (expiryDate: Date): string => {
    const diffMs = expiryDate.getTime() - Date.now();
    if (diffMs <= 0) return "Expired";
    
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${diffHrs}h ${diffMins}m`;
  };
  
  // Purchase boost function
  const purchaseBoost = async (pkg: BoostPackage): Promise<boolean> => {
    try {
      setLoading(true);
      
      // Mock purchase logic
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update boost status
      setBoostStatus({
        isActive: true,
        packageName: pkg.name,
        expiresAt: calculateExpiryDate(pkg.duration),
        startTime: new Date().toISOString(),
        endTime: calculateExpiryDate(pkg.duration),
        progress: 0
      });
      
      // Update daily usage
      setDailyBoostUsage(prev => prev + 1);
      
      setLoading(false);
      return true;
    } catch (err) {
      console.error("Error purchasing boost:", err);
      setError("Failed to purchase boost");
      setLoading(false);
      return false;
    }
  };
  
  // Cancel boost function
  const cancelBoost = async (): Promise<boolean> => {
    try {
      setLoading(true);
      
      // Mock cancel logic
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update boost status
      setBoostStatus({
        isActive: false
      });
      
      setLoading(false);
      return true;
    } catch (err) {
      console.error("Error cancelling boost:", err);
      setError("Failed to cancel boost");
      setLoading(false);
      return false;
    }
  };
  
  // Format boost duration
  const formatBoostDuration = (duration: string): string => {
    const [hours, minutes] = duration.split(':').map(Number);
    
    if (hours >= 24) {
      const days = Math.floor(hours / 24);
      return `${days} ${days === 1 ? 'day' : 'days'}`;
    }
    
    return `${hours} ${hours === 1 ? 'hour' : 'hours'}`;
  };
  
  // Calculate expiry date from duration
  const calculateExpiryDate = (duration: string): string => {
    const [hours, minutes, seconds] = duration.split(':').map(Number);
    const expiryDate = new Date();
    expiryDate.setHours(expiryDate.getHours() + hours);
    expiryDate.setMinutes(expiryDate.getMinutes() + minutes);
    expiryDate.setSeconds(expiryDate.getSeconds() + seconds);
    
    return expiryDate.toISOString();
  };
  
  // Get boost analytics
  const getBoostAnalytics = async (): Promise<any> => {
    try {
      // Mock analytics data
      await new Promise(resolve => setTimeout(resolve, 800));
      
      return {
        viewsIncrease: Math.floor(Math.random() * 40) + 10,
        engagementRate: (Math.random() * 0.2 + 0.1).toFixed(2),
        rankingPosition: Math.floor(Math.random() * 10) + 1,
        conversionIncrease: (Math.random() * 30 + 5).toFixed(1)
      };
    } catch (err) {
      console.error("Error getting analytics:", err);
      return null;
    }
  };

  // Function to get a realistic price for a boost package
  const adaptGetBoostPrice = (selectedPackageId?: string): number => {
    if (!selectedPackageId) return 0;
    
    const selectedPackage = boostPackages.find(pkg => pkg.id === selectedPackageId);
    if (!selectedPackage) return 0;
    
    return selectedPackage.price_ubx || 100;
  };
  
  // Fetch boost packages
  const fetchBoostPackages = async (): Promise<void> => {
    try {
      setLoading(true);
      
      // Mock fetch logic - already handled in useEffect
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setLoading(false);
    } catch (err) {
      console.error("Error fetching packages:", err);
      setError("Failed to load packages");
      setLoading(false);
    }
  };

  // Function to produce format boost duration for display
  const adaptFormatBoostDuration = (duration: string): string => {
    return formatBoostDuration(duration);
  };

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
