
import { useState, useEffect } from 'react';

type TrendType = "up" | "down" | "neutral";

export function useAnalytics() {
  // Correct type for analytics state
  const [analytics, setAnalytics] = useState<{
    views: { total: number; change: string; trend: TrendType };
    likes: { total: number; change: string; trend: TrendType };
    revenue: { total: number; change: string; trend: TrendType };
    subscribers: { total: number; change: string; trend: TrendType };
    chartData: any[];
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fake async data load and error handling
    const fetchAnalytics = async () => {
      try {
        // mock data with explicit literal types for trend
        const data = {
          views: { total: 1000, change: "5%", trend: "up" as TrendType },
          likes: { total: 200, change: "2%", trend: "up" as TrendType },
          revenue: { total: 5000, change: "10%", trend: "up" as TrendType },
          subscribers: { total: 150, change: "-1%", trend: "down" as TrendType },
          chartData: []
        };
        setAnalytics(data);
        setLoading(false);
      } catch (e) {
        setError("Failed to load analytics");
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  return { analytics, loading, error };
}

export default useAnalytics;
