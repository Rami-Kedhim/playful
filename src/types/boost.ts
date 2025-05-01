
/**
 * Boost Types for the UberEscorts system
 */

export interface BoostStatus {
  isActive: boolean;
  expiresAt?: Date;
  boostType?: string;
  boostMultiplier?: number;
  startedAt?: Date;
  remainingTime?: string;
  packageId?: string;
  packageName?: string;
  startTime?: Date | string;
  endTime?: Date | string;
  boostPackage?: BoostPackage;
  progress?: number;
  timeRemaining?: string;
  activeBoostId?: string;
  boost_level?: number;
  visibilityScore?: number;
}

export interface BoostEligibility {
  eligible: boolean;
  reason?: string;
  nextEligibleAt?: Date;
  suggestionMessage?: string;
  reasons?: string[];
  restrictions?: string[];
}

export interface BoostAnalytics {
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
  views?: number;
  trending?: boolean;
  additionalViews?: number;
  engagementIncrease?: number;
  rankingPosition?: number;
  conversions?: number;
  roi?: number;
  timeActive?: number;
  boostEfficiency?: number;
}

export interface BoostPackage {
  id: string;
  name: string;
  description?: string;
  duration: string;
  price: number;
  boostMultiplier: number;
  features: string[];
  isMostPopular?: boolean;
  isRecommended?: boolean;
  price_ubx?: number;
  durationMinutes?: number;
  visibility?: string;
  visibility_increase?: number;
  boost_power?: number;
  color?: string;
  badgeColor?: string;
}

export interface HermesStatus {
  position: number;
  activeUsers: number;
  estimatedVisibility: number;
  lastUpdateTime: string;
  boostScore?: number;
  effectivenessScore?: number;
  isActive?: boolean;
}

export interface HermesBoostStatus {
  isActive: boolean;
  tier: number;
  score: number;
  multiplier: number;
  expiresAt?: Date | string;
}

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

export type AnalyticsData = {
  views?: number;
  additionalViews?: number;
  engagementIncrease?: number;
  rankingPosition?: number;
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
  roi?: number;
};

export interface BoostContextType {
  boostStatus: BoostStatus;
  hermesStatus: HermesStatus;
  eligibility: BoostEligibility;
  packages: BoostPackage[];
  boostPackages?: BoostPackage[];
  loading: boolean;
  error?: string | null;
  boostProfile: (profileId: string, packageId: string) => Promise<boolean>;
  purchaseBoost?: (boostPackage: BoostPackage) => Promise<boolean>;
  cancelBoost: () => Promise<boolean>;
  getBoostAnalytics: () => Promise<AnalyticsData>;
  fetchBoostPackages?: () => Promise<BoostPackage[]>;
  dailyBoostUsage?: number;
  dailyBoostLimit?: number;
  formatBoostDuration?: (duration: string) => string;
  adaptGetBoostPrice?: () => number;
}
