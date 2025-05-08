
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
  isPopular?: boolean;
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
    withoutBoost?: number;
    today?: number;
    yesterday?: number;
    weeklyAverage?: number;
    increase?: number;
  };
  interactions?: {
    value: number;
    change?: number;
    withBoost?: number;
    withoutBoost?: number;
    today?: number;
    yesterday?: number;
    weeklyAverage?: number;
    increase?: number;
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

export interface PulseBoost {
  id: string;
  profileId?: string;
  packageId?: string;
  startTime?: Date;
  endTime?: Date;
  status?: 'active' | 'expired' | 'cancelled';
  name: string;
  description: string;
  price: number;
  price_ubx: number;
  durationMinutes: number;
  features: string[];
  visibility: string;
  visibility_increase: number;
  color?: string;
  badgeColor?: string;
  boost_power?: number;
  boostMultiplier?: number;
  duration: string;
  isMostPopular?: boolean;
}

export interface EnhancedBoostStatus {
  isActive: boolean;
  remainingTime?: string;
  packageId?: string;
  packageName?: string;
  startedAt?: Date;
  expiresAt?: Date;
  progress?: number;
  timeRemaining?: string;
  boostPackage?: BoostPackage;
}

export interface BoostStatus {
  isActive: boolean;
  packageId?: string;
  expiresAt?: Date;
  timeRemaining?: string;
  packageName?: string;
  startedAt?: Date;
  activeBoostId?: string;
  startTime?: Date;
  endTime?: Date;
  progress?: number;
  remainingTime?: string;
  boostPackage?: BoostPackage;
}

export interface UserCredentials {
  email: string;
  password: string;
}

// For authService.ts
export interface UserProfile {
  id: string;
  email?: string;
  username?: string;
  fullName?: string;
  name?: string;
  avatar_url?: string;
  avatarUrl?: string;
  bio?: string;
  location?: string;
  phone?: string;
  website?: string;
  isVerified?: boolean;
  verified?: boolean;
  role?: string;
  roles?: string[];
  user_metadata?: Record<string, any>;
  verification_level?: string;
  sexual_orientation?: string;
  services?: string[];
  languages?: string[];
  rates?: Record<string, any>;
  availability?: Record<string, any>;
  isBoosted?: boolean;
  is_boosted?: boolean;
  userId?: string;
  createdAt?: Date;
}
