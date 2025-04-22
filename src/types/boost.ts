
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
}

export interface BoostStatus {
  isActive: boolean;
  timeRemaining?: string;
  expiresAt?: Date;
  level?: number;
  purchasedAt?: Date;
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

export interface BoostActivePackageProps {
  boostStatus: BoostStatus;
  hermesData?: HermesData;
}

export interface BoostProfileDialogProps {
  onSuccess: () => void;
  onClose?: () => void;
  open: boolean;
  setOpen: () => void;
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
