
import { useState, useCallback } from "react";
import { BoostAnalytics } from "@/types/boost";
import { toast } from "@/components/ui/use-toast";

// Define the interface that matches what the components expect
interface AnalyticsData {
  additionalViews: number;
  engagementIncrease: number;
  rankingPosition: number;
}

export const useBoostAnalytics = (profileId?: string) => {
  const [analytics, setAnalytics] = useState<BoostAnalytics | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch analytics for a specific boost
  const fetchAnalytics = useCallback(async (): Promise<AnalyticsData | null> => {
    if (!profileId) return null;
    
    try {
      setLoading(true);
      
      // In a real implementation, this would call an API endpoint
      // For now, use mock data to simulate analytics
      const mockAnalytics: BoostAnalytics = {
        views: {
          withBoost: Math.floor(Math.random() * 300) + 200,
          withoutBoost: Math.floor(Math.random() * 100) + 50,
          increase: 0 // Will be calculated
        },
        clicks: {
          withBoost: Math.floor(Math.random() * 100) + 30,
          withoutBoost: Math.floor(Math.random() * 20) + 5,
          increase: 0 // Will be calculated
        },
        searchRanking: {
          withBoost: Math.floor(Math.random() * 5) + 1,
          withoutBoost: Math.floor(Math.random() * 10) + 5,
          improvement: 0 // Will be calculated
        },
        effectiveness: 0 // Will be calculated
      };
      
      // Calculate increases and improvements
      mockAnalytics.views.increase = Math.round(
        ((mockAnalytics.views.withBoost - mockAnalytics.views.withoutBoost) / mockAnalytics.views.withoutBoost) * 100
      );
      
      mockAnalytics.clicks.increase = Math.round(
        ((mockAnalytics.clicks.withBoost - mockAnalytics.clicks.withoutBoost) / mockAnalytics.clicks.withoutBoost) * 100
      );
      
      mockAnalytics.searchRanking.improvement = mockAnalytics.searchRanking.withoutBoost - mockAnalytics.searchRanking.withBoost;
      
      // Calculate overall effectiveness (0-100 scale)
      mockAnalytics.effectiveness = Math.min(
        100,
        Math.round((mockAnalytics.views.increase + mockAnalytics.clicks.increase) / 4 + 
        (mockAnalytics.searchRanking.improvement * 10))
      );
      
      setAnalytics(mockAnalytics);
      
      // Return data in the format expected by components
      const analyticsData: AnalyticsData = {
        additionalViews: mockAnalytics.views.withBoost - mockAnalytics.views.withoutBoost,
        engagementIncrease: mockAnalytics.clicks.increase,
        rankingPosition: mockAnalytics.searchRanking.withBoost
      };
      
      return analyticsData;
    } catch (error) {
      console.error("Error fetching boost analytics:", error);
      toast({
        title: "Error",
        description: "Failed to fetch boost analytics",
        variant: "destructive"
      });
      return null;
    } finally {
      setLoading(false);
    }
  }, [profileId]);

  return {
    analytics,
    loading,
    fetchAnalytics
  };
};
