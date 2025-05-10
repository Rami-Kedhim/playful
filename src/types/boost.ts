
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
}

export interface BoostStatus {
  isActive: boolean;
  expiresAt?: Date | string | null;
  level?: number;
  packageId?: string;
  packageName?: string;
  startedAt?: Date | string;
  remainingTime?: string | number;
  timeProgress?: number;
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
}

export interface BoostEligibility {
  eligible: boolean;
  reason?: string;
  cooldownRemaining?: number;
  dailyBoostsRemaining?: number;
  level?: number;
  requiredVerificationLevel?: string;
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
