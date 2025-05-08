
export interface BoostStatus {
  isActive: boolean;
  expiresAt?: string;
  activeSince?: string;
  appliedTo?: string[];
  boostType?: string;
  remainingTime?: string;
  progress?: number;
}

export interface BoostEligibility {
  eligible: boolean;
  reason?: string;
  requirements?: string[];
  cooldownRemaining?: string;
  nextEligibleDate?: string;
  dailyLimit?: number;
  dailyUsed?: number;
}

export interface BoostPackage {
  id: string;
  name: string;
  description?: string;
  price: number;
  duration: string;
  visibility: number;
  features?: string[];
  isPopular?: boolean;
  isRecommended?: boolean;
  discountPercentage?: number;
  originalPrice?: number;
  metadata?: Record<string, any>;
}

export interface HermesStatus {
  hasRecommendation: boolean;
  suggestedPackage?: string;
  conversionRate?: number;
  analyticsAvailable?: boolean;
  personalizedOffer?: {
    packageId: string;
    discount: number;
    expiresIn: string;
  };
}
