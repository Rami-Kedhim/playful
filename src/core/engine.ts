
import { uberCore } from './UberCore';
import { lucieAI } from './Lucie';
import { Hermes } from './Hermes';
import { Pulse } from './Pulse';
import { automaticSeo } from './AutomaticSEO';

/**
 * Initializes the entire UberEscorts ecosystem
 */
export const initializeSystem = async (): Promise<boolean> => {
  try {
    console.log('Initializing UberEscorts ecosystem...');
    
    // Initialize UberCore (this initializes most core systems)
    const coreInitialized = await uberCore.initialize();
    if (!coreInitialized) {
      throw new Error('Failed to initialize UberCore system');
    }
    
    // Initialize AutomaticSEO system
    const seoInitialized = automaticSeo.initialize();
    if (!seoInitialized) {
      console.warn('Failed to initialize AutomaticSEO system');
    }
    
    // Track system initialization in Pulse
    Pulse.track('system', 'ecosystem_initialized');
    
    return true;
  } catch (error) {
    console.error('Error initializing UberEscorts ecosystem:', error);
    return false;
  }
};

/**
 * Shuts down the entire UberEscorts ecosystem
 */
export const shutdownSystem = async (): Promise<void> => {
  try {
    console.log('Shutting down UberEscorts ecosystem...');
    
    // Shutdown UberCore
    await uberCore.shutdown();
    
    // Shutdown AutomaticSEO
    await automaticSeo.shutdown();
    
    // Track system shutdown in Pulse
    Pulse.track('system', 'ecosystem_shutdown');
  } catch (error) {
    console.error('Error shutting down UberEscorts ecosystem:', error);
  }
};

/**
 * Checks the health of the entire UberEscorts ecosystem
 */
export const checkEcosystemHealth = async (): Promise<number> => {
  // Getting health metrics from various systems
  const coreHealth = uberCore.getSystemHealth();
  const subsystemsHealth = uberCore.checkSubsystemHealth();
  
  // Calculate average health score
  const totalHealth = subsystemsHealth.reduce((sum, system) => sum + system.health, 0);
  return totalHealth / subsystemsHealth.length; // This returns a number directly, not a Promise
};

/**
 * Exports a default object with all the functions
 */
export default {
  initializeSystem,
  shutdownSystem,
  checkEcosystemHealth
};
