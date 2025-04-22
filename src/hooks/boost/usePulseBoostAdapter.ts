
import { useEffect, useState } from 'react';
import { usePulseBoost } from './usePulseBoost';
import { PULSE_BOOSTS } from '@/constants/pulseBoostConfig';
import { BoostPackage, PulseBoost } from '@/types/boost';
import { toast } from '@/hooks/use-toast';

// Default global UBX rate if not imported
const GLOBAL_UBX_RATE = 15;

export interface UsePulseBoostAdapterReturn {
  boostStatus: any;
  eligibility: { eligible: boolean; reason?: string };
  boostPackages: any[];
  selectedPackage: any | null;
  setSelectedPackage: (pkg: any) => void;
  fetchBoostPackages: () => void;
  getBoostPrice: () => number;
  purchaseBoost: (pkg: any) => Promise<boolean>;
  cancelBoost: () => Promise<boolean>;
  loading: boolean;
  error: string | null;
  getBoostAnalytics: () => Promise<any>;
  dailyBoostUsage: number;
  dailyBoostLimit: number;
}

/**
 * Adapter hook that provides the legacy boost API but uses the new Pulse Boost system
 */
export const usePulseBoostAdapter = (profileId?: string): UsePulseBoostAdapterReturn => {
  const [selectedPackage, setSelectedPackage] = useState<any | null>(null);
  const [dailyBoostUsage, setDailyBoostUsage] = useState(0);
  const [dailyBoostLimit] = useState(4); // Hard-coded limit based on Oxum rules
  const { 
    userEconomy, 
    activeBoosts, 
    purchaseBoost: purchasePulseBoost, 
    cancelBoost: cancelPulseBoost,
    isLoading,
    error,
    enhancedBoostStatus
  } = usePulseBoost(profileId);
  
  // Convert Pulse Boosts to legacy boost packages format
  const convertedBoostPackages = PULSE_BOOSTS.map(pulseBoost => ({
    id: pulseBoost.id,
    name: pulseBoost.name,
    duration: convertMinutesToDurationString(pulseBoost.durationMinutes),
    price_ubx: pulseBoost.costUBX,
    description: pulseBoost.description || 'Boost your visibility',
    features: [
      `Visibility: ${(pulseBoost as any).visibility?.replace('_', ' ') || 'Standard'}`,
      `Duration: ${formatMinutesToHumanReadable((pulseBoost as any).durationMinutes || 60)}`,
      (pulseBoost as any).autoApplyWithPlan ? 'Auto-applies with premium subscription' : 'Manual activation'
    ],
    boostLevel: 1 // Default boost level
  }));
  
  // Convert minutes to HH:MM:SS format
  function convertMinutesToDurationString(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:00`;
  }
  
  // Format minutes to human readable
  function formatMinutesToHumanReadable(minutes: number): string {
    if (minutes < 60) {
      return `${minutes} minutes`;
    } else if (minutes < 1440) {
      const hours = minutes / 60;
      return `${hours} ${hours === 1 ? 'hour' : 'hours'}`;
    } else {
      const days = Math.floor(minutes / 1440);
      return `${days} ${days === 1 ? 'day' : 'days'}`;
    }
  }
  
  // Check eligibility for boosting
  const eligibility = {
    eligible: true,
    reason: undefined
  };
  
  if (!userEconomy) {
    eligibility.eligible = false;
    eligibility.reason = "User data not loaded";
  } else if ((userEconomy.ubxBalance || 0) < GLOBAL_UBX_RATE) {
    eligibility.eligible = false;
    eligibility.reason = `Insufficient UBX balance. You need at least ${GLOBAL_UBX_RATE} UBX.`;
  }
  
  // Calculate daily boost usage
  useEffect(() => {
    if (activeBoosts.length) {
      // Simple mock calculation - in real system would track actual usage
      const todayStart = new Date();
      todayStart.setHours(0, 0, 0, 0);
      
      const boostsStartedToday = activeBoosts.filter(
        boost => new Date(boost.startedAt) >= todayStart
      );
      
      setDailyBoostUsage(boostsStartedToday.length);
    } else {
      setDailyBoostUsage(0);
    }
  }, [activeBoosts]);
  
  // Purchase boost adapter
  const purchaseBoost = async (pkg: any): Promise<boolean> => {
    try {
      // Find matching pulse boost
      const pulseBoost = PULSE_BOOSTS.find(boost => boost.id === pkg.id);
      
      if (!pulseBoost) {
        toast({
          title: "Error",
          description: "Selected boost package not found",
          variant: "destructive",
        });
        return false;
      }
      
      const boostPackage: BoostPackage = {
        id: pkg.id,
        name: pkg.name,
        description: pkg.description,
        price: pkg.price || pkg.price_ubx || 0,
        duration: pkg.duration || "24:00:00",
        boostLevel: pkg.boostLevel || 1,
        features: pkg.features || []
      };
      
      return await purchasePulseBoost(boostPackage);
    } catch (err) {
      console.error("Error in purchaseBoost adapter:", err);
      return false;
    }
  };
  
  // Cancel boost adapter
  const cancelBoost = async (): Promise<boolean> => {
    try {
      // Get the first active boost to cancel
      if (activeBoosts.length > 0) {
        return await cancelPulseBoost(activeBoosts[0].boostId);
      }
      return false;
    } catch (err) {
      console.error("Error in cancelBoost adapter:", err);
      return false;
    }
  };
  
  // Fetch boost packages adapter
  const fetchBoostPackages = () => {
    // This is a no-op in this adapter since we have static packages
    // In a real implementation, this might fetch from an API
  };
  
  // Get boost price adapter
  const getBoostPrice = (): number => {
    // Return the price of the selected package or default to global rate
    if (selectedPackage) {
      return selectedPackage.price_ubx || GLOBAL_UBX_RATE;
    }
    return GLOBAL_UBX_RATE;
  };
  
  // Mock analytics adapter
  const getBoostAnalytics = async (): Promise<any> => {
    // Simulate analytics data
    return Promise.resolve({
      viewsIncrease: Math.floor(Math.random() * 50) + 20,
      engagementRate: (Math.random() * 0.3 + 0.1).toFixed(2),
      impressions: Math.floor(Math.random() * 200) + 100,
      rankingImprovement: Math.floor(Math.random() * 8) + 3,
      additionalViews: Math.floor(Math.random() * 100) + 50,
      engagementIncrease: Math.floor(Math.random() * 30) + 10,
      rankingPosition: Math.floor(Math.random() * 10) + 1
    });
  };
  
  return {
    boostStatus: enhancedBoostStatus,
    eligibility,
    boostPackages: convertedBoostPackages,
    selectedPackage,
    setSelectedPackage,
    fetchBoostPackages,
    getBoostPrice,
    purchaseBoost,
    cancelBoost,
    loading: isLoading,
    error,
    getBoostAnalytics,
    dailyBoostUsage,
    dailyBoostLimit
  };
};

export default usePulseBoostAdapter;
