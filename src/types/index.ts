
// Cleaned duplicate exports and used export type for types for isolatedModules compliance

export * from './UberPersona';
export type * from './neural/NeuralSystemMetrics'; // Export types only to avoid TS error
export * from './verification';
export * from './Escort';
export * from './auth';

// Removed duplicate NeuralModel export
//export type * from './UberPersona'; Already export UberPersona types

export interface ContactInfo {
  phone?: string;
  email?: string;
  website?: string;
}

