
import { CreatorAnalytics } from "@/types/creator";

export const fetchCreatorAnalytics = async (
  creatorId: string,
  period: 'week' | 'month' | 'year' = 'week'
): Promise<CreatorAnalytics[]> => {
  try {
    // In a real application, this would be a call to your backend API
    // For this example, we'll generate mock data
    
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
  } catch (error) {
    console.error("Error fetching creator analytics:", error);
    throw new Error("Failed to fetch analytics data");
  }
};

export default fetchCreatorAnalytics;
