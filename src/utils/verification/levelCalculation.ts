
import { VerificationChecks } from "./types";

/**
 * Gets verification badge level based on user's verification status and other factors
 */
export const getVerificationLevel = (
  isVerified: boolean,
  verificationDate?: string,
  additionalChecks: VerificationChecks = {}
): "none" | "basic" | "enhanced" | "premium" => {
  if (!isVerified) return "none";
  
  const { hasPhoneVerification, hasEmailVerification, hasPaymentVerification, hasCommunityReviews } = additionalChecks;
  
  // Premium verification requires all checks
  if (
    hasPhoneVerification && 
    hasEmailVerification && 
    hasPaymentVerification && 
    hasCommunityReviews
  ) {
    return "premium";
  }
  
  // Enhanced verification requires phone + at least one other verification
  if (
    hasPhoneVerification && 
    (hasEmailVerification || hasPaymentVerification)
  ) {
    return "enhanced";
  }
  
  // Basic verification is just ID verification
  return "basic";
};
