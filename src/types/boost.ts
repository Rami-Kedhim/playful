
// Update the BoostPackage interface to include all required fields
export interface BoostPackage {
  id: string;
  name: string;
  description?: string;
  duration: string | number;
  durationInSeconds: number;
  price: number;
  price_ubx?: number;
  level: number;
  visibility: number;
  features?: string[];
  recommended?: boolean;
  position?: number;
  isMostPopular?: boolean;
  isPopular?: boolean;
  boost_power?: number;
}

// Update the BoostStatus interface with all necessary fields
export interface BoostStatus {
  isActive: boolean;
  expiresAt?: Date | string | null;
  level?: number;
  packageId?: string;
  packageName?: string;
  startedAt?: Date | string;
  remainingTime?: string | number;
  timeRemaining?: string | number;
  timeProgress?: number;
  progress?: number;
  startTime?: Date | string;
  endTime?: Date | string;
  boostPackage?: BoostPackage;
}

// Update BoostEligibility to use eligible instead of isEligible
export interface BoostEligibility {
  eligible: boolean;
  reason?: string;
  reasons?: string[];
  cooldownRemaining?: number;
  dailyBoostsRemaining?: number;
  level?: number;
  requiredVerificationLevel?: string;
  nextEligibleTime?: string;
}

export interface HermesStatus {
  position?: number;
  activeUsers?: number;
  estimatedVisibility?: number;
  lastUpdateTime?: Date;
  metrics?: {
    velocity?: number;
    engagement?: number;
    retention?: number;
    conversion?: number;
  };
  isActive?: boolean;
  boostScore?: number;
  effectivenessScore?: number;
}

export interface BoostAnalyticsData {
  totalBoosts: number;
  activeBoosts: number;
  viewIncrease: number;
  engagementRate: number;
  averageBoostScore: number;
  historicalData: {
    date: string;
    views: number;
    engagement: number;
    score: number;
  }[];
}
