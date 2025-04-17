
import { VerificationLevel, VerificationStatus, VerificationDocument } from './escort';
import { z } from 'zod';

// Document types enumeration for verification
export const DOCUMENT_TYPES = [
  { value: 'passport', label: 'Passport' },
  { value: 'drivers_license', label: 'Driver\'s License' },
  { value: 'national_id', label: 'National ID Card' },
  { value: 'residence_permit', label: 'Residence Permit' },
  { value: 'utility_bill', label: 'Utility Bill' },
  { value: 'bank_statement', label: 'Bank Statement' },
  { value: 'selfie', label: 'Selfie with ID' },
];

// Verification form schema
export const verificationFormSchema = z.object({
  documentType: z.string().min(1, { message: 'Document type is required' }),
  documentFile: z.any().refine(file => file instanceof File, {
    message: 'Document file is required',
  }),
  selfieFile: z.any().optional(),
  consentChecked: z.boolean().refine(val => val === true, {
    message: 'You must consent to the verification process',
  }),
});

// Form values type for verification
export type VerificationFormValues = z.infer<typeof verificationFormSchema>;

// Re-export types from escort.ts for compatibility
export type { VerificationLevel, VerificationStatus, VerificationDocument };

// Export the VerificationRequest interface with required fields to match escort.ts
export interface VerificationRequest {
  id: string;
  profile_id: string;
  userId: string;
  status: VerificationStatus;
  requested_level: VerificationLevel;
  documents: VerificationDocument[];
  createdAt: string;
  updatedAt?: string;
  reviewedAt?: string;
  reviewerId?: string;
  reviewerNotes?: string;
  expiresAt?: string;
  
  // For backward compatibility with escort.ts
  submittedAt?: string;
  created_at?: string;
  updated_at?: string;
  reviewed_by?: string;
  reviewer_notes?: string;
  expires_at?: string;
  verificationLevel?: VerificationLevel;
  rejection_reason?: string;
  rejectionReason?: string;
  level?: VerificationLevel;
  user_id?: string;
}
