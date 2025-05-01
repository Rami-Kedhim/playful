
/**
 * Get a human-readable label for a document type
 * @param documentType The document type code
 * @returns A human-readable label
 */
export const getDocumentTypeLabel = (documentType: string): string => {
  switch (documentType) {
    case 'id_card':
      return 'ID Card';
    case 'passport':
      return 'Passport';
    case 'drivers_license':
      return 'Driver\'s License';
    case 'residence_permit':
      return 'Residence Permit';
    default:
      return documentType.split('_').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ');
  }
};

/**
 * Checks if a document type was approved for verification
 * @param documentType Document type to check
 * @param approvedTypes Array of approved document types
 * @returns Boolean indicating if the document is approved
 */
export const isApprovedDocumentType = (
  documentType: string, 
  approvedTypes: string[] = ['id_card', 'passport', 'drivers_license', 'residence_permit']
): boolean => {
  return approvedTypes.includes(documentType);
};

/**
 * Get document verification rules based on document type
 * @param documentType The document type
 * @returns Object with verification rules
 */
export const getDocumentVerificationRules = (documentType: string) => {
  const baseRules = {
    requiresFront: true,
    requiresBack: true,
    requiresSelfie: true,
    minimumAge: 18,
  };

  switch (documentType) {
    case 'passport':
      return {
        ...baseRules,
        requiresBack: false, // Passports don't need back side
      };
    default:
      return baseRules;
  }
};
