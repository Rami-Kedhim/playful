
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { getAnalyticsSummary } from "@/services/analyticsService";

export const useCreatorAnalytics = (period: string = 'week') => {
  const [analytics, setAnalytics] = useState({
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
        const summary = await getAnalyticsSummary(user.id, period);
        setAnalytics(summary);
      } catch (error) {
        console.error("Error fetching analytics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [user?.id, period]);

  return { analytics, loading };
};
