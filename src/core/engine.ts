
import { oxum } from './Oxum';
import { lucieAI } from './Lucie';
import { uberCore } from './UberCore';
import { hermes } from './Hermes';
import { automaticSEO } from './AutomaticSEO';
import { SystemStatus } from '@/types/core-systems';

/**
 * Initialize the UberEscorts core systems
 */
export async function initializeSystem(): Promise<boolean> {
  try {
    console.log('Starting UberEscorts initialization...');
    
    // Initialize Oxum system
    await oxum.initialize();
    console.log('Oxum neural network initialized');
    
    // Initialize Lucie AI system
    await lucieAI.initialize();
    console.log('Lucie AI system initialized');
    
    // Initialize Automatic SEO system
    automaticSEO.initialize();
    console.log('Automatic SEO system initialized');
    
    console.log('UberEscorts system initialization complete');
    
    return true;
  } catch (error) {
    console.error('Error during system initialization:', error);
    return false;
  }
}

/**
 * Shut down the UberEscorts core systems safely
 */
export function shutdownSystem(): void {
  console.log('Shutting down UberEscorts systems...');
  
  // Shutdown subsystems
  oxum.shutdown();
  lucieAI.shutdown();
  
  console.log('UberEscorts systems shutdown complete');
}

/**
 * Check the overall system status
 */
export function getSystemStatus(): SystemStatus {
  return uberCore.getSystemStatus();
}
