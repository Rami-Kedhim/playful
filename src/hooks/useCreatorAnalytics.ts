
import { useState, useEffect } from "react";
import { CreatorAnalytics } from "@/types/creator";
import { fetchCreatorAnalytics } from "@/services/creator/creatorAnalyticsService";

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

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch analytics data from the service
        const data = await fetchCreatorAnalytics('current-creator', period);
        setAnalytics(data);
        
        // Calculate summary metrics
        const summaryData = data.reduce((acc, item) => {
          return {
            views: acc.views + item.views,
            likes: acc.likes + item.likes,
            shares: acc.shares + item.shares,
            earnings: acc.earnings + item.earnings
          };
        }, { views: 0, likes: 0, shares: 0, earnings: 0 });
        
        setSummary(summaryData);
      } catch (err) {
        console.error("Error loading analytics:", err);
        setError("Failed to load analytics data");
      } finally {
        setLoading(false);
      }
    };
    
    loadAnalytics();
  }, [period]);

  return {
    analytics,
    summary,
    loading,
    error
  };
};

export default useCreatorAnalytics;
