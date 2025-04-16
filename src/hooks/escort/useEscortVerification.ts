
import { useState } from 'react';
import { Escort } from "@/types/escort";
import { VerificationStatus, VerificationRequest, VerificationDocument } from "@/types/verification";
import { useToast } from '@/hooks/use-toast';

type UpdateVerificationFn = (id: string, updates: Partial<VerificationRequest>) => Promise<VerificationRequest | null>;

export const useEscortVerification = (updateFn: UpdateVerificationFn) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const checkVerificationStatus = async (escortId: string): Promise<VerificationStatus | null> => {
    try {
      setLoading(true);
      
      // This would be an API call in a real application
      // For now we'll simulate by returning random statuses based on escort ID
      
      // Use last character of ID to determine status for demo purposes
      const lastChar = escortId.slice(-1);
      const numValue = parseInt(lastChar, 16) || 0;
      
      // Return different statuses based on the ID for demonstration
      if (numValue < 5) {
        return 'pending';
      } else if (numValue < 10) {
        return 'approved';
      } else {
        return 'rejected';
      }
    } catch (error) {
      console.error('Error checking verification status:', error);
      toast({
        title: 'Error checking verification',
        description: 'Could not fetch verification status',
        variant: 'destructive',
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  const submitVerification = async (
    userId: string,
    documentUrls: string[]
  ): Promise<VerificationRequest | null> => {
    try {
      setLoading(true);
      
      // Convert string URLs to document objects
      const documents: VerificationDocument[] = documentUrls.map((url, index) => ({
        id: `doc-${index}`,
        verification_id: `verification-${userId}`,
        document_type: 'id-verification',
        document_url: url,
        status: 'pending',
        created_at: new Date().toISOString(),
        // Backward compatibility fields
        type: 'id-verification',
        fileUrl: url,
        uploadedAt: new Date().toISOString()
      }));
      
      // Create verification request object
      const verificationRequest: Partial<VerificationRequest> = {
        userId,
        profile_id: userId,
        status: 'pending',
        documents,
        submittedAt: new Date().toISOString(),
        created_at: new Date().toISOString(),
        requested_level: 'basic'
      };
      
      // In a real app, this would send the data to an API
      const result = await updateFn(userId, verificationRequest);
      
      // Show success message
      toast({
        title: 'Verification submitted',
        description: 'Your verification request has been submitted and is under review.',
      });
      
      return result;
    } catch (error) {
      console.error('Error submitting verification:', error);
      toast({
        title: 'Error submitting verification',
        description: 'Failed to submit verification request',
        variant: 'destructive',
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    checkVerificationStatus,
    submitVerification,
  };
};
