
import { hermes } from '@/core/Hermes';
import { oxum } from '@/core/Oxum';
import { orus } from '@/core/Orus';
import { lucie } from '@/core/Lucie';

/**
 * Checks the health of all UberEscorts core systems
 */
export async function checkSystemHealth() {
  try {
    // Check the status of all core systems
    const hermesStatus = hermes.getSystemStatus();
    const oxumStatus = oxum.checkSystemStatus();
    const orusIntegrity = orus.checkIntegrity();
    const lucieStatus = lucie.getSystemStatus();
    
    // Calculate system health percentages
    const hermesHealth = hermesStatus.status === 'operational' ? 100 : 50;
    const oxumHealth = oxumStatus.operational ? 100 : 60;
    const orusHealth = orusIntegrity.isValid ? 100 : 40;
    
    // Calculate Lucie health based on its modules
    const lucieModules = Object.values(lucieStatus.modules);
    const lucieOnlineModules = lucieModules.filter(status => status === 'online').length;
    const lucieHealth = Math.round((lucieOnlineModules / lucieModules.length) * 100);
    
    // Calculate overall health as weighted average
    const overallHealth = Math.round(
      (hermesHealth * 0.3) + 
      (oxumHealth * 0.3) + 
      (orusHealth * 0.2) + 
      (lucieHealth * 0.2)
    );
    
    return {
      overall: overallHealth,
      systems: {
        hermes: { health: hermesHealth, status: hermesStatus.status },
        oxum: { health: oxumHealth, status: oxumStatus.operational ? 'operational' : 'degraded' },
        orus: { health: orusHealth, status: orusIntegrity.isValid ? 'secure' : 'compromised' },
        lucie: { 
          health: lucieHealth, 
          status: lucieHealth > 80 ? 'operational' : lucieHealth > 50 ? 'partially degraded' : 'offline'
        }
      }
    };
  } catch (error) {
    console.error('Error checking system health:', error);
    return {
      overall: 0,
      systems: {
        hermes: { health: 0, status: 'error' },
        oxum: { health: 0, status: 'error' },
        orus: { health: 0, status: 'error' },
        lucie: { health: 0, status: 'error' }
      }
    };
  }
}

/**
 * Check if a specific subsystem is operational
 */
export function isSubsystemOperational(subsystem: 'hermes' | 'oxum' | 'orus' | 'lucie'): boolean {
  try {
    switch (subsystem) {
      case 'hermes':
        return hermes.getSystemStatus().status === 'operational';
      case 'oxum':
        return oxum.checkSystemStatus().operational;
      case 'orus':
        return orus.checkIntegrity().isValid;
      case 'lucie': {
        const lucieStatus = lucie.getSystemStatus();
        const lucieModules = Object.values(lucieStatus.modules);
        const lucieOnlineModules = lucieModules.filter(status => status === 'online').length;
        return (lucieOnlineModules / lucieModules.length) > 0.7; // Consider operational if >70% of modules are online
      }
      default:
        return false;
    }
  } catch (error) {
    console.error(`Error checking ${subsystem} status:`, error);
    return false;
  }
}
