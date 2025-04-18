
// Export the standardized types to avoid inconsistencies

// Export UberPersona types
export * from './UberPersona';

// Re-export neural types
export * from './neural/NeuralSystemMetrics';

// Re-export verification types
export * from './verification';

// Re-export escort types
export * from './Escort';

// Re-export auth types
export * from './auth';

// Type for contact info to fix the missing export
export interface ContactInfo {
  phone?: string;
  email?: string;
  website?: string;
}
