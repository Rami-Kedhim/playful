
// Verification status types
export type VerificationStatus = 'pending' | 'in_review' | 'approved' | 'rejected';

// Verification level enum
export enum VerificationLevel {
  NONE = 'none',
  BASIC = 'basic',
  VERIFIED = 'verified',
  ENHANCED = 'enhanced',
  PREMIUM = 'premium'
}

// For backwards compatibility
export const VERIFICATION_LEVEL = VerificationLevel;

export interface VerificationDocument {
  id: string;
  type: string;
  fileUrl: string;
  uploadedAt: string;
  status: 'pending' | 'approved' | 'rejected';
  // Add missing properties
  notes?: string;
  filePath?: string;
  documentType?: string;
}

export interface VerificationRequest {
  id: string;
  userId: string;
  status: VerificationStatus;
  verificationLevel: VerificationLevel;
  documents: VerificationDocument[];
  submittedAt: string;
  updatedAt?: string;
  rejectionReason?: string;
}
