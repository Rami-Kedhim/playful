
// Define the verification related types used across the application

// VerificationLevel enum for use across the application
export enum VerificationLevel {
  NONE = 'none',
  BASIC = 'basic',
  ENHANCED = 'enhanced', 
  PREMIUM = 'premium'
}

export enum VerificationStatus {
  NOT_STARTED = 'not_started',
  PENDING = 'pending',
  IN_REVIEW = 'in_review',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  EXPIRED = 'expired'
}

export interface VerificationDocument {
  id: string;
  type: string;
  url: string;
  status: 'pending' | 'approved' | 'rejected';
  uploadedAt: string;
  reviewedAt?: string;
}

export interface VerificationRequest {
  id: string;
  userId: string;
  status: VerificationStatus | string;
  level: VerificationLevel | string;
  verificationLevel?: VerificationLevel | string; // For backwards compatibility
  requested_level?: VerificationLevel | string; // For backwards compatibility
  submittedAt: string;
  reviewedAt?: string;
  documents: VerificationDocument[];
  rejectionReason?: string;
  expiresAt?: string;
}

export interface VerificationFormValues {
  documentType: string;
  documentFrontImage: {
    file?: File;
    preview: string;
  };
  documentBackImage?: {
    file?: File;
    preview: string;
  };
  selfieImage: {
    file?: File;
    preview: string;
  };
}

export const DOCUMENT_TYPES = {
  ID_CARD: 'id_card',
  PASSPORT: 'passport',
  DRIVING_LICENSE: 'driving_license'
};

// Document requirements for different document types
export const DOCUMENT_REQUIREMENTS: Record<string, {
  frontRequired: boolean;
  backRequired: boolean;
  selfieRequired: boolean;
}> = {
  [DOCUMENT_TYPES.ID_CARD]: {
    frontRequired: true,
    backRequired: true,
    selfieRequired: true
  },
  [DOCUMENT_TYPES.PASSPORT]: {
    frontRequired: true,
    backRequired: false,
    selfieRequired: true
  },
  [DOCUMENT_TYPES.DRIVING_LICENSE]: {
    frontRequired: true,
    backRequired: true,
    selfieRequired: true
  }
};
