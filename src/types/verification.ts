
// Unified verification type definitions

export enum VerificationLevel {
  NONE = 'none',
  BASIC = 'basic',
  ENHANCED = 'enhanced',
  PREMIUM = 'premium',
  VERIFIED = 'verified'
}

export const VERIFICATION_STATUS = {
  PENDING: 'pending',
  IN_REVIEW: 'in_review',
  APPROVED: 'approved',
  REJECTED: 'rejected'
};

export type VerificationStatus = 'pending' | 'in_review' | 'approved' | 'rejected';

export interface VerificationDocument {
  id: string;
  type: string;
  fileUrl: string;
  uploadedAt: string;
  status: 'pending' | 'approved' | 'rejected';
  notes?: string;
  reviewedAt?: string;
  reviewedBy?: string;
  
  // Additional properties needed by components
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
  verifiedDate?: string;
  
  // Additional properties needed by admin components
  profile_id?: string;
  created_at?: string;
  reviewed_at?: string;
  requested_level?: string;
  requestedLevel?: string;
}

export interface VerificationStats {
  totalPending: number;
  totalApproved: number;
  totalRejected: number;
  averageProcessingTime: number; // in hours
  pendingByLevel: Record<VerificationLevel, number>;
}

export interface VerificationSettings {
  requiredDocumentsByLevel: Record<
    VerificationLevel, 
    { documentTypes: string[]; minimumCount: number }
  >;
  processingTimeEstimate: number; // in hours
  autoApproveBasic: boolean;
  requireFaceMatch: boolean;
}
