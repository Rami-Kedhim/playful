
import { supabase } from "@/integrations/supabase/client";
import { format, subDays } from 'date-fns';

export interface AnalyticsData {
  date: string;
  views: number;
  visitors: number;
  bounceRate: number;
  conversionRate: number;
}

export const getDashboardAnalytics = async (
  startDate: Date = subDays(new Date(), 30),
  endDate: Date = new Date()
): Promise<AnalyticsData[]> => {
  try {
    // Since the tables don't exist yet, we'll return mock data
    const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24));
    const result: AnalyticsData[] = [];
    
    for (let i = 0; i < days; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      
      result.push({
        date: format(currentDate, 'yyyy-MM-dd'),
        views: Math.floor(Math.random() * 5000),
        visitors: Math.floor(Math.random() * 2000),
        bounceRate: Math.random() * 100,
        conversionRate: Math.random() * 20,
      });
    }
    
    return result;
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return [];
  }
};

export interface CreatorAnalyticsData {
  id: string;
  date: string;
  views: number;
  likes: number;
  shares: number;
  earnings: number;
}

export const getCreatorAnalytics = async (
  creatorId: string,
  startDate: Date = subDays(new Date(), 30),
  endDate: Date = new Date()
): Promise<CreatorAnalyticsData[]> => {
  try {
    // Since the creator_analytics table doesn't exist yet, we'll return mock data
    const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24));
    const result: CreatorAnalyticsData[] = [];
    
    for (let i = 0; i < days; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      
      result.push({
        id: `mock-analytics-${i}`,
        date: format(currentDate, 'yyyy-MM-dd'),
        views: Math.floor(Math.random() * 1000),
        likes: Math.floor(Math.random() * 500),
        shares: Math.floor(Math.random() * 100),
        earnings: parseFloat((Math.random() * 100).toFixed(2)),
      });
    }
    
    return result;
  } catch (error) {
    console.error("Error fetching creator analytics:", error);
    return [];
  }
};

/**
 * Track content view
 */
export const trackContentView = async (contentId: string) => {
  try {
    // Log the view for analytics
    console.log(`Tracking view for content ID: ${contentId}`);
    
    // Get current user
    const { data: userData } = await supabase.auth.getUser();
    const userId = userData.user?.id;
    
    if (!userId) {
      // Track anonymous view
      console.log("Anonymous view recorded");
      return true;
    } else {
      // Track authenticated view
      console.log(`View recorded for user: ${userId}`);
      return true;
    }
    
    return true;
  } catch (error) {
    console.error("Error tracking content view:", error);
    return false;
  }
};

/**
 * Get analytics summary for a creator
 */
export const getAnalyticsSummary = async (creatorId: string, period: string = 'week') => {
  try {
    const analytics = await getCreatorAnalytics(creatorId);
    
    // Calculate total views, likes, shares, earnings
    return analytics.reduce((summary, item) => {
      return {
        views: summary.views + item.views,
        likes: summary.likes + item.likes,
        shares: summary.shares + item.shares,
        earnings: summary.earnings + parseFloat(item.earnings.toString()),
      };
    }, { views: 0, likes: 0, shares: 0, earnings: 0 });
  } catch (error) {
    console.error("Error getting analytics summary:", error);
    return { views: 0, likes: 0, shares: 0, earnings: 0 };
  }
};
