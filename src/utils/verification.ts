
// Fix imports for verification
import { canSubmitVerification as canSubmit, submitVerificationRequest as submitVerificationReq } from './verification/requestSubmission';

// Re-export them with proper names
export const canSubmitVerification = canSubmit;
export const submitVerificationRequest = submitVerificationReq;

// Export other verification helpers
export * from './verification/statusCheck';
export * from './verification/requestSubmission';
export * from './verification/documentUpload';

// Explicitly export the getDocumentTypeLabel function
export { getDocumentTypeLabel } from './verification/index';
