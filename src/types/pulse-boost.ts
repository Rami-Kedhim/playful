
// Pulse Boost types

export interface BoostPackage {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  features: string[];
  boostLevel: number;
  popularity: 'low' | 'medium' | 'high';
  
  // Add missing properties
  visibility?: string | number;
  visibility_increase?: number;
  price_ubx?: number;
  durationMinutes?: number;
  badgeColor?: string;
  color?: string;
  isPopular?: boolean;
  isMostPopular?: boolean;
  boostMultiplier?: number;
}

export interface BoostStatus {
  isActive: boolean;
  expiresAt: Date | string;
  remainingDays: number;
  boostLevel: number;
  isExpiring: boolean;
  
  // Add missing properties
  packageId?: string;
  packageName?: string;
  timeRemaining?: string;
  remainingTime?: string;
  progress?: number;
  startedAt?: Date | string;
  startTime?: Date | string;
  endTime?: Date | string;
}

export interface HermesStatus {
  score: number;
  recommendations: string[];
  lastUpdated: Date | string;
  metrics?: any;
  
  // Add missing properties
  position?: number;
  activeUsers?: number;
  estimatedVisibility?: number;
  lastUpdateTime?: string;
  boostScore?: number;
  effectivenessScore?: number;
  isActive?: boolean;
}

export interface BoostAnalytics {
  impressions: number;
  clicks: number;
  conversionRate: number;
  engagementScore: number;
}

export interface UserBoost {
  id: string;
  userId: string;
  packageId: string;
  startDate: Date | string;
  endDate: Date | string;
  isActive: boolean;
  boostLevel: number;
}

// Add BoostEligibility interface
export interface BoostEligibility {
  eligible: boolean;
  isEligible?: boolean; // For backward compatibility
  reason?: string;
  reasons?: string[];
  nextEligibleTime?: string;
  remainingBoosts?: number;
  maxBoostsPerDay?: number;
}

// Add AnalyticsData for boost components
export interface AnalyticsData {
  totalBoosts?: number;
  activeBoosts?: number;
  averageBoostScore?: number;
  views?: number;
  impressions?: {
    value: number;
    change?: number;
  };
  interactions?: {
    value: number;
    change?: number;
  };
  additionalViews?: number;
  engagementIncrease?: number;
  rankingPosition?: number;
}
