export interface BoostPackage {
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
}

export interface BoostPurchaseResult {
  success: boolean;
  boostId: string;
  message?: string;
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
  profileId?: string;
  packageId?: string;
  startTime?: string;
  endTime?: string;
  status?: string;
}

export interface BoostStatus {
  isActive: boolean;
  packageId?: string;
  expiresAt?: Date;
  timeRemaining: string;
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
