
/**
 * Core type definitions for UberCore systems
 */

import { UberPersona, PersonaSource } from '@/types/uberPersona';

export interface UberCoreSettings {
  boostingEnabled: boolean;
  boostingAlgorithm: string;
  orderByBoost: boolean;
  autonomyLevel: number;
  resourceAllocation: number;
  hilbertDimension: number;
  aiEnhancementLevel: number;
}

export interface SystemHealthMetrics {
  load: number;
  memory: number;
  latency: number;
  errorRate: number;
  averageResponseTime: number;
}

export interface UberCoreStatus {
  isRunning: boolean;
  version: string;
  uptime: number;
  memoryUsage: number;
  processorLoad: number;
}

export interface NeuralSystemMetricsResult {
  metrics: {
    processing: {
      current: number;
      historical: number[];
      processingEfficiency: number;
      processingTrend: 'up' | 'down' | 'stable';
    };
    accuracy: {
      current: number;
      historical: number[];
      accuracyRate: number;
      accuracyTrend: 'up' | 'down' | 'stable';
    };
    recommendations: string[];
    history: any[];
  };
  systemHealth: SystemHealthMetrics;
  performance: {
    cpuUsage: number;
    memoryUsage: number;
    systemLoad: number;
    memoryAllocation: number;
    networkThroughput: number;
    requestRate: number;
    averageResponseTime: number;
    errorRate: number;
  };
}

export interface CoreInitOptions {
  boostingEnabled?: boolean;
  autonomyLevel?: number;
  resourceAllocation?: number;
  debug?: boolean;
}

export interface CoreModule {
  name: string;
  version: string;
  status: 'active' | 'inactive' | 'error';
  initialize: () => Promise<boolean>;
  shutdown: () => Promise<boolean>;
}

// Updated PersonaProcessingResult interface to align with UberPersona
export interface PersonaProcessingResult extends UberPersona {
  boostScore?: number;
  systemMetadata?: {
    source: PersonaSource;
    lastSynced: Date;
    tagsGeneratedByAI: boolean;
    hilbertSpaceVector: number[];
    flowScore?: number;
    statusFlags?: {
      needsModeration?: boolean;
      [key: string]: boolean | undefined;
    };
    personalityIndex?: number;
  };
  processingStats?: {
    viewCount: number;
    interactionCount: number;
    conversionRate: number;
    engagementScore: number;
  };
}
