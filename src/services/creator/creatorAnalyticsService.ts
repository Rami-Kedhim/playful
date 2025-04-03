
import { format } from 'date-fns';
import { toast } from "@/components/ui/use-toast";
import { CreatorAnalytics } from "@/types/creator";

/**
 * Fetch analytics data for a creator
 */
export const fetchCreatorAnalytics = async (creatorId: string, startDate: Date, endDate: Date): Promise<CreatorAnalytics[]> => {
  // Use mock data since the table doesn't exist yet
  const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24));
  const result: CreatorAnalytics[] = [];
  
  for (let i = 0; i < days; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);
    
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
