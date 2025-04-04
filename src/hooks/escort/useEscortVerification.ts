
import { Escort, VerificationRequest, VerificationStatus } from "@/types/escort";
import { 
  createVerificationRequest, 
  updateVerificationStatus,
  isPending,
  isApproved,
  isRejected,
  isExpired
} from "@/utils/verification/statusCheck";
import { 
  canSubmitVerification, 
  submitVerificationRequest 
} from "@/utils/verification/requestSubmission";
import { 
  uploadVerificationDocuments,
  getDocumentUploadStatus
} from "@/utils/verification/documentUpload";
import { toast } from "@/components/ui/use-toast";

/**
 * Custom hook for handling escort verification
 */
export const useEscortVerification = (
  updateEscortProfile: (id: string, updates: Partial<Escort>) => Promise<Escort | null>
) => {
  /**
   * Submit verification documents
   */
  const submitVerification = async (
    escortId: string,
    documentType: string,
    frontImage: File,
    backImage?: File | null,
    selfieImage?: File
  ) => {
    try {
      // Check if can submit
      const eligibility = await canSubmitVerification(escortId);
      if (!eligibility.canSubmit) {
        toast({
          title: "Cannot submit verification",
          description: eligibility.reason || "You cannot submit a verification request at this time",
          variant: "destructive",
        });
        return null;
      }
      
      // Upload documents
      const documentUrls = await uploadVerificationDocuments(
        [frontImage, ...(backImage ? [backImage] : []), ...(selfieImage ? [selfieImage] : [])]
      );
      
      // Create verification request
      const request = await createVerificationRequest(escortId, documentUrls, documentType);
      
      // Update escort profile with verification status
      await updateEscortProfile(escortId, {
        verificationLevel: "basic",
        // Additional fields that might be relevant
      });
      
      return request;
    } catch (error) {
      console.error("Error submitting verification:", error);
      toast({
        title: "Verification submission failed",
        description: "An error occurred while submitting your verification",
        variant: "destructive",
      });
      return null;
    }
  };
  
  /**
   * Check verification status
   */
  const checkVerificationStatus = async (escortId: string): Promise<VerificationStatus | null> => {
    try {
      // In a real app, this would fetch from the database
      // For now, we'll return a mock status
      return 'pending';
    } catch (error) {
      console.error("Error checking verification status:", error);
      return null;
    }
  };
  
  return {
    submitVerification,
    checkVerificationStatus,
    isPending,
    isApproved,
    isRejected,
    isExpired,
    canSubmitVerification
  };
};

export default useEscortVerification;
