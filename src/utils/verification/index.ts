
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

export type { 
  VerificationEligibilityResponse,
  VerificationSubmissionResponse 
} from './types';
