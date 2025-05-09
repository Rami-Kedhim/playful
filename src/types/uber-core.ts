
/**
 * UberCore Types - Consolidated Type Definitions
 * Central hub for all core type definitions, enhancing maintainability and type safety
 */

// Re-export specific types from uber-ecosystem to avoid conflicts
export interface UberBoostSettings {
  enabled: boolean;
  multiplier: number;
  duration: number;
  startTime?: Date;
  endTime?: Date;
  autoRenew?: boolean;
}

export interface PersonaMatch {
  persona: any; // Using any to avoid circular dependency
  score: number;
  matchBasis: string[];
  similarTo?: string[];
}

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

// Notification system
export interface UberNotification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'system' | 'chat' | 'booking' | 'payment';
  read: boolean;
  createdAt: Date;
  link?: string;
  entityId?: string;
  entityType?: string;
}

// Unified search filters
export interface UberSearchFilters {
  location?: string;
  type?: string[];
  services?: string[];
  availability?: 'now' | 'today' | 'week';
  price?: {
    min?: number;
    max?: number;
  };
  verified?: boolean;
  rating?: number;
  tags?: string[];
}
