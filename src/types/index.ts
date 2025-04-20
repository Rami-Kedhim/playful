
// Cleaned duplicate exports and used export type for types for isolatedModules compliance

export * from './UberPersona';
// Export neural types with export type to avoid TS error
export type * from './neural/NeuralSystemMetrics';

// Export verification types without duplicates
export * from './verification';

// Export escort types
export * from './Escort';

// Export auth types
export * from './auth';

// ContactInfo type
export interface ContactInfo {
  phone?: string;
  email?: string;
  website?: string;
}
