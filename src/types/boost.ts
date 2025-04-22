
// Create or update Boost types

export interface BoostPackage {
  id: string;
  name: string;
  price: number;
  price_ubx?: number;
  description?: string;
  duration: string;
  boost_power?: number;
  visibility_increase?: number;
  features?: string[];
  boostLevel?: number;
  color?: string;
}

export interface BoostStatus {
  isActive: boolean;
  packageId?: string;
  startTime?: Date;
  endTime?: Date;
  remainingTime?: string;
  progress?: number;
}

export interface BoostEligibility {
  isEligible: boolean;
  reason?: string;
}

export interface BoostAnalytics {
  totalBoosts: number;
  averagePosition: number;
  impressionsGained: number;
  engagementRate: number;
}

// Types for Hermes-Oxum Boost Engine
export interface HermesBoostStatus {
  position?: number;
  activeUsers?: number;
  estimatedVisibility?: number;
  lastUpdateTime?: string;
  boostScore?: number;
  effectivenessScore?: number;
  isActive?: boolean;
}

export interface PulseBoost {
  id: string;
  name: string;
  durationMinutes: number;
  visibility: string;
  costUBX: number;
  description?: string;
  badgeColor?: string;
  color?: string;
  features?: string[];
  duration?: string;
  price?: number;
  price_ubx?: number;
  boost_power?: number;
  visibility_increase?: number;
  boostLevel?: number;
}

export interface ActiveBoost {
  boostId: string;
  startedAt: Date;
  expiresAt?: Date;
  userId?: string;
  visibility?: string;
  timeRemaining?: string;
  boostDetails?: any;
}

export interface EnhancedBoostStatus {
  isActive: boolean;
  activeBoostId?: string;
  startTime?: Date;
  endTime?: Date;
  timeRemaining?: string;
  progress?: number;
  profileId?: string;
  remainingTime?: string;
  expiresAt?: Date;
  boostPackage?: any;
  pulseData?: {
    visibility: string;
    pulseLevel?: number;
    boostType: string;
    coverage?: number;
  };
}

export type BoostDialogTabsProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  loading: boolean;
  boostStatus: BoostStatus;
  eligibility: BoostEligibility;
  boostPackages: BoostPackage[];
  selectedPackage: BoostPackage | null;
  setSelectedPackage: (pkg: BoostPackage | null) => void;
  handleBoost: () => void;
  handleCancel: () => void;
  dailyBoostUsage: number;
  dailyBoostLimit: number;
  hermesStatus?: HermesBoostStatus;
  formatBoostDuration?: (duration: string) => string;
  getBoostPrice?: () => number;
  handleDialogClose?: () => void;
};
