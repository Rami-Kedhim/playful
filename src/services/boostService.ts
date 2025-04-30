
import { BoostPackage, BoostStatus, BoostEligibility, BoostAnalytics } from '@/types/boost';

export class BoostService {
  async getBoostPackages(): Promise<BoostPackage[]> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return [
      {
        id: 'boost-1',
        name: '24 Hour Boost',
        description: 'Boost your visibility for 24 hours',
        price: 9.99,
        price_ubx: 50,
        duration: '24:00:00',
        durationMinutes: 24 * 60,
        features: [
          '2x Visibility in search',
          'Featured on homepage',
          'Priority in matches'
        ],
        visibility: 'high',
        visibility_increase: 200,
        boost_power: 200,
        color: '#3b82f6',
        badgeColor: '#3b82f6'
      },
      {
        id: 'boost-2',
        name: '3 Day Boost',
        description: 'Boost your visibility for 3 days',
        price: 19.99,
        price_ubx: 100,
        duration: '72:00:00',
        durationMinutes: 72 * 60,
        features: [
          '3x Visibility in search',
          'Featured on homepage',
          'Priority in matches',
          'Profile highlighting'
        ],
        visibility: 'very high',
        visibility_increase: 300,
        boost_power: 300,
        color: '#8b5cf6',
        badgeColor: '#8b5cf6'
      },
      {
        id: 'boost-3',
        name: 'Weekly Boost',
        description: 'Boost your visibility for a full week',
        price: 39.99,
        price_ubx: 200,
        duration: '168:00:00',
        durationMinutes: 168 * 60,
        features: [
          '4x Visibility in search',
          'Featured on homepage',
          'Priority in matches',
          'Profile highlighting',
          'Weekly analytics report'
        ],
        visibility: 'maximum',
        visibility_increase: 400,
        boost_power: 400,
        color: '#ec4899',
        badgeColor: '#ec4899'
      }
    ];
  }

  async getBoostStatus(profileId: string): Promise<BoostStatus> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const isActive = Math.random() > 0.7;
    
    if (!isActive) {
      return {
        isActive: false
      };
    }
    
    const startTime = new Date(Date.now() - 12 * 60 * 60 * 1000); // 12 hours ago
    const endTime = new Date(Date.now() + 12 * 60 * 60 * 1000); // 12 hours from now
    
    const packages = await this.getBoostPackages();
    const randomPackage = packages[Math.floor(Math.random() * packages.length)];
    
    return {
      isActive: true,
      startTime,
      endTime,
      packageId: randomPackage.id,
      remainingTime: '12:00:00',
      timeRemaining: '12:00:00',
      packageName: randomPackage.name,
      boostPackage: randomPackage,
      progress: 50,
      visibilityScore: randomPackage.visibility_increase,
      activeBoostId: randomPackage.id
    };
  }
  
  async getBoostEligibility(profileId: string): Promise<BoostEligibility> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const randomFactor = Math.random();
    
    if (randomFactor > 0.9) {
      return {
        eligible: false,
        reason: 'Your profile is incomplete',
        reasons: [
          'Profile completion below 70%',
          'Missing verification'
        ]
      };
    } else if (randomFactor > 0.8) {
      return {
        eligible: false,
        reason: 'Your account has been temporarily restricted',
        blockedUntil: new Date(Date.now() + 24 * 60 * 60 * 1000)
      };
    } else if (randomFactor > 0.7) {
      return {
        eligible: false,
        reason: 'Minimum requirements not met',
        minimumRequirements: {
          profileCompletion: '80%',
          accountAge: '3 days'
        }
      };
    }
    
    return {
      eligible: true
    };
  }
  
  async purchaseBoost(profileId: string, packageId: string): Promise<boolean> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 700));
    
    return Math.random() > 0.1; // 90% success rate
  }
  
  async cancelBoost(profileId: string): Promise<boolean> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 400));
    
    return Math.random() > 0.2; // 80% success rate
  }
  
  async getBoostAnalytics(profileId: string): Promise<BoostAnalytics> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const baseViews = Math.floor(Math.random() * 500) + 200;
    const boostFactor = Math.random() * 2 + 1.5; // 1.5x to 3.5x
    
    const analyticsData: BoostAnalytics = {
      views: Math.floor(baseViews * boostFactor),
      additionalViews: Math.floor(baseViews * (boostFactor - 1)),
      engagementIncrease: Math.floor(Math.random() * 50) + 20,
      rankingPosition: Math.floor(Math.random() * 20) + 1,
      timeActive: Math.floor(Math.random() * 72) + 24,
      trending: Math.random() > 0.7,
      impressions: {
        today: Math.floor(Math.random() * 300) + 100,
        yesterday: Math.floor(Math.random() * 300) + 100,
        weeklyAverage: Math.floor(Math.random() * 250) + 80,
        withBoost: Math.floor(Math.random() * 500) + 200,
        withoutBoost: Math.floor(Math.random() * 200) + 50,
        increase: Math.floor(Math.random() * 150) + 50
      },
      interactions: {
        today: Math.floor(Math.random() * 100) + 30,
        yesterday: Math.floor(Math.random() * 100) + 30,
        weeklyAverage: Math.floor(Math.random() * 80) + 20,
        withBoost: Math.floor(Math.random() * 150) + 60,
        withoutBoost: Math.floor(Math.random() * 70) + 10,
        increase: Math.floor(Math.random() * 80) + 20
      },
      rank: {
        current: Math.floor(Math.random() * 20) + 1,
        previous: Math.floor(Math.random() * 50) + 20,
        change: Math.floor(Math.random() * 30) + 5
      },
      clicks: {
        today: Math.floor(Math.random() * 80) + 20,
        yesterday: Math.floor(Math.random() * 80) + 20,
        weeklyAverage: Math.floor(Math.random() * 60) + 15,
        withBoost: Math.floor(Math.random() * 120) + 40,
        withoutBoost: Math.floor(Math.random() * 50) + 5,
        increase: Math.floor(Math.random() * 70) + 15
      },
      ctr: Math.random() * 0.2 + 0.05,
      conversionRate: Math.random() * 0.15 + 0.02,
      averagePosition: Math.random() * 19 + 1,
      totalSpent: Math.random() * 200 + 50,
      roi: Math.random() * 3 + 1,
      conversions: Math.floor(Math.random() * 20) + 5,
      boostEfficiency: Math.random() * 90 + 10
    };
    
    return analyticsData;
  }
}

export default BoostService;
