
/**
 * Pulse Boost Module Types
 * Consolidated type definitions for the Pulse Boost system
 */

// Import existing types for compatibility
import { PulseBoost, ActiveBoost, EnhancedBoostStatus } from '@/types/pulse-boost';

export interface BoostPackage {
  id: string;
  name: string;
  description: string;
  price: number;
  price_ubx: number;
  duration: string;
  durationMinutes: number;
  visibility: 'homepage' | 'search' | 'smart_match' | 'global';
  visibility_increase: number;
  color?: string;
  features?: string[];
  popularityScore?: number;
  isRecommended?: boolean;
}

export interface BoostPurchaseRequest {
  packageId: string;
  profileId: string;
  paymentMethod: 'ubx' | 'credit' | 'crypto';
  couponCode?: string;
}

export interface BoostPurchaseResult {
  success: boolean;
  boostId?: string;
  transactionId?: string;
  startTime?: Date;
  endTime?: Date;
  error?: string;
}

export interface BoostAnalytics {
  profileId: string;
  impressions: {
    beforeBoost: number;
    duringBoost: number;
    percentageChange: number;
  };
  engagement: {
    beforeBoost: number;
    duringBoost: number; 
    percentageChange: number;
  };
  conversion: {
    beforeBoost: number;
    duringBoost: number;
    percentageChange: number;
  };
  returnOnInvestment: number;
  recommendedNextBoost?: BoostPackage;
}

export interface BoostHistory {
  boosts: Array<{
    id: string;
    packageId: string;
    packageName: string;
    startTime: Date;
    endTime: Date;
    price: number;
    visibility: string;
    performance: {
      impressionIncrease: number;
      engagementIncrease: number;
    };
  }>;
  totalSpent: number;
  averagePerformance: number;
}
