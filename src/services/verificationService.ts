
import { VerificationDocument, VerificationRequest, VerificationStatus, VerificationLevel } from '@/types/verification';

// Mock verification requests data
const mockVerificationRequests: VerificationRequest[] = [
  {
    id: '1',
    profile_id: 'prof-123',
    status: VerificationStatus.PENDING,
    requested_level: VerificationLevel.BASIC,
    created_at: new Date().toISOString(),
    documents: [
      {
        id: 'doc-1',
        documentType: 'id_card',
        fileUrl: 'https://picsum.photos/id/1018/800/600',
        uploadedAt: new Date().toISOString(),
        status: VerificationStatus.PENDING,
      },
      {
        id: 'doc-2',
        documentType: 'selfie',
        fileUrl: 'https://picsum.photos/id/1025/800/600',
        uploadedAt: new Date().toISOString(),
        status: VerificationStatus.PENDING,
      }
    ]
  },
  {
    id: '2',
    profile_id: 'prof-456',
    status: VerificationStatus.PENDING,
    requested_level: VerificationLevel.ENHANCED,
    created_at: new Date(Date.now() - 86400000).toISOString(),
    documents: [
      {
        id: 'doc-3',
        documentType: 'passport',
        fileUrl: 'https://picsum.photos/id/1035/800/600',
        uploadedAt: new Date(Date.now() - 86400000).toISOString(),
        status: VerificationStatus.PENDING,
      }
    ]
  }
];

/**
 * Get all verification requests
 */
export const getAllVerificationRequests = async (): Promise<VerificationRequest[]> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  return [...mockVerificationRequests];
};

/**
 * Get verification request by ID
 */
export const getVerificationRequestById = async (id: string): Promise<VerificationRequest | null> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const request = mockVerificationRequests.find(req => req.id === id);
  return request || null;
};

/**
 * Approve a verification request
 */
export const approveVerificationRequest = async (id: string): Promise<boolean> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  const index = mockVerificationRequests.findIndex(req => req.id === id);

  if (index === -1) return false;

  mockVerificationRequests[index] = {
    ...mockVerificationRequests[index],
    status: VerificationStatus.APPROVED,
    reviewedAt: new Date().toISOString(),
    reviewedBy: 'admin-user-id'
  };

  if (mockVerificationRequests[index].documents) {
    mockVerificationRequests[index].documents = mockVerificationRequests[index].documents.map(doc => ({
      ...doc,
      status: VerificationStatus.APPROVED
    }));
  }

  return true;
};

/**
 * Reject a verification request
 */
export const rejectVerificationRequest = async (id: string, reason: string): Promise<boolean> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  const index = mockVerificationRequests.findIndex(req => req.id === id);

  if (index === -1) return false;

  mockVerificationRequests[index] = {
    ...mockVerificationRequests[index],
    status: VerificationStatus.REJECTED,
    reviewedAt: new Date().toISOString(),
    reviewedBy: 'admin-user-id',
    reviewer_notes: reason
  };

  return true;
};

// Add a new verification request
export const createVerificationRequest = async (
  profileId: string,
  level: 'basic' | 'enhanced' | 'premium',
  documents: Omit<VerificationDocument, 'id' | 'status' | 'uploadedAt' | 'verification_request_id'>[]
): Promise<VerificationRequest> => {
  await new Promise(resolve => setTimeout(resolve, 1000));

  const newRequestId = `req-${Date.now()}`;

  const newDocuments: VerificationDocument[] = documents.map((doc, index) => ({
    ...doc,
    id: `doc-${Date.now()}-${index}`,
    status: VerificationStatus.PENDING,
    uploadedAt: new Date().toISOString(),
  }));

  const newRequest: VerificationRequest = {
    id: newRequestId,
    profile_id: profileId,
    status: VerificationStatus.PENDING,
    requested_level: level as any,
    created_at: new Date().toISOString(),
    documents: newDocuments,
  };

  mockVerificationRequests.push(newRequest);
  return newRequest;
};

export default {
  getAllVerificationRequests,
  getVerificationRequestById,
  approveVerificationRequest,
  rejectVerificationRequest,
  createVerificationRequest,
};
