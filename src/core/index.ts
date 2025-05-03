
// Export all core subsystems with proper annotations
// This file serves as the main entry point for UberCore

// Core AI Systems
export * from './Lucie';          // AI Generation, Content Moderation

// Re-export Lucie ContentGenerationRequest specifically to avoid ambiguity
import { lucie, LucieSystem, ContentModerationResult } from './Lucie';
export { lucie, LucieSystem, ContentModerationResult };
export type { ContentGenerationRequest } from './Lucie';

export * from './Hermes';         // Flow Dynamics, User Routing
export * from './LucieOrchestratorAdapter'; // Backward compatibility for lucieOrchestrator
export * from './HermesOrusOxum'; // Unified core integration

// Export types, but rename conflicting types to avoid ambiguity
import { 
  oxum, 
  SystemIntegrityResult as OxumSystemIntegrityResult,
  SessionValidationResult as OxumSessionValidationResult
} from './Oxum';
export { 
  oxum, 
  type OxumSystemIntegrityResult, 
  type OxumSessionValidationResult 
};

export * from './Orus';           // Security, Session Validation

// Export UberWallet without re-exporting the types that are already exported
import { uberWallet, UberWallet, UbxTransaction } from './UberWallet';
export { uberWallet, UberWallet, UbxTransaction };

// Core System
export * from './UberCore';       // Base System Integration

// Type exports
export * from './types';          // Type definitions for UberCore

// Utility exports for UberCore systems
export * from './utils';          // Shared utilities

console.info('UberCore modules loaded and initialized');
