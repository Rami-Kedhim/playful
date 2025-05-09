
export enum VerificationLevel {
  NONE = 'none',
  BASIC = 'basic',
  ENHANCED = 'enhanced',
  PREMIUM = 'premium',
  VERIFIED = 'verified'
}

export type VerificationStatus = 'pending' | 'in_review' | 'approved' | 'rejected';

// Use this constant to match the VERIFICATION_STATUS that is imported in several files
export const VERIFICATION_STATUS = {
  PENDING: 'pending',
  IN_REVIEW: 'in_review',
  APPROVED: 'approved',
  REJECTED: 'rejected'
};

// Also add VERIFICATION_LEVEL constant for components using it
export const VERIFICATION_LEVEL = {
  NONE: 'none',
  BASIC: 'basic',
  ENHANCED: 'enhanced',
  PREMIUM: 'premium',
  VERIFIED: 'verified'
};

export interface VerificationDocument {
  id: string;
  type: string;
  fileUrl: string;
  uploadedAt: string;
  status: 'pending' | 'approved' | 'rejected';
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
  
  // Add missing properties
  profile_id?: string;
  created_at?: string;
  reviewed_at?: string;
  requested_level?: string;
  requestedLevel?: string;
}
