
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
  // Add these properties to fix the errors in useBoostOperations.ts
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
  remainingTime: string;  // in "1h 30m" format
  timeRemaining: string;  // Same as remainingTime for backward compatibility
  percentRemaining: number;
  expiresAt: Date | null;
  startedAt: Date | null;
  isExpired: boolean;
  remainingMinutes?: number; // in minutes
}

