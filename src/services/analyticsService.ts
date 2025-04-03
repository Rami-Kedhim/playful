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
      const { error } = await supabase.rpc('log_content_view', { 
        content_id: contentId,
        viewer_id: '00000000-0000-0000-0000-000000000000' // Anonymous ID
      });
      
      if (error) throw error;
    } else {
      // Track authenticated view
      const { error } = await supabase.rpc('log_content_view', { 
        content_id: contentId,
        viewer_id: userId
      });
      
      if (error) throw error;
    }
    
    return true;
  } catch (error) {
    console.error("Error tracking content view:", error);
    return false;
  }
};

/**
 * Get analytics data for a creator
 */
export const getCreatorAnalytics = async (creatorId: string, period: string = 'week') => {
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
    
    // Query actual data from the database
    const { data, error } = await supabase
      .from('creator_analytics')
      .select('*')
      .eq('creator_id', creatorId)
      .gte('date', startDate.toISOString().split('T')[0])
      .lte('date', today.toISOString().split('T')[0])
      .order('date', { ascending: false });
    
    if (error) throw error;
    
    if (data && data.length > 0) {
      return data;
    }
    
    // If no data is found, return mock data
    const mockData = [];
    const todayDate = new Date();
    
    // Generate some sample data for the last 7-30 days depending on the period
    let days = period === 'week' ? 7 : 30;
    
    for (let i = 0; i < days; i++) {
      const date = new Date();
      date.setDate(todayDate.getDate() - i);
      
      mockData.push({
        date: date.toISOString().split('T')[0],
        views: Math.floor(Math.random() * 100),
        likes: Math.floor(Math.random() * 50),
        shares: Math.floor(Math.random() * 20),
        earnings: parseFloat((Math.random() * 100).toFixed(2))
      });
    }
    
    return mockData;
  } catch (error) {
    console.error("Error fetching creator analytics:", error);
    return [];
  }
};

/**
 * Get summary of analytics data for a creator
 */
export const getAnalyticsSummary = async (creatorId: string, period: string = 'week') => {
  try {
    const analytics = await getCreatorAnalytics(creatorId, period);
    
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
