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
  views?: number;
  impressions?: {
    value: number;
    change?: number;
    withBoost?: number;
    today?: number;
  };
  interactions?: {
    value: number;
    change?: number;
    withBoost?: number;
    today?: number;
  };
  additionalViews?: number;
  engagementIncrease?: number;
  rankingPosition?: number;
}

export interface PulseBoost extends BoostPackage {
  // Any additional fields specific to PulseBoost
  boostMultiplier?: number;
  isMostPopular?: boolean;
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
  packageName?: string;
  expiresAt?: Date;
  startedAt?: Date;
  timeRemaining?: string;
  progress?: number;
  boostPackage?: BoostPackage;
}

// Add UserRole type which is missing in authService
export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
  ESCORT = 'escort',
  CREATOR = 'creator',
  MODERATOR = 'moderator',
  AI = 'ai'
}
