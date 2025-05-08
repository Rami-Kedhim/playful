
export interface CoreSystemStatus {
  operational: boolean;
  lastChecked: Date;
  version: string;
}

export interface RecommendedAction {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  type: 'optimization' | 'security' | 'visibility' | 'enhancement';
  actionUrl?: string;
  actionLabel?: string;
  completed?: boolean;
  icon?: string;
}

export interface ModerateContentParams {
  content: string;
  strictness?: number;
  type?: 'text' | 'image' | 'video' | 'audio';
  context?: string;
  contentType?: string; // Adding this to support the existing code
}

export interface AnalyticsData {
  additionalViews?: number;
  engagementIncrease?: number;
  rankingPosition?: number;
  views?: number;
  impressions: {
    today: number;
    yesterday: number;
    weeklyAverage: number;
    withBoost: number;
    withoutBoost?: number;
    increase?: number;
    change?: number;
  };
  interactions: {
    today: number;
    yesterday: number;
    weeklyAverage: number;
    withBoost: number;
    withoutBoost?: number;
    increase?: number;
    change?: number;
  };
  rank?: {
    current: number;
    previous: number;
    change: number;
  };
  conversionRate?: number;
  messageRate?: number;
  bookingRate?: number;
}
