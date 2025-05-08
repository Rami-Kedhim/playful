
import { lucieAI } from './Lucie';
import { hermes } from './Hermes';
import { uberCore } from './UberCore';
import { orus } from './Orus';
import { uberWallet } from './UberWallet';
import { SystemStatus } from '@/types/core-systems';

/**
 * Initialize the UberEscorts ecosystem
 * This initializes all core subsystems
 */
export const initializeSystem = async (): Promise<boolean> => {
  try {
    console.log('Initializing UberEscorts system...');
    
    // Initialize Lucie AI
    await lucieAI.initialize();
    
    // Initialize Hermes analytics
    await hermes.initialize();
    
    // Initialize Orus security
    await orus.initialize();
    
    console.info('UberEcosystem initialized successfully');
    return true;
  } catch (error) {
    console.error('Error initializing UberEscorts system:', error);
    return false;
  }
};

/**
 * Shutdown the UberEscorts ecosystem
 */
export const shutdownSystem = async (): Promise<void> => {
  try {
    console.log('Shutting down UberEscorts system...');
    
    // Shutdown each subsystem
    await uberCore.shutdown();
    
    console.info('UberEcosystem shutdown successfully');
  } catch (error) {
    console.error('Error shutting down UberEscorts system:', error);
  }
};

/**
 * Get system status
 * @returns System status
 */
export const getSystemStatus = (): SystemStatus => {
  try {
    // Get status from UberCore
    const status = uberCore.checkSystemStatus();
    
    // Enhance with additional metrics
    return {
      ...status,
      operational: true,
      latency: Math.random() * 100,
      services: {
        auth: 'online',
        analytics: hermes.getSystemStatus().status,
        ai: lucieAI.getSystemStatus().operational ? 'online' : 'offline',
        wallet: uberWallet.isInitialized() ? 'online' : 'offline'
      }
    };
  } catch (error) {
    console.error('Error getting system status:', error);
    return {
      operational: false,
      services: {
        auth: 'offline',
        analytics: 'offline',
        ai: 'offline',
        wallet: 'offline'
      }
    };
  }
};

/**
 * Get wallet balance for user
 */
export const getWalletBalance = (userId: string): number => {
  return uberWallet.getBalance(userId);
};

/**
 * Process transaction
 */
export const processTransaction = (
  fromUserId: string,
  toUserId: string,
  amount: number
): boolean => {
  return uberWallet.transfer(fromUserId, toUserId, amount);
};
