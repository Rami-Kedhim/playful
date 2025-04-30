
export interface BoostPackage {
  id: string;
  name: string;
  description: string;
  price: number;
  price_ubx?: number;
  currency?: string;
  duration: string;
  durationMinutes?: number;
  features?: string[];
  visibility?: string;
  visibility_increase?: number;
  boost_power?: number;
  tier?: BoostTier;
  visibilityScore?: number;
  multiplier?: number;
  color?: string;
  badgeColor?: string;
}

export enum BoostTier {
  NONE = 'none',
  BASIC = 'basic',
  PREMIUM = 'premium',
  ULTRA = 'ultra',
}

export interface BoostStatus {
  isActive: boolean;
  startTime?: string | Date | null;
  endTime?: string | Date | null;
  packageId?: string | null;
  remainingTime?: string | null;
  timeRemaining?: string | null;
  activeBoostId?: string;
  packageName?: string | null;
  boostPackage?: BoostPackage;
  boost_level?: number;
  expiresAt?: Date;
  visibilityScore?: number;
  progress?: number;
}

export interface BoostEligibility {
  eligible: boolean;
  message?: string;
  reason?: string;
  reasons?: string[];
  blockedUntil?: Date | string;
  minimumRequirements?: Record<string, any>;
}

export interface HermesBoostStatus {
  isActive: boolean;
  boostScore?: number;
  effectivenessScore?: number;
  tier?: number;
  score?: number;
  multiplier?: number;
  expiresAt?: Date | string;
  position?: number;
  activeUsers?: number;
  estimatedVisibility?: number;
  lastUpdateTime?: string;
}

export interface HermesStatus extends HermesBoostStatus {
  position: number;
  activeUsers: number;
  estimatedVisibility: number;
  lastUpdateTime: string;
}

export interface BoostAnalytics {
  // Basic metrics
  views?: number;
  additionalViews?: number;
  engagementIncrease?: number;
  rankingPosition?: number;
  conversions?: number;
  timeActive?: number;
  boostEfficiency?: number;
  trending?: boolean;
  roi?: number;
  
  // Detailed metrics
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
  
  // Legacy fields for backward compatibility
  ctr?: number;
  conversionRate?: number;
  averagePosition?: number;
  totalSpent?: number;
  lastUpdated?: Date | string;
  dailyStats?: {
    date: string;
    impressions: number;
    clicks: number;
  }[];
}

export interface BoostPurchase {
  id: string;
  packageId: string;
  userId: string;
  profileId: string;
  purchaseDate: Date | string;
  expiryDate: Date | string;
  status: 'active' | 'expired' | 'cancelled' | 'pending';
  paymentStatus: 'pending' | 'completed' | 'failed';
  price: number;
  currency: string;
}

export interface BoostDialogTabsProps {
  currentTab?: 'status' | 'packages' | 'analytics' | 'history';
  setCurrentTab?: (tab: 'status' | 'packages' | 'analytics' | 'history') => void;
  boostStatus: BoostStatus | null;
  hermesStatus?: HermesStatus | null;
  eligibility: BoostEligibility;
  profileId?: string;
  
  // Dialog tab properties
  activeTab: string;
  setActiveTab: (tab: string) => void;
  loading: boolean;
  boostPackages: BoostPackage[];
  selectedPackage: string;
  setSelectedPackage: (id: string) => void;
  handleBoost: () => Promise<boolean> | void;
  handleCancel: () => Promise<boolean>;
  dailyBoostUsage: number;
  dailyBoostLimit: number;
  getBoostPrice?: () => number;
  formatBoostDuration?: (duration: string) => string;
  handleDialogClose: () => void;
}
