
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

// Define a detailed analytics object structure
interface AnalyticsSummary {
  views: number;
  likes: number;
  shares: number;
  earnings: number;
}

interface DailyAnalytics {
  date: string;
  views: number;
  likes: number;
  shares: number;
  earnings: number;
}

export const useCreatorAnalytics = (period: string = 'week') => {
  const [analytics, setAnalytics] = useState<AnalyticsSummary>({
    views: 0,
    likes: 0,
    shares: 0,
    earnings: 0,
  });
  const [analyticsHistory, setAnalyticsHistory] = useState<DailyAnalytics[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user?.id) return;

    const fetchAnalytics = async () => {
      setLoading(true);
      try {
        // Calculate date range based on period
        const today = new Date();
        let startDate = new Date();
        
        switch (period) {
          case 'week':
            startDate.setDate(today.getDate() - 7);
            break;
          case 'month':
            startDate.setMonth(today.getMonth() - 1);
            break;
          case 'year':
            startDate.setFullYear(today.getFullYear() - 1);
            break;
          default:
            startDate.setDate(today.getDate() - 7);
        }
        
        // Query the creator_analytics table
        const { data, error } = await supabase
          .from('creator_analytics')
          .select('date, views, likes, shares, earnings')
          .eq('creator_id', user.id)
          .gte('date', startDate.toISOString().split('T')[0])
          .lte('date', today.toISOString().split('T')[0])
          .order('date', { ascending: true });
        
        if (error) throw error;
        
        if (data && data.length > 0) {
          // Format data for charts
          const historyData = data.map(item => ({
            date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            views: item.views || 0,
            likes: item.likes || 0,
            shares: item.shares || 0,
            earnings: parseFloat(item.earnings) || 0,
          }));
          
          setAnalyticsHistory(historyData);
          
          // Aggregate the data for summary
          const summary = data.reduce((acc, item) => {
            return {
              views: acc.views + (item.views || 0),
              likes: acc.likes + (item.likes || 0),
              shares: acc.shares + (item.shares || 0),
              earnings: acc.earnings + (parseFloat(item.earnings) || 0),
            };
          }, { views: 0, likes: 0, shares: 0, earnings: 0 });
          
          setAnalytics(summary);
        } else {
          // If no data, use mock data for demonstration
          const mockData = generateMockAnalyticsData(startDate, today, period);
          setAnalyticsHistory(mockData);
          
          // Calculate summary from mock data
          const summary = mockData.reduce((acc, item) => {
            return {
              views: acc.views + item.views,
              likes: acc.likes + item.likes,
              shares: acc.shares + item.shares,
              earnings: acc.earnings + item.earnings,
            };
          }, { views: 0, likes: 0, shares: 0, earnings: 0 });
          
          setAnalytics(summary);
        }
      } catch (error) {
        console.error("Error fetching analytics:", error);
        toast({
          title: "Error fetching analytics",
          description: "Could not load your analytics data at this time.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [user?.id, period]);

  // Function to generate mock analytics data for demonstration
  const generateMockAnalyticsData = (startDate: Date, endDate: Date, period: string): DailyAnalytics[] => {
    const days = [];
    let currentDate = new Date(startDate);
    
    // Determine step size based on period to avoid too many data points
    let step = 1; // default to daily
    if (period === 'month') step = 2; // every other day
    if (period === 'year') step = 7; // weekly
    
    while (currentDate <= endDate) {
      days.push({
        date: currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        views: Math.floor(Math.random() * 100) + 10,
        likes: Math.floor(Math.random() * 50) + 5,
        shares: Math.floor(Math.random() * 20) + 2,
        earnings: parseFloat((Math.random() * 20 + 5).toFixed(2)),
      });
      
      currentDate.setDate(currentDate.getDate() + step);
    }
    
    return days;
  };

  return { analytics, analyticsHistory, loading };
};
