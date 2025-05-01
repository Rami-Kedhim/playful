
/**
 * Core type definitions for UberCore systems
 */

// Re-export shared types to avoid duplicating definitions
export * from '@/types/shared';

// Core-specific types that shouldn't be exposed outside the core system
export interface CoreModuleConfig {
  enabled: boolean;
  debugMode: boolean;
  autoInitialize: boolean;
}

export interface ModuleConnectionInfo {
  moduleId: string;
  connectionTime: Date;
  status: 'connected' | 'disconnected' | 'error';
  errorDetails?: string;
}

export interface CoreEvent {
  eventType: string;
  timestamp: Date;
  source: string;
  data: Record<string, any>;
}

export interface CoreEventListener {
  (event: CoreEvent): void;
}

export interface CoreEventEmitter {
  emit(eventType: string, data: Record<string, any>): void;
  on(eventType: string, listener: CoreEventListener): void;
  off(eventType: string, listener: CoreEventListener): void;
}

// UbxTransaction from UberWallet
export interface UbxTransactionDetail extends Record<string, any> {
  id: string;
  userId: string;
  amount: number;
  type: 'purchase' | 'spend' | 'earn' | 'refund';
  status: 'pending' | 'completed' | 'failed';
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

// Lucie content types
export interface ContentGenerationRequest {
  prompt: string;
  type: 'text' | 'image' | 'voice';
  nsfw: boolean;
  userId: string;
  strength?: number;
  style?: string;
  additionalParams?: Record<string, any>;
}

export interface ContentModerationRequest {
  content: string;
  type: 'text' | 'image';
  userId: string;
  context?: string;
}
