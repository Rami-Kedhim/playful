
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/use-toast";

// Define a simple analytics object structure
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
        // Mocked analytics data - in a real app, this would call an API
        const mockData = {
          views: Math.floor(Math.random() * 10000),
          likes: Math.floor(Math.random() * 5000),
          shares: Math.floor(Math.random() * 1000),
          earnings: parseFloat((Math.random() * 1000).toFixed(2)),
        };
        
        // Simulate API latency
        await new Promise(resolve => setTimeout(resolve, 500));
        
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
