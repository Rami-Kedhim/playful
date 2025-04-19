
export enum VerificationStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  EXPIRED = 'expired',
  SUSPENDED = 'suspended'
}

export interface VerificationDocument {
  id: string;
  userId: string;
  documentType: string;
  fileUrl: string;
  status: VerificationStatus;
  uploadedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  notes?: string;
}

export interface VerificationRequest {
  id: string;
  userId: string;
  requestDate: string;
  status: VerificationStatus;
  documents: VerificationDocument[];
  reviewedAt?: string;
  reviewedBy?: string;
  rejectionReason?: string;
}
