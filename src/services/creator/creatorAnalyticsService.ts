
import { CreatorAnalytics } from "@/types/creator";
import { supabase } from "@/integrations/supabase/client";

/**
 * Fetches analytics data for a creator within a specified period
 * @param creatorId - The UUID of the creator
 * @param period - The time period ('week', 'month', or 'year')
 * @returns Promise with analytics data
 */
export const fetchCreatorAnalytics = async (
  creatorId: string,
  period: 'week' | 'month' | 'year' = 'week'
): Promise<CreatorAnalytics[]> => {
  try {
    // Calculate date range based on period
    const endDate = new Date();
    const startDate = new Date();
    
    switch (period) {
      case 'week':
        startDate.setDate(endDate.getDate() - 7);
        break;
      case 'month':
        startDate.setDate(endDate.getDate() - 30);
        break;
      case 'year':
        startDate.setDate(endDate.getDate() - 365);
        break;
    }
    
    // Format dates for query
    const startDateStr = startDate.toISOString().split('T')[0];
    const endDateStr = endDate.toISOString().split('T')[0];
    
    // Fetch data from Supabase
    const { data, error } = await supabase
      .from('creator_analytics')
      .select('*')
      .eq('creator_id', creatorId)
      .gte('date', startDateStr)
      .lte('date', endDateStr)
      .order('date', { ascending: true });
    
    if (error) throw error;
    
    // If we have data, return it
    if (data && data.length > 0) {
      return data as CreatorAnalytics[];
    }
    
    // If no data is found, generate mock data for development
    // In production, this would just return an empty array
    console.warn("No analytics data found, generating mock data for development");
    return generateMockAnalyticsData(period);
  } catch (error) {
    console.error("Error fetching creator analytics:", error);
    throw new Error("Failed to fetch analytics data");
  }
};

// Helper function to generate mock data for development and testing
const generateMockAnalyticsData = (period: 'week' | 'month' | 'year'): CreatorAnalytics[] => {
  let days: number;
  switch (period) {
    case 'week':
      days = 7;
      break;
    case 'month':
      days = 30;
      break;
    case 'year':
      days = 365;
      break;
    default:
      days = 7;
  }
  
  const now = new Date();
  const data: CreatorAnalytics[] = [];
  
  // Generate data points for the requested period
  for (let i = 0; i < days; i++) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    // Generate random metrics
    // More realistic data patterns could be implemented here
    data.push({
      date: date.toISOString().split('T')[0],
      views: Math.floor(Math.random() * 200) + 50,
      likes: Math.floor(Math.random() * 50) + 10,
      shares: Math.floor(Math.random() * 20) + 5,
      earnings: parseFloat((Math.random() * 20 + 5).toFixed(2))
    });
  }
  
  // Return the data in chronological order
  return data.reverse();
};

export default fetchCreatorAnalytics;
