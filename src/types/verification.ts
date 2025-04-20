
// Removed duplicate identifier declarations

export interface VerificationDocument {
  id: string;
  type: string;
  fileUrl: string;
  uploadedAt: string;
  status: 'pending' | 'approved' | 'rejected';
  rejectionReason?: string;
  reviewedBy?: string;
  reviewedAt?: Date;
}

export interface VerificationRequest {
  id: string;
  userId: string;
  status: 'pending' | 'in_review' | 'approved' | 'rejected';
  verificationLevel: 'none' | 'basic' | 'enhanced' | 'premium';
  documents: VerificationDocument[];
  submittedAt: string;
  updatedAt?: string;
  rejectionReason?: string;
  reviewedBy?: string;
  reviewedAt?: Date;
}

