
import { VerificationStatus } from '@/types/verification';

export default function getVerificationProgress(status: VerificationStatus | string) {
  // Map string status to enum if needed
  let normalizedStatus = status;
  if (status === 'pending') normalizedStatus = VerificationStatus.PENDING;
  if (status === 'in_review') normalizedStatus = VerificationStatus.IN_REVIEW;
  if (status === 'approved') normalizedStatus = VerificationStatus.APPROVED;
  if (status === 'rejected') normalizedStatus = VerificationStatus.REJECTED;
  if (status === 'expired') normalizedStatus = VerificationStatus.EXPIRED;

  // Handle pending status
  if (normalizedStatus === VerificationStatus.PENDING) {
    return {
      step: 1,
      totalSteps: 3,
      status: 'pending',
      label: 'Documents Submitted',
      description: 'Your verification request has been submitted and is pending review.',
      color: 'blue'
    };
  }

  // Handle in review status
  if (normalizedStatus === VerificationStatus.IN_REVIEW) {
    return {
      step: 2,
      totalSteps: 3,
      status: 'in_review',
      label: 'Under Review',
      description: 'Our team is currently reviewing your verification documents.',
      color: 'yellow'
    };
  }

  // Handle approved status
  if (normalizedStatus === VerificationStatus.APPROVED) {
    return {
      step: 3,
      totalSteps: 3,
      status: 'approved',
      label: 'Verification Approved',
      description: 'Your identity has been successfully verified!',
      color: 'green'
    };
  }

  // Handle rejected status
  if (normalizedStatus === VerificationStatus.REJECTED) {
    return {
      step: 2,
      totalSteps: 3,
      status: 'rejected',
      label: 'Verification Rejected',
      description: 'Your verification request was rejected. Please check the feedback and try again.',
      color: 'red'
    };
  }

  // Handle expired status
  if (normalizedStatus === VerificationStatus.EXPIRED || 
      [VerificationStatus.APPROVED, VerificationStatus.REJECTED, VerificationStatus.EXPIRED].includes(normalizedStatus as any) === false) {
    return {
      step: 0,
      totalSteps: 3,
      status: 'expired',
      label: 'Verification Expired',
      description: 'Your verification request has expired. Please submit a new request.',
      color: 'gray'
    };
  }

  // Default fallback
  return {
    step: 0,
    totalSteps: 3,
    status: 'unknown',
    label: 'Not Started',
    description: 'Please start the verification process.',
    color: 'gray'
  };
}
