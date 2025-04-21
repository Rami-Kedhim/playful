
import { PulseBoost, SubscriptionPlan } from "@/types/pulse-boost";

/**
 * Pulse Boost Configuration
 * PULSE = Precision Upgrade Layer for Scalable Exposure
 */

// Subscription plans for different user roles
export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  // CLIENTS
  {
    level: 'free',
    role: 'client',
    durationDays: 0,
    priceUBX: 0,
    features: ['Browse public profiles']
  },
  {
    level: 'trial',
    role: 'client',
    durationDays: 7,
    priceUBX: 50,
    features: ['Try messaging', 'Limited filters', 'Access basic boosts'],
    isWeekly: true
  },
  {
    level: 'basic',
    role: 'client',
    durationDays: 30,
    priceUBX: 200,
    features: ['Messaging unlocked', 'Access to verified profiles']
  },
  {
    level: 'gold',
    role: 'client',
    durationDays: 30,
    priceUBX: 500,
    features: ['Advanced filters', 'Gift system', 'Route sharing']
  },
  {
    level: 'black',
    role: 'client',
    durationDays: 30,
    priceUBX: 1000,
    features: ['Unlimited access', 'Smart suggestions by AI', 'Priority support']
  },

  // ESCORTS / CREATORS
  {
    level: 'free',
    role: 'escort',
    durationDays: 0,
    priceUBX: 0,
    features: ['Basic public profile']
  },
  {
    level: 'trial',
    role: 'escort',
    durationDays: 7,
    priceUBX: 50,
    features: ['Try inbox access', 'Partial stats', 'Basic visibility'],
    isWeekly: true
  },
  {
    level: 'verified',
    role: 'escort',
    durationDays: 30,
    priceUBX: 200,
    features: ['Profile verified', 'Messaging enabled', 'Visible in searches']
  },
  {
    level: 'pro',
    role: 'escort',
    durationDays: 30,
    priceUBX: 500,
    features: ['Pulse Boosts included', 'Insights & analytics', 'Marketing AI tools']
  },
  {
    level: 'elite',
    role: 'escort',
    durationDays: 30,
    priceUBX: 1000,
    features: ['Promo campaigns', 'Priority homepage', 'Advanced AI content generation']
  }
];

// Pulse Boost types with enhanced descriptions and visual attributes
export const PULSE_BOOSTS: PulseBoost[] = [
  {
    id: 'flash_boost',
    name: 'Pulse Flash Boost',
    durationMinutes: 30,
    visibility: 'homepage',
    costUBX: 25,
    description: 'Quick 30-minute homepage visibility boost for immediate attention',
    badgeColor: '#FF7700'
  },
  {
    id: 'hourly_boost',
    name: 'Pulse Hourly Boost',
    durationMinutes: 60,
    visibility: 'search',
    costUBX: 40,
    description: '1-hour boost in search results for enhanced visibility',
    badgeColor: '#5D9CEC'
  },
  {
    id: 'smart_boost',
    name: 'Pulse Smart Boost',
    durationMinutes: 360,
    visibility: 'smart_match',
    costUBX: 100,
    description: '6-hour boost with AI-driven targeting to match ideal clients',
    badgeColor: '#8C44FF'
  },
  {
    id: 'gold_boost',
    name: 'Pulse Gold Boost',
    durationMinutes: 1440,
    visibility: 'global',
    costUBX: 200,
    autoApplyWithPlan: ['pro', 'elite'],
    description: '24-hour global visibility across all platform features',
    badgeColor: '#FFD700'
  },
  {
    id: 'weekend_boost',
    name: 'Pulse Full Weekend Boost',
    durationMinutes: 4320,
    visibility: 'global',
    costUBX: 500,
    description: '3-day weekend boost for maximum visibility during peak times',
    badgeColor: '#FF1493'
  }
];

// Convert minutes to human-readable duration
export function formatPulseBoostDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} minutes`;
  } else if (minutes < 1440) {
    const hours = minutes / 60;
    return `${hours} ${hours === 1 ? 'hour' : 'hours'}`;
  } else {
    const days = Math.floor(minutes / 1440);
    const remainingHours = Math.floor((minutes % 1440) / 60);
    
    if (remainingHours === 0) {
      return `${days} ${days === 1 ? 'day' : 'days'}`;
    }
    return `${days} ${days === 1 ? 'day' : 'days'} ${remainingHours} ${remainingHours === 1 ? 'hour' : 'hours'}`;
  }
}

// Get boost by ID
export function getPulseBoostById(boostId: string): PulseBoost | undefined {
  return PULSE_BOOSTS.find(boost => boost.id === boostId);
}

// Get subscription plan by level and role
export function getSubscriptionPlan(level: string, role: string): SubscriptionPlan | undefined {
  return SUBSCRIPTION_PLANS.find(
    plan => plan.level === level && plan.role === role
  );
}
