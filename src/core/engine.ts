
// Core UberEscorts engine entrypoint connecting Hermes, Oxum, Orus AI layers

// Fix import of hermes from HermesOxumNeuralHub
import { neuralHub as hermes } from '@/services/neural/HermesOxumNeuralHub';
import { uberCoreInstance } from '@/core/UberCore'; // fixed import path to '@/core/UberCore'
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
