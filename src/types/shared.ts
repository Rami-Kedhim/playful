
// Consolidated shared types for the UberConcepts ecosystem

// Re-export existing types for backward compatibility
export * from './UberPersona';
export * from './user';
export * from './ubercore';
export * from './uber-ecosystem';

// Basic ID type used throughout the application
export type ID = string;

// Base persona type that all persona types extend
export interface BasePersona {
  id: ID;
  displayName: string;
  avatarUrl?: string;
  location?: string;
  type?: string;
  [key: string]: any;
}

// Core UberSystem status interface
export interface SystemStatus {
  operational: boolean;
  lastUpdated: Date;
  components: Record<string, {
    status: 'operational' | 'degraded' | 'offline';
    latency?: number;
    message?: string;
  }>;
  metrics: Record<string, number>;
}

// Common user interaction types
export interface UserInteraction {
  userId: string;
  targetId?: string;
  type: string;
  timestamp: Date;
  metadata?: Record<string, any>;
}

// Metrics and analytics
export interface AnalyticsData {
  views: number;
  interactions: number;
  conversions: number;
  boostEffectiveness?: number;
  engagementRate?: number;
  period?: {
    start: Date;
    end: Date;
  };
}
