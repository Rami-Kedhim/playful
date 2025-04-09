
// Re-export functions from the verification utility modules
export { 
  isPending, 
  isApproved, 
  isRejected, 
  isExpired,
  createVerificationRequest,
  updateVerificationStatus 
} from './statusCheck';

export { 
  canSubmitVerification,
  submitVerificationRequest 
} from './requestSubmission';

export { 
  uploadVerificationDocuments,
  getDocumentUploadStatus 
} from './documentUpload';

export {
  calculateVerificationProgress,
  getVerificationStatusMessage,
  getVerificationStatusTitle,
  getEstimatedCompletionTime,
  isVerificationInProgress
} from './assessmentProgress';

export type { 
  VerificationEligibilityResponse,
  VerificationSubmissionResponse,
  VerificationChecks,
  VerificationStatusResponse
} from './types';
