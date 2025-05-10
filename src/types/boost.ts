// User role types
export type UserRole = 'USER' | 'ADMIN' | 'MODERATOR' | 'ESCORT' | 'CLIENT';

export const UserRoleEnum = {
  USER: 'USER' as UserRole,
  ADMIN: 'ADMIN' as UserRole,
  MODERATOR: 'MODERATOR' as UserRole,
  ESCORT: 'ESCORT' as UserRole,
  CLIENT: 'CLIENT' as UserRole
};

// Define the PulseBoost type
export interface PulseBoost {
  id: string;
  name: string;
  description: string;
  duration: string;
  durationMinutes?: number;
  price: number;
  price_ubx?: number;
  visibility?: string;
  visibility_increase?: number;
  features?: string[];
  color?: string;
  badgeColor?: string;
  boost_power?: number;
  boostMultiplier?: number;
}

// Define types for the Boost Package and related operations
export interface BoostPackage {
  id: string;
  name: string;
  description?: string;
  price: number;
  price_ubx?: number;
  duration: string;
  durationMinutes?: number;
  durationInSeconds?: number;
  features?: string[];
  visibility?: string;
  visibility_increase?: number;
  boost_power?: number;
  color?: string;
  badgeColor?: string;
  boostMultiplier?: number;
  isMostPopular?: boolean;
  isRecommended?: boolean;
  level?: number;
  isPopular?: boolean;
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
  additionalViews?: number;
  engagementIncrease?: number;
  rankingPosition?: number;
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

export interface BoostStatus {
  isActive: boolean;
  packageId?: string;
  expiresAt?: Date;
  startedAt?: Date;
  timeRemaining?: string | number;
  remainingTime?: string | number;
  packageName?: string;
  boostPackage?: BoostPackage;
  progress?: number;
  startTime?: Date;
  endTime?: Date;
  activeBoostId?: string;
  boostMultiplier?: number;
}

export interface BoostEligibility {
  isEligible?: boolean;
  eligible?: boolean;
  reason?: string;
  reasons?: string[];
  nextEligibleTime?: string;
  remainingBoosts?: number;
  maxBoostsPerDay?: number;
}

export interface HermesStatus {
  position?: number;
  activeUsers?: number;
  estimatedVisibility?: number;
  lastUpdateTime?: string;
  boostScore?: number;
  effectivenessScore?: number;
  isActive?: boolean;
}

export interface EnhancedBoostStatus {
  isActive: boolean;
  packageId?: string;
  packageName?: string;
  expiresAt?: Date;
  startedAt?: Date;
  timeRemaining?: string;
  boostPackage?: BoostPackage;
  progress?: number;
  boostMultiplier?: number;
  remainingTime?: string;
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
