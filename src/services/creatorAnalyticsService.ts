
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

/**
 * Fetch creator analytics for a given period
 */
export const fetchCreatorAnalytics = async (creatorId: string, period: string = 'month') => {
  try {
    // Calculate date range based on period
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    let range;
    
    switch (period) {
      case 'week':
        range = new Date(today);
        range.setDate(today.getDate() - 7);
        break;
      case 'month':
        range = new Date(today);
        range.setMonth(today.getMonth() - 1);
        break;
      case 'year':
        range = new Date(today);
        range.setFullYear(today.getFullYear() - 1);
        break;
      default:
        range = new Date(today);
        range.setMonth(today.getMonth() - 1);
    }
    
    // Try to fetch real analytics data
    const { data, error } = await supabase
      .from('creator_analytics')
      .select('*')
      .eq('creator_id', creatorId)
      .gte('date', range.toISOString().split('T')[0])
      .lte('date', today.toISOString().split('T')[0])
      .order('date', { ascending: true });
    
    if (error) throw error;
    
    // If we have real data, use it
    if (data && data.length > 0) {
      return data;
    }
    
    // Mock data for now - in a real implementation, this would query from the database
    const mockData = [];
    for (let d = new Date(range); d <= today; d.setDate(d.getDate() + 1)) {
      mockData.push({
        date: new Date(d).toISOString().split('T')[0],
        views: Math.floor(Math.random() * 100) + 1,
        likes: Math.floor(Math.random() * 50),
        shares: Math.floor(Math.random() * 25),
        earnings: parseFloat((Math.random() * 10).toFixed(2))
      });
    }
    
    return mockData;
  } catch (error: any) {
    console.error("Error fetching creator analytics:", error);
    toast({
      title: "Error",
      description: "Failed to load analytics data",
      variant: "destructive"
    });
    return [];
  }
};

/**
 * Track content view
 */
export const trackContentView = async (contentId: string, viewerId: string) => {
  try {
    // In a real implementation, this would insert a record into a content_views table
    console.log(`Tracking view for content ${contentId} by viewer ${viewerId}`);
    
    // Call our RPC function
    const { error } = await supabase.rpc('log_content_view', {
      content_id: contentId,
      viewer_id: viewerId
    });
    
    if (error) throw error;
    return true;
  } catch (error: any) {
    console.error("Error tracking content view:", error);
    return false;
  }
};

/**
 * Get creator summary statistics
 */
export const getCreatorSummaryStats = async (creatorId: string) => {
  try {
    // Attempt to get real data
    const { data: viewsData, error: viewsError } = await supabase
      .from('creator_content')
      .select('views_count')
      .eq('creator_id', creatorId);
    
    if (viewsError) throw viewsError;
    
    // Calculate total views if we have data
    const totalViews = viewsData?.length 
      ? viewsData.reduce((sum, item) => sum + (item.views_count || 0), 0)
      : Math.floor(Math.random() * 10000) + 500;
    
    // Get earnings data
    const { data: earningsData, error: earningsError } = await supabase
      .from('creator_analytics')
      .select('earnings')
      .eq('creator_id', creatorId);
    
    if (earningsError) throw earningsError;
    
    // Calculate total earnings if we have data
    const totalEarnings = earningsData?.length 
      ? earningsData.reduce((sum, item) => sum + parseFloat(item.earnings || 0), 0)
      : parseFloat((Math.random() * 5000).toFixed(2));
    
    // Count content items
    const { count, error: countError } = await supabase
      .from('creator_content')
      .select('id', { count: 'exact' })
      .eq('creator_id', creatorId);
    
    if (countError) throw countError;
    
    // Use count or fallback to random
    const contentCount = count || Math.floor(Math.random() * 50) + 5;
    
    return {
      totalViews,
      totalEarnings,
      contentCount
    };
  } catch (error: any) {
    console.error("Error fetching creator summary stats:", error);
    toast({
      title: "Error",
      description: "Failed to load creator statistics",
      variant: "destructive"
    });
    return {
      totalViews: 0,
      totalEarnings: 0,
      contentCount: 0
    };
  }
};
