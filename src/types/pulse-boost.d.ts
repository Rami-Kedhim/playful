
export interface BoostPackage {
  id: string;
  name: string;
  description?: string;
  price: number;
  price_sol?: number;
  price_ubx?: number;
  duration: string | number; // in hours or as interval string
  boost_level: number;
  features?: string[];
  is_featured?: boolean;
  is_active?: boolean;
  color?: string; // Optional color property
  badgeColor?: string;
  visibility_increase?: number;
  isMostPopular?: boolean; // Added this property
}

export type PulseBoost = BoostPackage;

export interface BoostStatus {
  isActive: boolean;
  packageId?: string;
  expiresAt?: Date | string;
  timeRemaining?: string;
}

export interface EnhancedBoostStatus extends BoostStatus {
  boostLevel?: number;
  isExpired: boolean;
  percentRemaining: number;
  durationInfo?: {
    hours: number;
    minutes: number;
    seconds: number;
  };
}

export interface BoostEligibility {
  isEligible: boolean;
  reason?: string;
  requirements?: string[];
}

export interface HermesStatus {
  position: number;
  activeUsers: number;
  estimatedVisibility: number;
  lastUpdateTime: string;
  boostScore: number;
  effectivenessScore: number;
}

export interface BoostPurchaseResult {
  success: boolean;
  message?: string;
  boostId?: string;
  transactionId?: string; // Added this property
}

export interface PulseBoostConfig {
  maxDailyBoosts: number;
  cooldownPeriod: number; // in minutes
  hermesIntegration: boolean;
}

export interface BoostAnalytics {
  views: {
    withBoost: number;
    withoutBoost: number;
    increase: number;
    percentageIncrease: number;
  };
  messages: {
    withBoost: number;
    withoutBoost: number;
    increase: number;
    percentageIncrease: number;
  };
  bookings: {
    withBoost: number;
    withoutBoost: number;
    increase: number;
    percentageIncrease: number;
  };
  ranking: {
    withBoost: number;
    withoutBoost: number;
    improvement: number;
  };
}
