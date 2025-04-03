
import { supabase } from "@/integrations/supabase/client";
import { format, subDays } from 'date-fns';

interface AnalyticsDataPoint {
  date: string;
  views: number;
  likes: number;
  shares: number;
  earnings: number;
}

// Function to get analytics data for a creator
export const getCreatorAnalytics = async (
  creatorId: string,
  startDate: Date,
  endDate: Date
): Promise<AnalyticsDataPoint[]> => {
  try {
    // Format dates for query
    const startDateStr = startDate.toISOString().split('T')[0];
    const endDateStr = endDate.toISOString().split('T')[0];
    
    // Query the creator_analytics table
    const { data, error } = await supabase
      .from('creator_analytics')
      .select('*')
      .eq('creator_id', creatorId)
      .gte('date', startDateStr)
      .lte('date', endDateStr)
      .order('date', { ascending: true });
    
    if (error) throw error;
    
    if (data && data.length > 0) {
      return data as AnalyticsDataPoint[];
    }
    
    // If no data found, return mock data for development purposes
    console.warn("No analytics data found, returning mock data");
    return generateMockAnalyticsData(startDate, endDate);
  } catch (error) {
    console.error("Error fetching creator analytics:", error);
    return generateMockAnalyticsData(startDate, endDate);
  }
};

// Helper function to generate mock data
const generateMockAnalyticsData = (startDate: Date, endDate: Date): AnalyticsDataPoint[] => {
  const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24));
  const result: AnalyticsDataPoint[] = [];
  
  for (let i = 0; i < days; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);
    
    // Generate some random data for this date
    result.push({
      date: format(currentDate, 'yyyy-MM-dd'),
      views: Math.floor(Math.random() * 1000),
      likes: Math.floor(Math.random() * 500),
      shares: Math.floor(Math.random() * 100),
      earnings: parseFloat((Math.random() * 100).toFixed(2))
    });
  }
  
  return result;
};

// Function to get content view analytics 
export const getContentViewAnalytics = async (
  creatorId: string,
  period: 'day' | 'week' | 'month' | 'year' = 'week'
): Promise<{ date: string; count: number }[]> => {
  try {
    // Calculate date range
    const today = new Date();
    let startDate: Date;
    
    switch (period) {
      case 'day':
        startDate = subDays(today, 1);
        break;
      case 'week':
        startDate = subDays(today, 7);
        break;
      case 'month':
        startDate = subDays(today, 30);
        break;
      case 'year':
        startDate = subDays(today, 365);
        break;
      default:
        startDate = subDays(today, 7);
    }
    
    // Format dates for query
    const startDateStr = startDate.toISOString().split('T')[0];
    const endDateStr = today.toISOString().split('T')[0];
    
    // Query the content_views table through a join with creator_content
    const { data, error } = await supabase
      .from('creator_content')
      .select(`
        id,
        content_views!inner(
          id,
          viewed_at
        )
      `)
      .eq('creator_id', creatorId)
      .gte('content_views.viewed_at', startDateStr)
      .lte('content_views.viewed_at', endDateStr);
    
    if (error) throw error;
    
    if (data && data.length > 0) {
      // Process the data to get counts by date
      // This would need to be implemented based on the actual data structure
      // For now, return mock data
      return generateMockViewData(period);
    }
    
    // If no data found, return mock data
    return generateMockViewData(period);
  } catch (error) {
    console.error("Error fetching content view analytics:", error);
    return generateMockViewData(period);
  }
};

// Helper function to generate mock view data
const generateMockViewData = (period: 'day' | 'week' | 'month' | 'year'): { date: string; count: number }[] => {
  let days: number;
  switch (period) {
    case 'day':
      days = 24; // 24 hours
      break;
    case 'week':
      days = 7;
      break;
    case 'month':
      days = 30;
      break;
    case 'year':
      days = 12; // 12 months
      break;
    default:
      days = 7;
  }
  
  const result = [];
  const today = new Date();
  
  for (let i = 0; i < days; i++) {
    const date = new Date(today);
    if (period === 'day') {
      date.setHours(today.getHours() - i);
      result.push({
        date: format(date, 'HH:00'),
        count: Math.floor(Math.random() * 100)
      });
    } else if (period === 'year') {
      date.setMonth(today.getMonth() - i);
      result.push({
        date: format(date, 'MMM'),
        count: Math.floor(Math.random() * 5000)
      });
    } else {
      date.setDate(today.getDate() - i);
      result.push({
        date: format(date, 'MMM dd'),
        count: Math.floor(Math.random() * 500)
      });
    }
  }
  
  // Return data in reverse order (oldest to newest)
  return result.reverse();
};

// Function to get revenue analytics
export const getRevenueAnalytics = async (
  creatorId: string,
  period: 'day' | 'week' | 'month' | 'year' = 'week'
): Promise<{ date: string; amount: number }[]> => {
  try {
    // This would be implemented similarly to the view analytics
    // For now, return mock data
    return generateMockRevenueData(period);
  } catch (error) {
    console.error("Error fetching revenue analytics:", error);
    return generateMockRevenueData(period);
  }
};

// Helper function for mock revenue data
const generateMockRevenueData = (period: 'day' | 'week' | 'month' | 'year'): { date: string; amount: number }[] => {
  // Implementation similar to mock view data
  let days: number;
  switch (period) {
    case 'day':
      days = 24;
      break;
    case 'week':
      days = 7;
      break;
    case 'month':
      days = 30;
      break;
    case 'year':
      days = 12;
      break;
    default:
      days = 7;
  }
  
  const result = [];
  const today = new Date();
  
  for (let i = 0; i < days; i++) {
    const date = new Date(today);
    if (period === 'day') {
      date.setHours(today.getHours() - i);
      result.push({
        date: format(date, 'HH:00'),
        amount: parseFloat((Math.random() * 50).toFixed(2))
      });
    } else if (period === 'year') {
      date.setMonth(today.getMonth() - i);
      result.push({
        date: format(date, 'MMM'),
        amount: parseFloat((Math.random() * 5000).toFixed(2))
      });
    } else {
      date.setDate(today.getDate() - i);
      result.push({
        date: format(date, 'MMM dd'),
        amount: parseFloat((Math.random() * 500).toFixed(2))
      });
    }
  }
  
  return result.reverse();
};

// Function to get content performance
export const getContentPerformance = async (
  creatorId: string,
  limit: number = 5
): Promise<any[]> => {
  try {
    // Query for top performing content
    const { data, error } = await supabase
      .from('creator_content')
      .select('*')
      .eq('creator_id', creatorId)
      .order('views_count', { ascending: false })
      .limit(limit);
    
    if (error) throw error;
    
    if (data && data.length > 0) {
      return data;
    }
    
    // If no data found, return mock data
    return Array(limit).fill(null).map((_, i) => ({
      id: `content-${i}`,
      title: `Content Item ${i + 1}`,
      type: i % 2 === 0 ? 'video' : 'image',
      views: Math.floor(Math.random() * 10000),
      likes: Math.floor(Math.random() * 5000),
      comments: Math.floor(Math.random() * 1000),
      revenue: parseFloat((Math.random() * 200).toFixed(2))
    }));
  } catch (error) {
    console.error("Error fetching content performance:", error);
    return [];
  }
};
