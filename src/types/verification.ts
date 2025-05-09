
// Define verification status as values, not just types
export const VERIFICATION_STATUS = {
  PENDING: 'pending',
  IN_REVIEW: 'in_review',
  APPROVED: 'approved',
  REJECTED: 'rejected'
} as const;

export type VerificationStatus = typeof VERIFICATION_STATUS[keyof typeof VERIFICATION_STATUS];

// Define verification levels as a proper enum that can be used as values
export enum VerificationLevel {
  NONE = 'none',
  BASIC = 'basic',
  VERIFIED = 'verified',
  ENHANCED = 'enhanced',
  PREMIUM = 'premium'
}

export interface VerificationDocument {
  id: string;
  type: string;
  fileUrl: string;
  uploadedAt: string;
  status: 'pending' | 'approved' | 'rejected';
  filePath?: string;
  documentType?: string;
  notes?: string;
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
  reviewer_notes?: string;
  created_at?: string;
}
