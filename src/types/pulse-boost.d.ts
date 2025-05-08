
export interface BoostPackage {
  id: string;
  name: string;
  description: string;
  price: number;
  price_ubx?: number;
  duration: string;
  durationMinutes: number;
  features: string[];
  visibility: number | string;
  visibility_increase: number;
  color?: string;
  badgeColor?: string;
  boost_power?: number;
  boostMultiplier?: number;
  isMostPopular?: boolean;
  isRecommended?: boolean;
  is_active?: boolean;
}

export interface PulseBoost {
  id: string;
  name: string;
  description: string;
  duration: string;
  durationMinutes: number;
  price: number;
  price_ubx?: number;
  features: string[];
  visibility: number | string;
  visibility_increase: number;
  color?: string;
  badgeColor?: string;
  boost_power?: number;
  boostMultiplier?: number;
  isMostPopular?: boolean;
  isRecommended?: boolean;
  profileId?: string;
  packageId?: string;
  startTime?: Date;
  endTime?: Date;
  status?: string;
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
    withoutBoost?: number;
    increase?: number;
  };
  interactions?: {
    value: number;
    change?: number;
    withBoost?: number;
    withoutBoost?: number;
    increase?: number;
  };
}

export interface BoostHistory {
  items: Array<{
    id: string;
    packageId: string;
    startDate: Date;
    endDate: Date;
    price: number;
    status: string;
  }>;
  userId?: string;
  startTime?: Date;
  endTime?: Date;
  boostType?: string;
  price?: number;
  status?: string;
}

export interface EnhancedBoostStatus {
  isActive: boolean;
  remainingTime: string;  // in "1h 30m" format
  timeRemaining: string;  // Same as remainingTime for backward compatibility
  percentRemaining: number;
  expiresAt: Date | null;
  startedAt: Date | null;
  isExpired: boolean;
  remainingMinutes?: number; // in minutes
  packageName?: string;
  progress?: number;
}
