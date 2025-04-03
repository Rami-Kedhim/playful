
import { supabase } from "@/integrations/supabase/client";

export interface CreatorAnalyticsData {
  views: number;
  likes: number;
  comments: number;
  shares: number;
  earnings: number;
  followers: number;
  subscribers: number;
  time_period: string;
}

export interface EngagementData {
  date: string;
  views: number;
  likes: number;
  comments: number;
  shares: number;
}

export interface DemographicsData {
  age: { group: string; percentage: number }[];
  gender: { type: string; percentage: number }[];
  location: { country: string; count: number }[];
}

export interface ContentPerformance {
  id: string;
  title: string;
  thumbnail: string;
  views: number;
  likes: number;
  comments: number;
  earnings: number;
  created_at: string;
}

// Get overall analytics for a creator
export const getCreatorAnalytics = async (
  creatorId: string,
  timePeriod: string = "week"
): Promise<CreatorAnalyticsData> => {
  try {
    // Return mock data for now
    return {
      views: Math.floor(Math.random() * 10000) + 1000,
      likes: Math.floor(Math.random() * 5000) + 500,
      comments: Math.floor(Math.random() * 3000) + 300,
      shares: Math.floor(Math.random() * 1000) + 100,
      earnings: parseFloat((Math.random() * 1000 + 100).toFixed(2)),
      followers: Math.floor(Math.random() * 1000) + 100,
      subscribers: Math.floor(Math.random() * 500) + 50,
      time_period: timePeriod
    };
  } catch (error) {
    console.error("Error fetching creator analytics:", error);
    throw error;
  }
};

// Get historical engagement data
export const getEngagementHistory = async (
  creatorId: string,
  timePeriod: string = "week"
): Promise<EngagementData[]> => {
  try {
    const days = timePeriod === "week" ? 7 : timePeriod === "month" ? 30 : 365;
    const data: EngagementData[] = [];
    
    // Generate mock data
    const now = new Date();
    for (let i = 0; i < days; i++) {
      const date = new Date(now);
      date.setDate(date.getDate() - (days - i - 1));
      
      data.push({
        date: date.toISOString().split("T")[0],
        views: Math.floor(Math.random() * 1000) + 100,
        likes: Math.floor(Math.random() * 500) + 50,
        comments: Math.floor(Math.random() * 300) + 30,
        shares: Math.floor(Math.random() * 100) + 10
      });
    }
    
    return data;
  } catch (error) {
    console.error("Error fetching engagement history:", error);
    throw error;
  }
};

// Get audience demographics
export const getAudienceDemographics = async (
  creatorId: string
): Promise<DemographicsData> => {
  try {
    // Return mock demographics data
    return {
      age: [
        { group: "18-24", percentage: 28 },
        { group: "25-34", percentage: 35 },
        { group: "35-44", percentage: 20 },
        { group: "45-54", percentage: 12 },
        { group: "55+", percentage: 5 }
      ],
      gender: [
        { type: "Male", percentage: 65 },
        { type: "Female", percentage: 32 },
        { type: "Other", percentage: 3 }
      ],
      location: [
        { country: "United States", count: 450 },
        { country: "United Kingdom", count: 220 },
        { country: "Canada", count: 180 },
        { country: "Australia", count: 120 },
        { country: "Germany", count: 100 },
        { country: "France", count: 80 },
        { country: "Other", count: 350 }
      ]
    };
  } catch (error) {
    console.error("Error fetching audience demographics:", error);
    throw error;
  }
};

// Track content view
export const trackContentView = async (
  contentId: string,
  userId: string,
  viewDuration: number
): Promise<boolean> => {
  try {
    // Mock successful tracking
    console.log(`Tracked view for content ${contentId} by user ${userId} for ${viewDuration} seconds`);
    return true;
  } catch (error) {
    console.error("Error tracking content view:", error);
    return false;
  }
};

// Get top performing content
export const getTopPerformingContent = async (
  creatorId: string,
  limit: number = 5
): Promise<ContentPerformance[]> => {
  try {
    // Generate mock data
    const content: ContentPerformance[] = [];
    for (let i = 0; i < limit; i++) {
      content.push({
        id: `content-${i}`,
        title: `Top Content ${i + 1}`,
        thumbnail: `https://picsum.photos/seed/${i}/300/200`,
        views: Math.floor(Math.random() * 5000) + 500,
        likes: Math.floor(Math.random() * 1000) + 100,
        comments: Math.floor(Math.random() * 500) + 50,
        earnings: parseFloat((Math.random() * 500 + 50).toFixed(2)),
        created_at: new Date(Date.now() - Math.floor(Math.random() * 30) * 86400000).toISOString()
      });
    }
    
    return content.sort((a, b) => b.views - a.views);
  } catch (error) {
    console.error("Error fetching top performing content:", error);
    throw error;
  }
};

// Get earnings analytics
export const getEarningsAnalytics = async (
  creatorId: string,
  timePeriod: string = "week"
): Promise<{
  total: number;
  previous: number;
  breakdown: { source: string; amount: number }[];
  daily: { date: string; amount: number }[];
}> => {
  try {
    const days = timePeriod === "week" ? 7 : timePeriod === "month" ? 30 : 365;
    const total = parseFloat((Math.random() * 5000 + 500).toFixed(2));
    const previous = parseFloat((total * (0.8 + Math.random() * 0.4)).toFixed(2));
    
    // Generate daily data
    const daily = [];
    const now = new Date();
    for (let i = 0; i < days; i++) {
      const date = new Date(now);
      date.setDate(date.getDate() - (days - i - 1));
      
      daily.push({
        date: date.toISOString().split("T")[0],
        amount: parseFloat((Math.random() * 200 + 20).toFixed(2))
      });
    }
    
    // Generate breakdown
    const breakdown = [
      { source: "Subscriptions", amount: parseFloat((total * 0.6).toFixed(2)) },
      { source: "Tips", amount: parseFloat((total * 0.2).toFixed(2)) },
      { source: "Pay-per-view", amount: parseFloat((total * 0.15).toFixed(2)) },
      { source: "Other", amount: parseFloat((total * 0.05).toFixed(2)) }
    ];
    
    return {
      total,
      previous,
      breakdown,
      daily
    };
  } catch (error) {
    console.error("Error fetching earnings analytics:", error);
    throw error;
  }
};

// Get subscription analytics
export const getSubscriptionAnalytics = async (
  creatorId: string,
  timePeriod: string = "week"
): Promise<{
  total: number;
  new: number;
  canceled: number;
  churn_rate: number;
  daily: { date: string; total: number; new: number; canceled: number }[];
}> => {
  try {
    const days = timePeriod === "week" ? 7 : timePeriod === "month" ? 30 : 365;
    const total = Math.floor(Math.random() * 500) + 100;
    const newSubs = Math.floor(Math.random() * 50) + 10;
    const canceled = Math.floor(Math.random() * 20) + 5;
    const churn_rate = parseFloat((canceled / total * 100).toFixed(2));
    
    // Generate daily data
    const daily = [];
    const now = new Date();
    let runningTotal = total - newSubs + canceled;
    
    for (let i = 0; i < days; i++) {
      const date = new Date(now);
      date.setDate(date.getDate() - (days - i - 1));
      
      const dailyNew = Math.floor(Math.random() * 10) + 1;
      const dailyCanceled = Math.floor(Math.random() * 5);
      runningTotal = runningTotal + dailyNew - dailyCanceled;
      
      daily.push({
        date: date.toISOString().split("T")[0],
        total: runningTotal,
        new: dailyNew,
        canceled: dailyCanceled
      });
    }
    
    return {
      total,
      new: newSubs,
      canceled,
      churn_rate,
      daily
    };
  } catch (error) {
    console.error("Error fetching subscription analytics:", error);
    throw error;
  }
};
