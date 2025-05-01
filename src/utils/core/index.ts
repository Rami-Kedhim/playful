
// Consolidated core utilities for UberEscorts ecosystem
import { SystemStatus, AnalyticsData, UberPersona } from '@/types/shared';
import { hermes } from '@/core/Hermes';
import { lucie } from '@/core/Lucie';
import { oxum } from '@/core/Oxum';
import { orus } from '@/core/Orus';
import { uberWallet } from '@/core/UberWallet';

// Core system status check utility
export const checkSystemStatus = async (): Promise<SystemStatus> => {
  // Get status from core modules
  const orusStatus = orus.checkIntegrity();
  const lucieStatus = lucie.getSystemStatus();
  
  return {
    operational: orusStatus.isValid,
    lastUpdated: new Date(),
    latency: 120,
    aiModels: {
      conversation: lucieStatus.modelStatus['text-gen'],
      generation: lucieStatus.modelStatus['image-gen'],
      analysis: lucieStatus.modelStatus['moderation'],
    },
    metrics: {
      responseTime: 120,
      activeSessions: 53,
      processingLoad: 12
    }
  };
};

// Hermes interaction logger - to be used whenever a user interacts with a component
export const logInteraction = (component: string, action: string, metadata: Record<string, any> = {}): void => {
  try {
    const connectionId = `interaction-${Date.now()}`;
    
    // Connect to Hermes
    hermes.connect({
      system: component,
      connectionId,
      metadata: {
        ...metadata,
        action,
        timestamp: new Date().toISOString()
      }
    });
    
    // Route flow if source and destination are provided
    if (metadata.source && metadata.destination) {
      hermes.routeFlow({
        source: metadata.source,
        destination: metadata.destination,
        params: {
          action,
          ...metadata
        }
      });
    }
    
    console.log(`[Hermes] Logged interaction: ${component}:${action}`, metadata);
  } catch (error) {
    console.error('Error logging interaction:', error);
  }
};

// Session validation through Orus
export const validateUserSession = (userId: string): boolean => {
  try {
    const sessionResult = orus.validateSession(userId);
    return sessionResult.isValid;
  } catch (error) {
    console.error('Session validation error:', error);
    return false;
  }
};

// Oxum boost utility
export const checkBoostEligibility = (userId: string): { isEligible: boolean, reason?: string } => {
  // This would interact with Oxum in production
  return {
    isEligible: true,
    reason: 'User is eligible for boost'
  };
};

// Get visibility score for a profile
export const getProfileVisibilityScore = (profileId: string): number => {
  return hermes.calculateVisibilityScore(profileId);
};

// Get recommended action from Hermes
export const getRecommendedUserAction = (userId: string): string => {
  return hermes.recommendNextAction(userId);
};

// Process a payment through UberWallet
export const processPayment = async (
  userId: string, 
  amount: number, 
  purpose: string
): Promise<{success: boolean, message: string}> => {
  try {
    const result = await uberWallet.spendUbx(userId, amount, purpose);
    
    // Log the transaction in Hermes
    logInteraction('UberWallet', 'payment', {
      userId,
      amount,
      purpose,
      success: result.success
    });
    
    return {
      success: result.success,
      message: result.message || 'Payment processed'
    };
  } catch (error) {
    console.error('Payment processing error:', error);
    return {
      success: false,
      message: 'Payment failed: An unexpected error occurred'
    };
  }
};

// Analytics aggregation utility
export const aggregateAnalytics = (data: Array<AnalyticsData>): AnalyticsData => {
  // Create initial result with proper structure for complex properties
  const result: AnalyticsData = {
    views: 0,
    impressions: {
      today: 0,
      yesterday: 0,
      weeklyAverage: 0,
      withBoost: 0
    },
    interactions: {
      today: 0,
      yesterday: 0,
      weeklyAverage: 0,
      withBoost: 0
    },
    rank: {
      current: 0,
      previous: 0,
      change: 0
    }
  };
  
  // Process data with proper type handling
  return data.reduce((acc, curr) => {
    // Handle simple number properties
    const views = (acc.views || 0) + (curr.views || 0);
    
    // Handle complex nested objects with proper merging
    const impressions = {
      today: (acc.impressions?.today || 0) + (curr.impressions?.today || 0),
      yesterday: (acc.impressions?.yesterday || 0) + (curr.impressions?.yesterday || 0),
      weeklyAverage: (acc.impressions?.weeklyAverage || 0) + (curr.impressions?.weeklyAverage || 0),
      withBoost: (acc.impressions?.withBoost || 0) + (curr.impressions?.withBoost || 0)
    };
    
    const interactions = {
      today: (acc.interactions?.today || 0) + (curr.interactions?.today || 0),
      yesterday: (acc.interactions?.yesterday || 0) + (curr.interactions?.yesterday || 0),
      weeklyAverage: (acc.interactions?.weeklyAverage || 0) + (curr.interactions?.weeklyAverage || 0),
      withBoost: (acc.interactions?.withBoost || 0) + (curr.interactions?.withBoost || 0)
    };
    
    // For rank, take the most recent values
    const rank = curr.rank || acc.rank;
    
    return {
      views,
      impressions,
      interactions,
      rank,
      additionalViews: (acc.additionalViews || 0) + (curr.additionalViews || 0),
      engagementIncrease: (acc.engagementIncrease || 0) + (curr.engagementIncrease || 0),
      rankingPosition: curr.rankingPosition || acc.rankingPosition
    };
  }, result);
};

// Profile visibility utility
export const calculateProfileVisibility = (
  profileId: string,
  boostScore: number,
  engagementRate: number
): number => {
  // Use UberCore modules for calculation
  const baseVisibility = 40;
  const boostFactor = boostScore * 0.4;
  const engagementFactor = engagementRate * 0.2;
  
  return Math.min(Math.round(baseVisibility + boostFactor + engagementFactor), 100);
};

// Format UBX token amounts
export const formatUbxAmount = (amount: number): string => {
  return amount.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }) + ' UBX';
};

// Calculate UBX exchange rates
export const calculateUbxExchangeRate = (amount: number, currency: string = 'USD'): number => {
  // Mock exchange rate - in real app would get from API
  const rates: Record<string, number> = {
    USD: 0.1,
    EUR: 0.092,
    GBP: 0.078,
    JPY: 14.5
  };
  
  return amount * (rates[currency] || rates.USD);
};

// Export functions from navigation and other utility modules
export * from '../navigation';
