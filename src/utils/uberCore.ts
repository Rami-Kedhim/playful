
import { lucie } from '@/core/Lucie';
import { oxum } from '@/core/Oxum';
import { hermes } from '@/core/Hermes';
import { orus } from '@/core/Orus';
import { uberWallet } from '@/core/UberWallet';
import { SystemStatus } from '@/types/shared';

/**
 * UberCore Integration Utilities
 * Provides standardized methods for UI components to interact with UberCore modules
 * Following the architecture master plan requirements
 */

export interface CoreModuleStatus {
  operational: boolean;
  latency: number;
  lastUpdated: Date;
}

// System status integration
export const getSystemStatus = async (): Promise<SystemStatus> => {
  try {
    // Check system integrity via Orus
    const integrityResult = orus.checkIntegrity();
    
    // Get status from each module
    return {
      operational: integrityResult.isValid,
      lastUpdated: new Date(),
      latency: 120, // Placeholder, would be measured in production
      aiModels: {
        conversation: 'active',
        generation: 'active',
        analysis: 'active',
      },
      metrics: {
        responseTime: 120,
        activeSessions: 53,
        processingLoad: 12
      }
    };
  } catch (error) {
    console.error('Error getting system status:', error);
    return {
      operational: false,
      lastUpdated: new Date(),
      latency: 0,
      aiModels: {
        conversation: 'error',
        generation: 'error',
        analysis: 'error',
      },
      metrics: {
        responseTime: 0,
        activeSessions: 0,
        processingLoad: 0
      }
    };
  }
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
