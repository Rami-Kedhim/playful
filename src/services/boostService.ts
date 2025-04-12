import { supabase } from "@/integrations/supabase/client";
import { BoostPackage, BoostStatus } from "@/types/boost";
import { GLOBAL_UBX_RATE, validateGlobalPrice } from "@/utils/oxum/globalPricing";

/**
 * Service for handling boost-related API calls
 */
export const boostService = {
  /**
   * Fetch available boost packages for a user
   */
  async fetchBoostPackages(): Promise<BoostPackage[]> {
    try {
      const { data, error } = await supabase
        .from('boost_packages')
        .select('*')
        .eq('is_active', true);

      if (error) {
        console.error("Error fetching boost packages:", error);
        throw error;
      }

      // Apply Oxum Rule #001: Ensure all packages use global pricing
      return data.map(pkg => ({
        id: pkg.id,
        name: pkg.name,
        description: pkg.description || '',
        duration: formatDurationFromInterval(pkg.duration),
        price_ubx: GLOBAL_UBX_RATE, // Enforce global pricing
        features: pkg.features || []
      }));
    } catch (err) {
      console.error("Failed to fetch boost packages:", err);
      // Return some fallback packages with enforced global pricing
      return [
        {
          id: "boost-1",
          name: "Quick Boost",
          description: "Short-term visibility boost",
          duration: "1:00:00",
          price_ubx: GLOBAL_UBX_RATE,
          features: ["Higher search ranking", "Featured in 'Boosted' section"]
        },
        {
          id: "boost-2",
          name: "Standard Boost",
          description: "Medium-term visibility boost",
          duration: "3:00:00",
          price_ubx: GLOBAL_UBX_RATE,
          features: ["Higher search ranking", "Featured in 'Boosted' section", "Priority in matching"]
        },
        {
          id: "boost-3",
          name: "Premium Boost",
          description: "Long-term visibility boost",
          duration: "24:00:00",
          price_ubx: GLOBAL_UBX_RATE,
          features: ["Highest search ranking", "Featured in 'Premium' section", "Priority in matching", "Stats and analytics"]
        }
      ];
    }
  },

  /**
   * Fetch active boost for a profile
   */
  async fetchActiveBoost(profileId: string): Promise<BoostStatus | null> {
    if (!profileId) return null;
    
    try {
      const { data, error } = await supabase
        .from('active_boosts')
        .select(`
          id,
          status,
          start_time,
          end_time,
          package_id,
          boost_data
        `)
        .eq('user_id', profileId)
        .eq('status', 'active')
        .maybeSingle();

      if (error) {
        console.error("Error fetching active boost:", error);
        throw error;
      }

      if (!data) return null;

      // Fetch the associated package
      const packageData = data.package_id 
        ? await this.fetchBoostPackageById(data.package_id) 
        : null;

      const now = new Date();
      const endTime = data.end_time ? new Date(data.end_time) : null;
      
      // If the boost has expired but still marked as active
      if (endTime && endTime < now) {
        await this.updateBoostStatus(data.id, 'expired');
        return null;
      }

      return {
        isActive: true,
        expiresAt: endTime || undefined,
        boostPackage: packageData || undefined,
        remainingTime: endTime ? calculateRemainingTime(endTime) : '',
        progress: calculateProgress(data.start_time, data.end_time)
      };
    } catch (err) {
      console.error("Failed to fetch active boost:", err);
      return null;
    }
  },

  /**
   * Fetch a specific boost package by ID
   */
  async fetchBoostPackageById(packageId: string): Promise<BoostPackage | null> {
    try {
      const { data, error } = await supabase
        .from('boost_packages')
        .select('*')
        .eq('id', packageId)
        .maybeSingle();

      if (error || !data) {
        console.error("Error fetching boost package:", error);
        return null;
      }

      return {
        id: data.id,
        name: data.name,
        description: data.description || '',
        duration: formatDurationFromInterval(data.duration),
        price_ubx: data.price,
        features: data.features || []
      };
    } catch (err) {
      console.error("Failed to fetch boost package:", err);
      return null;
    }
  },

  /**
   * Purchase a boost for a profile
   */
  async purchaseBoost(
    profileId: string,
    packageId: string
  ): Promise<{ success: boolean; message?: string }> {
    try {
      if (!profileId || !packageId) {
        return { success: false, message: "Missing required data" };
      }

      // First check if user already has an active boost
      const activeBoost = await this.fetchActiveBoost(profileId);
      if (activeBoost?.isActive) {
        return { 
          success: false, 
          message: "You already have an active boost. Please cancel it before purchasing a new one." 
        };
      }

      // Get the boost package to determine duration and price
      const boostPackage = await this.fetchBoostPackageById(packageId);
      if (!boostPackage) {
        return { success: false, message: "Selected boost package not found" };
      }
      
      // Oxum Rule #001: Validate global price symmetry
      try {
        validateGlobalPrice(boostPackage.price_ubx);
      } catch (error: any) {
        console.error("Oxum Rule Violation:", error);
        return { 
          success: false,
          message: "Price inconsistency detected. Transaction halted by Orus module."
        };
      }

      // Convert duration string to interval (simplified example)
      const durationHours = parseInt(boostPackage.duration.split(':')[0]);
      
      const now = new Date();
      const endTime = new Date(now.getTime() + (durationHours * 60 * 60 * 1000));

      // Check if user has enough UBX balance
      // In a real implementation, you'd check the user's balance here
      
      // Create the active_boosts record
      const { data, error } = await supabase
        .from('active_boosts')
        .insert([
          {
            user_id: profileId,
            package_id: packageId,
            start_time: now.toISOString(),
            end_time: endTime.toISOString(),
            status: 'active',
            boost_data: {
              purchaseTime: now.toISOString(),
              packageName: boostPackage.name,
              price: boostPackage.price_ubx
            }
          }
        ])
        .select()
        .single();

      if (error) {
        console.error("Error purchasing boost:", error);
        return { success: false, message: "Failed to purchase boost" };
      }

      // Log the transaction
      await this.logBoostTransaction(
        profileId, 
        -boostPackage.price_ubx, 
        `Purchased ${boostPackage.name} boost`
      );

      return { success: true };
    } catch (err: any) {
      console.error("Failed to purchase boost:", err);
      return { 
        success: false, 
        message: err.message || "An unexpected error occurred" 
      };
    }
  },

  /**
   * Cancel an active boost
   */
  async cancelBoost(
    profileId: string
  ): Promise<{ success: boolean; message?: string }> {
    try {
      if (!profileId) {
        return { success: false, message: "Profile ID is required" };
      }

      // Find the active boost
      const { data, error } = await supabase
        .from('active_boosts')
        .select('id, package_id, boost_data')
        .eq('user_id', profileId)
        .eq('status', 'active')
        .maybeSingle();

      if (error) {
        console.error("Error finding active boost:", error);
        return { success: false, message: "Failed to find active boost" };
      }

      if (!data) {
        return { 
          success: false, 
          message: "No active boost found" 
        };
      }

      // Update the status to cancelled
      const { error: updateError } = await supabase
        .from('active_boosts')
        .update({ status: 'cancelled' })
        .eq('id', data.id);

      if (updateError) {
        console.error("Error cancelling boost:", updateError);
        return { success: false, message: "Failed to cancel boost" };
      }

      return { success: true };
    } catch (err: any) {
      console.error("Failed to cancel boost:", err);
      return { 
        success: false, 
        message: err.message || "An unexpected error occurred" 
      };
    }
  },

  /**
   * Update a boost's status
   */
  async updateBoostStatus(
    boostId: string,
    status: 'active' | 'cancelled' | 'expired'
  ): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('active_boosts')
        .update({ status })
        .eq('id', boostId);

      if (error) {
        console.error("Error updating boost status:", error);
        return false;
      }

      return true;
    } catch (err) {
      console.error("Failed to update boost status:", err);
      return false;
    }
  },

  /**
   * Log a boost-related transaction
   */
  async logBoostTransaction(
    userId: string,
    amount: number,
    description: string
  ): Promise<void> {
    try {
      const { error } = await supabase
        .from('ubx_transactions')
        .insert([
          {
            user_id: userId,
            amount,
            transaction_type: 'boost',
            description,
            status: 'completed'
          }
        ]);

      if (error) {
        console.error("Error logging transaction:", error);
      }
    } catch (err) {
      console.error("Failed to log transaction:", err);
    }
  },

  /**
   * Fetch boost analytics data
   */
  async fetchBoostAnalytics(profileId: string) {
    try {
      // In a real implementation, you would fetch analytics from the database
      // For now we'll return mock data
      const activeBoost = await this.fetchActiveBoost(profileId);
      
      if (!activeBoost?.isActive) {
        return null;
      }
      
      const mockAnalytics = {
        additionalViews: Math.floor(Math.random() * 50) + 20,
        engagementIncrease: Math.floor(Math.random() * 30) + 10,
        rankingPosition: Math.floor(Math.random() * 5) + 1,
        effectiveness: Math.floor(Math.random() * 30) + 70,
        views: {
          withoutBoost: Math.floor(Math.random() * 100) + 50,
          withBoost: Math.floor(Math.random() * 200) + 150,
          increase: Math.floor(Math.random() * 30) + 20
        },
        clicks: {
          withoutBoost: Math.floor(Math.random() * 30) + 10,
          withBoost: Math.floor(Math.random() * 70) + 30,
          increase: Math.floor(Math.random() * 50) + 30
        },
        searchRanking: {
          withoutBoost: Math.floor(Math.random() * 15) + 8,
          withBoost: Math.floor(Math.random() * 5) + 1,
          improvement: Math.floor(Math.random() * 7) + 3
        }
      };

      return mockAnalytics;
    } catch (err) {
      console.error("Error fetching boost analytics:", err);
      return null;
    }
  },

  /**
   * Check eligibility for boosting
   */
  async checkBoostEligibility(profileId: string): Promise<{
    isEligible: boolean;
    reasons?: string[];
  }> {
    try {
      if (!profileId) {
        return { isEligible: false, reasons: ["Profile ID not provided"] };
      }

      // Count user's boosts in the last 24 hours
      const twentyFourHoursAgo = new Date();
      twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);

      const { count, error } = await supabase
        .from('active_boosts')
        .select('id', { count: 'exact', head: true })
        .eq('user_id', profileId)
        .gte('start_time', twentyFourHoursAgo.toISOString());

      if (error) {
        console.error("Error checking boost eligibility:", error);
        return { 
          isEligible: false, 
          reasons: ["Failed to check eligibility"] 
        };
      }

      // Check if user has reached daily limit
      const DAILY_BOOST_LIMIT = 4;
      if (count && count >= DAILY_BOOST_LIMIT) {
        return { 
          isEligible: false, 
          reasons: [`You've reached the daily limit of ${DAILY_BOOST_LIMIT} boosts`] 
        };
      }

      // In a real implementation, you'd check other criteria like:
      // - Profile completeness
      // - Account verification status
      // - Sufficient balance
      // - Profile age
      // - Content quality

      return { isEligible: true };
    } catch (err) {
      console.error("Failed to check boost eligibility:", err);
      return { 
        isEligible: false, 
        reasons: ["An unexpected error occurred"] 
      };
    }
  },

  /**
   * Boost a profile with specified parameters
   */
  boostProfile: async ({ 
    profileId, 
    amount, 
    durationHours 
  }: { 
    profileId: string; 
    amount: number; 
    durationHours: number 
  }): Promise<boolean> => {
    try {
      if (!profileId) return false;
      
      // In a real implementation, this would create a boost package on-the-fly
      // based on the amount and duration
      const boostPackageId = `custom-${durationHours}-${amount}`;
      
      // Call the existing purchaseBoost method
      const result = await boostService.purchaseBoost(profileId, boostPackageId);
      return result.success;
    } catch (err) {
      console.error("Failed to boost profile:", err);
      return false;
    }
  },
  
  /**
   * Get the current boost level for a profile from active boosts
   */
  getProfileBoostLevel: (activeBoosts: any[], profileId: string): number => {
    if (!profileId || !activeBoosts || activeBoosts.length === 0) return 0;
    
    // Find the boost with the highest level for this profile
    const profileBoosts = activeBoosts.filter(boost => 
      boost.profile_id === profileId && 
      new Date(boost.end_time) > new Date()
    );
    
    if (profileBoosts.length === 0) return 0;
    
    // Return the maximum boost level
    return Math.max(...profileBoosts.map(boost => boost.boost_level || 0));
  }
};

// Helper function to calculate remaining time
function calculateRemainingTime(endTime: Date): string {
  const now = new Date();
  const diff = endTime.getTime() - now.getTime();
  
  if (diff <= 0) return "Expired";
  
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  } else {
    return `${minutes}m`;
  }
}

// Helper function to calculate progress percentage
function calculateProgress(startTime?: string, endTime?: string): number {
  if (!startTime || !endTime) return 0;
  
  const start = new Date(startTime).getTime();
  const end = new Date(endTime).getTime();
  const now = new Date().getTime();
  
  const total = end - start;
  const elapsed = now - start;
  
  if (total <= 0) return 100;
  return Math.min(100, Math.max(0, (elapsed / total) * 100));
}

// Helper function to format duration from interval
function formatDurationFromInterval(interval: string): string {
  try {
    // Postgres interval like '01:00:00' (1 hour)
    // or '03:00:00' (3 hours)
    return interval;
  } catch (err) {
    console.error("Failed to parse interval:", err);
    return "1:00:00"; // Default 1 hour
  }
}
