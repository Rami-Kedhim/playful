export interface BoostPackage {
  id: string;
  name: string;
  description: string;
  features: string[];
  price: number;
  price_ubx?: number;
  price_lucoin?: number;
  boost_type?: string;
  duration: string;
  is_active?: boolean;
  boost_power?: number;
  visibility_increase?: number;
  color?: string;
  badgeColor?: string;
}

export interface BoostResult {
  success: boolean;
  message?: string;
  expiry?: string;
  transactionId?: string;
}

export interface ActiveBoost {
  id: string;
  user_id: string;
  package_id: string;
  start_time: string;
  end_time: string;
  status: string;
  boostId?: string;
  timeRemaining?: string;
  startedAt?: Date;
  boostDetails?: BoostPackage;
  packageName?: string;
  boostPackage?: BoostPackage;
  progress?: number;
}

export interface BoostStatus {
  isActive: boolean;
  startTime?: string;
  endTime?: string;
  remainingTime?: string;
  expiresAt?: string;
  boost_level?: number;
  progress?: number;
  packageName?: string;
  boostPackage?: BoostPackage;
  pulseData?: any;
  timeRemaining?: string;
  packageId?: string;
  profileId?: string;
}

export interface BoostStats {
  totalActiveBoosts: number;
  totalBoostsPurchased: number;
  avgBoostDuration: string;
}

export interface BoostEligibility {
  isEligible: boolean;
  reason?: string;
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

export interface HermesBoostStatus extends HermesStatus {
  // Additional properties specific to Hermes boost
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
}

export interface PulseBoost {
  id: string;
  name: string;
  description?: string;
  duration?: string;
  durationMinutes?: number;
  visibility?: string;
  costUBX?: number;
  price?: number;
  price_ubx?: number;
  badgeColor?: string;
  color?: string;
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
  handleBoost: () => void;
  handleCancel: () => Promise<boolean>;
  dailyBoostUsage: number;
  dailyBoostLimit: number;
  hermesStatus: HermesBoostStatus;
  formatBoostDuration?: (duration: string) => string;
  getBoostPrice?: () => number;
  handleDialogClose: () => void;
}
