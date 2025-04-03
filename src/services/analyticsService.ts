
import { supabase } from "@/integrations/supabase/client";

export interface AnalyticsData {
  date: string;
  views: number;
  likes: number;
  shares: number;
  earnings: number;
}

export interface ContentViewData {
  content_id: string;
  views: number;
  unique_views: number;
  average_view_time: number;
  demographics: {
    age_groups: { range: string; percentage: number }[];
    locations: { country: string; percentage: number }[];
    gender: { type: string; percentage: number }[];
  };
}

export interface CreatorStats {
  followers: number;
  subscribers: number;
  premium_subscribers: number;
  total_content: number;
  total_earnings: number;
  growth_rate: number;
}

// Mock function for getting content view analytics
export const getContentViewAnalytics = async (
  contentId: string,
  period: string = "week"
): Promise<ContentViewData> => {
  // Return mock data
  return {
    content_id: contentId,
    views: Math.floor(Math.random() * 10000),
    unique_views: Math.floor(Math.random() * 5000),
    average_view_time: Math.floor(Math.random() * 300),
    demographics: {
      age_groups: [
        { range: "18-24", percentage: 25 },
        { range: "25-34", percentage: 35 },
        { range: "35-44", percentage: 20 },
        { range: "45-54", percentage: 12 },
        { range: "55+", percentage: 8 }
      ],
      locations: [
        { country: "United States", percentage: 40 },
        { country: "United Kingdom", percentage: 15 },
        { country: "Canada", percentage: 10 },
        { country: "Australia", percentage: 8 },
        { country: "Other", percentage: 27 }
      ],
      gender: [
        { type: "Male", percentage: 60 },
        { type: "Female", percentage: 35 },
        { type: "Other", percentage: 5 }
      ]
    }
  };
};

// Mock function for tracking content engagement (likes, comments, shares)
export const trackContentEngagement = async (
  contentId: string,
  userId: string,
  engagementType: "like" | "comment" | "share"
): Promise<boolean> => {
  // Mock successful tracking
  console.log(`Tracked ${engagementType} for content ${contentId} by user ${userId}`);
  return true;
};

// Mock function for logging content view
export const logContentView = async (
  contentId: string,
  userId: string,
  viewDuration: number
): Promise<boolean> => {
  try {
    // Just log to console for now
    console.log(`Logged view for content ${contentId} by user ${userId} for ${viewDuration} seconds`);
    return true;
  } catch (error) {
    console.error("Error logging content view:", error);
    return false;
  }
};

// Mock function for getting creator analytics
export const getCreatorAnalytics = async (
  creatorId: string,
  period: string = "week"
): Promise<AnalyticsData[]> => {
  const days = period === "week" ? 7 : period === "month" ? 30 : 365;
  
  // Generate mock data for the period
  const data: AnalyticsData[] = [];
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  
  for (let i = 0; i < days; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(currentDate.getDate() + i);
    
    data.push({
      date: currentDate.toISOString().split("T")[0],
      views: Math.floor(Math.random() * 1000),
      likes: Math.floor(Math.random() * 500),
      shares: Math.floor(Math.random() * 100),
      earnings: parseFloat((Math.random() * 100).toFixed(2))
    });
  }
  
  return data;
};

// Mock function for getting top performing content
export const getTopContent = async (
  creatorId: string,
  limit: number = 5
): Promise<{
  id: string;
  title: string;
  views: number;
  likes: number;
  earnings: number;
  thumbnail: string;
}[]> => {
  // Generate mock top content data
  const data = [];
  for (let i = 0; i < limit; i++) {
    data.push({
      id: `content-${i}`,
      title: `Top Performing Content ${i + 1}`,
      views: Math.floor(Math.random() * 5000),
      likes: Math.floor(Math.random() * 1000),
      earnings: parseFloat((Math.random() * 1000).toFixed(2)),
      thumbnail: `https://picsum.photos/seed/${i}/300/200`
    });
  }
  
  return data.sort((a, b) => b.views - a.views);
};

// Mock function for getting earnings data
export const getEarningsData = async (
  creatorId: string,
  period: string = "week"
): Promise<{
  total: number;
  breakdown: { source: string; amount: number }[];
  history: { date: string; amount: number }[];
}> => {
  const days = period === "week" ? 7 : period === "month" ? 30 : 365;
  
  // Generate mock earnings history
  const history = [];
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  
  let total = 0;
  for (let i = 0; i < days; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(currentDate.getDate() + i);
    const amount = parseFloat((Math.random() * 100).toFixed(2));
    total += amount;
    
    history.push({
      date: currentDate.toISOString().split("T")[0],
      amount
    });
  }
  
  // Generate mock breakdown
  const breakdown = [
    { source: "Subscriptions", amount: parseFloat((total * 0.6).toFixed(2)) },
    { source: "Tips", amount: parseFloat((total * 0.2).toFixed(2)) },
    { source: "Pay-per-view", amount: parseFloat((total * 0.15).toFixed(2)) },
    { source: "Other", amount: parseFloat((total * 0.05).toFixed(2)) }
  ];
  
  return {
    total: parseFloat(total.toFixed(2)),
    breakdown,
    history
  };
};
