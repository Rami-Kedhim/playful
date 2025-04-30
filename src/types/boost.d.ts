
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
  startTime?: string;
  endTime?: string;
  remainingTime?: string;
  expiresAt?: string;
  boost_level?: number;
  activeBoostId?: string;
  packageId?: string;
  timeRemaining?: string;
  boostPackage?: BoostPackage;
  packageName?: string;
}

export interface BoostEligibility {
  isEligible: boolean;
  reason?: string;
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
  boostActive: boolean;
  visibilityScore?: number;
}
