
/**
 * System Health Checker Utilities
 * Used for checking the health of various UberEscorts core systems
 */

import { hermes } from '@/core/Hermes';
import { oxum } from '@/core/Oxum';
import { lucie } from '@/core/Lucie';
import { uberCore } from '@/core/UberCore';

export interface SystemHealthStatus {
  operational: boolean;
  overallHealth: number; // 0-100
  subsystems: Record<string, SubsystemHealth>;
  latency: number;
  timestamp: string;
}

export interface SubsystemHealth {
  status: 'operational' | 'degraded' | 'offline';
  health: number; // 0-100
  latency?: number;
  message?: string;
}

/**
 * Check the health status of all core systems
 */
export async function checkSystemStatus(): Promise<SystemHealthStatus> {
  const startTime = performance.now();
  
  // Get status from each subsystem
  const hermesStatus = hermes.getSystemStatus();
  const oxumStatus = oxum.checkSystemStatus();
  const lucieStatus = lucie.getSystemStatus();
  const coreStatus = uberCore.checkSubsystemHealth();
  
  // Calculate health metrics from statuses
  const hermesHealth = hermesStatus.status === 'operational' ? 100 : 
                       hermesStatus.status === 'degraded' ? 50 : 0;
  
  const oxumHealth = oxumStatus.operational ? 100 : 50;
  
  const lucieHealth = Object.values(lucieStatus.modules).every(status => status === 'online') ? 100 :
                      Object.values(lucieStatus.modules).some(status => status === 'offline') ? 20 : 60;
  
  const coreHealth = coreStatus.reduce((sum, item) => sum + item.health, 0) / coreStatus.length;
  
  // Calculate overall health score (weighted average)
  const overallHealth = Math.round((
    hermesHealth * 0.3 + 
    oxumHealth * 0.3 + 
    lucieHealth * 0.2 + 
    coreHealth * 0.2
  ));
  
  // Calculate latency
  const endTime = performance.now();
  const latency = Math.round(endTime - startTime);
  
  return {
    operational: overallHealth > 50,
    overallHealth,
    subsystems: {
      hermes: {
        status: hermesStatus.status === 'operational' ? 'operational' : 'degraded',
        health: hermesHealth
      },
      oxum: {
        status: oxumStatus.operational ? 'operational' : 'degraded',
        health: oxumHealth
      },
      lucie: {
        status: lucieHealth > 80 ? 'operational' : lucieHealth > 30 ? 'degraded' : 'offline',
        health: lucieHealth
      },
      core: {
        status: coreHealth > 80 ? 'operational' : coreHealth > 30 ? 'degraded' : 'offline',
        health: coreHealth
      }
    },
    latency,
    timestamp: new Date().toISOString()
  };
}

/**
 * Check if a specific subsystem is operational
 */
export function isSubsystemOperational(subsystemName: string): boolean {
  switch (subsystemName.toLowerCase()) {
    case 'hermes':
      return hermes.getSystemStatus().status === 'operational';
    case 'oxum':
      return oxum.checkSystemStatus().operational;
    case 'lucie': 
      return Object.values(lucie.getSystemStatus().modules).every(status => status === 'online');
    case 'core':
      return uberCore.getSystemStatus().status === 'operational';
    default:
      return false;
  }
}

/**
 * Format a health percentage for display
 */
export function formatHealthPercentage(health: number): string {
  if (health >= 90) return `${health}% (Excellent)`;
  if (health >= 70) return `${health}% (Good)`;
  if (health >= 50) return `${health}% (Fair)`;
  if (health >= 30) return `${health}% (Poor)`;
  return `${health}% (Critical)`;
}
