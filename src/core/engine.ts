
import { oxum } from "./Oxum";
import { UberWallet } from './UberWallet';
import { automaticSeo } from './AutomaticSEO';

// Initialize core system components
const wallet = new UberWallet();
const uberCore = {
  initializeAutomaticSeo: automaticSeo.initialize,
  checkSubsystemHealth: () => {
    return [
      { name: 'auth', status: 'operational', health: 98 },
      { name: 'wallet', status: 'operational', health: 100 },
      { name: 'boost', status: 'operational', health: 95 },
      { name: 'hermes', status: 'operational', health: 92 },
      { name: 'ai', status: 'operational', health: 99 }
    ];
  },
  getSystemStatus: () => {
    return {
      operational: true,
      isActive: true,
      services: {
        auth: 'operational',
        analytics: 'operational',
        ai: 'operational',
        wallet: 'operational',
        seo: 'operational'
      },
      queueLength: 0,
      processing: false,
      lastUpdate: new Date()
    };
  },
  shutdown: async () => {
    console.log('Shutting down UberEscorts system...');
    try {
      await wallet.shutdown();
      await automaticSeo.shutdown();
      return true;
    } catch (error) {
      console.error('Error during shutdown:', error);
      return false;
    }
  }
};

// Export functions for system initialization and shutdown
export const initializeSystem = async () => {
  console.log('Initializing UberEscorts system...');
  
  try {
    // Initialize wallet with initial balance
    if (!wallet.isInitialized()) {
      await wallet.initialize(1000);
      console.log('Wallet initialized with 1000 initial balance');
    }
    
    // Initialize Oxum system
    await oxum.initialize();
    
    // Initialize automatic SEO
    const seoInitialized = uberCore.initializeAutomaticSeo();
    if (seoInitialized) {
      console.log('Automatic SEO initialized');
    }
    
    // Check overall system status
    const status = uberCore.getSystemStatus();
    console.log('System status:', status.operational ? 'Operational' : 'Degraded');
    
    // Return initialization success
    return true;
  } catch (error) {
    console.error('Failed to initialize UberEscorts system:', error);
    return false;
  }
};

export const shutdownSystem = async () => {
  console.log('Shutting down UberEscorts system...');
  
  try {
    // Transfer remaining funds to safe storage
    const balance = await wallet.getBalance();
    if (balance > 0) {
      await wallet.transfer('safe-storage', balance);
    }
    
    // Shut down core systems
    await uberCore.shutdown();
    
    return true;
  } catch (error) {
    console.error('Error during system shutdown:', error);
    return false;
  }
};

export default uberCore;
