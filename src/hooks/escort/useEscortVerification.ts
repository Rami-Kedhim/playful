
import { useState } from "react";
import { Escort, VerificationRequest, VerificationStatus } from "@/types/escort";
import { toast } from "@/components/ui/use-toast";

interface UseEscortVerificationProps {
  updateEscortProfile: (id: string, updates: Partial<Escort>) => Promise<Escort | null>;
}

export const useEscortVerification = ({ updateEscortProfile }: UseEscortVerificationProps) => {
  const [submitting, setSubmitting] = useState(false);
  
  const submitVerificationRequest = async (
    escortId: string,
    documents: string[],
    documentType: string
  ) => {
    if (!escortId) {
      toast({
        title: "Error submitting verification",
        description: "Escort ID is required",
        variant: "destructive",
      });
      return null;
    }
    
    setSubmitting(true);
    
    try {
      // In a real app, this would call an API endpoint
      // For now, we'll just update the escort profile
      const verificationRequest: VerificationRequest = {
        id: `verification-${Date.now()}`,
        escortId,
        status: "pending" as VerificationStatus,
        documents,
        submittedAt: new Date(),
        documentType
      };
      
      const updatedEscort = await updateEscortProfile(escortId, {
        verificationLevel: "pending"
      });
      
      setSubmitting(false);
      
      if (updatedEscort) {
        toast({
          title: "Verification submitted",
          description: "Your verification request has been submitted for review.",
        });
      }
      
      return verificationRequest;
    } catch (error) {
      console.error("Error submitting verification:", error);
      setSubmitting(false);
      
      toast({
        title: "Error submitting verification",
        description: "Failed to submit verification request. Please try again.",
        variant: "destructive",
      });
      
      return null;
    }
  };
  
  return {
    submitting,
    submitVerificationRequest
  };
};

export default useEscortVerification;
