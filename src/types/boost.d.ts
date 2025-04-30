
export interface BoostPackage {
  id: string;
  name: string;
  description?: string;
  price: number;
  price_lucoin?: number;
  price_ubx?: number;
  duration: string;
  features?: string[];
  durationMinutes?: number;
  costUBX?: number;
  boostLevel?: number;
  boost_power?: number;
  visibility_increase?: number;
  visibility?: string;
  color?: string;
  badgeColor?: string;
  progress?: number;
}

// Additional interfaces used in our components
export interface BoostProfileDialogProps {
  profileId?: string;
  onSuccess?: () => void;
  open?: boolean;
  setOpen?: (open: boolean) => void;
  buttonText?: string;
  buttonVariant?: string;
  buttonSize?: string;
}

export interface BoostAnalytics {
  impressions: {
    today: number;
    yesterday: number;
    weeklyAverage: number;
    withBoost: number;
    withoutBoost: number;
    increase: number;
  };
  interactions: {
    today: number;
    yesterday: number;
    weeklyAverage: number;
    withBoost: number;
    withoutBoost: number;
    increase: number;
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
  clicks: {
    today: number;
    yesterday: number;
    weeklyAverage: number;
    withBoost: number;
    withoutBoost: number;
    increase: number;
  };
  viewsIncrease?: number;
}

export interface BoostStatus {
  isActive: boolean;
  startTime?: string;
  endTime?: string;
  remainingTime?: string;
  expiresAt?: string;
  boost_level?: number;
  activeBoostId?: string;
  packageId?: string;
  timeRemaining?: string;
  boostPackage?: BoostPackage;
  packageName?: string;
  progress?: number;
}

export interface BoostEligibility {
  isEligible: boolean;
  reason?: string;
  reasons?: string[];
  eligible?: boolean; // For backward compatibility
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

export interface HermesBoostStatus extends HermesStatus {
  boostActive: boolean;
  visibilityScore?: number;
}

// Types for dialog component props
export interface BoostDialogTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  loading: boolean;
  boostStatus: BoostStatus;
  eligibility: BoostEligibility;
  boostPackages: BoostPackage[];
  selectedPackage: string;
  setSelectedPackage: (id: string) => void;
  handleBoost: () => void;
  handleCancel: () => Promise<boolean>;
  dailyBoostUsage: number;
  dailyBoostLimit: number;
  hermesStatus: HermesStatus;
  formatBoostDuration?: (duration: string) => string;
  getBoostPrice?: () => number;
  handleDialogClose: () => void;
}
