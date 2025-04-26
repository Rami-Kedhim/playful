
// Consolidated core utilities

import { SystemStatus, AnalyticsData } from '@/types/shared';

// System status check utility
export const checkSystemStatus = async (): Promise<SystemStatus> => {
  // This would actually connect to backend services in a real implementation
  return {
    operational: true,
    lastUpdated: new Date(),
    components: {
      core: { status: 'operational' },
      oxum: { status: 'operational' },
      hermes: { status: 'operational' },
      orus: { status: 'operational' },
      wallet: { status: 'operational' },
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
  return data.reduce((acc, curr) => {
    return {
      views: acc.views + curr.views,
      interactions: acc.interactions + curr.interactions,
      conversions: acc.conversions + curr.conversions,
      boostEffectiveness: (acc.boostEffectiveness || 0) + (curr.boostEffectiveness || 0),
      engagementRate: (acc.engagementRate || 0) + (curr.engagementRate || 0),
    };
  }, {
    views: 0,
    interactions: 0,
    conversions: 0,
    boostEffectiveness: 0,
    engagementRate: 0
  });
};

// Re-export any existing utilities that are still relevant
export * from '../navigation';
export * from '../boost';
