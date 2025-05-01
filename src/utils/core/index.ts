
// Consolidated core utilities

import { SystemStatus, AnalyticsData } from '@/types/shared';

// System status check utility
export const checkSystemStatus = async (): Promise<SystemStatus> => {
  // This would actually connect to backend services in a real implementation
  return {
    operational: true,
    lastUpdated: new Date(),
    latency: 120,
    aiModels: {
      conversation: 'active',
      generation: 'active',
      analysis: 'active',
    },
    metrics: {
      responseTime: 120,
      activeSessions: 53,
      processingLoad: 12
    }
  };
};

// Analytics aggregation utility
export const aggregateAnalytics = (data: Array<AnalyticsData>): AnalyticsData => {
  // Create initial result with proper structure for complex properties
  const result: AnalyticsData = {
    views: 0,
    impressions: {
      today: 0,
      yesterday: 0,
      weeklyAverage: 0,
      withBoost: 0
    },
    interactions: {
      today: 0,
      yesterday: 0,
      weeklyAverage: 0,
      withBoost: 0
    },
    rank: {
      current: 0,
      previous: 0,
      change: 0
    }
  };
  
  // Process data with proper type handling
  return data.reduce((acc, curr) => {
    // Handle simple number properties
    const views = (acc.views || 0) + (curr.views || 0);
    
    // Handle complex nested objects with proper merging
    const impressions = {
      today: (acc.impressions?.today || 0) + (curr.impressions?.today || 0),
      yesterday: (acc.impressions?.yesterday || 0) + (curr.impressions?.yesterday || 0),
      weeklyAverage: (acc.impressions?.weeklyAverage || 0) + (curr.impressions?.weeklyAverage || 0),
      withBoost: (acc.impressions?.withBoost || 0) + (curr.impressions?.withBoost || 0)
    };
    
    const interactions = {
      today: (acc.interactions?.today || 0) + (curr.interactions?.today || 0),
      yesterday: (acc.interactions?.yesterday || 0) + (curr.interactions?.yesterday || 0),
      weeklyAverage: (acc.interactions?.weeklyAverage || 0) + (curr.interactions?.weeklyAverage || 0),
      withBoost: (acc.interactions?.withBoost || 0) + (curr.interactions?.withBoost || 0)
    };
    
    // For rank, take the most recent values
    const rank = curr.rank || acc.rank;
    
    // Create an aggregated result that matches the AnalyticsData type
    return {
      views,
      impressions,
      interactions,
      rank,
      // Optional properties that may exist in some data points
      additionalViews: (acc.additionalViews || 0) + (curr.additionalViews || 0),
      engagementIncrease: (acc.engagementIncrease || 0) + (curr.engagementIncrease || 0),
      rankingPosition: curr.rankingPosition || acc.rankingPosition
    };
  }, result);
};

// Re-export any existing utilities that are still relevant
export * from '../navigation';
export * from '../boost';
