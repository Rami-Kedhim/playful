
export enum VerificationLevel {
  NONE = 'none',
  BASIC = 'basic',
  STANDARD = 'standard',
  ENHANCED = 'enhanced',
  PREMIUM = 'premium'
}

export type DocumentType = 'id_card' | 'passport' | 'drivers_license';

export enum VerificationStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected'
}

export interface VerificationDocument {
  id: string;
  type: DocumentType;
  frontImageUrl?: string;
  backImageUrl?: string;
  selfieWithIdUrl?: string;
  uploadedAt: Date;
  status: VerificationStatus;
  
  // Alternative field names that some components might use
  fileUrl?: string;
  url?: string;
  file_path?: string;
  document_type?: DocumentType;
  uploaded_at?: Date;
}

export interface VerificationRequest {
  id: string;
  userId: string;
  requestedLevel: VerificationLevel;
  documents: VerificationDocument[];
  status: VerificationStatus;
  submitDate: Date;
  reviewDate?: Date;
  reviewerId?: string;
  reviewNotes?: string;
}
