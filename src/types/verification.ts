
// Define verification status as values, not just types
export const VERIFICATION_STATUS = {
  PENDING: 'pending',
  IN_REVIEW: 'in_review',
  APPROVED: 'approved',
  REJECTED: 'rejected'
};

export type VerificationStatus = typeof VERIFICATION_STATUS[keyof typeof VERIFICATION_STATUS];
export type VerificationLevel = 'none' | 'basic' | 'enhanced' | 'premium';

export interface VerificationDocument {
  id: string;
  type: string;
  fileUrl: string;
  uploadedAt: string;
  status: 'pending' | 'approved' | 'rejected';
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
  reviewer_notes?: string; // Adding this for compatibility
  created_at?: string; // Adding this for compatibility
}
