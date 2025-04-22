
// Update or create the pulseBoostConfig.ts file to include features property

export interface PulseBoost {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // in hours
  features: string[]; // Add this property
  boost: number;
  visibility: number;
  maxRank: number;
  color: string;
}

export const pulseBoosts: PulseBoost[] = [
  {
    id: 'basic',
    name: 'Basic Pulse',
    description: 'Simple visibility boost for 24 hours',
    price: 9.99,
    duration: 24,
    features: [
      '24-hour boost',
      'Basic visibility',
      'Top 50 ranking'
    ],
    boost: 1.5,
    visibility: 50,
    maxRank: 50,
    color: 'bg-gradient-to-r from-blue-500 to-cyan-400'
  },
  {
    id: 'premium',
    name: 'Premium Pulse',
    description: 'Enhanced boost with priority ranking for 48 hours',
    price: 19.99,
    duration: 48,
    features: [
      '48-hour boost',
      'Enhanced visibility',
      'Top 20 ranking',
      'Featured in premium section'
    ],
    boost: 2.5,
    visibility: 75,
    maxRank: 20,
    color: 'bg-gradient-to-r from-purple-600 to-pink-500'
  },
  {
    id: 'ultimate',
    name: 'Ultimate Pulse',
    description: 'Maximum exposure and premium placement for one week',
    price: 49.99,
    duration: 168,
    features: [
      '7-day boost',
      'Maximum visibility',
      'Top 5 ranking',
      'Featured in elite section',
      'Homepage highlight',
      'Push notifications to matched users'
    ],
    boost: 5,
    visibility: 100,
    maxRank: 5,
    color: 'bg-gradient-to-r from-amber-600 to-yellow-400'
  }
];

// Add PULSE_BOOSTS constant for backward compatibility
export const PULSE_BOOSTS = pulseBoosts;

export default pulseBoosts;
