
export interface PulseBoost {
  id: string;
  profileId?: string;
  packageId?: string;
  startTime?: Date;
  endTime?: Date;
  status?: string;
  
  // Additional properties needed by PulseBoostManager
  name: string;
  description: string;
  duration: string;
  price: number;
  price_ubx: number;
  features: string[];
  visibility?: string | number;
  visibility_increase: number;
  color?: string;
  badgeColor?: string;
  durationMinutes: number;
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
  remainingTime?: string; // in seconds or formatted time
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

// Define EnhancedBoostStatus as an interface that extends PulseBoostStatus
export interface EnhancedBoostStatus extends PulseBoostStatus {
  packageName?: string;
  expiresAt?: Date;
  startedAt?: Date;
  timeRemaining?: string;
  progress?: number;
  boostPackage?: BoostPackage;
  packageId?: string;
  isActive: boolean; // This property is required
  remainingMinutes?: number;
  percentRemaining?: number;
  isExpired?: boolean;
}

// Redefine BoostStatus for compatibility
export interface BoostStatus {
  isActive: boolean;
  packageId?: string;
  expiresAt?: Date | string;
  startedAt?: Date | string;
  timeRemaining?: string;
  remainingTime?: string;
  packageName?: string;
  boostPackage?: BoostPackage;
  progress?: number;
  startTime?: Date;
  endTime?: Date;
  activeBoostId?: string;
  boostMultiplier?: number;
  level?: number;
  remainingDays?: number;
  boostLevel?: number;
  isExpiring?: boolean;
}

// Update the BoostPackage interface
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
  isMostPopular?: boolean;
}

export interface HermesStatus {
  score?: number;
  position?: number;
  estimatedVisibility?: number;
  recommendations?: string[];
  lastUpdated?: Date;
  boostScore?: number;
  effectivenessScore?: number;
  isActive?: boolean;
  activeUsers?: number;
  lastUpdateTime?: string;
}

export interface BoostEligibility {
  eligible: boolean;
  isEligible?: boolean;
  reason?: string;
  reasons?: string[];
  nextEligibleTime?: Date | string;
}

export interface BoostPackagesProps {
  packages: BoostPackage[];
  profileId: string;
  onSuccess?: () => void | Promise<void>;
  onBoost?: () => Promise<boolean>;
}
