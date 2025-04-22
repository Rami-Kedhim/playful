
import { PulseBoost } from '@/types/boost';

export const PULSE_BOOSTS: PulseBoost[] = [
  {
    id: 'basic',
    name: 'Basic Boost',
    description: 'Increase visibility on homepage for 6 hours',
    duration: '06:00:00',
    durationMinutes: 6 * 60,
    price: 15,
    price_ubx: 150,
    costUBX: 150,
    visibility: 'homepage',
    color: '#60a5fa',
    badgeColor: '#60a5fa',
    features: ['Homepage visibility', 'Basic recommendation boost'],
    boost_power: 50,
    visibility_increase: 50,
    boostLevel: 1
  },
  {
    id: 'standard',
    name: 'Standard Boost',
    description: 'Increase visibility across platform for 24 hours',
    duration: '24:00:00',
    durationMinutes: 24 * 60,
    price: 30,
    price_ubx: 300,
    costUBX: 300,
    visibility: 'platform',
    color: '#8b5cf6',
    badgeColor: '#8b5cf6',
    features: ['Homepage visibility', 'Search visibility', 'Standard recommendation boost'],
    boost_power: 100,
    visibility_increase: 100,
    boostLevel: 2
  },
  {
    id: 'premium',
    name: 'Premium Boost',
    description: 'Maximum visibility across platform for 3 days',
    duration: '72:00:00',
    durationMinutes: 72 * 60,
    price: 50,
    price_ubx: 500,
    costUBX: 500,
    visibility: 'global',
    color: '#ec4899',
    badgeColor: '#ec4899',
    features: ['Homepage visibility', 'Search visibility', 'Premium recommendation boost', 'Featured badge'],
    boost_power: 250,
    visibility_increase: 250,
    boostLevel: 3
  }
];

// Helper function to convert duration string to minutes
export const convertDurationToMinutes = (duration: string): number => {
  const [hours, minutes] = duration.split(':').map(Number);
  return hours * 60 + (minutes || 0);
};

// Helper function to format duration in minutes to readable string
export const formatPulseBoostDuration = (minutes: number): string => {
  if (minutes < 60) return `${minutes} minutes`;
  if (minutes < 1440) return `${Math.floor(minutes / 60)} hours`;
  return `${Math.floor(minutes / 1440)} days`;
};
