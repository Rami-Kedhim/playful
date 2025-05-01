
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
  items?: { 
    id: string; 
    packageId: string; 
    startDate: Date; 
    endDate: Date; 
    price: number; 
    status: string;
  }[];
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

export interface PulseBoost {
  id: string;
  name: string;
  description: string;
  price: number;
  price_ubx?: number;
  duration: string;
  durationMinutes?: number;
  features?: string[];
  visibility?: string;
  visibility_increase?: number;
  color?: string;
  badgeColor?: string;
  boostMultiplier?: number;
}

// Add missing type exports for pulse-boost
export interface BoostPackage {
  id: string;
  name: string;
  description: string;
  price: number;
  price_ubx?: number;
  duration: string;
  durationMinutes?: number;
  features?: string[];
  visibility?: string;
  visibility_increase?: number;
  color?: string;
  badgeColor?: string;
  boostMultiplier?: number;
  isMostPopular?: boolean;
}

export interface BoostPurchaseRequest {
  profileId: string;
  packageId: string;
}

export interface BoostPurchaseResult {
  success: boolean;
  message?: string;
  boostId?: string;
  error?: string | null;
  transactionId?: string;
}

export interface BoostAnalytics {
  totalBoosts: number;
  activeBoosts: number;
  averageBoostScore: number;
  boostHistory?: Array<{
    date: Date;
    score: number;
  }>;
  additionalViews?: number;
  engagementIncrease?: number;
  rankingPosition?: number;
  views?: number;
}

export interface EnhancedBoostStatus {
  isActive: boolean;
  packageId?: string;
  startedAt?: Date;
  expiresAt?: Date;
  remainingTime?: string;
  packageName?: string;
  boostMultiplier?: number;
  boostPackage?: BoostPackage;
  progress?: number;
}
