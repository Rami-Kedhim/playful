import { GLOBAL_UBX_RATE } from '@/utils/oxum/globalPricing';
import { BoostStatus, BoostEligibility, BoostPackage } from '@/types/boost';
import { AnalyticsData } from '@/hooks/boost/useBoostAnalytics';

// Mock data
const mockBoostPackages = [
  {
    id: "boost-1",
    name: "24-Hour Boost",
    description: "Standard boost for 24 hours",
    duration: "24:00:00",
    price_ubx: GLOBAL_UBX_RATE,
    price: GLOBAL_UBX_RATE,
    features: ["Higher ranking in search", "Featured in boosted section", "Analytics tracking"]
  },
  {
    id: "boost-2",
    name: "Weekend Boost",
    description: "3-day visibility boost",
    duration: "72:00:00",
    price_ubx: GLOBAL_UBX_RATE * 2.5,
    price: GLOBAL_UBX_RATE * 2.5,
    features: ["Higher ranking in search", "Featured in boosted section", "Analytics tracking", "Extended duration"]
  },
  {
    id: "boost-3",
    name: "Weekly Boost",
    description: "7-day premium visibility",
    duration: "168:00:00",
    price_ubx: GLOBAL_UBX_RATE * 5,
    price: GLOBAL_UBX_RATE * 5,
    features: ["Higher ranking in search", "Featured in boosted section", "Analytics tracking", "Extended duration", "Premium placement"]
  }
];

// In-memory store for active boosts
const activeBoosts: Record<string, BoostStatus> = {};

// Simulated service
export const boostService = {
  // Fetch available boost packages
  fetchBoostPackages: async (): Promise<BoostPackage[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...mockBoostPackages];
  },
  
  // Check if profile has an active boost
  fetchActiveBoost: async (profileId: string): Promise<BoostStatus> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    if (activeBoosts[profileId]) {
      return activeBoosts[profileId];
    }
    
    // 30% chance of having an active boost (for demo/testing)
    const hasActiveBoost = Math.random() > 0.7;
    
    if (hasActiveBoost) {
      const hoursRemaining = Math.floor(Math.random() * 23) + 1;
      const expiresAt = new Date(Date.now() + hoursRemaining * 60 * 60 * 1000);
      
      const boostPackage = mockBoostPackages[0];
      
      const activeBoost: BoostStatus = {
        isActive: true,
        packageId: boostPackage.id,
        packageName: boostPackage.name,
        startTime: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        endTime: expiresAt.toISOString(),
        expiresAt: expiresAt,
        remainingTime: `${hoursRemaining} hours remaining`,
        timeRemaining: `${hoursRemaining} hours remaining`,
        progress: Math.round((24 - hoursRemaining) / 24 * 100),
        boostPackage: boostPackage,
        profileId
      };
      
      activeBoosts[profileId] = activeBoost;
      return activeBoost;
    }
    
    return { isActive: false };
  },
  
  // Check if profile is eligible for boosting
  checkBoostEligibility: async (profileId: string): Promise<BoostEligibility> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 150));
    
    // Most profiles are eligible (for demo purposes)
    const isEligible = Math.random() > 0.1;
    
    if (isEligible) {
      return {
        isEligible: true,
        reason: "",
        reasons: []
      };
    }
    
    // Random ineligibility reason
    const reasons = [
      "Profile completeness is below the required threshold (min. 70% required)",
      "Insufficient UBX balance",
      "Profile has pending review flags",
      "Account needs verification"
    ];
    
    const reasonIndex = Math.floor(Math.random() * reasons.length);
    
    return {
      isEligible: false,
      reason: reasons[reasonIndex],
      reasons: [reasons[reasonIndex]]
    };
  },
  
  // Purchase a boost
  purchaseBoost: async (profileId: string, boostPackageId: string): Promise<{success: boolean; message: string}> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Find the selected package
    const selectedPackage = mockBoostPackages.find(pkg => pkg.id === boostPackageId);
    
    if (!selectedPackage) {
      return {
        success: false,
        message: "Selected boost package not found"
      };
    }
    
    // Always succeed for demo purposes
    const hours = parseInt(selectedPackage.duration.split(':')[0]);
    const expiresAt = new Date(Date.now() + hours * 60 * 60 * 1000);
    
    const activeBoost: BoostStatus = {
      isActive: true,
      packageId: selectedPackage.id,
      packageName: selectedPackage.name,
      startTime: new Date().toISOString(),
      endTime: expiresAt.toISOString(),
      expiresAt: expiresAt,
      remainingTime: `${hours} hours remaining`,
      timeRemaining: `${hours} hours remaining`,
      progress: 0,
      boostPackage: selectedPackage,
      profileId
    };
    
    activeBoosts[profileId] = activeBoost;
    
    return {
      success: true,
      message: `${selectedPackage.name} activated successfully!`
    };
  },
  
  // Cancel an active boost
  cancelBoost: async (profileId: string): Promise<{success: boolean; message: string}> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (!activeBoosts[profileId] || !activeBoosts[profileId].isActive) {
      return {
        success: false,
        message: "No active boost to cancel"
      };
    }
    
    // Remove the active boost
    delete activeBoosts[profileId];
    
    return {
      success: true,
      message: "Boost cancelled successfully"
    };
  },
  
  // Fetch analytics for an active boost
  fetchBoostAnalytics: async (profileId: string): Promise<AnalyticsData> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 400));
    
    // Generate realistic mock data
    return {
      impressions: {
        today: Math.floor(Math.random() * 200) + 100,
        yesterday: Math.floor(Math.random() * 200) + 80,
        weeklyAverage: Math.floor(Math.random() * 150) + 100,
        withBoost: Math.floor(Math.random() * 300) + 200,
        withoutBoost: Math.floor(Math.random() * 150) + 50,
        increase: Math.floor(Math.random() * 100) + 50
      },
      clicks: {
        today: Math.floor(Math.random() * 50) + 20,
        yesterday: Math.floor(Math.random() * 40) + 15,
        weeklyAverage: Math.floor(Math.random() * 35) + 20,
        withBoost: Math.floor(Math.random() * 60) + 30,
        withoutBoost: Math.floor(Math.random() * 30) + 10,
        increase: Math.floor(Math.random() * 150) + 50
      },
      engagementRate: Math.random() * 20 + 5,
      conversionRate: Math.random() * 10 + 1,
      boostEfficiency: Math.random() * 30 + 60,
      additionalViews: Math.floor(Math.random() * 150) + 50,
      engagementIncrease: Math.floor(Math.random() * 40) + 10,
      rankingPosition: Math.floor(Math.random() * 10) + 1
    };
  }
};
