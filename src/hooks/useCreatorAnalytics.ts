
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

export const useCreatorAnalytics = (period: string = 'week') => {
  const [analytics, setAnalytics] = useState<AnalyticsSummary>({
    views: 0,
    likes: 0,
    shares: 0,
    earnings: 0,
  });
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
          .select('views, likes, shares, earnings')
          .eq('creator_id', user.id)
          .gte('date', startDate.toISOString().split('T')[0])
          .lte('date', today.toISOString().split('T')[0]);
        
        if (error) throw error;
        
        if (data && data.length > 0) {
          // Aggregate the data
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
          const mockData = {
            views: Math.floor(Math.random() * 10000),
            likes: Math.floor(Math.random() * 5000),
            shares: Math.floor(Math.random() * 1000),
            earnings: parseFloat((Math.random() * 1000).toFixed(2)),
          };
          
          setAnalytics(mockData);
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

  return { analytics, loading };
};
