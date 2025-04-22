
// Defining types for boost-related components

export interface BoostPackage {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  features: string[];
  boostLevel: number;
  color?: string;
  price_ubx?: number;
  is_featured?: boolean;
}

export interface BoostStatus {
  isActive: boolean;
  timeRemaining?: string;
  expiresAt?: Date;
  level?: number;
  purchasedAt?: Date;
  progress?: number;
  remainingTime?: string;
  packageName?: string;
  startTime?: string;
  endTime?: string;
  boostPackage?: BoostPackage;
}

export interface EnhancedBoostStatus extends BoostStatus {
  pulseData?: {
    boostType: string;
    visibility: string;
    coverage: number;
    trend?: number;
  };
  endTime?: Date;
  remainingTime?: string;
}

export interface ActiveBoost {
  boostId: string;
  startedAt: Date;
  expiresAt: Date;
  timeRemaining: string;
  boostDetails?: BoostPackage;
}

export interface UserBoostState {
  activeBoosts: ActiveBoost[];
  boostHistory: any[];
  enhancedBoostStatus: EnhancedBoostStatus;
}

export interface UserEconomy {
  ubxBalance: number;
  walletAddress?: string;
  transactions?: any[];
}

export interface HermesData {
  position: number;
  activeUsers: number;
  estimatedVisibility: number;
  lastUpdateTime: string;
}

export interface HermesBoostStatus {
  position: number;
  activeUsers: number;
  estimatedVisibility: number;
  lastUpdateTime: string;
}

export interface BoostActivePackageProps {
  boostStatus: BoostStatus;
  hermesData?: HermesData;
}

export interface BoostProfileDialogProps {
  onSuccess: () => void;
  onClose?: () => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  profileId?: string;
}

// Define the PulseBoostProps interface
export interface PulseBoostProps {
  profileId?: string;
}

// Define the return type for usePulseBoost
export interface UsePulseBoostReturn {
  isLoading: boolean;
  error: string | null;
  userEconomy: UserEconomy | null;
  purchaseBoost: (boostPackage: BoostPackage) => Promise<boolean>;
  cancelBoost: (boostId?: string) => Promise<boolean>;
  activeBoosts: ActiveBoost[];
  enhancedBoostStatus: EnhancedBoostStatus;
  pulseBoostPackages: BoostPackage[];
}

export interface BoostEligibility {
  isEligible: boolean;
  reason?: string;
}

export interface AnalyticsData {
  additionalViews: number;
  engagementIncrease: number;
  rankingPosition: number;
  // Add other fields as needed
}

export interface PulseBoost {
  id: string;
  name: string;
  durationMinutes: number;
  visibility: string;
  costUBX: number;
  description?: string;
  badgeColor?: string;
}
