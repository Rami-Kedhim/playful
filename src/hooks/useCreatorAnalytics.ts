
import { useState, useEffect } from "react";
import { CreatorAnalytics } from "@/types/creator";
import { supabase } from "@/integrations/supabase/client";

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
        
        // Get current user
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          throw new Error("User not authenticated");
        }
        
        // Calculate date range based on period
        const endDate = new Date();
        const startDate = new Date();
        
        switch (period) {
          case 'week':
            startDate.setDate(endDate.getDate() - 7);
            break;
          case 'month':
            startDate.setDate(endDate.getDate() - 30);
            break;
          case 'year':
            startDate.setDate(endDate.getDate() - 365);
            break;
        }
        
        // Format dates for query
        const startDateStr = startDate.toISOString().split('T')[0];
        const endDateStr = endDate.toISOString().split('T')[0];
        
        // Fetch analytics data
        const { data, error: fetchError } = await supabase
          .from('creator_analytics')
          .select('*')
          .eq('creator_id', user.id)
          .gte('date', startDateStr)
          .lte('date', endDateStr)
          .order('date', { ascending: true });
        
        if (fetchError) {
          throw fetchError;
        }
        
        // Convert to CreatorAnalytics type and set to state
        const analyticsData = data as CreatorAnalytics[] || [];
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
        
        // Fallback to mock data for now during development
        const mockData = generateMockAnalyticsData(period);
        setAnalytics(mockData);
        
        // Calculate summary from mock data
        const summaryData = mockData.reduce((acc, item) => {
          return {
            views: acc.views + item.views,
            likes: acc.likes + item.likes,
            shares: acc.shares + item.shares,
            earnings: acc.earnings + item.earnings
          };
        }, { views: 0, likes: 0, shares: 0, earnings: 0 });
        
        setSummary(summaryData);
        
        setError(err.message || "Failed to load analytics data");
      } finally {
        setLoading(false);
      }
    };
    
    loadAnalytics();
  }, [period]);
  
  // Helper function to generate mock data during development
  const generateMockAnalyticsData = (period: 'week' | 'month' | 'year'): CreatorAnalytics[] => {
    let days: number;
    switch (period) {
      case 'week':
        days = 7;
        break;
      case 'month':
        days = 30;
        break;
      case 'year':
        days = 365;
        break;
      default:
        days = 7;
    }
    
    const now = new Date();
    const data: CreatorAnalytics[] = [];
    
    for (let i = 0; i < days; i++) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      
      data.push({
        date: date.toISOString().split('T')[0],
        views: Math.floor(Math.random() * 200) + 50,
        likes: Math.floor(Math.random() * 50) + 10,
        shares: Math.floor(Math.random() * 20) + 5,
        earnings: parseFloat((Math.random() * 20 + 5).toFixed(2))
      });
    }
    
    return data.reverse();
  };

  return {
    analytics,
    summary,
    loading,
    error
  };
};

export default useCreatorAnalytics;
