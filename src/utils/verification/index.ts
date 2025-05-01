
/**
 * Helper function to get a human-readable label for document types
 * @param documentType Raw document type string
 * @returns Human-readable document type label
 */
export const getDocumentTypeLabel = (documentType: string): string => {
  const labels: Record<string, string> = {
    id_card: 'ID Card',
    passport: 'Passport',
    drivers_license: 'Driver\'s License',
    residence_permit: 'Residence Permit',
    selfie: 'Selfie Photo',
  };
  
  return labels[documentType] || documentType.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
};

/**
 * Check if a document needs a back side image
 * @param documentType Document type to check
 * @returns Boolean indicating if document needs back side
 */
export const documentRequiresBackSide = (documentType: string): boolean => {
  const singleSideDocuments = ['passport', 'selfie'];
  return !singleSideDocuments.includes(documentType);
};

/**
 * Check if the verification level requires selfie
 * @param level Verification level to check
 * @returns Boolean indicating if level requires selfie
 */
export const verificationLevelRequiresSelfie = (level: string): boolean => {
  // Most verification levels require selfie for identity confirmation
  return ['basic', 'enhanced', 'premium'].includes(level.toLowerCase());
};
