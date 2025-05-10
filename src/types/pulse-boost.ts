
export interface BoostPackage {
  id: string;
  name: string;
  description: string;
  price: number;
  price_ubx?: number;
  duration: string;
  durationMinutes?: number;
  features?: string[];
  visibility?: string;
  visibility_increase?: number;
  boost_power?: number;
  color?: string;
  badgeColor?: string;
  boostMultiplier?: number;
  isMostPopular?: boolean;
  isPopular?: boolean;
}

export interface BoostStatus {
  isActive: boolean;
  packageId?: string;
  expiresAt?: Date;
  timeRemaining?: string;
  boostPackage?: BoostPackage;
  progress?: number;
  packageName?: string;
  startedAt?: Date;
  activeBoostId?: string;
  startTime?: Date;
  endTime?: Date;
}

export interface BoostEligibility {
  eligible: boolean;
  reason?: string;
  reasons?: string[];
  nextEligibleTime?: string;
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

export interface BoostAnalytics {
  profileId: string;
  totalBoosts: number;
  activeBoosts: number;
  averageBoostScore: number;
  viewsBeforeBoost: number;
  viewsAfterBoost: number;
  engagementIncrease: number;
  impressions?: {
    value: number;
    change: number;
    withBoost?: number;
  };
  interactions?: {
    value: number;
    change: number;
    withBoost?: number;
  };
  views?: number;
  additionalViews?: number;
}

export interface EnhancedBoostStatus extends BoostStatus {
  analytics?: BoostAnalytics;
  eligibility?: BoostEligibility;
}

export interface HermesStatus {
  position: number;
  activeUsers: number;
  estimatedVisibility: number;
  lastUpdateTime: string;
  boostScore?: number;
  effectivenessScore?: number;
  isActive?: boolean;
  metrics?: {
    velocity: number;
    engagement: number;
    retention: number;
    conversion: number;
  };
}
