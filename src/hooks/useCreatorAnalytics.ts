
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/use-toast";

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
        // Since we don't have the actual tables in our database yet, we'll use mock data
        // Generate realistic-looking mock data based on the period
        let multiplier = 1;
        switch (period) {
          case 'month':
            multiplier = 4;
            break;
          case 'year':
            multiplier = 12;
            break;
          default: // week
            multiplier = 1;
        }
        
        // Generate mock data
        const mockData = {
          views: Math.floor(Math.random() * 10000) * multiplier,
          likes: Math.floor(Math.random() * 5000) * multiplier,
          shares: Math.floor(Math.random() * 1000) * multiplier,
          earnings: parseFloat((Math.random() * 1000 * multiplier).toFixed(2)),
        };
        
        setAnalytics(mockData);
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
