
export interface BoostStatus {
  isActive: boolean;
  remainingTime: string;
  packageId?: string;
  startedAt?: Date;
  expiresAt?: Date;
  packageName?: string;
  progress?: number;
  activeBoostId?: string;
}

export interface HermesStatus {
  position: number;
  activeUsers: number;
  estimatedVisibility: number;
  lastUpdateTime: string;
  boostScore: number;
  effectivenessScore: number;
}

export interface BoostEligibility {
  isEligible: boolean;
  reasons?: string[];
}

export interface BoostPackage {
  id: string;
  name: string;
  description: string;
  duration: string;
  price: number;
  price_ubx: number;
  features: string[];
  boost_power: number;
  isMostPopular?: boolean; // Add missing property
  boostMultiplier?: number; // Add missing property
}

export interface BoostAnalyticsItem {
  value: number;
  change?: number;
  withBoost?: number; // Add missing property
  today?: number; // Add missing property
}

export interface AnalyticsData {
  views?: number;
  impressions?: {
    today: number;
    yesterday: number;
    weeklyAverage: number;
    withBoost: number;
  };
  interactions?: {
    today: number;
    yesterday: number;
    weeklyAverage: number;
    withBoost: number;
  };
  rank?: {
    current: number;
    previous: number;
    change: number;
  };
  additionalViews?: number; // Add missing property
}
