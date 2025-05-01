
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
  impressions: number;
  profileViews: number;
  messages: number;
  bookings: number;
  conversion: {
    viewToMessage: number;
    messageToBooking: number;
  };
  comparisonToAverage: {
    impressions: number;
    profileViews: number;
    messages: number;
    bookings: number;
  };
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
