import { VerificationRequest, VerificationStatus, VerificationLevel, VerificationDocument } from '@/types/verification';

// Mock verification requests data
const mockVerificationRequests: VerificationRequest[] = [
  {
    id: '1',
    userId: 'user-123',
    profile_id: 'prof-123',
    status: VerificationStatus.PENDING,
    requestedLevel: VerificationLevel.BASIC,
    requested_level: VerificationLevel.BASIC,
    submittedAt: new Date(), // Use Date object
    created_at: new Date().toISOString(), // Keep string for backward compat
    documents: [
      {
        id: 'doc-1',
        type: 'id_card',
        filePath: 'https://picsum.photos/id/1018/800/600',
        documentType: 'id_card', // Add documentType
        fileUrl: 'https://picsum.photos/id/1018/800/600', // Add fileUrl
        uploadedAt: new Date(),
        status: VerificationStatus.PENDING,
      },
      {
        id: 'doc-2',
        type: 'selfie',
        filePath: 'https://picsum.photos/id/1025/800/600',
        documentType: 'selfie',
        fileUrl: 'https://picsum.photos/id/1025/800/600',
        uploadedAt: new Date(),
        status: VerificationStatus.PENDING,
      }
    ]
  },
  {
    id: '2',
    userId: 'user-456',
    profile_id: 'prof-456',
    status: VerificationStatus.PENDING,
    requestedLevel: VerificationLevel.ENHANCED,
    requested_level: VerificationLevel.ENHANCED,
    submittedAt: new Date(Date.now() - 86400000),
    created_at: new Date(Date.now() - 86400000).toISOString(),
    documents: [
      {
        id: 'doc-3',
        type: 'passport',
        filePath: 'https://picsum.photos/id/1035/800/600',
        documentType: 'passport',
        fileUrl: 'https://picsum.photos/id/1035/800/600',
        uploadedAt: new Date(Date.now() - 86400000),
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

  const now = new Date();
  
  mockVerificationRequests[index] = {
    ...mockVerificationRequests[index],
    status: VerificationStatus.APPROVED,
    reviewedAt: now,
    reviewed_at: now.toISOString(),
    notes: "Approved by admin" // Using notes which is in the type definition
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
  
  const now = new Date();

  mockVerificationRequests[index] = {
    ...mockVerificationRequests[index],
    status: VerificationStatus.REJECTED,
    reviewedAt: now,
    reviewed_at: now.toISOString(),
    notes: reason, // Using notes which is in the type definition
    reviewer_notes: reason, // Keeping for backward compatibility
    rejectionReason: reason // Keeping for backward compatibility
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
  const now = new Date();

  const newDocuments: VerificationDocument[] = documents.map((doc, index) => ({
    ...doc,
    id: `doc-${Date.now()}-${index}`,
    status: VerificationStatus.PENDING,
    uploadedAt: now,
  }));

  const newRequest: VerificationRequest = {
    id: newRequestId,
    userId: profileId,
    profile_id: profileId,
    status: VerificationStatus.PENDING,
    requestedLevel: level as any,
    requested_level: level as any,
    submittedAt: now,
    created_at: now.toISOString(),
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
