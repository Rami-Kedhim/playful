
import { supabase } from "@/integrations/supabase/client";

/**
 * Track content view
 */
export const trackContentView = async (contentId: string) => {
  try {
    // Log the view for analytics
    console.log(`Tracking view for content ID: ${contentId}`);
    
    // Track the view via content_views table
    const { error } = await supabase
      .from('content_views')
      .insert({ 
        content_id: contentId,
        user_id: (await supabase.auth.getUser()).data.user?.id 
      });
    
    if (error) throw error;
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
    // For now, return mock data
    // In a real implementation this would query the analytics tables
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
