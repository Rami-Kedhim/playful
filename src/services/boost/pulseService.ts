
import { BoostPackage, EnhancedBoostStatus } from '@/types/pulse-boost';

/**
 * Service for handling pulse boost functionality
 */
export const pulseService = {
  getPackages(): BoostPackage[] {
    // Mock data for boost packages
    return [
      {
        id: 'boost-basic',
        name: 'Basic Boost',
        description: '24 hour visibility boost',
        duration: '24 hours',
        durationMinutes: 1440, // 24 hours in minutes
        price: 45,
        price_ubx: 45,
        visibility: 150,
        visibility_increase: 50, 
        features: [
          '50% higher visibility in search results',
          'Featured in recommended profiles',
          '24 hour duration'
        ],
        is_active: true
      },
      {
        id: 'boost-premium',
        name: 'Premium Boost',
        description: '3 day visibility boost with premium features',
        duration: '3 days',
        durationMinutes: 4320, // 3 days in minutes
        price: 99,
        price_ubx: 99,
        visibility: 250,
        visibility_increase: 150,
        features: [
          '150% higher visibility in search results',
          'Top placement in recommended profiles',
          'Featured tag on your profile',
          '3 day duration'
        ],
        is_active: true
      },
      {
        id: 'boost-max',
        name: 'Maximum Boost',
        description: '7 day visibility boost with all premium features',
        duration: '7 days',
        durationMinutes: 10080, // 7 days in minutes
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
        ],
        is_active: true
      }
    ];
  },

  /**
   * Calculate boost status from a start time
   */
  calculateBoostStatus(startTime?: string, duration?: number): EnhancedBoostStatus {
    if (!startTime || !duration) {
      return {
        active: false,
        isActive: false,
        remainingMinutes: 0,
        timeRemaining: "0",
        percentRemaining: 0,
        expiresAt: null,
        startedAt: null,
        isExpired: true
      };
    }

    const startDate = new Date(startTime);
    const now = new Date();
    const endDate = new Date(startDate.getTime() + (duration * 60 * 1000));
    
    const isActive = now < endDate && now >= startDate;
    const isExpired = now >= endDate;
    
    // Calculate remaining time
    let remainingMinutes = 0;
    if (isActive) {
      remainingMinutes = Math.max(0, Math.floor((endDate.getTime() - now.getTime()) / (1000 * 60)));
    }
    
    // Calculate percentage remaining
    const totalDuration = duration;
    const percentRemaining = isActive ? (remainingMinutes / totalDuration) * 100 : 0;
    
    return {
      active: isActive,
      isActive: isActive,
      remainingMinutes: remainingMinutes,
      timeRemaining: remainingMinutes.toString(),
      percentRemaining: percentRemaining,
      expiresAt: isActive ? endDate.toISOString() : null,
      startedAt: startDate.toISOString(),
      isExpired: isExpired
    };
  },
  
  /**
   * Get a mock boost purchase for a user
   */
  getMockBoostPurchase(userId: string) {
    // For demo purposes, simulate a 50% chance the user has an active boost
    const hasActivePurchase = Math.random() > 0.5;
    
    if (!hasActivePurchase) {
      return null;
    }
    
    // Randomly select one of the packages
    const packages = this.getPackages();
    const randomPackage = packages[Math.floor(Math.random() * packages.length)];
    
    // Set start time between 0-70% through the duration
    const now = new Date();
    const maxStartOffset = randomPackage.durationMinutes * 0.7;
    const startOffset = Math.floor(Math.random() * maxStartOffset);
    const startTime = new Date(now.getTime() - (startOffset * 60 * 1000));
    const endTime = new Date(startTime.getTime() + (randomPackage.durationMinutes * 60 * 1000));
    
    return {
      userId: userId,
      packageId: randomPackage.id,
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      status: 'active'
    };
  }
};
