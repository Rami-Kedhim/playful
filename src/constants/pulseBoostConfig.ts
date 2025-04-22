
import { BoostPackage, PulseBoost } from '@/types/boost';

// Define the base boost packages
export const PULSE_BOOSTS: BoostPackage[] = [
  {
    id: 'basic',
    name: 'Standard Boost',
    description: 'Increase your visibility in homepage results',
    price: 50,
    price_ubx: 50,
    duration: '24:00:00',
    features: [
      'Homepage visibility boost',
      '24 hours duration',
      'Basic analytics'
    ],
    boostLevel: 1,
    color: '#3b82f6', // blue
    visibility_increase: 25,
    boost_power: 1
  },
  {
    id: 'premium',
    name: 'Premium Boost',
    description: 'Enhanced visibility in search results and homepage',
    price: 100,
    price_ubx: 100,
    duration: '48:00:00',
    features: [
      'Homepage & search results visibility',
      '48 hours duration',
      'Enhanced analytics'
    ],
    boostLevel: 3,
    color: '#8b5cf6', // purple
    visibility_increase: 50,
    boost_power: 2,
    is_featured: true
  },
  {
    id: 'ultra',
    name: 'Ultra Boost',
    description: 'Maximum visibility across all platform areas',
    price: 200,
    price_ubx: 200,
    duration: '72:00:00',
    features: [
      'Global visibility boost',
      '72 hours duration',
      'Premium analytics',
      'Featured badge'
    ],
    boostLevel: 5,
    color: '#ec4899', // pink
    visibility_increase: 80,
    boost_power: 3
  }
];

// Function to convert minutes to a human-readable format
export function formatPulseBoostDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes}m`;
  }
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (hours < 24) {
    return remainingMinutes > 0 
      ? `${hours}h ${remainingMinutes}m` 
      : `${hours}h`;
  }
  
  const days = Math.floor(hours / 24);
  const remainingHours = hours % 24;
  
  if (remainingHours > 0 || remainingMinutes > 0) {
    return `${days}d ${remainingHours}h`;
  }
  
  return `${days}d`;
}

// Function to convert duration string like "24:00:00" to minutes
export function convertDurationToMinutes(durationStr: string): number {
  const [hours, minutes, seconds] = durationStr.split(':').map(Number);
  return hours * 60 + minutes + (seconds / 60);
}

// Global UBX rate for boosts
export const GLOBAL_UBX_RATE = 15;
