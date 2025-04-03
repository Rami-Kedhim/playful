
import { useState, useEffect } from "react";
import { CreatorAnalytics } from "@/types/creator";
import { fetchCreatorAnalytics } from "@/services/creator/creatorAnalyticsService";
import { useAuth } from "@/hooks/useAuth";

interface AnalyticsSummary {
  views: number;
  likes: number;
  shares: number;
  earnings: number;
}

export const useCreatorAnalytics = (period: 'week' | 'month' | 'year' = 'week') => {
  const [analytics, setAnalytics] = useState<CreatorAnalytics[]>([]);
  const [summary, setSummary] = useState<AnalyticsSummary>({
    views: 0,
    likes: 0,
    shares: 0,
    earnings: 0
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Ensure we have a user
        if (!user) {
          throw new Error("User not authenticated");
        }
        
        // Fetch analytics data using service
        const analyticsData = await fetchCreatorAnalytics(user.id, period);
        setAnalytics(analyticsData);
        
        // Calculate summary
        const summaryData = analyticsData.reduce((acc, item) => {
          return {
            views: acc.views + item.views,
            likes: acc.likes + item.likes,
            shares: acc.shares + item.shares,
            earnings: acc.earnings + item.earnings
          };
        }, { views: 0, likes: 0, shares: 0, earnings: 0 });
        
        setSummary(summaryData);
      } catch (err: any) {
        console.error("Error loading analytics:", err);
        setError(err.message || "Failed to load analytics data");
        
        // Set empty data on error
        setAnalytics([]);
        setSummary({ views: 0, likes: 0, shares: 0, earnings: 0 });
      } finally {
        setLoading(false);
      }
    };
    
    loadAnalytics();
  }, [period, user]);

  return {
    analytics,
    summary,
    loading,
    error
  };
};

export default useCreatorAnalytics;
