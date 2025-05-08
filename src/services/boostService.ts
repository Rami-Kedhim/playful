
import { BoostPackage, BoostStatus, BoostPurchaseRequest, BoostPurchaseResult } from '@/types/pulse-boost';
import { AnalyticsData } from '@/types/core-systems';

// Simulate API calls with mock data for development
export const getBoostPackages = async (): Promise<BoostPackage[]> => {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
  
  return [
    {
      id: 'basic',
      name: 'Basic Boost',
      description: 'Increase your visibility for 24 hours',
      price: 9.99,
      price_ubx: 99,
      duration: '24h',
      durationMinutes: 1440,
      features: ['Boosted in search results', '+20% profile views'],
      visibility: 'Medium',
      visibility_increase: 20,
      color: '#3b82f6',
      badgeColor: 'blue'
    },
    {
      id: 'premium',
      name: 'Premium Boost',
      description: 'Maximum visibility for 3 days',
      price: 24.99,
      price_ubx: 249,
      duration: '3d',
      durationMinutes: 4320,
      features: ['Top of search results', '+50% profile views', 'Featured on homepage'],
      visibility: 'High',
      visibility_increase: 50,
      color: '#8b5cf6',
      badgeColor: 'purple',
      isMostPopular: true
    }
  ];
};

export const getAnalyticsData = async (profileId: string): Promise<AnalyticsData> => {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
  
  // Simulate analytics data
  return {
    impressions: Math.floor(Math.random() * 1000) + 200,
    clicks: Math.floor(Math.random() * 100) + 20,
    conversion: Math.random() * 10,
    position: Math.floor(Math.random() * 10) + 1,
    additionalViews: Math.floor(Math.random() * 200) + 50
  };
};

export const purchaseBoost = async (request: BoostPurchaseRequest): Promise<BoostPurchaseResult> => {
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
  
  // Simulate successful purchase
  return {
    success: true,
    boostId: `boost-${Date.now()}`,
    message: 'Boost purchase successful',
    transactionId: `txn-${Date.now()}`
  };
};

export const cancelBoost = async (boostId: string): Promise<boolean> => {
  await new Promise(resolve => setTimeout(resolve, 800)); // Simulate network delay
  return true; // Simulate successful cancellation
};

export const getBoostStatus = async (profileId: string): Promise<BoostStatus> => {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
  
  // Randomly return active or inactive boost for demo purposes
  const isActive = Math.random() > 0.5;
  
  if (isActive) {
    return {
      isActive: true,
      packageId: Math.random() > 0.5 ? 'basic' : 'premium',
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
      startedAt: new Date()
    };
  } else {
    return {
      isActive: false
    };
  }
};
