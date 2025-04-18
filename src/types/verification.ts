
import { z } from 'zod';

// Document types
export const ID_CARD = 'id_card';
export const PASSPORT = 'passport';
export const DRIVERS_LICENSE = 'drivers_license';

export type DocumentType = typeof ID_CARD | typeof PASSPORT | typeof DRIVERS_LICENSE;

export const DOCUMENT_TYPES = [
  { value: ID_CARD, label: 'ID Card' },
  { value: PASSPORT, label: 'Passport' },
  { value: DRIVERS_LICENSE, label: 'Driver\'s License' },
];

// Verification status types
export type VerificationStatus = 'pending' | 'approved' | 'rejected' | 'expired';

export interface DocumentData {
  file: File;
  preview: string;
}

// Schema for verification form
export const verificationFormSchema = z.object({
  documentType: z.enum([ID_CARD, PASSPORT, DRIVERS_LICENSE]),
  documentFile: z.instanceof(File, { message: 'Primary document is required' }),
  selfieFile: z.instanceof(File, { message: 'Selfie is required' }).optional(),
  consentChecked: z.boolean().optional(),
  documentFrontImage: z.object({
    file: z.instanceof(File).optional(),
    preview: z.string().optional(),
  }).optional(),
  documentBackImage: z.object({
    file: z.instanceof(File).optional(),
    preview: z.string().optional(),
  }).optional(),
  selfieImage: z.object({
    file: z.instanceof(File).optional(),
    preview: z.string().optional(),
  }).optional(),
});

// Types based on the schema
export type VerificationFormValues = z.infer<typeof verificationFormSchema>;

export interface VerificationDocument {
  id: string;
  userId: string;
  documentType: DocumentType;
  fileUrl: string;
  status: VerificationStatus;
  uploadedAt: string;
  reviewedAt?: string;
  notes?: string;
}

export interface VerificationRequest {
  id: string;
  userId: string;
  status: VerificationStatus;
  submittedAt: string;
  updatedAt?: string;
  documents: VerificationDocument[];
  rejectionReason?: string;
  verificationLevel?: string;
}

// Form data type
export interface VerificationFormData {
  documentType: DocumentType;
  documentFile: File;
  selfieFile?: File;
}
