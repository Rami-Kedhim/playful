
export interface BoostPackage {
  id: string;
  name: string;
  duration: string;
  price_ubx: number;
  description?: string;
  features?: string[];
}

export interface BoostStatus {
  isActive: boolean;
  startTime?: string;
  endTime?: string;
  remainingTime?: string;
  packageId?: string;
  packageName?: string;
  progress?: number;
  expiresAt?: string;
  boostPackage?: BoostPackage;
  profileId?: string;
  timeRemaining?: string;
}

export interface BoostEligibility {
  isEligible: boolean;
  reason?: string;
  reasons?: string[];
  minimumProfileCompleteness?: number;
  missingFields?: string[];
  minRequiredBalance?: number;
}

export interface HermesBoostStatus {
  position: number;
  activeUsers: number;
  estimatedVisibility: number;
  lastUpdateTime: string;
  isActive?: boolean;
  active?: boolean;
  boostScore?: number;
  effectivenessScore?: number;
}

// Adding BoostAnalytics interface to fix errors in BoostAnalyticsCard
export interface BoostAnalytics {
  impressions: {
    today: number;
    yesterday: number;
    weeklyAverage: number;
    withBoost: number;
    withoutBoost?: number;
    increase?: number;
  };
  clicks: {
    today: number;
    yesterday: number;
    weeklyAverage: number;
    withBoost: number;
    withoutBoost?: number;
    increase?: number;
  };
  engagementRate: number;
  conversionRate: number;
  boostEfficiency: number;
  additionalViews: number;
  engagementIncrease: number;
  rankingPosition: number;
}
