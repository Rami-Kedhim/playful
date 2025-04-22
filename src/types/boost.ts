
export interface BoostStatus {
  isActive: boolean;
  packageId?: string;
  packageName?: string;
  startTime?: string;
  endTime?: string;
  expiresAt?: string | Date;
  remainingTime?: string;
  timeRemaining?: string;
  progress?: number;
  boostPackage?: BoostPackage;
  profileId?: string;
  boost_level?: number;
}

export interface BoostEligibility {
  isEligible: boolean;
  reason?: string;
  reasons?: string[];
}

export interface BoostPackage {
  id: string;
  name: string;
  description?: string;
  duration: string;
  price: number;
  price_ubx?: number;
  features?: string[];
  boost_power?: number;
  visibility_increase?: number;
  boostLevel?: number;
  color?: string;
  is_featured?: boolean;
}

export interface BoostProfileDialogProps {
  profileId?: string;
  onSuccess?: () => void;
  open: boolean;
  setOpen: (open: boolean) => void;
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
  // Additional properties for HermesBoostStatus
}

export interface BoostAnalytics {
  impressions: number;
  clicks: number;
  ctr: number;
  time_period: string;
}

export interface PulseBoost extends BoostPackage {
  color: string;
  is_featured?: boolean;
}

export interface BoostDialogTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  loading: boolean;
  boostStatus: BoostStatus;
  eligibility: BoostEligibility;
  boostPackages: BoostPackage[];
  selectedPackage: string | null;
  setSelectedPackage: (packageId: string) => void;
  handleBoost: () => Promise<boolean>;
  handleCancel: () => Promise<boolean>;
  dailyBoostUsage: number;
  dailyBoostLimit: number;
  handleDialogClose: () => void;
  getBoostPrice: () => number;
  hermesStatus: HermesStatus;
  formatBoostDuration: (duration: string) => string;
}

export interface HermesData {
  // Add required properties
  position?: number;
  visibilityScore?: number;
}
