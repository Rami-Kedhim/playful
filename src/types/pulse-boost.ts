
// Update the HermesStatus interface and other boost-related types

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
  transactionId?: string;
}

export interface HermesStatus {
  score?: number;
  position?: number;
  activeUsers?: number;
  estimatedVisibility?: number;
  lastUpdateTime?: string;
  boostScore?: number;
  effectivenessScore?: number;
  isActive?: boolean;
  recommendations?: string[];
  lastUpdated?: Date;
}

export interface UserBoost {
  id: string;
  userId: string;
  packageId: string;
  startTime: Date | string;
  endTime: Date | string;
  status: string;
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
    withBoost?: number;
  };
  interactions?: {
    value: number;
    change?: number;
  };
}

export interface AnalyticsData {
  views?: number;
  impressions?: number;
  clicks?: number;
  conversions?: number;
  boostScore?: number;
  visibilityScore?: number;
  positionChange?: number;
  timeRange?: string;
  totalBoosts?: number;
  activeBoosts?: number;
  averageBoostScore?: number;
  additionalViews?: number;
  engagementIncrease?: number;
  rankingPosition?: number;
  interactions?: {
    value: number;
    change?: number;
  };
  today?: number;
  yesterday?: number;
  weeklyAverage?: number;
  withBoost?: number;
  withoutBoost?: number;
  increase?: number;
  change?: number;
  value?: number;
}

export interface BoostScoreResult {
  score: number;
  factors?: {
    profileCompleteness: number;
    activityScore: number;
    engagementRate: number;
  };
  recommendations?: string[];
}

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
