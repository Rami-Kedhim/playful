
/**
 * Service for boost operations
 */

// Mock implementation
export const boostService = {
  fetchBoostPackages: async () => {
    // Return mock data
    return [
      {
        id: "boost-1",
        name: "1-Hour Boost",
        duration: "01:00:00",
        price_ubx: 15,
        description: "Quick visibility boost",
        features: ["Top search position", "Featured badge"]
      },
      {
        id: "boost-3",
        name: "3-Hour Boost",
        duration: "03:00:00",
        price_ubx: 50,
        description: "Standard visibility boost",
        features: ["Top search position", "Featured badge", "Profile highlighting"]
      },
      {
        id: "boost-24",
        name: "24-Hour Boost",
        duration: "24:00:00",
        price_ubx: 100,
        description: "Full day visibility boost",
        features: ["Top search position", "Featured badge", "Profile highlighting", "Priority in all listings"]
      }
    ];
  },
  
  fetchActiveBoost: async (profileId: string) => {
    return {
      isActive: false,
      expiresAt: null,
      remainingTime: null
    };
  },
  
  checkBoostEligibility: async (profileId: string) => {
    return {
      isEligible: true,
      reasons: []
    };
  },
  
  purchaseBoost: async (profileId: string, packageId: string) => {
    return {
      success: true,
      message: "Boost purchased successfully"
    };
  },
  
  cancelBoost: async (profileId: string) => {
    return {
      success: true,
      message: "Boost cancelled successfully"
    };
  },
  
  fetchBoostAnalytics: async (profileId: string) => {
    return {
      viewsIncrease: Math.floor(Math.random() * 50) + 20,
      engagementRate: (Math.random() * 0.3 + 0.1).toFixed(2),
      impressions: Math.floor(Math.random() * 200) + 100,
      rankingImprovement: Math.floor(Math.random() * 8) + 3
    };
  }
};
