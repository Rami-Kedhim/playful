
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

/**
 * Fetch creator analytics
 */
export const fetchCreatorAnalytics = async (creatorId: string, period: string = 'month') => {
  try {
    let range;
    
    // Calculate date range based on period
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
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
    
    const { data, error } = await supabase
      .from('creator_analytics')
      .select('*')
      .eq('creator_id', creatorId)
      .gte('date', range.toISOString().split('T')[0])
      .order('date', { ascending: true });
      
    if (error) throw error;
    return data || [];
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
    const { error } = await supabase.rpc('track_content_view', {
      p_content_id: contentId,
      p_viewer_id: viewerId
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
    // Fetch total views
    const { data: viewsData, error: viewsError } = await supabase
      .from('creator_analytics')
      .select('views')
      .eq('creator_id', creatorId);
      
    if (viewsError) throw viewsError;
    
    // Fetch total earnings
    const { data: earningsData, error: earningsError } = await supabase
      .from('creator_analytics')
      .select('earnings')
      .eq('creator_id', creatorId);
      
    if (earningsError) throw earningsError;
    
    // Fetch content count
    const { count, error: contentError } = await supabase
      .from('creator_content')
      .select('*', { count: 'exact', head: true })
      .eq('creator_id', creatorId);
      
    if (contentError) throw contentError;
    
    // Calculate totals
    const totalViews = viewsData?.reduce((sum, item) => sum + (item.views || 0), 0) || 0;
    const totalEarnings = earningsData?.reduce((sum, item) => sum + (parseFloat(item.earnings) || 0), 0) || 0;
    
    return {
      totalViews,
      totalEarnings,
      contentCount: count || 0
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
