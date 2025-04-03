
import { supabase } from "@/integrations/supabase/client";

/**
 * Track content view with additional engagement metrics
 */
export const trackContentView = async (contentId: string, metadata = {}) => {
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
    
    // Track additional metadata about the view
    if (Object.keys(metadata).length > 0) {
      // Log engagement metadata for more detailed analytics
      const { error: metadataError } = await supabase
        .from('content_view_metadata')
        .insert({
          content_id: contentId,
          viewer_id: userId || '00000000-0000-0000-0000-000000000000',
          metadata
        });
      
      if (metadataError) console.error("Error logging view metadata:", metadataError);
    }
    
    return true;
  } catch (error) {
    console.error("Error tracking content view:", error);
    return false;
  }
};

/**
 * Track user engagement with content (likes, shares, etc.)
 */
export const trackEngagement = async (contentId: string, engagementType: 'like' | 'share' | 'comment', userId?: string) => {
  try {
    // Get current user if not provided
    if (!userId) {
      const { data: userData } = await supabase.auth.getUser();
      userId = userData.user?.id;
      
      if (!userId) {
        console.error("Cannot track engagement for unauthenticated user");
        return false;
      }
    }
    
    // Log the engagement
    const { error } = await supabase
      .from('content_engagements')
      .insert({
        content_id: contentId,
        user_id: userId,
        engagement_type: engagementType
      });
    
    if (error) throw error;
    
    // Update analytics aggregate tables based on engagement type
    const updateColumn = `${engagementType}s_count`;
    
    const { error: updateError } = await supabase
      .from('creator_content')
      .update({ [updateColumn]: supabase.rpc('increment_counter', { row_id: contentId, counter_name: updateColumn }) })
      .eq('id', contentId);
    
    if (updateError) throw updateError;
    
    return true;
  } catch (error) {
    console.error(`Error tracking ${engagementType}:`, error);
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
        views: summary.views + (item.views || 0),
        likes: summary.likes + (item.likes || 0),
        shares: summary.shares + (item.shares || 0),
        earnings: summary.earnings + (parseFloat(item.earnings?.toString() || '0')),
      };
    }, { views: 0, likes: 0, shares: 0, earnings: 0 });
  } catch (error) {
    console.error("Error getting analytics summary:", error);
    return { views: 0, likes: 0, shares: 0, earnings: 0 };
  }
};

/**
 * Get audience demographics data for a creator
 */
export const getAudienceDemographics = async (creatorId: string) => {
  try {
    // In a real implementation, this would query actual demographic data
    // For now, return mock data
    return {
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
  } catch (error) {
    console.error("Error getting audience demographics:", error);
    return { age: [], gender: [], location: [] };
  }
};

/**
 * Get content performance analytics
 */
export const getContentPerformance = async (creatorId: string, limit: number = 5) => {
  try {
    // Query top performing content
    const { data, error } = await supabase
      .from('creator_content')
      .select('id, title, thumbnail_url, views_count, likes_count, created_at')
      .eq('creator_id', creatorId)
      .order('views_count', { ascending: false })
      .limit(limit);
    
    if (error) throw error;
    
    if (data && data.length > 0) {
      return data;
    }
    
    // If no data, return mock data
    return Array.from({ length: limit }).map((_, i) => ({
      id: `mock-${i}`,
      title: `Top Content ${i + 1}`,
      thumbnail_url: `https://picsum.photos/seed/${i + 1}/300/200`,
      views_count: Math.floor(Math.random() * 1000) + 100,
      likes_count: Math.floor(Math.random() * 100) + 10,
      created_at: new Date(Date.now() - i * 86400000).toISOString()
    }));
  } catch (error) {
    console.error("Error getting content performance:", error);
    return [];
  }
};
