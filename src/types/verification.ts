
export enum VerificationStatus {
  PENDING = 'pending',
  IN_REVIEW = 'in_review',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  EXPIRED = 'expired'
}

export enum VerificationLevel {
  NONE = 'none',
  BASIC = 'basic',
  ENHANCED = 'enhanced',
  PREMIUM = 'premium'
}

export const ID_CARD = 'id_card';
export type DocumentType = 'id_card' | 'passport' | 'drivers_license';

// Define document types for form selection
export interface DocumentTypeOption {
  value: string;
  label: string;
}

export const DOCUMENT_TYPES: DocumentTypeOption[] = [
  { value: 'id_card', label: 'ID Card' },
  { value: 'passport', label: 'Passport' },
  { value: 'drivers_license', label: 'Driver\'s License' }
];

export interface VerificationDocument {
  id: string;
  documentType?: string;
  document_type?: string; // For backward compatibility
  fileUrl?: string;
  file_url?: string; // For backward compatibility
  type?: string;
  url?: string;
  document_url?: string;
  status?: string;
  uploaded_at?: string;
  uploadedAt?: string;
  created_at?: string;
}

export interface VerificationRequest {
  id: string;
  status: VerificationStatus | string;
  submittedAt?: string;
  created_at?: string; // For backward compatibility
  documents?: VerificationDocument[];
  verificationLevel?: string;
  requested_level?: string; // For backward compatibility
  requestedLevel?: string;
  rejectionReason?: string;
  reviewer_notes?: string; // For backward compatibility
  reviewedAt?: string;
  userId?: string;
  user_id?: string;
  profile_id?: string;
  createdAt?: string;
  level?: string;
}

export interface VerificationFormValues {
  documentType: DocumentType;
  documentFile: File;
  selfieFile?: File;
  consentChecked: boolean;
  documentFrontImage: { file: File; preview: string };
  documentBackImage: { file: File; preview: string };
  selfieImage: { file: File; preview: string };
}

// Import zod for schema validation
import * as z from 'zod';

export const verificationFormSchema = z.object({
  documentType: z.string(),
  documentFile: z.instanceof(File, { message: "Document file is required" }),
  selfieFile: z.instanceof(File, { message: "Selfie is required" }).optional(),
  consentChecked: z.boolean().refine(val => val === true, { message: "You must agree to the terms" }),
  documentFrontImage: z.object({
    file: z.instanceof(File),
    preview: z.string()
  }).optional(),
  documentBackImage: z.object({
    file: z.instanceof(File),
    preview: z.string()
  }).optional(),
  selfieImage: z.object({
    file: z.instanceof(File),
    preview: z.string()
  }).optional()
});

export interface VerificationEligibilityResponse {
  canSubmit: boolean;
  reason?: string;
  cooldownRemaining?: number;
}

export interface VerificationSubmissionResponse {
  success: boolean;
  message: string;
  requestId?: string;
}

export interface VerificationBadgeProps {
  level: VerificationLevel | string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showTooltip?: boolean;
}
