// Fix double export of NeuralModel from UberPersona by removing duplicate exports
// Or explicitly re-export only once

export * from './UberPersona';
export * from './neural/NeuralSystemMetrics';
export * from './Escort';
export * from './auth';

export interface ContactInfo {
  phone?: string;
  email?: string;
  website?: string;
}
