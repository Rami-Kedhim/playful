
// Re-export functions from the verification utility modules
export { 
  isPending, 
  isApproved, 
  isRejected, 
  isExpired,
  createVerificationRequest,
  updateVerificationStatus,
  checkVerificationStatus,
  getVerificationRequest
} from './statusCheck';

export { 
  canSubmitVerification,
  submitVerificationRequest 
} from './requestSubmission';

export { 
  uploadVerificationDocuments,
  getDocumentUploadStatus 
} from './uploadVerificationDocuments';

export {
  calculateVerificationProgress,
  getVerificationStatusMessage,
  getVerificationStatusTitle,
  getEstimatedCompletionTime,
  isVerificationInProgress
} from './assessmentProgress';

export { getVerificationLevel } from './levelCalculation';

export type { 
  VerificationEligibilityResponse,
  VerificationSubmissionResponse,
  VerificationChecks,
  VerificationStatusResponse
} from './types';
