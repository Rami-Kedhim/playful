
// Core UberEscorts engine entrypoint connecting Hermes, Oxum, Orus AI layers

import { hermes } from '@/services/neural/HermesOxumNeuralHub';
import { uberCoreInstance } from '@/services/neural/UberCore';
import securityEngine from '@/services/neural/BrainHubSecurityEngine';

export const initializeSystem = async () => {
  await uberCoreInstance.initialize();
  await hermes.initialize();
  securityEngine.startMonitoring();

  console.info('UberEscorts core engine initialized');
};

export const shutdownSystem = async () => {
  await uberCoreInstance.shutdown();
  securityEngine.stopMonitoring();

  console.info('UberEscorts core engine shut down');
};
