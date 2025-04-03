
import { useState, useEffect } from "react";
import { fetchCreatorAnalytics } from "@/services/creator/creatorAnalyticsService";
import { CreatorAnalytics } from "@/types/creator";
import { toast } from "@/components/ui/use-toast";

type TimeRange = "week" | "month" | "year" | "custom";

export const useCreatorAnalytics = (timeRange: TimeRange = "week", customDates?: { start: Date; end: Date }) => {
  const [analytics, setAnalytics] = useState<CreatorAnalytics[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [summary, setSummary] = useState({
    views: 0,
    likes: 0,
    shares: 0,
    earnings: 0
  });

  useEffect(() => {
    loadContent();
  }, [timeRange, customDates]);
  
  // Function to load analytics data
  const loadContent = async () => {
    setLoading(true);
    setError(null);
    
    try {
      let period: 'week' | 'month' | 'year' = 'week';
      
      // Set period based on selected time range
      switch (timeRange) {
        case "week":
          period = 'week';
          break;
        case "month":
          period = 'month';
          break;
        case "year":
          period = 'year';
          break;
        case "custom":
          // For custom dates, we'll use the week period and filter results later
          period = 'week';
          if (!customDates?.start || !customDates?.end) {
            throw new Error("Custom date range requires start and end dates");
          }
          break;
        default:
          period = 'week';
      }
      
      const data = await fetchCreatorAnalytics('mock-creator-id', period);
      
      // Filter results if using custom dates
      let filteredData = data;
      if (timeRange === 'custom' && customDates?.start && customDates?.end) {
        const startStr = customDates.start.toISOString().split('T')[0];
        const endStr = customDates.end.toISOString().split('T')[0];
        filteredData = data.filter(item => 
          item.date >= startStr && item.date <= endStr
        );
      }
      
      setAnalytics(filteredData);
      
      // Calculate summary metrics
      const totalViews = filteredData.reduce((sum, item) => sum + item.views, 0);
      const totalLikes = filteredData.reduce((sum, item) => sum + item.likes, 0);
      const totalShares = filteredData.reduce((sum, item) => sum + item.shares, 0);
      const totalEarnings = filteredData.reduce((sum, item) => sum + item.earnings, 0);
      
      setSummary({
        views: totalViews,
        likes: totalLikes,
        shares: totalShares,
        earnings: totalEarnings
      });
    } catch (err: any) {
      setError(err.message || "Failed to load analytics");
      console.error("Error loading creator analytics:", err);
      
      toast({
        title: "Failed to load analytics",
        description: err.message || "An error occurred while loading your analytics",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  return {
    analytics,
    loading,
    error,
    summary,
    timeRange,
    refreshAnalytics: loadContent
  };
};

export default useCreatorAnalytics;
