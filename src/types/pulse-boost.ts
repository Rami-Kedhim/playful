
export interface BoostPackage {
  id: string;
  name: string;
  description: string;
  price: number;
  price_ubx: number;
  duration: number;
  durationMinutes: number;
  features: string[];
  boostLevel: number;
  visibility: number;
  isMostPopular?: boolean;
  isPopular?: boolean;
  badgeColor?: string;
  popularity: 'low' | 'medium' | 'high';
}

export interface BoostStatus {
  isActive: boolean;
  expiresAt: string;
  remainingDays: number;
  boostLevel: number;
  isExpiring: boolean;
  packageName?: string;
  timeRemaining?: string;
  remainingTime?: string;
  packageId?: string;
  progress?: number;
  startTime?: string;
  endTime?: string;
  boostPackage?: BoostPackage;
}

export interface HermesStatus {
  score: number;
  recommendations: string[];
  lastUpdated: string;
  position?: number;
  activeUsers?: number;
  estimatedVisibility?: number;
  lastUpdateTime?: string;
  boostScore?: number;
  effectivenessScore?: number;
}

export interface BoostEligibility {
  eligible: boolean;
  reasons: string[];
  requirements: {
    profileCompletion: boolean;
    verification: boolean;
    mediaUploaded: boolean;
  };
}

export interface BoostAnalytics {
  totalBoosts: number;
  activeBoosts: number;
  averageBoostScore: number;
  views: number;
  impressions: {
    value: number;
    change: number;
    today?: number;
    yesterday?: number;
    weeklyAverage?: number;
    withBoost?: number;
    withoutBoost?: number;
    increase?: number;
  };
  interactions: {
    value: number;
    change: number;
    today?: number;
    yesterday?: number;
    weeklyAverage?: number;
    withBoost?: number;
    withoutBoost?: number;
    increase?: number;
  };
  additionalViews: number;
  engagementIncrease: number;
  rankingPosition: number;
}

export type { AnalyticsData } from './analytics';
