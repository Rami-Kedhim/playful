
export interface UserCredentials {
  email: string;
  password: string;
}

export interface UserProfile {
  id: string;
  name?: string;
  email?: string;
  avatar_url?: string;
  bio?: string;
}

export interface BoostPackage {
  id: string;
  name: string;
  description: string;
  price: number;
  price_ubx: number;
  duration: number | string;  // Allow both types for compatibility
  durationMinutes: number; // Duration in minutes
  features: string[];
  boostLevel?: number;
  visibility?: number | string;
  visibility_increase?: number; // Keep original property
  visibilityIncrease?: number; // Add alias property
  popularity?: 'high' | 'medium' | 'low';
  isPopular?: boolean;
  isMostPopular?: boolean;
  badgeColor?: string;
  // Add properties for compatibility
  packageName?: string;
  endTime?: Date | string;
  color?: string;
  boost_power?: number;
}

export interface BoostEligibility {
  eligible: boolean;
  reasons: string[];
  reason?: string; // Add for compatibility
  nextEligibleTime?: string | Date; // Use nextEligibleTime consistently
  nextEligibleDate?: string | Date; // Add for compatibility
  waitTime?: number;  // Time in minutes until eligible
  // Add properties for backward compatibility
  isEligible?: boolean;
  requirements?: {
    profileCompletion: boolean;
    verification: boolean;
    mediaUploaded: boolean;
  };
}

export interface BoostStatus {
  isActive: boolean;
  expiresAt?: string | Date;
  endTime?: string | Date; // Add for compatibility
  remainingDays?: number;
  boostLevel?: number;
  isExpiring?: boolean;
  progress?: number;
  timeRemaining?: string;
  remainingTime?: string;
  package?: BoostPackage;
  packageName?: string;
  startTime?: string | Date;
  packageId?: string;
  boostPackage?: BoostPackage;
  startedAt?: Date | string;
  endTime?: Date | string;
  activeBoostId?: string;
  boostMultiplier?: number;
}

export interface HermesStatus {
  score: number;
  position?: number;
  activeUsers?: number;
  estimatedVisibility?: number;
  lastUpdated?: string | Date;
  recommendations?: string[];
  boostScore?: number;
  effectivenessScore?: number;
  lastUpdateTime?: string;
}

export interface BoostScoreResult {
  score: number;
  components: {
    profileCompleteness: number;
    contentQuality: number;
    activityLevel: number;
    responseRate: number;
  };
  recommendations: string[];
}

// Create UserBoost interface
export interface UserBoost {
  id: string;
  userId: string;
  packageId: string;
  startTime: Date | string;
  endTime: Date | string;
  status: string;
}

// Create BoostAnalytics interface
export interface BoostAnalytics {
  totalBoosts: number;
  activeBoosts: number;
  averageBoostScore: number;
  additionalViews?: number;
  engagementIncrease?: number;
  rankingPosition?: number;
  views?: number;
  impressions?: {
    value: number;
    change?: number;
    withBoost?: number;
    withoutBoost?: number;
  };
  interactions?: {
    value: number;
    change?: number;
    withBoost?: number;
    withoutBoost?: number;
  };
  boostHistory?: Array<{
    date: Date;
    score: number;
  }>;
}

// Create PulseBoost interface
export interface PulseBoost {
  id: string;
  name: string;
  description: string;
  duration: string;
  price: number;
  price_ubx?: number;
  visibility?: string | number;
  visibility_increase?: number;
  features?: string[];
  durationMinutes?: number;
  color?: string;
  badgeColor?: string;
  boost_power?: number;
  boostMultiplier?: number;
}

// Export AnalyticsData from pulse-boost.ts for backward compatibility
export { AnalyticsData } from '@/types/analytics';
