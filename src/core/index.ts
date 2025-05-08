
// Core module exports
import { LucieAI } from './Lucie';
import { Oxum } from './Oxum';
import { UberCore } from './UberCore';
import { hermes } from './Hermes';
import { UberWallet } from './UberWallet';
import { initializeSystem, shutdownSystem } from './engine';

// Initialize the core systems
const lucieAI = new LucieAI();
const oxum = new Oxum();
const uberCore = new UberCore(lucieAI, oxum);

// Export the initialized instances
export {
  lucieAI,
  oxum,
  uberCore,
  hermes,
  initializeSystem,
  shutdownSystem
};

// Export any utility functions that components might need
export * from './utils';
