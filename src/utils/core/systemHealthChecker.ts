
import { hermes } from '@/core/Hermes';
import { oxum } from '@/core/Oxum';
import { lucie } from '@/core/Lucie';
import { orus } from '@/core/Orus';

/**
 * Check and report on the health of all UberEscorts core systems
 */
export async function checkAllSystemsHealth() {
  // Check Hermes Analytics
  const hermesStatus = hermes.getSystemStatus();
  const hermesHealth = hermesStatus.status === 'operational' ? 'healthy' : 'degraded';

  // Check Oxum Boost Engine  
  const oxumStatus = oxum.checkSystemStatus();
  const oxumHealth = oxumStatus.operational ? 'healthy' : 'degraded';
  
  // Check Lucie AI System
  const lucieStatus = lucie.getSystemStatus();
  const lucieModulesHealth = Object.entries(lucieStatus.modules).map(([name, status]) => ({
    name,
    status
  }));
  const lucieHealth = lucieModulesHealth.every(m => m.status === 'online') ? 'healthy' : 'degraded';
  
  // Check Orus Security
  const orusResult = orus.checkIntegrity();
  const orusHealth = orusResult.isValid ? 'healthy' : 'compromised';
  
  // Calculate overall health
  const systemsHealthy = [
    hermesHealth === 'healthy',
    oxumHealth === 'healthy', 
    lucieHealth === 'healthy',
    orusHealth === 'healthy'
  ];
  
  const healthyCount = systemsHealthy.filter(Boolean).length;
  const overallHealth = healthyCount === systemsHealthy.length ? 'healthy' : 
                        healthyCount >= systemsHealthy.length / 2 ? 'degraded' : 
                        'critical';
  
  return {
    timestamp: new Date(),
    overallStatus: overallHealth,
    systems: {
      hermes: {
        status: hermesHealth,
        details: hermesStatus
      },
      oxum: {
        status: oxumHealth,
        details: oxumStatus
      },
      lucie: {
        status: lucieHealth,
        details: lucieModulesHealth
      },
      orus: {
        status: orusHealth,
        details: orusResult
      }
    },
    healthySystemsCount: healthyCount,
    totalSystems: systemsHealthy.length
  };
}

/**
 * Get a simple health status as a percentage
 */
export function getSystemHealthPercentage() {
  let total = 0;
  
  // Check Hermes
  const hermesStatus = hermes.getSystemStatus();
  total += hermesStatus.status === 'operational' ? 100 : 50;
  
  // Check Oxum
  const oxumStatus = oxum.checkSystemStatus();
  total += oxumStatus.operational ? 100 : 50;
  
  // Check Lucie
  const lucieStatus = lucie.getSystemStatus();
  const lucieModulesOnline = Object.values(lucieStatus.modules)
    .filter(status => status === 'online').length;
  const lucieModulesTotal = Object.values(lucieStatus.modules).length;
  total += (lucieModulesOnline / lucieModulesTotal) * 100;
  
  // Check Orus
  const orusResult = orus.checkIntegrity();
  total += orusResult.isValid ? 100 : 0;
  
  // Calculate average
  return Math.round(total / 4);
}

export default {
  checkAllSystemsHealth,
  getSystemHealthPercentage
};
