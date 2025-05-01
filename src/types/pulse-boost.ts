
/**
 * Pulse Boost System Types
 */

export interface BoostSettings {
  boostMultiplier: number;
  boostDuration: number;
  boostPrice: number;
  boostType: 'standard' | 'premium' | 'vip';
}

export interface BoostHistory {
  id: string;
  userId: string;
  startTime: Date;
  endTime: Date;
  boostType: string;
  boostMultiplier: number;
  price: number;
  status: 'active' | 'completed' | 'cancelled';
}

export interface BoostStats {
  totalViews: number;
  viewsIncrease: number;
  engagementRate: number;
  conversionRate: number;
}

export interface BoostRecommendation {
  recommendedBoost: BoostSettings;
  estimatedViews: number;
  estimatedConversions: number;
  reason: string;
}
