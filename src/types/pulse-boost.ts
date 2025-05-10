
export interface BoostPackage {
  id: string;
  name: string;
  description: string;
  price: number;
  price_ubx?: number;
  duration: string;
  visibility?: string | number;
  features?: string[];
  isMostPopular?: boolean;
  isPopular?: boolean;
  boost_power?: number;
}

export interface BoostEligibility {
  eligible: boolean;
  reason: string;
  reasons?: string[];
  nextEligibleTime?: string;
}

export interface BoostStatus {
  isActive: boolean;
  packageId?: string;
  packageName?: string;
  startTime?: Date | string;
  endTime?: Date | string;
  remainingTime?: string;
  expiresAt?: Date | string;
  boostPackage?: BoostPackage;
  progress?: number;
  timeRemaining?: string;
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

export interface BoostAnalytics {
  profileId: string;
  metrics: {
    impressions: number;
    clicks: number;
    conversion: number;
    visibility: number;
  };
  history: Array<{
    date: string;
    impressions: number;
    clicks: number;
  }>;
}

export interface PulseBoost {
  id: string;
  profileId: string;
  packageId: string;
  startTime: Date;
  endTime: Date;
  status: 'active' | 'expired' | 'cancelled';
  metrics?: {
    impressions: number;
    clicks: number;
    conversion: number;
  };
}
