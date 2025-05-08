
export interface PulseBoost {
  id: string;
  name: string;
  description: string;
  price: number;
  price_ubx: number;
  duration: string;
  durationMinutes: number;
  visibility: string;
  visibility_increase: number;
  color?: string;
  badgeColor?: string;
  features: string[];
  isMostPopular?: boolean;
  boost_power?: number;
  boostMultiplier?: number;
}

export interface EnhancedBoostStatus {
  isActive: boolean;
  packageId?: string;
  expiresAt?: Date;
  timeRemaining?: string;
  progress?: number;
  boostPackage?: PulseBoost;
  packageName?: string;
  startedAt?: Date;
}

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
  boostMultiplier?: number;
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
  views?: number;
  impressions?: {
    value: number;
    change?: number;
    today?: number;
    withBoost?: number;
  };
  interactions?: {
    value: number;
    change?: number;
    today?: number;
    withBoost?: number;
  };
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

// Re-export UserRole to avoid the error in authService.ts
export enum UserRole {
  ADMIN = "admin",
  MODERATOR = "moderator",
  CLIENT = "client",
  ESCORT = "escort",
  CREATOR = "creator"
}
