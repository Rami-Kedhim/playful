// Fix duplicated export of NeuralModel by re-exporting only once
export * from './UberPersona';
export * from './neural/NeuralSystemMetrics';
export * from './Escort';
export * from './auth';

export interface ContactInfo {
  phone?: string;
  email?: string;
  website?: string;
}
