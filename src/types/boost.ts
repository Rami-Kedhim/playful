
export interface BoostStatus {
  isActive: boolean;
  activeBoostId?: string;
  startTime?: Date;
  endTime?: Date;
  timeRemaining?: string;
  progress?: number;
  profileId?: string;
}

export interface BoostPackage {
  id: string;
  name: string;
  description: string;
  duration: string;
  price: number;
  features: string[];
}

export interface BoostEligibility {
  isEligible: boolean;
  reasons?: string[];
}

export interface BoostAnalytics {
  additionalViews: number;
  engagementIncrease: number;
  rankingPosition: number;
  effectiveness?: number;
  views?: {
    withoutBoost: number;
    withBoost: number;
    increase: number;
  };
  clicks?: {
    withoutBoost: number;
    withBoost: number;
    increase: number;
  };
  searchRanking?: {
    withoutBoost: number;
    withBoost: number;
    improvement: number;
  };
}
