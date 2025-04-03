
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/use-toast";

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
        // For now, let's use mocked data since we don't have the actual Supabase tables

        // Mock analytics summary
        const summaryData = {
          views: Math.floor(Math.random() * 10000) + 1000,
          likes: Math.floor(Math.random() * 5000) + 500,
          shares: Math.floor(Math.random() * 2000) + 200,
          earnings: parseFloat((Math.random() * 1000 + 100).toFixed(2))
        };
        setAnalytics(summaryData);
        
        // Mock analytics history
        const days = period === 'week' ? 7 : period === 'month' ? 30 : 365;
        const historyData = Array.from({ length: days }).map((_, i) => {
          const date = new Date();
          date.setDate(date.getDate() - i);
          
          return {
            date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            views: Math.floor(Math.random() * 500) + 50,
            likes: Math.floor(Math.random() * 200) + 20,
            shares: Math.floor(Math.random() * 50) + 5,
            earnings: parseFloat((Math.random() * 50 + 5).toFixed(2))
          };
        }).reverse();
        
        setAnalyticsHistory(historyData);
        
        // Mock demographics data
        const demographicsData = {
          age: [
            { group: '18-24', percentage: 35 },
            { group: '25-34', percentage: 40 },
            { group: '35-44', percentage: 15 },
            { group: '45-54', percentage: 7 },
            { group: '55+', percentage: 3 }
          ],
          gender: [
            { type: 'Male', percentage: 65 },
            { type: 'Female', percentage: 32 },
            { type: 'Other', percentage: 3 }
          ],
          location: [
            { country: 'United States', percentage: 45 },
            { country: 'United Kingdom', percentage: 15 },
            { country: 'Canada', percentage: 12 },
            { country: 'Australia', percentage: 8 },
            { country: 'Germany', percentage: 5 },
            { country: 'Other', percentage: 15 }
          ]
        };
        setDemographics(demographicsData);
        
        // Mock top content data
        const contentData: ContentPerformance[] = Array.from({ length: 5 }).map((_, i) => ({
          id: `mock-${i}`,
          title: `Top Content ${i + 1}`,
          thumbnail_url: `https://picsum.photos/seed/${i + 1}/300/200`,
          views_count: Math.floor(Math.random() * 1000) + 100,
          likes_count: Math.floor(Math.random() * 100) + 10,
          created_at: new Date(Date.now() - i * 86400000).toISOString()
        }));
        
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
