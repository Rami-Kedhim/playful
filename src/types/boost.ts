
export interface BoostPackage {
  id: string;
  name: string;
  description?: string;
  price: number;
  price_lucoin?: number;
  price_ubx?: number;
  duration: string;
  features?: string[];
  durationMinutes?: number;
  costUBX?: number;
  boostLevel?: number;
  boost_power?: number;
  visibility_increase?: number;
}

// Additional interfaces used in our components
export interface BoostProfileDialogProps {
  profileId?: string;
  onSuccess?: () => void;
  open?: boolean;
  setOpen?: (open: boolean) => void;
  buttonText?: string;
  buttonVariant?: string;
  buttonSize?: string;
}

export interface BoostAnalytics {
  impressions: {
    today: number;
    yesterday: number;
    weeklyAverage: number;
    withBoost: number;
    withoutBoost: number;
    increase: number;
  };
  interactions: {
    today: number;
    yesterday: number;
    weeklyAverage: number;
    withBoost: number;
    withoutBoost: number;
    increase: number;
  };
  rank: {
    current: number;
    previous: number;
    change: number;
  };
  trending: boolean;
  additionalViews: number;
  engagementIncrease: number;
  rankingPosition: number;
  clicks: {
    today: number;
    yesterday: number;
    weeklyAverage: number;
    withBoost: number;
    withoutBoost: number;
    increase: number;
  };
}

export interface BoostStatus {
  isActive: boolean;
  startTime?: string | Date;
  endTime?: string | Date;
  remainingTime?: string;
  expiresAt?: string | Date;
  boost_level?: number;
  packageId?: string;
  packageName?: string;
  boostPackage?: BoostPackage;
  timeRemaining?: string;
}

export interface BoostEligibility {
  isEligible: boolean;
  reason?: string;
  reasons?: string[]; // Add this for backward compatibility
}

export interface HermesStatus {
  position: number;
  activeUsers: number;
  estimatedVisibility: number;
  lastUpdateTime: string;
  boostScore?: number;
  effectivenessScore?: number;
  isActive?: boolean;
}

// Re-export HermesBoostStatus as an alias to HermesStatus for backward compatibility
export type HermesBoostStatus = HermesStatus;
