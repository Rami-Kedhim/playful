
export interface BoostPackage {
  id: string;
  name: string;
  description: string;
  price: number;
  price_ubx?: number; // Add this property
  currency?: string;
  duration: string;
  durationMinutes?: number;
  features?: string[];
  visibility?: string;
  visibility_increase?: number; // Add this property
  boost_power?: number; // Add this property
  tier?: BoostTier;
  visibilityScore?: number;
  multiplier?: number;
  color?: string; // Add this property
  badgeColor?: string; // Add this property
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
  timeRemaining?: string | null; // Add this property
  activeBoostId?: string; // Add this property
  packageName?: string | null;
  boostPackage?: BoostPackage; // Add this property
  boost_level?: number;
  expiresAt?: Date;
  visibilityScore?: number;
  progress?: number; // Add this property
}

export interface BoostEligibility {
  eligible: boolean; // Use 'eligible' instead of 'isEligible'
  message?: string;
  reason?: string; // Add this property for backward compatibility
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
}

export interface HermesStatus extends HermesBoostStatus {
  position: number;
  activeUsers: number;
  estimatedVisibility: number;
  lastUpdateTime: string;
}

export interface BoostAnalytics {
  impressions?: number;
  clicks?: number;
  ctr?: number;
  conversionRate?: number;
  averagePosition?: number;
  totalSpent?: number;
  roi?: number;
  lastUpdated?: Date | string;
  views?: number;
  additionalViews?: number;
  engagementIncrease?: number;
  rankingPosition?: number;
  conversions?: number;
  timeActive?: number;
  boostEfficiency?: number;
  dailyStats?: {
    date: string;
    impressions: number;
    clicks: number;
  }[];
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
  currentTab: 'status' | 'packages' | 'analytics' | 'history';
  setCurrentTab: (tab: 'status' | 'packages' | 'analytics' | 'history') => void;
  boostStatus: BoostStatus | null;
  hermesStatus: HermesStatus | null;
  eligibility: BoostEligibility;
  profileId?: string;
  
  // Add these properties for the dialog tabs
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
  hermesStatus: HermesStatus;
  formatBoostDuration?: (duration: string) => string;
  getBoostPrice?: () => number;
  handleDialogClose: () => void;
}
