
import { BoostPackage as BoostManagerPackage } from '@/hooks/boost/useBoostManager';

// Enhanced BoostStatus type with all required fields
export interface BoostStatus {
  isActive: boolean;
  startTime: string;
  endTime: string;
  remainingTime: string;
  progress?: number;
  packageId?: string;
  packageName?: string;
  profileId?: string;
  timeRemaining?: string;
  activeBoostId?: string;
  expiresAt?: string;
  boostPackage?: BoostPackage;
}

export interface BoostEligibility {
  isEligible: boolean;
  reason: string;
  // No reasons property - using reason instead
}

export interface BoostPackage extends BoostManagerPackage {
  id: string;
  name: string;
  description: string;
  duration: string;
  price_ubx: number;
  boost_power: number;
  visibility_increase: number;
  image_url?: string;
  is_featured?: boolean;
  badge_color?: string;
  icon?: string;
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
  timeRemaining?: number;
}

export interface BoostAnalytics {
  impressions: {
    today: number;
    yesterday: number;
    weeklyAverage: number;
    withBoost: number;
    withoutBoost?: number;
    increase?: number;
  };
  interactions: {
    today: number;
    yesterday: number;
    weeklyAverage: number;
    withBoost: number;
    withoutBoost?: number;
    increase?: number;
  };
  rank: {
    current: number;
    previous: number;
    change: number;
  };
  trending: boolean;
  additionalViews: number;
  engagementIncrease: number;
  rankingPosition: number;
}
