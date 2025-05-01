
import { PulseBoost } from './pulse-boost';

// Re-export the BoostPackage to fix errors across the codebase
export type { BoostPackage } from './pulse-boost';

export interface BoostStatus {
  isActive: boolean;
  // Adding the properties that are referenced in components
  startTime?: Date | string;
  endTime?: Date | string;
  remainingTime?: string;
  timeRemaining?: string;
  packageId?: string;
  activeBoostId?: string; // Added this field
  startedAt?: Date;
  expiresAt?: Date | string;
  packageName?: string;
  boostMultiplier?: number;
  boostPackage?: BoostPackage;
  progress?: number;
  boost_level?: number;
  visibilityScore?: number;
  boostType?: string; // Added for compatibility
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

// Renamed HermesBoostStatus to just re-use HermesStatus
export type HermesBoostStatus = HermesStatus;

export interface BoostEligibility {
  eligible: boolean;
  isEligible?: boolean;  // Add both variants
  reason?: string;
  reasons?: string[];    // Added to fix errors
  nextEligibleTime?: string;
  remainingBoosts?: number;
  maxBoostsPerDay?: number;
  restrictions?: string[];  // Added to fix errors
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
    withoutBoost?: number;  // Added to fix errors
    increase?: number;      // Added to fix errors
  };
  interactions?: {
    today: number;
    yesterday: number;
    weeklyAverage: number;
    withBoost: number;
    withoutBoost?: number;  // Added to fix errors
    increase?: number;      // Added to fix errors
  };
  rank?: {
    current: number;
    previous: number;
    change: number;
  };
  clicks?: {              // Added to fix errors
    today: number;
    yesterday: number;
    weeklyAverage: number;
    withBoost: number;
    withoutBoost?: number;
    increase?: number;
  };
  conversions?: number;    // Added to fix errors
  timeActive?: number;     // Added to fix errors
  boostEfficiency?: number; // Added to fix errors
  trending?: boolean;      // Added to fix errors
  roi?: number;            // Added to fix errors
}

// BoostAnalytics is the same as AnalyticsData but with slightly different structure
export interface BoostAnalytics extends AnalyticsData {
  // All needed fields are already in AnalyticsData
  // Just making sure the interface exists
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

// Add BoostDialogTabsProps that's referenced elsewhere
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
