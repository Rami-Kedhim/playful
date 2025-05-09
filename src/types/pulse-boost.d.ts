
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
  price_ubx?: number;
  features: string[];
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
}

// Redefine other types used in the files
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
}

// Update the BoostStatus interface to match usage
export interface BoostStatus {
  isActive: boolean;
  packageName?: string;
  startTime?: Date;
  endTime?: Date;
  remainingTime?: string;
  packageId?: string;
  progress?: number;
  startedAt?: Date;
  expiresAt?: Date;
  timeRemaining?: string;
}
