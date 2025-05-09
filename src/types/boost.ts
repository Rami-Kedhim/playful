
import { VerificationLevel } from "./verification";

export interface PulseBoost {
  id: string;
  name: string; // Added missing property
  description: string; // Added missing property
  price: number; // Added missing property
  duration: number; // Added missing property
  features: string[]; // Added missing property
  isMostPopular?: boolean; // Added missing property
  boostLevel?: number;
  position: number;
  visibility: number;
  promotionRadius: number;
  includedFeatures?: string[];
  extraServices?: string[];
}

export interface BoostPackage {
  id: string;
  name?: string;
  description?: string;
  price: number;
  price_ubx?: number; // Added for backward compatibility
  boost_power?: number; // Added for backward compatibility
  boostLevel?: number; // Added for backward compatibility
  duration?: number; // in days
  position?: number;
  visibility?: number;
  features?: string[];
  isMostPopular?: boolean;
  isPopular?: boolean; // Added for backward compatibility
}

export interface BoostStatus {
  isActive: boolean;
  remainingTime?: string;  // Make this optional to fix useBoostStatusBase errors
  packageId?: string;
  packageName?: string;
  startedAt?: Date;
  expiresAt?: Date;
  progress?: number;
  activeBoostId?: string;
  boostPackage?: BoostPackage;
  // For compatibility with different component usages
  startTime?: Date | string;
  endTime?: Date | string;
  timeRemaining?: string;
  isExpiring?: boolean; // Added for compatibility
}

export interface BoostEligibility {
  isEligible: boolean;
  reasons?: string[];
  nextEligibleTime?: string;
}

export interface HermesStatus {
  position: number;
  activeUsers: number;
  estimatedVisibility: number;
  lastUpdateTime: string;
  boostScore: number;
  effectivenessScore: number;
  isActive?: boolean; // Added for compatibility
  metrics?: any; // Added for compatibility
}

export interface BoostAnalytics {
  totalBoosts: number;
  activeBoosts: number;
  averageBoostScore: number;
  boostHistory: Array<{
    date: Date;
    score: number;
  }>;
  views?: number;
  impressions?: {
    value: number;
    change?: number;
    withBoost?: number;
    withoutBoost?: number;
    increase?: number;
  };
  interactions?: {
    value: number;
    change?: number;
    withBoost?: number;
    withoutBoost?: number;
    increase?: number;
  };
}

export interface BoostDialogTabsProps {
  packages: BoostPackage[];
  selected: string;
  onSelect: (id: string) => void;
  onBoost: () => void;
  isLoading: boolean;
  eligibility: BoostEligibility;
  boostStatus: BoostStatus;
}

export interface BoostAnalyticsItem {
  label: string;
  value: number;
  change: number;
  icon?: React.ReactNode;
  formatter?: (value: number) => string;
}

export interface EnhancedBoostStatus extends BoostStatus {
  timeRemaining?: string;
  boostPackage?: BoostPackage;
}
