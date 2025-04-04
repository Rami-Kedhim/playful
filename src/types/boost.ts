
export interface BoostParams {
  country: string;
  completeness: number;
  rating: number;
  timeSlot: 'off_peak' | 'normal' | 'peak';
  role: 'regular' | 'AI' | 'verified';
}

export interface BoostPackage {
  id: string;
  name: string;
  duration: string; // PostgreSQL interval format (e.g. "168:00:00" for 7 days)
  price_lucoin: number;
  features?: string[];
  description?: string;
}

export interface BoostStatus {
  isActive: boolean;
  expiresAt?: Date;
  boostPackage?: BoostPackage;
  remainingTime?: string;
  progress?: number;
}

export interface BoostScoreData {
  score: number;
  factors: {
    verification: number;
    profileCompletion: number;
    activity: number;
    interaction: number;
    content: number;
    boostedCredits: number;
  };
  lastUpdated: Date;
}

export interface BoostAnalytics {
  views: {
    withBoost: number;
    withoutBoost: number;
    increase: number;
  };
  clicks: {
    withBoost: number;
    withoutBoost: number;
    increase: number;
  };
  searchRanking: {
    withBoost: number;
    withoutBoost: number;
    improvement: number;
  };
  effectiveness: number;
}
