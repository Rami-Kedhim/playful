
import { VerificationRequest, VerificationDocument, VerificationStatus } from '@/types/escort';

export const getAllVerificationRequests = async (): Promise<VerificationRequest[]> => {
  // Mock implementation
  return [
    {
      id: 'vr-1',
      status: 'pending',
      submittedAt: new Date().toISOString(),
      documents: [
        { id: 'doc-1', documentType: 'id', status: 'pending' },
        { id: 'doc-2', documentType: 'selfie', status: 'pending' }
      ],
      userId: 'user-1'
    },
    {
      id: 'vr-2',
      status: 'in_review',
      submittedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      documents: [
        { id: 'doc-3', documentType: 'id', status: 'approved' },
        { id: 'doc-4', documentType: 'selfie', status: 'pending' }
      ],
      userId: 'user-2'
    }
  ];
};

export const approveVerificationRequest = async (
  requestId: string
): Promise<{ success: boolean }> => {
  console.log(`Approving verification request: ${requestId}`);
  return { success: true };
};

export const rejectVerificationRequest = async (
  requestId: string,
  reason: string
): Promise<{ success: boolean }> => {
  console.log(`Rejecting verification request: ${requestId}, reason: ${reason}`);
  return { success: true };
};

export default {
  getAllVerificationRequests,
  approveVerificationRequest,
  rejectVerificationRequest
};
