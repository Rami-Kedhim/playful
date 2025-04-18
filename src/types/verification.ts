
export enum VerificationLevel {
  NONE = 'none',
  BASIC = 'basic',
  STANDARD = 'standard',
  ENHANCED = 'enhanced',
  PREMIUM = 'premium'
}

export type DocumentType = 'id_card' | 'passport' | 'drivers_license';

export interface VerificationDocument {
  type: DocumentType;
  frontImageUrl?: string;
  backImageUrl?: string;
  selfieWithIdUrl?: string;
  uploadedAt: Date;
  status: 'pending' | 'approved' | 'rejected';
}

export interface VerificationRequest {
  id: string;
  userId: string;
  requestedLevel: VerificationLevel;
  documents: VerificationDocument[];
  status: 'pending' | 'approved' | 'rejected';
  submitDate: Date;
  reviewDate?: Date;
  reviewerId?: string;
  reviewNotes?: string;
}
