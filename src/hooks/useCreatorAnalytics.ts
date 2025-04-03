
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/use-toast";
import { 
  getCreatorAnalytics, 
  getAnalyticsSummary, 
  getAudienceDemographics,
  getContentPerformance
} from "@/services/analyticsService";

// Define detailed analytics object structures
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

interface AudienceDemographics {
  age: { group: string; percentage: number }[];
  gender: { type: string; percentage: number }[];
  location: { country: string; percentage: number }[];
}

interface ContentPerformance {
  id: string;
  title: string;
  thumbnail_url: string;
  views_count: number;
  likes_count: number;
  created_at: string;
}

export const useCreatorAnalytics = (period: string = 'week') => {
  const [analytics, setAnalytics] = useState<AnalyticsSummary>({
    views: 0,
    likes: 0,
    shares: 0,
    earnings: 0,
  });
  const [analyticsHistory, setAnalyticsHistory] = useState<DailyAnalytics[]>([]);
  const [demographics, setDemographics] = useState<AudienceDemographics>({
    age: [],
    gender: [],
    location: []
  });
  const [topContent, setTopContent] = useState<ContentPerformance[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user?.id) return;

    const fetchAnalytics = async () => {
      setLoading(true);
      try {
        // Get analytics summary data
        const summaryData = await getAnalyticsSummary(user.id, period);
        setAnalytics(summaryData);
        
        // Get detailed analytics history
        const historyData = await getCreatorAnalytics(user.id, period);
        
        // Format data for charts
        const formattedHistory = historyData.map(item => ({
          date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          views: item.views || 0,
          likes: item.likes || 0,
          shares: item.shares || 0,
          earnings: parseFloat(item.earnings?.toString() || '0'),
        }));
        
        setAnalyticsHistory(formattedHistory);
        
        // Get audience demographics
        const demographicsData = await getAudienceDemographics(user.id);
        setDemographics(demographicsData);
        
        // Get top performing content
        const contentData = await getContentPerformance(user.id, 5);
        setTopContent(contentData);
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

  return { 
    analytics, 
    analyticsHistory, 
    demographics, 
    topContent, 
    loading 
  };
};
