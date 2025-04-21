
import { OxumNotificationService } from '../../services/notifications/oxumNotificationService';
import { OxumPriceAnalytics } from '../../services/analytics/oxumPriceAnalytics';

export interface SystemHealthState {
  isHealthy: boolean;
  status: 'green' | 'yellow' | 'red';
  validationRate: number;
  failureRate: number;
  lastChecked: Date;
  message: string;
}

/**
 * Get the current health status of the Oxum price system
 */
export const getOxumPriceSystemHealth = (): SystemHealthState => {
  // Get analytics data
  const stats = OxumPriceAnalytics.getStats();
  const totalValidations = stats.totalEvents;
  const failures = stats.eventTypes['validation_failure'] || 0;
  
  // Calculate health metrics
  const validationRate = totalValidations ? 1 - (failures / totalValidations) : 1;
  const failureRate = totalValidations ? failures / totalValidations : 0;
  
  // Determine system status
  let status: 'green' | 'yellow' | 'red' = 'green';
  let message = "System operating normally";
  let isHealthy = true;
  
  if (failureRate > 0.1) {
    status = 'red';
    message = "Critical: High failure rate detected";
    isHealthy = false;
  } else if (failureRate > 0.01) {
    status = 'yellow';
    message = "Warning: Elevated failure rate";
    isHealthy = true; // Still considered functional
  }
  
  // Check if system is in recovery mode
  if (OxumNotificationService.isInRecoveryMode()) {
    status = 'yellow';
    message = "System in recovery mode";
    isHealthy = true; // Still operational but in recovery
  }
  
  return {
    isHealthy,
    status,
    validationRate,
    failureRate,
    lastChecked: new Date(),
    message
  };
};
