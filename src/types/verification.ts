
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
  document_type?: string; // For backward compatibility
  fileUrl: string;
  file_path?: string; // For backward compatibility
  url?: string; // For backward compatibility
  status: VerificationStatus;
  uploadedAt: string;
  uploaded_at?: string; // For backward compatibility
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
