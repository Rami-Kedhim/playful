
import { BoostStatus, BoostEligibility, AnalyticsData, BoostPackage } from '@/types/boost';

export class BoostService {
  async getBoostStatus(profileId: string): Promise<BoostStatus> {
    // Mock data - simulate 30% chance of having an active boost
    const isActive = Math.random() < 0.3;
    
    if (isActive) {
      return {
        isActive: true,
        packageId: 'boost-package-1',
        startedAt: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
        expiresAt: new Date(Date.now() + 16 * 60 * 60 * 1000), // 16 hours remaining
        startTime: new Date(Date.now() - 8 * 60 * 60 * 1000),
        endTime: new Date(Date.now() + 16 * 60 * 60 * 1000),
        remainingTime: '16:00:00',
        packageName: '24 Hour Boost',
        boostMultiplier: 2,
        progress: 33, // 33% complete
        activeBoostId: `boost-${profileId}-${Date.now()}`
      };
    } else {
      return {
        isActive: false
      };
    }
  }

  async getBoostAnalytics(profileId: string): Promise<AnalyticsData> {
    // Mock data
    return {
      additionalViews: 145,
      engagementIncrease: 32,
      rankingPosition: 8,
      views: 300,
      impressions: {
        today: 180,
        yesterday: 150,
        weeklyAverage: 145,
        withBoost: 180,
        withoutBoost: 120,
        increase: 50
      },
      interactions: {
        today: 45,
        yesterday: 32,
        weeklyAverage: 30,
        withBoost: 45,
        withoutBoost: 25,
        increase: 80
      },
      clicks: {
        today: 68,
        yesterday: 52,
        weeklyAverage: 55,
        withBoost: 68,
        withoutBoost: 42,
        increase: 62
      },
      rank: {
        current: 8,
        previous: 24,
        change: 16
      }
    };
  }

  async getBoostEligibility(profileId: string): Promise<BoostEligibility> {
    // Mock data - simulate 80% chance of being eligible
    const eligible = Math.random() < 0.8;
    
    if (eligible) {
      return {
        eligible: true,
        isEligible: true,
        remainingBoosts: 3,
        maxBoostsPerDay: 3
      };
    } else {
      return {
        eligible: false,
        isEligible: false,
        reason: 'You have used all your boosts for today',
        reasons: ['Daily boost limit reached'],
        nextEligibleTime: '12:00:00',
        remainingBoosts: 0,
        maxBoostsPerDay: 3
      };
    }
  }

  async getBoostPackages(): Promise<BoostPackage[]> {
    // Mock data
    return [
      {
        id: 'boost-1',
        name: '24 Hour Boost',
        description: 'Boost your profile for 24 hours',
        duration: '24:00:00',
        price: 29.99,
        price_ubx: 300,
        features: ['Top search results', 'Featured profile'],
        isMostPopular: true,
        visibility: 'high',
        visibility_increase: 50,
        boost_power: 50,
        color: '#4CAF50',
        badgeColor: '#388E3C',
        durationMinutes: 1440
      },
      {
        id: 'boost-2',
        name: 'Weekend Boost',
        description: 'Boost your profile for the entire weekend',
        duration: '72:00:00',
        price: 69.99,
        price_ubx: 700,
        features: ['Top search results', 'Featured profile', 'Homepage feature'],
        visibility: 'premium',
        visibility_increase: 75,
        boost_power: 75,
        color: '#2196F3',
        badgeColor: '#1976D2',
        durationMinutes: 4320,
        isRecommended: true
      },
      {
        id: 'boost-3',
        name: 'Full Week Spotlight',
        description: 'Maximum visibility for a full week',
        duration: '168:00:00',
        price: 129.99,
        price_ubx: 1200,
        features: ['Top of all searches', 'Featured everywhere', 'Priority matching', 'Analytics dashboard'],
        visibility: 'ultimate',
        visibility_increase: 100,
        boost_power: 100,
        color: '#9C27B0',
        badgeColor: '#7B1FA2',
        durationMinutes: 10080
      }
    ];
  }

  async activateBoost(profileId: string, packageId: string): Promise<{success: boolean, boostId?: string}> {
    // Mock successful activation
    return {
      success: true,
      boostId: `boost-${profileId}-${packageId}-${Date.now()}`
    };
  }

  async cancelBoost(profileId: string, boostId?: string): Promise<boolean> {
    // Mock successful cancellation
    return true;
  }
}

export const boostService = new BoostService();
