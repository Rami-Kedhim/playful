
// Create or update the verification types file

export enum VerificationLevel {
  NONE = 'NONE',
  BASIC = 'BASIC',
  VERIFIED = 'VERIFIED',
  ENHANCED = 'ENHANCED',
  PREMIUM = 'PREMIUM'
}

export enum VerificationStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  REVIEW = 'REVIEW',
  EXPIRED = 'EXPIRED'
}

export enum DocumentType {
  ID_CARD = 'ID_CARD',
  PASSPORT = 'PASSPORT',
  DRIVERS_LICENSE = 'DRIVERS_LICENSE',
  SELFIE = 'SELFIE',
  OTHER = 'OTHER'
}

export interface VerificationDocument {
  id: string;
  document_type: DocumentType;
  file_url: string;
  uploaded_at: Date;
  status: VerificationStatus;
  notes?: string;
  // Aliases for backward compatibility
  url?: string;
  fileUrl?: string;
  document_url?: string;
  type?: DocumentType;
  uploadedAt?: Date;
}

export interface VerificationRequest {
  id: string;
  userId: string;
  status: VerificationStatus;
  documents: VerificationDocument[];
  created_at: Date;
  updated_at: Date;
  reviewed_by?: string;
  reviewed_at?: Date;
  // Additional fields required by components
  submittedAt?: Date;
  verificationLevel?: VerificationLevel;
  rejectionReason?: string;
}

export interface VerificationStats {
  pending: number;
  approved: number;
  rejected: number;
  total: number;
  averageProcessingTime: number;
}
