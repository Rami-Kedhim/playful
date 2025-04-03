
import { supabase } from "@/integrations/supabase/client";

/**
 * Track content view
 */
export const trackContentView = async (contentId: string) => {
  try {
    // Use the server-side function we created
    const { error } = await supabase.rpc('track_content_view', { 
      p_content_id: contentId,
      p_viewer_id: (await supabase.auth.getUser()).data.user?.id
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
    let query = supabase
      .from('creator_analytics')
      .select('*')
      .eq('creator_id', creatorId);
    
    // Add date filtering based on period
    const today = new Date();
    let startDate: Date;
    
    switch (period) {
      case 'day':
        startDate = new Date(today);
        startDate.setDate(today.getDate() - 1);
        break;
      case 'week':
        startDate = new Date(today);
        startDate.setDate(today.getDate() - 7);
        break;
      case 'month':
        startDate = new Date(today);
        startDate.setMonth(today.getMonth() - 1);
        break;
      case 'year':
        startDate = new Date(today);
        startDate.setFullYear(today.getFullYear() - 1);
        break;
      default:
        startDate = new Date(today);
        startDate.setDate(today.getDate() - 7);
    }
    
    query = query.gte('date', startDate.toISOString().split('T')[0]);
    
    const { data, error } = await query.order('date', { ascending: false });
    
    if (error) throw error;
    return data;
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
        earnings: summary.earnings + parseFloat(item.earnings),
      };
    }, { views: 0, likes: 0, shares: 0, earnings: 0 });
  } catch (error) {
    console.error("Error getting analytics summary:", error);
    return { views: 0, likes: 0, shares: 0, earnings: 0 };
  }
};
