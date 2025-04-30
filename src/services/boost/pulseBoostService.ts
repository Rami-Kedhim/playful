
import { BoostPackage } from '@/types/boost';

export const pulseBoostService = {
  getBoostPackages: async (): Promise<{ data: BoostPackage[], error: any }> => {
    return { 
      data: [
        {
          id: "boost-1",
          name: "Standard Boost",
          description: "Basic visibility boost for 24 hours",
          price: 50,
          duration: "24:00:00",
          features: ["Homepage visibility", "Search result priority"],
          price_ubx: 50,
          durationMinutes: 24 * 60
        },
        {
          id: "boost-2",
          name: "Premium Boost",
          description: "Enhanced visibility boost for 3 days",
          price: 120,
          duration: "72:00:00",
          features: ["Homepage visibility", "Search result priority", "Featured profile"],
          price_ubx: 120,
          durationMinutes: 72 * 60
        }
      ], 
      error: null 
    };
  },

  getActiveBoosts: async (profileId: string): Promise<{ data: any[], error: any }> => {
    return { 
      data: [], 
      error: null 
    };
  },

  getUserEconomy: async (profileId: string): Promise<{ data: any, error: any }> => {
    return { 
      data: {
        ubxBalance: 1000,
        paidBalance: 0
      }, 
      error: null 
    };
  },

  purchaseBoost: async (profileId: string, boostPackageId: string): Promise<{ success: boolean, error: any }> => {
    return { 
      success: true, 
      error: null 
    };
  },

  cancelBoost: async (profileId: string, boostId?: string): Promise<{ success: boolean, error: any }> => {
    return { 
      success: true, 
      error: null 
    };
  }
};

export default pulseBoostService;
