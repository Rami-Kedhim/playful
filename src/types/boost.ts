
export interface BoostPackage {
  id: string;
  name: string;
  description: string;
  price: number;
  price_ubx: number;
  durationMinutes: number;
  duration: string;
  features: string[];
  visibility: string;
  visibility_increase: number;
  color?: string;
  badgeColor?: string;
  boost_power?: number;
  boostMultiplier?: number;
  isPopular?: boolean;
  isMostPopular?: boolean;
}

export interface BoostStatus {
  isActive: boolean;
  remainingTime: string;
  packageId?: string;
  packageName?: string;
  startedAt?: Date;
  expiresAt?: Date;
  progress?: number;
  activeBoostId?: string;
  boostPackage?: BoostPackage;
  // For compatibility with different component usages
  startTime?: Date;
  endTime?: Date;
  timeRemaining?: string;
}

export interface BoostEligibility {
  isEligible: boolean;
  reasons?: string[];
  nextEligibleTime?: string;
}

export interface HermesStatus {
  position: number;
  activeUsers: number;
  estimatedVisibility: number;
  lastUpdateTime: string;
  boostScore: number;
  effectivenessScore: number;
}

export interface BoostAnalytics {
  totalBoosts: number;
  activeBoosts: number;
  averageBoostScore: number;
  boostHistory: Array<{
    date: Date;
    score: number;
  }>;
  views?: number;
  impressions?: {
    value: number;
    change?: number;
  };
  interactions?: {
    value: number;
    change?: number;
  };
}

export interface BoostDialogTabsProps {
  packages: BoostPackage[];
  selected: string;
  onSelect: (id: string) => void;
  onBoost: () => void;
  isLoading: boolean;
  eligibility: BoostEligibility;
  boostStatus: BoostStatus;
}

export interface BoostAnalyticsItem {
  label: string;
  value: number;
  change: number;
  icon?: React.ReactNode;
  formatter?: (value: number) => string;
}

export interface PulseBoost {
  id: string;
  profileId: string;
  packageId: string;
  startTime: Date;
  endTime: Date;
  status: 'active' | 'expired' | 'cancelled';
}
