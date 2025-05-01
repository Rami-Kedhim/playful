
// Core UberEscorts type definitions

// Re-export shared types for compatibility
export * from '@/types/shared';
export * from '@/types/uberPersona';

// Core-specific type definitions
export interface CoreSystemStatus {
  operational: boolean;
  timestamp: Date;
  subsystems: {
    lucie: boolean;
    hermes: boolean;
    oxum: boolean;
    orus: boolean;
    wallet: boolean;
  };
  metrics: {
    responseTime: number;
    activeSessions: number;
    processingLoad: number;
  };
}

export interface UberCoreOptions {
  debug?: boolean;
  autoOptimize?: boolean;
  logLevel?: 'debug' | 'info' | 'warn' | 'error';
}

export interface UberInitResult {
  success: boolean;
  timestamp: Date;
  message: string;
}
