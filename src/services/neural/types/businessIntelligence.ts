
// Business Intelligence types
export interface RevenueMetric {
  id: string;
  source: string;
  amount: number;
  timestamp: number;
  timeframe: 'hourly' | 'daily' | 'weekly' | 'monthly';
}

export interface EngagementMetric {
  id: string;
  type: string;
  value: number;
  timestamp: number;
  details?: Record<string, any>;
}

export interface PlatformInsight {
  id: string;
  title: string;
  description: string;
  insightType: 'trend' | 'opportunity' | 'risk' | 'anomaly';
  impact: 'critical' | 'high' | 'medium' | 'low';
  confidence: number;
  source: string;
  timestamp: number;
  suggestedActions?: string[];
  relatedMetrics?: string[];
}

export interface RegionalPerformance {
  region: string;
  metrics: {
    revenue: number;
    userCount: number;
    conversionRate: number;
    engagementScore: number;
    contentCompliance: number;
  };
  trends: {
    revenueGrowth: number;
    userGrowth: number;
    conversionRateChange: number;
  };
}

export interface DashboardSummary {
  revenueToday: number;
  revenueGoals: {
    daily: number;
    weekly: number;
    monthly: number;
  };
  topInsights: PlatformInsight[];
  regionSummary: {
    region: string;
    revenue: number;
    growth: number;
  }[];
}

export interface AnalysisResult {
  ran: boolean;
  reason?: string;
  nextAvailableRun?: Date;
  insightsGenerated?: number;
  completedAt?: Date;
  insights?: PlatformInsight[];
}
