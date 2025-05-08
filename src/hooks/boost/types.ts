
export interface BoostStatus {
  isActive: boolean;
  isExpiring: boolean;
  expiresAt?: string | Date;
  remainingTime?: number; // in seconds
  boostLevel?: number;
  boostType?: string;
  modifiers?: Record<string, number>;
}

export interface HermesStatus {
  isActive: boolean;
  metrics?: {
    velocity: number;
    engagement: number;
    retention: number;
    conversion: number;
  }
}

export interface BoostPackage {
  id: string;
  name: string;
  description?: string;
  price: number;
  duration: string; // e.g., "1d", "7d", "30d"
  boostLevel: number;
  features?: string[];
  isPopular?: boolean;
  isMostPopular?: boolean;
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

