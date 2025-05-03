
// Core UberEscorts engine entrypoint connecting all UberCore layers

import { hermes } from '@/core/Hermes';
import { uberCore } from '@/core/UberCore';
import { orus } from '@/core/Orus';
import { oxum } from '@/core/Oxum';
import { lucie } from '@/core/Lucie';

/**
 * Initializes the UberEscorts core system and all its components.
 * Returns a promise that resolves to true if initialization succeeds.
 */
export const initializeSystem = async () => {
  console.info('Starting UberEscorts core initialization...');
  
  try {
    // Initialize core subsystems in the correct order
    await uberCore.initialize();
    console.info('UberCore initialized');
    
    await hermes.initialize();
    console.info('Hermes flow dynamics initialized');
    
    await lucie.initialize();
    console.info('Lucie AI system initialized');
    
    // Oxum and Orus are initialized in their constructors
    console.info('Oxum and Orus subsystems ready');
    
    // Validate system integrity
    const integrityResult = orus.checkIntegrity();
    if (!integrityResult.isValid) {
      console.error('System integrity check failed:', integrityResult.message);
      return false;
    }
    
    console.info('UberEscorts core engine initialization complete');
    return true;
  } catch (error) {
    console.error('Fatal error during system initialization:', error);
    return false;
  }
};

/**
 * Gracefully shuts down all UberEscorts core systems.
 */
export const shutdownSystem = async () => {
  console.info('Initiating UberEscorts core shutdown...');
  
  try {
    await uberCore.shutdown();
    console.info('UberCore shutdown complete');
    return true;
  } catch (error) {
    console.error('Error during system shutdown:', error);
    return false;
  }
};

/**
 * Returns the current system status.
 */
export const getSystemStatus = () => {
  return {
    core: uberCore.getSystemStatus(),
    security: orus.checkIntegrity(),
    ai: lucie.getSystemStatus(),
    boostSystem: oxum.checkSystemStatus()
  };
};
