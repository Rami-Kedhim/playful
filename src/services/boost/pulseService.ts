import { BoostPackage, EnhancedBoostStatus } from '@/types/pulse-boost';

// Mock implementation of the Pulse Boost Service
export class PulseService {
  getPackages(): BoostPackage[] {
    return [
      {
        id: 'basic',
        name: 'Basic Boost',
        description: 'Enhance your profile visibility for 24 hours',
        duration: '24:00:00',
        price: 29.99,
        price_ubx: 300,
        features: ['Top search positions', 'Featured section placement'],
        visibility_increase: 50,
        visibility: '50%',
        durationMinutes: 1440, // Use number for durationMinutes
        color: '#4CAF50',
        badgeColor: '#4CAF50',
        boostMultiplier: 1.5
      },
      {
        id: 'premium',
        name: 'Premium Boost',
        description: 'Maximum visibility for 3 days',
        duration: '72:00:00',
        price: 69.99,
        price_ubx: 700,
        features: ['Top search positions', 'Featured section', 'Highlighted profile'],
        visibility_increase: 100,
        visibility: '100%',
        durationMinutes: 4320, // Use number for durationMinutes
        color: '#2196F3',
        badgeColor: '#2196F3',
        boostMultiplier: 2
      }
    ];
  }
  
  getMockBoostPurchase(userId: string) {
    // Simulate API call
    return {
      userId: userId,
      packageId: 'basic',
      startTime: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
      endTime: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(),
      status: 'active'
    };
  }

  calculateBoostStatus(startTime: string | Date, durationMinutes: number): EnhancedBoostStatus {
    const start = typeof startTime === 'string' ? new Date(startTime) : startTime;
    const now = new Date();
    const endTime = new Date(start.getTime() + durationMinutes * 60 * 1000);
    
    const isActive = now < endTime;
    const totalDurationMs = durationMinutes * 60 * 1000;
    const remainingMs = Math.max(0, endTime.getTime() - now.getTime());
    const percentRemaining = Math.round((remainingMs / totalDurationMs) * 100);
    const remainingMinutes = Math.ceil(remainingMs / (60 * 1000));
    
    const hours = Math.floor(remainingMinutes / 60);
    const minutes = remainingMinutes % 60;
    const formattedTime = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
    
    return {
      isActive,
      remainingMinutes,
      remainingTime: formattedTime,
      timeRemaining: formattedTime,
      percentRemaining,
      expiresAt: isActive ? endTime : null,
      startedAt: isActive ? start : null,
      isExpired: !isActive
    };
  }

  getMockPurchaseHistory(userId: string) {
    return [
      {
        id: 'purchase-1',
        packageId: 'basic',
        startTime: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // Use Date object
        endTime: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),   // Use Date object
        status: 'completed'
      },
    ];
  }
}

export const pulseService = new PulseService();
