
// Core UberEscorts engine entrypoint connecting all UberCore layers

import { hermes } from '@/core/Hermes';
import { uberCore } from '@/core/UberCore';
import { orus } from '@/core/Orus';
import { oxum } from '@/core/Oxum';
import { lucie } from '@/core/Lucie';

export const initializeSystem = async () => {
  // Initialize all core modules
  await uberCore.initialize();
  await hermes.initialize();
  await lucie.initialize();
  
  // Oxum and Orus are initialized in their constructors
  
  // Validate system integrity
  const integrityResult = orus.checkIntegrity();
  if (!integrityResult.isValid) {
    console.error('System integrity check failed:', integrityResult.message);
    return false;
  }
  
  console.info('UberEscorts core engine initialized');
  return true;
};

export const shutdownSystem = async () => {
  await uberCore.shutdown();
  console.info('UberEscorts core engine shut down');
};

export const getSystemStatus = () => {
  return {
    core: uberCore.getSystemStatus(),
    security: orus.checkIntegrity(),
    ai: lucie.getSystemStatus(),
    boostSystem: oxum.checkSystemStatus()
  };
};
