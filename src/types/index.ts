
// Fix duplicated export issue for VerificationLevel by explicit export from only one file and removing duplicate

export * from './UberPersona';
export * from './neural/NeuralSystemMetrics';
export * from './verification/statusCheck';
export * from './verification/requestSubmission';
export * from './verification/documentUpload';
export * from './Escort';
export * from './auth';

export interface ContactInfo {
  phone?: string;
  email?: string;
  website?: string;
}

