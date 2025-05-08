
/**
 * Boost System Type Definitions
 */

export interface BoostStatus {
  isActive: boolean;
  isExpiring?: boolean;
  expiresAt?: string | Date;
  remainingTime?: number | string; // in seconds or formatted time
  boostLevel?: number;
  boostType?: string;
  modifiers?: Record<string, number>;
  packageName?: string;
  packageId?: string;
  startedAt?: Date | string;
  progress?: number;
  timeRemaining?: string;
}

export interface HermesStatus {
  isActive: boolean;
  metrics?: {
    velocity: number;
    engagement: number;
    retention: number;
    conversion: number;
  };
  position?: number;
  activeUsers?: number;
  estimatedVisibility?: number;
  lastUpdateTime?: string;
  boostScore?: number;
  effectivenessScore?: number;
}

export interface BoostPackage {
  id: string;
  name: string;
  description?: string;
  price: number;
  price_ubx?: number;
  duration: string; // e.g., "1d", "7d", "30d"
  boostLevel?: number;
  features?: string[];
  visibility?: string | number;
  visibility_increase?: number;
  color?: string;
  badgeColor?: string;
  durationMinutes?: number;
  boost_power?: number;
  isMostPopular?: boolean;
  isPopular?: boolean;
  isRecommended?: boolean;
  isActive?: boolean;
}

export interface BoostManagerHook {
  boostStatus: BoostStatus | null;
  hermesStatus: HermesStatus | null;
  loading: boolean;
  error: string | null;
  packages: BoostPackage[];
  activateBoost: (packageId: string) => Promise<boolean>;
  cancelBoost: () => Promise<boolean>;
  isEligible: boolean;
  eligibilityReason?: string;
  refreshStatus: () => void;
}
