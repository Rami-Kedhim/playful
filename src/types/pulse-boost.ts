
export interface BoostPackage {
  id: string;
  name: string;
  description: string;
  price: number;
  price_ubx?: number;
  duration: string;
  durationMinutes?: number;
  visibility?: string | number;
  visibility_increase?: number;
  features?: string[];
  isMostPopular?: boolean;
  isPopular?: boolean;
  boost_power?: number;
  badgeColor?: string;
  color?: string;
  boostMultiplier?: number;
}

export interface BoostEligibility {
  eligible: boolean;
  reason: string;
  reasons?: string[];
  nextEligibleTime?: string;
}

export interface BoostStatus {
  isActive: boolean;
  packageId?: string;
  packageName?: string;
  startTime?: Date | string;
  endTime?: Date | string;
  remainingTime?: string;
  expiresAt?: Date | string;
  boostPackage?: BoostPackage;
  progress?: number;
  timeRemaining?: string;
}

export interface HermesStatus {
  position: number;
  activeUsers: number;
  estimatedVisibility: number;
  lastUpdateTime: string;
  boostScore?: number;
  effectivenessScore?: number;
  isActive?: boolean;
}

export interface BoostAnalytics {
  profileId: string;
  metrics: {
    impressions: number;
    clicks: number;
    conversion: number;
    visibility: number;
  };
  history: Array<{
    date: string;
    impressions: number;
    clicks: number;
  }>;
  totalBoosts?: number;
  activeBoosts?: number;
  averageBoostScore?: number;
  views?: number;
  impressions?: {
    value: number;
    change?: number;
    today?: number;
    yesterday?: number;
    withBoost?: number;
    withoutBoost?: number;
  };
  interactions?: {
    value: number;
    change?: number;
    today?: number;
    yesterday?: number;
    withBoost?: number;
    withoutBoost?: number;
  };
  additionalViews?: number;
}

export interface PulseBoost {
  id: string;
  profileId: string;
  packageId: string;
  startTime: Date;
  endTime: Date;
  status: 'active' | 'expired' | 'cancelled';
  metrics?: {
    impressions: number;
    clicks: number;
    conversion: number;
  };
  name: string;
  description: string;
  duration: string;
  price: number;
  price_ubx?: number;
  features: string[];
  isMostPopular?: boolean;
}

export interface EnhancedBoostStatus extends BoostStatus {
  packageName?: string;
  expiresAt?: Date;
  startedAt?: Date;
  timeRemaining?: string;
  progress?: number;
  boostPackage?: BoostPackage;
  packageId?: string;
  isActive: boolean;
  percentRemaining?: number;
  remainingMinutes?: number;
  isExpired?: boolean;
}

// Define analytics data for boost components
export interface AnalyticsData {
  totalBoosts: number;
  activeBoosts: number;
  averageBoostScore: number;
  views?: number;
  impressions?: {
    value: number;
    change?: number;
    today?: number;
    yesterday?: number;
    weeklyAverage?: number;
    withBoost?: number;
    withoutBoost?: number;
  };
  interactions?: {
    value: number;
    change?: number;
    today?: number;
    yesterday?: number;
    weeklyAverage?: number;
  };
  additionalViews?: number;
  engagementIncrease?: number;
  rankingPosition?: number;
}
