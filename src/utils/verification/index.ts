
import { 
  VerificationStatus, 
  VerificationDocument, 
  VerificationRequest 
} from '@/types/verification';

export { checkVerificationStatus, getVerificationRequest } from './statusCheck';
export { default as getVerificationProgress } from './assessmentProgress';

// Helper functions for verification status
export const isPending = (status?: VerificationStatus | string): boolean => 
  status === VerificationStatus.PENDING || status === 'pending';

export const isApproved = (status?: VerificationStatus | string): boolean => 
  status === VerificationStatus.APPROVED || status === 'approved';

export const isRejected = (status?: VerificationStatus | string): boolean => 
  status === VerificationStatus.REJECTED || status === 'rejected';

export const isExpired = (status?: VerificationStatus | string): boolean => 
  status === VerificationStatus.EXPIRED || status === 'expired';

export const createVerificationRequest = async (userId: string, level: string): Promise<VerificationRequest> => {
  // Implementation will be added later
  return {} as VerificationRequest;
};

export const updateVerificationStatus = async (requestId: string, status: VerificationStatus | string): Promise<VerificationRequest> => {
  // Implementation will be added later
  return {} as VerificationRequest;
};
