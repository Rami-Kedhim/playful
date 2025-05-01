
/**
 * UberCore Types - Consolidated Type Definitions
 * Central hub for all core type definitions, enhancing maintainability and type safety
 */

// Re-export existing types for backward compatibility but avoid duplicates
export * from '../uberPersona';
// Import but don't re-export to avoid conflicts
import '../shared';

// Re-export specific types to avoid conflicts
export { type UberBoostSettings, type PersonaMatch } from '../uber-ecosystem';
export * from '../pulse-boost';

// Core System Interface Types
export interface UberCoreInitOptions {
  boostingEnabled?: boolean;
  autonomyLevel?: number;
  resourceAllocation?: number;
  debug?: boolean;
}

export interface SystemInitialization {
  success: boolean;
  timestamp: Date;
  services: string[];
  errors?: string[];
}

export interface CoreModule {
  name: string;
  version: string;
  status: 'active' | 'inactive' | 'error';
  initialize: () => Promise<boolean>;
  shutdown: () => Promise<boolean>;
}

// Flow and Visibility Core Types 
export interface FlowState {
  score: number;
  status: 'elevated' | 'normal' | 'reduced';
  lastCalculated: Date;
  timeFactors: Record<string, number>;
  boosters: Array<{
    type: string;
    value: number;
    expires?: Date;
  }>;
}

export interface VisibilityFactors {
  baseScore: number;
  profileCompleteness: number;
  activityLevel: number;
  popularity: number;
  timeOfDay: number; 
  boostMultiplier: number;
}

// Standardized Response Interfaces
export interface CoreResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: Date;
  requestId?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}
