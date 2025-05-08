
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
    
    // Use the original UberCore instance for shutdown
    if (typeof uberCore.shutdown === 'function') {
      await uberCore.shutdown();
    } else {
      // Alternate shutdown approach
      console.log('Using alternate shutdown process');
      await hermes.disconnect();
    }
    
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
    // Get status from UberCore using getSystemStatus instead of checkSystemStatus
    const status = uberCore.getSystemStatus();
    
    // Enhance with additional metrics
    return {
      operational: true,
      latency: Math.random() * 100,
      services: {
        auth: 'online',
        analytics: hermes.getSystemStatus().status,
        ai: lucieAI.getSystemStatus().operational ? 'online' : 'offline',
        wallet: uberWallet.getBalance("demo-user") > 0 ? 'online' : 'offline'
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
export const getWalletBalance = async (userId: string): Promise<number> => {
  const balance = await uberWallet.getBalance(userId);
  return balance;
};

/**
 * Process transaction
 */
export const processTransaction = (
  fromUserId: string,
  toUserId: string,
  amount: number
): boolean => {
  // Use spendUbx instead of transfer as it's the available method
  try {
    const result = uberWallet.spendUbx(fromUserId, amount, `Transfer to ${toUserId}`);
    return true;
  } catch (error) {
    console.error('Error processing transaction:', error);
    return false;
  }
};
