
import { BoostPackage } from '@/types/boost';

export const PULSE_BOOSTS: BoostPackage[] = [
  {
    id: 'basic',
    name: 'Standard Boost',
    description: 'Increase your visibility in search results',
    price: 50,
    duration: '24 hours',
    features: [
      'Top of search results',
      'Featured in discover section',
      'Standard visibility boost'
    ],
    boostLevel: 1,
    color: '#3b82f6'
  },
  {
    id: 'premium',
    name: 'Premium Boost',
    description: 'Get maximum exposure across the platform',
    price: 150,
    duration: '24 hours',
    features: [
      'Top placement in all listings',
      'Featured on homepage',
      'Premium visibility badge',
      '3x visibility compared to Standard'
    ],
    boostLevel: 3,
    color: '#8b5cf6'
  },
  {
    id: 'ultra',
    name: 'Ultra Boost',
    description: 'Dominate the platform with maximum visibility',
    price: 300,
    duration: '24 hours',
    features: [
      'Highest priority placement',
      'Featured banner promotion',
      'Special highlight effects',
      '5x visibility compared to Standard',
      'Enhanced matching algorithm'
    ],
    boostLevel: 5,
    color: '#ec4899'
  }
];

export const GLOBAL_UBX_RATE = 100;

/**
 * Formats a duration in minutes to a human-readable string
 */
export const formatPulseBoostDuration = (durationMinutes: number): string => {
  if (durationMinutes < 60) {
    return `${durationMinutes} minutes`;
  } else if (durationMinutes < 1440) {
    const hours = durationMinutes / 60;
    return `${hours} ${hours === 1 ? 'hour' : 'hours'}`;
  } else {
    const days = Math.floor(durationMinutes / 1440);
    const hours = Math.floor((durationMinutes % 1440) / 60);
    if (hours === 0) {
      return `${days} ${days === 1 ? 'day' : 'days'}`;
    }
    return `${days} ${days === 1 ? 'day' : 'days'}, ${hours} ${hours === 1 ? 'hour' : 'hours'}`;
  }
};

/**
 * Convert a duration string like "24 hours" to minutes
 */
export const convertDurationToMinutes = (duration: string): number => {
  if (duration.includes('minutes') || duration.includes('minute')) {
    return parseInt(duration);
  } else if (duration.includes('hours') || duration.includes('hour')) {
    return parseInt(duration) * 60;
  } else if (duration.includes('days') || duration.includes('day')) {
    return parseInt(duration) * 24 * 60;
  }
  return 0;
};
