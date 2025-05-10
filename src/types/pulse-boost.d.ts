
export interface BoostPackage {
  id: string;
  name: string;
  description: string;
  price: number;
  price_ubx: number;
  duration: string;
  durationMinutes: number;
  features: string[];
  visibility: string;
  visibility_increase: number;
  color?: string;
  badgeColor?: string;
  boost_power?: number;
  boostMultiplier?: number;
  isMostPopular?: boolean;
}

export interface BoostStatus {
  isActive: boolean;
  packageId?: string;
  expiresAt?: Date | string;
  timeRemaining: string;
  boostPackage?: BoostPackage;
  progress?: number;
  packageName?: string;
  startedAt?: Date | string;
  activeBoostId?: string;
  startTime?: Date | string;
  endTime?: Date | string;
  isExpiring?: boolean;
  remainingTime?: string;
  boostLevel?: number;
}

export interface BoostEligibility {
  eligible: boolean;
  isEligible?: boolean;
  reason?: string;
  reasons: string[];
  nextEligibleTime?: string | Date;
  remainingBoosts?: number;
  maxBoostsPerDay?: number;
}

export interface BoostPurchaseRequest {
  profileId: string;
  packageId: string;
}

export interface BoostPurchaseResult {
  success: boolean;
  boostId?: string;
  error?: string | null;
  message?: string;
}

export interface HermesStatus {
  score?: number;
  position?: number;
  estimatedVisibility?: number;
  recommendations?: string[];
  lastUpdated?: Date;
  boostScore?: number;
  effectivenessScore?: number;
  isActive?: boolean;
  activeUsers?: number;
  lastUpdateTime?: string;
}

export interface UserBoost {
  id: string;
  profileId?: string;
  packageId?: string;
  startTime?: Date;
  endTime?: Date;
  status?: string;
}

export interface BoostAnalytics {
  totalBoosts: number;
  activeBoosts: number;
  averageBoostScore: number;
  boostHistory: Array<{
    date: Date;
    score: number;
  }>;
  additionalViews?: number;
  engagementIncrease?: number;
  rankingPosition?: number;
  views?: number;
  impressions?: {
    value: number;
    change?: number;
  };
  interactions?: {
    value: number;
    change?: number;
  };
}

export interface AnalyticsData {
  additionalViews?: number;
  engagementIncrease?: number;
  rankingPosition?: number;
  views?: number;
  impressions?: {
    today?: number;
    yesterday?: number;
    weeklyAverage?: number;
    withBoost?: number;
    withoutBoost?: number;
    increase?: number;
    change?: number;
    value?: number;
  };
  interactions?: {
    today?: number;
    yesterday?: number;
    weeklyAverage?: number;
    withBoost?: number;
    withoutBoost?: number;
    increase?: number;
    change?: number;
    value?: number;
  };
  rank?: {
    current?: number;
    previous?: number;
    change?: number;
  };
  conversionRate?: number;
  messageRate?: number;
  bookingRate?: number;
}

export interface BoostScoreResult {
  score: number;
  recommendations?: string[];
}

// Define EnhancedBoostStatus as an interface that extends BoostStatus
export interface EnhancedBoostStatus extends BoostStatus {
  packageName?: string;
  expiresAt?: Date;
  startedAt?: Date;
  timeRemaining?: string;
  progress?: number;
  boostPackage?: BoostPackage;
  packageId?: string;
  isActive: boolean; // This property is required
  remainingMinutes?: number;
  percentRemaining?: number;
  isExpired?: boolean;
}
