
import { PulseBoost } from './pulse-boost';

// Export the BoostPackage type properly
export type { BoostPackage } from './pulse-boost';

export interface BoostStatus {
  isActive: boolean;
  // Adding the properties that are referenced in components
  startTime?: Date | string;
  endTime?: Date | string;
  remainingTime?: string;
  timeRemaining?: string;
  packageId?: string;
  activeBoostId?: string;
  startedAt?: Date;
  expiresAt?: Date | string;
  packageName?: string;
  boostMultiplier?: number;
  boostPackage?: BoostPackage;
  progress?: number;
  boost_level?: number;
  visibilityScore?: number;
  boostType?: string;
}

export interface HermesStatus {
  isActive?: boolean;
  position: number;
  activeUsers: number;
  estimatedVisibility: number;
  lastUpdateTime: string;
  boostScore: number;
  effectivenessScore: number;
  tier?: number;
  score?: number;
  multiplier?: number;
  expiresAt?: Date | string;
}

// Use HermesStatus instead of creating a new type
export type HermesBoostStatus = HermesStatus;

export interface BoostEligibility {
  eligible: boolean;
  isEligible?: boolean;
  reason?: string;
  reasons?: string[];
  nextEligibleTime?: string;
  remainingBoosts?: number;
  maxBoostsPerDay?: number;
  restrictions?: string[];
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
    withoutBoost?: number;
    increase?: number;
  };
  interactions?: {
    today: number;
    yesterday: number;
    weeklyAverage: number;
    withBoost: number;
    withoutBoost?: number;
    increase?: number;
  };
  rank?: {
    current: number;
    previous: number;
    change: number;
  };
  clicks?: {
    today: number;
    yesterday: number;
    weeklyAverage: number;
    withBoost: number;
    withoutBoost?: number;
    increase?: number;
  };
  conversions?: number;
  timeActive?: number;
  boostEfficiency?: number;
  trending?: boolean;
  roi?: number;
}

// Define BoostAnalytics properly
export interface BoostAnalytics extends AnalyticsData {
  // All fields are already in AnalyticsData
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

// Define BoostDialogTabsProps properly
export interface BoostDialogTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  loading: boolean;
  boostStatus: BoostStatus;
  eligibility: BoostEligibility;
  boostPackages: BoostPackage[];
  selectedPackage: string;
  setSelectedPackage: (id: string) => void;
  handleBoost: () => Promise<boolean> | void;
  handleCancel: () => Promise<boolean>;
  dailyBoostUsage: number;
  dailyBoostLimit: number;
  handleDialogClose: () => void;
  getBoostPrice?: () => number;
  hermesStatus: HermesStatus;
  formatBoostDuration?: (duration: string) => string;
}
