
import { hermes } from '@/core/Hermes';
import { oxum } from '@/core/Oxum';
import { orus } from '@/core/Orus';
import { lucieAI } from '@/core/Lucie';

/**
 * Get the health status of core systems as a percentage
 */
export function getCoreSystemHealth() {
  const hermesStatus = hermes.getSystemStatus();
  const oxumStatus = oxum.checkSystemStatus();
  const lucieStatus = lucieAI.getSystemStatus();
  
  // Convert statuses to health percentages
  const hermesHealth = hermesStatus.status === 'operational' ? 100 : 50;
  const oxumHealth = oxumStatus.operational ? 100 : 50;
  
  // Get status from Lucie models
  const lucieHealth = 
    lucieStatus.modules.aiGeneration === 'online' && 
    lucieStatus.modules.contentModeration === 'online' && 
    lucieStatus.modules.sentimentAnalysis === 'online' ? 100 : 75;
  
  // Calculate average health
  const overallHealth = Math.round((hermesHealth + oxumHealth + lucieHealth) / 3);
  
  return {
    overall: overallHealth,
    systems: {
      hermes: hermesHealth,
      oxum: oxumHealth,
      lucie: lucieHealth
    }
  };
}

/**
 * Log an interaction in the system
 */
export function logInteraction(system: string, action: string, data?: any) {
  const connectionId = `log-${Date.now()}`;
  const timestamp = new Date().toISOString();
  
  hermes.connect({
    system,
    connectionId,
    metadata: { action, timestamp },
    userId: 'system' // Adding required userId parameter
  });
  
  console.info(`[${system}] ${action}`, data);
}

/**
 * Track user flow between pages
 */
export function trackNavigation(source: string, destination: string, userId: string) {
  hermes.routeFlow({
    source,
    destination,
    params: { userId, timestamp: new Date().toISOString() }
  });
  
  // Also log as an interaction
  logInteraction('Navigation', 'page_change', {
    from: source,
    to: destination,
    userId
  });
}

/**
 * Validate a user session
 */
export function validateUserSession(token: string) {
  if (!token) {
    return { valid: false, reason: 'No token provided' };
  }
  
  const result = orus.validateSession(token);
  
  if (!result.isValid) {
    logInteraction('Security', 'invalid_session', { token });
  }
  
  return {
    valid: result.isValid,
    userId: result.userId,
    expiry: result.expiry
  };
}

/**
 * Calculate visibility score for a profile
 */
export function calculateProfileVisibility(profileId: string) {
  return hermes.calculateVisibilityScore(profileId);
}

/**
 * Get recommended next action for a user
 */
export function getRecommendedAction(userId: string) {
  return hermes.recommendNextAction(userId);
}

/**
 * Calculate visibility score for a profile
 */
export function getProfileVisibilityScore(profileId: string): number {
  return hermes.calculateVisibilityScore(profileId);
}
