
export interface PulseBoost {
  id: string;
  name: string;
  description?: string;
  duration: string; // e.g., "1d", "7d", "30d"
  price: number;
  price_ubx?: number;
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

export interface PulseBoostStatus {
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

export interface PulseBoostManager {
  boostStatus: PulseBoostStatus | null;
  loading: boolean;
  error: string | null;
  packages: PulseBoost[];
  activateBoost: (packageId: string) => Promise<boolean>;
  cancelBoost: () => Promise<boolean>;
  isEligible: boolean;
  eligibilityReason?: string;
  refreshStatus: () => void;
}
