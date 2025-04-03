
import { supabase } from "@/integrations/supabase/client";
import { CreatorAnalytics } from "@/types/creator";
import { format, subDays } from 'date-fns';

/**
 * Fetch analytics data for a creator
 */
export const fetchCreatorAnalytics = async (
  creatorId: string,
  startDate: Date,
  endDate: Date
): Promise<CreatorAnalytics[]> => {
  try {
    // Get creator analytics from the database
    const { data, error } = await supabase
      .from('creator_analytics')
      .select('*')
      .eq('creator_id', creatorId)
      .gte('date', format(startDate, 'yyyy-MM-dd'))
      .lte('date', format(endDate, 'yyyy-MM-dd'))
      .order('date', { ascending: true });
    
    if (error) {
      console.error("Error fetching creator analytics:", error);
      throw error;
    }
    
    // If there's no data, generate mock data for the demo
    if (!data || data.length === 0) {
      // Generate daily data between startDate and endDate
      const daysBetween = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24));
      
      // Create mock analytics data
      return Array(daysBetween).fill(null).map((_, i) => {
        const date = new Date(startDate);
        date.setDate(date.getDate() + i);
        
        // Generate random data with some trends
        const baseViews = 100 + Math.floor(Math.random() * 150);
        const baseLikes = 20 + Math.floor(Math.random() * 50);
        const baseShares = 5 + Math.floor(Math.random() * 15);
        const baseEarnings = 10 + Math.random() * 40;
        
        // Weekend boost
        const dayOfWeek = date.getDay();
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
        const weekendMultiplier = isWeekend ? 1.5 : 1;
        
        // Recency boost (more recent days have slightly higher numbers)
        const recencyIndex = i / daysBetween;
        const recencyBoost = 1 + recencyIndex * 0.5;
        
        return {
          date: date.toISOString(),
          views: Math.floor(baseViews * weekendMultiplier * recencyBoost),
          likes: Math.floor(baseLikes * weekendMultiplier * recencyBoost),
          shares: Math.floor(baseShares * weekendMultiplier * recencyBoost),
          earnings: parseFloat((baseEarnings * weekendMultiplier * recencyBoost).toFixed(2))
        };
      });
    }
    
    // Transform database data to match our interface
    return data.map(item => ({
      date: item.date,
      views: item.views,
      likes: item.likes,
      shares: item.shares,
      earnings: parseFloat(item.earnings)
    }));
  } catch (error) {
    console.error("Error fetching creator analytics:", error);
    throw error;
  }
};
