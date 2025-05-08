
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
  status: 'pending' | 'in_review' | 'approved' | 'rejected';
  verificationLevel: VerificationLevel;
  documents: VerificationDocument[];
  submittedAt: string;
  updatedAt?: string;
  rejectionReason?: string;
}
