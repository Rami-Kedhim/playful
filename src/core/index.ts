
// Core module exports
import { lucie, lucieAI } from './Lucie';
import { oxum } from './Oxum';
import { UberCore } from './UberCore';
import { hermes } from './Hermes';
import { uberWallet } from './UberWallet';
import { automaticSEO } from './AutomaticSEO';
import { initializeSystem, shutdownSystem } from './engine';

// Export the initialized instances
export {
  oxum,
  hermes,
  lucie,
  lucieAI,
  initializeSystem,
  shutdownSystem,
  automaticSEO,
  uberWallet
};

// Export any utility functions that components might need
export * from './utils';

// Initialize and export
const uberCore = new UberCore(lucieAI);

export { uberCore };
