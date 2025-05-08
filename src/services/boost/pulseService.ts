
import { BoostPackage, EnhancedBoostStatus, BoostPurchaseResult } from '@/types/pulse-boost';

// Export the getPulsePackages function so it can be imported
export const getPulsePackages = (): BoostPackage[] => {
  return [
    {
      id: 'basic-pulse',
      name: 'Basic Pulse',
      description: 'Increase your profile visibility for 12 hours',
      price: 9.99,
      price_ubx: 50,
      duration: '12h',
      features: [
        '2x visibility boost',
        'Higher position in search results',
        'Highlighted profile card'
      ],
      is_active: true,
      is_featured: false,
      boost_level: 1,
      visibility_increase: 100,
      color: '#3B82F6',
      badgeColor: '#DBEAFE'
    },
    {
      id: 'premium-pulse',
      name: 'Premium Pulse',
      description: 'Significant visibility boost for 24 hours',
      price: 19.99,
      price_ubx: 90,
      duration: '24h',
      features: [
        '5x visibility boost',
        'Featured in top search results',
        'Highlighted profile card',
        'Priority customer support'
      ],
      is_active: true,
      is_featured: true,
      boost_level: 2,
      visibility_increase: 400,
      color: '#8B5CF6',
      badgeColor: '#EDE9FE',
      isMostPopular: true
    },
    {
      id: 'ultra-pulse',
      name: 'Ultra Pulse',
      description: 'Maximum visibility boost for 3 days',
      price: 49.99,
      price_ubx: 200,
      duration: '72h',
      features: [
        '10x visibility boost',
        'Featured at the top of search results',
        'Premium profile highlighting',
        '24/7 priority customer support',
        'Enhanced analytics'
      ],
      is_active: true,
      is_featured: true,
      boost_level: 3,
      visibility_increase: 900,
      color: '#EC4899',
      badgeColor: '#FCE7F3'
    }
  ];
};

export default {
  getPulsePackages
};
