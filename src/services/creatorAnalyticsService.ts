
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
    // Since the creator_analytics table doesn't exist, return mock data
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
  } catch (error) {
    console.error("Error fetching creator analytics:", error);
    return [];
  }
};

// Function to get content view analytics 
export const getContentViewAnalytics = async (
  creatorId: string,
  period: 'day' | 'week' | 'month' | 'year' = 'week'
): Promise<{ date: string; count: number }[]> => {
  try {
    // Generate mock data based on period
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
  } catch (error) {
    console.error("Error fetching content view analytics:", error);
    return [];
  }
};

// Function to get revenue analytics
export const getRevenueAnalytics = async (
  creatorId: string,
  period: 'day' | 'week' | 'month' | 'year' = 'week'
): Promise<{ date: string; amount: number }[]> => {
  try {
    // Generate mock data based on period
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
    
    // Return data in reverse order (oldest to newest)
    return result.reverse();
  } catch (error) {
    console.error("Error fetching revenue analytics:", error);
    return [];
  }
};

// Function to get content performance
export const getContentPerformance = async (
  creatorId: string,
  limit: number = 5
): Promise<any[]> => {
  try {
    // Return mock data for content performance
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
