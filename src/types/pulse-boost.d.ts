
export interface BoostPackage {
  id: string;
  name: string;
  description: string;
  price: number;
  price_ubx?: number;
  duration: string;
  durationMinutes: number;
  features: string[];
  visibility: number | string;
  visibility_increase: number;
  color?: string;
  badgeColor?: string;
  boost_power?: number;
}

export interface PulseBoost {
  id: string;
  name: string;
  description: string;
  duration: string;
  durationMinutes: number;
  price: number;
  price_ubx?: number;
  features: string[];
  visibility: number | string;
  visibility_increase: number;
  color?: string;
  badgeColor?: string;
  boost_power?: number;
  isMostPopular?: boolean;
  isRecommended?: boolean;
}

export interface BoostPurchaseRequest {
  profileId: string;
  packageId: string;
}

export interface BoostPurchaseResult {
  success: boolean;
  boostId?: string;
  error?: string | null;
}

export interface BoostAnalytics {
  totalBoosts: number;
  activeBoosts: number;
  averageBoostScore: number;
  boostHistory: Array<{
    date: Date;
    score: number;
  }>;
  // Add these properties to fix the errors in useBoostOperations.ts
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

export interface BoostHistory {
  items: Array<{
    id: string;
    packageId: string;
    startDate: Date;
    endDate: Date;
    price: number;
    status: string;
  }>;
}
