
// User role types
export type UserRole = 'USER' | 'ADMIN' | 'MODERATOR' | 'ESCORT' | 'CLIENT';

export const UserRoleEnum = {
  USER: 'USER' as UserRole,
  ADMIN: 'ADMIN' as UserRole,
  MODERATOR: 'MODERATOR' as UserRole,
  ESCORT: 'ESCORT' as UserRole,
  CLIENT: 'CLIENT' as UserRole
};

// Define the PulseBoost type
export interface PulseBoost {
  id: string;
  name: string;
  description: string;
  duration: string;
  durationMinutes?: number;
  price: number;
  price_ubx?: number;
  visibility?: string;
  visibility_increase?: number;
  features?: string[];
  color?: string;
  badgeColor?: string;
  boost_power?: number;
  boostMultiplier?: number;
}

// Define types for the Boost Package and related operations
export interface BoostPackage {
  id: string;
  name: string;
  description: string;
  price: number;
  price_ubx?: number;
  duration: string;
  durationMinutes?: number;
  features?: string[];
  visibility?: string;
  visibility_increase?: number;
  boost_power?: number;
  color?: string;
  badgeColor?: string;
  boostMultiplier?: number;
  isMostPopular?: boolean;
  isRecommended?: boolean;
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
  transactionId?: string;
}

export interface BoostAnalytics {
  totalBoosts: number;
  activeBoosts: number;
  averageBoostScore: number;
  boostHistory: Array<{
    date: Date;
    score: number;
  }>;
  additionalViews?: number;
  engagementIncrease?: number;
  rankingPosition?: number;
}

export interface BoostHistory {
  items: Array<{
    id: string;
    packageId: string;
    startDate: Date;
    endDate: Date;
    price: number;
    status: string;
  }>;
  userId?: string;
  startTime?: Date;
  endTime?: Date;
  boostType?: string;
  price?: number;
  status?: string;
}

export interface BoostStatus {
  isActive: boolean;
  packageId?: string;
  expiresAt?: Date;
  startedAt?: Date;
  timeRemaining?: string;
  remainingTime?: string;
  packageName?: string;
  boostPackage?: BoostPackage;
  progress?: number;
  startTime?: Date;
  endTime?: Date;
  activeBoostId?: string;
  boostMultiplier?: number;
}

export interface BoostEligibility {
  isEligible: boolean;
  eligible?: boolean; // For backward compatibility
  reason?: string;
  reasons?: string[];
  nextEligibleTime?: string;
  remainingBoosts?: number;
  maxBoostsPerDay?: number;
}

export interface HermesStatus {
  position: number;
  activeUsers: number;
  estimatedVisibility: number;
  lastUpdateTime: string;
  boostScore?: number;
  effectivenessScore?: number;
  isActive?: boolean;
}

export interface EnhancedBoostStatus {
  isActive: boolean;
  packageId?: string;
  packageName?: string;
  expiresAt?: Date;
  startedAt?: Date;
  timeRemaining?: string;
  boostPackage?: BoostPackage;
  progress?: number;
  boostMultiplier?: number;
  remainingTime?: string;
}

export interface BoostContextType {
  boostStatus: BoostStatus;
  eligibility: BoostEligibility;
  packages: BoostPackage[];
  boostPackages?: BoostPackage[];
  loading: boolean;
  error: string | null;
  boostProfile: (profileId: string, packageId: string) => Promise<boolean>;
  cancelBoost: () => Promise<boolean>;
  getBoostAnalytics: () => Promise<any>;
  fetchBoostPackages: () => Promise<BoostPackage[]>;
  dailyBoostUsage?: number;
  dailyBoostLimit?: number;
  formatBoostDuration?: (duration: string) => string;
  adaptGetBoostPrice?: (fn?: (pkg: BoostPackage) => number) => number;
  hermesStatus?: HermesStatus;
}

export interface BoostDialogTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  loading: boolean;
  boostStatus: BoostStatus;
  eligibility: BoostEligibility;
  boostPackages: BoostPackage[];
  selectedPackage: string;
  setSelectedPackage: (id: string) => void;
  handleBoost: () => Promise<boolean> | void;
  handleCancel: () => Promise<boolean>;
  dailyBoostUsage: number;
  dailyBoostLimit: number;
  handleDialogClose: () => void;
  getBoostPrice?: () => number;
  hermesStatus: HermesStatus;
  formatBoostDuration?: (duration: string) => string;
}
