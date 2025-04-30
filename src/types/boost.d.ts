
export interface BoostPackage {
  id: string;
  name: string;
  price?: number;
  price_ubx?: number;
  description?: string;
  duration: string;
  boost_power?: number; // Add this to support existing code
  visibility_increase?: number;
  features?: string[];
  color?: string;
  badgeColor?: string;
}

export interface BoostStatus {
  isActive: boolean;
  startTime?: string | Date;
  endTime?: string | Date;
  packageId?: string;
  remainingTime?: string;
  activeBoostId?: string;
}

export interface BoostEligibility {
  isEligible: boolean;
  reason?: string;
  restrictions?: string[];
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
  views: number;
  impressions: number;
  clicks: number;
  conversions: number;
  roi: number;
  timeActive: number;
  boostEfficiency: number;
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
  handleBoost: () => Promise<boolean>;
  handleCancel: () => Promise<boolean>;
  dailyBoostUsage: number;
  dailyBoostLimit: number;
  handleDialogClose: () => void;
  getBoostPrice: () => number;
  hermesStatus: HermesStatus;
  formatBoostDuration: (duration: string) => string;
}
