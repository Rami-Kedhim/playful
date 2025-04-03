
import { supabase } from "@/integrations/supabase/client";
import { CreatorAnalytics } from "@/types/creator";

/**
 * Fetch analytics data for a creator
 */
export const fetchCreatorAnalytics = async (
  creatorId: string,
  period: 'week' | 'month' | 'year' = 'week'
): Promise<CreatorAnalytics[]> => {
  try {
    let startDate: Date;
    const now = new Date();
    
    // Determine start date based on period
    switch (period) {
      case 'week':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case 'month':
        startDate = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
        break;
      case 'year':
        startDate = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
        break;
      default:
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    }
    
    // Convert dates to ISO string for database query
    const startDateStr = startDate.toISOString().split('T')[0];
    const endDateStr = now.toISOString().split('T')[0];
    
    // Query analytics from Supabase
    const { data, error } = await supabase
      .from('creator_analytics')
      .select('*')
      .eq('creator_id', creatorId)
      .gte('date', startDateStr)
      .lte('date', endDateStr)
      .order('date', { ascending: true });
    
    if (error) {
      console.error("Error fetching creator analytics:", error);
      throw error;
    }
    
    // If no data found, return mock data
    if (!data || data.length === 0) {
      console.log("No analytics data found for creator, generating mock data");
      return generateMockAnalytics(startDate, now);
    }
    
    // Convert Supabase data to CreatorAnalytics type
    return data.map(item => ({
      date: item.date,
      views: item.views,
      likes: item.likes,
      shares: item.shares,
      earnings: item.earnings,
    }));
  } catch (error) {
    console.error("Error fetching creator analytics:", error);
    return generateMockAnalytics(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), new Date());
  }
};

// Helper to generate mock analytics data
const generateMockAnalytics = (startDate: Date, endDate: Date): CreatorAnalytics[] => {
  const data: CreatorAnalytics[] = [];
  let currentDate = new Date(startDate);
  
  while (currentDate <= endDate) {
    data.push({
      date: currentDate.toISOString().split('T')[0], // Convert to 'YYYY-MM-DD' format
      views: Math.floor(Math.random() * 500) + 50,
      likes: Math.floor(Math.random() * 200) + 10,
      shares: Math.floor(Math.random() * 50) + 5,
      earnings: parseFloat((Math.random() * 50 + 5).toFixed(2)),
    });
    
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return data;
};
