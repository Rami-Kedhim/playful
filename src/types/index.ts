
// Fix duplicated export and remove broken paths for verification as requested

// Removed exports causing errors
// export * from './verification/statusCheck';
// export * from './verification/requestSubmission';
// export * from './verification/documentUpload';

export * from './UberPersona';
export * from './neural/NeuralSystemMetrics';
export * from './Escort';
export * from './auth';

export interface ContactInfo {
  phone?: string;
  email?: string;
  website?: string;
}
