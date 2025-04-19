
import { useState, useEffect } from 'react';

export function useAnalytics() {
  // Use the correct type - analytics as an object not array
  const [analytics, setAnalytics] = useState<{
    views: { total: number; change: string; trend: "up" | "down" | "neutral" };
    likes: { total: number; change: string; trend: "up" | "down" | "neutral" };
    revenue: { total: number; change: string; trend: "up" | "down" | "neutral" };
    subscribers: { total: number; change: string; trend: "up" | "down" | "neutral" };
    chartData: any[];
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fake async data load and error handling
    const fetchAnalytics = async () => {
      try {
        // mock data - replace with real fetching logic
        const data = {
          views: { total: 1000, change: "5%", trend: "up" },
          likes: { total: 200, change: "2%", trend: "up" },
          revenue: { total: 5000, change: "10%", trend: "up" },
          subscribers: { total: 150, change: "-1%", trend: "down" },
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
