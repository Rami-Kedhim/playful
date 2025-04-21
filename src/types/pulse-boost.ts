
/**
 * Types and interfaces for the PULSE Boosting Engine
 * PULSE = Precision Upgrade Layer for Scalable Exposure
 * Version 1.0 - Optimized for UBX Token
 */

export type UserRole = 'client' | 'escort' | 'creator';

export type SubscriptionLevel =
  | 'free'
  | 'trial'
  | 'basic'
  | 'gold'
  | 'black'
  | 'verified'
  | 'pro'
  | 'elite';

export interface SubscriptionPlan {
  level: SubscriptionLevel;
  role: UserRole;
  durationDays: number;
  priceUBX: number;
  features: string[];
  isWeekly?: boolean;
}

export interface PulseBoost {
  id: string;
  name: string;
  durationMinutes: number;
  visibility: 'homepage' | 'search' | 'smart_match' | 'global';
  costUBX: number;
  autoApplyWithPlan?: SubscriptionLevel[];
  description?: string;
  badgeColor?: string;
}

export interface ActiveBoost {
  boostId: string;
  startedAt: Date;
  expiresAt: Date;
  userId?: string;
  visibility?: string;
}

export interface UserEconomy {
  userId: string;
  ubxBalance: number;
  subscriptionLevel: SubscriptionLevel;
  subscriptionExpiresAt: Date;
  activeBoosts: ActiveBoost[];
}

// Enhanced type that combines the existing boost status with Pulse boost features
export interface EnhancedBoostStatus {
  isActive: boolean;
  activeBoostId?: string;
  startTime?: Date;
  endTime?: Date;
  timeRemaining?: string;
  progress: number | undefined;
  profileId?: string;
  remainingTime?: string;
  expiresAt?: Date;
  boostPackage?: any;
  pulseData?: {
    visibility: string;
    pulseLevel: number;
    boostType: string;
  };
}
