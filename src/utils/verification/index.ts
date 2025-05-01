
// Fix imports for verification
import { canSubmitVerification as canSubmit, submitVerificationRequest as submitVerificationReq } from './verification/requestSubmission';

// Re-export them with proper names
export const canSubmitVerification = canSubmit;
export const submitVerificationRequest = submitVerificationReq;

// Export verification helpers
export * from './verification/statusCheck';
export * from './verification/requestSubmission';
export * from './verification/documentUpload';

// Add the missing getDocumentTypeLabel function
export const getDocumentTypeLabel = (docType: string): string => {
  switch (docType) {
    case 'id_card': return 'ID Card';
    case 'passport': return 'Passport';
    case 'drivers_license': return "Driver's License";
    case 'residence_permit': return 'Residence Permit';
    case 'selfie': return 'Selfie';
    case 'data_page': return 'Passport Data Page';
    case 'front': return 'Front Side';
    case 'back': return 'Back Side';
    default: return docType.charAt(0).toUpperCase() + docType.slice(1).replace(/_/g, ' ');
  }
};
