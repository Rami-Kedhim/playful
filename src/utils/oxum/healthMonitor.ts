
// Health monitoring metrics
let validationSuccesses = 0;
let validationFailures = 0;
let lastValidationTime: Date | null = null;
let systemStatus: 'healthy' | 'warning' | 'critical' = 'healthy';

/**
 * Records a successful validation attempt
 */
export function recordSuccessfulValidation(): void {
  validationSuccesses++;
  lastValidationTime = new Date();
  updateSystemStatus();
}

/**
 * Records a failed validation attempt
 */
export function recordValidationFailure(): void {
  validationFailures++;
  lastValidationTime = new Date();
  updateSystemStatus();
}

/**
 * Updates the overall system status based on metrics
 */
function updateSystemStatus(): void {
  const failureRate = validationFailures / Math.max(1, validationSuccesses + validationFailures);
  
  if (failureRate > 0.2) {
    systemStatus = 'critical';
  } else if (failureRate > 0.05) {
    systemStatus = 'warning';
  } else {
    systemStatus = 'healthy';
  }
}

/**
 * Returns the overall health status of the Oxum price system
 */
export function getOxumPriceSystemHealth(): {
  status: 'healthy' | 'warning' | 'critical';
  metrics: {
    successCount: number;
    failureCount: number;
    failureRate: number;
    lastValidation: Date | null;
  }
} {
  const totalValidations = validationSuccesses + validationFailures;
  const failureRate = totalValidations > 0 
    ? validationFailures / totalValidations 
    : 0;
  
  return {
    status: systemStatus,
    metrics: {
      successCount: validationSuccesses,
      failureCount: validationFailures,
      failureRate,
      lastValidation: lastValidationTime
    }
  };
}

/**
 * Resets the health metrics (for testing or system recovery)
 */
export function resetHealthMetrics(): void {
  validationSuccesses = 0;
  validationFailures = 0;
  lastValidationTime = null;
  systemStatus = 'healthy';
}
