
export interface BoostStatus {
  isActive: boolean;
  progress: number;
  remainingTime: string;
  expiresAt?: Date;
  boostPackage?: BoostPackage;
}

export interface BoostPackage {
  id: string;
  name: string;
  duration: string;
  price_lucoin: number;
  features?: string[];
  description?: string; // Added this field
}

// Add BoostAnalytics interface
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

// Add BoostParams interface for boost calculation
export interface BoostParams {
  country: string;
  completeness: number;
  rating: number;
  timeSlot: 'off_peak' | 'normal' | 'peak';
  role: 'verified' | 'regular' | 'AI';
}
