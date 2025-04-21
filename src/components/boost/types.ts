
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
  reasons?: string[];
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
}

export interface HermesBoostInfoProps {
  status?: HermesBoostStatus;
  hermesStatus?: HermesBoostStatus;
}

export interface AnalyticsData {
  impressions: number;
  clicks: number;
  engagementRate: number;
  conversionRate: number;
  boostEfficiency: number;
  
  // Additional properties needed
  additionalViews?: number;
  engagementIncrease?: number;
  rankingPosition?: number;
  views?: {
    today: number;
    yesterday: number;
    weeklyAverage: number;
    withBoost: number;
  };
  clicks?: {
    today: number;
    yesterday: number;
    weeklyAverage: number;
    withBoost: number;
  };
}
