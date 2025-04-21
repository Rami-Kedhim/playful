
import { BoostStatus, BoostEligibility, BoostAnalytics } from "@/types/boost";
import { GLOBAL_UBX_RATE } from "@/utils/oxum/globalPricing";

// Mock implementation of boost service
export const boostService = {
  /**
   * Fetch available boost packages
   */
  fetchBoostPackages: async () => {
    // In a real app, this would make an API call
    return [
      {
        id: "boost-1",
        name: "1-Hour Boost",
        duration: "01:00:00",
        price_ubx: GLOBAL_UBX_RATE,
        description: "Quick visibility boost",
        features: ["Top search position", "Featured badge"]
      },
      {
        id: "boost-3",
        name: "3-Hour Boost",
        duration: "03:00:00",
        price_ubx: GLOBAL_UBX_RATE,
        description: "Standard visibility boost",
        features: ["Top search position", "Featured badge", "Profile highlighting"]
      },
      {
        id: "boost-24",
        name: "24-Hour Boost",
        duration: "24:00:00",
        price_ubx: GLOBAL_UBX_RATE,
        description: "Full day visibility boost",
        features: ["Top search position", "Featured badge", "Profile highlighting", "Priority in all listings"]
      }
    ];
  },

  /**
   * Fetch active boost for a profile
   */
  fetchActiveBoost: async (profileId: string): Promise<BoostStatus | null> => {
    // Mock implementation - randomly have active boosts
    const isActive = Math.random() > 0.5;
    
    if (!isActive) {
      return null;
    }
    
    const now = new Date();
    const expiresAt = new Date(now.getTime() + (Math.floor(Math.random() * 3) + 1) * 60 * 60 * 1000);
    const totalDuration = expiresAt.getTime() - now.getTime();
    const elapsed = Math.random() * totalDuration;
    const progress = Math.round((elapsed / totalDuration) * 100);
    
    return {
      isActive: true,
      activeBoostId: "boost-1",
      startTime: now,
      endTime: expiresAt,
      timeRemaining: `${Math.floor((expiresAt.getTime() - now.getTime()) / (1000 * 60))} minutes`,
      progress,
      remainingTime: `${Math.floor((expiresAt.getTime() - now.getTime()) / (1000 * 60))} minutes`,
      expiresAt,
      boostPackage: {
        id: "boost-1",
        name: "1-Hour Boost",
        duration: "01:00:00",
        price_ubx: GLOBAL_UBX_RATE,
        description: "Quick visibility boost",
        features: ["Top search position", "Featured badge"]
      },
      pulseData: {
        type: "standard",
        intensity: 75
      }
    };
  },

  /**
   * Check boost eligibility for a profile
   */
  checkBoostEligibility: async (profileId: string): Promise<BoostEligibility> => {
    // In a real app, check actual eligibility criteria
    return {
      isEligible: true
    };
  },

  /**
   * Purchase a boost
   */
  purchaseBoost: async (profileId: string, packageId: string) => {
    // In a real app, make an API call to purchase
    console.log(`Purchasing boost ${packageId} for profile ${profileId}`);
    
    // Simulate success most of the time
    if (Math.random() > 0.1) {
      return {
        success: true,
        boostId: `boost-${Date.now()}`,
      };
    } else {
      return {
        success: false,
        message: "Failed to process payment"
      };
    }
  },

  /**
   * Cancel active boost
   */
  cancelBoost: async (profileId: string, boostId: string) => {
    // In a real app, make an API call to cancel
    console.log(`Cancelling boost ${boostId} for profile ${profileId}`);
    
    // Simulate success most of the time
    if (Math.random() > 0.1) {
      return {
        success: true
      };
    } else {
      return {
        success: false,
        message: "Failed to cancel boost"
      };
    }
  },
  
  /**
   * Fetch boost analytics
   */
  fetchBoostAnalytics: async (profileId: string): Promise<BoostAnalytics> => {
    // In a real app, this would fetch real analytics data
    return {
      additionalViews: Math.floor(Math.random() * 500) + 100,
      engagementIncrease: Math.floor(Math.random() * 30) + 10,
      rankingPosition: Math.floor(Math.random() * 10) + 1,
      views: {
        today: Math.floor(Math.random() * 200) + 50,
        yesterday: Math.floor(Math.random() * 180) + 40,
        weeklyAverage: Math.floor(Math.random() * 150) + 60,
        withBoost: Math.floor(Math.random() * 300) + 100,
        withoutBoost: Math.floor(Math.random() * 150) + 50,
        increase: Math.floor(Math.random() * 50) + 20
      },
      clicks: {
        today: Math.floor(Math.random() * 50) + 10,
        yesterday: Math.floor(Math.random() * 45) + 8,
        weeklyAverage: Math.floor(Math.random() * 40) + 12,
        withBoost: Math.floor(Math.random() * 80) + 20,
        withoutBoost: Math.floor(Math.random() * 40) + 10,
        increase: Math.floor(Math.random() * 30) + 15
      },
      searchRanking: {
        withoutBoost: Math.floor(Math.random() * 20) + 10,
        withBoost: Math.floor(Math.random() * 8) + 1,
        improvement: Math.floor(Math.random() * 15) + 5
      }
    };
  }
};
