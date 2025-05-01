
import { getSystemStatus as getDetailedSystemStatus } from './uberCore';
import { SystemStatus } from '@/types/shared';

/**
 * Check the overall system status
 * @returns A promise that resolves to a SystemStatus object
 */
export const checkSystemStatus = async (): Promise<SystemStatus> => {
  try {
    const status = await getDetailedSystemStatus();
    return status;
  } catch (error) {
    console.error('Error checking system status:', error);
    
    // Return a default error status
    return {
      operational: false,
      latency: -1,
      lastUpdated: new Date(),
      aiModels: {
        conversation: 'error',
        generation: 'error',
        analysis: 'error'
      },
      metrics: {
        responseTime: -1,
        activeSessions: 0,
        processingLoad: 0
      }
    };
  }
};

/**
 * Check if a specific core subsystem is available
 * @param subsystem The name of the subsystem to check
 * @returns A promise that resolves to a boolean indicating if the subsystem is available
 */
export const checkSubsystemAvailability = async (subsystem: string): Promise<boolean> => {
  try {
    const status = await getDetailedSystemStatus();
    
    // Check if subsystem is mentioned in the aiModels
    if (status.aiModels && subsystem in status.aiModels) {
      return status.aiModels[subsystem as keyof typeof status.aiModels] === 'active';
    }
    
    // Default to overall operational status
    return status.operational;
  } catch (error) {
    console.error(`Error checking ${subsystem} availability:`, error);
    return false;
  }
};
