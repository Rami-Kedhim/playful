
import { PulseBoost, BoostPackage } from './pulse-boost';

export interface BoostStatus {
  isActive: boolean;
  remainingTime?: string;
  packageId?: string;
  startedAt?: Date;
  expiresAt?: Date | string;
  packageName?: string;
  boostMultiplier?: number;
  boostPackage?: BoostPackage;
  progress?: number;
}

export interface HermesStatus {
  position: number;
  activeUsers: number;
  estimatedVisibility: number;
  lastUpdateTime: string;
  boostScore: number;
  effectivenessScore: number;
  isActive?: boolean;
}

export interface BoostEligibility {
  eligible: boolean;
  reason?: string;
  nextEligibleTime?: string;
  remainingBoosts?: number;
  maxBoostsPerDay?: number;
}

export interface AnalyticsData {
  additionalViews?: number;
  engagementIncrease?: number;
  rankingPosition?: number;
  views?: number;
  impressions?: {
    today: number;
    yesterday: number;
    weeklyAverage: number;
    withBoost: number;
  };
  interactions?: {
    today: number;
    yesterday: number;
    weeklyAverage: number;
    withBoost: number;
  };
  rank?: {
    current: number;
    previous: number;
    change: number;
  };
}

export interface BoostContextType {
  boostStatus: BoostStatus;
  hermesStatus: HermesStatus;
  eligibility: BoostEligibility;
  packages: BoostPackage[];
  boostPackages: BoostPackage[];
  loading: boolean;
  error: string | null;
  boostProfile: (profileId: string, packageId: string) => Promise<boolean>;
  cancelBoost: () => Promise<boolean>;
  getBoostAnalytics: () => Promise<AnalyticsData>;
  fetchBoostPackages: () => Promise<BoostPackage[]>;
  dailyBoostUsage: number;
  dailyBoostLimit: number;
  formatBoostDuration: (duration: string) => string;
  adaptGetBoostPrice: () => number;
}
