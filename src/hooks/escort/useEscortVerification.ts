
import { useState, useEffect } from 'react';
import { 
  VerificationRequest, 
  VerificationDocument, 
  VerificationStatus, 
  VerificationLevel 
} from '@/types/escort';
import { useToast } from '@/components/ui/use-toast';

export const useEscortVerification = (userId?: string) => {
  const [verificationRequest, setVerificationRequest] = useState<VerificationRequest | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    if (!userId) {
      setIsLoading(false);
      return;
    }
    
    const fetchVerificationStatus = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Simulate API call to fetch verification status
        // In a real app, this would be from an API
        const mockRequest = {
          id: "ver_123456",
          userId: userId,
          profile_id: userId,
          level: VerificationLevel.BASIC,
          status: VerificationStatus.PENDING,
          documents: [],
          submittedAt: new Date().toISOString(),
          created_at: new Date().toISOString(),
          verificationLevel: VerificationLevel.BASIC,
          requested_level: VerificationLevel.BASIC
        };
        
        // Convert to satisfy both types
        const typedRequest: VerificationRequest = {
          ...mockRequest,
          // Add required fields for VerificationRequest from verification.ts
          createdAt: mockRequest.created_at,
          updatedAt: mockRequest.submittedAt
        };
        
        setVerificationRequest(typedRequest);
      } catch (err) {
        console.error('Error fetching verification status:', err);
        setError('Failed to load verification status');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchVerificationStatus();
  }, [userId]);
  
  const submitVerification = async (documentData: any) => {
    if (!userId) {
      toast({
        title: "Authentication required",
        description: "You must be logged in to submit a verification request",
        variant: "destructive"
      });
      return null;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call to submit verification
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      // Mock a successful response
      const newDocument: VerificationDocument = {
        id: `doc_${Date.now()}`,
        verification_id: "ver_new",
        type: documentData.type,
        url: documentData.fileUrl,
        document_type: documentData.type,
        document_url: documentData.fileUrl,
        status: VerificationStatus.PENDING,
        created_at: new Date().toISOString()
      };
      
      // Update state with new document
      setVerificationRequest(prev => {
        if (!prev) {
          // Create a new verification request
          const newRequest: VerificationRequest = {
            id: `ver_${Date.now()}`,
            userId: userId,
            profile_id: userId,
            status: VerificationStatus.PENDING,
            level: VerificationLevel.NONE,
            requested_level: VerificationLevel.BASIC,
            documents: [newDocument],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            submittedAt: new Date().toISOString(),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          };
          return newRequest;
        } else {
          // Update existing request with new document
          return {
            ...prev,
            documents: [...(prev.documents || []), newDocument],
            status: VerificationStatus.PENDING,
            updatedAt: new Date().toISOString(),
            updated_at: new Date().toISOString()
          };
        }
      });
      
      toast({
        title: "Verification submitted",
        description: "Your verification request has been submitted for review",
      });
      
      return true;
    } catch (err) {
      console.error('Error submitting verification:', err);
      setError('Failed to submit verification');
      
      toast({
        title: "Submission failed",
        description: "There was an error submitting your verification request",
        variant: "destructive"
      });
      
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    verificationRequest,
    isLoading,
    error,
    submitVerification,
    isVerified: verificationRequest?.status === VerificationStatus.APPROVED,
    isPending: verificationRequest?.status === VerificationStatus.PENDING || 
               verificationRequest?.status === VerificationStatus.IN_REVIEW,
    isRejected: verificationRequest?.status === VerificationStatus.REJECTED
  };
};
