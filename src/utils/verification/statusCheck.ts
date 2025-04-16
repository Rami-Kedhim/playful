
import { VerificationDocument, VerificationRequest, VerificationStatus } from '@/types/verification';

export const checkVerificationStatus = async (userId: string): Promise<{
  isVerified: boolean;
  verificationStatus?: VerificationStatus;
  pendingRequest?: VerificationRequest;
}> => {
  // In a real app, this would check with backend API
  // For now, let's return mock data
  
  const mockPendingRequest = Math.random() > 0.7;
  
  if (mockPendingRequest) {
    return {
      isVerified: false,
      verificationStatus: 'pending',
      pendingRequest: generateMockRequest(userId, 'pending')
    };
  }
  
  const isVerified = Math.random() > 0.5;
  
  return {
    isVerified,
    verificationStatus: isVerified ? 'approved' : 'rejected'
  };
};

export const generateMockRequest = (userId: string, status: VerificationStatus): VerificationRequest => {
  const now = new Date();
  const requestId = `vr-${Date.now()}`;
  
  return {
    id: requestId,
    profile_id: userId,
    status,
    requested_level: 'basic',
    documents: [
      {
        id: `doc-id-front-${Date.now()}`,
        verification_id: requestId,
        document_type: 'id_card',
        document_url: 'https://example.com/document.jpg',
        status: 'pending',
        created_at: now.toISOString(),
        type: 'id_front',
        fileUrl: 'https://example.com/document.jpg',
        uploadedAt: now.toISOString()
      },
      {
        id: `doc-id-back-${Date.now()}`,
        verification_id: requestId,
        document_type: 'id_card_back',
        document_url: 'https://example.com/document-back.jpg',
        status: 'pending',
        created_at: now.toISOString(),
        type: 'id_back',
        fileUrl: 'https://example.com/document-back.jpg',
        uploadedAt: now.toISOString()
      },
      {
        id: `doc-selfie-${Date.now()}`,
        verification_id: requestId,
        document_type: 'selfie',
        document_url: 'https://example.com/selfie.jpg',
        status: 'pending',
        created_at: now.toISOString(),
        type: 'selfie',
        fileUrl: 'https://example.com/selfie.jpg',
        uploadedAt: now.toISOString()
      }
    ],
    created_at: now.toISOString(),
    
    // Backwards compatibility
    submittedAt: now.toISOString(),
    userId: userId
  };
};
