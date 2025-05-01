import { VerificationLevel, VerificationStatus, VerificationDocument } from '@/types/verification';

export const canSubmitVerification = async (userId: string): Promise<{ canSubmit: boolean; reason?: string; cooldownRemaining?: number }> => {
  return { canSubmit: true };
};

export const submitVerificationRequest = async (
  userId: string,
  documentType: string,
  documentFile: File,
  selfieFile: File | null,
  backFile: File | null
): Promise<{ success: boolean; message: string; requestId?: string }> => {
  return { success: true, message: 'Verification request submitted successfully.', requestId: `ver-${Date.now().toString(36)}` };
};

export const getDocumentTypeLabel = (docType: string): string => {
  switch (docType) {
    case 'id_card': return 'ID Card';
    case 'passport': return 'Passport';
    case 'drivers_license': return "Driver's License";
    default: return docType;
  }
};

export const getVerificationLevelLabel = (level: VerificationLevel): string => {
  switch (level) {
    case VerificationLevel.NONE: return 'Not Verified';
    case VerificationLevel.BASIC: return 'Basic Verification';
    case VerificationLevel.ENHANCED: return 'Enhanced Verification';
    case VerificationLevel.PREMIUM: return 'Premium Verification';
    default: return 'Unknown';
  }
};

export const getVerificationStatusLabel = (status: VerificationStatus | string): string => {
  switch (status) {
    case VerificationStatus.PENDING: return 'Pending Review';
    case VerificationStatus.IN_REVIEW: return 'In Review';
    case VerificationStatus.APPROVED: return 'Approved';
    case VerificationStatus.REJECTED: return 'Rejected';
    case VerificationStatus.EXPIRED: return 'Expired';
    default: return status.charAt(0).toUpperCase() + status.slice(1);
  }
};

export const getVerificationStatusColor = (status: VerificationStatus | string): string => {
  switch (status) {
    case VerificationStatus.PENDING: return 'yellow';
    case VerificationStatus.IN_REVIEW: return 'blue';
    case VerificationStatus.APPROVED: return 'green';
    case VerificationStatus.REJECTED: return 'red';
    case VerificationStatus.EXPIRED: return 'gray';
    default: return 'gray';
  }
};

export const normalizeDocument = (doc: any): VerificationDocument => {
  return {
    id: doc.id,
    documentType: doc.document_type || doc.documentType || doc.type,
    fileUrl: doc.file_url || doc.fileUrl || doc.url || doc.document_url || '',
    uploadedAt: doc.uploaded_at ? new Date(doc.uploaded_at).toISOString() : new Date().toISOString(),
    status: doc.status || 'pending',
    rejectionReason: doc.rejectionReason || doc.rejectReason || undefined,
    reviewedBy: doc.reviewedBy || undefined,
    reviewedAt: doc.reviewedAt ? (typeof doc.reviewedAt === 'string' ? doc.reviewedAt : new Date(doc.reviewedAt).toISOString()) : undefined,
  };
};
