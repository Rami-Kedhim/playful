
// Export all core subsystems with proper annotations
// This file serves as the main entry point for UberCore

// Core AI Systems
export * from './Lucie';          // AI Generation, Content Moderation
export * from './Hermes';         // Flow Dynamics, User Routing

// Export types, but rename conflicting types to avoid ambiguity
import { 
  oxum, 
  SystemIntegrityResult as OxumSystemIntegrityResult,
  SessionValidationResult as OxumSessionValidationResult
} from './Oxum';
export { 
  oxum, 
  OxumSystemIntegrityResult, 
  OxumSessionValidationResult 
};

export * from './Orus';           // Security, Session Validation
export * from './UberWallet';     // UBX Token Economy, Transactions

// Core System
export * from './UberCore';       // Base System Integration

// Type exports
export * from './types';          // Type definitions for UberCore

// Utility exports for UberCore systems
export * from './utils';          // Shared utilities

console.info('UberCore modules loaded and initialized');
