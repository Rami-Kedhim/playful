
/**
 * Pulse Boost System Type Definitions
 */

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
  isPopular?: boolean;
  isRecommended?: boolean;
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
  totalBoosts: number;
  activeBoosts: number;
  averageBoostScore: number;
  boostHistory: Array<{
    date: Date;
    score: number;
  }>;
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
  additionalViews?: number;
  engagementIncrease?: number;
  rankingPosition?: number;
}

// Alias to fix the reference in useBoostManager.ts
export type BoostAnalyticsData = BoostAnalytics;

export interface BoostHistory {
  items: Array<{
    id: string;
    packageId: string;
    startDate: Date;
    endDate: Date;
    price: number;
    status: string;
  }>;
}

export interface EnhancedBoostStatus {
  isActive: boolean;
  remainingTime: string;
  timeRemaining: string;
  percentRemaining: number;
  expiresAt: Date | null;
  startedAt: Date | null;
  isExpired: boolean;
  remainingMinutes?: number;
  packageName?: string;
  progress?: number;
}

export interface PulseBoost {
  id: string;
  profileId: string;
  packageId: string;
  startTime: Date;
  endTime: Date;
  status: string;
  // Adding required properties that were missing
  name: string;
  description: string;
  duration: string;
  price: number;
  price_ubx?: number;
  features: string[];
  visibility?: string | number;
  visibility_increase?: number;
  color?: string;
  badgeColor?: string;
  durationMinutes?: number;
  boost_power?: number;
  isMostPopular?: boolean;
  isPopular?: boolean;
  isRecommended?: boolean;
  isActive?: boolean;
}

export interface BoostStatus {
  isActive: boolean;
  isExpiring?: boolean;
  expiresAt?: string | Date;
  remainingTime?: number | string; 
  boostLevel?: number;
  boostType?: string;
  modifiers?: Record<string, number>;
  packageName?: string;
  packageId?: string;
  startedAt?: Date | string;
  progress?: number;
  timeRemaining?: string;
}

export interface HermesStatus {
  queuePosition?: number;
  totalInQueue?: number;
  estimatedWaitTime?: number;
  score?: number;
  position?: number;
  activeUsers?: number;
  estimatedVisibility?: number;
  lastUpdateTime?: string;
  boostScore?: number;
  effectivenessScore?: number;
}

export interface BoostEligibility {
  isEligible: boolean;
  reason?: string;
  requiredLevel?: string;
  cooldownRemaining?: number;
}
