
export interface BoostPackage {
  id: string;
  name: string;
  description: string;
  price: number;
  price_ubx?: number;
  duration: string;
  durationMinutes?: number;
  features?: string[];
  visibility?: string;
  visibility_increase?: number;
  boost_power?: number;
  color?: string;
  badgeColor?: string;
}

export interface BoostStatus {
  isActive: boolean;
  startTime?: string | Date;
  endTime?: string | Date;
  packageId?: string;
  remainingTime?: string;
  timeRemaining?: string;
  activeBoostId?: string;
  packageName?: string;
  boostPackage?: BoostPackage;
  boost_level?: number;
  expiresAt?: Date;
  visibilityScore?: number;
  progress?: number;
}

export interface BoostEligibility {
  isEligible: boolean;
  reason?: string;
  restrictions?: string[];
  reasons?: string[];
}

export interface HermesStatus {
  position: number;
  activeUsers: number;
  estimatedVisibility: number;
  lastUpdateTime: string;
  boostScore?: number;
  effectivenessScore?: number;
}

export interface HermesBoostStatus {
  isActive: boolean;
  tier: number;
  score: number;
  multiplier: number;
  expiresAt?: Date | string;
}

export interface BoostAnalytics {
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
  trending?: boolean;
  additionalViews?: number;
  engagementIncrease?: number;
  rankingPosition?: number;
  conversions?: number;
  roi?: number;
  timeActive?: number;
  boostEfficiency?: number;
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
