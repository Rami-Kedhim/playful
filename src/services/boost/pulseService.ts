
import { BoostPackage, PulseBoost } from '@/types/pulse-boost';
import { EnhancedBoostStatus } from '@/types/pulse-boost';

export const getPulsePackages = async (): Promise<BoostPackage[]> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Return mock packages
  return [
    {
      id: "basic-pulse",
      name: "Basic Pulse",
      description: "Small visibility boost for 24 hours",
      price: 5.99,
      price_ubx: 599,
      duration: "24h",
      features: ["24h visibility boost", "Top search results", "Featured badge"],
      is_active: true,
      is_featured: false,
      visibility_increase: 200,
      color: "blue",
      badgeColor: "blue"
    },
    {
      id: "premium-pulse",
      name: "Premium Pulse",
      description: "Major visibility boost for 3 days with premium badge",
      price: 14.99,
      price_ubx: 1499,
      duration: "3d",
      features: ["72h visibility boost", "Top search results", "Premium badge", "Featured section"],
      is_active: true,
      is_featured: true,
      visibility_increase: 500,
      color: "purple",
      badgeColor: "purple",
      boost_level: 2,
      isMostPopular: true
    },
    {
      id: "ultra-pulse",
      name: "Ultra Pulse",
      description: "Maximum visibility boost for 7 days with exclusive features",
      price: 29.99,
      price_ubx: 2999,
      duration: "7d",
      features: ["7 day visibility boost", "Top of all results", "Premium badge", "Featured everywhere", "Boost analytics"],
      is_active: true,
      is_featured: false,
      visibility_increase: 1000,
      color: "gold",
      badgeColor: "amber",
      boost_level: 3
    }
  ];
};

export const getBoostStatus = async (profileId: string): Promise<EnhancedBoostStatus> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // For demo, return a random status (active/inactive)
  const isActive = Math.random() > 0.5;
  
  if (isActive) {
    // Active boost
    const now = new Date();
    const expiresAt = new Date(now.getTime() + Math.random() * 86400000 * 3); // Random time up to 3 days
    const timeRemaining = (expiresAt.getTime() - now.getTime()) / 1000; // in seconds
    const totalDuration = 86400 * 3; // 3 days in seconds
    const percentRemaining = Math.round((timeRemaining / totalDuration) * 100);
    
    return {
      isActive: true,
      packageId: "premium-pulse",
      expiresAt,
      timeRemaining: `${Math.floor(timeRemaining / 3600)}h ${Math.floor((timeRemaining % 3600) / 60)}m`,
      percentRemaining,
      isExpired: false,
      boostPackage: {
        id: "premium-pulse",
        name: "Premium Pulse",
        description: "Major visibility boost for 3 days",
        price: 14.99,
        price_ubx: 1499,
        duration: "3d",
        features: ["72h visibility boost", "Top search results", "Premium badge"],
        is_active: true,
        is_featured: true,
        visibility_increase: 500,
        color: "purple",
        badgeColor: "purple"
      }
    };
  } else {
    // Inactive or expired
    return {
      isActive: false,
      timeRemaining: "0h 0m",
      percentRemaining: 0,
      isExpired: true
    };
  }
};
