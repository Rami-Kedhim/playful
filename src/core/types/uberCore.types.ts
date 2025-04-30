
import { UberPersona } from '@/types/uberPersona';

export interface UberCoreSettings {
  boostingEnabled: boolean;
  boostingAlgorithm: string;
  orderByBoost: boolean;
  autonomyLevel: number;
  resourceAllocation: number;
  hilbertDimension: number;
  aiEnhancementLevel: number;
}

export interface PersonaProcessingOptions {
  applyBoosting?: boolean;
  calculateFlow?: boolean;
  enhanceWithAI?: boolean;
  optimizeVisibility?: boolean;
}

export interface PersonaProcessingResult {
  persona: UberPersona;
  boostScore?: number;
  flowScore?: number;
  visibilityScore?: number;
}

export interface SystemStatus {
  coreStatus: 'online' | 'offline' | 'degraded';
  hermesStatus: string;
  oxumStatus: string;
  orusStatus: string;
  walletStatus: string;
  activeUsers: number;
  activePersonas: number;
  boostPower: number;
  systemLoad: number;
  lastUpdated: Date;
}
