
// Consolidated core utilities for UberEscorts ecosystem

import { SystemStatus, AnalyticsData, UberPersona } from '@/types/shared';

// Core system status check utility
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

// Profile visibility utility
export const calculateProfileVisibility = (
  profileId: string,
  boostScore: number,
  engagementRate: number
): number => {
  // In a real app, this would use complex algorithms
  // For now, provide a realistic calculation
  const baseVisibility = 40;
  const boostFactor = boostScore * 0.4;
  const engagementFactor = engagementRate * 0.2;
  
  return Math.min(Math.round(baseVisibility + boostFactor + engagementFactor), 100);
};

// Escort verification status checker
export const checkVerificationStatus = (persona: UberPersona): {
  isVerified: boolean;
  level: 'none' | 'basic' | 'enhanced' | 'premium';
  badges: string[];
} => {
  // Real implementation would check against verification database
  const isVerified = persona.isVerified || false;
  let level = 'none' as 'none' | 'basic' | 'enhanced' | 'premium';
  const badges: string[] = [];
  
  if (isVerified) {
    level = 'basic';
    badges.push('verified');
    
    // Additional badges based on profile data
    if (persona.tags && persona.tags.includes('premium')) {
      level = 'premium';
      badges.push('premium');
    } else if (persona.tags && persona.tags.includes('enhanced')) {
      level = 'enhanced';
      badges.push('enhanced');
    }
  }
  
  return {
    isVerified,
    level,
    badges
  };
};

// UBX token utility functions
export const formatUbxAmount = (amount: number): string => {
  return amount.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }) + ' UBX';
};

export const calculateUbxExchangeRate = (amount: number, currency: string = 'USD'): number => {
  // Mock exchange rate - in real app would get from API
  const rates: Record<string, number> = {
    USD: 0.1,
    EUR: 0.092,
    GBP: 0.078,
    JPY: 14.5
  };
  
  return amount * (rates[currency] || rates.USD);
};

// Re-export any existing utilities that are still relevant
export * from '../navigation';
export * from '../hermes';
export * from '../oxum';
