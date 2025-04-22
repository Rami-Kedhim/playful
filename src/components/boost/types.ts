
// Types for boost components

export interface BoostPackage {
  id: string;
  name: string;
  duration: string;
  price_ubx: number;
  description: string;
  features: string[];
}

export interface BoostStatus {
  isActive: boolean;
  progress?: number;
  expiresAt?: string;
  startedAt?: string;
  packageId?: string;
  pulseData?: any; // For Pulse Boost integration
}

export interface BoostEligibility {
  eligible: boolean;
  isEligible?: boolean; // For compatibility with both naming conventions
  reasons?: string[];
  reason?: string; // Add this field
  minimumProfileCompleteness?: number;
  missingFields?: string[];
  minRequiredBalance?: number;
}

export interface BoostPackagesProps {
  boostPackages?: BoostPackage[];
  packages?: BoostPackage[];
  selectedPackage?: string;
  onSelectPackage?: (packageId: string) => void;
  setSelectedPackage?: (packageId: string) => void;
  formatBoostDuration?: (duration: string) => string;
  formatDuration?: (duration: string) => string;
  getBoostPrice?: () => number;
  dailyBoostUsage?: number;
  dailyBoostLimit?: number;
  disabled?: boolean;
}

export interface HermesBoostStatus {
  position: number;
  activeUsers: number;
  estimatedVisibility: number;
  lastUpdateTime: string;
  isActive?: boolean; // For compatibility
  active?: boolean; // For compatibility
  timeRemaining?: number;
  boostScore?: number;
  effectivenessScore?: number;
}

export interface HermesBoostInfoProps {
  hermesStatus?: HermesBoostStatus;
  status?: HermesBoostStatus;
  hermesData?: HermesBoostStatus;
}

export interface AnalyticsData {
  impressions: number;
  clicks: number;
  engagementRate: number;
  conversionRate: number;
  boostEfficiency: number;
  
  // Make all optional to resolve conflicts
  additionalViews?: number;
  engagementIncrease?: number;
  rankingPosition?: number;
  views?: {
    today: number;
    yesterday: number;
    weeklyAverage: number;
    withBoost: number;
    withoutBoost?: number;
    increase?: number;
  };
  // Removed duplicate clicks property
  searchRanking?: {
    withoutBoost: number;
    withBoost: number;
    improvement: number;
  };
}

// Add missing types for BoostDialogTabsProps
export interface BoostDialogTabsProps {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  boostStatus: any;
  eligibility: any;
  hermesBoostStatus?: HermesBoostStatus;
  boostPackages: any[];
  selectedPackage: string | null;
  setSelectedPackage: (packageId: string) => void;
  formatBoostDuration: (duration: string) => string;
  getBoostPrice: () => number;
  handlePurchase: () => Promise<void>;
  handleCancel: () => Promise<void>;
  handleDialogClose: () => void;
  boostAnalytics?: any;
  dailyBoostUsage: number;
  dailyBoostLimit: number;
  loading: boolean;
}

// Add LivecamBoostPanelProps
export interface LivecamBoostPanelProps {
  livecamId?: string;
  model?: any;
  isCurrentlyBoosted?: boolean;
  isBoosted?: boolean;
  boostRank?: number;
  viewerIncreasePercent?: number;
  boostStatus?: any;
  onBoost?: () => void;
  onCancelBoost?: () => void;
}

// Add BoostDialogContainerProps
export interface BoostDialogContainerProps {
  open?: boolean;
  setOpen?: (open: boolean) => void;
  onSuccess?: () => void;
  profileId: string;
  buttonText?: string;
  buttonVariant?: string;
  buttonSize?: string;
}
