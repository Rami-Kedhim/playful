
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
  isRecommended?: boolean;
}

export interface BoostPurchaseResult {
  success: boolean;
  boostId?: string;
  error?: string | null;
  message?: string;
  transactionId?: string;
}

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
  features: string[];
  color?: string;
  badgeColor?: string;
  boost_power?: number;
  boostMultiplier?: number;
  profileId?: string;
  packageId?: string;
  startTime?: string;
  endTime?: string;
  status?: string;
  isMostPopular?: boolean;
}

export interface BoostStatus {
  isActive: boolean;
  packageId?: string;
  expiresAt?: Date;
  timeRemaining: string;
}

export interface EnhancedBoostStatus extends BoostStatus {
  packageName?: string;
  startedAt?: Date;
  progress?: number;
  boostPackage?: BoostPackage;
  remainingTime?: string;
}

export interface UserProfile {
  id: string;
  email?: string;
  username?: string;
  fullName?: string;
  full_name?: string;
  bio?: string;
  avatar_url?: string;
  role?: string;
  phone?: string;
  website?: string;
  location?: string;
  sexual_orientation?: string;
  created_at?: string;
  updated_at?: string;
  userId?: string;
  createdAt?: Date;
  isBoosted?: boolean;
  is_boosted?: boolean;
}

export interface UserCredentials {
  email: string;
  password: string;
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
  views?: number;
  impressions?: {
    today?: number;
    yesterday?: number;
    weeklyAverage?: number;
    withBoost?: number;
    withoutBoost?: number;
    increase?: number;
    change?: number;
    value?: number;
  };
  interactions?: {
    today?: number;
    yesterday?: number;
    weeklyAverage?: number;
    withBoost?: number;
    withoutBoost?: number;
    increase?: number;
    change?: number;
    value?: number;
  };
}

export const PULSE_BOOSTS: PulseBoost[] = [
  {
    id: 'boost-1',
    name: 'Bronze Boost',
    description: 'Increase your profile visibility for 24 hours',
    price: 4.99,
    price_ubx: 499,
    duration: '24 hours',
    durationMinutes: 1440,
    visibility: '25%',
    visibility_increase: 25,
    features: ['Increased profile views', 'Higher search ranking']
  },
  {
    id: 'boost-2',
    name: 'Silver Boost',
    description: 'Greatly increase your profile visibility for 7 days',
    price: 9.99,
    price_ubx: 999,
    duration: '7 days',
    durationMinutes: 10080,
    visibility: '50%',
    visibility_increase: 50,
    features: ['Significantly increased profile views', 'Featured in search results']
  },
  {
    id: 'boost-3',
    name: 'Gold Boost',
    description: 'Dramatically increase your profile visibility for 30 days',
    price: 24.99,
    price_ubx: 2499,
    duration: '30 days',
    durationMinutes: 43200,
    visibility: '100%',
    visibility_increase: 100,
    features: ['Maximum profile views', 'Top placement in search results', 'Priority support']
  }
];
