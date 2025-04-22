
export interface BoostStatus {
  isActive: boolean;
  packageId?: string;
  packageName?: string;
  startTime?: string;
  endTime?: string;
  expiresAt?: string | Date;
  remainingTime?: string;
  timeRemaining?: string;
  progress?: number;
  boostPackage?: BoostPackage;
  profileId?: string;
  boost_level?: number;
}

export interface BoostEligibility {
  isEligible: boolean;
  reason?: string;
  reasons?: string[];
}

export interface BoostPackage {
  id: string;
  name: string;
  description?: string;
  duration: string;
  price: number;
  price_ubx?: number;
  price_lucoin?: number;
  features?: string[];
  boost_power?: number;
  visibility_increase?: number;
  boostLevel?: number;
}

export interface BoostProfileDialogProps {
  profileId?: string;
  onSuccess?: () => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export interface HermesStatus {
  position: number;
  activeUsers: number;
  estimatedVisibility: number;
  lastUpdateTime: string;
  boostScore?: number;
  effectivenessScore?: number;
}
