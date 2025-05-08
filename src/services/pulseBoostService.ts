
import { BoostPackage } from '@/types/pulse-boost';

export const fetchBoostPackages = async (): Promise<BoostPackage[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Return mock boost packages
  return [
    {
      id: 'basic-boost',
      name: 'Basic Boost',
      description: '24-hour visibility boost',
      duration: '24 hours',
      durationMinutes: 1440,
      price: 45,
      price_ubx: 45,
      visibility: 150,
      visibility_increase: 50,
      features: [
        '50% higher visibility in search results',
        'Featured in recommended profiles',
        '24 hour duration'
      ]
    },
    {
      id: 'premium-boost',
      name: 'Premium Boost',
      description: '3-day visibility boost with premium features',
      duration: '3 days',
      durationMinutes: 4320,
      price: 99,
      price_ubx: 99,
      visibility: 250,
      visibility_increase: 150,
      features: [
        '150% higher visibility in search results',
        'Top placement in recommended profiles',
        'Featured tag on your profile',
        '3 day duration'
      ]
    },
    {
      id: 'max-boost',
      name: 'Maximum Boost',
      description: '7-day visibility boost with all premium features',
      duration: '7 days',
      durationMinutes: 10080,
      price: 199,
      price_ubx: 199,
      visibility: 500,
      visibility_increase: 400,
      features: [
        '400% higher visibility in search results',
        'Top placement in recommended profiles',
        'Featured tag on your profile',
        'Priority in messaging',
        '7 day duration'
      ]
    }
  ];
};

export const activateBoost = async (userId: string, packageId: string): Promise<boolean> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Simulate success
  return true;
};
