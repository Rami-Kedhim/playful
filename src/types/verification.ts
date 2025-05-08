
// Unified verification type definitions

export enum VerificationLevel {
  NONE = 'none',
  BASIC = 'basic',
  ENHANCED = 'enhanced',
  PREMIUM = 'premium',
  VERIFIED = 'verified'
}

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
