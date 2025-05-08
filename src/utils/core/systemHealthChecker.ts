
import { hermes } from '@/core/Hermes';
import { oxum } from '@/core/Oxum';
import { orus } from '@/core/Orus';
import { lucieAI } from '@/core/Lucie';

/**
 * Check the health of all core systems
 */
export function checkSystemHealth() {
  const hermesStatus = hermes.getSystemStatus();
  const oxumStatus = oxum.checkSystemStatus();
  const orusIntegrity = orus.checkIntegrity();
  const lucieStatus = lucieAI.getSystemStatus();
  
  return {
    hermes: {
      operational: hermesStatus.status === 'operational',
      services: hermesStatus.services
    },
    oxum: {
      operational: oxumStatus.operational,
      traffic: oxumStatus.traffic,
      loadFactor: oxumStatus.loadFactor
    },
    orus: {
      integrity: orusIntegrity.isValid,
      message: orusIntegrity.message
    },
    lucie: {
      operational: lucieStatus.operational,
      modules: lucieStatus.modules
    }
  };
}

/**
 * Get overall system health percentage
 */
export function getSystemHealthPercentage(): number {
  const health = checkSystemHealth();
  
  let totalScore = 0;
  let totalSystems = 0;
  
  // Score Hermes
  if (health.hermes.operational) {
    totalScore += 100;
  } else {
    totalScore += 50; // Partially operational
  }
  totalSystems += 1;
  
  // Score Oxum
  if (health.oxum.operational) {
    totalScore += 100;
  } else {
    totalScore += 0;
  }
  totalSystems += 1;
  
  // Score Orus
  if (health.orus.integrity) {
    totalScore += 100;
  } else {
    totalScore += 25; // Severe issue
  }
  totalSystems += 1;
  
  // Score Lucie
  if (health.lucie.operational) {
    totalScore += 100;
  } else {
    // Check if any modules are online
    const moduleCount = Object.keys(health.lucie.modules).length;
    const onlineModules = Object.values(health.lucie.modules).filter(
      status => status === 'online'
    ).length;
    
    totalScore += Math.round((onlineModules / moduleCount) * 100);
  }
  totalSystems += 1;
  
  return Math.round(totalScore / totalSystems);
}
