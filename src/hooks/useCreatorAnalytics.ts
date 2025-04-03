
import { useState, useEffect } from "react";
import { fetchCreatorAnalytics } from "@/services/creator/creatorAnalyticsService";
import { CreatorAnalytics } from "@/types/creator";
import { startOfDay, subDays, subMonths, subYears, endOfDay } from 'date-fns';
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
    const loadAnalytics = async () => {
      setLoading(true);
      setError(null);
      
      try {
        let startDate: Date;
        const endDate = endOfDay(new Date());
        
        // Set start date based on selected time range
        switch (timeRange) {
          case "week":
            startDate = startOfDay(subDays(new Date(), 7));
            break;
          case "month":
            startDate = startOfDay(subMonths(new Date(), 1));
            break;
          case "year":
            startDate = startOfDay(subYears(new Date(), 1));
            break;
          case "custom":
            if (!customDates?.start || !customDates?.end) {
              throw new Error("Custom date range requires start and end dates");
            }
            startDate = startOfDay(customDates.start);
            break;
          default:
            startDate = startOfDay(subDays(new Date(), 7));
        }
        
        const data = await fetchCreatorAnalytics('mock-creator-id', startDate, endDate);
        setAnalytics(data);
        
        // Calculate summary metrics
        const totalViews = data.reduce((sum, item) => sum + item.views, 0);
        const totalLikes = data.reduce((sum, item) => sum + item.likes, 0);
        const totalShares = data.reduce((sum, item) => sum + item.shares, 0);
        const totalEarnings = data.reduce((sum, item) => sum + item.earnings, 0);
        
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
    
    loadContent();
  }, [timeRange, customDates]);
  
  // Function to load analytics data
  const loadContent = async () => {
    setLoading(true);
    setError(null);
    
    try {
      let startDate: Date;
      const endDate = endOfDay(new Date());
      
      // Set start date based on selected time range
      switch (timeRange) {
        case "week":
          startDate = startOfDay(subDays(new Date(), 7));
          break;
        case "month":
          startDate = startOfDay(subMonths(new Date(), 1));
          break;
        case "year":
          startDate = startOfDay(subYears(new Date(), 1));
          break;
        case "custom":
          if (!customDates?.start || !customDates?.end) {
            throw new Error("Custom date range requires start and end dates");
          }
          startDate = startOfDay(customDates.start);
          break;
        default:
          startDate = startOfDay(subDays(new Date(), 7));
      }
      
      const data = await fetchCreatorAnalytics('mock-creator-id', startDate, endDate);
      setAnalytics(data);
      
      // Calculate summary metrics
      const totalViews = data.reduce((sum, item) => sum + item.views, 0);
      const totalLikes = data.reduce((sum, item) => sum + item.likes, 0);
      const totalShares = data.reduce((sum, item) => sum + item.shares, 0);
      const totalEarnings = data.reduce((sum, item) => sum + item.earnings, 0);
      
      setSummary({
        views: totalViews,
        likes: totalLikes,
        shares: totalShares,
        earnings: totalEarnings
      });
    } catch (err: any) {
      setError(err.message || "Failed to load analytics");
      console.error("Error loading creator analytics:", err);
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
