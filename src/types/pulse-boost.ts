
export interface BoostPackage {
  id: string;
  name: string;
  description: string;
  price: number;
  price_ubx: number;
  duration: string;
  durationMinutes: number;
  features: string[];
  visibility: string;
  visibility_increase: number;
  color?: string;
  badgeColor?: string;
  boost_power?: number;
  boostMultiplier?: number;
  isMostPopular?: boolean;
}

export interface BoostStatus {
  isActive: boolean;
  packageId?: string;
  expiresAt?: Date | string;
  timeRemaining: string;
  boostPackage?: BoostPackage;
  progress?: number;
  packageName?: string;
  startedAt?: Date | string;
  activeBoostId?: string;
  startTime?: Date | string;
  endTime?: Date | string;
  isExpiring?: boolean;
  remainingTime?: string;
  boostLevel?: number;
}

export interface BoostEligibility {
  eligible: boolean;
  isEligible?: boolean;
  reason?: string;
  reasons: string[];
  nextEligibleTime?: string | Date;
  remainingBoosts?: number;
  maxBoostsPerDay?: number;
}

export interface BoostPurchaseRequest {
  profileId: string;
  packageId: string;
}

export interface BoostPurchaseResult {
  success: boolean;
  boostId?: string;
  error?: string | null;
  message?: string;
}
