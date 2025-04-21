
export interface BoostStatus {
  isActive: boolean;
  activeBoostId?: string;
  startTime?: Date;
  endTime?: Date;
  timeRemaining?: string;
  progress?: number;  // Making it optional to resolve type conflicts
  profileId?: string;
  remainingTime?: string;
  expiresAt?: Date;
  boostPackage?: BoostPackage;
  pulseData?: {
    type?: string;
    intensity?: number;
  }
}

export interface BoostPackage {
  id: string;
  name: string;
  description: string;
  duration: string;
  price_ubx: number;
  price?: number;
  features: string[];
}

export interface BoostEligibility {
  isEligible: boolean;
  reasons?: string[];
  minimumProfileCompleteness?: number;
  missingFields?: string[];
  minRequiredBalance?: number;
}

export interface BoostAnalytics {
  additionalViews?: number;
  engagementIncrease?: number;
  rankingPosition?: number;
  effectiveness?: number;
  views?: {
    today: number;
    yesterday: number;
    weeklyAverage: number;
    withBoost: number;
    withoutBoost?: number;
    increase?: number;
  };
  clicks?: {
    today: number;
    yesterday: number;
    weeklyAverage: number;
    withBoost: number;
    withoutBoost?: number;
    increase?: number;
  };
  searchRanking?: {
    withoutBoost: number;
    withBoost: number;
    improvement: number;
  };
}
