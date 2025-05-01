
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
}

export interface EnhancedBoostStatus {
  isActive: boolean;
  packageId?: string;
  expiresAt?: Date;
  timeRemaining?: string;
  boostPackage?: BoostPackage;
  progress?: number;
  // Add the missing properties
  packageName?: string;
  startedAt?: Date;
}
