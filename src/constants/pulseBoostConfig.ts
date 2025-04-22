
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
