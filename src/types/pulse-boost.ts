export interface PulseBoost {
  id: string;
  profileId?: string;
  packageId?: string;
  startTime?: Date;
  endTime?: Date;
  status?: string;
  
  // Additional properties needed by PulseBoostManager
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

export interface PulseBoostStatus {
  isActive: boolean;
  isExpiring?: boolean;
  expiresAt?: string | Date;
  remainingTime?: number | string; // in seconds or formatted time
  boostLevel?: number;
  boostType?: string;
  modifiers?: Record<string, number>;
  packageName?: string;
  packageId?: string;
  startedAt?: Date | string;
  progress?: number;
  timeRemaining?: string;
  remainingMinutes?: number; // Add this for usePulseBoost
  percentRemaining?: number; // Add this for usePulseBoost
}

export interface PulseBoostManager {
  boostStatus: PulseBoostStatus | null;
  loading: boolean;
  error: string | null;
  packages: PulseBoost[];
  activateBoost: (packageId: string) => Promise<boolean>;
  cancelBoost: () => Promise<boolean>;
  isEligible: boolean;
  eligibilityReason?: string;
  refreshStatus: () => void;
}

// Define EnhancedBoostStatus as an interface that extends PulseBoostStatus
export interface EnhancedBoostStatus extends PulseBoostStatus {
  packageName?: string;
  expiresAt?: Date;
  startedAt?: Date;
  timeRemaining?: string;
  progress?: number;
  boostPackage?: BoostPackage;
  packageId?: string;
  isActive: boolean; // This property is required
}

// Redefine BoostStatus for compatibility
export interface BoostStatus {
  isActive: boolean;
  packageId?: string;
  expiresAt?: Date | string;
  startedAt?: Date | string;
  timeRemaining?: string;
  remainingTime?: string;
  packageName?: string;
  boostPackage?: BoostPackage;
  progress?: number;
  startTime?: Date;
  endTime?: Date;
  activeBoostId?: string;
  boostMultiplier?: number;
  level?: number; // Add this for CreatorBoostTab
  remainingMinutes?: number; // Add this for usePulseBoost
  percentRemaining?: number; // Add this for usePulseBoost
}

export interface BoostEligibility {
  eligible: boolean;
  reasons: string[];
  reason?: string; // Add for compatibility
  nextEligibleTime?: string | Date; // Use nextEligibleTime consistently
  waitTime?: number;  // Time in minutes until eligible
  // Add properties for backward compatibility
  isEligible?: boolean;
  requirements?: {
    profileCompletion: boolean;
    verification: boolean;
    mediaUploaded: boolean;
  };
}

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
  isMostPopular?: boolean;
  isPopular?: boolean;
  isRecommended?: boolean;
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

// Export AnalyticsData from pulse-boost.ts for backward compatibility
export { AnalyticsData } from '@/types/analytics';

export interface BoostPurchaseResult {
  success: boolean;
  boostId?: string;
  error?: string | null;
  message?: string; // Add this for useBoostStatus.ts
  transactionId?: string;
}

export interface HermesStatus {
  position: number;
  activeUsers: number;
  estimatedVisibility: number;
  lastUpdateTime: string;
  boostScore?: number;
  effectivenessScore?: number;
  isActive?: boolean;
  score?: number;
  recommendations?: string[];
}
