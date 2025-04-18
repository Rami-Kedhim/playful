
import { VerificationStatus } from '@/types/verification';

/**
 * Calculate the verification progress percentage based on status
 */
export function calculateVerificationProgress(status: VerificationStatus | string): number {
  switch(status) {
    case VerificationStatus.PENDING:
      return 0;
    case VerificationStatus.IN_REVIEW:
      return 50;
    case VerificationStatus.APPROVED:
      return 100;
    case VerificationStatus.REJECTED:
      return 100;
    case VerificationStatus.EXPIRED:
      return 100;
    default:
      return 0;
  }
}

/**
 * Get appropriate status message for verification status
 */
export function getVerificationStatusMessage(status: VerificationStatus | string): string {
  switch(status) {
    case VerificationStatus.PENDING:
      return 'Your verification request has been submitted and is waiting to be reviewed.';
    case VerificationStatus.IN_REVIEW:
      return 'Your verification documents are currently being reviewed by our team.';
    case VerificationStatus.APPROVED:
      return 'Congratulations! Your verification has been approved.';
    case VerificationStatus.REJECTED:
      return 'Your verification request has been rejected. Please check the reason and try again.';
    case VerificationStatus.EXPIRED:
      return 'Your verification request has expired. Please submit a new request.';
    default:
      return 'Status information unavailable.';
  }
}

/**
 * Get appropriate title for verification status
 */
export function getVerificationStatusTitle(status: VerificationStatus | string): string {
  switch(status) {
    case VerificationStatus.PENDING:
      return 'Pending';
    case VerificationStatus.IN_REVIEW:
      return 'In Review';
    case VerificationStatus.APPROVED:
      return 'Approved';
    case VerificationStatus.REJECTED:
      return 'Rejected';
    case VerificationStatus.EXPIRED:
      return 'Expired';
    default:
      return 'Unknown Status';
  }
}

/**
 * Calculate estimated completion time based on status
 */
export function getEstimatedCompletionTime(status: VerificationStatus | string): string {
  switch(status) {
    case VerificationStatus.PENDING:
      return '24-48 hours';
    case VerificationStatus.IN_REVIEW:
      return '12-24 hours';
    case VerificationStatus.APPROVED:
    case VerificationStatus.REJECTED:
    case VerificationStatus.EXPIRED:
      return 'Completed';
    default:
      return 'Unknown';
  }
}

/**
 * Check if verification is in progress
 */
export function isVerificationInProgress(status: VerificationStatus | string): boolean {
  return status === VerificationStatus.PENDING || 
         status === VerificationStatus.IN_REVIEW;
}
